/**
 * Pilgrim Guide Data & TTD Directory
 * 
 * Includes:
 * 1. TTD Common Abbreviations & Facilities Directory (Decoded)
 * 2. Smart UPI Laddu KIOSK Machine Workflow Guide
 * 3. Srivari Kalyanamahaprasadam (Wedding Invitation Postal Service) Guide
 * 4. Brahmotsavam & Sanctum Sacred Etiquette (Agamic Code of Conduct)
 * 5. Comprehensive Pilgrim & Temple FAQs (Categorized & Searchable)
 * 
 * All factual content synthesized and rewritten from TTD Sapthagiri publications:
 * - "Know Tirumala Through Abbreviations" (Sapthagiri, October 2026)
 * - "KIOSK machines at Laddu Counters in Tirumala" (Sapthagiri, September 2026)
 * - "Lord Venkateswara Mahaprasadam - The Lord's Blessings at Your Door Step" (Sapthagiri, September 2026)
 * - "Tirumala Brahmotsavam: Divine Celebration and Pilgrim's Etiquette" by Dr. Raghavendra Siddharth (Sapthagiri, September 2025)
 * - "Flowers In Tirumala Temple Festivities" (Sapthagiri, September 2026)
 * - "Sri Varaha Swami Temple" & "Hundi (Koppera) at Tirumala" (Sapthagiri, September 2025 & October 2026)
 */

export const ABBREVIATION_CATEGORIES = [
  { id: 'all', labelEn: 'All Abbreviations', labelTe: 'అన్ని సంక్షిప్త రూపాలు', icon: '🏛️' },
  { id: 'queues_reception', labelEn: 'Queues & Reception', labelTe: 'క్యూ కాంప్లెక్స్‌లు & రిసెప్షన్', icon: '🚶' },
  { id: 'rest_houses', labelEn: 'Rest Houses', labelTe: 'విశ్రాంతి గృహాలు (Rest Houses)', icon: '🏨' },
  { id: 'cottages', labelEn: 'Cottages & Enclaves', labelTe: 'కాటేజీలు & నిలయాలు', icon: '🏡' }
];

