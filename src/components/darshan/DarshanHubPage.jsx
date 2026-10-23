import { isModifiedClick } from '../../utils/navigation';
import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Clock,
  Ticket,
  MapPin,
  Calendar,
  UserCheck,
  CheckCircle2,
  Table as TableIcon,
  LayoutGrid,
  BookOpen,
  HeartHandshake,
  Globe2,
  Compass,
  Flame,
  Award,
  Info,
  ChevronRight,
  AlertCircle,
  Phone,
  Users,
  Check,
  CalendarDays
} from 'lucide-react';
import { DARSHAN_CATEGORIES, DARSHAN_TOPICS } from '../../data/darshanTopics';
import useTheme from '../../hooks/useTheme';

// Verified Quota Release Announcements Audited Against Official TTD Announcements
// Clearly distinguishing:
// 1. Applicable Quota Month
// 2. Official Announcement Publication Date
// 3. Booking Release Date & Time in IST
// 4. Official Authoritative Source
const VERIFIED_QUOTA_ANNOUNCEMENTS = [
  {
    slug: 'special-entry-300',
    titleEn: 'Special Entry Darshan (₹300)',
    titleTe: 'ప్రత్యేక ప్రవేశ దర్శనం (₹300)',
    badgeEn: 'Online Advance',
    badgeTe: 'ఆన్‌లైన్ ముందస్తు',
    cost: '₹300 / person',
    status: 'confirmed',
    applicableMonthEn: 'January 2027 Darshan Quota',
    applicableMonthTe: 'జనవరి 2027 దర్శన కోటా',
    announcementDateEn: '17 October 2026',
    announcementDateTe: '17 అక్టోబర్ 2026',
    bookingReleaseEn: '24 October 2026 at 10:00 AM IST',
    bookingReleaseTe: '24 అక్టోబర్ 2026 ఉదయం 10:00 IST',
    officialSourceEn: 'Official TTD Press Release (ttdevasthanams.ap.gov.in)',
    officialSourceTe: 'టీటీడీ అధికారిక పత్రికా ప్రకటన',
    portalUrl: 'https://ttdevasthanams.ap.gov.in',
    notesEn: 'Includes 1 complimentary Laddu. Requires registered TTD user account with Aadhaar. Max 6 tickets per transaction.',
    notesTe: 'ఒక ఉచిత లడ్డూ లభిస్తుంది. ఆధార్ తో లాగిన్ అవ్వాలి. గరిష్టంగా 6 టికెట్లు మాత్రమే.'
  },
  {
    slug: 'arjitha-sevas',
    titleEn: 'Srivari Arjitha Sevas (General Quota)',
    titleTe: 'శ్రీవారి ఆర్జిత సేవలు (సాధారణ కోటా)',
    badgeEn: 'Seva Quota',
    badgeTe: 'సేవా కోటా',
    cost: 'Kalyanam ₹1,000 | Other Sevas ₹500',
    status: 'confirmed',
    applicableMonthEn: 'January 2027 Seva Quota',
    applicableMonthTe: 'జనవరి 2027 సేవా కోటా',
    announcementDateEn: '17 October 2026',
    announcementDateTe: '17 అక్టోబర్ 2026',
    bookingReleaseEn: '22 October 2026 at 10:00 AM IST',
    bookingReleaseTe: '22 అక్టోబర్ 2026 ఉదయం 10:00 IST',
    officialSourceEn: 'Official TTD Press Release',
    officialSourceTe: 'టీటీడీ అధికారిక పత్రికా ప్రకటన',
    portalUrl: 'https://ttdevasthanams.ap.gov.in',
    notesEn: 'General online quota for Kalyanotsavam, Unjal Seva, Arjitha Brahmotsavam & Sahasra Deepalankara Seva.',
    notesTe: 'కల్యాణోత్సవం, ఊంజల్, బ్రహ్మోత్సవం, సహస్ర దీపాలంకార సేవల సాధారణ కోటా.'
  },
  {
    slug: 'virtual-sevas',
    titleEn: 'Virtual Sevas & Associated Darshan',
    titleTe: 'వర్చువల్ సేవలు & దర్శన కోటా',
    badgeEn: 'Virtual & Sanctum',
    badgeTe: 'వర్చువల్ & దర్శనం',
    cost: '₹500 – ₹1,000 / couple',
    status: 'confirmed',
    applicableMonthEn: 'January 2027 Quota',
    applicableMonthTe: 'జనవరి 2027 కోటా',
    announcementDateEn: '17 October 2026',
    announcementDateTe: '17 అక్టోబర్ 2026',
    bookingReleaseEn: '22 October 2026 at 03:00 PM IST',
    bookingReleaseTe: '22 అక్టోబర్ 2026 మధ్యాహ్నం 03:00 IST',
    officialSourceEn: 'Official TTD Press Release',
    officialSourceTe: 'టీటీడీ అధికారిక పత్రికా ప్రకటన',
    portalUrl: 'https://ttdevasthanams.ap.gov.in',
    notesEn: 'Includes virtual live participation on SVBC plus connected fast-track sanctum darshan at Tirumala.',
    notesTe: 'SVBC ద్వారా ప్రత్యక్ష ప్రసార సేవలో పాల్గొనడంతో పాటు తిరుమలలో భౌతిక దర్శన కోటా.'
  },
  {
    slug: 'senior-citizens',
    titleEn: 'Senior Citizens & Differently Abled',
    titleTe: 'వయోవృద్ధులు & దివ్యాంగుల కోటా',
    badgeEn: 'Priority Care',
    badgeTe: 'ప్రాధాన్యత కోటా',
    cost: 'Free',
    status: 'confirmed',
    applicableMonthEn: 'January 2027 Quota',
    applicableMonthTe: 'జనవరి 2027 కోటా',
    announcementDateEn: '17 October 2026',
    announcementDateTe: '17 అక్టోబర్ 2026',
    bookingReleaseEn: '23 October 2026 at 03:00 PM IST',
    bookingReleaseTe: '23 అక్టోబర్ 2026 మధ్యాహ్నం 03:00 IST',
    officialSourceEn: 'Official TTD Press Release',
    officialSourceTe: 'టీటీడీ అధికారిక పత్రికా ప్రకటన',
    portalUrl: 'https://ttdevasthanams.ap.gov.in',
    notesEn: 'Age 65+ with Aadhaar; 40%+ permanent disability certificate for medical cases. Supatham entry.',
    notesTe: '65+ ఏళ్ల వృద్ధులు లేదా 40% దివ్యాంగుల సర్టిఫికేట్ ఉన్న భక్తులకు సుపథం ద్వార ప్రవేశం.'
  },
  {
    slug: 'angapradakshinam',
    titleEn: 'Srivari Angapradakshinam Tokens',
    titleTe: 'అంగప్రదక్షిణం ఉచిత టోకెన్లు',
    badgeEn: 'Sacred Deed',
    badgeTe: 'పుణ్య కైంకర్యం',
    cost: 'Free',
    status: 'confirmed',
    applicableMonthEn: 'January 2027 Quota',
    applicableMonthTe: 'జనవరి 2027 కోటా',
    announcementDateEn: '17 October 2026',
    announcementDateTe: '17 అక్టోబర్ 2026',
    bookingReleaseEn: '23 October 2026 at 10:00 AM IST',
    bookingReleaseTe: '23 అక్టోబర్ 2026 ఉదయం 10:00 IST',
    officialSourceEn: 'Official TTD Press Release',
    officialSourceTe: 'టీటీడీ అధికారిక పత్రికా ప్రకటన',
    portalUrl: 'https://ttdevasthanams.ap.gov.in',
    notesEn: 'Online token. Ritual performed inside sanctum circumambulation at 2:00 AM in wet traditional vastram.',
    notesTe: 'ఆన్‌లైన్ ఉచిత టోకెన్. తెల్లవారుజామున 2:00 గంటలకు అంతరాలయంలో తడి వస్త్రాలతో నిర్వహిస్తారు.'
  },
  {
    slug: 'srinivasa-divyaanugraha-homam',
    titleEn: 'Srinivasa Divyaanugraha Homam',
    titleTe: 'శ్రీనివాస దివ్యానుగ్రహ విశేష హోమం',
    badgeEn: 'Homam & Darshan',
    badgeTe: 'హోమం & దర్శనం',
    cost: '₹1,000 / couple',
    status: 'confirmed',
    applicableMonthEn: 'November 2026 Quota',
    applicableMonthTe: 'నవంబర్ 2026 కోటా',
    announcementDateEn: '17 October 2026',
    announcementDateTe: '17 అక్టోబర్ 2026',
    bookingReleaseEn: '26 October 2026 at 10:00 AM IST',
    bookingReleaseTe: '26 అక్టోబర్ 2026 ఉదయం 10:00 IST',
    officialSourceEn: 'Official TTD Press Release',
    officialSourceTe: 'టీటీడీ అధికారిక పత్రికా ప్రకటన',
    portalUrl: 'https://ttdevasthanams.ap.gov.in',
    notesEn: 'Conducted daily at Alipiri Sapthagiri Pradakshina Mandapam with linked Special Entry Darshan.',
    notesTe: 'అలిపిరి సప్తగిరి ప్రదక్షిణ మంటపంలో హోమం మరియు ప్రత్యేక ప్రవేశ దర్శనం.'
  }
];

