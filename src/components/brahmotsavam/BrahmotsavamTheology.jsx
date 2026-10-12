import React, { useState } from 'react';
import {
  BookOpen, ShieldAlert, CheckCircle2, Scale, Sparkles,
  ChevronDown, ChevronUp, Quote
} from 'lucide-react';
import { THEOLOGICAL_COMPARISON_2026 } from '../../data/brahmotsavamData';

const AGAMIC_QUOTES = [
  {
    source: 'Bhagavan Marichi\'s Vimanarchanakalpa (Chapter 99)',
    sanskrit: 'kAlOtsavE vyatItE tu tOraNAdivivarjitE | mahASAntim tata: kRutvA utsavam tu samAcharEt ||',
    translation: 'If a Kaalotsava is delayed beyond its appointed time, a Mahashanti Homa must be performed before the festival can proceed.',
    context: 'This mandates that skipping the Brahmotsavam even by a few lunar months creates a severe ritual flaw requiring elaborate expiatory sacrifices.'
  },
  {
    source: 'Yagnadhikara (Bhagavan Bhrigu Proktam, Page 557)',
    sanskrit: 'kAlOtsavE vyatItE tu pUrvOktam hOmamAcharEt | kalaSaI panchavimSadbhi: snApayEddEvamavyayam ||',
    translation: 'If a festival exceeds its designated time, a purification bath (Snapana Tirumanjanam) with 25 consecrated pots must be performed for the Lord, alongside a grand food offering (Mahahavis). If the interval exceeds one full year, five sacrificial fires (Panchagni) must be established.',
    context: 'The escalating penances—25 sacred pots, Mahahavis, and ultimately five ritual fires—demonstrate how seriously the Agama treats temporal irregularity.'
  },
  {
    source: 'Bhagavan Bhrigu Samhita (Prakirnadhikara, Page 284)',
    sanskrit: 'kalotsave mahan dosastatra kuryattu niskrtim | utsavatpurvamuddisya mahasantim tryaham caret || anyatha tu krtam karyamakrtam syadasamsayam ||',
    translation: 'Failing to observe a Kaalotsava at its designated time causes a severe ritual flaw (mahan dosha). Conducting a delayed festival without the required three-day Mahashanti Homa renders the entire proceeding null and void.',
    context: '"Kritam karyamakritam syat" — the rite performed improperly is as if never done. This is the canonical anchor for the second Brahmotsavam.'
  }
];

