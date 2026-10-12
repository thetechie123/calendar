import React, { useState } from 'react';
import { Landmark, Scroll, ChevronDown, ChevronUp, History, Sparkles } from 'lucide-react';
import { EPIGRAPHICAL_HISTORY_RECORDS } from '../../data/brahmotsavamData';

export default function BrahmotsavamHistory({ lang = 'en', isLight = false }) {
  const isEn = lang === 'en';
  const [expandedRecord, setExpandedRecord] = useState(null);

  const foundationalRites = [
    {
      titleEn: 'Kovil Alwar Tirumanjanam',
      titleTe: 'కోయిల్ ఆళ్వార్ తిరుమంజనం',
      descEn:
        'Conducted on the Tuesday preceding the festival. The entire sanctum is scrubbed and purified with "Parimalam" — a consecrated paste of turmeric, kumkum, sandalwood, camphor, and herbal roots.'
    },
    {
      titleEn: 'Rettapadi Varam',
      titleTe: 'రెట్టపడి వారం',
      descEn:
        'Conducted on the Friday preceding the festival. Lord Venkateswara receives an elaborate Abhishekam, and all sacred ritual substances and food offerings are presented in doubled measure (Rettapadi).'
    },
    {
      titleEn: 'Kankana Bhattar Vrata',
      titleTe: 'కంకణ భట్టర్ వ్రతం',
      descEn:
        'The chief officiating Vaikhanasa priest receives a consecrated wristband (Kankanam) and undertakes a vow of celibacy, single daily meals, and strict prohibition against crossing the sacred territorial boundary (polimera) of Tirumala.'
    },
    {
      titleEn: 'The Empty Brahma Ratham',
      titleTe: 'బ్రహ్మ రథం (అదృశ్య బ్రహ్మదేవుని సారథ్యం)',
      descEn:
        'In honour of the founding creator Lord Brahma, an unadorned small empty chariot precedes the Lord’s main mount during every single morning and night procession, signifying that Brahma invisibly directs the celebrations.'
    }
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#FFD700]" />
            <h2 className={`font-serif text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'gold-gradient-text'}`}>
              {isEn ? 'History, Inscriptions & Epigraphical Legacy' : 'శాసనాధారాలు & చారిత్రక వైభవం'}
            </h2>
          </div>
          <p className={`text-xs sm:text-sm mt-1 font-medium ${isLight ? 'text-slate-600' : 'text-[#94A3B8]'}`}>
            {isEn
              ? 'Over 1,000 temple wall inscriptions documenting twelve centuries of royal endowments and sacred traditions.'
              : 'తిరుమల ఆలయ గోడలపై 640కి పైగా రాతి శాసనాలలో నిక్షిప్తమైన పల్లవ, చోళ, విజయనగర మరియు గోసాయీల చరిత్ర.'}
          </p>
        </div>

        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 self-start sm:self-auto">
          {isEn ? '614 CE to Present' : 'సా.శ. 614 నుండి నేటివరకు'}
        </span>
      </div>

      {/* Epigraphical Records Timeline / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EPIGRAPHICAL_HISTORY_RECORDS.map((rec, idx) => {
          const isExpanded = expandedRecord === idx;

          return (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white border-amber-200/80 hover:border-amber-400'
                  : 'bg-[#0B0E14] border-white/10 hover:border-[#D4AF37]/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  isLight
                    ? 'text-amber-900 bg-amber-100 border-amber-300'
                    : 'text-[#FFD700] bg-[#FFD700]/10 border-[#FFD700]/30'
                }`}>
                  {rec.period}
                </span>
                <Landmark className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-[#D4AF37]'}`} />
              </div>

              <h3 className={`font-serif text-base sm:text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {isEn ? rec.rulerEn : rec.rulerTe}
              </h3>

              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#94A3B8]'}`}>
                {isEn ? rec.detailsEn : rec.detailsTe}
              </p>
            </div>
          );
        })}
      </div>

      {/* Foundational Vaikhanasa Rites Card */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${
        isLight ? 'bg-amber-50/80 border-amber-200' : 'bg-[#141923] border-[#FFD700]/30'
      }`}>
        <div className={`flex items-center gap-2 mb-4 ${isLight ? 'text-amber-800' : 'text-[#FFD700]'}`}>
          <Sparkles className="w-5 h-5 text-amber-600 dark:text-[#FFD700]" />
          <h3 className="font-serif text-lg sm:text-xl font-black">
            {isEn ? 'Foundational Liturgical Rites (Unchanged for Millennia)' : 'వేల సంవత్సరాలుగా మారకుండా సాగుతున్న పవిత్ర క్రతువులు'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {foundationalRites.map((rite, i) => (
            <div key={i} className={`p-3.5 rounded-xl border space-y-1 ${
              isLight ? 'bg-white border-amber-200' : 'bg-black/40 border-white/10'
            }`}>
              <h4 className={`text-xs font-black uppercase tracking-wider ${isLight ? 'text-amber-900' : 'text-[#FFD700]'}`}>
                {isEn ? rite.titleEn : rite.titleTe}
              </h4>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-[#CBD5E1]'}`}>
                {rite.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