// Structured Category Groupings for Editorial Browsing (all 20 pathways categorized)
const EDITORIAL_GROUPS = [
  {
    id: 'free',
    labelEn: 'Free Darshan & Offline Tokens',
    labelTe: 'ఉచిత దర్శనం & ఆఫ్‌లైన్ టోకెన్లు',
    descEn: 'Walk-in queues and daily physical tokens issued without advance internet bookings.',
    descTe: 'ముందస్తు ఆన్‌లైన్ బుకింగ్ లేకుండా నేరుగా తిరుపతి మరియు తిరుమలలో పొందే ఉచిత దర్శనాలు.',
    slugs: ['sarva-darshanam', 'ssd-tokens', 'divya-darshan']
  },
  {
    id: 'online',
    labelEn: 'Online Booking & Lucky Dip',
    labelTe: 'ఆన్‌లైన్ బుకింగ్ & లక్కీ డిప్',
    descEn: 'Official scheduled slots and transparent electronic lotteries released in advance.',
    descTe: 'టీటీడీ అధికారిక పోర్టల్ ద్వారా విడుదలయ్యే ముందస్తు స్లాట్లు మరియు ఎలక్ట్రానిక్ డిప్.',
    slugs: ['special-entry-300', 'online-lucky-dip', 'offline-lucky-dip']
  },
  {
    id: 'special',
    labelEn: 'Special Devotee Quotas & Assisted Care',
    labelTe: 'ప్రత్యేక భక్తుల కోటాలు & ప్రాధాన్యత ప్రవేశం',
    descEn: 'Priority access for seniors, infants, differently-abled, NRI, and defence personnel.',
    descTe: 'వయోవృద్ధులు, పసిబిడ్డలు, దివ్యాంగులు, NRI మరియు రక్షణ విభాగ భక్తుల ప్రత్యేక ప్రవేశం.',
    slugs: ['senior-citizens', 'differently-abled', 'infant-darshan', 'nri-darshan', 'defence-darshan']
  },
  {
    id: 'sevas',
    labelEn: 'Sevas & Sacred Rituals',
    labelTe: 'ఆర్జిత సేవలు & నిత్య కైంకర్యాలు',
    descEn: 'Direct participation in divine kainkaryams followed by sanctum darshan.',
    descTe: 'స్వామివారి నిత్య కల్యాణోత్సవాలు, ఊంజల్ సేవల్లో పాల్గొని పొందే అంతరాలయ దర్శనం.',
    slugs: ['arjitha-sevas', 'virtual-sevas', 'angapradakshinam']
  },
  {
    id: 'vip',
    labelEn: 'VIP, Trust & Donor Pathways',
    labelTe: 'వి.ఐ.పి & ట్రస్ట్ విరాళ దర్శనాలు',
    descEn: 'Beginning break darshan via SRIVANI trust, major temple donations, and official protocols.',
    descTe: 'శ్రీవాణి ట్రస్ట్ విరాళం, దాతల పథకాలు మరియు ప్రోటోకాల్ సిఫార్సుల ద్వారా బ్రేక్ దర్శనం.',
    slugs: ['srivani-trust', 'major-donors', 'recommendation-letters']
  },
  {
    id: 'devotional',
    labelEn: 'Devotional Deeds & Spiritual Service',
    labelTe: 'భక్తి సేవ & పుణ్య కార్యాలు',
    descEn: 'Darshan earned through yagnas, sacred scripture writing, and life-saving blood donation.',
    descTe: 'హోమాలు, గోవింద నామ కోటి లిఖిత గ్రంథాల సమర్పణ మరియు రక్తదానం ద్వారా పొందే దర్శనం.',
    slugs: ['srinivasa-divyaanugraha-homam', 'govinda-nama-koti', 'blood-donation']
  }
];

