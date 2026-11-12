import React from "react";
import { Activity, AlertTriangle, Clock } from "lucide-react";
import { formatTokenTime, getActivityTokenValues } from "../../utils/tokenUtils";

function Empty({ icon: Icon, iconClass = "text-slate-400", title, body, isLight, headingClass, mutedClass, tone }) {
  const border =
    tone === "error"
      ? isLight ? "border-red-200 bg-red-50" : "border-red-500/20 bg-red-500/5"
      : isLight ? "border-slate-300 bg-slate-50" : "border-white/10 bg-[#0B0E14]";
  return (
    <div className={`rounded-xl border border-dashed p-6 text-center ${border}`}>
      <Icon className={`mx-auto mb-2 h-7 w-7 ${iconClass}`} />
      <p className={`text-sm font-bold ${headingClass}`}>{title}</p>
      {body && <p className={`mt-1 text-xs ${mutedClass}`}>{body}</p>}
    </div>
  );
}

function ValueChip({ label, value, isLight, mutedClass, lang }) {
  const isCompleted = value === "Completed" || value === "పూర్తయింది";
  const displayVal = isCompleted
    ? (lang === "te" ? "పూర్తయింది" : "Completed")
    : (value ?? "—");
  const isDash = displayVal === "—";

  return (
    <div
      className={`flex items-center justify-between gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-colors ${
        isCompleted
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
          : isLight
          ? "bg-slate-100 text-slate-800 border border-slate-200/80"
          : "bg-white/5 text-white/90 border border-white/10"
      }`}
    >
      <span
        className={`text-[10px] font-black uppercase tracking-wider shrink-0 ${
          isCompleted ? "text-emerald-600 dark:text-emerald-400" : mutedClass
        }`}
      >
        {label}
      </span>
      <span
        className={`tabular-nums font-extrabold text-right truncate ${
          isDash
            ? isLight
              ? "text-slate-400"
              : "text-white/30"
            : isCompleted
            ? "text-[11px]"
            : ""
        }`}
      >
        {displayVal}
      </span>
    </div>
  );
}

export default function SSDTokenActivity({
  isLight, cardClass, headingClass, mutedClass, text, lang,
  tokenLoading, tokenError, activityEvents, tokenDay, isNoIssuance, isTodayWednesday,
}) {
  const te = lang === "te";
  const events = [...(activityEvents || [])].reverse(); // latest first
  const ui = { isLight, headingClass, mutedClass };

  return (
    <section id="activity" className={`scroll-mt-24 rounded-3xl border p-4 sm:p-6 mb-5 ${cardClass}`}>
      <div className="mb-1 flex items-center gap-2">
        <Activity className="h-5 w-5 text-[#D4AF37]" />
        <h2 className={`font-black text-lg ${headingClass}`}>{text.todayActivity}</h2>
      </div>
      <p className={`mb-5 text-xs ${mutedClass}`}>
        {te ? "తాజా నవీకరణలు మొదట చూపబడతాయి." : "Latest updates first. Times are in IST."}
      </p>

      {tokenLoading ? (
        <Empty {...ui} icon={Clock} title="Loading today's token activity..." />
      ) : tokenError ? (
        <Empty {...ui} tone="error" icon={AlertTriangle} iconClass="text-red-500" title="Unable to load token activity" body="Please try again later." />
      ) : events.length === 0 ? (
        <Empty
          {...ui}
          icon={Clock}
          title={isNoIssuance ? "No Token Issuance Today" : "No activity recorded yet"}
          body={
            isTodayWednesday
              ? text.wednesdayNotice
              : isNoIssuance
              ? text.genericNoIssuanceNotice
              : "No SSD/DD token activity has been recorded for today."
          }
        />
      ) : (
        <ol>
          {events.map((event, i) => {
            const { ssdValue, ddValue } = getActivityTokenValues({ event, tokenDay });
            const completed = ssdValue === "Completed" || ddValue === "Completed";
            const isLast = i === events.length - 1;
            return (
              <li key={event.id} className={`relative pl-7 ${isLast ? "" : "pb-5"}`}>
                {!isLast && (
                  <span className={`absolute left-[5px] top-4 bottom-0 w-px ${isLight ? "bg-slate-200" : "bg-white/10"}`} />
                )}
                <span
                  className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full ring-4 ${
                    completed ? "bg-emerald-500 ring-emerald-500/20" : "bg-[#D4AF37] ring-[#D4AF37]/20"
                  } ${isLight ? "bg-white" : "bg-[#111722]"}`}
                />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className={`text-sm font-extrabold ${headingClass}`}>{event.title}</p>
                    <p className={`text-xs ${mutedClass}`}>
                      <span className="font-bold tabular-nums">{formatTokenTime(event.time)} IST</span>
                      {event.label ? ` · ${event.label}` : ""}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full sm:w-60 shrink-0">
                    <ValueChip label="SSD" value={ssdValue} isLight={isLight} mutedClass={mutedClass} lang={lang} />
                    <ValueChip label="DD" value={ddValue} isLight={isLight} mutedClass={mutedClass} lang={lang} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
