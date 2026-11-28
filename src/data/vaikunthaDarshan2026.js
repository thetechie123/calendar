export const VAIKUNTHA_2026_SOURCE = 'https://news.tirumala.org/%E0%B0%B5%E0%B1%88%E0%B0%95%E0%B1%81%E0%B0%82%E0%B0%A0-%E0%B0%A6%E0%B1%8D%E0%B0%B5%E0%B0%BE%E0%B0%B0-%E0%B0%A6%E0%B0%B0%E0%B1%8D%E0%B0%B6%E0%B0%A8%E0%B0%BE%E0%B0%B2-%E0%B0%9F%E0%B0%BF%E0%B0%95/';
export const TTD_BOOKING_PORTAL = 'https://ttdevasthanams.ap.gov.in';

export const VAIKUNTHA_2026_FIRST_DAYS = {
  id: 'ttd-2026-12-20',
  title: 'Vaikuntha Ekadasi & Dwadasi at Tirumala',
  titleTe: 'తిరుమలలో వైకుంఠ ఏకాదశి, ద్వాదశి',
  description: 'Vaikuntha Dwara Darshan at Sri Venkateswara Swamy Temple runs December 20–29. Ekadasi is December 20, when Vaikuntha Dwaram opens and Swarna Rathotsavam is observed. Dwadasi is December 21. For these two days, TTD allots Slotted Sarva Darshan tokens online through e-DIP. VIP Break Darshan is cancelled except for protocol dignitaries. ₹300 Special Entry Darshan and SRIVANI Darshan are unavailable.',
  descriptionTe: 'తిరుమల శ్రీ వేంకటేశ్వర స్వామి ఆలయంలో డిసెంబర్ 20 నుంచి 29 వరకు వైకుంఠ ద్వార దర్శనం జరుగుతుంది. డిసెంబర్ 20న వైకుంఠ ఏకాదశి సందర్భంగా వైకుంఠ ద్వారం తెరుస్తారు, స్వర్ణ రథోత్సవం నిర్వహిస్తారు. డిసెంబర్ 21న ద్వాదశి. ఈ రెండు రోజులకు స్లాటెడ్ సర్వదర్శనం టోకెన్లను టీటీడీ ఆన్‌లైన్‌లో ఈ-డిప్ ద్వారా కేటాయిస్తుంది. ప్రోటోకాల్ ప్రముఖులకు మినహా వీఐపీ బ్రేక్ దర్శనం రద్దు. రూ.300 ప్రత్యేక ప్రవేశ దర్శనం, శ్రీవాణి దర్శనం అందుబాటులో ఉండవు.'
};

const release = (key, startDate, startTime, time, title, titleTe, description, descriptionTe) => ({
  id: `ttd-quota-vaikuntha-2026-${key}`,
  templeId: 'tirumala-main',
  startDate,
  endDate: startDate,
  startTime,
  time,
  category: 'quota-release',
  highlight: true,
  notificationEligible: false,
  location: 'Official TTD booking portal',
  title,
  titleTe,
  description,
  descriptionTe
});

