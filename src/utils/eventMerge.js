import { VAIKUNTHA_2026_FIRST_DAYS } from '../data/vaikunthaDarshan2026.js';
import { normalizeEventFlag } from './eventNotifications.js';
import { isRetiredEvent } from './retiredEvents.js';

export function mergeEvents(
  initialEvents,
  storedEvents,
  deletedIds,
  options = {}
) {
  const { preferInitial = false } = options;
  const isVisible = event => event?.id && !deletedIds.has(event.id) && !isRetiredEvent(event);
  const applyFestivalNotice = event => event.id === VAIKUNTHA_2026_FIRST_DAYS.id
    ? { ...event, ...VAIKUNTHA_2026_FIRST_DAYS }
    : event;
  const canonical = initialEvents.filter(isVisible);

  if (!Array.isArray(storedEvents) || storedEvents.length === 0) {
    return canonical.map(applyFestivalNotice);
  }

  const cleanStored = storedEvents.filter(event => {
    if (!isVisible(event)) return false;

    const title = (event.title || "").toLowerCase();
    const titleTe = event.titleTe || "";
    const description = (event.description || "").toLowerCase();

    return (
      !title.includes("independence") &&
      !titleTe.includes("స్వాతంత్ర్య") &&
      !description.includes("independence")
    );
  });

  const storedMap = new Map(
    cleanStored.map(event => [event.id, event])
  );

  const mergedInitial = canonical
    .map(event => {
      if (!storedMap.has(event.id)) {
        return event;
      }

      const stored = storedMap.get(event.id);

      /*
       * When the fresh source is Supabase, it is authoritative.
       *
       * This is especially important for image deletion:
       *
       * Supabase:
       *   images: []
       *   image_url: ""
       *
       * must NOT be overwritten by an old localStorage copy
       * containing the deleted image URL.
       */
      if (preferInitial) {
        return {
          ...stored,
          ...event
        };
      }

      return {
        ...stored,

        // Canonical notification fields from initialEvents
        // are ALWAYS authoritative.
        startTime:
          event.startTime !== undefined
            ? event.startTime
            : null,

        notificationEligible: normalizeEventFlag(event.notificationEligible ?? event.notification_eligible, true)
          && normalizeEventFlag(stored.notificationEligible ?? stored.notification_eligible, true),
        isCancelled: normalizeEventFlag(event.isCancelled ?? event.is_cancelled, false)
          || normalizeEventFlag(stored.isCancelled ?? stored.is_cancelled, false),
      };
    });

  const initialIds = new Set(
    initialEvents.map(event => event.id)
  );

  /*
   * Keep local-only custom events.
   * These may exist locally before cloud synchronization.
   */
  const customEvents = cleanStored.filter(
    event => !initialIds.has(event.id)
  );

  return [...mergedInitial, ...customEvents].map(applyFestivalNotice);
}