import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  DoorClosed,
  ScanFace,
  Tv,
  MapPin
} from 'lucide-react';
import { getDarshanTopic } from '../../data/darshanTopics';
import { isModifiedClick } from '../../utils/navigation';
import useTheme from '../../hooks/useTheme';

import DarshanHero from './DarshanHero';
import DarshanQuickSpecs from './DarshanQuickSpecs';
import DarshanQuotaRelease from './DarshanQuotaRelease';
import DarshanOverview from './DarshanOverview';
import DarshanBookingGuide from './DarshanBookingGuide';
import DarshanEligibility from './DarshanEligibility';
import DarshanInstructions from './DarshanInstructions';
import DarshanFaqAccordion from './DarshanFaqAccordion';
import DarshanRelatedOptions from './DarshanRelatedOptions';
import DarshanSourcesFooter from './DarshanSourcesFooter';

export default function DarshanTopicPage({
  slug,
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
  const topic = getDarshanTopic(slug);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [slug]);

  if (!topic) {
    return (
      <div className={`min-h-[70vh] flex flex-col items-center justify-center p-6 text-center darshan-page ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
        <h2 className={`font-serif text-2xl font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {isTe ? 'దర్శన మార్గం కనుగొనబడలేదు' : 'Darshan Guide Not Found'}
        </h2>
        <p className={`text-sm mb-6 max-w-md ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {isTe
            ? 'మీరు కోరిన దర్శన సమాచారం అందుబాటులో లేదు. దయచేసి ప్రధాన దర్శన డైరెక్టరీని చూడండి.'
            : 'The darshan pathway you requested could not be found. Please browse all available pathways in our master guide.'}
        </p>
        <a
          href="/darshan"
          onClick={(e) => {
            if (!isModifiedClick(e)) {
              e.preventDefault();
              if (navigate) navigate('/darshan');
            }
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-extrabold text-sm flex items-center gap-2 hover:brightness-110 shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isTe ? 'అన్ని దర్శనాలు చూడండి' : 'Browse All Darshan Pathways'}</span>
        </a>
      </div>
    );
  }

  const isSarvaDarshanam = topic.slug === 'sarva-darshanam';

  const handleScrollToBooking = () => {
    if (typeof document !== 'undefined') {
      const el = document.getElementById('how-to-book');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <article className={`darshan-page max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-10 transition-colors animate-fade-in ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
      
      {/* A. FUNCTIONAL BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className={`mb-6 flex items-center gap-2 text-xs flex-wrap ${isLight ? 'text-slate-600' : 'text-[#94A3B8]'}`}>
        <a
          href="/"
          onClick={(e) => {
            if (!isModifiedClick(e)) {
              e.preventDefault();
              if (navigate) navigate('/');
            }
          }}
          className={`transition-colors cursor-pointer ${isLight ? 'hover:text-amber-800' : 'hover:text-[#FFD700]'}`}
        >
          {isTe ? 'హోమ్' : 'Home'}
        </a>

        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

        <a
          href="/darshan"
          onClick={(e) => {
            if (!isModifiedClick(e)) {
              e.preventDefault();
              if (navigate) navigate('/darshan');
            }
          }}
          className={`transition-colors cursor-pointer ${isLight ? 'hover:text-amber-800' : 'hover:text-[#FFD700]'}`}
        >
          {isTe ? 'దర్శనం' : 'Darshan'}
        </a>

        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

        <span className={`font-semibold truncate max-w-[240px] sm:max-w-none ${isLight ? 'text-amber-800' : 'text-[#FFD700]'}`} aria-current="page">
          {isTe ? topic.titleTe : topic.titleEn}
        </span>
      </nav>

      {/* B. HERO SECTION (Actions & Governance hidden for Sarva Darshanam) */}
      <DarshanHero
        topic={topic}
        lang={lang}
        isLight={isLight}
        onScrollToBooking={handleScrollToBooking}
      />

      {/* SARVA DARSHANAM ESSENTIAL HIGHLIGHTS GRID */}
      {isSarvaDarshanam && (
        <section aria-label="Essential Sarva Darshanam Highlights" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* 1. Face Registration & Free Laddu QR Token */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 shadow-md ${
            isLight
              ? 'bg-amber-50/90 border-amber-300 text-slate-800'
              : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
          }`}>
            <ScanFace className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? 'text-amber-800' : 'text-amber-400'}`} />
            <div className="text-xs sm:text-sm leading-relaxed font-medium">
              <strong className={`font-bold block mb-1 ${isLight ? 'text-amber-950' : 'text-amber-300'}`}>
                {isTe ? 'ముఖ నమోదు & ఉచిత లడ్డూ QR టోకెన్:' : 'Facial Registration & Free Laddu QR Token:'}
              </strong>
              <span>
                {isTe
                  ? 'సర్వదర్శనం ద్వారా వెళ్లే ప్రతి భక్తుడి ముఖాన్ని ఫోటో (ఫేషియల్ రికగ్నిషన్) ద్వారా నమోదు చేసి QR కోడ్ ఉన్న టోకెన్ ఇస్తారు. దర్శనం పూర్తయిన తర్వాత ఉచిత శ్రీవారి లడ్డూ ప్రసాదం పొందడానికి ఈ టోకెన్ ఉపయోగపడుతుంది.'
                  : 'For every person going through Sarva Darshanam, their face will be registered and a token with a QR code will be given, which can be used to get a free Srivari Laddu after Darshanam.'}
              </span>
            </div>
          </div>

          {/* 2. Live Waiting Hours on Digital Information Boards */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 shadow-md ${
            isLight
              ? 'bg-blue-50/90 border-blue-300 text-slate-800'
              : 'bg-blue-950/20 border-blue-500/40 text-blue-200'
          }`}>
            <Tv className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? 'text-blue-800' : 'text-blue-400'}`} />
            <div className="text-xs sm:text-sm leading-relaxed font-medium">
              <strong className={`font-bold block mb-1 ${isLight ? 'text-blue-950' : 'text-blue-300'}`}>
                {isTe ? 'డిజిటల్ సమాచార బోర్డులలో నిరీక్షణ సమయం:' : 'Live Wait Times on Information Boards:'}
              </strong>
              <span>
                {isTe
                  ? 'సర్వదర్శనం అంచనా నిరీక్షణ సమయం (ఎన్ని గంటలు పడుతుంది అనే వివరాలు) తిరుమలలోని వివిధ కూడళ్లలో మరియు క్యూ ప్రవేశ మార్గాల్లో ఏర్పాటు చేసిన డిజిటల్ సమాచార బోర్డులలో నిరంతరం ప్రదర్శించబడుతుంది.'
                  : 'Sarva Darshanam estimated waiting hours are continuously displayed on digital electronic information boards placed across Tirumala and near the queue line entry.'}
              </span>
            </div>
          </div>

          {/* 3. Starting Point: Generally Krishna Teja Circle */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 shadow-md ${
            isLight
              ? 'bg-purple-50/90 border-purple-300 text-slate-800'
              : 'bg-purple-950/20 border-purple-500/40 text-purple-200'
          }`}>
            <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? 'text-purple-800' : 'text-purple-400'}`} />
            <div className="text-xs sm:text-sm leading-relaxed font-medium">
              <strong className={`font-bold block mb-1 ${isLight ? 'text-purple-950' : 'text-purple-300'}`}>
                {isTe ? 'క్యూ లైన్ ప్రారంభ స్థలం (రద్దీ ఆధారితం):' : 'Queue Starting Point (Dynamic):'}
              </strong>
              <span>
                {isTe
                  ? 'క్యూ ప్రారంభ స్థలాన్ని ఖచ్చితంగా ముందుగా చెప్పలేము ఎందుకంటే ఇది భక్తుల రద్దీని బట్టి మారుతూ ఉంటుంది, అయితే సాధారణంగా ఇది కృష్ణతేజ సర్కిల్ వద్ద ప్రారంభమవుతుంది.'
                  : 'We truly cannot tell the exact starting point as it shifts dynamically with real-time crowd volume, but it generally starts near Krishna Teja Circle.'}
              </span>
            </div>
          </div>

          {/* 4. 4th Door (Jaya Vijaya) & Line Closure Notice */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 shadow-md ${
            isLight
              ? 'bg-emerald-50/90 border-emerald-300 text-slate-800'
              : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
          }`}>
            <DoorClosed className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`} />
            <div className="text-xs sm:text-sm leading-relaxed font-medium">
              <strong className={`font-bold block mb-1 ${isLight ? 'text-emerald-950' : 'text-emerald-300'}`}>
                {isTe ? '4వ ద్వారం (జయ-విజయ) & లైన్ నిలిపివేత నిబంధన:' : '4th Door View & Line Regulation:'}
              </strong>
              <span>
                {isTe
                  ? 'శ్రీవారి దర్శనం 4వ ద్వారమైన జయ-విజయ ద్వారం గుండా మాత్రమే కలుగుతుంది. రద్దీ విపరీతంగా ఉన్నప్పుడు మాత్రమే సర్వదర్శనం క్యూ లైన్ తాత్కాలికంగా నిలిపివేయబడుతుంది.'
                  : 'Srivari Darshanam is through the 4th door (Jaya Vijaya) only. Sarva Darshanam line can be closed only if there is heavy crowd.'}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* C. ESSENTIAL INFORMATION AT A GLANCE */}
      <DarshanQuickSpecs
        topic={topic}
        lang={lang}
        isLight={isLight}
      />

      {/* F. NEXT QUOTA RELEASE SECTION (Removed for Sarva Darshanam) */}
      {!isSarvaDarshanam && (
        <DarshanQuotaRelease
          topic={topic}
          lang={lang}
          isLight={isLight}
        />
      )}

      {/* D. WHAT IS THIS DARSHAN? (OVERVIEW & COMPARISON) */}
      <DarshanOverview
        topic={topic}
        lang={lang}
        isLight={isLight}
      />

      {/* E. HOW TO BOOK (STEP-BY-STEP PROCEDURE) */}
      <DarshanBookingGuide
        topic={topic}
        lang={lang}
        isLight={isLight}
      />

      {/* G. ELIGIBILITY, ATTENDANTS & DRESS CODE */}
      <DarshanEligibility
        topic={topic}
        lang={lang}
        isLight={isLight}
      />

      {/* H. REPORTING GATE, AMENITIES & PRACTICAL INSTRUCTIONS */}
      <DarshanInstructions
        topic={topic}
        lang={lang}
        isLight={isLight}
      />

      {/* I. FAQS ACCORDION (Removed for Sarva Darshanam) */}
      {!isSarvaDarshanam && (
        <DarshanFaqAccordion
          topic={topic}
          lang={lang}
          isLight={isLight}
        />
      )}

      {/* J. RELATED DARSHAN OPTIONS (Removed for Sarva Darshanam) */}
      {!isSarvaDarshanam && (
        <DarshanRelatedOptions
          topic={topic}
          lang={lang}
          isLight={isLight}
          onNavigate={navigate}
        />
      )}

      {/* K. SOURCES, LAST VERIFIED INFO & SEQUENTIAL NAV */}
      <DarshanSourcesFooter
        topic={topic}
        lang={lang}
        isLight={isLight}
        onNavigate={navigate}
      />

    </article>
  );
}
