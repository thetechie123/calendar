import React from "react";
import { AlertCircle, ArrowLeftRight, Bus, Check, Footprints } from "lucide-react";

export default function SSDVsDDComparison({
  isLight,
  cardClass,
  headingClass,
  mutedClass,
  lang = "en",
}) {
  const isEn = lang === "en";

  // key: true highlights the rows where SSD and DD really differ for the pilgrim.
  const rows = [
    {
      feature: isEn ? "Full Name & Slip Name" : "పూర్తి పేరు & టోకెన్ స్లిప్ పేరు",
      ssd: isEn ? "Slotted Sarva Darshan (Printed as SSD)" : "స్లాటెడ్ సర్వ దర్శనం (స్లిప్‌పై SSD అని ఉంటుంది)",
      dd: isEn
        ? "Divya Darshan (Officially printed as 'SSD Srivari Mettu' on tokens)"
        : "దివ్య దర్శనం (టోకెన్ స్లిప్‌పై 'SSD Srivari Mettu' అని ముద్రించబడుతుంది)",
    },
    {
      key: true,
      feature: isEn ? "When to Walk Footpath" : "కాలినడకన ఎప్పుడు నడవాలి?",
      ssd: isEn ? "Not required (Can travel by bus, car, or walk anytime)" : "వర్తించదు (బస్సు, కారు లేదా ఎప్పుడైనా నడక)",
      dd: isEn
        ? "MUST walk on the DAY OF DARSHANAM ONLY (not on booking day)"
        : "తప్పనిసరిగా దర్శనం రోజున మాత్రమే నడవాలి (టోకెన్ తీసుకున్న రోజు కాదు)",
    },
    {
      feature: isEn ? "Target Pilgrims" : "ఎవరి కోసం?",
      ssd: isEn ? "All general pilgrims arriving via bus, car, or train" : "బస్సు, కారు లేదా రైలు ద్వారా వచ్చే సాధారణ భక్తులందరూ",
      dd: isEn ? "Pilgrims trekking on foot via Srivari Mettu footpath" : "శ్రీవారి మెట్టు కాలినడక మార్గం ద్వారా నడిచి వెళ్లే భక్తులు మాత్రమే",
    },
    {
      feature: isEn ? "Tirupati Counter Locations" : "తిరుపతిలో కౌంటర్ల ప్రదేశాలు",
      ssd: isEn
        ? "Vishnu Nivasam (Railway Stn), Srinivasam (Bus Stand), Bhudevi Complex"
        : "విష్ణు నివాసం (రైల్వే స్టేషన్), శ్రీనివాసం (బస్టాండ్), భూదేవి కాంప్లెక్స్",
      dd: isEn ? "Dedicated DD counter at Bhudevi Complex (Alipiri)" : "భూదేవి కాంప్లెక్స్ వద్ద ప్రత్యేక DD కౌంటర్ (అలిపిరి)",
    },
    {
      key: true,
      feature: isEn ? "Travel Mode Allowed" : "ప్రయాణ విధానం",
      ssd: isEn ? "Any mode (Ghat road bus, jeep, taxi, or walking)" : "ఏ మార్గమైనా (ఘాట్ రోడ్డు బస్సు, జీపు, టాక్సీ లేదా నడక)",
      dd: isEn
        ? "Strictly walking on foot via Srivari Mettu on darshan day"
        : "దర్శనం రోజున తప్పనిసరిగా శ్రీవారి మెట్టు ద్వారా కాలినడకనే వెళ్ళాలి",
    },
    {
      key: true,
      feature: isEn ? "Mandatory Scanning Check" : "తప్పనిసరి స్కానింగ్ నిబంధన",
      ssd: isEn ? "Direct reporting at ATGH Circle in Tirumala" : "తిరుమలలోని ATGH సర్కిల్ వద్ద నేరుగా రిపోర్ట్ చేయాలి",
      dd: isEn
        ? "MUST scan token at the 1200th step on Srivari Mettu on darshan day"
        : "దర్శనం రోజున శ్రీవారి మెట్టు 1200వ మెట్టు వద్ద టోకెన్ తప్పనిసరిగా స్కాన్ చేయించుకోవాలి",
    },
    {
      feature: isEn ? "Cost / Ticket Price" : "ధర / రుసుము",
      ssd: isEn ? "100% Free (No charges)" : "పూర్తిగా ఉచితం (ఉచిత దర్శనం)",
      dd: isEn ? "100% Free (No charges)" : "పూర్తిగా ఉచితం (ఉచిత దర్శనం)",
    },
    {
      feature: isEn ? "Reporting Point in Tirumala" : "తిరుమలలో రిపోర్టింగ్ ప్రదేశం",
      ssd: isEn ? "ATGH Circle (at allotted slot time)" : "ATGH సర్కిల్ (కేటాయించిన సమయానికి)",
      dd: isEn
        ? "ATGH Circle (at allotted slot time after footpath trek)"
        : "ATGH సర్కిల్ (నడక మార్గం స్కానింగ్ పూర్తయ్యాక)",
    },
    {
      feature: isEn ? "ID Proof Requirement" : "గుర్తింపు కార్డు",
      ssd: isEn
        ? "Original Aadhaar Card (Biometric physical presence)"
        : "అసలు ఆధార్ కార్డు (బయోమెట్రిక్ కోసం వ్యక్తిగత హాజరు)",
      dd: isEn
        ? "Original Aadhaar Card (Biometric physical presence)"
        : "అసలు ఆధార్ కార్డు (బయోమెట్రిక్ కోసం వ్యక్తిగత హాజరు)",
    },
  ];

  const ssdLabel = isEn ? "SSD · Sarva Darshan" : "SSD · సర్వ దర్శనం";
  const ddLabel = isEn ? "DD · SSD Srivari Mettu" : "DD · SSD శ్రీవారి మెట్టు";
  const sameLabel = isEn ? "Same for both" : "రెండింటికీ ఒకటే";
  const line = isLight ? "border-slate-200" : "border-white/10";
  const soft = isLight ? "bg-slate-50" : "bg-[#0B0E14]";
  const GRID = "grid-cols-[160px_1fr_1fr] sm:grid-cols-[170px_1fr_1fr]";

  return (
    <section
      id="ssd-vs-dd-comparison"
      aria-labelledby="comparison-heading"
      className={`rounded-3xl border p-4 sm:p-6 mb-5 ${cardClass}`}
    >
      <div className="flex items-start gap-3 mb-5">
        <div className="rounded-xl bg-[#D4AF37]/15 p-2 shrink-0">
          <ArrowLeftRight className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <div>
          <h2 id="comparison-heading" className={`font-black text-lg sm:text-2xl tracking-tight ${headingClass}`}>
            {isEn ? "Difference Between SSD and DD Tokens in Tirumala" : "తిరుమల SSD మరియు DD టోకెన్ల మధ్య ముఖ్య తేడాలు"}
          </h2>
          <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${mutedClass}`}>
            {isEn
              ? "Understand what SSD and DD tokens mean, who they are for, and how the pedestrian footpath rules apply."
              : "స్లాటెడ్ సర్వ దర్శనం (SSD) మరియు దివ్య దర్శనం (DD) టోకెన్ల అర్థం, నిబంధనలు మరియు కాలినడక మార్గ నియమాలను తెలుసుకోండి."}
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div className={`rounded-2xl border p-4 ${isLight ? "bg-amber-50/60 border-amber-200" : "bg-[#141923] border-[#D4AF37]/30"}`}>
          <div className="flex items-center gap-2 mb-2">
            <Bus className="w-5 h-5 text-amber-500" />
            <h3 className={`font-black text-base ${headingClass}`}>{isEn ? "What is an SSD Token?" : "SSD టోకెన్ అంటే ఏమిటి?"}</h3>
          </div>
          <p className={`text-xs sm:text-sm leading-relaxed ${mutedClass}`}>
            {isEn ? (
              <>
                <strong className="text-amber-500">SSD (Slotted Sarva Darshan)</strong> is a free offline token for general pilgrims. It gives you a dedicated reporting time-slot at Tirumala so you avoid long waiting queues. You can reach Tirumala by bus, jeep, taxi, or walking.
              </>
            ) : (
              <>
                <strong className="text-amber-500">SSD (స్లాటెడ్ సర్వ దర్శనం)</strong> అనేది సాధారణ భక్తులందరికీ ఇచ్చే ఉచిత ఆఫ్‌లైన్ టోకెన్. దీని ద్వారా నిర్ణీత సమయంలో తిరుమలలో రిపోర్ట్ చేసి సులభంగా దర్శనం చేసుకోవచ్చు. మీరు బస్సు లేదా ఇతర వాహనాల ద్వారా తిరుమలకు చేరుకోవచ్చు.
              </>
            )}
          </p>
        </div>

        <div className={`rounded-2xl border p-4 ${isLight ? "bg-emerald-50/60 border-emerald-200" : "bg-[#101b1a] border-emerald-500/30"}`}>
          <div className="flex items-center gap-2 mb-2">
            <Footprints className="w-5 h-5 text-emerald-500" />
            <h3 className={`font-black text-base ${headingClass}`}>
              {isEn ? "What is a DD Token (SSD Srivari Mettu)?" : "DD టోకెన్ (SSD శ్రీవారి మెట్టు) అంటే ఏమిటి?"}
            </h3>
          </div>
          <p className={`text-xs sm:text-sm leading-relaxed ${mutedClass}`}>
            {isEn ? (
              <>
                <strong className="text-emerald-500">DD (Divya Darshan)</strong> is officially labelled as <strong className="text-[#D4AF37]">&apos;SSD Srivari Mettu&apos;</strong> on the physical token slips. It is meant exclusively for pedestrian pilgrims. Pilgrims need to walk via Srivari Mettu <span className="underline decoration-amber-400 font-bold">on the day of darshanam only</span> and must scan their token barcode at the 1200th step.
              </>
            ) : (
              <>
                <strong className="text-emerald-500">DD (దివ్య దర్శనం)</strong> టోకెన్ స్లిప్పులపై అధికారికంగా <strong className="text-[#D4AF37]">&apos;SSD Srivari Mettu&apos;</strong> అని ముద్రించబడుతుంది. భక్తులు తప్పనిసరిగా <span className="underline decoration-amber-400 font-bold">దర్శనం రోజున మాత్రమే</span> శ్రీవారి మెట్టు మార్గంలో నడవాలి మరియు 1200వ మెట్టు వద్ద టోకెన్‌ను స్కాన్ చేయించుకోవాలి.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="flex items-center gap-1.5 mb-3 sm:hidden text-[11px] font-semibold text-[#D4AF37]">
        <ArrowLeftRight className="w-3.5 h-3.5 shrink-0" />
        <span>
          {isEn
            ? "Swipe horizontally to compare SSD & DD columns"
            : "SSD & DD నిలువు వరుసలను పోల్చడానికి అడ్డంగా స్వైప్ చేయండి"}
        </span>
      </div>

      {/* Comparison Table with horizontal scroll on mobile */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 pb-1">
        <div className="min-w-[580px] space-y-2">
          {/* Column labels */}
          <div className={`grid ${GRID} gap-3 px-4 pb-2 text-[11px] font-black uppercase tracking-wider`}>
            <span className={mutedClass}>{isEn ? "Feature" : "అంశం"}</span>
            <span className="text-amber-500 flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5 shrink-0" />
              {ssdLabel}
            </span>
            <span className="text-emerald-500 flex items-center gap-1.5">
              <Footprints className="w-3.5 h-3.5 shrink-0" />
              {ddLabel}
            </span>
          </div>

          {/* Rows */}
          {rows.map((row) => {
            const same = row.ssd === row.dd;
            return (
              <div
                key={row.feature}
                className={`grid ${GRID} gap-3 rounded-xl border p-3.5 sm:p-4 items-center ${line} ${soft} ${
                  row.key ? "border-l-4 border-l-amber-500 shadow-sm" : ""
                }`}
              >
                <div className="flex flex-col justify-center">
                  <div className={`text-xs sm:text-sm font-extrabold leading-snug ${headingClass}`}>
                    {row.feature}
                  </div>
                  {same && (
                    <span className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 w-fit">
                      <Check className="w-2.5 h-2.5 text-[#D4AF37]" />
                      {sameLabel}
                    </span>
                  )}
                </div>

                <div className={`text-xs sm:text-sm leading-relaxed ${mutedClass}`}>
                  {row.ssd}
                </div>

                <div
                  className={`text-xs sm:text-sm leading-relaxed ${
                    row.key ? `${headingClass} font-semibold` : mutedClass
                  }`}
                >
                  {row.dd}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Warning */}
      <div
        className={`mt-4 flex items-start gap-2.5 rounded-xl border p-3 ${
          isLight ? "bg-amber-50 border-amber-200" : "bg-amber-500/10 border-amber-500/30"
        }`}
      >
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        <p className={`text-xs font-medium leading-relaxed ${isLight ? "text-amber-900" : "text-amber-300"}`}>
          {isEn
            ? "Important Note: DD tokens are printed as 'SSD Srivari Mettu' on your ticket slip. Pilgrims need to walk via Srivari Mettu on the day of darshanam only (not on the token collection day). If you travel to Tirumala by bus or car without scanning at the 1200th step, your token will be rejected at the ATGH entry counter."
            : "ముఖ్య గమనిక: DD టోకెన్ల స్లిప్‌పై 'SSD Srivari Mettu' అని ముద్రించబడి ఉంటుంది. భక్తులు టోకెన్ తీసుకున్న రోజు కాకుండా కేవలం దర్శనం రోజున మాత్రమే శ్రీవారి మెట్టు ద్వారా నడవాలి. 1200వ మెట్టు వద్ద స్కానింగ్ కాకపోతే తిరుమల ATGH కౌంటర్ వద్ద టోకెన్ అనుమతించబడదు."}
        </p>
      </div>
    </section>
  );
}
