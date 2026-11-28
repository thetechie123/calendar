import { getIndiaDateString } from './indiaTime.js';
import { VAIKUNTHA_2026_DAY_COPY, VAIKUNTHA_2026_FESTIVAL } from '../data/vaikunthaDarshan2026.js';

export const MONTHS_LIST = [
  { year: 2026, month: 0, label: 'January 2026', labelTe: 'జనవరి 2026' },
  { year: 2026, month: 1, label: 'February 2026', labelTe: 'ఫిబ్రవరి 2026' },
  { year: 2026, month: 2, label: 'March 2026', labelTe: 'మార్చి 2026' },
  { year: 2026, month: 3, label: 'April 2026', labelTe: 'ఏప్రిల్ 2026' },
  { year: 2026, month: 4, label: 'May 2026', labelTe: 'మే 2026' },
  { year: 2026, month: 5, label: 'June 2026', labelTe: 'జూన్ 2026' },
  { year: 2026, month: 6, label: 'July 2026', labelTe: 'జూలై 2026' },
  { year: 2026, month: 7, label: 'August 2026', labelTe: 'ఆగస్టు 2026' },
  { year: 2026, month: 8, label: 'September 2026', labelTe: 'సెప్టెంబర్ 2026' },
  { year: 2026, month: 9, label: 'October 2026', labelTe: 'అక్టోబర్ 2026' },
  { year: 2026, month: 10, label: 'November 2026', labelTe: 'నవంబర్ 2026' },
  { year: 2026, month: 11, label: 'December 2026', labelTe: 'డిసెంబర్ 2026' },
  { year: 2027, month: 0, label: 'January 2027', labelTe: 'జనవరి 2027' },
  { year: 2027, month: 1, label: 'February 2027', labelTe: 'ఫిబ్రవరి 2027' },
  { year: 2027, month: 2, label: 'March 2027', labelTe: 'మార్చి 2027' },
  { year: 2027, month: 3, label: 'April 2027', labelTe: 'ఏప్రిల్ 2027' }
];

export const getTodayIST = () => getIndiaDateString();

export const getDateString = (year, month, day) => {
  const monthStr = String(month + 1).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  return `${year}-${monthStr}-${dayStr}`;
};

export const getMonthPrefix = (year, month) =>
  `${year}-${String(month + 1).padStart(2, '0')}`;

const DAY_MS = 86_400_000;
const calendarTimestamp = date => Date.parse(`${date}T00:00:00Z`);
const calendarDayOffset = (start, date) => (calendarTimestamp(date) - calendarTimestamp(start)) / DAY_MS;

export function offsetCalendarDate(date, offset) {
  return new Date(calendarTimestamp(date) + offset * DAY_MS).toISOString().slice(0, 10);
}

export function projectVaikunthaDay(event, date = event?.startDate) {
  if (event?.id !== VAIKUNTHA_2026_FESTIVAL.id || !/^\d{4}-\d{2}-\d{2}$/.test(date || '')
    || date < event.startDate || date > event.endDate) return event;

  const dayNumber = calendarDayOffset(event.startDate, date) + 1;
  const copy = dayNumber === 1 ? VAIKUNTHA_2026_DAY_COPY.opening
    : dayNumber === 2 ? VAIKUNTHA_2026_DAY_COPY.dwadasi
    : date === event.endDate ? VAIKUNTHA_2026_DAY_COPY.conclusion
    : VAIKUNTHA_2026_DAY_COPY.continuation;

  return {
    ...event,
    ...copy,
    calendarDate: date,
    dayNumber,
    title: `${copy.title || VAIKUNTHA_2026_FESTIVAL.title} (Day ${dayNumber})`,
    titleTe: `${copy.titleTe || VAIKUNTHA_2026_FESTIVAL.titleTe} (${dayNumber}వ రోజు)`
  };
}

export function expandFestivalCalendarEvents(events) {
  return events.flatMap(event => {
    if (event.id !== VAIKUNTHA_2026_FESTIVAL.id) return [event];
    if (event.calendarDateLimit) return [projectVaikunthaDay(event, event.calendarDateLimit)];
    const numberOfDays = calendarDayOffset(event.startDate, event.endDate) + 1;
    return Array.from({ length: numberOfDays }, (_, index) =>
      projectVaikunthaDay(event, offsetCalendarDate(event.startDate, index))
    );
  });
}

export const getInitialMonthIndex = () => {
  const today = getTodayIST();
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7)) - 1;

  const index = MONTHS_LIST.findIndex(
    item => item.year === year && item.month === month
  );

  return index !== -1 ? index : 6;
};

