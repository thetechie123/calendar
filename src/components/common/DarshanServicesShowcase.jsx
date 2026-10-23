import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    id: '01',
    titleEn: 'Sarva Darshan (SSD Free Tokens)',
    titleTe: 'సర్వదర్శనం (ఉచిత SSD టోకెన్లు)',
    descriptionEn:
      'Time-slotted free tokens issued daily at Tirupati counters (Srinivasam, Vishnu Nivasam, Bhudevi Complex). Direct barcode entry without standing in unending queue lines.',
    descriptionTe:
      'తిరుపతిలోని శ్రీనివాసం, విష్ణు నివాసం, భూదేవి కాంప్లెక్స్ లలో రోజువారీ టైమ్-స్లాట్ టోకెన్లు. క్యూలలో గంటల తరబడి వేచి ఉండకుండా సులభ దర్శనం.',
    linkTab: 'tokens',
    linkTextEn: 'Check Live Token Counters',
    linkTextTe: 'టోకెన్ కౌంటర్ల ప్రత్యక్ష స్థితి',
    image:
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop',
    tagEn: 'Free Offline Counters',
    tagTe: 'ఉచిత కౌంటర్లు',
  },
  {
    id: '02',
    titleEn: 'Special Entry Darshan (₹300 SED)',
    titleTe: 'ప్రత్యేక ప్రవేశ దర్శనం (₹300 SED)',
    descriptionEn:
      'Online quota tickets booked 2-3 months in advance via official TTD portal. Dedicated quick entry through ATC Car Parking with complimentary laddu prasadam.',
    descriptionTe:
      'అధికారిక TTD పోర్టల్ ద్వారా 2-3 నెలల ముందుగానే ఆన్‌లైన్‌లో బుక్ చేసుకునే దర్శనం. ATC కార్ పార్కింగ్ ద్వారా సత్వర ప్రవేశం మరియు ఉచిత లడ్డూ ప్రసాదం.',
    linkTab: 'calendar-page',
    linkTextEn: 'View Quota Release Calendar',
    linkTextTe: 'కోటా విడుదల క్యాలెండర్ చూడండి',
    image:
      'https://images.unsplash.com/photo-1600100397608-f010e42e44d0?q=80&w=1200&auto=format&fit=crop',
    tagEn: 'Online Advance Booking',
    tagTe: 'ఆన్‌లైన్ అడ్వాన్స్ బుకింగ్',
  },
  {
    id: '03',
    titleEn: 'Divya Darshan (Footpath Pilgrims)',
    titleTe: 'దివ్య దర్శనం (నడకమార్గం భక్తులు)',
    descriptionEn:
      'Sacred walking pilgrimage through Alipiri (3,550 steps) or Srivari Mettu (2,388 steps). Dedicated token counters available along holy trekking paths.',
    descriptionTe:
      'అలిపిరి (3,550 మెట్లు) లేదా శ్రీవారి మెట్టు (2,388 మెట్లు) ద్వారా పుణ్య పాదయాత్ర. నడక దారుల్లో భక్తుల కోసం ప్రత్యేక టోకెన్ కోటా కేటాయింపు.',
    linkTab: 'tokens',
    linkTextEn: 'Explore Footpath Guide',
    linkTextTe: 'నడక మార్గాల వివరాలు',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    tagEn: 'Sacred Trekking Paths',
    tagTe: 'పుణ్య నడక మార్గాలు',
  },
  {
    id: '04',
    titleEn: 'Daily Arjitha Sevas & Kainkaryams',
    titleTe: 'నిత్య ఆర్జిత సేవలు & కైంకర్యాలు',
    descriptionEn:
      'Participate in Lord Srinivasa’s sacred daily rituals: Suprabhatam, Thomala, Archana, and Kalyanotsavam. Track daily timings and sanctum schedules.',
    descriptionTe:
      'శ్రీనివాసుని నిత్య కైంకర్యాలు: సుప్రభాతం, తోమాల, అర్చన మరియు కల్యాణోత్సవం. రోజువారీ సేవా సమయాలు మరియు పవిత్ర వివరాలు.',
    linkTab: 'sevas',
    linkTextEn: 'View Daily Seva Timings',
    linkTextTe: 'నిత్య సేవల సమగ్ర వివరాలు',
    image:
      'https://images.unsplash.com/photo-1609137144822-263a03328eb0?q=80&w=1200&auto=format&fit=crop',
    tagEn: 'Sanctum Rituals',
    tagTe: 'సన్నిధి కైంకర్యాలు',
  },
];

const AUTO_PLAY_DURATION = 5000;