export const TTD_ABBREVIATIONS = [
  // Queues & Reception
  {
    code: 'VQC',
    category: 'queues_reception',
    nameEn: 'Vaikuntam Queue Complex',
    nameTe: 'వైకుంఠం క్యూ కాంప్లెక్స్',
    descEn: 'The massive multi-compartment holding complex designed to safely regulate pilgrim flow for Sarva Darshan and special entry darshan lines into the sanctum.',
    descTe: 'సర్వదర్శనం మరియు ప్రత్యేక ప్రవేశ దర్శన భక్తులు స్వామివారి సన్నిధికి క్రమబద్ధంగా వెళ్లడానికి నిర్మించిన బృహత్తర కంపార్ట్మెంట్ల సముదాయం.'
  },
  {
    code: 'CRO',
    category: 'queues_reception',
    nameEn: 'Central Reception Office',
    nameTe: 'కేంద్ర రిసెప్షన్ కార్యాలయం (సెంట్రల్ రిసెప్షన్ ఆఫీస్)',
    descEn: 'The central administrative hub in Tirumala managing offline accommodation allotments, general enquiries, and pilgrim registration services.',
    descTe: 'తిరుమలలో ఆఫ్‌లైన్ వసతి గదుల కేటాయింపు, సమాచార విచారణలు మరియు యాత్రికుల సేవా నమోదులను పర్యవేక్షించే ప్రధాన కార్యాలయం.'
  },
  {
    code: 'PAC',
    category: 'queues_reception',
    nameEn: 'Pilgrims Amenities Complex',
    nameTe: 'యాత్రికుల వసతి సముదాయం (పిల్గ్రిమ్స్ అమెనిటీస్ కాంప్లెక్స్)',
    descEn: 'Free transit accommodation complexes in Tirumala and Tirupati equipped with lockers, restrooms, continuous hot water, and resting halls.',
    descTe: 'ఉచిత లాకర్లు, విశ్రాంతి మందిరాలు, తాగునీరు మరియు స్నానపు గదుల సదుపాయాలతో యాత్రికుల కోసం ఏర్పాటు చేసిన ఉచిత బస కేంద్రాలు.'
  },

  // Rest Houses
  {
    code: '1ST NC',
    category: 'rest_houses',
    nameEn: 'Sudarshan Rest House',
    nameTe: 'సుదర్శన్ రెస్ట్ హౌస్ (మొదటి నార్త్ కాంప్లెక్స్)',
    descEn: 'Located near the main temple periphery, providing convenient lodging for pilgrims.',
    descTe: 'శ్రీవారి ఆలయ పరిసరాలకు సమీపంలో ఉన్న ప్రముఖ యాత్రికుల విశ్రాంతి నిలయం.'
  },
  {
    code: '2ND NC',
    category: 'rest_houses',
    nameEn: 'Govardhan Rest House',
    nameTe: 'గోవర్ధన్ రెస్ట్ హౌస్ (రెండవ నార్త్ కాంప్లెక్స్)',
    descEn: 'A major accommodation block situated within easy walking distance to the Vaikuntam Queue entrances.',
    descTe: 'వైకుంఠం క్యూ కాంప్లెక్స్ ప్రవేశ మార్గాలకు సమీపంలో ఉన్న ప్రధాన వసతి భవనం.'
  },
  {
    code: '3RD NC',
    category: 'rest_houses',
    nameEn: 'Kalyan Rest House',
    nameTe: 'కల్యాణ్ రెస్ట్ హౌస్ (మూడవ నార్త్ కాంప్లెక్స్)',
    descEn: 'Spacious rest house providing affordable room allotments for visiting devotees.',
    descTe: 'యాత్రికులకు అందుబాటులో ఉండే విస్తారమైన విశ్రాంతి గదుల సముదాయం.'
  },
  {
    code: 'PJNMRH',
    category: 'rest_houses',
    nameEn: 'Panchajanyam Rest House',
    nameTe: 'పాంచజన్యం రెస్ట్ హౌస్',
    descEn: 'Named after Lord Vishnu\'s sacred conch (Panchajanya), located strategically near Tirumala ring road.',
    descTe: 'శ్రీమహావిష్ణువు దివ్య శంఖమైన పాంచజన్యం పేరిట నిర్మించిన అత్యాధునిక వసతి సముదాయం.'
  },
  {
    code: 'KTBRH',
    category: 'rest_houses',
    nameEn: 'Kousthubam Rest House',
    nameTe: 'కౌస్తుభం రెస్ట్ హౌస్',
    descEn: 'Named after the divine wish-fulfilling jewel Kousthubha adorning the Lord\'s chest.',
    descTe: 'స్వామివారి వక్షస్థలాన్ని అలంకరించే కౌస్తుభ దివ్యమణి నామధేయంతో నిర్మించిన వసతి నిలయం.'
  },
  {
    code: 'SGRH',
    category: 'rest_houses',
    nameEn: 'Sapthagiri Rest House',
    nameTe: 'సప్తగిరి రెస్ట్ హౌస్',
    descEn: 'One of the prominent and historically established accommodation blocks in Tirumala.',
    descTe: 'తిరుమలలోని ఏడు పవిత్ర కొండల గౌరవార్థం నామకరణం చేయబడిన సుప్రసిద్ధ విశ్రాంతి భవనం.'
  },
  {
    code: 'ATRH',
    category: 'rest_houses',
    nameEn: 'Alwar Tank Rest House',
    nameTe: 'ఆళ్వార్ ట్యాంక్ రెస్ట్ హౌస్',
    descEn: 'Situated in the scenic proximity of the sacred Alwar Theertham / Tank region in Tirumala.',
    descTe: 'తిరుమలలోని పవిత్ర ఆళ్వార్ పుష్కరిణి/ట్యాంక్ ప్రాంతానికి సమీపంలో గల వసతి నిలయం.'
  },
  {
    code: 'SVRH',
    category: 'rest_houses',
    nameEn: 'Sri Venkateswara Rest House',
    nameTe: 'శ్రీ వేంకటేశ్వర రెస్ట్ హౌస్',
    descEn: 'A central rest house complex hosting devotees participating in regular and special sevas.',
    descTe: 'శ్రీవారి దర్శనార్థం విచ్చేసే భక్తుల కోసం ఏర్పాటు చేయబడిన కేంద్ర వసతి గృహం.'
  },
  {
    code: 'NGRH',
    category: 'rest_houses',
    nameEn: 'Narayanagiri Rest Houses',
    nameTe: 'నారాయణగిరి రెస్ట్ హౌస్లు',
    descEn: 'Located along the foothills of the sacred Narayanagiri peak, known for its serene devotional ambience.',
    descTe: 'స్వామివారి దివ్య పాదాలు వెలసిన నారాయణగిరి శిఖర పరిసరాలలో నిర్మితమైన ప్రశాంత వసతి భవనాలు.'
  },
  {
    code: 'VSRH',
    category: 'rest_houses',
    nameEn: 'Varahaswamy Rest House',
    nameTe: 'వరాహస్వామి రెస్ట్ హౌస్',
    descEn: 'Positioned close to the ancient Sri Adi Bhu Varaha Swami temple near North Mada Street.',
    descTe: 'ఉత్తర మాడ వీధి సమీపంలోని ప్రాచీన శ్రీ ఆది వరాహస్వామి ఆలయానికి దగ్గరగా ఉన్న వసతి నిలయం.'
  },
  {
    code: 'RBRH',
    category: 'rest_houses',
    nameEn: 'Rambagicha Rest Houses',
    nameTe: 'రాంభగీచా రెస్ట్ హౌస్లు',
    descEn: 'Large multi-block guest house enclave located directly opposite the Central Reception Office (CRO).',
    descTe: 'కేంద్ర రిసెప్షన్ కార్యాలయం (CRO) కు ఎదురుగా ఉన్న బహుళ బ్లాకుల ప్రధాన వసతి సముదాయం.'
  },
  {
    code: 'SNRH',
    category: 'rest_houses',
    nameEn: 'Seshadri Nagar Rest House',
    nameTe: 'శేషాద్రినగర్ రెస్ట్ హౌస్',
    descEn: 'Peaceful accommodation zone named in honor of the Seshadri hill representing Adisesha.',
    descTe: 'ఆదిశేషుని స్వరూపమైన శేషాద్రి కొండ పేరిట వెలసిన ప్రశాంత విశ్రాంతి నిలయం.'
  },
  {
    code: 'SMRH',
    category: 'rest_houses',
    nameEn: 'Sanku Mitta Rest House',
    nameTe: 'శంకుమిట్ట రెస్ట్ హౌస్',
    descEn: 'Located near the historic Sanku Mitta elevated quarter in Tirumala.',
    descTe: 'తిరుమలలోని చారిత్రక శంకుమిట్ట ఎత్తైన ప్రాంతంలో నెలకొన్న వసతి భవనం.'
  },

  // Cottages & Enclaves
  {
    code: 'HVC',
    category: 'cottages',
    nameEn: 'Hill View Cottages',
    nameTe: 'హిల్ వ్యూ కాటేజీలు',
    descEn: 'Independent cottage units offering panoramic scenic views of the Seshachalam forest valleys.',
    descTe: 'శేషాచల శ్రేణుల ప్రకృతి సౌందర్యాన్ని వీక్షించేలా నిర్మించిన ప్రశాంత వ్యక్తిగత కాటేజీలు.'
  },
  {
    code: 'GNC',
    category: 'cottages',
    nameEn: 'Garudadri Nagar Cottages',
    nameTe: 'గరుడాద్రినగర్ కాటేజీలు',
    descEn: 'Expansive pilgrim cottage enclave located in the serene northern residential sector of Tirumala.',
    descTe: 'తిరుమల ఉత్తర నివాస ప్రాంతంలో ఉన్న అతిపెద్ద యాత్రికుల కాటేజీల సముదాయం.'
  },
  {
    code: 'ANC',
    category: 'cottages',
    nameEn: 'Anjanadri Nagar Cottages',
    nameTe: 'అంజనాద్రినగర్ కాటేజీలు',
    descEn: 'Named after Anjanadri hill, birthplace of Lord Hanuman, offering family cottage suites.',
    descTe: 'హనుమంతుని జన్మస్థలమైన అంజనాద్రి కొండ పేరిట కుటుంబ యాత్రికుల కోసం నిర్మించిన కాటేజీలు.'
  },
  {
    code: 'SNC',
    category: 'cottages',
    nameEn: 'Seshadri Nagar Cottages',
    nameTe: 'శేషాద్రినగర్ కాటేజీలు',
    descEn: 'Cottages nestled near the inner ring roads providing quiet family boarding.',
    descTe: 'రింగ్ రోడ్డు సమీపంలో కుటుంబ సమేతంగా విడిది చేయడానికి అనువైన కాటేజీలు.'
  },
  {
    code: 'SMC',
    category: 'cottages',
    nameEn: 'Sanku Mitta Cottages',
    nameTe: 'శంకుమిట్ట కాటేజీలు',
    descEn: 'Traditional cottage rows perched on the elevated ridge overlooking the sacred township.',
    descTe: 'తిరుమల పట్టణాన్ని వీక్షించే ఎత్తైన శంకుమిట్ట గట్టుపై నిర్మించిన సాంప్రదాయ కాటేజీలు.'
  },
  {
    code: 'ATC',
    category: 'cottages',
    nameEn: 'Alwar Tank Cottages',
    nameTe: 'ఆళ్వార్ ట్యాంక్ కాటేజీలు',
    descEn: 'Popular cottages situated along the peaceful Alwar Tank approach road.',
    descTe: 'ఆళ్వార్ చెరువు సమీపంలో భక్తులకు అనుకూలంగా ఉండే ప్రముఖ కాటేజీలు.'
  },
  {
    code: 'TBC',
    category: 'cottages',
    nameEn: 'Travellers Bungalow Cottages',
    nameTe: 'ట్రావెలర్స్ బంగ్లా కాటేజీలు (TB కాటేజీలు)',
    descEn: 'Heritage bungalows established during earlier administrative eras, now modernized for pilgrims.',
    descTe: 'పూర్వకాలం నుండి యాత్రికుల సేవలో ఉన్న చారిత్రక సౌకర్యవంతమైన బంగ్లా కాటేజీలు.'
  },
  {
    code: 'MBC',
    category: 'cottages',
    nameEn: 'Mangalam Bavi Cottages',
    nameTe: 'మంగళం బావి కాటేజీలు',
    descEn: 'Cottage enclave built adjacent to the sacred historical water spring known as Mangalam Bavi.',
    descTe: 'చారిత్రక మంగళం బావి తీర్థం చెంత నిర్మించబడిన ప్రశాంత యాత్రికుల కాటేజీల నిలయం.'
  },
  {
    code: 'SPTC',
    category: 'cottages',
    nameEn: 'Soorapuram Thota Cottages',
    nameTe: 'సూరపురం తోట కాటేజీలు',
    descEn: 'Greenery-surrounded cottage accommodations situated near the Paruveta Mandapam / garden belt.',
    descTe: 'పచ్చని ఉద్యానవనాలు మరియు పారువేట మండపం సమీపంలో నిర్మించిన ఆహ్లాదకరమైన కాటేజీలు.'
  }
];

