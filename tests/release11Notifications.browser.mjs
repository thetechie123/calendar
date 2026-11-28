import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, join, extname } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';
import { VAIKUNTHA_2026_RELEASES } from '../src/data/vaikunthaDarshan2026.js';

const build = resolve(process.argv[2] || 'dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const file = join(build, extname(pathname) ? pathname.slice(1) : 'index.html');
    if (!file.startsWith(build + (process.platform === 'win32' ? '\\' : '/'))) throw new Error('Outside build');
    const bytes = await readFile(file);
    response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    response.end(bytes);
  } catch {
    response.statusCode = 404;
    response.end();
  }
});
await new Promise((ready, reject) => server.on('error', reject).listen(0, '127.0.0.1', ready));
const base = 'http://127.0.0.1:' + server.address().port;

const key = 'tirumala_verse_reminders';
const obsolete = 'ttd-2026-12-vaikunta-ekadasi-spells';
const temple_id = 'tirumala-main';
const [srivani, specialEntry, dip] = VAIKUNTHA_2026_RELEASES;
const toCloud = event => ({
  id: event.id, title: event.title, title_te: event.titleTe,
  start_date: event.startDate, end_date: event.endDate, start_time: event.startTime,
  temple_id, category: 'quota-release', notification_eligible: 'false', is_cancelled: 'false'
});
const at = (date, time) => Date.parse(date + 'T' + time + '+05:30');
const festival = {
  id: 'fixture-existing-festival', title: 'Existing Festival Fixture',
  start_date: '2026-12-02', end_date: '2026-12-03',
  start_time: '10:00:00', category: 'special-puja', temple_id,
  notification_eligible: 'true', is_cancelled: 'false'
};
const legacyEvent = {
  id: obsolete, title: 'Tirumala Vaikunta Ekadasi 5-Spell Seva & Darshan Window (Dec 16 – 30)',
  start_date: '2026-12-16', end_date: '2026-12-30', category: 'special-puja',
  temple_id, notification_eligible: true
};

async function until(predicate, failure) {
  for (let attempt = 0; attempt < 40; attempt++) {
    if (await predicate()) return;
    await delay(75);
  }
  assert.fail(failure);
}

const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE_PATH || undefined });
async function open({ now, rows, eventId, stored = {} }) {
  const context = await browser.newContext({
    timezoneId: 'America/Los_Angeles', viewport: { width: 1360, height: 900 }, serviceWorkers: 'block'
  });
  await context.addInitScript(({ saved, storageKey }) => {
    const sent = [];
    window.mockNotifications = sent;
    Object.defineProperty(window, 'Notification', {
      configurable: true,
      value: class {
        static permission = 'granted';
        static async requestPermission() { return 'granted'; }
        constructor(title, options) { sent.push({ channel: 'reminder', title, body: options.body }); }
      }
    });
    const registration = {
      showNotification: async (title, options) => sent.push({ channel: 'daily', title, body: options.body })
    };
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: { ready: Promise.resolve(registration), register: async () => registration }
    });
    localStorage.setItem('tirumala_notifications_enabled', 'true');
    sessionStorage.setItem('tirumala_notif_prompted', 'true');
    if (!sessionStorage.getItem('reminder-fixture-initialized')) {
      localStorage.setItem(storageKey, JSON.stringify(saved));
      sessionStorage.setItem('reminder-fixture-initialized', 'true');
    }
  }, { saved: stored, storageKey: key });
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin === base) return route.continue();
    if (url.pathname === '/rest/v1/events') {
      return route.fulfill({
        json: rows, headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-headers': 'authorization,apikey,content-type'
        }
      });
    }
    return route.abort();
  });
  const page = await context.newPage();
  await page.clock.install({ time: new Date(now - 1) });
  await page.clock.pauseAt(new Date(now));
  await page.goto(base + '/calendar' + (eventId ? '?event=' + eventId : ''));
  if (eventId) await page.getByRole('button', { name: 'Close event details' }).waitFor();
  return { context, page };
}

const sent = page => page.evaluate(() => window.mockNotifications);
const saved = page => page.evaluate(storageKey => JSON.parse(localStorage.getItem(storageKey)), key);
const remind = page => page.getByRole('button', { name: 'Remind Me', exact: true }).filter({ visible: true }).last();

