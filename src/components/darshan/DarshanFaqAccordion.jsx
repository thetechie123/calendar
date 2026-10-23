import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function DarshanFaqAccordion({ topic, lang = 'en', isLight = false }) {
  const isTe = lang === 'te';
  const faqs = topic.faqs || [];

  // Default first FAQ open
  const [openIndices, setOpenIndices] = useState(() => new Set([0]));

  const toggleIndex = (idx) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section
      aria-label="Frequently Asked Questions"
      className={`p-6 sm:p-8 rounded-3xl border shadow-xl mb-8 ${
        isLight
          ? 'bg-white border-amber-200'
          : 'bg-[#141923] border-[#D4AF37]/30'
      }`}
    >
      <div className="flex items-center gap-2.5 mb-6">
        <HelpCircle className={`w-5 h-5 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
        <h2 className={`font-serif text-lg sm:text-2xl font-bold tracking-tight ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          {isTe ? 'తరచుగా అడిగే ప్రశ్నలు (FAQ)' : 'Frequently Asked Questions'}
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndices.has(idx);
          const questionText = isTe ? faq.qTe : faq.qEn;
          const answerText = isTe ? faq.aTe : faq.aEn;

          return (
            <div
              key={idx}
              className={`rounded-2xl transition-all border ${
                isOpen
                  ? (isLight
                      ? 'bg-amber-50/80 border-amber-300 shadow-sm'
                      : 'bg-black/40 border-[#D4AF37]/40 shadow-sm')
                  : (isLight
                      ? 'bg-slate-50 border-slate-200 hover:border-amber-300'
                      : 'bg-black/20 border-white/5 hover:border-white/20')
              }`}
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold shrink-0 mt-0.5 ${
                    isLight
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-[#FFD700]/20 text-[#FFD700]'
                  }`}>
                    Q
                  </span>
                  <span className={`font-serif font-bold text-sm sm:text-base leading-snug ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {questionText}
                  </span>
                </div>

                <div className={`p-1 rounded-lg shrink-0 ${
                  isLight
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-white/5 text-slate-400'
                }`}>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-800' : ''
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={`px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm leading-relaxed font-medium pl-11 sm:pl-12 border-t mt-1 ${
                    isLight
                      ? 'border-slate-200/80 text-slate-700'
                      : 'border-white/5 text-slate-300'
                  }`}
                >
                  <p>{answerText}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