export const LADDU_KIOSK_GUIDE = {
  titleEn: 'Automated UPI KIOSK Machines at Tirumala Laddu Counters',
  titleTe: 'తిరుమల లడ్డూ కౌంటర్ల వద్ద స్వయంచాలక UPI కియోస్క్ యంత్రాల మార్గదర్శిని',
  subtitleEn: 'Swift, cashless, and self-service purchase of additional Srivari Laddus without waiting in queue',
  subtitleTe: 'క్యూలో వేచి ఉండాల్సిన పనిలేకుండా నేరుగా UPI ద్వారా అదనపు లడ్డూలను పొందే డిజిటల్ విధానం',
  overviewEn: 'To minimize pilgrim wait times and eliminate cash handling friction, TTD has deployed modern touch-screen KIOSK terminals directly in front of the Laddu Distribution Complex. Devotees can purchase up to 2 extra laddus per person seamlessly via any UPI app.',
  overviewTe: 'లడ్డూ కౌంటర్ల వద్ద రద్దీని తగ్గించడానికి మరియు భక్తుల సమయాన్ని ఆదా చేయడానికి TTD అత్యాధునిక టచ్‌స్క్రీన్ కియోస్క్ యంత్రాలను ప్రవేశపెట్టింది. భక్తులు ఏ విధమైన నగదు అవసరం లేకుండా నేరుగా UPI ద్వారా ఒక్కొక్కరికి గరిష్టంగా 2 అదనపు లడ్డూలను త్వరితగతిన పొందవచ్చు.',
  quotaRules: [
    {
      titleEn: 'With Valid Darshan Ticket',
      titleTe: 'చెల్లుబాటు అయ్యే దర్శన టికెట్ ఉన్నవారికి',
      descEn: 'Scan your barcode or enter your Darshan Ticket registration number. The system verifies your booking and permits purchase of up to 2 additional laddus per individual listed on that ticket.',
      descTe: 'మీ దర్శన టికెట్ బార్‌కోడ్ స్కాన్ చేయండి లేదా నంబర్ నమోదు చేయండి. టికెట్‌లో నమోదైన వ్యక్తుల సంఖ్య ఆధారంగా ఒక్కొక్కరికి 2 అదనపు లడ్డూల వరకు అనుమతి లభిస్తుంది.'
    },
    {
      titleEn: 'Without Darshan Ticket (Aadhaar Mode)',
      titleTe: 'దర్శన టికెట్ లేని యాత్రికులకు (ఆధార్ విధానం)',
      descEn: 'Even if you do not hold an advance darshan ticket, you can purchase up to 2 additional laddus by authenticating with a valid 12-digit Aadhaar card number.',
      descTe: 'అడ్వాన్స్ దర్శన టికెట్ లేకపోయినా, మీ 12 అంకెల ఆధార్ నంబర్‌ను కియోస్క్‌లో నమోదు చేసి గరిష్టంగా 2 అదనపు లడ్డూలను కొనుగోలు చేయవచ్చు.'
    }
  ],
  steps: [
    {
      step: 1,
      titleEn: 'Approach Terminal',
      titleTe: 'కియోస్క్ యంత్రాన్ని సమీపించండి',
      descEn: 'Locate an available touch-screen KIOSK machine installed near the main Laddu Distribution Complex gates.',
      descTe: 'లడ్డూ పంపిణీ సముదాయం వద్ద అందుబాటులో ఉన్న టచ్‌స్క్రీన్ కియోస్క్ మెషీన్ వద్దకు వెళ్లండి.'
    },
    {
      step: 2,
      titleEn: 'Select Ticket or Aadhaar Mode',
      titleTe: 'దర్శన టికెట్ లేదా ఆధార్ ఎంపిక చేసుకోండి',
      descEn: 'Choose "With Darshan Ticket" if you hold a valid physical or digital darshan pass, or "Without Darshan Ticket" to authenticate via Aadhaar.',
      descTe: 'మీ వద్ద దర్శన టికెట్ ఉంటే మొదటి ఎంపికను, లేకుంటే "దర్శన టికెట్ లేకుండా" ఎంపికపై నొక్కి ఆధార్ వివరాలు నమోదు చేయండి.'
    },
    {
      step: 3,
      titleEn: 'Choose Laddu Quantity',
      titleTe: 'లడ్డూల సంఖ్యను నమోదు చేయండి',
      descEn: 'Select the desired number of additional laddus (strictly subject to the 2 laddus per verified person quota limit).',
      descTe: 'మీ కోటా పరిమితి ప్రకారం (గరిష్టంగా 2 లడ్డూలు) కావలసిన లడ్డూల సంఖ్యను స్క్రీన్‌పై ఎంచుకోండి.'
    },
    {
      step: 4,
      titleEn: 'Scan Dynamic UPI QR Code',
      titleTe: 'UPI QR కోడ్ స్కాన్ చేసి చెల్లించండి',
      descEn: 'The screen generates a dynamic payment QR code. Open any mobile payment app (PhonePe, Google Pay, Paytm, BHIM) and complete the transaction.',
      descTe: 'స్క్రీన్‌పై కనిపించే డైనమిక్ క్యూఆర్ కోడ్‌ను మీ మొబైల్ బ్యాంకింగ్ లేదా UPI యాప్ ద్వారా స్కాన్ చేసి క్షణాల్లో చెల్లింపు పూర్తి చేయండి.'
    },
    {
      step: 5,
      titleEn: 'Collect Printed Voucher & Claim Laddus',
      titleTe: 'రశీదు తీసుకుని లడ్డూలు అందుకోండి',
      descEn: 'Take the automated printed transaction voucher from the dispenser slot and present it at the designated express laddu counter to receive your consecrated laddus.',
      descTe: 'యంత్రం నుండి ముద్రించబడిన రశీదును తీసుకుని, సమీపంలోని లడ్డూ కౌంటర్‌లో సమర్పించి వేడి వేడి శ్రీవారి లడ్డూలను స్వీకరించండి.'
    }
  ]
};

