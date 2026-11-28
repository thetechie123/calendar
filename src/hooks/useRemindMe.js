import { useEffect, useState } from 'react';
import { isRetiredEvent } from '../utils/retiredEvents.js';
import { getReminderStart, getReminderTime } from '../utils/eventNotifications.js';

const STORAGE_KEY = 'tirumala_verse_reminders';
const REMINDERS_CHANGED = 'tirumala-reminders-changed';
const MAX_TIMER_DELAY = 2_100_000_000;

function loadReminders() {
  try {
    const reminders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return reminders && typeof reminders === 'object' && !Array.isArray(reminders) ? reminders : {};
  } catch {
    return {};
  }
}

function saveReminders(reminders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    window.dispatchEvent(new Event(REMINDERS_CHANGED));
    return true;
  } catch {
    return false;
  }
}

function observeReminders(refresh) {
  const onStorage = event => {
    if (event.key === STORAGE_KEY || event.key === null) refresh();
  };
  window.addEventListener(REMINDERS_CHANGED, refresh);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(REMINDERS_CHANGED, refresh);
    window.removeEventListener('storage', onStorage);
  };
}

async function requestNotificationPermission() {
  if (typeof Notification === 'undefined') return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  return await Notification.requestPermission() === 'granted';
}

function fireNotification({ title, body }) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  try {
    new Notification('🛕 Reminder: ' + title, { body, icon: '/favicon.ico', badge: '/favicon.ico' });
  } catch {
    // Some browsers disable the Notification constructor.
  }
}

// One scheduler per app, independent of which calendar cards happen to be mounted.
export function useEventReminderScheduler(events, enabled) {
  useEffect(() => {
    if (!enabled) return;
    const byId = new Map(events.map(event => [String(event.id), event]));
    const timers = new Map();

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers.clear();
    }

    function arm(id, reminder) {
      const delay = Math.max(0, reminder.remindAt - Date.now());
      timers.set(id, setTimeout(() => {
        const reminders = loadReminders();
        const pending = reminders[id];
        if (!pending || pending.remindAt !== reminder.remindAt) return;
        const start = getReminderStart(byId.get(id));
        if (start != null && pending.remindAt < start && Date.now() < pending.remindAt) {
          arm(id, pending);
          return;
        }
        delete reminders[id];
        if (saveReminders(reminders) && start != null && Date.now() < start && pending.remindAt < start) {
          fireNotification(pending);
        }
      }, Math.min(delay, MAX_TIMER_DELAY)));
    }

    function refresh() {
      clearTimers();
      const now = Date.now();
      const reminders = loadReminders();
      let discarded = false;
      for (const [id, reminder] of Object.entries(reminders)) {
        const event = byId.get(id);
        const start = event ? getReminderStart(event, now) : null;
        if (isRetiredEvent({ id }) || !Number.isFinite(reminder?.remindAt) || reminder.remindAt < now
          || (event && (start == null || reminder.remindAt >= start))
          || (reminder?.startsAt != null && reminder.startsAt <= now)) {
          delete reminders[id];
          discarded = true;
        }
      }
      if (discarded) {
        saveReminders(reminders);
        return;
      }
      for (const [id, reminder] of Object.entries(reminders)) {
        if (byId.has(id)) arm(id, reminder);
      }
    }

    const unobserve = observeReminders(refresh);
    refresh();
    return () => {
      unobserve();
      clearTimers();
    };
  }, [events, enabled]);
}

export default function useRemindMe(event, lang = 'en') {
  const eventId = event?.id;
  const [isReminded, setIsReminded] = useState(() => Boolean(eventId && loadReminders()[eventId]));

  useEffect(() => {
    const refresh = () => setIsReminded(Boolean(eventId && loadReminders()[eventId]));
    const unobserve = observeReminders(refresh);
    refresh();
    return unobserve;
  }, [eventId]);

  async function toggleReminder() {
    if (!eventId) return;
    const reminders = loadReminders();
    if (reminders[eventId]) {
      delete reminders[eventId];
      saveReminders(reminders);
      return;
    }

    if (getReminderStart(event) == null || !await requestNotificationPermission()) return;
    const now = Date.now();
    const start = getReminderStart(event, now);
    const remindAt = start == null ? null : getReminderTime(start, now);
    if (remindAt == null) return;

    const current = loadReminders();
    current[eventId] = {
      title: lang === 'te' ? (event.titleTe || event.title) : event.title,
      body: '📅 ' + (event.startDate ?? event.start_date) + ' (IST)',
      remindAt,
      startsAt: start
    };
    saveReminders(current);
  }

  return { isReminded, toggleReminder, canRemind: getReminderStart(event) != null };
}
