import React from 'react';
import { Compass, ArrowRight, Clock, MapPin } from 'lucide-react';
import { getDarshanTopic } from '../../data/darshanTopics';
import { isModifiedClick } from '../../utils/navigation';

export default function DarshanRelatedOptions({ topic, lang = 'en', onNavigate, isLight = false }) {
  const isTe = lang === 'te';
  const relatedSlugs = topic.relatedSlugs || [];

  if (relatedSlugs.length === 0) return null;

  const relatedTopics = relatedSlugs
    .map((s) => getDarshanTopic(s))
    .filter(Boolean);

  if (relatedTopics.length === 0) return null;

  return (
    <section
      aria-label="Related Darshan options"
      className={`p-6 sm:p-8 rounded-3xl border shadow-xl mb-8 ${
        isLight
          ? 'bg-white border-amber-200'
          : 'bg-[#141923] border-[#D4AF37]/30'
      }`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <Compass className={`w-5 h-5 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
        <h2 className={`font-serif text-lg sm:text-2xl font-bold tracking-tight ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          {isTe ? 'సంబంధిత ఇతర దర్శన మార్గాలు & పోలిక' : 'Compare Related Darshan Pathways'}
        </h2>
      </div>

      <p className={`text-xs sm:text-sm mb-6 font-medium ${
        isLight ? 'text-slate-600' : 'text-[#94A3B8]'
      }`}>
        {isTe
          ? 'మీ ప్రయాణ సమయం మరియు సౌలభ్యానికి తగిన సరైన దర్శన మార్గాన్ని ఎంచుకోవడానికి ఈ క్రింది ప్రత్యామ్నాయాలను పరిశీలించండి.'
          : 'Compare these alternatives to decide which pathway best fits your schedule, age eligibility, and budget.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTopics.map((relTopic) => (
          <div
            key={relTopic.slug}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
              isLight
                ? 'bg-slate-50 border-slate-200 hover:border-amber-400'
                : 'bg-black/30 border-white/10 hover:border-[#D4AF37]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isLight
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-[#FFD700]/15 text-[#FFD700]'
                }`}>
                  {isTe ? relTopic.badgeTe : relTopic.badgeEn}
                </span>
                <span className={`text-[11px] font-mono font-bold ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {relTopic.cost}
                </span>
              </div>

              <h3 className={`font-serif font-bold text-sm sm:text-base transition-colors mb-1.5 leading-snug ${
                isLight
                  ? 'text-slate-900 group-hover:text-amber-800'
                  : 'text-white group-hover:text-[#FFD700]'
              }`}>
                {isTe ? relTopic.titleTe : relTopic.titleEn}
              </h3>

              <p className={`text-xs line-clamp-2 mb-3 leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {isTe ? relTopic.subtitleTe : relTopic.subtitleEn}
              </p>

              <div className={`text-[11px] space-y-1 mb-4 pt-2 border-t ${
                isLight ? 'border-slate-200 text-slate-600' : 'border-white/5 text-slate-400'
              }`}>
                <div className="flex items-center gap-1.5 truncate">
                  <Clock className={`w-3 h-3 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
                  <span>{relTopic.avgWaitTime.split('|')[0]}</span>
                </div>
              </div>
            </div>

            <a
              href={`/darshan/${relTopic.slug}`}
              onClick={(e) => {
                if (!isModifiedClick(e)) {
                  e.preventDefault();
                  if (onNavigate) onNavigate(`/darshan/${relTopic.slug}`);
                }
              }}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center ${
                isLight
                  ? 'bg-white border-amber-300 text-slate-900 hover:bg-amber-500 hover:text-white'
                  : 'bg-black/40 border-[#D4AF37]/40 text-slate-200 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-black'
              }`}
            >
              <span>{isTe ? 'వివరాలు చూడండి' : 'View Pathway Guide'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