const ADHIKA_MASA_STEPS = [
  {
    icon: '☀️',
    titleEn: 'The Solar Year',
    titleTe: 'సౌర వర్షం',
    descEn: 'The solar year (Sauramana) has 365 days. Tirumala\'s Brahmotsavam is a Kaalotsava — a "Solar Occasion" fixed by the sun\'s position in Kanya Rasi (Virgo), not by the moon.',
    descTe: 'సౌర వర్షం 365 రోజులు. తిరుమల బ్రహ్మోత్సవాలు కన్యా రాశిలో సూర్యుని స్థానం ఆధారంగా నిర్ణయించే కాలోత్సవం — చాంద్రమానంతో సంబంధం లేదు.'
  },
  {
    icon: '🌙',
    titleEn: 'The Lunisolar Year',
    titleTe: 'చాంద్రమాన వర్షం',
    descEn: 'The lunisolar year (Chandramana) has only 354 days — 11 days shorter than the solar year. Telugu traditions, daily Koluvu rites, and most Devi festivals follow Chandramana.',
    descTe: 'చాంద్రమాన వర్షం కేవలం 354 రోజులు — సౌర వర్షం కంటే 11 రోజులు తక్కువ. తెలుగు సంప్రదాయాలు, నిత్య కొలువు, దేవీ ఉత్సవాలు చాంద్రమానం పాటిస్తాయి.'
  },
  {
    icon: '📅',
    titleEn: 'The 11-Day Drift & Adhika Masa',
    titleTe: 'అధిక మాసం ఎందుకు వస్తుంది?',
    descEn: 'Every year, the lunisolar calendar falls 11 days behind. Over 3 years, this accumulates to ~33 days — one full month. To resynchronize, an "Adhika Masa" (intercalary month) with no solar transit (Sankranti) is inserted every 2–3 years.',
    descTe: 'ప్రతి సంవత్సరం చాంద్రమానం 11 రోజులు వెనక పడుతుంది. 3 సంవత్సరాలలో ~33 రోజులు, అంటే ఒక పూర్తి మాసం వెనక పడుతుంది. దీన్ని సరిచేయడానికి సంక్రాంతి లేని "అధిక మాసం" చేర్చబడుతుంది.'
  },
  {
    icon: '⚡',
    titleEn: 'The Liturgical Crisis',
    titleTe: 'శాస్త్రీయ సంకటం',
    descEn: 'In an Adhika Masa year, Kanya-Shravana (the solar trigger) falls in Bhadrapada instead of Ashwayuja. If only one Brahmotsavam is held in Bhadrapada, the next would be 13 months later — exceeding the 12-month canonical limit, triggering Kaalahina Dosha.',
    descTe: 'అధిక మాసం సంవత్సరంలో కన్యా-శ్రవణం ఆశ్వయుజానికి బదులు భాద్రపదంలో వస్తుంది. భాద్రపదంలో మాత్రమే నిర్వహిస్తే తదుపరి ఉత్సవం 13 నెలలకు వెళ్తుంది — 12 నెలల శాస్త్రీయ హద్దు దాటి కాలహీన దోషం కలుగుతుంది.'
  },
  {
    icon: '✅',
    titleEn: 'The Vaikhanasa Solution',
    titleTe: 'వైఖానస పరిష్కారం',
    descEn: 'Ancient Vaikhanasa Archakas instituted a dual-festival framework: (1) Primary Salakatla Brahmotsavam in Bhadrapada — complete with Dhwajarohanam, 9-day Vahana processions, Maha Rathotsavam (wooden chariot), and Chakrasnanam. (2) Navarathri Brahmotsavam in Ashwayuja — without Dhwajarohanam, featuring the golden Swarna Ratham and Navarathri Koluvu on Golden Sesha Vahanam each evening.',
    descTe: 'ప్రాచీన వైఖానస అర్చకులు ద్వి-బ్రహ్మోత్సవ వ్యవస్థను నెలకొల్పారు: (1) సాలకట్ల బ్రహ్మోత్సవం - ధ్వజారోహణ, 9 రోజుల వాహన సేవలు, మహా రథోత్సవం (చెక్క రథం), చక్రస్నానంతో; (2) నవరాత్రి బ్రహ్మోత్సవం - ధ్వజారోహణ లేకుండా, స్వర్ణ రథం, ప్రతి సాయంత్రం రంగనాయకుల మండపంలో నవరాత్రి కొలువుతో.'
  }
];

