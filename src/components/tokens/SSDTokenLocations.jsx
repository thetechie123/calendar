import React from "react";
import { AlertTriangle, ExternalLink, MapPin } from "lucide-react";
import { TOKEN_INFO } from "../../data/tokenInfo";

function TokenCentre({
  centre,
  cardClass,
  headingClass,
  mutedClass,
}) {
  return (
    <div
      className={`tv-card-hover rounded-xl border p-4 ${cardClass}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
          </div>

          <div className="min-w-0">
            <h4 className={`font-extrabold text-sm ${headingClass}`}>
              {centre.name}
            </h4>

            <p className={`text-xs mt-1 ${mutedClass}`}>
              {centre.location}
            </p>
          </div>
        </div>

        {centre.mapUrl && (
          <a
            href={centre.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3 py-2 rounded-lg bg-[#FF5722] text-white text-xs font-extrabold flex items-center gap-1 hover:bg-[#e64a19] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Map
          </a>
        )}
      </div>
    </div>
  );
}

export default function SSDTokenLocations({
  cardClass,
  headingClass,
  mutedClass,
  text,
  isLight,
  isBrahmotsavamPause,
  lang = "en",
}) {
  const renderCentre = (centre) => (
    <TokenCentre
      key={centre.id}
      centre={centre}
      cardClass={cardClass}
      headingClass={headingClass}
      mutedClass={mutedClass}
    />
  );

  return (
    <section className="mb-5">
      <div className="flex items-center gap-2 mb-3 px-1">
        <MapPin className="w-5 h-5 text-[#D4AF37]" />

        <h2 className={`font-black text-lg ${headingClass}`}>
          {text.where}
        </h2>
      </div>

      {isBrahmotsavamPause && (
        <div
          className={`mb-4 rounded-xl border p-3.5 flex items-start gap-3 ${
            isLight
              ? "bg-amber-50 border-amber-300 text-amber-900"
              : "bg-amber-500/10 border-amber-500/30 text-amber-200"
          }`}
        >
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
            {lang === "te"
              ? "శ్రీవారి నవరాత్రి బ్రహ్మోత్సవాల సందర్భంగా అక్టోబర్ 10 నుండి 21, 2026 వరకు భూదేవి కాంప్లెక్స్, శ్రీనివాసం మరియు విష్ణు నివాసం కౌంటర్లలో SSD మరియు DD టోకెన్ల జారీ ఉండదు. అక్టోబర్ 23 దర్శనం టోకెన్లు అక్టోబర్ 22 సాయంత్రం 4:00 గంటలకు ప్రారంభమవుతాయి."
              : "Notice: Token counters at Bhudevi Complex, Srinivasam, and Vishnu Nivasam will not issue SSD & DD tokens from Oct 10 to Oct 21, 2026 for Srivari Navaratri Brahmotsavams. Issuance for Oct 23 darshan will resume at 4:00 PM on Oct 22, 2026."}
          </p>
        </div>
      )}

      <div
        className={`rounded-2xl border p-5 sm:p-6 mb-4 ${cardClass}`}
      >
        <h3 className={`font-black text-base mb-3 ${headingClass}`}>
          {TOKEN_INFO.ssd.name} (SSD)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TOKEN_INFO.ssd.centres.map(renderCentre)}
        </div>
      </div>

      <div className={`rounded-2xl border p-5 sm:p-6 ${cardClass}`}>
        <h3 className={`font-black text-base mb-2 ${headingClass}`}>
          {TOKEN_INFO.dd.name} (DD)
        </h3>

        <p className={`text-xs mb-3 ${mutedClass}`}>
          DD tokens are issued at a separate counter at Bhudevi Complex.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TOKEN_INFO.dd.centres.map(renderCentre)}
        </div>
      </div>
    </section>
  );
}
