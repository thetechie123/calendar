import React, { useState } from "react";
import { ChevronDown, Clock, History } from "lucide-react";
import { formatTokenDate, formatTokenTime, getHistoryDayDetails } from "../../utils/tokenUtils";

const INITIAL_DAYS = 7;

function DayChip({ label, completedAt, remaining, isLight, mutedClass }) {
  const done = Boolean(completedAt);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold ${
        done
          ? "bg-green-500/10 text-green-600"
          : isLight ? "bg-slate-100 text-slate-800" : "bg-white/5 text-white"
      }`}
    >
      <span className={`text-[10px] font-black ${done ? "" : mutedClass}`}>{label}</span>
      <span className="tabular-nums">{done ? "Completed" : remaining ?? "—"}</span>
      {done && <span className="text-[10px] font-semibold opacity-80">{formatTokenTime(completedAt)}</span>}
    </span>
  );
}

export default function SSDTokenHistory({
  isLight, cardClass, headingClass, mutedClass, text, lang, history = [], historyLoading,
}) {
  const [showAll, setShowAll] = useState(false);
  const te = lang === "te";
  const rows = showAll ? history : history.slice(0, INITIAL_DAYS);
  const line = isLight ? "border-slate-200" : "border-white/10";

  const empty = (Icon, title, body) => (
    <div className={`rounded-xl border border-dashed p-6 text-center ${isLight ? "border-slate-300 bg-slate-50" : "border-white/10 bg-[#0B0E14]"}`}>
      <Icon className="mx-auto mb-2 h-7 w-7 text-slate-400" />
      <p className={`text-sm font-bold ${headingClass}`}>{title}</p>
      {body && <p className={`mt-1 text-xs ${mutedClass}`}>{body}</p>}
    </div>
  );

  return (
    <section id="history" className={`scroll-mt-24 rounded-3xl border p-4 sm:p-6 ${cardClass}`}>
      <div className="mb-1 flex items-center gap-2">
        <History className="h-5 w-5 text-[#D4AF37]" />
        <h2 className={`font-black text-lg ${headingClass}`}>{text.history}</h2>
      </div>
      <p className={`mb-4 text-xs ${mutedClass}`}>
        {te
          ? "గత టోకెన్ జారీ రోజులు మరియు నమోదైన వివరాలు."
          : "Previous token issuance days and their recorded observations."}
      </p>

      {historyLoading ? (
        empty(Clock, "Loading token history...")
      ) : history.length === 0 ? (
        empty(History, text.noHistory, text.noHistoryText)
      ) : (
        <>
          <ul>
            {rows.map((day) => {
              const { observations, lastObservation, historyStatus } = getHistoryDayDetails(day);
              const dot =
                historyStatus === "COMPLETED" ? "bg-green-500" : historyStatus === "RECORDED" ? "bg-blue-500" : "bg-slate-400";
              return (
                <li
                  key={day.id}
                  className={`flex flex-col gap-2.5 border-t py-3.5 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between ${line}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} title={historyStatus} />
                    <div>
                      <p className={`text-sm font-black ${headingClass}`}>{formatTokenDate(day.issuance_date)}</p>
                      <p className={`text-[11px] ${mutedClass}`}>
                        {day.issuance_started_at
                          ? `${te ? "ప్రారంభం" : "Started"} ${formatTokenTime(day.issuance_started_at)} IST`
                          : te ? "ప్రారంభ సమయం నమోదు కాలేదు" : "Start not recorded"}
                        {" · "}
                        {observations.length} {te ? "పరిశీలనలు" : observations.length === 1 ? "observation" : "observations"}
                        {lastObservation ? ` · ${te ? "చివరిది" : "last"} ${formatTokenTime(lastObservation.observed_at)}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-[22px] sm:pl-0">
                    <DayChip label="SSD" completedAt={day.ssd_completed_at} remaining={lastObservation?.ssd_remaining} isLight={isLight} mutedClass={mutedClass} />
                    <DayChip label="DD" completedAt={day.dd_completed_at} remaining={lastObservation?.dd_remaining} isLight={isLight} mutedClass={mutedClass} />
                  </div>
                </li>
              );
            })}
          </ul>

          {history.length > INITIAL_DAYS && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className={`mx-auto mt-3 flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold ${line} ${headingClass}`}
            >
              {showAll
                ? te ? "తక్కువ చూపించు" : "Show fewer days"
                : te ? `అన్ని ${history.length} రోజులు చూపించు` : `Show all ${history.length} days`}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          )}
        </>
      )}
    </section>
  );
}