try {
  for (const time of ['09:55:00', '10:00:00', '10:05:00']) {
    const now = at('2026-11-28', time);
    const overdue = { title: srivani.title, remindAt: now - 30_000 };
    const { context, page } = await open({
      now, rows: [toCloud(srivani)], eventId: srivani.id, stored: { [srivani.id]: overdue }
    });
    await until(async () => !Object.hasOwn(await saved(page), srivani.id), 'Stored SRIVANI reminder was not pruned');
    assert(!((await sent(page)).some(message => message.body?.includes('SRIVANI'))));
    if (time === '09:55:00') {
      await remind(page).click();
      assert.equal((await saved(page))[srivani.id].startsAt, at('2026-11-28', '10:00:00'));
      // A suspended tab waking after the event starts must discard its pending alarm.
      await page.clock.fastForward(6 * 60_000);
      assert(!Object.hasOwn(await saved(page), srivani.id));
      assert(!(await sent(page)).some(message => message.title.includes('SRIVANI')));
    } else {
      assert.equal(await remind(page).count(), 0);
    }
    await context.close();
  }

  for (const event of [specialEntry, dip]) {
    const { context, page } = await open({ now: at(event.startDate, '07:00:00'), rows: [toCloud(event)], eventId: event.id });
    await remind(page).click();
    assert.equal((await saved(page))[event.id].remindAt, at(event.startDate, '08:00:00'));
    if (event === dip) {
      await page.reload();
      await page.getByRole('button', { name: 'Close event details' }).waitFor();
    }
    await page.clock.fastForward(3_600_010);
    await until(async () => (await sent(page)).some(message => message.title.includes(event.title)), 'Future reminder was not delivered');
    assert.equal((await sent(page)).filter(message => message.channel === 'reminder' && message.title.includes(event.title)).length, 1);
    assert(!Object.hasOwn(await saved(page), event.id));
    await page.clock.fastForward(30_000);
    assert.equal((await sent(page)).filter(message => message.channel === 'reminder' && message.title.includes(event.title)).length, 1);
    await context.close();
  }

  const legitimate = await open({ now: at('2026-12-03', '11:00:00'), rows: [festival], eventId: festival.id });
  await until(async () => (await sent(legitimate.page)).some(message => message.channel === 'daily' && message.body.includes(festival.title)), 'Legitimate multi-day festival daily alert was not delivered');
  assert.equal(await remind(legitimate.page).count(), 0, 'Pre-event reminder should close after the first day starts');
  await legitimate.context.close();

  const dateOnly = {
    ...festival, id: 'fixture-date-only', title: 'Date-Only Festival Fixture',
    start_date: '2026-12-04', end_date: '2026-12-04', start_time: null
  };
  const dateOnlyCheck = await open({ now: at('2026-12-04', '04:00:00'), rows: [dateOnly], eventId: dateOnly.id });
  await until(async () => (await sent(dateOnlyCheck.page)).some(message => message.channel === 'daily' && message.body.includes(dateOnly.title)), 'Date-only festival daily alert was not delivered');
  await remind(dateOnlyCheck.page).click();
  assert.equal((await saved(dateOnlyCheck.page))[dateOnly.id].remindAt, at('2026-12-04', '05:00:00'));
  await remind(dateOnlyCheck.page).click();
  await dateOnlyCheck.page.clock.fastForward(3_600_010);
  assert(!(await sent(dateOnlyCheck.page)).some(message => message.channel === 'reminder'));
  await dateOnlyCheck.context.close();

  const cancelled = { ...festival, id: 'fixture-cancelled-festival', title: 'Cancelled Festival Fixture', is_cancelled: 'true' };
  const blocked = await open({ now: at('2026-12-02', '07:00:00'), rows: [cancelled, { ...festival, notification_eligible: '0' }], eventId: cancelled.id });
  assert.equal(await remind(blocked.page).count(), 0);
  assert(!(await sent(blocked.page)).some(message => message.body?.includes('Festival Fixture')));
  await blocked.context.close();

  const dec16 = at('2026-12-16', '07:00:00');
  const retired = await open({ now: dec16, rows: [legacyEvent], stored: {
    [obsolete]: { title: legacyEvent.title, remindAt: dec16 + 300_000 }
  }});
  await until(async () => !Object.hasOwn(await saved(retired.page), obsolete), 'Retired reminder was not pruned');
  assert(!(await sent(retired.page)).some(message => message.body?.includes('5-Spell') || message.title.includes('5-Spell')));
  await retired.context.close();
  console.log('Mocked browser notifications passed: SRIVANI boundaries, future reminders, reload, cancellation, multi-day festival, and retired event.');
} finally {
  await browser.close();
  await new Promise(done => server.close(done));
}