const BRAHMOTSAVAM_VAHANAS = {
  1: { en: "Pedda Sesha Vahanam", te: "పెద్ద శేష వాహనం" },
  2: { en: "Chinna Sesha & Hamsa Vahanam", te: "చిన్న శేష & హంస వాహనం" },
  3: { en: "Simha & Muthyapu Pandiri Vahanam", te: "సింహ & ముత్యపు పందిరి వాహనం" },
  4: { en: "Kalpa Vriksha & Sarva Bhoopala Vahanam", te: "కల్ప వృక్ష & సర్వ భూపాల వాహనం" },
  5: { en: "Mohini Avataram & Garuda Vahanam", te: "మోహినీ అవతారం & గరుడ వాహనం" },
  6: { en: "Hanumantha & Gaja Vahanam", te: "హనుమంత & గజ వాహనం" },
  7: { en: "Surya Prabha & Chandra Prabha Vahanam", te: "సూర్య ప్రభ & చంద్ర ప్రభ వాహనం" },
  8: { en: "Rathotsavam & Aswa Vahanam", te: "రథోత్సవం & అశ్వ వాహనం" },
  9: { en: "Chakra Snanam", te: "చక్ర స్నానం" }
};

export const getEventsForDate = (events, dateStr) => {
  if (!dateStr || !Array.isArray(events)) return [];
  
  const filtered = events.filter(evt => {
    if (!evt?.startDate) return false;
    if (evt.calendarDateLimit && evt.calendarDateLimit !== dateStr) return false;
    const end = evt.endDate || evt.startDate;
    return evt.startDate <= dateStr && dateStr <= end;
  });

  // Detect whether specific single-day Brahmotsavam vahana entries exist on this date
  const hasSpecificDayBrahmotsavam = filtered.some(evt => {
    const isSingleDay = !evt.endDate || evt.startDate === evt.endDate;
    const titleLower = (evt.title || '').toLowerCase();
    const isBrahmotsavam =
      evt.category === 'brahmotsavam' ||
      evt.category === 'vahana-seva' ||
      titleLower.includes('brahmotsavam') ||
      titleLower.includes('vahanam');
    return isSingleDay && isBrahmotsavam;
  });

  const uniqueMap = new Map();
  
  filtered.forEach(evt => {
    const isMultiDay = evt.startDate && evt.endDate && evt.startDate !== evt.endDate;
    const titleLower = (evt.title || '').toLowerCase();
    const isGenericMultiDayBrahmotsavam =
      isMultiDay && (titleLower.includes('brahmotsavam') || evt.category === 'brahmotsavam');

    // Suppress redundant multi-day overview card if granular morning/night vahanas already exist
    if (hasSpecificDayBrahmotsavam && isGenericMultiDayBrahmotsavam) {
      return;
    }

    const key = `${evt.title}_${evt.startDate}`;
    
    if (!uniqueMap.has(key)) {
      if (evt.id === VAIKUNTHA_2026_FESTIVAL.id) {
        uniqueMap.set(key, projectVaikunthaDay(evt, dateStr));
        return;
      }

      const clonedEvt = { ...evt };
      const end = evt.endDate || evt.startDate;
      
      if (evt.startDate !== end) {
        const dayDiff = calendarDayOffset(evt.startDate, dateStr) + 1;
        
        if (dayDiff > 0) {
            let vahanamEn = "";
            let vahanamTe = "";
            
            if (evt.title.toLowerCase().includes('brahmotsavam')) {
                // Remove the default summary vahanam string so it doesn't repeat every day
                clonedEvt.vahanam = undefined;

                if (BRAHMOTSAVAM_VAHANAS[dayDiff]) {
                    vahanamEn = ` - ${BRAHMOTSAVAM_VAHANAS[dayDiff].en}`;
                    vahanamTe = ` - ${BRAHMOTSAVAM_VAHANAS[dayDiff].te}`;
                }
            }

            clonedEvt.title = `${evt.title} (Day ${dayDiff})${vahanamEn}`;
            if (evt.titleTe) {
                clonedEvt.titleTe = `${evt.titleTe} (${dayDiff}వ రోజు)${vahanamTe}`;
            } else {
                clonedEvt.titleTe = `${evt.title} (Day ${dayDiff})${vahanamTe}`;
            }
        }
      }
      
      uniqueMap.set(key, clonedEvt);
    }
  });
  
  return Array.from(uniqueMap.values());
};
