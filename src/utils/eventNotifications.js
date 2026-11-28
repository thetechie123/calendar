import { getISTNowComponents, parseTimeToMinutes } from './indiaTime.js';
import { parseTimeWindow } from './eventStatus.js';
import { isRetiredEvent } from './retiredEvents.js';

const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function normalizeEventFlag(value, fallback) {
  if (value == null) return fallback;
  const normalized = String(value).trim().toLowerCase();
  return normalized === 'true' || normalized === '1';
}

export function canUseEventNotifications(event) {
  return Boolean(event?.id && !isRetiredEvent(event)
    && !normalizeEventFlag(event.isCancelled ?? event.is_cancelled, false));
}

// Use the same 07:00 IST default as the existing calendar for date-only events.
export function getEventStartInstant(event) {
  const date = event?.startDate ?? event?.start_date;
  if (!DATE.test(date || '')) return null;
  const midnight = Date.parse(date + 'T00:00:00+05:30');
  if (!Number.isFinite(midnight) || getISTNowComponents(new Date(midnight)).dateStr !== date) return null;

  const explicit = event.startTime ?? event.start_time;
  const minutes = explicit ? parseTimeToMinutes(explicit) : (parseTimeWindow(event.time)?.startMins ?? 420);
  if (minutes == null || minutes < 0 || minutes >= 1440) return null;

  const seconds = Number(explicit?.match(/^\d{1,2}:\d{2}:(\d{2})$/)?.[1] ?? 0);
  if (seconds >= 60) return null;
  return midnight + (minutes * 60 + seconds) * 1000;
}

export function getReminderStart(event, now = Date.now()) {
  if (!canUseEventNotifications(event)) return null;
  const start = getEventStartInstant(event);
  return start != null && now < start ? start : null;
}

export function getReminderTime(start, now) {
  if (start <= now) return null;
  const midnightIST = Date.parse(getISTNowComponents(new Date(start)).dateStr + 'T00:00:00+05:30');
  const preferred = start - now > DAY_MS ? midnightIST - DAY_MS + 8 * HOUR_MS : start - 2 * HOUR_MS;
  const remindAt = Math.max(preferred, now + 5000);
  return remindAt < start ? remindAt : null;
}

export function findDailyAlertEvent(events, now = Date.now()) {
  const today = getISTNowComponents(new Date(now)).dateStr;
  return events.find(event => {
    if (!canUseEventNotifications(event)
      || !normalizeEventFlag(event.notificationEligible ?? event.notification_eligible, true)) return false;
    const temple = event.templeId ?? event.temple_id;
    const startDate = event.startDate ?? event.start_date;
    const endDate = event.endDate ?? event.end_date ?? startDate;
    if (!startDate || (temple && temple !== 'tirumala-main') || today < startDate || today > endDate) return false;
    return event.category !== 'quota-release' || getReminderStart(event, now) != null;
  });
}
