import assert from 'node:assert/strict';
import { test } from 'node:test';
import { INITIAL_EVENTS } from '../src/data/initialEvents.js';
import {
  TTD_BOOKING_PORTAL, VAIKUNTHA_2026_BOOKING_IDS, VAIKUNTHA_2026_FESTIVAL, VAIKUNTHA_2026_RELEASES, VAIKUNTHA_2026_SOURCE
} from '../src/data/vaikunthaDarshan2026.js';
import { filterCalendarEvents } from '../src/utils/calendarSearch.js';
import { expandFestivalCalendarEvents, getEventsForDate, projectVaikunthaDay } from '../src/utils/calendarMonthUtils.js';
import { mergeEvents } from '../src/utils/eventMerge.js';
import { getEventStatus, openGoogleCalendar } from '../src/utils/eventStatus.js';
import { evaluateEventNotificationDue, getISTNowComponents } from '../processEventNotifications.mjs';

test('October Garuda search keeps matches in English and Telugu without spreading overviews across dates', () => {
  const overview = {
    id: 'overview',
    templeId: 'tirumala-main',
    title: 'Navaratri Brahmotsavam',
    startDate: '2026-10-10',
    endDate: '2026-10-18',
    vahanam: 'Garuda Vahanam (Oct 14)',
    description: 'Garuda Vahana Seva is one of the nine days.'
  };
  const matching = INITIAL_EVENTS.find(event =>
    event.startDate.startsWith('2026-10') && /garuda vahana/i.test(event.title)
  );
  assert.ok(matching, 'Expected an actual October Garuda event');
  const events = [overview, matching, { ...matching, id: 'other-shrine', templeId: 'tiruchanur' }];
  for (const query of ['Garuda Vahanam', ' GARUDA  Vahana Seva ', 'గరుడ వాహనం', 'గరుడ వాహన సేవ']) {
    const filtered = filterCalendarEvents(events, { query, templeId: matching.templeId });
    assert.deepEqual(filtered.map(event => event.id), [matching.id]);
    assert.deepEqual(getEventsForDate(filtered, matching.startDate).map(event => event.id), [matching.id]);
    assert.deepEqual(getEventsForDate(filtered, '2026-10-01'), []);
  }
  assert.deepEqual(filterCalendarEvents(events, { query: '', templeId: matching.templeId }).map(event => event.id), [overview.id, matching.id]);
  assert.deepEqual(filterCalendarEvents(events, { query: 'Garuda Vahana Seva', templeId: 'tiruchanur' }).map(event => event.id), ['other-shrine']);
});

test('the retired window cannot return from fallback, cache, or Supabase', () => {
  const legacy = {
    id: 'ttd-2026-12-vaikunta-ekadasi-spells',
    title: 'Tirumala Vaikunta Ekadasi 5-Spell Seva & Darshan Window (Dec 16 – 30)',
    startDate: '2026-12-16', endDate: '2026-12-30'
  };
  const firstDays = INITIAL_EVENTS.find(event => event.id === 'ttd-2026-12-20');
  const oldCloud = {
    ...firstDays, title: 'Old title', endDate: '2026-12-21', startTime: '01:30:00',
    notificationEligible: true, descriptionTe: 'Old Telugu text', images: ['existing.jpg']
  };
  const obsoleteContinuation = { ...firstDays, id: 'ttd-2026-12-vaikuntha-dwara-dec22-29', startDate: '2026-12-22' };
  const current = mergeEvents([legacy, oldCloud, obsoleteContinuation], [
    { ...legacy, id: 'legacy-clone', title: legacy.title + ' (Day 15)' },
    ...INITIAL_EVENTS
  ], new Set(), { preferInitial: true });
  assert.ok(!current.some(event => event.id === legacy.id || event.id === 'legacy-clone'));
  assert.ok(!mergeEvents([legacy], [], new Set()).length);
  for (let day = 16; day <= 30; day++) {
    assert.ok(!getEventsForDate(current, `2026-12-${day}`).some(event => event.id === legacy.id));
  }
  assert.deepEqual(evaluateEventNotificationDue({
    ...legacy, temple_id: 'tirumala-main', start_date: legacy.startDate, notification_eligible: true
  }, getISTNowComponents('2026-12-16T07:00:00+05:30')), {
    isDue: false, reason: 'retired_event'
  });
  const corrected = current.find(event => event.id === firstDays.id);
  assert.equal(corrected.title, firstDays.title);
  assert.equal(corrected.descriptionTe, firstDays.descriptionTe);
  assert.deepEqual(corrected.images, ['existing.jpg']);
  assert.equal(corrected.endDate, '2026-12-29');
  assert.equal(corrected.startTime, null);
  assert.equal(corrected.notificationEligible, false);
  assert.ok(!current.some(event => event.id === obsoleteContinuation.id));
  assert.ok(current.some(event => event.id === 'ttd-quota-2026-12-vaikunta-ekadasi-slots'));
});