export const KALYANAMAHAPRASADAM_GUIDE = {
  titleEn: "Lord Venkateswara's Divine Blessings at Your Doorstep (Kalyanamahaprasadam)",
  titleTe: 'నవదంపతులకు ఇంటి వద్దకే శ్రీవారి దివ్య ఆశీస్సులు (కల్యాణ మహాప్రసాదం)',
  subtitleEn: 'Postal Marriage Gift & Sanctified Blessings Kit for Newly Married Couples',
  subtitleTe: 'వివాహం నిశ్చయమైన వధూవరులకు తిరుమల తిరుపతి దేవస్థానం పంపే పవిత్ర ప్రసాద కానుక',
  overviewEn: 'TTD extends the divine grace of Lord Venkateswara and Goddess Padmavathi Devi to newlywed couples. By sending your wedding invitation card to the Executive Officer at least 30 days prior to the wedding, TTD dispatches a sanctified marriage blessings package directly to your postal residence free of cost.',
  overviewTe: 'సనాతన ధర్మంలో వివాహ బంధాన్ని పవిత్రంగా ఆశీర్వదించడానికి TTD ఈ విశిష్ట సేవను అందిస్తోంది. మీ వివాహ ఆహ్వాన పత్రికను (Wedding Card) వివాహ తేదీకి కనీసం ఒక నెల ముందుగా TTD ఈవో గారికి పంపితే, శ్రీవారి పవిత్ర కల్యాణ ప్రసాదాల కానుక మీ ఇంటి చిరునామాకు తపాలా ద్వారా చేరుతుంది.',
  dispatchWindowEn: 'Send card at least 1 month (30 days) in advance of the wedding date with your complete return postal address and pin code.',
  dispatchWindowTe: 'పూర్తి పోస్టల్ చిరునామా మరియు పిన్ కోడ్‌తో వివాహానికి కనీసం 30 రోజుల ముందుగా ఆహ్వాన పత్రికను పంపాలి.',
  officialAddress: {
    designation: 'The Executive Officer',
    organization: 'Tirumala Tirupati Devasthanams (TTD)',
    building: 'TTD Administrative Building',
    street: 'K.T. Road',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    pinCode: '517 501',
    country: 'India'
  },
  kitContents: [
    {
      itemEn: 'Akshintalu (Talambralu)',
      itemTe: 'దివ్య అక్షింతలు (తలంబ్రాలు)',
      descEn: 'Sacred consecrated rice pearls blessed in the sanctum during Srivari Nitya Kalyana Utsavam.',
      descTe: 'శ్రీవారి నిత్య కల్యాణోత్సవంలో పూజించబడిన పవిత్ర మంత్రాలయ అక్షింతలు.'
    },
    {
      itemEn: 'Consecrated Kumkuma',
      itemTe: 'పవిత్ర కుంకుమ',
      descEn: 'Sanctified saffron vermilion energized through divine archana to Goddess Padmavathi and Lakshmi.',
      descTe: 'అమ్మవార్ల పూజలో సమర్పించబడిన సర్వమంగళ ప్రదాత దివ్య కుంకుమ.'
    },
    {
      itemEn: 'Kankanam (Wedding Wristbands)',
      itemTe: 'రక్షా కంకణాలు',
      descEn: 'Consecrated sacred wedding wristbands for both the bride and the bridegroom symbolizing divine protection and harmony.',
      descTe: 'వధూవరుల ఇరువురికీ సకల శుభాలను, దాంపత్య రక్షణను ప్రసాదించే పవిత్ర రక్షా బంధనాలు.'
    },
    {
      itemEn: 'Sanctified Prasadam',
      itemTe: 'శ్రీవారి పవిత్ర ప్రసాదం',
      descEn: 'Direct sacred prasadam offered at the holy feet of Lord Srinivasa.',
      descTe: 'శ్రీవారి మూలవిరాట్ సన్నిధిలో నివేదించబడిన పవిత్ర మహాప్రసాదం.'
    },
    {
      itemEn: 'Special Kalyana Grantha (Book)',
      itemTe: 'విశిష్ట కల్యాణ గ్రంథం',
      descEn: 'An inspiring devotional booklet illustrating the sacred spiritual vows, dharma, and significance of Vedic marriage.',
      descTe: 'గృహస్థాశ్రమ విశిష్టతను, సనాతన వివాహ ధర్మాలను వివరించే మార్గదర్శక ఆధ్యాత్మిక పుస్తకం.'
    }
  ]
};

