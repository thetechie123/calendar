import React from 'react';
import {
  MapPin,
  ExternalLink,
  Gift,
  AlertTriangle,
  Package,
  Smartphone,
  ShieldAlert,
  ScanFace,
  Tv
} from 'lucide-react';

export default function DarshanInstructions({ topic, lang = 'en', isLight = false }) {
  const isTe = lang === 'te';
  const isSarvaDarshanam = topic.slug === 'sarva-darshanam';

  const facilitiesList = isSarvaDarshanam
    ? [
        isTe
          ? 'ఉచిత లడ్డూ ప్రసాదం: ప్రవేశం వద్ద ప్రతి భక్తుడి ముఖాన్ని నమోదు చేసి QR కోడ్ టోకెన్ ఇస్తారు. దర్శనానంతరం లడ్డూ కాంప్లెక్స్ వద్ద ఈ టోకెన్ ఇచ్చి ఉచిత లడ్డూ పొందవచ్చు.'
          : 'Free Srivari Laddu: Every person undergoes face registration upon entry and receives a QR code token, which is scanned to collect a free Laddu after Darshanam.',
        ...(topic.facilities || [])
      ]
    : (topic.facilities || []);

  return (
    <div className="space-y-8 mb-8">
      {/* REPORTING LOCATION & GOOGLE MAPS CARD */}
      <section
        aria-label="Reporting gate and route"
        className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
          isLight
            ? 'bg-white border-amber-200'
            : 'bg-[#141923] border-[#D4AF37]/30'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <MapPin className={`w-5 h-5 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
              <h2 className={`font-serif text-lg sm:text-xl font-bold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isSarvaDarshanam
                  ? (isTe ? 'క్యూ ప్రారంభ స్థలం & సూచనలు' : 'Queue Starting Point & Location Guidance')
                  : (isTe ? 'రిపోర్టింగ్ కేంద్రం & ప్రవేశ ద్వారం' : 'Designated Reporting Gate & Location')}
              </h2>
            </div>

            <p className={`font-serif font-extrabold text-base sm:text-lg leading-snug ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isTe ? topic.reportingPointTe : topic.reportingPointEn}
            </p>

            <p className={`text-xs sm:text-sm font-medium ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              {isSarvaDarshanam
                ? (isTe
                    ? 'రద్దీ ఆధారంగా క్యూ ప్రారంభ ప్రదేశం నిరంతరం మారుతూ ఉంటుంది కాబట్టి ఒకే స్థలాన్ని ఖచ్చితంగా చెప్పలేము, అయితే సాధారణంగా ఇది కృష్ణతేజ సర్కిల్ వద్ద ప్రారంభమవుతుంది. తిరుమలలోని డిజిటల్ సమాచార బోర్డులలో నిరంతరం దర్శన నిరీక్షణ సమయం ప్రదర్శించబడుతుంది.'
                    : 'We truly cannot tell an exact fixed starting point because queue lines shift dynamically with crowd volume, but it generally starts near Krishna Teja Circle. Estimated waiting hours are continuously displayed on digital information boards across Tirumala.')
                : (isTe
                    ? 'మీ టికెట్ లేదా టోకెన్‌పై సూచించిన సమయానికి కనీసం 30 నుండి 60 నిమిషాల ముందే ఈ ప్రవేశ కేంద్రానికి చేరుకోవాలి.'
                    : 'Arrive at this designated gate at least 30 to 60 minutes before your allotted reporting slot with original physical IDs.')}
            </p>
          </div>

          {topic.mapLink && (
            <a
              href={topic.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>{isTe ? 'గూగుల్ మ్యాప్స్‌లో ప్రదేశం' : 'Open Location in Google Maps'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </section>

      {/* INCLUDED AMENITIES & PRASADAM */}
      {facilitiesList.length > 0 && (
        <section
          aria-label="Included amenities and prasadam"
          className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
            isLight
              ? 'bg-white border-amber-200'
              : 'bg-[#141923] border-[#D4AF37]/30'
          }`}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <Gift className={`w-5 h-5 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
            <h2 className={`font-serif text-lg sm:text-xl font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isTe ? 'లభించే సదుపాయాలు, లడ్డూ ప్రసాదం & సేవా విశేషాలు' : 'Included Amenities, Free Laddu & Refreshments'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {facilitiesList.map((fac, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                  isLight
                    ? 'bg-amber-50/60 border-amber-200 text-slate-800'
                    : 'bg-black/20 border-white/5 text-slate-300'
                }`}
              >
                <span className={`mt-0.5 shrink-0 ${isLight ? 'text-amber-800' : 'text-[#FFD700]'}`}>✨</span>
                <span className="text-xs sm:text-sm font-medium leading-relaxed">
                  {fac}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRO-TIPS & CRITICAL WARNINGS */}
      {topic.proTips && topic.proTips.length > 0 && (
        <section
          aria-label="Important instructions checklist"
          className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl ${
            isLight
              ? 'bg-white border-amber-400'
              : 'bg-[#141923] border-amber-500/40'
          }`}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <AlertTriangle className={`w-5 h-5 shrink-0 ${isLight ? 'text-amber-800' : 'text-amber-400'}`} />
            <h2 className={`font-serif text-lg sm:text-xl font-bold tracking-tight ${
              isLight ? 'text-amber-900' : 'text-amber-400'
            }`}>
              {isTe ? 'భక్తుల కోసం ముఖ్యమైన సూచనలు & జాగ్రత్తలు' : 'Important Instructions & Practical Travel Tips'}
            </h2>
          </div>

          <ul className="space-y-3">
            {topic.proTips.map((tip, idx) => (
              <li
                key={idx}
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-medium leading-relaxed flex items-start gap-3 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-black/20 border-white/5 text-slate-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
