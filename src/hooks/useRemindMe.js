/**
 * useRemindMe
 * 
 * Manages "Remind Me" state for temple events using browser Notification API
 * and localStorage for persistence across sessions.
 * 
 * Strategy:
 *  - Reminders are stored in localStorage as { eventId: { title, date, remindAt } }
 *  - On mount, we check if any pending reminders have passed and fire them
 *  - The hook exposes: isReminded, toggleReminder
 */
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tirumala_verse_reminders';

/** Load all reminders from localStorage */
function loadReminders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

/** Save all reminders to localStorage */
function saveReminders(reminders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  } catch {
    // ignore storage errors (private browsing etc.)
  }
}

/** Request notification permission, returns true if granted */
async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

/** Fire a browser notification immediately */
function fireNotification(title, body) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
    });
  } catch {
    // ignore in sandboxed environments
  }
}

/**
 * Calculate remind time:
 *  - If event is > 1 day away → remind 1 day before at 8:00 AM IST
 *  - If event is today or tomorrow → remind 2 hours before start (or now if start passed)
 *  - Returns a Date object (UTC)
 */
function calcRemindAt(startDate, startTime) {
  try {
    const [y, m, d] = startDate.split('-').map(Number);
    // Parse start time (e.g. "7:30 AM") to hours & minutes
    let eventHours = 7, eventMinutes = 0;
    if (startTime) {
      const match = startTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (match) {
        eventHours = parseInt(match[1]);
        eventMinutes = parseInt(match[2]);
        const meridiem = (match[3] || '').toUpperCase();
        if (meridiem === 'PM' && eventHours !== 12) eventHours += 12;
        if (meridiem === 'AM' && eventHours === 12) eventHours = 0;
      }
    }

    // Event start moment in IST (UTC+5:30)
    // IST offset: UTC = IST - 5h30m
    const eventIST = new Date(Date.UTC(y, m - 1, d, eventHours - 5, eventMinutes - 30));

    const now = Date.now();
    const msUntilEvent = eventIST.getTime() - now;
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    if (msUntilEvent > ONE_DAY_MS) {
      // Remind 1 day before at 8:00 AM IST
      const remindIST = new Date(Date.UTC(y, m - 1, d - 1, 8 - 5, 0 - 30));
      return remindIST.getTime() > now ? remindIST : new Date(now + 5000);
    } else {
      // Remind 2 hours before event (or immediately if less than 2h away)
      const twoHoursBefore = new Date(eventIST.getTime() - 2 * 60 * 60 * 1000);
      return twoHoursBefore.getTime() > now ? twoHoursBefore : new Date(now + 5000);
    }
  } catch {
    return new Date(Date.now() + 5000);
  }
}

/**
 * Schedule a delayed notification using setTimeout.
 * Returns a cleanup function to cancel.
 */
function scheduleNotification(remindAt, title, body) {
  const delay = remindAt - Date.now();
  if (delay <= 0) {
    fireNotification(title, body);
    return () => {};
  }
  // Cap at ~24.5 days (max reliable setTimeout in some browsers)
  const MAX_DELAY = 2_100_000_000;
  if (delay > MAX_DELAY) return () => {}; // too far in future for setTimeout

  const timer = setTimeout(() => fireNotification(title, body), delay);
  return () => clearTimeout(timer);
}

/**
 * useRemindMe — per-event hook
 *
 * @param {object} event  - { id, title, titleTe, startDate, startTime }
 * @param {string} lang   - 'en' | 'te'
 */
export default function useRemindMe(event, lang = 'en') {
  const eventId = event?.id;

  const [isReminded, setIsReminded] = useState(() => {
    if (!eventId) return false;
    const reminders = loadReminders();
    return Boolean(reminders[eventId]);
  });

  // On mount, fire any pending reminders that have already passed
  useEffect(() => {
    if (!eventId) return;
    const reminders = loadReminders();
    const rem = reminders[eventId];
    if (!rem) return;

    if (Date.now() >= rem.remindAt) {
      // Already past remind time — fire now
      if (Notification.permission === 'granted') {
        fireNotification(
          `🛕 Reminder: ${rem.title}`,
          rem.body || `The event is happening soon at Tirumala!`
        );
      }
    }
  }, [eventId]);

  const toggleReminder = useCallback(async () => {
    if (!eventId) return;

    const reminders = loadReminders();

    if (isReminded) {
      // Remove reminder
      delete reminders[eventId];
      saveReminders(reminders);
      setIsReminded(false);
    } else {
      // Set reminder — first ask for notification permission
      const granted = await requestNotificationPermission();

      const title = lang === 'en'
        ? (event?.title || 'Temple Event')
        : (event?.titleTe || event?.title || 'ఉత్సవం');

      const remindAt = calcRemindAt(event?.startDate, event?.startTime);
      const body = lang === 'en'
        ? `📅 ${event?.startDate || ''} — Don't miss this sacred event at Tirumala!`
        : `📅 ${event?.startDate || ''} — తిరుమలలో ఈ పవిత్ర ఉత్సవాన్ని మిస్ అవ్వకండి!`;

      reminders[eventId] = { title, body, remindAt: remindAt.getTime(), eventId };
      saveReminders(reminders);
      setIsReminded(true);

      if (granted) {
        scheduleNotification(remindAt, `🛕 Reminder: ${title}`, body);

        // Show instant confirmation notification
        fireNotification(
          lang === 'en' ? '✅ Reminder Set!' : '✅ రిమైండర్ సెట్ అయింది!',
          lang === 'en'
            ? `We'll remind you before "${title}" on ${event?.startDate}`
            : `"${title}" గురించి ${event?.startDate} కి ముందు రిమైండర్ ఇస్తాం`
        );
      }
    }
  }, [eventId, isReminded, event, lang]);

  return { isReminded, toggleReminder };
}
