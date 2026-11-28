import assert from 'node:assert/strict';
import test from 'node:test';
import { filterCalendarEvents } from '../src/utils/calendarSearch.js';
import { getEventsForDate } from '../src/utils/calendarMonthUtils.js';
import { formatEventTiming } from '../src/utils/indiaTime.js';
import { findDailyAlertEvent, getReminderStart, getReminderTime } from '../src/utils/eventNotifications.js';
import { INITIAL_EVENTS } from '../src/data/initialEvents.js';
import { VAIKUNTHA_2026_RELEASES } from '../src/data/vaikunthaDarshan2026.js';

const at = (date, time) => Date.parse(date + 'T' + time + '+05:30');
const temple = 'tirumala-main';
const date = '2026-12-01';
const festival = { id: 'festival', templeId: temple, startDate: date, category: 'special-puja' };
const srivani = VAIKUNTHA_2026_RELEASES[0];

test('SRIVANI is never automatic; manual reminders stop at 10 AM IST', () => {
  for (const time of ['09:59:59', '10:00:00', '10:00:01']) {
    const now = at('2026-11-28', time);
    assert.equal(findDailyAlertEvent([srivani], now), undefined);
    assert.equal(getReminderStart(srivani, now), time < '10:00:00' ? at('2026-11-28', '10:00:00') : null);
    const eligibleQuota = { ...srivani, notificationEligible: true };
    assert.equal(findDailyAlertEvent([eligibleQuota], now), time < '10:00:00' ? eligibleQuota : undefined);
  }
});

test('earlier than 10 AM on November 30 and December 1, manual reminders remain available independently', () => {
  const cases = [
    [VAIKUNTHA_2026_RELEASES[1], '2026-11-30'],
    [VAIKUNTHA_2026_RELEASES[2], '2026-12-01']
  ];
  for (const [event, d] of cases) {
    const morning = at(d, '07:00:00');
    const start = getReminderStart(event, morning);
    assert.equal(start, at(d, '10:00:00'));
    assert.equal(getReminderTime(start, morning), at(d, '08:00:00'));
    assert.equal(findDailyAlertEvent([event], morning), undefined);
  }
});

test('Supabase notification and cancellation flags normalize and do not suppress manual opt-in', () => {
  const now = at(date, '06:00:00');
  for (const flag of [false, 'false', 0, '0']) {
    const event = { ...festival, notification_eligible: flag };
    assert.equal(findDailyAlertEvent([event], now), undefined);
    assert.equal(getReminderStart(event, now), at(date, '07:00:00'));
  }
  for (const flag of [true, 'true', 1, '1']) {
    const event = { ...festival, notification_eligible: flag };
    assert.equal(findDailyAlertEvent([event], now), event);
  }
  for (const flag of [true, 'true', 1, '1']) {
    const event = { ...festival, is_cancelled: flag };
    assert.equal(findDailyAlertEvent([event], now), undefined);
    assert.equal(getReminderStart(event, now), null);
  }
});

test('date-only, timed, multi-day, and retired events use their respective boundaries', () => {
  assert.equal(getReminderStart(festival, at(date, '06:59:59')), at(date, '07:00:00'));
  assert.equal(getReminderStart(festival, at(date, '07:00:00')), null);
  assert.equal(findDailyAlertEvent([festival], at(date, '16:00:00')), festival);
  const timed = { ...festival, startTime: '10:01:30' };
  assert.equal(getReminderStart(timed, at(date, '10:01:29')), at(date, '10:01:30'));
  assert.equal(getReminderStart(timed, at(date, '10:01:30')), null);
  const multi = { ...timed, endDate: '2026-12-02' };
  assert.equal(getReminderStart(multi, at('2026-12-02', '06:00:00')), null);
  assert.equal(findDailyAlertEvent([multi], at('2026-12-02', '06:00:00')), multi);
  assert.equal(findDailyAlertEvent([multi], at('2026-12-03', '06:00:00')), undefined);
  const retired = { ...festival, id: 'ttd-2026-12-vaikunta-ekadasi-spells' };
  assert.equal(findDailyAlertEvent([retired], at(date, '06:00:00')), undefined);
  assert.equal(getReminderStart(retired, at(date, '06:00:00')), null);
});

test('Golden Chariot search in either language points to December 20 without relabeling the official two-day schedule', () => {
  const event = INITIAL_EVENTS.find(item => item.id === 'ttd-2026-12-20');
  assert.equal(event.endDate, '2026-12-29');
  for (const query of ['Golden Chariot', 'Swarna Rathotsavam', 'స్వర్ణ రథోత్సవం']) {
    const results = filterCalendarEvents([event], { query });
    assert.equal(results.length, 1);
    assert.equal(getEventsForDate(results, '2026-12-20')[0].id, event.id);
    assert.equal(getEventsForDate(results, '2026-12-21').length, 0);
  }
  assert.equal(formatEventTiming(event), 'Darshan time not announced');
  assert.equal(formatEventTiming(event, 'te'), 'దర్శన సమయం ప్రకటించలేదు');
});