export default function DarshanServicesShowcase({ lang = 'en', onNavigateTab }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressTimerRef = useRef(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  const handleTabClick = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    progressTimerRef.current = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [activeIndex, isPaused, handleNext]);

  const active = SERVICES[activeIndex];
  const isTe = lang === 'te';

  return (
    <section className="w-full my-6 p-4 sm:p-6 md:p-8 rounded-3xl bg-[#0B0E14] light-theme:bg-amber-50/70 border-2 border-[#D4AF37]/40 shadow-2xl transition-colors">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT COLUMN: Vertical Tabs List */}
          <div className="flex flex-col justify-between order-2 lg:col-span-6 lg:order-1 pt-2">
            <div className="space-y-1.5 mb-6">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-[#FFD700]/20 text-[#FFD700] light-theme:text-amber-800">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD700] light-theme:text-amber-800">
                  {isTe ? 'దర్శన మార్గదర్శిని' : 'DARSHAN EXPLORER'}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold gold-gradient-text tracking-tight">
                {isTe ? 'తిరుమల దర్శనం ఎలా పొందాలి?' : 'How to Plan Your Darshan'}
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] light-theme:text-slate-600 font-medium leading-relaxed">
                {isTe
                  ? 'మీ ప్రయాణ ప్రణాళికకు అనువైన దర్శన పద్ధతిని ఎంచుకోండి.'
                  : 'Compare official darshan methods, quotas, and counter details.'}
              </p>
            </div>

            {/* TAB ITEMS */}
            <div className="flex flex-col space-y-1">
              {SERVICES.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleTabClick(index)}
                    className={`group relative flex cursor-pointer items-start gap-3 sm:gap-4 rounded-2xl p-3 sm:p-4 text-left transition-all duration-300 border ${
                      isActive
                        ? 'bg-[#141923] light-theme:bg-white border-[#D4AF37] shadow-lg scale-[1.01]'
                        : 'border-transparent hover:bg-white/5 light-theme:hover:bg-amber-100/50 text-[#94A3B8] light-theme:text-slate-600'
                    }`}
                  >
                    {/* Left Animated Progress Bar Indicator */}
                    <div className="relative w-1 self-stretch rounded-full bg-white/10 light-theme:bg-slate-200 overflow-hidden shrink-0 mt-1">
                      {isActive && (
                        <div
                          key={`progress-${index}-${isPaused}`}
                          className={`w-full bg-gradient-to-b from-[#D4AF37] to-[#FFD700] rounded-full transition-all ease-linear ${
                            isPaused ? 'h-full' : 'h-full'
                          }`}
                          style={{
                            animation: !isPaused
                              ? `expandHeight ${AUTO_PLAY_DURATION}ms linear forwards`
                              : 'none',
                          }}
                        />
                      )}
                    </div>

                    <span className="text-xs sm:text-sm font-black tabular-nums text-[#FFD700] light-theme:text-amber-800 shrink-0 mt-0.5">
                      /{service.id}
                    </span>

                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-serif text-sm sm:text-base md:text-lg font-bold truncate transition-colors duration-200 ${
                            isActive
                              ? 'text-white light-theme:text-slate-900 font-black'
                              : 'text-slate-300 light-theme:text-slate-700 group-hover:text-white'
                          }`}
                        >
                          {isTe ? service.titleTe : service.titleEn}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#FFD700] light-theme:text-amber-800 border border-[#D4AF37]/30 shrink-0 hidden sm:inline-block">
                          {isTe ? service.tagTe : service.tagEn}
                        </span>
                      </div>

                      {/* Expandable description when active */}
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          isActive
                            ? 'max-h-40 opacity-100 mt-1'
                            : 'max-h-0 opacity-0 pointer-events-none'
                        }`}
                      >
                        <p className="text-xs sm:text-sm text-[#CBD5E1] light-theme:text-slate-700 leading-relaxed">
                          {isTe ? service.descriptionTe : service.descriptionEn}
                        </p>

                        {onNavigateTab && (
                          <div className="pt-2.5">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigateTab(service.linkTab);
                              }}
                              className="inline-flex items-center gap-1.5 text-xs font-black text-[#FFD700] light-theme:text-amber-800 hover:underline cursor-pointer"
                            >
                              <span>{isTe ? service.linkTextTe : service.linkTextEn}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive High-Res Visual Slide */}
          <div className="flex flex-col justify-center order-1 lg:col-span-6 lg:order-2">
            <div
              className="relative group/gallery h-full min-h-[260px] sm:min-h-[340px] md:min-h-[400px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-black"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Background Sacred Image with Smooth Fade */}
              <img
                key={active.id}
                src={active.image}
                alt={isTe ? active.titleTe : active.titleEn}
                className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out transform group-hover/gallery:scale-105"
              />

              {/* Gradient Vignette Overlays for contrast & legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Caption on Image */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#FFD700]/50 text-[#FFD700] text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                  <span>🛕</span>
                  <span>{isTe ? active.tagTe : active.tagEn}</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-black text-slate-200 border border-white/20">
                  {activeIndex + 1} / {SERVICES.length}
                </span>
              </div>

              {/* Bottom Image Info Banner */}
              <div className="absolute bottom-4 left-4 right-20 sm:bottom-6 sm:left-6 sm:right-24 z-10 space-y-1">
                <h3 className="font-serif text-lg sm:text-2xl font-black text-white drop-shadow-md">
                  {isTe ? active.titleTe : active.titleEn}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-2 max-w-md drop-shadow">
                  {isTe ? active.descriptionTe : active.descriptionEn}
                </p>
              </div>

              {/* Navigation Arrows on bottom right */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-2 z-20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/80 hover:bg-[#D4AF37] hover:text-black text-[#FFD700] backdrop-blur-md border border-[#D4AF37]/60 flex items-center justify-center transition-all shadow-lg active:scale-90 cursor-pointer"
                  aria-label="Previous service"
                  title="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/80 hover:bg-[#D4AF37] hover:text-black text-[#FFD700] backdrop-blur-md border border-[#D4AF37]/60 flex items-center justify-center transition-all shadow-lg active:scale-90 cursor-pointer"
                  aria-label="Next service"
                  title="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Progress animation keyframe style injected safely */}
      <style>{`
        @keyframes expandHeight {
          0% { height: 0%; }
          100% { height: 100%; }
        }
      `}</style>
    </section>
  );
}
