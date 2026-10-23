import React from 'react';
import {
  ExternalLink,
  ShieldCheck,
  Phone,
  Globe,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { ALL_DARSHAN_SLUGS, getDarshanTopic } from '../../data/darshanTopics';
import { isModifiedClick } from '../../utils/navigation';

export default function DarshanSourcesFooter({
  topic,
  lang = 'en',
  onNavigate,
  isLight = false
}) {
  const isTe = lang === 'te';
  const isSarvaDarshanam = topic.slug === 'sarva-darshanam';

  // Navigation: prev & next topics
  const currentIndex = ALL_DARSHAN_SLUGS.indexOf(topic.slug);
  const prevSlug = currentIndex > 0 ? ALL_DARSHAN_SLUGS[currentIndex - 1] : null;
  const nextSlug = currentIndex < ALL_DARSHAN_SLUGS.length - 1 ? ALL_DARSHAN_SLUGS[currentIndex + 1] : null;
  const prevTopic = prevSlug ? getDarshanTopic(prevSlug) : null;
  const nextTopic = nextSlug ? getDarshanTopic(nextSlug) : null;

  return (
    <footer className="space-y-8 pt-4">
      {/* SOURCES & LAST VERIFIED CARD (Removed for Sarva Darshanam) */}
      {!isSarvaDarshanam && (
        <section
          aria-label="Official sources and verification"
          className={`p-6 sm:p-7 rounded-3xl border shadow-xl ${
            isLight
              ? 'bg-white border-amber-200'
              : 'bg-[#141923] border-[#D4AF37]/30'
          }`}
        >
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <h3 className={`font-serif text-base sm:text-lg font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isTe ? 'అధికారిక మూలాలు & ధృవీకరణ వివరాలు' : 'Official TTD Sources & Verification'}
              </h3>
            </div>

            <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
              isLight
                ? 'text-emerald-900 bg-emerald-100 border-emerald-300'
                : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
            }`}>
              {isTe ? 'చివరి పరిశీలన:' : 'Verified:'} {topic.lastVerifiedDate || 'October 2026'}
            </span>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className={`w-4 h-4 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
                <span>
                  {isTe ? 'అధికారిక వెబ్‌సైట్:' : 'Official Booking Portal:'}{' '}
                  <a
                    href="https://ttdevasthanams.ap.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:underline font-bold inline-flex items-center gap-1 ${
                      isLight ? 'text-amber-800' : 'text-[#FFD700]'
                    }`}
                  >
                    <span>ttdevasthanams.ap.gov.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className={`w-4 h-4 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
                <span>
                  {isTe ? 'టీటీడీ 24x7 టోల్-ఫ్రీ కాల్ సెంటర్:' : 'TTD 24x7 Call Center:'}{' '}
                  <strong className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    1800-425-4141 / 0877-2277777 / 2233333
                  </strong>
                </span>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
              isLight
                ? 'bg-amber-50/70 border-amber-200/60'
                : 'bg-black/30 border-white/5'
            }`}>
              <p className={`font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                <strong className={`font-semibold block mb-0.5 ${
                  isLight ? 'text-amber-900' : 'text-amber-300'
                }`}>
                  {isTe ? 'సమాచార ప్రకటన:' : 'Informational Disclaimer:'}
                </strong>
                {isTe
                  ? 'టీటీడీ దర్శన కోటాలు, కౌంటర్ల సమయాలు మరియు ప్రవేశ నిబంధనలు భక్తుల రద్దీని బట్టి ముందస్తు సమాచారం లేకుండా మారవచ్చు. ప్రయాణించే ముందు అధికారిక పోర్టల్ లేదా కాల్ సెంటర్ ద్వారా నిర్ధారించుకోండి.'
                  : 'TTD quota releases, counter operational timings, and reporting rules are subject to change by temple authorities without prior notice. Always re-verify with official TTD channels prior to travel.'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SEQUENTIAL NAVIGATION: PREVIOUS / NEXT / ALL DARSHANS */}
      <nav
        aria-label="Next and previous darshan guides"
        className={`pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t ${
          isLight ? 'border-slate-300' : 'border-white/10'
        }`}
      >
        {prevTopic ? (
          <a
            href={`/darshan/${prevTopic.slug}`}
            onClick={(e) => {
              if (!isModifiedClick(e)) {
                e.preventDefault();
                if (onNavigate) onNavigate(`/darshan/${prevTopic.slug}`);
              }
            }}
            className={`p-3 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer group max-w-sm w-full sm:w-auto ${
              isLight
                ? 'bg-white border-slate-200 hover:border-amber-400'
                : 'bg-[#141923] border-white/10 hover:border-[#FFD700]'
            }`}
          >
            <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0 ${
              isLight ? 'text-amber-700' : 'text-[#FFD700]'
            }`} />
            <div className="min-w-0">
              <span className={`text-[10px] block uppercase font-bold tracking-wider ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {isTe ? 'గత దర్శన మార్గం' : 'Previous Darshan'}
              </span>
              <span className={`font-serif font-bold text-xs truncate block ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isTe ? prevTopic.titleTe : prevTopic.titleEn}
              </span>
            </div>
          </a>
        ) : <div />}

        <a
          href="/darshan"
          onClick={(e) => {
            if (!isModifiedClick(e)) {
              e.preventDefault();
              if (onNavigate) onNavigate('/darshan');
            }
          }}
          className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            isLight
              ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:text-white'
          }`}
        >
          {isTe ? 'అన్ని దర్శనాలు (సూచిక)' : 'All 20 Darshan Pathways'}
        </a>

        {nextTopic ? (
          <a
            href={`/darshan/${nextTopic.slug}`}
            onClick={(e) => {
              if (!isModifiedClick(e)) {
                e.preventDefault();
                if (onNavigate) onNavigate(`/darshan/${nextTopic.slug}`);
              }
            }}
            className={`p-3 rounded-2xl border flex items-center justify-end gap-3 transition-all cursor-pointer group max-w-sm w-full sm:w-auto text-right ${
              isLight
                ? 'bg-white border-slate-200 hover:border-amber-400'
                : 'bg-[#141923] border-white/10 hover:border-[#FFD700]'
            }`}
          >
            <div className="min-w-0">
              <span className={`text-[10px] block uppercase font-bold tracking-wider ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {isTe ? 'తదుపరి దర్శన మార్గం' : 'Next Darshan'}
              </span>
              <span className={`font-serif font-bold text-xs truncate block ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isTe ? nextTopic.titleTe : nextTopic.titleEn}
              </span>
            </div>
            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0 ${
              isLight ? 'text-amber-700' : 'text-[#FFD700]'
            }`} />
          </a>
        ) : <div />}
      </nav>
    </footer>
  );
}