export const PILGRIM_ETIQUETTE_RULES = [
  {
    titleEn: 'The Strict Sacred Rule: Never Wear Flowers in Tirumala',
    titleTe: 'పరమ పవిత్ర నియమం: తిరుమలలో భక్తులు పూలు ధరించకూడదు',
    descEn: 'Tirumala is revered as the Pushpa Mandapam (the Pavilion of Flowers). Every single flower and blossom on the sacred hill belongs exclusively to Lord Venkateswara. Devotees—regardless of tradition—must refrain from wearing flowers in their hair or clothes while atop Tirumala.',
    descTe: 'తిరుమల క్షేత్రం "పుష్ప మండపం"గా ప్రసిద్ధి చెందింది. ఈ పవిత్ర గిరిపై విరిసే ప్రతి పువ్వు మరియు పరిమళం కేవలం శ్రీవేంకటేశ్వర స్వామివారి దివ్య కైంకర్యానికి మాత్రమే చెందుతుంది. కావున తిరుమలలో ఉన్నంత కాలం స్త్రీలు గానీ భక్తులు గానీ తమ తలలో పువ్వులు ధరించరాదు.'
  },
  {
    titleEn: 'Agamic Modesty & Traditional Attire',
    titleTe: 'సాంప్రదాయ వస్త్రధారణ',
    descEn: 'In accordance with the Bhrigu Samhita and temple regulations, pilgrims must wear neat, modest traditional garments covering shoulders and knees (Dhoti/Kurta or Pyjama with Uttariyam for men; Saree, Half-saree, or Chudidar with Dupatta for women).',
    descTe: 'భృగు సంహిత మరియు ఆలయ నిబంధనల ప్రకారం భక్తులు హుందాతనంతో కూడిన సంప్రదాయ వస్త్రాలను ధరించాలి (పురుషులు: ధోవతి, కుర్తా లేదా పైజామా; స్త్రీలు: చీర, లంగా ఓణీ లేదా దుపట్టాతో కూడిన చుడీదార్).'
  },
  {
    titleEn: 'Quietude & Mindful Silence',
    titleTe: 'ప్రశాంతత & మౌన ధ్యానం',
    descEn: 'The sanctum precincts carry profound cosmic vibrations. Avoid loud talking, mobile phone ringing, argument, or boisterous laughter. Maintain internal remembrance of the divine Govinda Namam.',
    descTe: 'ఆలయ ప్రాకారాలలో దైవిక స్పందనలు నిండి ఉంటాయి. కేకలు, సెల్‌ఫోన్ శబ్దాలు, అనవసర సంభాషణలు మాని మనస్సులో "గోవింద" నామస్మరణను నిరంతరం కొనసాగించాలి.'
  },
  {
    titleEn: 'Circumambulation (Clockwise Pradakshinam)',
    titleTe: 'ప్రదక్షిణ నియమాలు',
    descEn: 'Circumambulate shrines, mandapams, and the outer Mada streets strictly in a mindful, clockwise direction, embodying complete self-surrender without jostling fellow devotees.',
    descTe: 'ఆలయ మండపాలు మరియు మాడ వీధులలో ఎల్లప్పుడూ సవ్యదిశలోనే (Clockwise) ప్రశాంతంగా, ఇతరులను నెట్టివేయకుండా భక్తితో ప్రదక్షిణ చేయాలి.'
  },
  {
    titleEn: 'Strict Photography & Recording Restrictions',
    titleTe: 'ఫోటోగ్రఫీ మరియు వీడియో నిషేధం',
    descEn: 'Photography, videography, and unauthorized filming inside the temple complex, sanctum entrances, and during ritual processions are strictly prohibited to safeguard ancient sanctity.',
    descTe: 'ఆలయ పవిత్రతను కాపాడటానికి గర్భాలయ ద్వారాల వద్ద, క్యూ కాంప్లెక్స్‌లలో మరియు పూజా క్రతువుల సమయంలో కెమెరాలు, సెల్‌ఫోన్ రికార్డింగ్‌లు పూర్తిగా నిషేధించబడ్డాయి.'
  },
  {
    titleEn: 'Cleanliness: Holy Surroundings Reflect Clean Mind',
    titleTe: 'పరిసరాల పరిశుభ్రత',
    descEn: 'Dispose of garbage only in designated trash bins. Avoid single-use plastics and maintain the natural ecological sanctity of the sacred Seshachalam biosphere.',
    descTe: 'చెత్తను కేవలం నిర్దేశిత డస్ట్‌బిన్లలో మాత్రమే వేయాలి. ప్లాస్టిక్ వాడకాన్ని పూర్తిగా వర్జించి పవిత్ర శేషాచల అటవీ వాతావరణాన్ని పరిశుభ్రంగా ఉంచాలి.'
  }
];

