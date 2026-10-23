import React from 'react';
import { Calendar, HelpCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function DarshanBookingGuide({ topic, lang = 'en', isLight = false }) {
  const isTe = lang === 'te';
  const steps = topic.howToBook || [];

  return (
    <section
      id="how-to-book"
      aria-label="Step-by-step booking procedure"
      className={`p-6 sm:p-8 rounded-3xl border shadow-xl mb-8 scroll-mt-24 ${
        isLight
          ? 'bg-white border-amber-200'
          : 'bg-[#141923] border-[#D4AF37]/30'
      }`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <Calendar className={`w-5 h-5 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
        <h2 className={`font-serif text-lg sm:text-2xl font-bold tracking-tight ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          {isTe ? 'ఎలా బుక్ చేసుకోవాలి? (దశలవారీ మార్గదర్శిని)' : 'Step-by-Step Booking & Execution Procedure'}
        </h2>
      </div>

      <p className={`text-xs sm:text-sm mb-6 font-medium ${
        isLight ? 'text-slate-600' : 'text-[#94A3B8]'
      }`}>
        {isTe
          ? 'ఈ దర్శనాన్ని విజయవంతంగా పొందడానికి మరియు ఎటువంటి అసౌకర్యాలు లేకుండా స్వామివారిని దర్శించుకోవడానికి క్రింది క్రమాన్ని పాటించండి.'
          : 'Follow these exact sequential steps to apply, book, report, and verify your darshan without hitches.'}
      </p>

      {/* Numbered Steps List */}
      <div className="space-y-4">
        {steps.map((stepItem) => (
          <div
            key={stepItem.step}
            className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-4 transition-all ${
              isLight
                ? 'bg-slate-50/80 border-slate-200 hover:border-amber-400'
                : 'bg-black/30 border-white/5 hover:border-[#D4AF37]/40'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#FFD700] text-black font-black text-sm flex items-center justify-center shrink-0 shadow-md">
              {stepItem.step}
            </div>

            <div className="space-y-1.5 min-w-0 flex-1">
              <h3 className={`font-serif font-bold text-sm sm:text-base ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isTe ? stepItem.titleTe : stepItem.titleEn}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed font-medium ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {isTe ? stepItem.descTe : stepItem.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* What to do if slots are unavailable / contingency guidance */}
      {topic.ifUnavailableEn && (
        <div className={`mt-6 p-4 rounded-2xl border flex items-start gap-3 ${
          isLight
            ? 'bg-amber-50 border-amber-300'
            : 'bg-amber-500/10 border-amber-500/30'
        }`}>
          <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
            isLight ? 'text-amber-700' : 'text-amber-400'
          }`} />
          <div className={`text-xs sm:text-sm leading-relaxed font-medium ${
            isLight ? 'text-amber-950' : 'text-amber-200/90'
          }`}>
            <strong className={`font-bold block mb-0.5 ${
              isLight ? 'text-amber-900' : 'text-amber-300'
            }`}>
              {isTe ? 'స్లాట్లు లభించకపోతే ఏం చేయాలి?' : 'What to Do If Slots Are Unavailable?'}
            </strong>
            <span>{isTe ? topic.ifUnavailableTe : topic.ifUnavailableEn}</span>
          </div>
        </div>
      )}
    </section>
  );
}
