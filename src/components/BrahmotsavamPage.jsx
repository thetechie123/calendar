import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Sparkles,
  Flame,
  Scale,
  History,
  Info,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import useTheme from '../hooks/useTheme';
import BrahmotsavamHero from './brahmotsavam/BrahmotsavamHero';
import BrahmotsavamFullSchedule from './brahmotsavam/BrahmotsavamFullSchedule';
import BrahmotsavamTheology from './brahmotsavam/BrahmotsavamTheology';
import BrahmotsavamHistory from './brahmotsavam/BrahmotsavamHistory';

// Auto-selects the schedule tab
function getAutoTab() {
  return 'schedule';
}

export default function BrahmotsavamPage({
  events = [],
  lang = 'en',
  themeMode: propThemeMode,
  onNavigateToCalendarSearch,
  onSelectEvent,
  onNavigatePath
}) {
  const { themeMode: hookThemeMode } = useTheme();
  const themeMode = propThemeMode || hookThemeMode;
  const isLight = themeMode === 'light';
  const isEn = lang === 'en';

  const [activeTab, setActiveTab] = useState(getAutoTab);

  // Auto-scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const tabs = [
    { id: 'schedule', labelEn: '📅 Full Schedule', labelTe: '📅 పూర్తి షెడ్యూల్', icon: Calendar },
    { id: 'why-two', labelEn: '⚡ Why 2 Brahmotsavams?', labelTe: '⚡ ద్వి-బ్రహ్మోత్సవ రహస్యం', icon: Scale },
    { id: 'history', labelEn: '📜 History & Inscriptions', labelTe: '📜 శాసనాలు & చరిత్ర', icon: History },
    { id: 'pilgrims', labelEn: 'ℹ️ Pilgrim Guide', labelTe: 'ℹ️ భక్తుల మార్గదర్శకాలు', icon: Info },
  ];

  const navBg = isLight
    ? 'bg-amber-50/95 backdrop-blur-md border-y border-amber-200'
    : 'bg-[#0B0E14]/90 backdrop-blur-md border-y border-[#D4AF37]/30';

  const tabActive = 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black ring-2 ring-[#FFD700] scale-105 font-black';
  const tabInactiveLight = 'bg-white text-slate-700 border border-slate-300 hover:border-amber-400 hover:text-amber-800';
  const tabInactiveDark = 'bg-[#141923] text-[#CBD5E1] border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5';

  const pageBg = isLight ? 'bg-amber-50/50' : '';
  const divider = isLight ? 'border-amber-200' : 'border-[#D4AF37]/30';
  const cardBg = isLight ? 'bg-white border-slate-200 hover:border-amber-400' : 'bg-[#141923] border-white/10 hover:border-[#FFD700]';
  const cardLabel = isLight ? 'text-amber-700' : 'text-[#FFD700]';
  const cardTitle = isLight ? 'text-slate-800 group-hover:text-amber-700' : 'text-white group-hover:text-[#FFD700]';
  const arrowColor = isLight ? 'text-amber-500' : 'text-[#FFD700]';

  return (
    <div className={`container py-4 sm:py-8 space-y-8 max-w-6xl mx-auto animate-fade-in ${pageBg}`}>

      {/* 1. HERO */}
      <BrahmotsavamHero lang={lang} isLight={isLight} />

      {/* 2. SUBPAGE NAVIGATION */}
      <div className={`sticky top-14 z-30 py-2 -mx-2 px-2 ${navBg}`}>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                  isActive
                    ? tabActive
                    : isLight
                    ? tabInactiveLight
                    : tabInactiveDark
                }`}
              >
                <span>{isEn ? tab.labelEn : tab.labelTe}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE SUBPAGE CONTENT */}
      <div className="min-h-[400px]">
        {activeTab === 'schedule' && (
          <BrahmotsavamFullSchedule
            lang={lang}
            isLight={isLight}
            onNavigateToCalendarSearch={onNavigateToCalendarSearch}
          />
        )}

        {activeTab === 'why-two' && (
          <BrahmotsavamTheology
            lang={lang}
            isLight={isLight}
          />
        )}

        {activeTab === 'history' && (
          <BrahmotsavamHistory
            lang={lang}
            isLight={isLight}
          />
        )}

        {activeTab === 'pilgrims' && (
          <PilgrimGuide lang={lang} isLight={isLight} />
        )}
      </div>

      {/* 4. CROSS-LINKING FOOTER CARDS */}
      <div className={`pt-6 border-t ${divider} grid grid-cols-1 sm:grid-cols-3 gap-4`}>
        {[
          { href: '/calendar', label: isEn ? 'Interactive View' : 'ఇంటరాక్టివ్ వ్యూ', title: isEn ? 'Full 2026–27 Calendar' : '2026–27 క్యాలెండర్', onClick: () => onNavigatePath && onNavigatePath('/calendar') },
          { href: '/festivals/garuda-vahanam', label: isEn ? 'Pinnacle Seva' : 'పరమోత్కృష్ట సేవ', title: isEn ? 'Garuda Vahanam Guide' : 'గరుడ వాహనం దర్శిని', onClick: () => onNavigatePath && onNavigatePath('/festivals/garuda-vahanam') },
          { href: '/glossary', label: isEn ? 'Sacred Terminology' : 'పవిత్ర పదకోశం', title: isEn ? 'Utsavam Glossary' : 'ఉత్సవ నిఘంటువు', onClick: () => onNavigatePath && onNavigatePath('/glossary') }
        ].map(({ href, label, title, onClick }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } }}
            className={`p-4 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${cardBg}`}
          >
            <div>
              <span className={`text-[10px] uppercase font-bold ${cardLabel}`}>{label}</span>
              <h4 className={`text-sm font-bold transition-colors ${cardTitle}`}>{title}</h4>
            </div>
            <ArrowRight className={`w-4 h-4 ${arrowColor} group-hover:translate-x-1 transition-transform`} />
          </a>
        ))}
      </div>
    </div>
  );
}

// ---- Pilgrim Guide Section ----
function PilgrimGuide({ lang, isLight }) {
  const isEn = lang === 'en';
  const textBody = isLight ? 'text-slate-700' : 'text-[#CBD5E1]';
  const textHeading = isLight ? 'text-amber-800' : 'text-[#FFD700]';
  const cardBg = isLight ? 'bg-white border-slate-200 shadow' : 'bg-white/5 border-white/10';
  const divider = isLight ? 'border-amber-200' : 'border-[#D4AF37]/30';

  const guides = [
    {
      titleEn: '🎒 Footpaths & Free Luggage Transport',
      titleTe: '🎒 కాలినడక మార్గాలు & ఉచిత లగేజీ రవాణా',
      bodyEn: 'Start your trek as early as possible in the morning. Pilgrims may deposit luggage at footpath luggage counters in Alipiri or Srivari Mettu and collect it at Tirumala free of cost. Move in groups while on footpaths — do not walk alone in isolated stretches.',
      bodyTe: 'ఉదయమే ప్రయాణం ప్రారంభించడం శ్రేయస్కరం. అలిపిరి, శ్రీవారి మెట్టు కౌంటర్లలో లగేజీ డిపాజిట్ చేసి తిరుమలలో ఉచితంగా పొందవచ్చు. కాలినడక మార్గంలో ఒంటరిగా వెళ్ళకండి, బృందంగా నడవండి.'
    },
    {
      titleEn: '🏥 Medical Facilities Along the Steps',
      titleTe: '🏥 మెట్లపై వైద్య సదుపాయాలు',
      bodyEn: 'Senior citizens and those with heart or respiratory ailments are advised against strenuous hill climbing. Free 24/7 medical aid centers are stationed at Step 1500 and across Tirumala for pilgrim safety.',
      bodyTe: 'వృద్ధులు, అనారోగ్యవంతులు కాలినడకన రావడం కంటే ఘాట్ రోడ్డు ద్వారా రావడం మంచిది. 1500వ మెట్టు వద్ద వైద్య కేంద్రం అందుబాటులో ఉంటుంది.'
    },
    {
      titleEn: '🍛 Free Annaprasadam',
      titleTe: '🍛 ఉచిత అన్నప్రసాదం',
      bodyEn: 'Continuous, hygienic, sanctified meals are served at the Matrusri Tarigonda Vengamamba Annaprasadam Complex. Buttermilk packets are distributed in queue lines. Donate generously to this sacred trust and be blessed.',
      bodyTe: 'మాతృశ్రీ తరిగొండ వెంగమాంబ అన్నప్రసాద భవనంలో నిరంతరం నాణ్యమైన అన్నప్రసాద వితరణ జరుగుతుంది. క్యూ లైన్లలో మజ్జిగ పంపిణీ జరుగుతుంది.'
    },
    {
      titleEn: '🧹 Keep Seshachala Sacred',
      titleTe: '🧹 శేషాచలపు పవిత్రత కాపాడండి',
      bodyEn: "Dispose waste properly in marked bins. Maintain the sanctity of the Seshachala hills. The holiness of the surroundings is an extension of the Lord's presence — your cooperation preserves it for future generations.",
      bodyTe: 'వ్యర్థాలను నిర్దేశిత డస్ట్‌బిన్లలో మాత్రమే వేయండి. శేషాచల పవిత్రతను నిలబెట్టడం మన బాధ్యత. పరిసరాల పరిశుభ్రత స్వామివారికి సేవ.'
    }
  ];

  return (
    <section className="space-y-6">
      <div className={`border-b pb-4 ${divider}`}>
        <h2 className={`font-serif text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'gold-gradient-text'}`}>
          {isEn ? 'Pilgrim Guide for Navarathri Brahmotsavams' : 'నవరాత్రి బ్రహ్మోత్సవాల భక్తుల మార్గదర్శకాలు'}
        </h2>
        <p className={`text-xs sm:text-sm mt-1 font-medium ${isLight ? 'text-slate-600' : 'text-[#94A3B8]'}`}>
          {isEn
            ? 'Practical guidance for a comfortable and spiritually enriching pilgrimage during the 9-day festival.'
            : '9 రోజుల ఉత్సవకాలంలో భక్తి మయమైన మరియు సుఖవంతమైన తీర్థయాత్రకు మార్గదర్శకాలు.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((g, i) => (
          <div key={i} className={`p-5 rounded-2xl border space-y-2 ${cardBg}`}>
            <h3 className={`font-serif text-base font-bold ${textHeading}`}>
              {isEn ? g.titleEn : g.titleTe}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${textBody}`}>
              {isEn ? g.bodyEn : g.bodyTe}
            </p>
          </div>
        ))}
      </div>

      <div className={`p-5 rounded-2xl border ${isLight ? 'bg-amber-50 border-amber-200' : 'bg-[#1A1500]/60 border-[#FFD700]/20'}`}>
        <p className={`text-sm sm:text-base font-medium italic text-center ${isLight ? 'text-amber-900' : 'text-amber-200'}`}>
          {isEn
            ? '"By the grace of the Lord of the Seven Hills, visit the Navarathri Brahmotsavams and receive auspiciousness, health, prosperity and bliss!"'
            : '"సప్తగిరి వాసుని అనుగ్రహంతో నవరాత్రి బ్రహ్మోత్సవాలను దర్శించి శుభం, ఆరోగ్యం, సంపద మరియు ఆనందం పొందుతారు!"'}
        </p>
        <p className={`text-center text-xs font-bold mt-2 ${isLight ? 'text-amber-600' : 'text-[#FFD700]/60'}`}>
          — {isEn ? 'Sapthagiri Magazine, October 2026' : 'సప్తగిరి పత్రిక, అక్టోబర్ 2026'}
        </p>
      </div>
    </section>
  );
}