export const PILGRIM_FAQS = [
  {
    id: 'faq-flowers-rule',
    category: 'rules',
    questionEn: 'Why are pilgrims not allowed to wear flowers in their hair at Tirumala?',
    questionTe: 'తిరుమలలో భక్తులు తలలో పూలు ఎందుకు ధరించకూడదు?',
    answerEn: 'Tirumala is revered as the Pushpa Mandapam where every blossom belongs exclusively to Lord Venkateswara. Devotees abstain from wearing flowers in their hair to preserve them entirely for the Lord\'s sacred worship.',
    answerTe: 'తిరుమల క్షేత్రం "పుష్ప మండపం". ఇక్కడి ప్రతి పువ్వు స్వామివారి దివ్య కైంకర్యానికే చెందుతుంది కాబట్టి భక్తులు తలలో పూలు ధరించరు.',
    source: 'Sapthagiri Magazine (September 2026)'
  },
  {
    id: 'faq-varaha-swami-first',
    category: 'rituals',
    questionEn: 'Why should pilgrims visit Sri Bhu Varaha Swami Temple before taking darshan of Lord Venkateswara?',
    questionTe: 'శ్రీవేంకటేశ్వర స్వామి దర్శనానికి ముందే శ్రీ ఆది వరాహస్వామిని ఎందుకు దర్శించుకోవాలి?',
    answerEn: 'Per Puranic covenant, Sri Adi Varaha Swamy granted the sacred hill to Lord Srinivasa on the condition that pilgrims first offer homage at His shrine before entering the main sanctum.',
    answerTe: 'పురాణ కథనం ప్రకారం శేషాచల క్షేత్రపాలకుడైన శ్రీ భూవరాహస్వామిని దర్శించిన తర్వాతే శ్రీవేంకటేశ్వర స్వామిని దర్శించాలని ఆగమ విధి నిర్దేశిస్తుంది.',
    source: 'Sapthagiri Magazine & Venkatachala Mahatmyam'
  },
  {
    id: 'faq-hundi-koppera',
    category: 'traditions',
    questionEn: 'Why is the temple hundi referred to as "Koppera", and why do devotees offer wealth into it?',
    questionTe: 'తిరుమల హుండీని "కొప్పెర" అని ఎందుకు అంటారు? అందులో కానుకలు ఎందుకు సమర్పిస్తారు?',
    answerEn: 'The Koppera is a sacred brass cauldron where devotees offer coins and gold to symbolically assist Lord Venkateswara in repaying His celestial wedding loan to Kubera.',
    answerTe: 'శ్రీవారి కల్యాణం కోసం కుబేరుని వద్ద తీసుకున్న రుణాన్ని తీర్చడంలో భక్తితో భాగస్వామ్యం కావడానికి భక్తులు కొప్పెర హుండీలో కానుకలు సమర్పిస్తారు.',
    source: 'Sapthagiri Magazine (October 2026)'
  },
  {
    id: 'faq-sannidhi-golla',
    category: 'traditions',
    questionEn: 'Who is the Sannidhi Golla, and why do they enter the sanctum before Suprabhatam begins?',
    questionTe: 'సన్నిధి గొల్ల ఎవరు? సుప్రభాతానికి ముందే గర్భాలయంలోకి వారు ఎందుకు ప్రవేశిస్తారు?',
    answerEn: 'A devout Yadava cowherd offered the first hospitality to Lord Srinivasa on Earth. By divine boon, his lineage holds the eternal privilege of daily first darshan, entering before Suprabhatam with a flaming torch.',
    answerTe: 'స్వామివారికి మొదటి ఆతిథ్యమిచ్చిన యాదవ భక్తుని వంశీయుడే సన్నిధి గొల్ల. ప్రతిరోజూ బ్రహ్మముహూర్తంలో దివిటీతో గర్భాలయంలోకి ప్రథమంగా ప్రవేశించే సంప్రదాయ గౌరవం వీరిదే.',
    source: 'Sapthagiri Magazine (September 2025)'
  },
  {
    id: 'faq-laddu-kiosk',
    category: 'amenities',
    questionEn: 'How do the UPI KIOSK machines work for purchasing additional Tirumala Laddus?',
    questionTe: 'అదనపు లడ్డూలను కొనుగోలు చేయడానికి UPI కియోస్క్ యంత్రాలను ఎలా ఉపయోగించాలి?',
    answerEn: 'Select your darshan ticket or Aadhaar mode on the touch-screen KIOSK (up to 2 extra laddus), scan the generated UPI QR code, and present the printed receipt at the counter to claim your laddus.',
    answerTe: 'కియోస్క్ మెషీన్‌లో ఆధార్ లేదా దర్శన టికెట్ ఎంచుకుని, UPI క్యూఆర్ కోడ్ స్కాన్ చేసి నగదు చెల్లించి రశీదుతో కౌంటర్‌లో అదనపు లడ్డూలు పొందవచ్చు.',
    source: 'Sapthagiri Magazine (September 2026)'
  },
  {
    id: 'faq-wedding-card-blessing',
    category: 'amenities',
    questionEn: 'How can newly married couples receive Lord Venkateswara\'s wedding blessings by post?',
    questionTe: 'కొత్తగా పెళ్లయిన దంపతులు శ్రీవారి కల్యాణ ప్రసాదాన్ని తపాలా ద్వారా ఎలా పొందవచ్చు?',
    answerEn: 'Mail your formal printed wedding invitation card 30 days prior to The Executive Officer, TTD, K.T. Road, Tirupati - 517501 with full return address to receive complimentary sanctified Akshintalu, Kumkuma, and Prasadam by post.',
    answerTe: 'వివాహానికి 30 రోజుల ముందు పెళ్లి పత్రికను పూర్తి తిరుగు చిరునామాతో టీటీడీ ఈవో చిరునామాకు పంపితే స్వామివారి తలంబ్రాలు, కుంకుమ, ప్రసాదం ఉచితంగా తపాలా ద్వారా అందుతాయి.',
    source: 'Sapthagiri Magazine (September 2026)'
  },
  {
    id: 'faq-seven-thresholds',
    category: 'rituals',
    questionEn: 'What are the seven sacred doorways and thresholds leading into the sanctum sanctorum?',
    questionTe: 'గర్భాలయానికి దారితీసే ఏడు పవిత్ర ప్రవేశ ద్వారాలు మరియు గడపలు ఏవి?',
    answerEn: 'Pilgrims pass through 7 sanctified doorways: Maha Dwaram (outer gopuram), Vendi Vakili, Bangaru Vakili, Snapana Mantapa Door, Ramulavarimeda Door, Sayana Mantapa Door, and the innermost Kulasekhara Padi.',
    answerTe: 'మహా ద్వారం, వెండి వాకిలి, బంగారు వాకిలి, స్నపన మండపం, రాములవారిమేడ, శయన మండపం, మరియు కులశేఖర పడి — ఇవి గర్భాలయానికి గల 7 పవిత్ర ప్రవేశ ద్వారాలు.',
    source: 'Sapthagiri Magazine (September 2026)'
  },
  {
    id: 'faq-eight-garlands',
    category: 'traditions',
    questionEn: 'What are the specific flower garlands crafted daily for Lord Venkateswara?',
    questionTe: 'శ్రీవారికి ప్రతిరోజూ అలంకరించే ఎనిమిది విశిష్ట పూలమాలలు ఏవి?',
    answerEn: 'The Mula Virat is adorned with 8 Agamic garlands: Shikhamani (8 ft), Saligrama Malas, Kanthasari, Vakshasthala Lakshmi Malas, Shanku-Chakra Malas, Khatari Saram, Tavalams, and Tiruvadi Malas.',
    answerTe: 'శిఖామణి, సాలిగ్రామ మాలలు, కంఠసరి, వక్షస్థల లక్ష్మి మాలలు, శంఖ-చక్ర మాలలు, ఖటారి సరం, తవళాలు, మరియు తిరువడి మాలలు స్వామివారికి నిత్యం సమర్పించే 8 దివ్య మాలలు.',
    source: 'Sapthagiri Magazine (September 2026)'
  },
  {
    id: 'faq-kainkaryaparas-three',
    category: 'rituals',
    questionEn: 'Who are the Three Important Functionaries (Kainkaryaparas) of Tirumala Temple?',
    questionTe: 'తిరుమల ఆలయ ప్రధాన ముగ్గురు కైంకర్యపరులు ఎవరు?',
    answerEn: 'As recorded in the 1817 Sawal Jawab Patti, the three primary hereditary functionaries are the Vaikhanasa Archakas (who conduct puja), the Jeeyangars (who supervise rituals and lamps), and the Acharya Purushas (who lead Vedic parayanam).',
    answerTe: '1817 సవాల్ జవాబ్ పట్టీ ప్రకారం: వైఖానస అర్చకులు (పూజా కైంకర్యాలు), జీయంగార్లు (ఆలయ పర్యవేక్షణ, అఖండ దీపాలు), మరియు ఆచార్య పురుషులు (వేద పారాయణం) ఆలయ ప్రధాన ముగ్గురు కైంకర్యపరులు.',
    source: 'Sapthagiri Magazine (September 2025)'
  },
  {
    id: 'faq-copper-plates-1922',
    category: 'traditions',
    questionEn: 'How were Annamacharya\'s copper plate sankirtanas discovered inside the Tirumala temple?',
    questionTe: 'తిరుమల ఆలయంలో అన్నమాచార్యుల రాగిరేకులు ఎలా బయటపడ్డాయి?',
    answerEn: 'In 1922, scholars opened the sealed stone Sankeertana Bhandagaram opposite the hundi and discovered roughly 2,500 copper plates bearing over 14,000 devotional songs composed by Tallapaka Annamacharya.',
    answerTe: '1922లో హుండీ ఎదురుగా ఉన్న సంకీర్తన భాండాగారాన్ని తెరవగా, తాళ్లపాక అన్నమాచార్యులు రచించిన 14,000కు పైగా సంకీర్తనలు గల 2,500 రాగిరేకులు బయల్పడ్డాయి.',
    source: 'Sapthagiri Magazine (October 2026)'
  }
];