export default function DarshanHubPage({
  lang = 'en',
  themeMode: propThemeMode,
  onNavigate,
  onNavigatePath
}) {
  const { themeMode: hookThemeMode } = useTheme();
  const themeMode = propThemeMode || hookThemeMode;
  const isLight = themeMode === 'light';

  const navigate = onNavigate || onNavigatePath;
  const isTe = lang === 'te';

  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      if (cat && DARSHAN_CATEGORIES.some(c => c.id === cat)) {
        return cat;
      }
    }
    return 'all';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (catId === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', catId);
      }
      window.history.replaceState({}, '', url.pathname + url.search);
    }
  };

  const handleInternalNavigate = (path, e) => {
    if (e && isModifiedClick(e)) return;
    if (e) e.preventDefault();
    if (navigate) {
      navigate(path);
    } else if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  const allTopicsList = useMemo(() => Object.values(DARSHAN_TOPICS), []);

  const filteredTopics = useMemo(() => {
    return allTopicsList.filter((topic) => {
      const matchesCategory =
        selectedCategory === 'all' || topic.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const searchTarget = `
        ${topic.titleEn} ${topic.titleTe} 
        ${topic.subtitleEn} ${topic.subtitleTe} 
        ${topic.badgeEn} ${topic.badgeTe}
        ${topic.cost} ${topic.bookingModeEn} ${topic.reportingPointEn}
        ${topic.category} ${topic.slug}
      `.toLowerCase();

      return searchTarget.includes(q);
    });
  }, [allTopicsList, selectedCategory, searchQuery]);

  return (
    <div className={`darshan-hub-page darshan-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 transition-colors animate-fade-in ${
      isLight ? 'text-slate-900' : 'text-slate-100'
    }`}>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. EDITORIAL HERO SECTION WITH AUTHENTIC TEMPLE PHOTOGRAPH  */}
      {/* ──────────────────────────────────────────────────────────── */}
      <header className={`relative rounded-3xl overflow-hidden mb-12 border transition-all duration-300 shadow-xl ${
        isLight
          ? 'border-stone-200/90 shadow-stone-900/5'
          : 'border-white/10 shadow-black/60'
      }`}>
        {/* Authentic Photograph of Tirumala Sri Venkateswara Swamy Temple */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/tirumala-temple-hero.jpg"
            alt="Sri Venkateswara Swamy Temple at Tirumala, Ananda Nilayam"
            className="w-full h-full object-cover object-[center_30%] sm:object-[center_26%] transform scale-102 transition-transform duration-700"
            loading="eager"
          />
          {/* Refined gradual gradient overlay: stronger behind text on left, lighter toward right */}
          <div
            className={`absolute inset-0 transition-colors ${
              isLight
                ? 'bg-gradient-to-r from-[#FFFDF9]/96 via-[#FAF6EE]/88 via-35% sm:via-48% sm:via-[#FAF6EE]/80 to-[#FAF6EE]/30 sm:to-[#FAF6EE]/15'
                : 'bg-gradient-to-r from-[#0B0E14]/95 via-[#0E121B]/86 via-35% sm:via-48% sm:via-[#0E121B]/78 to-[#0B0E14]/35 sm:to-[#0B0E14]/15'
            }`}
          />
          {/* Subtle antique-gold ambient warmth on the right */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isLight
                ? 'bg-gradient-to-tr from-transparent via-amber-50/10 to-amber-100/20'
                : 'bg-gradient-to-tr from-transparent via-amber-500/5 to-amber-400/10'
            }`}
          />
        </div>

        {/* Ambient Warm Accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 dark:bg-amber-400/10 pointer-events-none rounded-full blur-3xl -mt-24" />

        <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-14 max-w-4xl">
          {/* Eyebrow */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 border transition-colors ${
            isLight
              ? 'bg-[#7A1C1C]/10 border-[#7A1C1C]/25 text-[#7A1C1C]'
              : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{isTe ? 'ది తిరుమల వర్స్ · దర్శన సమగ్ర గైడ్' : 'THE TIRUMALA VERSE · DARSHAN GUIDE'}</span>
          </div>

          {/* Main Editorial Heading */}
          <h1 className={`font-serif text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {isTe ? 'శ్రీవారి దర్శన సమగ్ర మార్గదర్శిని' : 'Your Guide to Srivari Darshan'}
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-2xl ${
            isLight ? 'text-slate-700' : 'text-slate-200'
          }`}>
            {isTe
              ? 'తిరుమల శ్రీ వేంకటేశ్వర స్వామివారి దివ్య దర్శనానికి సంబంధించిన 20 పవిత్ర మార్గాలు — ముందస్తు ఆన్‌లైన్ కోటాలు, ప్రత్యక్ష టోకెన్లు, కాలినడక ప్రవేశం, రిపోర్టింగ్ కేంద్రాలు మరియు అర్హత నిబంధనలను సులభంగా అర్థం చేసుకోండి.'
              : 'An independent, verified pilgrimage reference to help devotees navigate all 20 Darshan pathways at Tirumala — covering online quotas, free offline tokens, reporting gates, and eligibility rules.'}
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mb-6">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isTe
                  ? 'దర్శనం పేరు, టోకెన్ లేదా సేవలను వెతకండి (ఉదా: 300, senior, infant, ssd)...'
                  : 'Search Darshan types, tokens or sevas (e.g. ₹300, SSD, infant, senior, seva)...'
              }
              className={`w-full pl-12 pr-10 py-3.5 rounded-2xl text-sm transition-all outline-none border shadow-sm ${
                isLight
                  ? 'bg-white/95 border-stone-300 text-slate-900 placeholder-slate-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20'
                  : 'bg-[#10141D]/90 border-white/15 text-white placeholder-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-xs transition-colors ${
                  isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-500 hover:text-white hover:bg-white/10'
                }`}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Links & Disclaimer Notice */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://ttdevasthanams.ap.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 shadow-md transition-all duration-200"
            >
              <span>{isTe ? 'అధికారిక టీటీడీ పోర్టల్' : 'Official TTD Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="#pathways-browse"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
                isLight
                  ? 'bg-white/90 border-stone-300 text-slate-800 hover:border-amber-600 hover:text-amber-900'
                  : 'bg-white/10 border-white/15 text-slate-200 hover:bg-white/20 hover:border-amber-400/60 hover:text-amber-300'
              }`}
            >
              <span>{isTe ? 'అన్ని మార్గాలు చూడండి' : 'Browse All Pathways'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Independent Guide Disclaimer */}
          <div className={`mt-6 pt-3.5 border-t flex items-center gap-2 text-xs rounded-xl ${
            isLight ? 'border-amber-200/60 text-slate-700 bg-white/50 sm:bg-transparent px-2.5 sm:px-0 py-1.5 sm:py-0' : 'border-white/10 text-slate-300 bg-black/40 sm:bg-transparent px-2.5 sm:px-0 py-1.5 sm:py-0'
          }`}>
            <Info className="w-3.5 h-3.5 shrink-0 text-amber-700 dark:text-amber-400" />
            <span>
              {isTe
                ? 'స్వతంత్ర సమాచార గైడ్ · టికెట్ల విక్రయం మరియు కోటాలు టీటీడీ అధికారిక పోర్టల్ (ttdevasthanams.ap.gov.in) ద్వారా మాత్రమే నిర్వహించబడతాయి.'
                : 'Independent pilgrimage information portal · Not an official TTD booking agent · Directing devotees to official TTD booking channels.'}
            </span>
          </div>
        </div>

        {/* Verified Image Attribution Pill */}
        <div className="absolute bottom-3 right-4 z-10 hidden sm:block">
          <span className={`text-[10px] px-2.5 py-1 rounded-full backdrop-blur-sm border ${
            isLight
              ? 'bg-white/80 border-stone-300/80 text-slate-600'
              : 'bg-black/60 border-white/10 text-slate-400'
          }`}>
            {isTe ? 'చిత్రం: తిరుమల శ్రీ వేంకటేశ్వర స్వామి దేవాలయం (ఆనంద నిలయం)' : 'Photo: Sri Venkateswara Temple, Tirumala (CC BY-SA 3.0 via Wikimedia)'}
          </span>
        </div>
      </header>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. QUICK-ACCESS DARSHAN OPTIONS (FIRST VIEWPORT PRIORITY)    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section aria-label="Quick-access high-priority darshans" className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              isLight ? 'text-[#7A1C1C]' : 'text-amber-400'
            }`}>
              {isTe ? 'అత్యంత ప్రజాదరణ పొందిన మార్గాలు' : 'Most Common Pathways'}
            </div>
            <h2 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isTe ? 'శ్రీవారి దర్శన ప్రాథమిక ఎంపికలు' : 'Quick-Access Darshan Options'}
            </h2>
          </div>
          <p className={`text-xs max-w-md ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {isTe
              ? 'మీ ప్రయాణ ప్రణాళిక ఆధారంగా ఎక్కువగా ఉపయోగించే 4 ప్రధాన దర్శన విధానాలు.'
              : 'The four most common ways pilgrims experience Srivari Darshan.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* 1. Sarva Darshanam */}
          <div className={`rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group ${
            isLight
              ? 'bg-white border-stone-200/90 hover:border-emerald-500/60 shadow-sm hover:shadow-md'
              : 'bg-[#121622] border-white/10 hover:border-emerald-500/40 shadow-sm'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                  isLight ? 'bg-emerald-100 text-emerald-900' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {isTe ? 'ఉచిత వాకిన్' : 'Free Walk-in'}
                </span>
                <span className={`text-xs font-bold font-mono ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                  {isTe ? 'ఉచితం' : 'Free'}
                </span>
              </div>

              <h3 className={`font-serif text-base font-bold mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isTe ? 'సర్వ దర్శనం' : 'Sarva Darshanam'}
              </h3>

              <p className={`text-xs leading-relaxed mb-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {isTe
                  ? 'ముందస్తు టికెట్ అవసరం లేదు. క్యూ కంపార్ట్‌మెంట్లు VQC-2 లో ప్రారంభమవుతాయి; రద్దీ ఎక్కువగా ఉన్నప్పుడు కృష్ణతేజ సర్కిల్ దాటి విస్తరిస్తుంది. ముఖ గుర్తింపు నమోదు ద్వారా 1 ఉచిత లడ్డూ QR టోకెన్ లభిస్తుంది.'
                  : 'General walk-in line without advance ticket. Queue compartments begin at VQC-2; extends outside towards Krishna Teja circle during heavy rush. Biometric facial scan provides 1 free Laddu QR token.'}
              </p>

              <div className={`space-y-1.5 text-[11px] pt-3 border-t mb-4 ${
                isLight ? 'border-stone-100 text-slate-600' : 'border-white/5 text-slate-400'
              }`}>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="truncate">{isTe ? 'ప్రవేశం: 4వ ద్వారం (జయ విజయ)' : 'Entry: 4th Door (Jaya Vijaya)'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{isTe ? 'సమయం: డిజిటల్ బోర్డులలో ప్రత్యక్షం' : 'Wait: Live on digital boards (8–24+ hrs)'}</span>
                </div>
              </div>
            </div>

            <a
              href="/darshan/sarva-darshanam"
              onClick={(e) => handleInternalNavigate('/darshan/sarva-darshanam', e)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border ${
                isLight
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500 hover:text-black'
              }`}
            >
              <span>{isTe ? 'పూర్తి గైడ్ చూడండి' : 'View Sarva Darshanam'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* 2. Special Entry Darshan ₹300 */}
          <div className={`rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group ${
            isLight
              ? 'bg-white border-stone-200/90 hover:border-amber-500/60 shadow-sm hover:shadow-md'
              : 'bg-[#121622] border-white/10 hover:border-amber-500/40 shadow-sm'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                  isLight ? 'bg-amber-100 text-amber-950' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {isTe ? 'ఆన్‌లైన్ స్లాట్' : 'Online Slot'}
                </span>
                <span className={`text-xs font-bold font-mono ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                  ₹300
                </span>
              </div>

              <h3 className={`font-serif text-base font-bold mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isTe ? 'ప్రత్యేక ప్రవేశ దర్శనం (₹300)' : 'Special Entry Darshan (₹300)'}
              </h3>

              <p className={`text-xs leading-relaxed mb-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {isTe
                  ? 'ముందస్తు ఆన్‌లైన్ రిజర్వేషన్ ద్వారా నిర్దేశిత సమయానికి హాజరై 2 నుండి 3 గంటల్లో దర్శనం చేసుకోవచ్చు. 1 ఉచిత లడ్డూ ప్రసాదం టికెట్‌పై లభిస్తుంది. కోటా ప్రతినెలా టీటీడీ పోర్టల్‌లో విడుదలవుతుంది.'
                  : 'Advance scheduled slot booked online on the official TTD portal. Devotees report at ATC Circle at their exact slot; includes 1 complimentary Laddu; typical duration 2 to 3 hours.'}
              </p>

              <div className={`space-y-1.5 text-[11px] pt-3 border-t mb-4 ${
                isLight ? 'border-stone-100 text-slate-600' : 'border-white/5 text-slate-400'
              }`}>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span className="truncate">{isTe ? 'గేట్: ATC సర్కిల్ కార్ పార్కింగ్' : 'Gate: ATC Circle Car Parking'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span>{isTe ? 'సగటు సమయం: 2 - 3 గంటలు' : 'Typical Wait: 2 - 3 Hours'}</span>
                </div>
              </div>
            </div>

            <a
              href="/darshan/special-entry-darshan"
              onClick={(e) => handleInternalNavigate('/darshan/special-entry-darshan', e)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border ${
                isLight
                  ? 'bg-amber-50 text-amber-950 border-amber-200 hover:bg-amber-600 hover:text-white hover:border-amber-600'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500 hover:text-black'
              }`}
            >
              <span>{isTe ? 'పూర్తి గైడ్ చూడండి' : 'View ₹300 Guide'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* 3. SSD Tokens */}
          <div className={`rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group ${
            isLight
              ? 'bg-white border-stone-200/90 hover:border-blue-500/60 shadow-sm hover:shadow-md'
              : 'bg-[#121622] border-white/10 hover:border-blue-500/40 shadow-sm'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                  isLight ? 'bg-blue-100 text-blue-900' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {isTe ? 'ఆఫ్‌లైన్ టోకెన్' : 'Offline Token'}
                </span>
                <span className={`text-xs font-bold font-mono ${isLight ? 'text-blue-800' : 'text-blue-400'}`}>
                  {isTe ? 'ఉచితం' : 'Free'}
                </span>
              </div>

              <h3 className={`font-serif text-base font-bold mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isTe ? 'SSD టోకెన్లు (స్లాటెడ్ సర్వదర్శనం)' : 'SSD Tokens (Slotted Sarva Darshan)'}
              </h3>

              <p className={`text-xs leading-relaxed mb-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {isTe
                  ? 'తిరుపతిలోని కౌంటర్లలో (శ్రీనివాసం, విష్ణు నివాసం, భూదేవి కాంప్లెక్స్) రోజూ తెల్లవారుజామున ఉచిత భౌతిక స్లాట్ టోకెన్లు జారీ చేస్తారు. టోకెన్ సమయానికి తిరుమలలో ATGH సర్కిల్ వద్ద రిపోర్ట్ చేయాలి.'
                  : 'Free physical slotted tokens issued daily at Tirupati counters (Srinivasam, Vishnu Nivasam, Bhudevi Complex) with Aadhaar. Devotees report at ATGH Circle in Tirumala at their allotted slot.'}
              </p>

              <div className={`space-y-1.5 text-[11px] pt-3 border-t mb-4 ${
                isLight ? 'border-stone-100 text-slate-600' : 'border-white/5 text-slate-400'
              }`}>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span className="truncate">{isTe ? 'రిపోర్టింగ్: ATGH సర్కిల్, తిరుమల' : 'Reporting: ATGH Circle, Tirumala'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>{isTe ? 'కౌంటర్లు: తెల్లవారుజామున తిరుపతిలో' : 'Counters: Early morning in Tirupati'}</span>
                </div>
              </div>
            </div>

            <a
              href="/darshan/ssd-tokens"
              onClick={(e) => handleInternalNavigate('/darshan/ssd-tokens', e)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border ${
                isLight
                  ? 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                  : 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500 hover:text-black'
              }`}
            >
              <span>{isTe ? 'పూర్తి గైడ్ చూడండి' : 'View SSD Guide'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* 4. Divya Darshan */}
          <div className={`rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group ${
            isLight
              ? 'bg-white border-stone-200/90 hover:border-purple-500/60 shadow-sm hover:shadow-md'
              : 'bg-[#121622] border-white/10 hover:border-purple-500/40 shadow-sm'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                  isLight ? 'bg-purple-100 text-purple-900' : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {isTe ? 'కాలినడక టోకెన్' : 'Footpath Token'}
                </span>
                <span className={`text-xs font-bold font-mono ${isLight ? 'text-purple-800' : 'text-purple-400'}`}>
                  {isTe ? 'ఉచితం' : 'Free'}
                </span>
              </div>

              <h3 className={`font-serif text-base font-bold mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isTe ? 'దివ్య దర్శనం (DD)' : 'Divya Darshan (DD)'}
              </h3>

              <p className={`text-xs leading-relaxed mb-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {isTe
                  ? 'అలిపిరి (గాలిగోపురం వద్ద) లేదా శ్రీవారి మెట్టు (1200వ మెట్టు వద్ద) కాలినడకన వచ్చే భక్తులకు బయోమెట్రిక్ టోకెన్లు ఇస్తారు. తిరుమలలో ATGH సర్కిల్ వద్ద రిపోర్ట్ చేయాలి.'
                  : 'Special quota for pedestrian devotees trekking Alipiri (near Gali Gopuram) or Srivari Mettu (near 1200th step). Tokens require biometric check on the path; report at ATGH Circle in Tirumala.'}
              </p>

              <div className={`space-y-1.5 text-[11px] pt-3 border-t mb-4 ${
                isLight ? 'border-stone-100 text-slate-600' : 'border-white/5 text-slate-400'
              }`}>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-purple-600 dark:text-purple-400" />
                  <span className="truncate">{isTe ? 'రిపోర్టింగ్: ATGH సర్కిల్, తిరుమల' : 'Reporting: ATGH Circle, Tirumala'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 shrink-0 text-purple-600 dark:text-purple-400" />
                  <span>{isTe ? 'మార్గాలు: అలిపిరి & శ్రీవారి మెట్టు' : 'Routes: Alipiri & Srivari Mettu'}</span>
                </div>
              </div>
            </div>

            <a
              href="/darshan/divya-darshan"
              onClick={(e) => handleInternalNavigate('/darshan/divya-darshan', e)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border ${
                isLight
                  ? 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  : 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500 hover:text-black'
              }`}
            >
              <span>{isTe ? 'పూర్తి గైడ్ చూడండి' : 'View DD Guide'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. AUDITED QUOTA RELEASE UPDATES AGAINST OFFICIAL ANNOUNCEMENTS */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section aria-label="Darshan quota release updates" className="mb-14">
        <div className={`rounded-3xl p-6 sm:p-8 border transition-all ${
          isLight
            ? 'bg-gradient-to-r from-stone-50 via-white to-amber-50/40 border-stone-200 shadow-sm'
            : 'bg-gradient-to-r from-[#121622] via-[#10141E] to-[#161B26] border-white/10 shadow-md'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1 ${
                isLight ? 'text-[#7A1C1C]' : 'text-amber-400'
              }`}>
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{isTe ? 'అధికారిక షెడ్యూల్ ఆడిట్' : 'Official Quota Release Audit'}</span>
              </div>
              <h2 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isTe ? 'దర్శన కోటా విడుదల షెడ్యూల్ & ధృవీకరణ' : 'Darshan Quota Releases & Schedule'}
              </h2>
              <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {isTe
                  ? 'ప్రతి కోటా తేదీ టీటీడీ అధికారిక పత్రికా ప్రకటనల ఆధారంగా ధృవీకరించబడింది. అంచనాల ఆధారంగా తేదీలు ఇవ్వబడవు.'
                  : 'Every release is audited directly against official TTD press announcements. Unverified dates are explicitly marked as not announced.'}
              </p>
            </div>

            <a
              href="https://ttdevasthanams.ap.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors border shrink-0 ${
                isLight
                  ? 'bg-amber-100/90 text-amber-950 border-amber-300 hover:bg-amber-200'
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
              }`}
            >
              <span>{isTe ? 'టీటీడీ బుకింగ్ పోర్టల్' : 'Official TTD Booking Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            {VERIFIED_QUOTA_ANNOUNCEMENTS.map((item) => (
              <div
                key={item.slug}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isLight
                    ? 'bg-white border-stone-200/90 hover:border-amber-400/80 shadow-xs'
                    : 'bg-[#151A25] border-white/10 hover:border-amber-400/40 shadow-xs'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      isLight ? 'bg-amber-100 text-amber-950' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {isTe ? item.badgeTe : item.badgeEn}
                    </span>
                    <span className={`text-[11px] font-mono font-bold ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {item.cost}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-serif font-bold text-sm mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {isTe ? item.titleTe : item.titleEn}
                  </h3>

                  {/* Structured Verification Fields */}
                  <div className={`text-xs space-y-1.5 mb-3 p-2.5 rounded-lg border ${
                    isLight ? 'bg-stone-50/80 border-stone-200 text-slate-700' : 'bg-black/30 border-white/5 text-slate-300'
                  }`}>
                    {/* Applicable Month */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">{isTe ? 'కోటా వర్తించే నెల:' : 'Applicable Quota:'}</span>
                      <span className="font-bold text-amber-800 dark:text-amber-400">
                        {isTe ? item.applicableMonthTe : item.applicableMonthEn}
                      </span>
                    </div>

                    {/* Announcement Date */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">{isTe ? 'టీటీడీ ప్రకటించిన తేదీ:' : 'Announced On:'}</span>
                      <span className="font-medium">
                        {isTe ? item.announcementDateTe : item.announcementDateEn}
                      </span>
                    </div>

                    {/* Booking Release Date & Time */}
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-dashed border-stone-200 dark:border-white/10">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">{isTe ? 'బుకింగ్ విడుదల:' : 'Booking Opens:'}</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        {isTe ? item.bookingReleaseTe : item.bookingReleaseEn}
                      </span>
                    </div>
                  </div>

                  <p className={`text-[11px] leading-relaxed mb-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {isTe ? item.notesTe : item.notesEn}
                  </p>
                </div>

                <div className={`pt-2 border-t flex items-center justify-between text-xs font-bold ${
                  isLight ? 'border-stone-100' : 'border-white/5'
                }`}>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {isTe ? 'మూలం: టీటీడీ అధికారికం' : 'Verified Official'}
                  </span>
                  <a
                    href={`/darshan/${item.slug}`}
                    onClick={(e) => handleInternalNavigate(`/darshan/${item.slug}`, e)}
                    className={`inline-flex items-center gap-1 ${
                      isLight ? 'text-amber-800 hover:text-amber-950' : 'text-amber-400 hover:text-amber-300'
                    }`}
                  >
                    <span>{isTe ? 'నిబంధనలు & మార్గదర్శకాలు' : 'Rules & Guide'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}

            {/* UNANNOUNCED FUTURE QUOTAS CARD */}
            <div className={`p-4 rounded-xl border border-dashed transition-all flex flex-col justify-between ${
              isLight
                ? 'bg-stone-50/60 border-stone-300 text-slate-700'
                : 'bg-[#151A25]/60 border-white/20 text-slate-300'
            }`}>
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    isLight ? 'bg-slate-200 text-slate-800' : 'bg-white/10 text-slate-300'
                  }`}>
                    {isTe ? 'భవిష్యత్ కోటాలు' : 'Future Quotas'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {isTe ? 'షెడ్యూల్ కాలేదు' : 'Pending'}
                  </span>
                </div>

                <h3 className={`font-serif font-bold text-sm mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {isTe ? 'ఫిబ్రవరి 2027 మరియు తర్వాతి కోటాలు' : 'February 2027 & Subsequent Quotas'}
                </h3>

                <div className={`text-xs p-2.5 rounded-lg border mb-3 ${
                  isLight ? 'bg-white border-stone-200' : 'bg-black/30 border-white/5'
                }`}>
                  <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-[11px] mb-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{isTe ? 'అధికారికంగా ప్రకటించబడలేదు' : 'Not officially announced'}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isTe
                      ? 'ఫిబ్రవరి 2027 దర్శన టికెట్లకు సంబంధించిన విడుదల తేదీలను టీటీడీ ఇంకా ప్రకటించలేదు. నవంబర్ 3వ/4వ వారంలో అధికారిక పోర్టల్‌లో ప్రకటన విడుదలయ్యే అవకాశం ఉంది.'
                      : 'TTD has not officially announced booking release dates for February 2027. Schedules are typically released 3 to 4 weeks prior on ttdevasthanams.ap.gov.in.'}
                  </p>
                </div>
              </div>

              <div className={`pt-2 border-t flex items-center justify-between text-xs font-bold ${
                isLight ? 'border-stone-200' : 'border-white/10'
              }`}>
                <a
                  href="https://ttdevasthanams.ap.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 ${
                    isLight ? 'text-amber-800 hover:underline' : 'text-amber-400 hover:underline'
                  }`}
                >
                  <span>{isTe ? 'టీటీడీ నోటిఫికేషన్లు చూడండి' : 'Check TTD Portal'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Operational Clarification Note */}
          <div className={`p-3.5 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
            isLight ? 'bg-stone-100/80 text-slate-700' : 'bg-black/30 text-slate-400'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>{isTe ? 'ఆఫ్‌లైన్ కౌంటర్లు & వాకిన్ ప్రక్రియ:' : 'Daily Offline Counters Note:'}</strong>{' '}
                {isTe
                  ? 'ఉచిత SSD టోకెన్లు (తిరుపతి కౌంటర్లు), దివ్యదర్శనం (కాలినడక మార్గాలు) మరియు సర్వదర్శనం వాకిన్ రోజువారీ భౌతిక కౌంటర్ల ద్వారా నడుస్తాయి, ఆన్‌లైన్ కోటా ద్వారా కాదు.'
                  : 'Free SSD Tokens (Tirupati counters), Divya Darshan (footpaths), and Sarva Darshanam walk-in are issued via daily physical counters, not monthly internet releases.'}
              </span>
            </div>
            <span className="text-[11px] italic shrink-0">
              {isTe ? 'అధికారిక టీటీడీ ప్రెస్ రిలీజ్ ఆధారంగా' : 'Directly audited from official TTD press releases'}
            </span>
          </div>
        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. STRUCTURED CATEGORY EXPLORATION & DIRECTORY               */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section id="pathways-browse" aria-label="Browse all 20 darshan pathways" className="mb-14">
        
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              isLight ? 'text-[#7A1C1C]' : 'text-amber-400'
            }`}>
              {isTe ? 'పూర్తి దర్శన విభాగాలు (20 మార్గాలు)' : 'Complete Directory (All 20 Pathways)'}
            </div>
            <h2 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isTe ? 'మీకు సరిపోయే దర్శనాన్ని ఎంచుకోండి' : 'Find the Right Darshan for You'}
            </h2>
          </div>

          {/* View Mode Toggle */}
          <div className={`inline-flex items-center p-1 rounded-xl border shrink-0 ${
            isLight ? 'bg-stone-100 border-stone-300' : 'bg-[#121622] border-white/10'
          }`}>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? (isLight ? 'bg-white text-slate-900 shadow-sm' : 'bg-white/15 text-white shadow-sm')
                  : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white')
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{isTe ? 'కార్డుల వీక్షణ' : 'Editorial Cards'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? (isLight ? 'bg-white text-slate-900 shadow-sm' : 'bg-white/15 text-white shadow-sm')
                  : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white')
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{isTe ? 'పోలిక పట్టిక' : 'Comparison Table'}</span>
            </button>
          </div>
        </div>

        {/* Clean Wrap Category Filter Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => handleSelectCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              selectedCategory === 'all'
                ? (isLight ? 'bg-[#7A1C1C] text-white border-[#7A1C1C] shadow-sm' : 'bg-amber-500 text-black border-amber-500 font-extrabold shadow-sm')
                : (isLight ? 'bg-white text-slate-700 border-stone-300 hover:border-amber-600' : 'bg-[#121622] text-slate-300 border-white/10 hover:border-white/30')
            }`}
          >
            {isTe ? 'అన్ని మార్గాలు (20)' : 'All Pathways (20)'}
          </button>

          {DARSHAN_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? (isLight ? 'bg-[#7A1C1C] text-white border-[#7A1C1C] shadow-sm' : 'bg-amber-500 text-black border-amber-500 font-extrabold shadow-sm')
                  : (isLight ? 'bg-white text-slate-700 border-stone-300 hover:border-amber-600' : 'bg-[#121622] text-slate-300 border-white/10 hover:border-white/30')
              }`}
            >
              {isTe ? cat.labelTe : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Active Search & Filter Indicator */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className={`p-3 rounded-xl mb-6 flex items-center justify-between text-xs border ${
            isLight ? 'bg-amber-50/70 border-amber-200 text-slate-800' : 'bg-white/5 border-white/10 text-slate-300'
          }`}>
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>
                {isTe ? 'ఫలితాలు:' : 'Showing'}{' '}
                <strong>{filteredTopics.length}</strong>{' '}
                {isTe ? 'దర్శన మార్గాలు కనుగొనబడ్డాయి' : 'matching Darshan pathways'}
                {searchQuery && <span> {isTe ? 'పదం కొరకు:' : 'for'} &ldquo;{searchQuery}&rdquo;</span>}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                handleSelectCategory('all');
              }}
              className="font-bold underline hover:no-underline text-amber-800 dark:text-amber-400 cursor-pointer text-xs"
            >
              {isTe ? 'అన్నింటినీ రీసెట్ చేయండి' : 'Reset Filters'}
            </button>
          </div>
        )}

        {/* VIEW MODE 1: EDITORIAL CARDS (Structured Groupings or Filtered Grid) */}
        {viewMode === 'grid' && (
          <div>
            {/* If NO active search and 'all' is selected: Render the 6 editorial groups */}
            {!searchQuery.trim() && selectedCategory === 'all' ? (
              <div className="space-y-12">
                {EDITORIAL_GROUPS.map((group) => {
                  const groupTopics = group.slugs
                    .map(slug => DARSHAN_TOPICS[slug])
                    .filter(Boolean);

                  return (
                    <div key={group.id} className="space-y-4">
                      {/* Group Header */}
                      <div className={`pb-3 border-b flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 ${
                        isLight ? 'border-stone-200' : 'border-white/10'
                      }`}>
                        <div>
                          <h3 className={`font-serif text-lg sm:text-xl font-bold ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}>
                            {isTe ? group.labelTe : group.labelEn}
                          </h3>
                          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {isTe ? group.descTe : group.descEn}
                          </p>
                        </div>
                        <span className={`text-[11px] font-semibold shrink-0 ${
                          isLight ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          {groupTopics.length} {isTe ? 'మార్గాలు' : 'pathways'}
                        </span>
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {groupTopics.map((topic) => (
                          <div
                            key={topic.slug}
                            className={`rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group ${
                              isLight
                                ? 'bg-white border-stone-200/90 hover:border-amber-500/70 shadow-xs hover:shadow-md'
                                : 'bg-[#121622] border-white/10 hover:border-amber-400/50 shadow-xs'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2.5">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                                  isLight ? 'bg-stone-100 text-stone-800' : 'bg-white/10 text-slate-300'
                                }`}>
                                  {isTe ? topic.badgeTe : topic.badgeEn}
                                </span>
                                <span className={`text-[11px] font-mono font-bold ${
                                  isLight ? 'text-amber-800' : 'text-amber-400'
                                }`}>
                                  {topic.cost.split('|')[0]}
                                </span>
                              </div>

                              <h4 className={`font-serif text-base font-bold leading-snug mb-2 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors ${
                                isLight ? 'text-slate-900' : 'text-white'
                              }`}>
                                {isTe ? topic.titleTe : topic.titleEn}
                              </h4>

                              <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
                                isLight ? 'text-slate-600' : 'text-slate-400'
                              }`}>
                                {isTe ? topic.subtitleTe : topic.subtitleEn}
                              </p>

                              <div className={`space-y-1 text-[11px] pt-3 border-t mb-4 ${
                                isLight ? 'border-stone-100 text-slate-600' : 'border-white/5 text-slate-400'
                              }`}>
                                <div className="flex items-center gap-1.5 truncate">
                                  <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-700 dark:text-amber-400" />
                                  <span className="truncate">{isTe ? topic.reportingPointTe.split('➔')[0] : topic.reportingPointEn.split('➔')[0]}</span>
                                </div>
                                <div className="flex items-center gap-1.5 truncate">
                                  <Clock className="w-3.5 h-3.5 shrink-0 text-amber-700 dark:text-amber-400" />
                                  <span className="truncate">{topic.avgWaitTime.split('|')[0]}</span>
                                </div>
                              </div>
                            </div>

                            <a
                              href={`/darshan/${topic.slug}`}
                              onClick={(e) => handleInternalNavigate(`/darshan/${topic.slug}`, e)}
                              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
                                isLight
                                  ? 'bg-stone-50 border-stone-200 text-slate-800 group-hover:bg-[#7A1C1C] group-hover:border-[#7A1C1C] group-hover:text-white'
                                  : 'bg-white/5 border-white/10 text-slate-200 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-black'
                              }`}
                            >
                              <span>{isTe ? 'పూర్తి గైడ్ చూడండి' : 'View Guide'}</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* When filtered by Category or Search: Flat Grid of Matching Cards */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.slug}
                    className={`rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group ${
                      isLight
                        ? 'bg-white border-stone-200/90 hover:border-amber-500/70 shadow-xs hover:shadow-md'
                        : 'bg-[#121622] border-white/10 hover:border-amber-400/50 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                          isLight ? 'bg-stone-100 text-stone-800' : 'bg-white/10 text-slate-300'
                        }`}>
                          {isTe ? topic.badgeTe : topic.badgeEn}
                        </span>
                        <span className={`text-[11px] font-mono font-bold ${
                          isLight ? 'text-amber-800' : 'text-amber-400'
                        }`}>
                          {topic.cost.split('|')[0]}
                        </span>
                      </div>

                      <h4 className={`font-serif text-base font-bold leading-snug mb-2 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        {isTe ? topic.titleTe : topic.titleEn}
                      </h4>

                      <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
                        isLight ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {isTe ? topic.subtitleTe : topic.subtitleEn}
                      </p>

                      <div className={`space-y-1 text-[11px] pt-3 border-t mb-4 ${
                        isLight ? 'border-stone-100 text-slate-600' : 'border-white/5 text-slate-400'
                      }`}>
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-700 dark:text-amber-400" />
                          <span className="truncate">{isTe ? topic.reportingPointTe.split('➔')[0] : topic.reportingPointEn.split('➔')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Clock className="w-3.5 h-3.5 shrink-0 text-amber-700 dark:text-amber-400" />
                          <span className="truncate">{topic.avgWaitTime.split('|')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`/darshan/${topic.slug}`}
                      onClick={(e) => handleInternalNavigate(`/darshan/${topic.slug}`, e)}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
                        isLight
                          ? 'bg-stone-50 border-stone-200 text-slate-800 group-hover:bg-[#7A1C1C] group-hover:border-[#7A1C1C] group-hover:text-white'
                          : 'bg-white/5 border-white/10 text-slate-200 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-black'
                      }`}
                    >
                      <span>{isTe ? 'పూర్తి గైడ్ చూడండి' : 'View Guide'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW MODE 2: SECONDARY COMPARISON TABLE */}
        {viewMode === 'table' && (
          <div className={`rounded-2xl border shadow-md overflow-hidden ${
            isLight ? 'bg-white border-stone-200' : 'bg-[#121622] border-white/10'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[760px]">
                <thead>
                  <tr className={`border-b ${
                    isLight ? 'bg-stone-100/80 border-stone-200 text-slate-800' : 'bg-black/40 border-white/10 text-white'
                  }`}>
                    <th className="p-3.5 font-serif font-bold">{isTe ? 'దర్శన మార్గం' : 'Pathway'}</th>
                    <th className="p-3.5 font-serif font-bold">{isTe ? 'రుసుము' : 'Cost'}</th>
                    <th className="p-3.5 font-serif font-bold">{isTe ? 'బుకింగ్ విధానం' : 'Booking Channel'}</th>
                    <th className="p-3.5 font-serif font-bold">{isTe ? 'రిపోర్టింగ్ కేంద్రం' : 'Reporting Gate'}</th>
                    <th className="p-3.5 font-serif font-bold">{isTe ? 'నిరీక్షణ సమయం' : 'Typical Wait'}</th>
                    <th className="p-3.5 font-serif font-bold text-right">{isTe ? 'చర్య' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isLight ? 'divide-stone-100' : 'divide-white/5'}`}>
                  {filteredTopics.map((topic) => (
                    <tr
                      key={topic.slug}
                      className={`transition-colors ${isLight ? 'hover:bg-amber-50/40' : 'hover:bg-white/5'}`}
                    >
                      <td className="p-3.5 align-middle">
                        <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {isTe ? topic.titleTe : topic.titleEn}
                        </div>
                        <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          {isTe ? topic.badgeTe : topic.badgeEn}
                        </div>
                      </td>
                      <td className={`p-3.5 font-mono font-bold align-middle ${
                        isLight ? 'text-amber-800' : 'text-amber-400'
                      }`}>
                        {topic.cost.split('|')[0]}
                      </td>
                      <td className={`p-3.5 align-middle ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {isTe ? topic.bookingModeTe : topic.bookingModeEn}
                      </td>
                      <td className={`p-3.5 align-middle ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {isTe ? topic.reportingPointTe.split('➔')[0] : topic.reportingPointEn.split('➔')[0]}
                      </td>
                      <td className={`p-3.5 align-middle ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {topic.avgWaitTime.split('|')[0]}
                      </td>
                      <td className="p-3.5 text-right align-middle">
                        <a
                          href={`/darshan/${topic.slug}`}
                          onClick={(e) => handleInternalNavigate(`/darshan/${topic.slug}`, e)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                            isLight
                              ? 'bg-stone-50 border-stone-300 text-slate-800 hover:bg-[#7A1C1C] hover:text-white hover:border-[#7A1C1C]'
                              : 'bg-white/5 border-white/10 text-slate-200 hover:bg-amber-500 hover:text-black hover:border-amber-500'
                          }`}
                        >
                          <span>{isTe ? 'గైడ్' : 'Guide'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredTopics.length === 0 && (
          <div className={`p-12 text-center rounded-2xl border ${
            isLight ? 'bg-white border-stone-200 text-slate-600' : 'bg-[#121622] border-white/10 text-slate-400'
          }`}>
            <AlertCircle className="w-8 h-8 mx-auto mb-3 text-amber-600" />
            <p className="text-base font-bold mb-1">
              {isTe ? 'ఎలాంటి ఫలితాలు లభించలేదు' : 'No matching Darshan pathways found'}
            </p>
            <p className="text-xs mb-4">
              {isTe
                ? 'మీరు వెతికిన పదానికి సరిపోయే దర్శనం కనుగొనబడలేదు. దయచేసి వేరే పదంతో ప్రయత్నించండి.'
                : 'Try adjusting your search query or reset the category filter.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                handleSelectCategory('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors border ${
                isLight ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              {isTe ? 'అన్ని దర్శనాలు చూడండి' : 'Show All Pathways'}
            </button>
          </div>
        )}

      </section>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* 5. PILGRIMAGE ESSENTIALS & DECISION HELPER                   */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section aria-label="Pilgrimage essentials and recommendations" className="mb-10">
        <div className={`rounded-3xl p-6 sm:p-9 border transition-all ${
          isLight
            ? 'bg-gradient-to-br from-white via-amber-50/20 to-stone-50 border-stone-200/90 shadow-sm'
            : 'bg-gradient-to-br from-[#121622] via-[#0E121B] to-[#141824] border-white/10 shadow-md'
        }`}>
          {/* Header */}
          <div className="max-w-2xl mb-8">
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              isLight ? 'text-[#7A1C1C]' : 'text-amber-400'
            }`}>
              {isTe ? 'తీర్థయాత్ర సూచనలు' : 'Pilgrim Essentials'}
            </div>
            <h2 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mb-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isTe ? 'మీ ప్రయాణానికి సరైన దర్శన మార్గం ఏది?' : 'Which Darshan Pathway is Right for You?'}
            </h2>
            <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {isTe
                ? 'భక్తుల పరిస్థితి, ప్రయాణ సమయం మరియు టోకెన్ లభ్యత ఆధారంగా సరైన ఎంపికను ఎంచుకోవడానికి గైడ్.'
                : 'Verified recommendations tailored to your travel timing, family companions, and booking lead time.'}
            </p>
          </div>

          {/* Decision Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            
            {/* Scenario 1 */}
            <div className={`p-4 rounded-2xl border ${
              isLight ? 'bg-white border-stone-200' : 'bg-[#151A25] border-white/10'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className={`font-serif font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {isTe ? '2–3 నెలల ముందు ప్లాన్ చేసుకుంటే' : 'Planning 2–3 Months in Advance?'}
                </h3>
              </div>
              <p className={`text-xs leading-relaxed mb-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {isTe
                  ? 'టీటీడీ పోర్టల్‌లో ప్రతి నెలా విడుదలయ్యే ₹300 ప్రత్యేక ప్రవేశ దర్శనం లేదా కల్యాణోత్సవం వంటి ఆర్జిత సేవా టికెట్లను బుక్ చేసుకోవడం ఉత్తమం.'
                  : 'Book ₹300 Special Entry Darshan or Arjitha Sevas (Kalyanotsavam, Unjal) online when the monthly quota opens on ttdevasthanams.ap.gov.in.'}
              </p>
              <a
                href="/darshan/special-entry-darshan"
                onClick={(e) => handleInternalNavigate('/darshan/special-entry-darshan', e)}
                className={`text-xs font-bold inline-flex items-center gap-1 ${
                  isLight ? 'text-amber-800 hover:text-amber-950' : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                <span>{isTe ? '₹300 గైడ్ చూడండి' : 'Explore ₹300 Option'}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Scenario 2 */}
            <div className={`p-4 rounded-2xl border ${
              isLight ? 'bg-white border-stone-200' : 'bg-[#151A25] border-white/10'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className={`font-serif font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {isTe ? 'టికెట్ లేకుండా నేడు తిరుపతికి వస్తే' : 'Arriving Today Without a Ticket?'}
                </h3>
              </div>
              <p className={`text-xs leading-relaxed mb-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {isTe
                  ? 'శ్రీనివాసం లేదా విష్ణు నివాసంలో ఉచిత SSD టోకెన్ పొందండి. లేదా తిరుమలకు చేరుకుని సర్వదర్శనం క్యూలో చేరండి (బోర్డులలో నిరీక్షణ సమయం గమనించండి).'
                  : 'Collect a free physical SSD Token at Tirupati counters (early morning), or join the continuous Sarva Darshanam walk-in line in Tirumala.'}
              </p>
              <a
                href="/darshan/ssd-tokens"
                onClick={(e) => handleInternalNavigate('/darshan/ssd-tokens', e)}
                className={`text-xs font-bold inline-flex items-center gap-1 ${
                  isLight ? 'text-emerald-800 hover:text-emerald-950' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                <span>{isTe ? 'SSD టోకెన్ వివరాలు' : 'Explore SSD Tokens'}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Scenario 3 */}
            <div className={`p-4 rounded-2xl border ${
              isLight ? 'bg-white border-stone-200' : 'bg-[#151A25] border-white/10'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-purple-500/15 text-purple-700 dark:text-purple-400 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className={`font-serif font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {isTe ? 'వయోవృద్ధులు లేదా పసిబిడ్డలతో ఉంటే' : 'Traveling with Seniors or Infants?'}
                </h3>
              </div>
              <p className={`text-xs leading-relaxed mb-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {isTe
                  ? '65+ ఏళ్ల వృద్ధులు మరియు 1 సంవత్సరం లోపు పసిబిడ్డల తల్లిదండ్రులు సుపథం ప్రవేశ ద్వారం ద్వారా ప్రాధాన్యత దర్శనం పొందవచ్చు.'
                  : 'Senior citizens (65+) and parents with infants under 1 year are admitted via the dedicated Supatham Priority gate with original age proof.'}
              </p>
              <a
                href="/darshan/senior-citizens"
                onClick={(e) => handleInternalNavigate('/darshan/senior-citizens', e)}
                className={`text-xs font-bold inline-flex items-center gap-1 ${
                  isLight ? 'text-purple-800 hover:text-purple-950' : 'text-purple-400 hover:text-purple-300'
                }`}
              >
                <span>{isTe ? 'ప్రాధాన్యతా గైడ్' : 'Explore Priority Entry'}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* 3 Universal Temple Rules */}
          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-amber-50/80 border-amber-200 text-slate-800' : 'bg-black/30 border-white/10 text-slate-200'
          }`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${
              isLight ? 'text-[#7A1C1C]' : 'text-amber-300'
            }`}>
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{isTe ? 'అన్ని దర్శనాలకు తప్పనిసరి 3 నిబంధనలు' : 'Three Universal Rules for All Pilgrims'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>{isTe ? '1. అసలు భౌతిక గుర్తింపు పత్రం:' : '1. Physical Photo ID:'}</strong>{' '}
                  {isTe
                    ? 'ఆధార్ కార్డు లేదా పాస్‌పోర్ట్ తప్పనిసరి (సర్వదర్శనం వాకిన్ వద్ద బయోమెట్రిక్ ముఖ గుర్తింపు నమోదు చేస్తారు).'
                    : 'Original Aadhaar or Passport required for all booked tickets & tokens (walk-in queue uses biometric facial registration).'}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>{isTe ? '2. సాంప్రదాయ వస్త్రధారణ:' : '2. Vedic Dress Code:'}</strong>{' '}
                  {isTe
                    ? 'పురుషులకు ధోతి/కుర్తా, స్త్రీలకు చీర/చుడీదార్ దుపట్టాతో తప్పనిసరి. జీన్స్, టీషర్టులు అనుమతించబడవు.'
                    : 'Men: Dhoti & Kurta/Uttariyam. Women: Saree, Half-Saree or Chudidar with Dupatta. Western casuals prohibited.'}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>{isTe ? '3. సమయపాలన & గేట్ ప్రవేశం:' : '3. Punctual Reporting:'}</strong>{' '}
                  {isTe
                    ? 'స్లాట్ సమయానికి 30 నిమిషాల ముందే నిర్దేశిత గేట్ వద్దకు చేరుకోండి.'
                    : 'Report at your designated reporting gate at least 30 minutes before your booked slot time.'}
                </div>
              </div>
            </div>
          </div>

          {/* Official Helpline Bar */}
          <div className={`mt-6 pt-5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
            isLight ? 'border-stone-200 text-slate-600' : 'border-white/10 text-slate-400'
          }`}>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>
                <strong>{isTe ? 'టీటీడీ అధికారిక 24/7 హెల్ప్‌లైన్:' : 'TTD Official 24/7 Helpline:'}</strong>{' '}
                <a href="tel:08772277777" className="underline font-mono">0877-2277777</a> /{' '}
                <a href="tel:08772233333" className="underline font-mono">0877-2233333</a>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>
                {isTe ? 'అధికారిక వెబ్‌సైట్:' : 'Official Portal:'}{' '}
                <a
                  href="https://ttdevasthanams.ap.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-amber-800 dark:text-amber-300"
                >
                  ttdevasthanams.ap.gov.in
                </a>
              </span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