export default function BrahmotsavamTheology({ lang = 'en', isLight = false }) {
  const isEn = lang === 'en';
  const { differences } = THEOLOGICAL_COMPARISON_2026;
  const [expandedQuote, setExpandedQuote] = useState(null);

  const textMuted = isLight ? 'text-slate-600' : 'text-[#94A3B8]';
  const textBody = isLight ? 'text-slate-800' : 'text-[#CBD5E1]';
  const textHeading = isLight ? 'text-slate-900' : 'text-white';
  const cardBg = isLight ? 'bg-white border-slate-200 shadow' : 'bg-[#0E1219] border-white/10';
  const divider = isLight ? 'border-slate-200' : 'border-[#D4AF37]/30';

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${divider}`}>
        <div>
          <div className="flex items-center gap-2">
            <Scale className={`w-5 h-5 ${isLight ? 'text-amber-600' : 'text-[#FFD700]'}`} />
            <h2 className={`font-serif text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'gold-gradient-text'}`}>
              {isEn ? 'Why Two Brahmotsavams in 2026?' : '2026లో రెండు బ్రహ్మోత్సవాలు ఎందుకు?'}
            </h2>
          </div>
          <p className={`text-xs sm:text-sm mt-1 font-medium ${textMuted}`}>
            {isEn
              ? 'The sacred reconciliation of Solar and Lunisolar calendars — rooted in Agamic scripture, not modern decision.'
              : 'సౌరమానం మరియు చాంద్రమానాల శాస్త్రీయ సమన్వయం — ఆగమ ప్రమాణం ఆధారంగా నిర్ణయించిన సంప్రదాయం.'}
          </p>
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border self-start sm:self-auto ${
          isLight ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        }`}>
          {isEn ? 'Vaikhanasa Agama' : 'వైఖానస ఆగమం'}
        </span>
      </div>

      {/* Key insight statement */}
      <div className={`p-5 rounded-2xl border-l-4 border-[#FFD700] ${
        isLight ? 'bg-amber-50 border border-amber-200' : 'bg-[#1A1500]/60 border border-[#FFD700]/20'
      }`}>
        <p className={`text-sm sm:text-base font-medium leading-relaxed ${isLight ? 'text-amber-900' : 'text-amber-100'}`}>
          {isEn
            ? 'The Brahmotsavam is a Kaalotsava — a festival bound by cosmic time, not merely calendar convenience. The Tirumala tradition uniquely follows the Solar calendar (Sauramana) for fixing Brahmotsavams while daily rites follow the Lunisolar calendar (Chandramana). In an Adhika Masa year, this creates a liturgical dilemma resolved by the wisdom of ancient Vaikhanasa Archakas through a dual-festival framework perfected over centuries.'
            : 'బ్రహ్మోత్సవాలు ఒక కాలోత్సవం — ఖగోళ కాలం చేత నిర్ణయించబడిన పర్వం, కేవలం క్యాలెండర్ సౌలభ్యం కాదు. తిరుమల సంప్రదాయం బ్రహ్మోత్సవాలకు సౌరమానాన్ని, నిత్య సేవలకు చాంద్రమానాన్ని అనుసరిస్తుంది. అధిక మాసం సంవత్సరంలో ఉత్పన్నమయ్యే శాస్త్రీయ సమస్యను శతాబ్దాలుగా వైఖానస అర్చకులు ద్వి-బ్రహ్మోత్సవ వ్యవస్థ ద్వారా పరిష్కరించారు.'}
        </p>
      </div>

      {/* Step by Step Explanation */}
      <div>
        <h3 className={`font-serif text-lg font-bold mb-4 ${textHeading}`}>
          {isEn ? 'Understanding the Calendar Arithmetic' : 'పంచాంగ గణిత రహస్యం'}
        </h3>
        <div className="space-y-3">
          {ADHIKA_MASA_STEPS.map((step, i) => (
            <div key={i} className={`p-4 rounded-xl border flex gap-4 items-start ${cardBg}`}>
              <span className="text-2xl shrink-0 mt-0.5">{step.icon}</span>
              <div>
                <h4 className={`font-bold text-sm sm:text-base mb-1 ${textHeading}`}>
                  {isEn ? step.titleEn : step.titleTe}
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${textBody}`}>
                  {isEn ? step.descEn : step.descTe}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Two Brahmotsavams Comparison */}
      <div>
        <h3 className={`font-serif text-lg font-bold mb-4 ${textHeading}`}>
          {isEn ? 'Salakatla vs. Navarathri Brahmotsavams' : 'సాలకట్ల vs. నవరాత్రి బ్రహ్మోత్సవాలు'}
        </h3>
        <div className={`overflow-x-auto rounded-2xl border ${isLight ? 'border-slate-200 shadow' : 'border-white/10'}`}>
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[560px]">
            <thead>
              <tr className={isLight ? 'bg-slate-100 text-slate-800' : 'bg-[#141923] text-[#CBD5E1]'}>
                <th className={`p-3.5 font-bold border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                  {isEn ? 'Liturgical Feature' : 'లక్షణం'}
                </th>
                <th className={`p-3.5 font-bold text-amber-500 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                  {isEn ? '🔱 Salakatla Brahmotsavam' : '🔱 సాలకట్ల బ్రహ్మోత్సవాలు'}
                </th>
                <th className={`p-3.5 font-bold border-b ${isLight ? 'border-slate-200 text-emerald-700' : 'border-white/10 text-emerald-400'}`}>
                  {isEn ? '✨ Navarathri Brahmotsavam' : '✨ నవరాత్రి బ్రహ్మోత్సవాలు'}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isLight ? 'divide-slate-100' : 'divide-white/5'}`}>
              {differences.map((diff, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0
                    ? (isLight ? 'bg-white' : 'bg-[#0B0E14]/40')
                    : (isLight ? 'bg-slate-50' : 'bg-[#121620]/40')}
                >
                  <td className={`p-3.5 font-semibold ${textHeading}`}>
                    {isEn ? diff.featureEn : diff.featureTe}
                  </td>
                  <td className={`p-3.5 leading-relaxed ${textMuted}`}>
                    {isEn ? diff.salakatlaEn : diff.salakatlaTe}
                  </td>
                  <td className={`p-3.5 leading-relaxed font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}>
                    {isEn ? diff.navarathriEn : diff.navarathriTe}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agamic Scriptural Citations */}
      <div>
        <h3 className={`font-serif text-lg font-bold mb-1 ${textHeading}`}>
          {isEn ? 'Agamic Scriptural Authority' : 'ఆగమ శాస్త్ర ప్రమాణాలు'}
        </h3>
        <p className={`text-xs mb-4 ${textMuted}`}>
          {isEn
            ? 'Three canonical texts explicitly mandate why the Navarathri Brahmotsavam cannot be skipped:'
            : 'నవరాత్రి బ్రహ్మోత్సవాన్ని ఎందుకు వదిలివేయలేమో మూడు శాస్త్ర ప్రమాణాలు స్పష్టంగా చెబుతున్నాయి:'}
        </p>
        <div className="space-y-3">
          {AGAMIC_QUOTES.map((q, i) => {
            const isOpen = expandedQuote === i;
            return (
              <div key={i} className={`rounded-xl border overflow-hidden ${cardBg}`}>
                <button
                  type="button"
                  onClick={() => setExpandedQuote(isOpen ? null : i)}
                  className={`w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-white/5 transition-colors`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      isLight ? 'bg-amber-100 text-amber-800' : 'bg-[#FFD700]/20 text-[#FFD700]'
                    }`}>{i + 1}</span>
                    <div>
                      <p className={`text-xs font-bold ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`}>
                        {q.source}
                      </p>
                      <p className={`text-xs mt-1 font-mono italic ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        {q.sanskrit.slice(0, 60)}...
                      </p>
                    </div>
                  </div>
                  {isOpen
                    ? <ChevronUp className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                    : <ChevronDown className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                  }
                </button>
                {isOpen && (
                  <div className={`px-4 pb-4 space-y-3 border-t ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                    <div className={`mt-3 p-3 rounded-lg ${isLight ? 'bg-amber-50' : 'bg-white/5'}`}>
                      <p className={`text-xs font-mono italic leading-relaxed ${isLight ? 'text-amber-800' : 'text-amber-200/80'}`}>
                        {q.sanskrit}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Quote className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-amber-400' : 'text-[#FFD700]/60'}`} />
                      <p className={`text-xs sm:text-sm leading-relaxed ${textBody}`}>
                        <span className="font-semibold">{isEn ? 'Translation: ' : 'అనువాదం: '}</span>
                        {q.translation}
                      </p>
                    </div>
                    <p className={`text-xs leading-relaxed ${textMuted} pl-6`}>
                      <span className="font-semibold">{isEn ? 'Significance: ' : 'ప్రాముఖ్యత: '}</span>
                      {q.context}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Queen Samavai Historical Link */}
      <div className={`p-5 rounded-2xl border ${
        isLight ? 'bg-indigo-50 border-indigo-200' : 'bg-[#0A0D18] border-indigo-500/30'
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className={`w-5 h-5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
          <h4 className={`font-serif text-base font-bold ${isLight ? 'text-indigo-900' : 'text-indigo-300'}`}>
            {isEn ? '614 CE: The Epigraphical Anchor' : '614 CE: శాసన ఆధారం'}
          </h4>
        </div>
        <p className={`text-xs sm:text-sm leading-relaxed ${textBody}`}>
          {isEn
            ? 'Pallava Queen Samavai (also known as "Kadavan Perundevi") endowed lands and gold for a seven-day festival commencing with Dhwajarohanam in the solar month of Margali (Dhanurmasam). This marked the second annual Brahmotsavam instituted at the shrine. She consecrated the silver Bhoga Srinivasa Murti and decreed the festival be maintained "as long as the sun and moon endure." In her own words, inscribed on the northern wall of the first enclosure: "The Feet of those that protect this charity shall be borne on my head and the protection of Lord Srinivasa is sought for this."'
            : 'పల్లవ రాణి సమవై (కడవన్ పెరుందేవి) మార్గళి మాసంలో ధ్వజారోహణంతో ప్రారంభమయ్యే 7 రోజుల ఉత్సవానికి భూమి మరియు బంగారు విరాళమిచ్చింది. ఆమె వెండి భోగ శ్రీనివాస మూర్తిని ప్రతిష్ఠించి "సూర్యచంద్రులు ఉన్నంత వరకు ఈ ఉత్సవం కొనసాగాలి" అని శాసనం చేసింది. మొదటి ప్రాకారపు ఉత్తర గోడపై ఆమె మాటలు: "ఈ దానాన్ని రక్షించేవారి పాదాలు నా తలపై ఉండాలి, శ్రీ శ్రీనివాసుని రక్షణ ఇందుకు ప్రార్థిస్తున్నాను."'}
        </p>
      </div>

      {/* Phalasruti */}
      <div className={`p-5 rounded-2xl border ${
        isLight ? 'bg-emerald-50 border-emerald-200' : 'bg-[#091510] border-emerald-500/30'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className={`w-5 h-5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
          <h4 className={`font-serif text-base font-bold ${isLight ? 'text-emerald-900' : 'text-emerald-300'}`}>
            {isEn ? 'Phalasruti — Fruits of Witnessing' : 'ఫలశ్రుతి — దర్శన ఫలం'}
          </h4>
        </div>
        <p className={`text-xs sm:text-sm leading-relaxed ${textBody}`}>
          {isEn
            ? 'The Vaikhanasa Agama affirms that participating in or witnessing Brahmotsavams yields spiritual merit equivalent to performing a Soma Yajna or Ashvamedha Yajna. The scriptures declare that witnessing the Lord on His divine Vahanams bestows health, longevity, prosperity, progeny, and renown — and ensures the liberation (Vishnu Sayujyam) of twenty-one generations of one\'s lineage.'
            : 'వైఖానస ఆగమం ప్రకారం బ్రహ్మోత్సవాలలో పాల్గొనడం లేదా వాటిని చూడడం సోమయాగం లేదా అశ్వమేధ యాగంతో సమానమైన పుణ్యఫలాన్ని అందిస్తుంది. వాహన సేవలలో స్వామివారిని దర్శించడం ఆరోగ్యం, దీర్ఘాయువు, సంపద, సంతానం మరియు కీర్తి ప్రసాదిస్తుంది — మరియు 21 తరాలకు విష్ణు సాయుజ్యం కలిగిస్తుంది.'}
        </p>
      </div>
    </section>
  );
}
