import React from "react";
import { AlertTriangle, CheckCircle2, Info, Radio } from "lucide-react";
import { TOKEN_INFO } from "../../data/tokenInfo";
import { formatTokenDateTime, formatTokenTime } from "../../utils/tokenUtils";

const toNum = (v) => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(String(v).replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
};
const fmt = (v) => {
  const n = toNum(v);
  return n === null ? String(v ?? "—") : n.toLocaleString("en-IN");
};

const ACCENT = {
  ssd: { badge: "bg-amber-500/15 text-amber-500", bar: "bg-amber-500", top: "from-amber-500" },
  dd: { badge: "bg-emerald-500/15 text-emerald-500", bar: "bg-emerald-500", top: "from-emerald-500" },
};

function LiveTokenCard({
  kind, isLight, headingClass, mutedClass, status, isNoIssuance, hasObservation,
  tokenLoading, latestObservation, tokenDay, quotaKey, remainingKey, completedAt, text, lang,
}) {
  const info = TOKEN_INFO[kind];
  const a = ACCENT[kind];
  const te = lang === "te";
  const state = isNoIssuance ? "none" : status === "completed" ? "done" : status === "active" ? "live" : "wait";

  const pill = {
    none: [te ? "జారీ లేదు" : "No issuance", "bg-slate-500/10 text-slate-500", "bg-slate-400"],
    done: [te ? "పూర్తయింది" : "Completed", "bg-green-500/10 text-green-500", "bg-green-500"],
    live: [te ? "అందుబాటులో" : "Live", "bg-green-500/10 text-green-500", "bg-green-500 animate-pulse"],
    wait: [text.noData, "bg-slate-500/10 text-slate-500", "bg-slate-400"],
  }[state];

  const remainingRaw = latestObservation?.[remainingKey] ?? tokenDay?.[quotaKey];
  const quota = toNum(tokenDay?.[quotaKey]);
  const remaining = toNum(remainingRaw);
  const pct = state === "live" && quota && remaining !== null ? Math.max(0, Math.min(100, (remaining / quota) * 100)) : null;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 ${
        isLight ? "bg-slate-50 border-slate-200" : "bg-[#0B0E14] border-white/10"
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${a.top} to-transparent`} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-black ${a.badge}`}>
            {info.shortName}
          </span>
          <p className={`font-extrabold text-sm leading-tight ${headingClass}`}>{info.name}</p>
        </div>
        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${pill[1]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${pill[2]}`} />
          {pill[0]}
        </span>
      </div>

      <div className="mt-6 min-h-[88px]">
        {tokenLoading ? (
          <p className={`text-4xl font-black ${headingClass}`}>…</p>
        ) : state === "none" ? (
          <p className={`text-3xl font-black ${mutedClass}`}>{te ? "ఈరోజు జారీ లేదు" : "None today"}</p>
        ) : state === "done" ? (
          <>
            <p className="flex items-center gap-2.5 text-2xl sm:text-3xl font-serif font-bold tracking-wide text-green-500">
              <CheckCircle2 className="h-7 w-7 shrink-0" />
              <span>{te ? "పూర్తయింది" : "Completed"}</span>
            </p>
            {completedAt && (
              <p className={`mt-1 text-xs font-semibold ${mutedClass}`}>
                {te ? "సమయం" : "at"} {formatTokenTime(completedAt)} IST
              </p>
            )}
          </>
        ) : (
          <>
            <p className={`text-5xl font-black tabular-nums tracking-tight ${headingClass}`}>
              {remainingRaw === undefined || remainingRaw === null ? "—" : fmt(remainingRaw)}
            </p>
            <p className={`mt-1 text-xs font-semibold ${mutedClass}`}>
              {state === "live"
                ? `${te ? "మిగిలిన టోకెన్లు" : "tokens left"}${quota ? ` · ${te ? "మొత్తం" : "of"} ${fmt(quota)}` : ""}`
                : hasObservation
                ? te ? "అందుబాటులో లేదు" : "Unavailable"
                : te ? "ఈరోజు జారీ ఇంకా ప్రారంభం కాలేదు" : "Awaiting today's issuance"}
            </p>
          </>
        )}
      </div>

      {pct !== null && (
        <div className={`mt-3 h-2 w-full overflow-hidden rounded-full ${isLight ? "bg-slate-200" : "bg-white/10"}`}>
          <div className={`h-full rounded-full transition-all duration-700 ${a.bar}`} style={{ width: `${pct}%` }} />
        </div>
      )}
    </div>
  );
}

export default function SSDTokenLiveStatus({
  isLight, cardClass, headingClass, mutedClass, text, lang, tokenDay, latestObservation,
  tokenLoading, ssdStatus, ddStatus, isNoIssuance, isTodayWednesday, hasObservation, liveSource,
}) {
  const asDate = (v) => (v ? new Date(v) : null);
  const started = asDate(tokenDay?.issuance_started_at);
  const lastUpdated = asDate(latestObservation?.observed_at);
  const shared = { isLight, headingClass, mutedClass, isNoIssuance, hasObservation, tokenLoading, latestObservation, tokenDay, text, lang };

  return (
    <section id="live-status" className={`scroll-mt-24 rounded-3xl border p-4 sm:p-6 mb-5 ${cardClass}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-4">
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-[#FF5722]" />
          <h2 className={`font-black text-lg ${headingClass}`}>{text.liveStatus}</h2>
        </div>
        <div className={`flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold ${mutedClass}`}>
          {started && <span>{lang === "te" ? "జారీ ప్రారంభం" : "Started"} {formatTokenTime(started)} IST</span>}
          {lastUpdated && <span>{text.lastUpdated}: {formatTokenDateTime(lastUpdated)} IST</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <LiveTokenCard {...shared} kind="ssd" status={ssdStatus} quotaKey="ssd_quota" remainingKey="ssd_remaining" completedAt={asDate(tokenDay?.ssd_completed_at)} />
        <LiveTokenCard {...shared} kind="dd" status={ddStatus} quotaKey="dd_quota" remainingKey="dd_remaining" completedAt={asDate(tokenDay?.dd_completed_at)} />
      </div>

      <div
        className={`mt-4 flex gap-3 rounded-xl border p-3 ${
          isNoIssuance
            ? isLight ? "bg-amber-50 border-amber-200" : "bg-amber-500/10 border-amber-500/30"
            : isLight ? "bg-green-50 border-green-200" : "bg-green-500/5 border-green-500/20"
        }`}
      >
        {isNoIssuance ? (
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        ) : (
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
        )}
        <p className={`text-xs leading-relaxed ${isNoIssuance ? (isLight ? "font-semibold text-amber-900" : "font-semibold text-amber-200") : mutedClass}`}>
          {isNoIssuance
            ? isTodayWednesday ? text.wednesdayNotice : text.genericNoIssuanceNotice
            : text.awaiting}
        </p>
      </div>
    </section>
  );
}