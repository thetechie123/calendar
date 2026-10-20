import React from 'react';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  BookOpen,
  Calendar,
  Ticket,
  Compass,
  MessageSquare,
  ExternalLink,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { isModifiedClick } from '../utils/navigation';

export default function AboutPage({
  lang = 'en',
  themeMode = 'dark',
  onNavigate,
  onOpenFeedbackTab,
  onOpenLogoModal,
}) {
  const isTe = lang === 'te';
  const isLight = themeMode === 'light';

  const handleLink = (path, e) => {
    if (isModifiedClick(e)) return;
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const pillars = [
    {
      icon: Calendar,
      titleEn: 'Comprehensive Utsavam Calendar',
      titleTe: 'సమగ్ర ఉత్సవాల క్యాలెండర్',
      descEn:
        'Detailed year-round calendar aligned with official TTD Panchangam and published festival schedules, covering Salakatla & Navarathri Brahmotsavams, Vahana Sevas, Rathotsavams, and sacred Teppotsavams.',
      descTe:
        'టీటీడీ అధికారిక పంచాంగం మరియు ఉత్సవాల షెడ్యూళ్లతో కూడిన వార్షిక క్యాలెండర్ — బ్రహ్మోత్సవాలు, వాహన సేవలు, రథోత్సవాలు మరియు పవిత్రోత్సవాల పూర్తి వివరాలు.',
      link: '/calendar',
      linkTextEn: 'Explore Calendar',
      linkTextTe: 'క్యాలెండర్ చూడండి',
    },
    {
      icon: Ticket,
      titleEn: 'Live SSD & DD Token Intelligence',
      titleTe: 'లైవ్ SSD & DD టోకెన్ల సమాచారం',
      descEn:
        'Real-time tracking of Slotted Sarva Darshan (SSD) and Divya Darshan (DD) token availability across Tirupati counters (Srinivasam, Vishnu Nivasam, Bhudevi Complex) with historical quota exhaustion times.',
      descTe:
        'తిరుపతిలోని శ్రీనివాసం, విష్ణు నివాసం, భూదేవి కాంప్లెక్స్ కౌంటర్లలో ఉచిత సర్వదర్శనం (SSD) & దివ్యదర్శనం (DD) టోకెన్ల లభ్యత మరియు రోజువారీ కోటా సమయాలు.',
      link: '/tokens',
      linkTextEn: 'View Token Status',
      linkTextTe: 'టోకెన్ల వివరాలు',
    },
    {
      icon: BookOpen,
      titleEn: 'Agamic & Liturgical Encyclopedia',
      titleTe: 'ఆగమ శాస్త్ర & ఉత్సవ నిఘంటువు',
      descEn:
        'Over 60 thoroughly researched terms explaining Vaikhanasa Agama traditions, temple terminology, sacred Vahanas, divine ornaments, Alwar Pasurams, and historical kainkaryas (such as the 1817 Sawal Jawab Patti).',
      descTe:
        'వైఖానస ఆగమ సంప్రదాయాలు, ఆలయ సాంకేతిక పదాలు, పవిత్ర వాహనాలు, ఆభరణాలు మరియు చారిత్రక కైంకర్యాల అర్థాలను వివరించే పరిశోధనాత్మక ఆధ్యాత్మిక నిఘంటువు.',
      link: '/glossary',
      linkTextEn: 'Read Glossary',
      linkTextTe: 'నిఘంటువు చదవండి',
    },
    {
      icon: Compass,
      titleEn: 'Pilgrim FAQs & Guide Manual',
      titleTe: 'యాత్ర గైడ్ & ప్రశ్నోత్తరాల నిధి',
      descEn:
        'Comprehensive, official answers on free Sarva Darshanam, SSD & DD tokens, ₹300 Special Entry, NRI & Defence quotas, infant/senior citizen entry, and temple conduct rules.',
      descTe:
        'ఉచిత సర్వదర్శనం, SSD & DD టోకెన్లు, ₹300 ప్రత్యేక ప్రవేశ దర్శనం, ఎన్ఆర్ఐ & సీనియర్ సిటిజన్ కోటాలు, డ్రెస్ కోడ్ మరియు ఆలయ నియమావళిపై సమగ్ర సమాచారం.',
      link: '/faqs',
      linkTextEn: 'Read Pilgrim FAQs',
      linkTextTe: 'ప్రశ్నోత్తరాలు చదవండి',
    },
  ];

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* HERO SECTION */}
      <section
        className={`p-6 sm:p-10 rounded-2xl relative overflow-hidden text-center space-y-4 border transition-colors ${
          isLight
            ? 'bg-white border-amber-300/60 shadow-lg'
            : 'glass-card border-[#D4AF37]/40 shadow-2xl'
        }`}
      >
        {/* CIRCULAR LOGO EMBLEM */}
        <div className="flex justify-center mb-2">
          <div
            onClick={onOpenLogoModal}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 sm:border-3 shadow-2xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shrink-0 ${
              isLight
                ? 'border-amber-600 bg-[#E65100] ring-4 ring-amber-100 shadow-amber-900/15'
                : 'border-[#FFD700] bg-[#E65100] ring-4 ring-[#FFD700]/20 shadow-[#FFD700]/25'
            }`}
            title="Click to view Logo in full size"
          >
            <img
              src="/logo-192.png"
              alt="The Tirumala Verse Symbol"
              className="w-full h-full object-cover rounded-full p-1"
            />
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            isLight
              ? 'bg-amber-100/90 text-amber-950 border border-amber-300'
              : 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {isTe
              ? 'స్వతంత్ర భక్తి & సమాచార వేదిక'
              : 'Independent Devotional & Pilgrim Guide'}
          </span>
        </div>

        <h1
          className={`font-serif text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-amber-950' : 'gold-gradient-text'
          }`}
        >
          {isTe ? 'ది తిరుమల వర్స్ గురించి' : 'About The Tirumala Verse'}
        </h1>

        <p
          className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium ${
            isLight ? 'text-slate-700' : 'text-[#94A3B8]'
          }`}
        >
          {isTe
            ? 'శ్రీ వేంకటేశ్వర స్వామి దివ్య క్షేత్రాలైన తిరుమల మరియు తిరుపతి భక్తుల కోసం రూపొందించబడిన సమగ్ర సమాచార, ఆధ్యాత్మిక మరియు సాంస్కృతిక వేదిక.'
            : 'A comprehensive cultural, liturgical, and practical companion for pilgrims visiting the sacred Seven Hills of Lord Sri Venkateswara and affiliated shrines in Tirupati.'}
        </p>
      </section>

      {/* MISSION & VISION */}
      <section
        className={`p-6 sm:p-8 rounded-2xl border space-y-4 transition-colors ${
          isLight
            ? 'bg-white border-amber-200/80 shadow-md'
            : 'glass-card border-[#D4AF37]/30'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl border ${
              isLight
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-[#FF5722]/15 text-[#FF5722] border-[#FF5722]/30'
            }`}
          >
            <Heart className="w-5 h-5" />
          </div>
          <h2
            className={`font-serif text-xl sm:text-2xl font-bold ${
              isLight ? 'text-amber-950' : 'gold-gradient-text'
            }`}
          >
            {isTe ? 'మా లక్ష్యం & ఉద్దేశం' : 'Our Mission & Vision'}
          </h2>
        </div>

        <div
          className={`space-y-3 text-sm leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-[#CBD5E1]'
          }`}
        >
          <p>
            {isTe
              ? 'ప్రతి సంవత్సరం కోట్ల మంది భక్తులు కలియుగ వైకుంఠమైన తిరుమల శ్రీవారి దర్శనార్థం తరలివస్తుంటారు. అయితే, దర్శన టోకెన్లు, ఉత్సవాల తేదీలు, క్యూలైన్ల సమాచారం మరియు పూజా సంప్రదాయాల వివరాలు వివిధ మాధ్యమాలలో చెల్లాచెదురుగా ఉండటం వల్ల సామాన్య భక్తులు అనేక సందేహాలకు గురవుతుంటారు.'
              : 'Every year, tens of millions of pilgrims undertake the sacred pilgrimage to Kaliyuga Vaikuntham — Tirumala. While Tirumala Tirupati Devasthanams (TTD) manages temple operations, pilgrims often face fragmented information regarding offline darshan tokens, daily seva schedules, festival dates, and traditional ritual practices.'}
          </p>
          <p>
            {isTe
              ? 'భక్తుల యాత్రా ప్రయాణాన్ని సులభతరం చేస్తూనే, ప్రాచీన వైఖానస ఆగమ సాంప్రదాయాలు, పురాణ విశేషాలు మరియు శాసన ఆధారాలను ఒకే చోట భద్రపరచి అందించడమే "ది తిరుమల వర్స్" ముఖ్య ధ్యేయం.'
              : 'The Tirumala Verse was created as an open, accessible, community-driven resource to combine authentic liturgical scholarship with real-time ground logistics. We preserve and explain ancient Agamic customs, epigraphical inscriptions, and festival schedules in an intuitive, modern interface.'}
          </p>
        </div>
      </section>

      {/* CORE PILLARS GRID */}
      <section className="space-y-4">
        <div className="text-center sm:text-left">
          <h2
            className={`font-serif text-xl sm:text-2xl font-bold ${
              isLight ? 'text-amber-950' : 'gold-gradient-text'
            }`}
          >
            {isTe ? 'మేము అందించే ముఖ్య విభాగాలు' : 'What The Platform Provides'}
          </h2>
          <p
            className={`text-xs sm:text-sm mt-1 ${
              isLight ? 'text-slate-600' : 'text-[#94A3B8]'
            }`}
          >
            {isTe
              ? 'భక్తుల సౌకర్యార్థం సిద్ధం చేయబడిన ప్రత్యేక విభాగాలు'
              : 'Dedicated modules designed to assist your pilgrimage journey'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  isLight
                    ? 'bg-white border-amber-200/80 hover:border-amber-400 hover:shadow-lg'
                    : 'glass-card border-[#D4AF37]/30 hover:border-[#FFD700]/60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-lg border ${
                        isLight
                          ? 'bg-amber-50 border-amber-300 text-amber-900'
                          : 'bg-[#141923] border-[#D4AF37]/40 text-[#FFD700]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3
                      className={`font-serif text-base font-bold ${
                        isLight ? 'text-amber-950' : 'text-[#FFD700]'
                      }`}
                    >
                      {isTe ? item.titleTe : item.titleEn}
                    </h3>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      isLight ? 'text-slate-600 font-medium' : 'text-[#94A3B8]'
                    }`}
                  >
                    {isTe ? item.descTe : item.descEn}
                  </p>
                </div>

                <div>
                  <a
                    href={item.link}
                    onClick={(e) => handleLink(item.link, e)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
                      isLight
                        ? 'text-amber-800 hover:text-amber-950'
                        : 'text-[#FF5722] hover:text-[#FFD700]'
                    }`}
                  >
                    <span>{isTe ? item.linkTextTe : item.linkTextEn}</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AUTHENTIC SOURCES */}
      <section
        className={`p-6 sm:p-8 rounded-2xl border space-y-4 transition-colors ${
          isLight
            ? 'bg-white border-amber-200/80 shadow-md'
            : 'glass-card border-[#D4AF37]/30'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl border ${
              isLight
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-[#D4AF37]/15 text-[#FFD700] border-[#D4AF37]/30'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2
            className={`font-serif text-xl sm:text-2xl font-bold ${
              isLight ? 'text-amber-950' : 'gold-gradient-text'
            }`}
          >
            {isTe
              ? 'సమాచార మూలాలు & విశ్వసనీయత'
              : 'Data Integrity & Scholarly Sources'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div
            className={`p-3.5 rounded-xl border space-y-1.5 ${
              isLight
                ? 'bg-amber-50/70 border-amber-200'
                : 'bg-[#141923]/60 border-[#D4AF37]/20'
            }`}
          >
            <div
              className={`flex items-center gap-1.5 font-bold ${
                isLight ? 'text-amber-950' : 'text-[#FFD700]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isTe ? 'టీటీడీ ప్రచురణలు' : 'Official TTD Releases'}</span>
            </div>
            <p
              className={`leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-[#94A3B8]'
              }`}
            >
              {isTe
                ? 'టీటీడీ అధికారిక వార్షిక పంచాంగం, సప్తగిరి ఆధ్యాత్మిక మాసపత్రిక మరియు అధికారిక ప్రకటనల ఆధారంగా క్రోడీకరించబడిన సమాచారం.'
                : 'Panchangam festival dates, Nitya Sevas, and administrative guidelines sourced directly from official TTD bulletins and Sapthagiri journal archives.'}
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border space-y-1.5 ${
              isLight
                ? 'bg-amber-50/70 border-amber-200'
                : 'bg-[#141923]/60 border-[#D4AF37]/20'
            }`}
          >
            <div
              className={`flex items-center gap-1.5 font-bold ${
                isLight ? 'text-amber-950' : 'text-[#FFD700]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isTe ? 'ఆగమ & శాసన పరిశోధన' : 'Epigraphical Records'}</span>
            </div>
            <p
              className={`leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-[#94A3B8]'
              }`}
            >
              {isTe
                ? 'శ్రీవారి ఆలయ కుడ్యములపై గల ప్రాచీన రాతి శాసనాలు, పల్లవ రాణి సామవై కానుకల రికార్డులు మరియు 1817 సవాల్ జవాబ్ పట్టి కైంకర్య వివరాలు.'
                : 'Temple inscriptions, Pallava Queen Samavai historical grants, Krishnadevaraya gifts, and the archival 1817 Sawal Jawab Patti.'}
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border space-y-1.5 ${
              isLight
                ? 'bg-amber-50/70 border-amber-200'
                : 'bg-[#141923]/60 border-[#D4AF37]/20'
            }`}
          >
            <div
              className={`flex items-center gap-1.5 font-bold ${
                isLight ? 'text-amber-950' : 'text-[#FFD700]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isTe ? 'క్షేత్రస్థాయి పరిశీలన' : 'Ground Intelligence'}</span>
            </div>
            <p
              className={`leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-[#94A3B8]'
              }`}
            >
              {isTe
                ? 'తిరుపతిలోని టోకెన్ కౌంటర్ల వద్ద స్వయంగా పరిశీలించిన సమాచారం మరియు భక్తుల ప్రత్యక్ష ఫీడ్‌బ్యాక్ ద్వారా టోకెన్ లభ్యత నమోదు.'
                : 'Automated monitoring of official pilgrim updates, queue observations, and counter quota status across Srinivasam and Vishnu Nivasam.'}
            </p>
          </div>
        </div>
      </section>

      {/* STRICT NON-OFFICIAL DISCLAIMER */}
      <section
        className={`p-6 sm:p-7 rounded-2xl border-2 space-y-3 transition-colors ${
          isLight
            ? 'bg-amber-50/90 border-amber-400 text-slate-800'
            : 'bg-amber-950/20 border-amber-500/40 text-[#CBD5E1]'
        }`}
      >
        <div
          className={`flex items-center gap-2 font-bold text-sm ${
            isLight ? 'text-amber-950' : 'text-amber-400'
          }`}
        >
          <Info className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            {isTe
              ? 'ముఖ్యమైన గమనిక & చట్టబద్ధమైన ప్రకటన'
              : 'Important Notice & Non-Affiliation Disclaimer'}
          </span>
        </div>

        <p
          className={`text-xs sm:text-sm leading-relaxed ${
            isLight ? 'text-slate-700 font-medium' : 'text-[#CBD5E1]'
          }`}
        >
          {isTe ? (
            <>
              <strong className={isLight ? 'text-slate-900 font-extrabold' : 'text-white'}>
                ది తిరుమల వర్స్ (The Tirumala Verse)
              </strong>{' '}
              అనేది భక్తుల కోసం స్వచ్ఛందంగా నడపబడుతున్న ఒక స్వతంత్ర సమాచార వేదిక
              మాత్రమే. ఇది తిరుమల తిరుపతి దేవస్థానము (TTD) లేదా ఆంధ్రప్రదేశ్
              ప్రభుత్వానికి చెందిన అధికారిక వెబ్‌సైట్ కాదు. మేము ఎటువంటి దర్శనం
              టిక్కెట్లు, వసతి లేదా సేవా టిక్కెట్లను బుక్ చేయము లేదా విక్రయించము.
              అధికారిక దర్శనం మరియు సేవల బుకింగ్‌ల కోసం దయచేసి అధికారిక పోర్టల్{' '}
              <a
                href="https://ttdevasthanams.ap.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline font-extrabold inline-flex items-center gap-0.5 ${
                  isLight
                    ? 'text-amber-900 hover:text-amber-950'
                    : 'text-[#FFD700] hover:text-white'
                }`}
              >
                ttdevasthanams.ap.gov.in
                <ExternalLink className="w-3 h-3 inline" />
              </a>{' '}
              మాత్రమే సందర్శించండి.
            </>
          ) : (
            <>
              <strong className={isLight ? 'text-slate-900 font-extrabold' : 'text-white'}>
                The Tirumala Verse
              </strong>{' '}
              is an independent educational and cultural initiative created
              solely to assist devotees. It is{' '}
              <strong className={isLight ? 'text-slate-900 font-extrabold' : 'text-white'}>
                NOT an official website of Tirumala Tirupati Devasthanams (TTD)
              </strong>{' '}
              or the Government of Andhra Pradesh. We do not sell, facilitate,
              or book any darshan tickets, accommodation, or arjitha sevas.
              For all official bookings and bookings under TTD governance, please
              visit the official portal directly at{' '}
              <a
                href="https://ttdevasthanams.ap.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline font-extrabold inline-flex items-center gap-0.5 ${
                  isLight
                    ? 'text-amber-900 hover:text-amber-950'
                    : 'text-[#FFD700] hover:text-white'
                }`}
              >
                ttdevasthanams.ap.gov.in
                <ExternalLink className="w-3 h-3 inline" />
              </a>
              .
            </>
          )}
        </p>
      </section>

      {/* COMMUNITY FEEDBACK CALL TO ACTION */}
      <section
        className={`p-6 sm:p-8 rounded-2xl border text-center space-y-4 transition-colors ${
          isLight
            ? 'bg-white border-amber-200/80 shadow-md'
            : 'glass-card border-[#D4AF37]/30'
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${
            isLight
              ? 'bg-amber-100 text-amber-900'
              : 'bg-[#FF5722]/20 text-[#FF5722]'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3
            className={`font-serif text-lg sm:text-xl font-bold ${
              isLight ? 'text-amber-950' : 'gold-gradient-text'
            }`}
          >
            {isTe
              ? 'మీ అభిప్రాయాలు & సూచనలను తెలియజేయండి'
              : 'Contribute Corrections & Suggestions'}
          </h3>
          <p
            className={`text-xs sm:text-sm max-w-xl mx-auto ${
              isLight ? 'text-slate-600 font-medium' : 'text-[#94A3B8]'
            }`}
          >
            {isTe
              ? 'ఈ వేదిక భక్తుల సహకారంతో నిరంతరం మెరుగుపరచబడుతుంది. ఏవైనా తప్పులు గమనించినా లేదా కొత్త సమాచారం సూచించాలన్నా దయచేసి మాకు తెలియజేయండి.'
              : 'Our repository is continually refined with devotee feedback. Notice a date discrepancy or have insights to share? We welcome your thoughts.'}
          </p>
        </div>

        <div>
          <button
            onClick={() => {
              if (onOpenFeedbackTab) {
                onOpenFeedbackTab();
              } else if (onNavigate) {
                onNavigate('/feedback');
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-black" />
            <span>
              {isTe ? 'అభిప్రాయాన్ని పంపండి' : 'Submit Feedback / Errata'}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
