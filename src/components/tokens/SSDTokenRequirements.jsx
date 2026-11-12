import React from "react";
import { Check, Footprints, ShieldCheck, Users } from "lucide-react";

const GROUPS = [
  {
    id: "all",
    icon: Users,
    accent: "amber",
    title: { en: "For every pilgrim", te: "ప్రతి భక్తునికీ" },
    items: [
      { en: "Carry the original Aadhaar card.", te: "అసలు (ఒరిజినల్) ఆధార్ కార్డును వెంట తీసుకెళ్లండి." },
      { en: "Each person must physically stand in the queue to obtain a token.", te: "టోకెన్ పొందడానికి ప్రతి వ్యక్తి స్వయంగా క్యూలో నిలబడాలి." },
      { en: "Children below 12 years do not require tokens and are permitted with token-holding parents.", te: "12 సంవత్సరాల లోపు పిల్లలకు టోకెన్ అవసరం లేదు; తల్లిదండ్రులతో పాటు అనుమతిస్తారు." },
      { en: "The token specifies the assigned reporting date and time for darshan.", te: "టోకెన్‌పై దర్శనానికి కేటాయించిన రిపోర్టింగ్ తేదీ మరియు సమయం ఉంటాయి." },
    ],
  },
  {
    id: "dd",
    icon: Footprints,
    accent: "emerald",
    title: { en: "If you hold a DD token", te: "DD టోకెన్ ఉన్నవారికి" },
    items: [
      { en: "DD tokens are officially printed as 'SSD Srivari Mettu' on token slips.", te: "DD టోకెన్లపై 'SSD Srivari Mettu' అని అధికారికంగా ముద్రించబడి ఉంటుంది." },
      { en: "DD token holders must walk to Srivari Mettu on the day of darshanam only.", te: "DD టోకెన్ దారులు దర్శనం రోజున మాత్రమే శ్రీవారి మెట్టు ద్వారా నడవాలి." },
      { en: "DD token holders must scan their token at the 1200th step checkpoint on the day of darshan.", te: "దర్శనం రోజున 1200వ మెట్టు వద్ద టోకెన్ స్కాన్ చేయించుకోవాలి." },
    ],
  },
];

const ACCENT = {
  amber: { icon: "bg-amber-500/15 text-amber-500", tick: "bg-amber-500/15 text-amber-500", label: "text-amber-500" },
  emerald: { icon: "bg-emerald-500/15 text-emerald-500", tick: "bg-emerald-500/15 text-emerald-500", label: "text-emerald-500" },
};

export default function SSDTokenRequirements({
  isLight,
  cardClass,
  headingClass,
  mutedClass,
  text,
  lang = "en",
}) {
  const l = lang === "te" ? "te" : "en";

  return (
    <section className={`rounded-3xl border p-4 sm:p-6 mb-5 ${cardClass}`}>
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
        <h2 className={`font-black text-lg ${headingClass}`}>{text.requirements}</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {GROUPS.map((group) => {
          const a = ACCENT[group.accent];
          const Icon = group.icon;
          return (
            <div
              key={group.id}
              className={`rounded-2xl border p-4 ${isLight ? "bg-slate-50 border-slate-200" : "bg-[#0B0E14] border-white/10"}`}
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span className={`grid h-8 w-8 place-items-center rounded-lg ${a.icon}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className={`text-sm font-extrabold ${headingClass}`}>{group.title[l]}</h3>
              </div>

              <ul className="space-y-2.5">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${a.tick}`}>
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className={`text-sm leading-relaxed ${mutedClass}`}>{item[l]}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
