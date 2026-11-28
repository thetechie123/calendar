import { VAIKUNTHA_2026_DAY_COPY, VAIKUNTHA_2026_FESTIVAL } from '../data/vaikunthaDarshan2026.js';
import { offsetCalendarDate } from './calendarMonthUtils.js';

const normalize = (value = '') => value.normalize('NFKC').toLowerCase()
  .replace(/\bvaikuntha\b/g, 'vaikunta').replace(/[\p{P}\p{Z}\s]+/gu, ' ').trim();

const GARUDA_NAMES = new Set([
  'garuda vahanam', 'garuda vahana', 'garuda vahana seva', 'garuda vahanam seva',
  'గరుడ వాహనం', 'గరుడ వాహన సేవ', 'గరుడ వాహనము', 'గరుడ వాహనము సేవ'
]);

const garudaTitle = /\bgaruda vahana(?:m)?\b|గరుడ వాహన/u;

const GOLDEN_CHARIOT_NAMES = new Set([
  'golden chariot', 'golden chariot procession', 'swarna rathotsavam', 'swarna ratham',
  'swarnaratham', 'స్వర్ణ రథం', 'స్వర్ణరథం', 'స్వర్ణ రథోత్సవం', 'స్వర్ణరథోత్సవం'
]);

function getFestivalSearchDay(event, search) {
  if (!search || event.id !== VAIKUNTHA_2026_FESTIVAL.id) return null;
  const { opening, dwadasi } = VAIKUNTHA_2026_DAY_COPY;
  if (GOLDEN_CHARIOT_NAMES.has(search)
    || [normalize(opening.title), opening.titleTe, 'ekadasi', 'ఏకాదశి'].includes(search)) {
    return event.startDate;
  }
  if ([normalize(dwadasi.title), dwadasi.titleTe, 'dwadasi', 'ద్వాదశి'].includes(search)) {
    return offsetCalendarDate(event.startDate, 1);
  }
  return null;
}

export function filterCalendarEvents(events, { query = '', templeId = 'all' } = {}) {
  const search = normalize(query);

  return events.filter(event => {
    if (templeId !== 'all' && event.templeId !== templeId) return false;
    if (!search || getFestivalSearchDay(event, search)) return true;

    const titles = [event.title, event.titleTe].map(value => normalize(value || ''));
    const isMultiDay = event.endDate && event.endDate !== event.startDate;

    if (GARUDA_NAMES.has(search)) {
      const fields = isMultiDay ? titles : [...titles, normalize(event.vahanam || '')];
      return fields.some(field => garudaTitle.test(field));
    }

    const fields = [...titles, event.location];
    if (!isMultiDay) fields.push(event.description, event.descriptionTe, event.vahanam);
    return fields.some(value => normalize(value || '').includes(search));
  }).map(event => {
    const calendarDateLimit = getFestivalSearchDay(event, search);
    return calendarDateLimit ? { ...event, calendarDateLimit } : event;
  });
}
