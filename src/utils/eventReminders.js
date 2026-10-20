import { toast } from './toast';

const STORAGE_KEY = 'tirumala_event_reminders_v1';

export function getStoredReminders() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to parse event reminders:', err);
    return [];
  }
}

export function isEventReminderSet(eventId) {
  if (!eventId) return false;
  const reminders = getStoredReminders();
  return reminders.some(r => String(r.eventId) === String(eventId));
}

export async function requestNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  if (Notification.permission === 'denied') {
    return 'denied';
  }
  try {
    return await Notification.requestPermission();
  } catch (e) {
    console.warn('Error requesting notification permission:', e);
    return 'denied';
  }
}

export async function setEventReminder(event, timingType = 'morning', lang = 'en') {
  if (!event || !event.id) return false;

  const isTe = lang === 'te';
  const permission = await requestNotificationPermission();

  if (permission === 'denied') {
    toast.error(
      isTe
        ? 'నోటిఫికేషన్ అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతించండి.'
        : 'Notification permission was denied. Please enable notifications in your browser settings.'
    );
    return false;
  }

  const reminders = getStoredReminders();
  const existingIdx = reminders.findIndex(r => String(r.eventId) === String(event.id));

  const reminderObj = {
    eventId: String(event.id),
    title: event.title,
    titleTe: event.titleTe || event.title,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    timingType, // 'morning' | 'day_before' | 'event_time'
    timingDesc: event.time || event.timing || 'Morning',
    location: event.location || 'Tirumala',
    createdAt: new Date().toISOString(),
    lastNotifiedDate: null,
    notified: false
  };

  if (existingIdx >= 0) {
    reminders[existingIdx] = reminderObj;
  } else {
    reminders.push(reminderObj);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  } catch (e) {
    console.error('Failed to save reminder:', e);
  }

  const timingLabels = {
    morning: isTe ? 'ఉదయం 7:00 గంటలకు' : 'on event morning at 7:00 AM IST',
    day_before: isTe ? 'ఒక రోజు ముందు రాత్రి' : '1 day prior at 7:00 PM IST',
    event_time: isTe ? 'ఉత్సవం ప్రారంభ సమయానికి' : 'at event start time'
  };

  const label = timingLabels[timingType] || timingLabels.morning;
  toast.success(
    isTe
      ? `🔔 "${reminderObj.titleTe}" కోసం రిమైండర్ సెట్ చేయబడింది (${label})!`
      : `🔔 Reminder set for "${reminderObj.title}" (${label})!`
  );

  return true;
}

export function removeEventReminder(eventId, lang = 'en') {
  if (!eventId) return false;
  const isTe = lang === 'te';
  const reminders = getStoredReminders();
  const filtered = reminders.filter(r => String(r.eventId) !== String(eventId));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    toast.info(
      isTe
        ? 'రిమైండర్ తీసివేయబడింది.'
        : 'Reminder removed successfully.'
    );
    return true;
  } catch (e) {
    console.error('Failed to update reminders:', e);
    return false;
  }
}

/**
 * Checks for due event reminders and triggers browser alerts/notifications if due.
 * Also auto-enrolls quota release events for visitors who have notifications enabled.
 */
export async function checkAndDispatchDueReminders(events = [], lang = 'en') {
  if (typeof window === 'undefined') return;

  const isNotifEnabled = 
    (typeof localStorage !== 'undefined' && localStorage.getItem('tirumala_notifications_enabled') === 'true') ||
    ('Notification' in window && Notification.permission === 'granted');

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  let reminders = getStoredReminders();
  let hasUpdates = false;

  // If notifications are enabled, auto-enroll quota release events so subscribers don't miss quotas
  if (isNotifEnabled && Array.isArray(events) && events.length > 0) {
    const quotaEvents = events.filter(e => e && (e.category === 'quota-release' || String(e.id).startsWith('ttd-quota-')));
    for (const q of quotaEvents) {
      const exists = reminders.some(r => String(r.eventId) === String(q.id));
      if (!exists) {
        reminders.push({
          eventId: String(q.id),
          title: q.title,
          titleTe: q.titleTe || q.title,
          startDate: q.startDate,
          endDate: q.endDate || q.startDate,
          timingType: 'event_time',
          timingDesc: q.time || '10:00 AM IST',
          location: q.location || 'Official TTD Booking Portal',
          createdAt: new Date().toISOString(),
          lastNotifiedDate: null,
          notified: false,
          isQuotaRelease: true
        });
        hasUpdates = true;
      }
    }
  }

  if (!reminders || reminders.length === 0) {
    if (hasUpdates) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
      } catch (e) {
        console.warn(e);
      }
    }
    return;
  }

  // Check if browser permission is granted to show native notifications
  const hasBrowserPermission = ('Notification' in window && Notification.permission === 'granted');

  for (const rem of reminders) {
    // Check if event is scheduled for today or actively ongoing today
    const isDue = (rem.startDate === todayStr) || (rem.startDate <= todayStr && todayStr <= (rem.endDate || rem.startDate));

    if (isDue && rem.lastNotifiedDate !== todayStr) {
      const isTe = lang === 'te';
      const isQuota = Boolean(rem.isQuotaRelease || String(rem.eventId).startsWith('ttd-quota-'));

      const notifTitle = isQuota
        ? (isTe ? `🌸 టీటీడీ కోటా విడుదల హెచ్చరిక!` : `🌸 TTD Quota Release Alert!`)
        : (isTe ? `🌸 ఉత్సవ రిమైండర్: ${rem.titleTe || rem.title}` : `🌸 Reminder: ${rem.title}`);

      const notifBody = isQuota
        ? (isTe
            ? `${rem.titleTe || rem.title} – సమయం: ${rem.timingDesc}. అధికారిక పోర్టల్ ttdevasthanams.ap.gov.in లో అందుబాటులో ఉంటుంది.`
            : `${rem.title} is active today! Timing: ${rem.timingDesc}. Booking exclusively on ttdevasthanams.ap.gov.in.`)
        : (isTe
            ? `నేడు (${rem.startDate}) ${rem.location} వద్ద నిర్వహించబడుతుంది. సమయం: ${rem.timingDesc}.`
            : `Scheduled today (${rem.startDate}) at ${rem.location}. Timing: ${rem.timingDesc}.`);

      if (hasBrowserPermission) {
        try {
          if ('serviceWorker' in navigator) {
            const reg = await navigator.serviceWorker.ready;
            await reg.showNotification(notifTitle, {
              body: notifBody,
              icon: '/logo-64.png',
              badge: '/logo-64.png',
              data: {
                url: `https://thetirumalaverse.in/calendar?event=${rem.eventId}`
              },
              tag: `reminder-${rem.eventId}-${todayStr}`
            });
          } else {
            new Notification(notifTitle, {
              body: notifBody,
              icon: '/logo-64.png'
            });
          }
        } catch (err) {
          console.warn('Could not dispatch reminder notification:', err);
        }
      }

      rem.lastNotifiedDate = todayStr;
      if (todayStr >= (rem.endDate || rem.startDate)) {
        rem.notified = true;
      }
      hasUpdates = true;
    }
  }

  if (hasUpdates) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    } catch (e) {
      console.warn(e);
    }
  }
}
