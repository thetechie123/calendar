import React from 'react';
import { Sparkles, Info, Award, Layers } from 'lucide-react';

export default function DarshanOverview({ topic, lang = 'en', isLight = false }) {
  const isTe = lang === 'te';

  return (
    <section
      aria-label="What is this Darshan"
      className={`p-6 sm:p-8 rounded-3xl border shadow-xl mb-8 ${
        isLight
          ? 'bg-white border-amber-200'
          : 'bg-[#141923] border-[#D4AF37]/30'
      }`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <Sparkles className={`w-5 h-5 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
        <h2 className={`font-serif text-lg sm:text-2xl font-bold tracking-tight ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          {isTe ? 'ఈ దర్శనం గురించి సమగ్ర సమాచారం' : `What is ${topic.titleEn}?`}
        </h2>
      </div>

      <div className={`space-y-4 text-sm sm:text-base leading-relaxed font-medium ${
        isLight ? 'text-slate-800' : 'text-slate-200'
      }`}>
        <p>
          {isTe ? topic.overviewTe : topic.overviewEn}
        </p>

        {topic.differFromRelatedEn && (
          <div className={`p-4 rounded-2xl border my-4 ${
            isLight
              ? 'bg-amber-50/80 border-amber-200/80'
              : 'bg-black/30 border-white/10'
          }`}>
            <h3 className={`font-serif font-bold text-sm mb-1 flex items-center gap-2 ${
              isLight ? 'text-amber-900' : 'text-[#FFD700]'
            }`}>
              <Info className="w-4 h-4 shrink-0" />
              <span>{isTe ? 'ఇతర దర్శన మార్గాలతో పోలిక & వ్యత్యాసం' : 'How It Differs from Other Darshan Pathways'}</span>
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              {isTe ? topic.differFromRelatedTe : topic.differFromRelatedEn}
            </p>
          </div>
        )}
      </div>

      {/* Privilege Levels & Tiers if available (e.g. Govinda Nama Koti or Major Donors) */}
      {topic.tiers && (
        <div className={`mt-6 pt-6 border-t space-y-3 ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}>
          <div className="flex items-center gap-2">
            <Award className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
            <h3 className={`text-xs uppercase font-extrabold tracking-wider ${
              isLight ? 'text-amber-900' : 'text-[#FFD700]'
            }`}>
              {isTe ? 'విరాళం / సాధనా శ్రేణులు (Tiers)' : 'Privilege Levels & Recognition Tiers'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topic.tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${
                  isLight
                    ? 'bg-amber-50/60 border-amber-200'
                    : 'bg-black/30 border-[#D4AF37]/30'
                }`}
              >
                <h4 className={`font-serif font-bold text-sm mb-1 ${
                  isLight ? 'text-amber-900' : 'text-[#FFD700]'
                }`}>
                  {isTe ? tier.tierTe : tier.tierEn}
                </h4>
                <p className={`text-xs leading-relaxed font-medium ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  {isTe ? (tier.rewardTe || tier.descTe) : (tier.rewardEn || tier.descEn)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sevas list if available (e.g. Electronic Lucky Dip) */}
      {topic.sevasIncluded && (
        <div className={`mt-6 pt-6 border-t space-y-3 ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}>
          <div className="flex items-center gap-2">
            <Layers className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
            <h3 className={`text-xs uppercase font-extrabold tracking-wider ${
              isLight ? 'text-amber-900' : 'text-[#FFD700]'
            }`}>
              {isTe ? 'లక్కీ డిప్‌లో లభించే అంతరాలయ సేవలు' : 'Sanctum Sevas Available in Electronic DIP'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {topic.sevasIncluded.map((s, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-black/40 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-serif font-bold text-xs ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {isTe ? s.nameTe : s.nameEn}
                  </span>
                  <span className={`text-[11px] font-mono font-black ${
                    isLight ? 'text-amber-800' : 'text-[#FFD700]'
                  }`}>
                    {s.cost}
                  </span>
                </div>
                <span className={`text-[10px] block ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  ⏰ {s.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
