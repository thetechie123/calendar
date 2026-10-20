/**
 * Comprehensive Darshan & Token FAQ Dataset for The Tirumala Verse
 * 
 * Sourced directly from verified ground facts, TTD guidelines, and devotee manuals:
 * 1. Sarva Darshanam (Free Darshan at Tirumala)
 * 2. Slotted Sarva Darshan (SSD) Tokens & Divya Darshan (DD)
 * 3. ₹300 Special Entry Darshan (Seeghra Darshan)
 * 4. Sri Srinivasa Divya Anugraha Homam
 * 5. NRI & Defence Personnel Darshan
 * 6. Infant Darshan (<1 Year)
 * 7. Senior Citizen / Differently-Abled / Medical Cases Darshan
 * 8. Blood Donation Darshan at Aswini Hospital
 * 9. Govinda Nama Koti Darshan
 */

export const DARSHAN_FAQS = [
  {
    id: 'faq-sarva-darshanam-guide',
    category: 'tokens',
    questionEn: 'What is Sarva Darshanam (Free Darshan) at Tirumala, and how does the line and queue process work?',
    questionTe: 'తిరుమలలో సర్వదర్శనం (ఉచిత దర్శనం) అంటే ఏమిటి? క్యూలైన్ విధానం మరియు ప్రయాణం ఎలా ఉంటుంది?',
    answerEn: `Sarva Darshanam is the free darshan provided by TTD for all devotees without requiring a paid ticket. Waiting times depend heavily on crowd levels, day of the week, and festival season.

1️⃣ **What is Sarva Darshanam?**
• Free darshan open to all devotees without prior booking.
• Has the longest waiting time compared to paid special entry darshans.
• Regulated through the massive Vaikuntam Queue Complex (VQC) holding halls.

2️⃣ **Token System (SSD & DD):**
TTD issues up to 12,000 Slotted Sarva Darshan (SSD) and Divya Darshan (DD) tokens daily in Tirupati to reduce physical queue waiting.
• [Vishnu Nivasam](https://maps.app.goo.gl/1GfwMCYujdhSYNwx7) – Opposite Tirupati Railway Station
• [Srinivasam](https://maps.app.goo.gl/Lbv73h9nGhcE7Ngi8) – Near Central Bus Stand
• [Bhudevi Complex](https://maps.app.goo.gl/o8sdSVMBQUwwTTJ4A) – Near Alipiri
*Note: Divya Darshan (DD) tokens for pedestrians climbing Srivari Mettu are issued exclusively at Bhudevi Complex.*
*Every devotee must physically stand in the queue with their original Aadhaar card.*
*More detailed info: [Slotted Sarva Darshanam (SSD) Tokens & Divya Darshanam Tokens](https://www.reddit.com/r/TirumalaInfo/wiki/darshan/sarva-darshanam/slotted-sarva-darshanam/)*

3️⃣ **Reporting Location & Pilgrim Journey:**
• Queue starts from **KrishnaTeja Circle** or **Shilathoranam** depending on crowd density.
• Devotees enter into the sheltered Narayangiri sheds.
• Mandatory security frisking and electronic baggage check.
• Devotees move into Vaikuntam queue halls where free food (annaprasadam), milk, and water are distributed continuously.
• Final entry through Bangaru Vakili into the sanctum sanctorum (Ananda Nilayam).

4️⃣ **Approximate Waiting Time:**
• **Weekday (Normal):** 7–10 hours
• **Weekend (Fri–Sun):** 15–20 hours
• **Festivals / Holidays:** 25+ hours
*Traditional [Dress Code](https://www.reddit.com/r/TirumalaInfo/wiki/dresscode/?screen_view_count=1) is strictly required.*

5️⃣ **Who Should Choose Sarva Darshanam?**
✔ Budget travelers and large family groups
✔ Devotees with flexible travel schedules
❌ Devotees with acute health issues or tight return flight/train schedules

6️⃣ **Important Pilgrim Tips:**
• Start early in the morning before token counters open.
• Carry light baggage only; large suitcases cannot be carried in the queue halls.
• Eat wholesome food before entering the queue line and keep yourself hydrated.
• Be mentally prepared for long waiting periods inside compartments.`,
    answerTe: `సర్వదర్శనం అనేది తిరుమలలో టిక్కెట్ లేని సామాన్య భక్తులందరికీ టీటీడీ కల్పించే ఉచిత దర్శన సౌకర్యం. రద్దీ మరియు పండుగల ఆధారంగా నిరీక్షణ సమయం ఆధారపడి ఉంటుంది.

1️⃣ **సర్వదర్శనం అంటే ఏమిటి?**
• ఎటువంటి రుసుము లేకుండా భక్తులందరికీ ఉచిత దర్శనం.
• ప్రత్యేక దర్శనాలతో పోలిస్తే ఎక్కువ సమయం పడుతుంది.
• వైకుంఠం క్యూ కాంప్లెక్స్ కంపార్ట్మెంట్ల ద్వారా నియంత్రించబడుతుంది.

2️⃣ **టోకెన్ల విధానం (SSD & DD):**
క్యూలైన్ల నిరీక్షణ సమయాన్ని తగ్గించడానికి టీటీడీ రోజుకు సుమారు 12,000 SSD & DD టోకెన్లను తిరుపతిలోని మూడు కేంద్రాలలో జారీ చేస్తుంది:
• [విష్ణు నివాసం](https://maps.app.goo.gl/1GfwMCYujdhSYNwx7) – తిరుపతి రైల్వే స్టేషన్ ఎదురుగా
• [శ్రీనివాసం](https://maps.app.goo.gl/Lbv73h9nGhcE7Ngi8) – తిరుపతి బస్ స్టాండ్ సమీపంలో
• [భూదేవి కాంప్లెక్స్](https://maps.app.goo.gl/o8sdSVMBQUwwTTJ4A) – అలిపిరి వద్ద
*శ్రీవారి మెట్టు నడక భక్తులకు దివ్యదర్శనం (DD) టోకెన్లు కేవలం భూదేవి కాంప్లెక్స్‌లోని ప్రత్యేక కౌంటర్లలో మాత్రమే ఇస్తారు.*
*ప్రతి భక్తుడు తప్పనిసరిగా అసలు ఆధార్ కార్డుతో స్వయంగా క్యూలో నిలబడాలి.*

3️⃣ **రిపోర్టింగ్ మరియు దర్శన ప్రయాణం:**
• రద్దీని బట్టి కృష్ణతేజ సర్కిల్ లేదా శిలాతోరణం వద్ద క్యూ మొదలవుతుంది.
• నారాయణగిరి షెడ్లలోకి ప్రవేశం.
• సెక్యూరిటీ & లగేజ్ తనిఖీ పూర్తయిన తర్వాత వైకుంఠం క్యూ కంపార్ట్మెంట్లలోకి పంపుతారు.
• కంపార్ట్మెంట్లలో ఉచిత అన్నప్రసాదం, పాలు, తాగునీరు అందుబాటులో ఉంటాయి.
• చివరగా బంగారు వాకిలి ద్వారా గర్భాలయంలోకి స్వామివారి దివ్య దర్శనం లభిస్తుంది.

4️⃣ **సుమారు నిరీక్షణ సమయం:**
• **సాధారణ రోజుల్లో (వారపు రోజులు):** 7–10 గంటలు
• **వారాంతాల్లో (శని, ఆది):** 15–20 గంటలు
• **పండుగలు / సెలవుల్లో:** 25+ గంటలు
*సంప్రదాయ వస్త్రధారణ నిబంధనలు తప్పనిసరి.*

5️⃣ **ముఖ్యమైన సూచనలు:**
• ఉదయాన్నే క్యూకు చేరుకోండి.
• క్యూలైన్లలోకి పెద్ద సూట్‌కేసులు అనుమతించబడవు కాబట్టి కేవలం అవసరమైన చిన్న బ్యాగులు మాత్రమే తీసుకెళ్లండి.`,
    source: 'TTD Pilgrim Protocol & Ground Darshan Guidelines'
  },
  {
    id: 'faq-ssd-dd-tokens-deep-dive',
    category: 'tokens',
    questionEn: 'How do SSD and Divya Darshan (DD) offline tokens work, where are they issued, and how to check live availability?',
    questionTe: 'SSD మరియు దివ్య దర్శనం (DD) ఆఫ్‌లైన్ టోకెన్లు ఎలా పనిచేస్తాయి, ఎక్కడ ఇస్తారు, మరియు లైవ్ లభ్యత ఎలా తెలుసుకోవాలి?',
    answerEn: `Slotted Sarva Darshan (SSD) and Divya Darshan (DD) tokens are free offline tokens issued by TTD in Tirupati for next-day darshan at Tirumala under the Sarva Darshan category.

🔹 **Key Token Features:**
• Assigns a specific reporting date and time slot for next-day darshan.
• Completely free of cost; issued strictly offline (not available online).
• **Important Rule:** Starting from 1st July, no tokens are issued on Wednesday for Thursday darshan.

🔹 **Counter Locations in Tirupati:**
• [Srinivasam](https://maps.app.goo.gl/sJ2HpFbn9Mnz7Pw16) – Near Central Bus Stand
• [Vishnu Nivasam](https://maps.app.goo.gl/ESc8dYiH5siXjVVS8) – Opposite Railway Station
• [Bhudevi Complex](https://maps.app.goo.gl/GF1MLA6nNeSz6UqN9) – Near Alipiri
• **DD Tokens:** [Bhudevi Complex](https://maps.app.goo.gl/GF1MLA6nNeSz6UqN9) (Dedicated Counter) – Near Alipiri only

🔹 **How It Works:**
• Each SSD token specifies a reporting date (next day) and time slot at Tirumala.
• Devotees with Divya Darshan (DD) tokens must climb on foot through Srivari Mettu on the day of darshan and scan their token barcode at the 1200th step checkpoint.
• Report at **ATGH Circle** in Tirumala strictly according to the date and time printed on your token.

🔹 **Rules & Requirements:**
🪪 Original Aadhaar card is mandatory for every pilgrim.
👥 Physical presence is strictly compulsory. No group, proxy, or agent collection allowed.
🚫 Tokens are non-transferable.
👶 Children below 12 years do not require a separate token if accompanying elders holding valid tokens.

🔹 **Token Counter Timings:**
⏰ Counters open around 8:00 AM (varies with crowd and season). During peak holiday rush, distribution may begin as early as 3:00 AM, 4:00 AM, 4:30 AM, 5:00 AM, 6:00 AM, 12:00 PM, or 2:00 PM.
🕓 Distribution ends as soon as daily quota finishes (often within 1–2 hours).

🔹 **Live Availability Checking via WhatsApp:**
Devotees can verify live SSD token quota status on WhatsApp:
1. Message **"HI"** to **95523 00009** (Official Govt of AP Citizen Services).
2. Choose your preferred language.
3. Select **Citizens Services** -> **TTD Temple Services**.
4. Select **Slotted Sarva Darshanam Live Status**.
5. Input Date and Location to view available slots instantly.`,
    answerTe: `స్లాటెడ్ సర్వదర్శనం (SSD) మరియు దివ్యదర్శనం (DD) టోకెన్లు తిరుపతిలో టీటీడీ ఇచ్చే ఉచిత ఆఫ్‌లైన్ టోకెన్లు. వీటి ద్వారా మరుసటి రోజు దర్శనం లభిస్తుంది.

🔹 **ప్రధాన నియమాలు:**
• దర్శనం కోసం నిర్దిష్ట తేదీ మరియు సమయ స్లాట్ కేటాయించబడుతుంది.
• ఇది పూర్తిగా ఉచితం మరియు కేవలం ఆఫ్‌లైన్‌లో మాత్రమే లభిస్తుంది.
• **ముఖ్య గమనిక:** జూలై 1 నుండి గురువారం దర్శనం కోసం బుధవారం నాడు ఎటువంటి టోకెన్లు జారీ చేయబడవు.

🔹 **టోకెన్ కౌంటర్ల చిరునామాలు:**
• [శ్రీనివాసం](https://maps.app.goo.gl/sJ2HpFbn9Mnz7Pw16) – బస్ స్టాండ్ సమీపంలో
• [విష్ణు నివాసం](https://maps.app.goo.gl/ESc8dYiH5siXjVVS8) – రైల్వే స్టేషన్ ఎదురుగా
• [భూదేవి కాంప్లెక్స్](https://maps.app.goo.gl/GF1MLA6nNeSz6UqN9) – అలిపిరి వద్ద
• **DD టోకెన్లు:** [భూదేవి కాంప్లెక్స్](https://maps.app.goo.gl/GF1MLA6nNeSz6UqN9) ప్రత్యేక కౌంటర్ వద్ద మాత్రమే ఇస్తారు.

🔹 **దర్శన విధానం:**
• DD టోకెన్ పొందిన భక్తులు దర్శనం రోజున శ్రీవారి మెట్టు మార్గంలో నడిచి 1200వ మెట్టు వద్ద టోకెన్ బయోమెట్రిక్ స్కాన్ చేయించుకోవాలి.
• టోకెన్ పొందిన భక్తులందరూ తిరుమలలోని **ATGH సర్కిల్** వద్ద కేటాయించిన సమయానికి రిపోర్ట్ చేయాలి.

🔹 **వాట్సాప్ ద్వారా లైవ్ టోకెన్ లభ్యత:**
1. ఆంధ్రప్రదేశ్ ప్రభుత్వ అధికారిక వాట్సాప్ నంబర్ **95523 00009** కు **"HI"** అని మెసేజ్ చేయండి.
2. భాషను ఎంచుకోండి -> Citizens Services -> TTD Temple Services క్లిక్ చేయండి.
3. Slotted Sarva Darshanam Live Status ఎంచుకుని తేదీ మరియు స్థలాన్ని నమోదు చేసి వివరాలు తెలుసుకోండి.`,
    source: 'TTD Offline Token Distribution & AP Govt Citizen Services'
  },
  {
    id: 'faq-300-special-entry-darshan',
    category: 'tokens',
    questionEn: 'What is ₹300 Special Entry Darshan, when are tickets released, and what are the reporting and luggage rules?',
    questionTe: '₹300 ప్రత్యేక ప్రవేశ దర్శనం (Seeghra Darshan) అంటే ఏమిటి, టిక్కెట్లు ఎప్పుడు విడుదలవుతాయి, లగేజ్ & రిపోర్టింగ్ నియమాలు ఏమిటి?',
    answerEn: `The Special Entry Darshan (popularly known as ₹300 Darshan or Seeghra Darshan) is one of the fastest and most convenient ways to have darshan of Lord Venkateswara at Tirumala.

🪔 **Overview:**
• **Ticket Price:** ₹300 per person.
• **Booking Mode:** Strictly online via the official [TTD Booking Portal](https://ttdevasthanams.ap.gov.in/home/dashboard) or the official TTD Mobile App.
• **Transaction Limit:** Up to 6 persons per booking transaction.
• **Advantage:** Faster queue clearance through the designated Seeghra queue line.

📅 **Quota Release Schedule:**
• TTD releases ₹300 tickets every month during the **last week at 10:00 AM, 3 months in advance**.
• Official release dates are announced via TTD website banners and press bulletins. Tickets sell out quickly within minutes.

🏠 **Reporting Point & Entry:**
• **Reporting Location:** [ATC Circle](https://maps.app.goo.gl/255xmkzUFrZEPEbV6), Tirumala.
• Devotees must report at least **1 hour prior** to the time slot mentioned on their ticket.

🎁 **Facilities Included in ₹300 Ticket:**
• One complimentary Srivari Laddu Prasadam per ticket holder.
• Access to free luggage deposit, mobile phone deposit, and footwear counters inside the queue complex.
• A printed receipt barcode is provided upon depositing belongings; keep it safe! You can collect your deposited luggage and mobile phones at the [Tirumala Common Delivery Centre (CDC)](https://maps.app.goo.gl/KuAn5xaRwviUkMU26) after darshan.

📄 **Required Documents & Guidelines:**
• **Original Photo ID:** Every pilgrim must produce the exact original Photo ID (Aadhaar, Passport, Voter ID) used during online booking.
• **Children below 12:** Allowed free darshan without ticket upon presenting age proof (birth certificate/Aadhaar).
• **Traditional Dress Code:** Strictly enforced. Men: Dhoti/Kurta or Pyjama with Uttariyam; Women: Saree, Half-saree, or Chudidar with Dupatta. Casual wear like jeans, T-shirts, shorts, or western skirts is strictly forbidden.`,
    answerTe: `₹300 ప్రత్యేక ప్రవేశ దర్శనం (శీఘ్ర దర్శనం) తిరుమల శ్రీవారి దర్శనానికి అత్యంత అనుకూలమైన మరియు వేగవంతమైన మార్గం.

🪔 **ముఖ్య వివరాలు:**
• **టికెట్ ధర:** ఒక్కొక్కరికి ₹300.
• **బుకింగ్ విధానం:** కేవలం అధికారిక [టీటీడీ వెబ్‌సైట్](https://ttdevasthanams.ap.gov.in/home/dashboard) లేదా మొబైల్ యాప్ ద్వారా ఆన్‌లైన్‌లో మాత్రమే.
• **లావాదేవీ పరిమితి:** ఒక లావాదేవీలో గరిష్టంగా 6 మంది వరకు బుక్ చేసుకోవచ్చు.

📅 **టిక్కెట్ల విడుదల సమయం:**
• ప్రతి నెలా చివరి వారంలో ఉదయం 10:00 గంటలకు 3 నెలల ముందస్తు కోటాను టీటీడీ విడుదల చేస్తుంది.

🏠 **రిపోర్టింగ్ కేంద్రం:**
• తిరుమలలోని [ATC సర్కిల్](https://maps.app.goo.gl/255xmkzUFrZEPEbV6) వద్ద టికెట్‌లో పేర్కొన్న సమయానికి కనీసం 1 గంట ముందుగా చేరుకోవాలి.

🎁 **సౌకర్యాలు:**
• ప్రతి టికెట్‌పై ఒక ఉచిత లడ్డూ ప్రసాదం లభిస్తుంది.
• మొబైల్ ఫోన్లు మరియు లగేజీని క్యూ కాంప్లెక్స్ లోపల డిపాజిట్ చేసి రశీదు తీసుకోవచ్చు. దర్శనం పూర్తయిన తర్వాత [తిరుమల కామన్ డెలివరీ సెంటర్ (CDC)](https://maps.app.goo.gl/KuAn5xaRwviUkMU26) వద్ద వాటిని తీసుకోవచ్చు.
• సంప్రదాయ వస్త్రధారణ తప్పనిసరి (పురుషులు: ధోవతి/కుర్తా; స్త్రీలు: చీర/చుడీదార్).`,
    source: 'TTD Arjitha Seva & Special Entry Guidelines'
  },
  {
    id: 'faq-divya-anugraha-homam',
    category: 'rituals',
    questionEn: 'How to book Sri Srinivasa Divya Anugraha Homam, what are the timings, and does it include darshan?',
    questionTe: 'శ్రీ శ్రీనివాస దివ్య అనుగ్రహ హోమం టికెట్లు ఎలా పొందాలి, సమయాలు ఏమిటి, మరియు దీని ద్వారా దర్శనం లభిస్తుందా?',
    answerEn: `Sri Srinivasa Divya Anugraha Homam is a sacred ritual performed at Alipiri in Tirupati that includes special darshan privileges at Tirumala.

🪔 **Homam Details & Ticket Quota:**
• **Ticket Cost:** ₹1,600 for 2 persons.
• **Booking:** Released online **1 month in advance** on the TTD portal (200 tickets released per month).
• **Eligibility:** Any two devotees can participate together (they do not necessarily need to be a married couple).

⏰ **Timings & Schedule:**
• **Homam Reporting:** 8:30 AM at the Alipiri Saptha Go Pradakshina Mandapam / Homam venue.
• **Homam Duration:** Concludes at 11:00 AM.
• **Important Step:** Devotees must get their physical ticket officially stamped by temple authorities upon completion of the Homam.

🛕 **Darshan Access at Tirumala:**
• Ticket holders are eligible for Srivari Darshan from **3:00 PM to 10:00 PM** on the same day.
• **Reporting Location:** [ATC Circle](https://maps.app.goo.gl/255xmkzUFrZEPEbV6), Tirumala.
• Includes two complimentary Srivari Laddus on the ticket.`,
    answerTe: `శ్రీ శ్రీనివాస దివ్య అనుగ్రహ హోమం అలిపిరి వద్ద నిర్వహించబడే అత్యంత పవిత్రమైన పూజా క్రతువు, దీని ద్వారా తిరుమలలో స్వామివారి దర్శన భాగ్యం కూడా లభిస్తుంది.

🪔 **టికెట్ వివరాలు:**
• **రుసుము:** ఇద్దరు వ్యక్తులకు ₹1,600.
• **బుకింగ్:** నెలకు 200 టిక్కెట్లను 1 నెల ముందుగా ఆన్‌లైన్‌లో విడుదల చేస్తారు.
• దంపతులే కానక్కర్లేదు, ఏ ఇద్దరు వ్యక్తులైనా పాల్గొనవచ్చు.

⏰ **సమయాలు & దర్శన విధానం:**
• ఉదయం 8:30 గంటలకు అలిపిరి హోమ వేదిక వద్ద రిపోర్ట్ చేయాలి; హోమం ఉదయం 11:00 గంటలకు ముగుస్తుంది.
• హోమం ముగిసిన వెంటనే టికెట్‌పై అధికారిక స్టాంప్ వేయించుకోవడం తప్పనిసరి.
• అదే రోజు మధ్యాహ్నం 3:00 నుండి రాత్రి 10:00 గంటల వరకు తిరుమలలోని [ATC సర్కిల్](https://maps.app.goo.gl/255xmkzUFrZEPEbV6) ద్వారా దర్శనానికి అనుమతిస్తారు. టికెట్‌పై 2 లడ్డూలు ఉచితంగా లభిస్తాయి.`,
    source: 'TTD Sapthagiri & Homam Administration'
  },
  {
    id: 'faq-nri-defence-darshan',
    category: 'tokens',
    questionEn: 'How can NRIs and Defence Personnel avail darshan at Tirumala, and what documents are required?',
    questionTe: 'ఎన్ఆర్ఐలు (NRI) మరియు రక్షణ రంగ ఉద్యోగులు (Defence Personnel) తిరుమలలో దర్శనం ఎలా పొందవచ్చు?',
    answerEn: `TTD provides on-arrival ₹300 Special Entry Darshan facilities for qualifying Non-Resident Indians (NRIs) and Indian Armed Forces personnel directly at Tirumala.

✈️ **NRI Darshan Guidelines:**
• **Eligibility:** NRI pilgrims whose arrival date into India is within the **last 60 days**.
• **Eligible Categories:** Holders of H1B or equivalent employment work visas, Green Card / Permanent Residence holders, and valid work permit holders. OCI cardholders are also eligible.
• **Ineligible Categories:** Visitors on Tourist Visa, Visit Visa, Student Visa, Transit Visa, Business Visa, Medical Visa, or B1/B2 Visa.
• **Cost:** ₹300 per person (issued directly across the counter, no advance online booking required).
• **Children:** Children below 12 years enter free of cost.
• **Strict Accompanying Rule:** Only the eligible NRI pilgrims themselves are permitted for this darshan. Non-NRI relatives, in-laws, friends, or grandparents cannot be included.

📄 **Foreign Nationals & Declaration:**
• Foreign passport holders are permitted with original passport and valid visa.
• Non-Hindu devotees must sign a formal declaration form affirming respect and faith in Hindu religious traditions and temple customs.

📍 **Reporting Point & Timings:**
• **Location:** Special Darshan Queue Complex at [ATC Circle](https://maps.app.goo.gl/255xmkzUFrZEPEbV6), Tirumala.
• **Timings:** 12:00 PM to 6:00 PM daily.
• **Verification Process:** Fill out the verification form at the counter, present original passport along with photocopies of the photo page, visa page, and recent immigration entry stamp. Once approved, purchase the ₹300 ticket and proceed to the queue.

🎖️ **Defence Personnel:**
• Follows the same entry point at ATC Circle. Follow the board reading **"NRI / Defence Darshan"** and present original Military Identity Card, leave certificate / service documents for verification.`,
    answerTe: `విదేశాల నుండి వచ్చే ప్రవాస భారతీయులు (NRI) మరియు భారత రక్షణ రంగ సిబ్బంది కోసం తిరుమలలో ప్రత్యేక దర్శన సౌకర్యం ఉంది.

✈️ **NRI దర్శన నియమాలు:**
• భారతదేశానికి వచ్చిన తేదీ నుండి **60 రోజుల లోపు** మాత్రమే ఈ దర్శనానికి అర్హులు.
• **అర్హత ఉన్న వీసాలు:** H1B, వర్క్ వీసా, గ్రీన్ కార్డ్, OCI కార్డ్ హోల్డర్లు.
• **అర్హత లేని వీసాలు:** టూరిస్ట్, విజిట్, స్టూడెంట్, ట్రాన్సిట్, మెడికల్ వీసాలు.
• టికెట్ ధర ఒక్కొక్కరికి ₹300 (ఆన్‌లైన్ ముందస్తు బుకింగ్ అవసరం లేదు, తిరుమలలోనే ఇస్తారు).
• కేవలం NRI భక్తులు మాత్రమే అనుమతించబడతారు; భారతదేశంలో ఉండే వారి బంధువులకు అనుమతి ఉండదు (12 ఏళ్ల లోపు పిల్లలకు ఉచితం).

📍 **రిపోర్టింగ్ కేంద్రం & సమయం:**
• తిరుమలలోని [ATC సర్కిల్](https://maps.app.goo.gl/255xmkzUFrZEPEbV6) స్పెషల్ దర్శన్ కాంప్లెక్స్ వద్ద మధ్యాహ్నం 12:00 నుండి సాయంత్రం 6:00 గంటల మధ్య రిపోర్ట్ చేయాలి. ఒరిజినల్ పాస్‌పోర్ట్ మరియు వీసా జిరాక్స్ సమర్పించాలి.

🎖️ **రక్షణ రంగ సిబ్బంది (Defence):**
• ఇదే కౌంటర్ వద్ద సైనిక గుర్తింపు కార్డు (Military ID) చూపించి దర్శన టికెట్ పొందవచ్చు.`,
    source: 'TTD Reception Office & Special Darshan Protocols'
  },
  {
    id: 'faq-infant-darshan',
    category: 'tokens',
    questionEn: 'What is the procedure for Infant Darshan (children under 1 year) at Tirumala?',
    questionTe: 'ఒక సంవత్సరం లోపు చంటిబిడ్డలు ఉన్న తల్లిదండ్రుల కోసం ఇన్ఫాంట్ దర్శనం (Infant Darshan) విధానం ఏమిటి?',
    answerEn: `TTD provides a prioritized entry line for parents traveling with infants under 1 year of age to avoid prolonged queue congestion.

👶 **Infant Darshan Guidelines:**
• **Eligible Group:** Parents with a biological infant aged **under 1 year (below 12 months)**.
• **Reporting Location:** [Supatham](https://maps.app.goo.gl/zsyFh1xi9MZu3B8U7) entry gate, Tirumala.
• **Required Documents:**
  - Infant's original birth certificate (strictly scrutinized at entry).
  - Both parents' original Aadhaar cards.
• **Accompanying Siblings:** Biological siblings under 12 years of age are permitted to accompany the parents with valid Aadhaar proof.
• **Grandparents & Relatives:** Grandparents, uncles, aunts, or other relatives are **NOT permitted** through this priority line.
• **Approximate Duration:** Typically takes around 1.5 to 2 hours (the line merges into the main sanctum approach near the silver door).`,
    answerTe: `సంవత్సరం లోపు చంటిబిడ్డలు ఉన్న తల్లిదండ్రుల సౌకర్యార్థం టీటీడీ సుపథం ద్వారా ప్రత్యేక ప్రవేశాన్ని కల్పిస్తుంది.

👶 **నియమావళి:**
• శిశువు వయస్సు తప్పనిసరిగా **1 సంవత్సరం లోపు** ఉండాలి.
• **రిపోర్టింగ్ ప్రదేశం:** తిరుమలలోని [సుపథం](https://maps.app.goo.gl/zsyFh1xi9MZu3B8U7) ద్వారం.
• **అవసరమైన పత్రాలు:** బిడ్డ ఒరిజినల్ జనన ధృవీకరణ పత్రం (Birth Certificate) మరియు తల్లిదండ్రుల ఒరిజినల్ ఆధార్ కార్డులు.
• 12 సంవత్సరాల లోపు ఉన్న తోబుట్టువులను (అక్క/చెల్లెలు/అన్న/తమ్ముడు) అనుమతిస్తారు.
• తాతయ్య, నానమ్మ లేదా ఇతర బంధువులను ఈ లైనులో అనుమతించరు. దర్శనానికి సుమారు 2 గంటల సమయం పడుతుంది.`,
    source: 'TTD Supatham Operations & Child Welfare Protocol'
  },
  {
    id: 'faq-senior-differently-abled-darshan',
    category: 'tokens',
    questionEn: 'How to book Senior Citizen, Differently-Abled, or Medical Cases darshan at Tirumala?',
    questionTe: 'సీనియర్ సిటిజన్లు, దివ్యాంగులు మరియు మెడికల్ కేసుల భక్తులు తిరుమల దర్శనం ఎలా పొందాలి?',
    answerEn: `The Senior Citizen, Differently-Abled, and Medical Cases quota is a dedicated online facility provided by TTD to ensure dignified, comfortable, and barrier-free darshan.

🪔 **Eligible Devotee Categories:**
1. **Senior Citizens:** Devotees aged 65 years and above.
2. **Differently-Abled / Physically Challenged:** Devotees holding a government disability certificate with **over 20% permanent disability**.
3. **Medical Cases:** Devotees suffering from severe chronic medical conditions holding a certified recommendation issued by a specialist/surgeon.

🗓️ **Online Quota Booking Details:**
• **Release Schedule:** Released every month on the **23rd at 3:00 PM, 3 months in advance** (1,000 tickets per month combined quota) on the official TTD portal.
• **Gap Rule:** A mandatory **3-month gap** is enforced between two consecutive darshans under this quota.
• **Aadhaar Validation:** Aadhaar card is verified online during booking and strictly matched at the physical reporting gate.

⏰ **Darshan Timings & Reporting:**
• **Darshan Slot:** 3:00 PM daily.
• **Reporting Time:** 1:00 PM.
• **Reporting Location:** [Senior Citizen & Physically Challenged Reporting Place](https://maps.app.goo.gl/k4rVjNdNY3DecSNv6), situated beside Supatham, South Mada Street.
• **Average Duration:** 40–70 minutes.

🎁 **Complimentary Facilities & Support:**
• One free Srivari Laddu per ticket.
• **Free Battery Vehicles:** Continuous free transit from SV Museum and Rambagicha Rest House to the reporting centre.
• Complimentary refreshments (sambar rice, curd rice, hot milk, and drinking water) inside the air-conditioned waiting hall.
• Wheelchair assistance and dedicated TTD Sevakas who guide and escort devotees up to the Ananda Nilayam and safely back.
• **Attendants:** Only one assistant is permitted to accompany differently-abled devotees needing physical support (must carry original ID).
• **Traditional Dress Code:** Strictly required for all entering pilgrims.`,
    answerTe: `వయోవృద్ధులు (65 ఏళ్లు పైబడినవారు), దివ్యాంగులు మరియు తీవ్ర అనారోగ్య సమస్యలు ఉన్న భక్తుల కోసం టీటీడీ సుపథం ద్వారా ఉచిత ప్రత్యేక దర్శనాన్ని కల్పిస్తుంది.

🪔 **అర్హత గల వర్గాలు:**
1. **సీనియర్ సిటిజన్లు:** 65 సంవత్సరాలు మరియు అంతకంటే ఎక్కువ వయస్సు ఉన్నవారు.
2. **దివ్యాంగులు:** ప్రభుత్వం జారీ చేసిన 20% కంటే ఎక్కువ వైకల్య ధృవీకరణ పత్రం ఉన్నవారు.
3. **మెడికల్ కేసులు:** శస్త్రచికిత్స నిపుణుల ధృవీకరణ పత్రం ఉన్న రోగులు.

🗓️ **బుకింగ్ వివరాలు:**
• ప్రతి నెలా **23వ తేదీ మధ్యాహ్నం 3:00 గంటలకు** 3 నెలల ముందస్తు కోటాను అధికారిక పోర్టల్‌లో విడుదల చేస్తారు (నెలకు 1,000 టిక్కెట్లు).
• ఒకసారి దర్శనం చేసుకున్న తర్వాత మళ్లీ ఈ కోటాలో దర్శనం చేసుకోవడానికి కనీసం **3 నెలల విరామం** ఉండాలి.

⏰ **సమయం & రిపోర్టింగ్:**
• దర్శనం సమయం మధ్యాహ్నం 3:00 గంటలకు; రిపోర్టింగ్ సమయం మధ్యాహ్నం 1:00 గంట.
• **రిపోర్టింగ్ ప్రదేశం:** దక్షిణ మాడ వీధిలో సుపథం పక్కన గల [సీనియర్ సిటిజన్ & దివ్యాంగుల రిపోర్టింగ్ కేంద్రం](https://maps.app.goo.gl/k4rVjNdNY3DecSNv6).
• ఉచిత బ్యాటరీ వాహనాలు, ఉచిత లడ్డూ, వేచి ఉండే హాల్లో సాంబార్ బాత్, పెరుగన్నం, చక్రాల కుర్చీలు మరియు సహాయకుల (సేవకుల) సేవలు ఉచితంగా అందించబడతాయి.`,
    source: 'TTD Senior Citizen & Special Privilege Protocols'
  },
  {
    id: 'faq-blood-donation-darshan',
    category: 'rituals',
    questionEn: 'How can devotees get a Special Darshan ticket by donating blood at Tirumala?',
    questionTe: 'తిరుమలలో రక్తదానం చేయడం ద్వారా ప్రత్యేక దర్శనం టికెట్ ఎలా పొందవచ్చు?',
    answerEn: `Devotees who donate voluntary blood at [Aswini Hospital](https://maps.app.goo.gl/gbGjCzCGzWxZb6Jr5) atop Tirumala are granted a special privilege darshan ticket for fast-track entry.

🩸 **Blood Donation Darshan Procedure:**
1. **Early Registration:** Arrive at the reception of Aswini Hospital in Tirumala before **6:30 AM** to register your name.
2. **Strict Daily Cap:** Only the **first 5 registrations** are accepted each day.
3. **Medical Team:** The blood collection and screening medical team arrives after 9:00 AM.
4. **Donation Duration:** The medical examination and donation process takes approximately 2 hours in total.
5. **Darshan Benefit:** Following successful blood donation, the hospital administration provides an official TTD letter of appreciation alongside a Special Darshan Ticket granting priority entrance to the temple.`,
    answerTe: `తిరుమలలోని [అశ్విని ఆసుపత్రి](https://maps.app.goo.gl/gbGjCzCGzWxZb6Jr5) లో రక్తదానం చేసే భక్తులకు టీటీడీ ప్రత్యేక దర్శన సౌకర్యాన్ని కల్పిస్తుంది.

🩸 **విధానం & నియమాలు:**
1. ఉదయం **6:30 గంటల లోపు** అశ్విని ఆసుపత్రి రిసెప్షన్‌లో మీ పేరును నమోదు చేసుకోవాలి.
2. ప్రతిరోజూ కేవలం **మొదటి 5 మందికి మాత్రమే** ఈ అవకాశం కల్పించబడుతుంది.
3. ఉదయం 9:00 గంటలకు వైద్య బృందం వచ్చి పరీక్షలు నిర్వహిస్తుంది. మొత్తం ప్రక్రియకు సుమారు 2 గంటల సమయం పడుతుంది.
4. రక్తదానం విజయవంతంగా పూర్తయిన తర్వాత టీటీడీ ప్రశంసా పత్రంతో పాటు శీఘ్ర దర్శన టికెట్‌ను అందజేస్తుంది.`,
    source: 'TTD Medical & Health Services, Aswini Hospital'
  },
  {
    id: 'faq-govinda-nama-koti-darshan',
    category: 'traditions',
    questionEn: 'What is Govinda Nama Koti, and how to get VIP darshan by writing the Lord’s name?',
    questionTe: 'గోవింద నామ కోటి అంటే ఏమిటి? స్వామివారి నామాలను రాయడం ద్వారా వీఐపీ దర్శనం ఎలా పొందవచ్చు?',
    answerEn: `Govinda Nama Koti is a revered devotional initiative by TTD that encourages spiritual discipline among youth by writing the sacred divine name "Govinda".

📜 **VIP Darshan Privileges:**
• **1 Crore (10,000,000) Namams:** Devotees who write "Govinda" 1 crore times in designated books receive **1st Door VIP Darshan** for up to **5 family members**.
• **10,10,180 Namams:** Devotees who write "Govinda" 10,10,180 times receive a **Single VIP Darshan** pass.

🪪 **Strict Eligibility Criteria:**
• Exclusively open to devotees **under 25 years of age**.

📖 **Where to Procure Official Books:**
• Dedicated Govinda Nama books cost **₹111** and are available at all TTD Publications Stalls.
• **In Tirupati:** Available at Srinivasam and Vishnu Nivasam stalls.
• **In Tirumala:** Available opposite Lepakshi Handicrafts showroom.

🛕 **Submission & Darshan Procedure:**
• Once the writing of all required volumes is completed, submit the books physically at the **Arjitha Seva Office** in Tirumala.
• Officials inspect and authenticate the counts.
• Upon formal validation, priority VIP darshan is scheduled for the **next day**.`,
    answerTe: `యువతలో భక్తిభావాన్ని పెంపొందించడానికి టీటీడీ ప్రవేశపెట్టిన విశిష్ట ఆధ్యాత్మిక కార్యక్రమం "గోవింద నామ కోటి".

📜 **వీఐపీ దర్శన అర్హతలు:**
• **1 కోటి సార్లు (10,000,000):** అధికారిక పుస్తకాలలో "గోవింద" నామాన్ని 1 కోటి సార్లు రాసిన భక్తుడి కుటుంబంలోని గరిష్టంగా **5 మంది సభ్యులకు మొదటి ద్వార వీఐపీ దర్శనం** కల్పిస్తారు.
• **10,10,180 సార్లు:** ఈ సంఖ్యలో రాసిన భక్తుడికి **ఒక్కరికి వీఐపీ దర్శనం** లభిస్తుంది.

🪪 **అర్హత నిబంధన:**
• కేవలం **25 సంవత్సరాల లోపు వయస్సు ఉన్న యువతీ యువకులకు మాత్రమే** ఈ అవకాశం వర్తిస్తుంది.

📖 **పుస్తకాలు లభించే ప్రదేశాలు:**
• ప్రత్యేక పుస్తకం ధర ₹111. తిరుపతిలోని శ్రీనివాసం, విష్ణు నివాసం పుస్తక విక్రయశాలల్లో మరియు తిరుమలలోని లేపాక్షి ఎంపోరియం ఎదురుగా గల టీటీడీ పుస్తక స్టాళ్లలో లభిస్తాయి.

🛕 **సమర్పణ విధానం:**
• పుస్తకాలు పూర్తి చేసిన తర్వాత తిరుమలలోని ఆర్జిత సేవా కార్యాలయంలో సమర్పించాలి. అధికారులు పరిశీలించి ఆమోదించిన తర్వాత మరుసటి రోజు దర్శనం కేటాయిస్తారు.`,
    source: 'TTD Hindu Dharma Prachara Parishad (HDPP) & Arjitha Seva Office'
  }
];
