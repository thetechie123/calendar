import React from 'react';
import { Sparkles, Calendar, MapPin, Sun, Flame, Star } from 'lucide-react';

export default function BrahmotsavamHero({ lang = 'en', isLight = false }) {
  const isEn = lang === 'en';

  return (
    <section className={`relative overflow-hidden rounded-3xl shadow-2xl ${
      isLight
        ? 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 border-2 border-amber-400/60'
        : 'bg-gradient-to-br from-[#3D1A00] via-[#2A1000] to-[#1A0A00] border-2 border-[#D4AF37]/60'
    }`}>
      {/* Decorative ambient glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#FF5722]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-10 max-w-5xl mx-auto">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          <span className={`px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 shadow ${
            isLight
              ? 'bg-amber-100 text-amber-900 border-amber-400'
              : 'bg-[#FFD700]/15 text-[#FFD700] border-[#FFD700]/50'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? 'Srivari Navarathri Brahmotsavams' : 'శ్రీవారి నవరాత్రి బ్రహ్మోత్సవాలు'}</span>
          </span>

          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            isLight
              ? 'bg-orange-100 text-orange-800 border-orange-400'
              : 'bg-[#FF5722]/20 text-[#FF9060] border-[#FF5722]/50'
          }`}>
            {isEn ? 'Adhika Masa · 2nd Brahmotsavam' : 'అధిక మాసం · ద్వితీయ బ్రహ్మోత్సవాలు'}
          </span>

          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            isLight
              ? 'bg-yellow-100 text-yellow-900 border-yellow-400'
              : 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/40'
          }`}>
            {isEn ? 'October 11 – 21 · 9 Days of Divine Splendour' : '11 – 21 అక్టోబర్ · 9 రోజుల దివ్య వైభవం'}
          </span>
        </div>

        {/* Main Heading */}
        <div className="text-center space-y-3 mb-6">
          <h1 className={`font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight ${
            isLight ? 'text-amber-900' : 'gold-gradient-text'
          }`}>
            {isEn
              ? 'Srivari Navarathri Brahmotsavams 2026'
              : 'శ్రీవారి నవరాత్రి బ్రహ్మోత్సవాలు 2026'}
          </h1>

          <p className={`text-sm sm:text-lg font-medium leading-relaxed max-w-3xl mx-auto ${
            isLight ? 'text-amber-800' : 'text-amber-200/90'
          }`}>
            {isEn
              ? 'The celestial festival of Lord Malayappa Swamy across the sacred Mada Streets of Seshachala — instituted by Lord Brahma Himself for the redemption of all humanity.'
              : 'శేషాచల శిఖరాగ్రాన తిరుమాడ వీధులలో శ్రీ మలయప్పస్వామివారి దివ్య విహారం — లోక కల్యాణార్థం బ్రహ్మదేవుడే స్వయంగా ప్రారంభించిన మహోత్సవం.'}
          </p>
        </div>

        {/* Quote from Archaka */}
        <div className={`mb-6 p-4 rounded-2xl border-l-4 border-[#FFD700] ${
          isLight
            ? 'bg-amber-50 border border-amber-200'
            : 'bg-white/5 border border-white/10'
        }`}>
          <p className={`text-xs sm:text-sm italic leading-relaxed ${
            isLight ? 'text-amber-900' : 'text-amber-100/90'
          }`}>
            {isEn
              ? '"A most sacred season eagerly anticipated by devotees across the globe... A rare juncture when celestials (devas) and mortals stand shoulder to shoulder along the sacred Thiru-Veedhis to behold the resplendent festivals of Srimannarayana."'
              : '"ప్రపంచమంతటా భక్తులు ఆకాంక్షించే అత్యంత పవిత్రమైన ఘడియ... దేవతలు మరియు మానవులు కలిసి తిరువీధులలో శ్రీమన్నారాయణుని దివ్య ఉత్సవాలను తిలకించే అపురూప క్షణం."'}
          </p>
          <p className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${
            isLight ? 'text-amber-600' : 'text-[#FFD700]/70'
          }`}>
            — {isEn ? 'Sri Archakam Ramakrishna Deekshitulu, Hereditary Archaka, Tirumala' : 'శ్రీ అర్చకం రామకృష్ణ దీక్షితులు, వంశపారంపర్య అర్చకులు, తిరుమల'}
          </p>
        </div>

        {/* Key Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { icon: Calendar, labelEn: 'Oct 11 – 21, 2026', labelTe: '11 – 21 అక్టో 2026', subEn: '9 Festival Days', subTe: '9 ఉత్సవ దినాలు' },
            { icon: Sun, labelEn: '18 Vahana Sevas', labelTe: '18 వాహన సేవలు', subEn: 'Morning & Night', subTe: 'ఉదయం & రాత్రి' },
            { icon: Flame, labelEn: 'Swarna Ratham', labelTe: 'స్వర్ణ రథోత్సవం', subEn: 'Day 8 Highlight', subTe: '8వ రోజు విశేషం' },
            { icon: Star, labelEn: 'Chakra Snanam', labelTe: 'చక్రస్నానం', subEn: 'Pushkarini · Day 9', subTe: 'పుష్కరిణి · 9వ రోజు' }
          ].map(({ icon: Icon, labelEn, labelTe, subEn, subTe }, i) => (
            <div key={i} className={`p-3 rounded-xl border ${
              isLight
                ? 'bg-white/80 border-amber-200 text-amber-900'
                : 'bg-white/5 border-white/10 text-white'
            }`}>
              <Icon className={`w-5 h-5 mx-auto mb-1 ${isLight ? 'text-amber-600' : 'text-[#FFD700]'}`} />
              <p className={`text-xs font-black ${isLight ? 'text-amber-900' : 'text-white'}`}>
                {isEn ? labelEn : labelTe}
              </p>
              <p className={`text-[10px] mt-0.5 ${isLight ? 'text-amber-600' : 'text-amber-300/70'}`}>
                {isEn ? subEn : subTe}
              </p>
            </div>
          ))}
        </div>

        {/* Location strip */}
        <div className={`mt-4 flex items-center justify-center gap-2 text-xs font-bold ${
          isLight ? 'text-amber-700' : 'text-amber-300/80'
        }`}>
          <MapPin className="w-3.5 h-3.5" />
          <span>{isEn ? 'Four Mada Streets of Tirumala · Sri Venkateswara Temple' : 'తిరుమల నాలుగు మాడ వీధులు · శ్రీ వేంకటేశ్వరస్వామి ఆలయం'}</span>
        </div>
      </div>
    </section>
  );
}
