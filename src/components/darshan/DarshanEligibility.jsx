import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  FileText,
  AlertTriangle,
  Shirt,
  Check
} from 'lucide-react';

export default function DarshanEligibility({ topic, lang = 'en', isLight = false }) {
  const isTe = lang === 'te';
  const isSarvaDarshanam = topic.slug === 'sarva-darshanam';

  return (
    <div className="space-y-8 mb-8">
      {/* ELIGIBILITY & ATTENDANT TABLE (CRUCIAL FOR SENIOR / MEDICAL / DIFFERENTLY ABLED / NRI / INFANT) */}
      {topic.eligibilityTable ? (
        <section
          aria-label="Eligibility and attendant matrix"
          className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl ${
            isLight
              ? 'bg-white border-amber-300'
              : 'bg-[#141923] border-red-500/40'
          }`}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <UserCheck className={`w-5 h-5 shrink-0 ${
              isLight ? 'text-amber-800' : 'text-red-400'
            }`} />
            <h2 className={`font-serif text-lg sm:text-2xl font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isTe ? 'అర్హత, తప్పనిసరి పత్రాలు & సహాయకుల నిబంధనలు' : 'Mandatory Eligibility, Documents & Attendant Rules'}
            </h2>
          </div>

          {topic.attendantRules && (
            <p className={`text-xs sm:text-sm font-bold mb-4 flex items-center gap-2 ${
              isLight ? 'text-amber-900' : 'text-red-300'
            }`}>
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{topic.attendantRules}</span>
            </p>
          )}

          <div className={`overflow-x-auto rounded-2xl border ${
            isLight ? 'border-slate-300' : 'border-white/10'
          }`}>
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className={`border-b ${
                  isLight
                    ? 'bg-amber-100/90 border-slate-300'
                    : 'bg-black/60 border-white/10'
                }`}>
                  <th className={`p-3 sm:p-4 font-serif font-bold ${
                    isLight ? 'text-amber-900' : 'text-[#FFD700]'
                  }`}>
                    {isTe ? 'వర్గం (Category)' : 'Category & Eligibility'}
                  </th>
                  <th className={`p-3 sm:p-4 font-serif font-bold ${
                    isLight ? 'text-amber-900' : 'text-[#FFD700]'
                  }`}>
                    {isTe ? 'తప్పనిసరి పత్రాలు' : 'Mandatory Documents'}
                  </th>
                  <th className={`p-3 sm:p-4 font-serif font-bold ${
                    isLight ? 'text-red-800' : 'text-red-400'
                  }`}>
                    {isTe ? 'సహాయకులు (Attendant Rule)' : 'Attendant Rule'}
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                isLight ? 'divide-slate-200' : 'divide-white/5'
              }`}>
                {topic.eligibilityTable.map((row, i) => (
                  <tr key={i} className={`transition-colors ${
                    isLight ? 'hover:bg-amber-50/60' : 'hover:bg-white/5'
                  }`}>
                    <td className={`p-3 sm:p-4 font-bold whitespace-pre-line align-top ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {isTe ? row.categoryTe : row.categoryEn}
                    </td>
                    <td className={`p-3 sm:p-4 align-top ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {isTe ? row.mandatoryDocsTe : row.mandatoryDocsEn}
                    </td>
                    <td className={`p-3 sm:p-4 font-bold align-top whitespace-nowrap ${
                      isLight
                        ? 'text-amber-900 bg-amber-100/50'
                        : 'text-amber-300 bg-amber-500/10'
                    }`}>
                      🛡️ {isTe ? row.attendantRuleTe : row.attendantRuleEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        /* STANDARD ELIGIBILITY SECTION */
        <section
          aria-label="Eligibility criteria"
          className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
            isLight
              ? 'bg-white border-amber-200'
              : 'bg-[#141923] border-[#D4AF37]/30'
          }`}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <ShieldCheck className={`w-5 h-5 shrink-0 ${
              isLight ? 'text-amber-700' : 'text-[#FFD700]'
            }`} />
            <h2 className={`font-serif text-lg sm:text-2xl font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isTe ? 'అర్హత & ప్రవేశ నిబంధనలు' : 'Eligibility & Access Criteria'}
            </h2>
          </div>

          <ul className="space-y-3">
            {topic.eligibility.map((rule, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-3 text-xs sm:text-sm font-medium ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{isTe ? rule.ruleTe : rule.ruleEn}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* DRESS CODE & ID REQUIREMENTS GRID */}
      <div className={`grid grid-cols-1 ${isSarvaDarshanam ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-6`}>
        
        {/* Verification Documents or No-ID Required Notice */}
        {isSarvaDarshanam ? (
          <section
            aria-label="ID requirements for Sarva Darshanam"
            className={`p-6 sm:p-7 rounded-3xl border shadow-xl flex flex-col justify-between ${
              isLight
                ? 'bg-emerald-50/70 border-emerald-300 text-slate-800'
                : 'bg-[#141923] border-emerald-500/40 text-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <h3 className={`font-serif font-bold text-base sm:text-lg ${
                  isLight ? 'text-emerald-950' : 'text-emerald-400'
                }`}>
                  {isTe ? 'గుర్తింపు కార్డు నిబంధన' : 'Identity Verification'}
                </h3>
              </div>

              <div className={`p-4 rounded-2xl border mb-3 ${
                isLight ? 'bg-white border-emerald-200' : 'bg-black/30 border-emerald-500/30'
              }`}>
                <p className="font-extrabold text-sm sm:text-base text-emerald-600 mb-1">
                  ✓ {isTe ? 'సర్వదర్శనానికి ఎటువంటి గుర్తింపు కార్డు అవసరం లేదు' : 'No ID required for Sarva Darshanam'}
                </p>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {isTe
                    ? 'ఉచిత సాధారణ సర్వదర్శనం క్యూ లైన్లో ప్రవేశించడానికి ఎలాంటి ఆధార్ లేదా గుర్తింపు కార్డు తనిఖీ ఉండదు. భక్తులు నేరుగా క్యూలో ప్రవేశించవచ్చు.'
                    : 'Free general walk-in Sarva Darshanam queue does not mandate Aadhaar or any photo identity card verification. Pilgrims can directly join the queue.'}
                </p>
              </div>
            </div>

            <p className={`text-[11px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              ℹ️ {isTe ? 'గమనిక: భక్తుల సాధారణ ప్రయాణ భద్రత కొరకు ఏదైనా గుర్తింపు కార్డు వెంట ఉంచుకోవడం శ్రేయస్కరం.' : 'Note: Carrying personal identification during travel is recommended for general transit.'}
            </p>
          </section>
        ) : (
          /* Mandatory Verification Documents (Non-Sarva Darshanam) */
          <section
            aria-label="Mandatory verification documents"
            className={`p-6 sm:p-7 rounded-3xl border shadow-xl ${
              isLight
                ? 'bg-white border-amber-200'
                : 'bg-[#141923] border-[#D4AF37]/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText className={`w-4 h-4 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
              <h3 className={`font-serif font-bold text-base sm:text-lg ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isTe ? 'తప్పనిసరి ధృవీకరణ పత్రాలు' : 'Mandatory Verification Documents'}
              </h3>
            </div>

            <p className={`text-xs mb-3 font-semibold ${
              isLight ? 'text-red-700' : 'text-red-400'
            }`}>
              ⚠️ {isTe ? 'అసలు ఫిజికల్ ఐడీ కార్డు మాత్రమే చెల్లుబాటు అవుతుంది (జిరాక్స్ అనుమతించబడదు).' : 'Strictly original physical IDs required. Photocopies or digital photos are strictly barred.'}
            </p>

            <ul className="space-y-2">
              {topic.mandatoryDocs.map((doc, idx) => (
                <li
                  key={idx}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2.5 ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-black/30 border-white/5 text-slate-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Traditional Vedic Dress Code */}
        <section
          aria-label="Traditional dress code"
          className={`p-6 sm:p-7 rounded-3xl border shadow-xl ${
            isLight
              ? 'bg-white border-amber-200'
              : 'bg-[#141923] border-[#D4AF37]/30'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Shirt className={`w-4 h-4 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
            <h3 className={`font-serif font-bold text-base sm:text-lg ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isTe ? 'సాంప్రదాయ వస్త్రధారణ నిబంధనలు' : 'Preferred Traditional Dress Code'}
            </h3>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            <div className={`p-3 rounded-xl border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-black/30 border-white/5 text-slate-200'
            }`}>
              <strong className={`block mb-1 font-bold ${
                isLight ? 'text-amber-900' : 'text-[#FFD700]'
              }`}>
                {isTe ? 'పురుషులకు (Male):' : 'For Male Pilgrims:'}
              </strong>
              <p className="font-medium">
                {isTe
                  ? 'తెల్ల పంచె, ధోతి / తెల్ల కుర్తా, పైజామా.'
                  : 'White pancha, dhoti / white kurta, pyjama.'}
              </p>
            </div>

            <div className={`p-3 rounded-xl border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-black/30 border-white/5 text-slate-200'
            }`}>
              <strong className={`block mb-1 font-bold ${
                isLight ? 'text-amber-900' : 'text-[#FFD700]'
              }`}>
                {isTe ? 'మహిళలకు (Female):' : 'For Female Pilgrims:'}
              </strong>
              <p className="font-medium">
                {isTe
                  ? 'చీర (బ్లౌజ్ తో) / పంజాబీ డ్రెస్ (దుపట్టాతో), చుడీదార్ (దుపట్టాతో) / లంగా ఓణీ (హాఫ్-శారీ).'
                  : 'Saree with blouse / punjabi dress with dupatta, chudidar with dupatta / half saree (langa voni).'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