test('the six Vaikuntha calendar milestones use official IST dates and bilingual text', () => {
  assert.deepEqual(VAIKUNTHA_2026_RELEASES.map(event => [event.startDate, event.startTime]), [
    ['2026-11-28', '10:00:00'],
    ['2026-11-30', '10:00:00'],
    ['2026-12-01', '10:00:00'],
    ['2026-12-05', '17:00:00'],
    ['2026-12-07', '15:00:00'],
    ['2026-12-08', '10:00:00']
  ]);
  for (const event of VAIKUNTHA_2026_RELEASES) {
    assert.equal(INITIAL_EVENTS.filter(item => item.id === event.id).length, 1);
    assert.equal(event.notificationEligible, false);
    assert.match(event.titleTe + event.descriptionTe, /[\u0c00-\u0c7f]/);
  }
  assert.match(VAIKUNTHA_2026_RELEASES[0].descriptionTe, /మహాలఘు దర్శనం/);
  const quota = VAIKUNTHA_2026_RELEASES[0];
  assert.equal(getEventStatus(quota, getISTNowComponents('2026-11-28T10:15:00+05:30')).statusEn, 'Scheduled time reached');
  assert.equal(getEventStatus(quota, getISTNowComponents('2026-11-29T10:15:00+05:30')).statusEn, 'Scheduled date passed');
  assert.equal(VAIKUNTHA_2026_BOOKING_IDS.size, 6);
  assert.equal(VAIKUNTHA_2026_BOOKING_IDS.has(VAIKUNTHA_2026_FESTIVAL.id), false);
  assert.match(VAIKUNTHA_2026_RELEASES[2].description, /registration runs from December 1/i);
  assert.equal(new URL(TTD_BOOKING_PORTAL).hostname, 'ttdevasthanams.ap.gov.in');
  assert.equal(new URL(VAIKUNTHA_2026_SOURCE).hostname, 'news.tirumala.org');
});

test('one continuous Vaikunta festival numbers all ten days and has religious copy in both languages', () => {
  const festival = INITIAL_EVENTS.find(event => event.id === VAIKUNTHA_2026_FESTIVAL.id);
  assert.deepEqual([festival.startDate, festival.endDate], ['2026-12-20', '2026-12-29']);
  assert.equal(festival.startTime, null);
  assert.equal(festival.endTime, null);
  assert.equal(INITIAL_EVENTS.filter(event => event.id === festival.id).length, 1);
  assert.ok(!INITIAL_EVENTS.some(event => event.id === 'ttd-2026-12-vaikuntha-dwara-dec22-29'));
  const cards = expandFestivalCalendarEvents([festival]);
  const booking = /booking|quota|e[–-]?dip|srivani|\bvip\b|special entry|ticket|token|బుకింగ్|కోటా|ఈ[-–]డిప్|శ్రీవాణి|వీఐపీ|ప్రత్యేక ప్రవేశ|టికెట్|టోకెన్/i;
  assert.equal(cards.length, 10);
  for (let index = 0; index < 10; index++) {
    const date = `2026-12-${20 + index}`;
    const day = index + 1;
    const [grid] = getEventsForDate([festival], date);
    const title = index === 0 ? 'Vaikunta Ekadasi' : index === 1 ? 'Vaikunta Dwadasi' : 'Vaikunta Dwara Darshanam';
    const titleTe = index === 0 ? 'వైకుంఠ ఏకాదశి' : index === 1 ? 'వైకుంఠ ద్వాదశి' : 'వైకుంఠ ద్వార దర్శనం';
    assert.equal(grid.id, festival.id);
    assert.equal(grid.calendarDate, date);
    assert.equal(grid.dayNumber, day);
    assert.equal(grid.title, `${title} (Day ${day})`);
    assert.equal(grid.titleTe, `${titleTe} (${day}వ రోజు)`);
    assert.doesNotMatch(grid.description, booking);
    assert.doesNotMatch(grid.descriptionTe, booking);
    assert.deepEqual(cards[index], grid);
  }
  assert.match(cards[0].description, /Golden Chariot/);
  assert.match(cards[9].description, /Pedda Sattumora/);
  assert.ok(INITIAL_EVENTS.some(event => event.id === 'ttd-2026-12-29-tirumala-pedda-sattumora'));
  assert.deepEqual(getEventsForDate([festival], '2026-12-19'), []);
  assert.deepEqual(getEventsForDate([festival], '2026-12-30'), []);
  assert.equal(projectVaikunthaDay(festival, '2026-12-20-invalid'), festival);
  const openedUrls = [];
  globalThis.window = { open: url => openedUrls.push(new URL(url)) };
  try {
    openGoogleCalendar(cards[9]);
  } finally {
    delete globalThis.window;
  }
  assert.equal(openedUrls[0].searchParams.get('dates'), '20261229/20261230');
  assert.equal(evaluateEventNotificationDue({
    id: festival.id, temple_id: festival.templeId, start_date: festival.startDate,
    start_time: '01:30:00', notification_eligible: true
  }, getISTNowComponents('2026-12-20T01:00:00+05:30')).isDue, false);
});