export const VAIKUNTHA_2026_RELEASES = [
  release('srivani', '2026-11-28', '10:00:00', '10:00 AM',
    'Vaikuntha Dwara Darshan: SRIVANI Quota Opens',
    'వైకుంఠ ద్వార దర్శనం: శ్రీవాణి కోటా విడుదల',
    'Booking opens November 28 at 10 AM IST for darshan on December 22–29. The SRIVANI donation option provides ₹300 Special Entry Darshan and Mahalaghu Darshan only. Break Darshan privileges are unavailable. This option is unavailable December 20–21.',
    'డిసెంబర్ 22 నుంచి 29 వరకు దర్శనానికి బుకింగ్ నవంబర్ 28న ఉదయం 10 గంటలకు (IST) ప్రారంభం. శ్రీవాణి విరాళంతో రూ.300 ప్రత్యేక ప్రవేశ దర్శనం, మహాలఘు దర్శనం మాత్రమే లభిస్తాయి. బ్రేక్ దర్శన సౌకర్యం లేదు. డిసెంబర్ 20, 21 తేదీల్లో ఈ కోటా అందుబాటులో ఉండదు.'),
  release('special-entry', '2026-11-30', '10:00:00', '10:00 AM',
    'Vaikuntha Dwara Darshan: ₹300 Special Entry Quota Opens',
    'వైకుంఠ ద్వార దర్శనం: రూ.300 ప్రత్యేక ప్రవేశ దర్శన కోటా విడుదల',
    'Booking opens November 30 at 10 AM IST for darshan on December 22–29. ₹300 Special Entry Darshan is unavailable December 20–21.',
    'డిసెంబర్ 22 నుంచి 29 వరకు దర్శనానికి బుకింగ్ నవంబర్ 30న ఉదయం 10 గంటలకు (IST) ప్రారంభం. డిసెంబర్ 20, 21 తేదీల్లో రూ.300 ప్రత్యేక ప్రవేశ దర్శనం అందుబాటులో ఉండదు.'),
  release('ssd-dip-open', '2026-12-01', '10:00:00', '10:00 AM',
    'Vaikuntha Dwara Darshan: SSD e-DIP Registration Opens',
    'వైకుంఠ ద్వార దర్శనం: స్లాటెడ్ సర్వదర్శనం టోకెన్ల ఈ-డిప్ నమోదు ప్రారంభం',
    'Register online for Slotted Sarva Darshan tokens for December 20 (Ekadasi) and December 21 (Dwadasi). Registration runs from December 1 at 10 AM to December 5 at 5 PM IST.',
    'డిసెంబర్ 20న వైకుంఠ ఏకాదశి, 21న ద్వాదశి దర్శనాలకు స్లాటెడ్ సర్వదర్శనం టోకెన్ల కోసం ఆన్‌లైన్‌లో ఈ-డిప్ నమోదు చేసుకోండి. నమోదు డిసెంబర్ 1 ఉదయం 10 గంటల నుంచి డిసెంబర్ 5 సాయంత్రం 5 గంటల వరకు (IST) అందుబాటులో ఉంటుంది.'),
  release('ssd-dip-close', '2026-12-05', '17:00:00', '5:00 PM',
    'Vaikuntha Dwara Darshan: SSD e-DIP Registration Closes',
    'వైకుంఠ ద్వార దర్శనం: స్లాటెడ్ సర్వదర్శనం టోకెన్ల ఈ-డిప్ నమోదు ముగింపు',
    'Online e-DIP registration for December 20 and 21 Slotted Sarva Darshan closes December 5 at 5 PM IST. Results are scheduled for December 7 at 3 PM IST.',
    'డిసెంబర్ 20, 21 తేదీల స్లాటెడ్ సర్వదర్శనం టోకెన్లకు ఈ-డిప్ నమోదు డిసెంబర్ 5న సాయంత్రం 5 గంటలకు (IST) ముగుస్తుంది. ఫలితాలు డిసెంబర్ 7న మధ్యాహ్నం 3 గంటలకు (IST) విడుదల కానున్నాయి.'),
  release('ssd-dip-results', '2026-12-07', '15:00:00', '3:00 PM',
    'Vaikuntha Dwara Darshan: SSD e-DIP Allotment Results',
    'వైకుంఠ ద్వార దర్శనం: స్లాటెడ్ సర్వదర్శనం టోకెన్ల ఈ-డిప్ కేటాయింపు',
    'TTD publishes the e-DIP allotment results on December 7 at 3 PM IST for Slotted Sarva Darshan on December 20 and 21.',
    'డిసెంబర్ 20, 21 తేదీల స్లాటెడ్ సర్వదర్శనం టోకెన్ల ఈ-డిప్ కేటాయింపు ఫలితాలను టీటీడీ డిసెంబర్ 7న మధ్యాహ్నం 3 గంటలకు (IST) విడుదల చేస్తుంది.'),
  release('donor', '2026-12-08', '10:00:00', '10:00 AM',
    'Vaikuntha Dwara Darshan: Donor Quota Opens',
    'వైకుంఠ ద్వార దర్శనం: దాతల దర్శన కోటా విడుదల',
    'TTD releases the Donor Darshan quota on December 8 at 10 AM IST. Check the official portal for booking details.',
    'దాతల దర్శన కోటాను టీటీడీ డిసెంబర్ 8న ఉదయం 10 గంటలకు (IST) విడుదల చేస్తుంది. బుకింగ్ వివరాలకు అధికారిక పోర్టల్ చూడండి.')
];

export const VAIKUNTHA_2026_REMAINING_DAYS = {
  id: 'ttd-2026-12-vaikuntha-dwara-dec22-29',
  templeId: 'tirumala-main',
  title: 'Vaikuntha Dwara Darshan Continues',
  titleTe: 'వైకుంఠ ద్వార దర్శనం కొనసాగింపు',
  startDate: '2026-12-22',
  endDate: '2026-12-29',
  category: 'special-puja',
  highlight: true,
  notificationEligible: false,
  location: 'Sri Venkateswara Swamy Temple, Tirumala',
  description: 'The ten-day Vaikuntha Dwara Darshan at Tirumala runs December 20–29. December 22–29 are the eligible dates stated in the SRIVANI and ₹300 Special Entry Darshan booking notices.',
  descriptionTe: 'తిరుమలలో పది రోజుల వైకుంఠ ద్వార దర్శనం డిసెంబర్ 20 నుంచి 29 వరకు జరుగుతుంది. శ్రీవాణి, రూ.300 ప్రత్యేక ప్రవేశ దర్శనాల బుకింగ్ ప్రకటనల ప్రకారం డిసెంబర్ 22 నుంచి 29 వరకు దర్శన తేదీలు అందుబాటులో ఉంటాయి.'
};

export const VAIKUNTHA_2026_EVENT_IDS = new Set([
  VAIKUNTHA_2026_FIRST_DAYS.id,
  VAIKUNTHA_2026_REMAINING_DAYS.id,
  ...VAIKUNTHA_2026_RELEASES.map(event => event.id)
]);
