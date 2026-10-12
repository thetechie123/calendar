import React, { useState } from 'react';
import { Calendar, Clock, Sun, Moon, Sparkles, Filter, List, Table as TableIcon } from 'lucide-react';
import { BRAHMOTSAVAM_DAYS_2026 } from '../../data/brahmotsavamData';

// Helper to check if a date is today in Indian Standard Time (IST)
function isDateTodayIST(dateStr) {
  try {
    const todayStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
    return todayStr === dateStr;
  } catch {
    return false;
  }
}

export default function BrahmotsavamFullSchedule({
  lang = 'en',
  isLight = false,
  onNavigateToCalendarSearch
}) {
  const isEn = lang === 'en';
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  const [selectedDayNum, setSelectedDayNum] = useState('all'); // 'all' or dayNum (0-10)

  const filteredDays = selectedDayNum === 'all'
    ? BRAHMOTSAVAM_DAYS_2026
    : BRAHMOTSAVAM_DAYS_2026.filter(d => d.dayNum === Number(selectedDayNum));

  const cardBorder = isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-[#111722]';
  const headingText = isLight ? 'text-slate-900' : 'text-white';
  const mutedText = isLight ? 'text-slate-600' : 'text-slate-400';

  return (
    <section className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className={`w-5 h-5 ${isLight ? 'text-amber-600' : 'text-[#FFD700]'}`} />
            <h2 className={`font-serif text-2xl sm:text-3xl font-extrabold ${headingText}`}>
              {isEn ? 'Full Brahmotsavam Schedule 2026' : 'బ్రహ్మోత్సవాల పూర్తి షెడ్యూల్ 2026'}
            </h2>
          </div>
          <p className={`text-xs sm:text-sm mt-1 font-medium ${mutedText}`}>
            {isEn
              ? 'Complete timetable of rituals, morning & evening Vahana Sevas, and Sarvadarsanam timings (Oct 11 – Oct 21, 2026).'
              : 'అక్టోబర్ 11 నుండి 21 వరకు జరిగే అన్ని పూజలు, ఉదయ-సాయంత్ర వాహన సేవలు మరియు సర్వదర్శనం సమయాల పూర్తి వివరాలు.'}
          </p>
        </div>

        {/* View Toggle & Filter */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          {/* Day Quick Filter */}
          <div className="flex items-center gap-1">
            <select
              value={selectedDayNum}
              onChange={(e) => setSelectedDayNum(e.target.value)}
              className={`text-xs font-bold px-3 py-2 rounded-xl border outline-none cursor-pointer ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-800 focus:border-amber-500'
                  : 'bg-[#141923] border-white/20 text-[#FFD700] focus:border-[#D4AF37]'
              }`}
              aria-label="Filter by day"
            >
              <option value="all">{isEn ? 'All 10 Days' : 'అన్ని 10 రోజులు'}</option>
              {BRAHMOTSAVAM_DAYS_2026.map(d => (
                <option key={d.dayNum} value={d.dayNum}>
                  {d.dayNum === 0
                    ? (isEn ? 'Oct 11 - Ankurarpanam' : 'అక్టో 11 - అంకురార్పణం')
                    : d.dayNum === 10
                    ? (isEn ? 'Oct 21 - Parveta' : 'అక్టో 21 - పార్వేట')
                    : (isEn ? `Oct ${d.date.slice(8)} - Day ${d.dayNum}` : `అక్టో ${d.date.slice(8)} - ${d.dayNum}వ రోజు`)}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle View Mode */}
          <div className={`p-1 rounded-xl border flex items-center gap-1 ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#0B0E14] border-white/10'
          }`}>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                viewMode === 'cards'
                  ? 'bg-amber-500 text-black shadow font-extrabold'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{isEn ? 'Cards' : 'కార్డులు'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                viewMode === 'table'
                  ? 'bg-amber-500 text-black shadow font-extrabold'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{isEn ? 'Table' : 'పట్టిక'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: COMPACT TABLE */}
      {viewMode === 'table' ? (
        <div className={`overflow-x-auto rounded-2xl border ${cardBorder} shadow-lg`}>
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className={isLight ? 'bg-amber-50/80 border-b border-slate-200' : 'bg-[#0B0E14] border-b border-white/10'}>
                <th className={`p-3.5 text-xs font-black uppercase tracking-wider ${headingText}`}>
                  {isEn ? 'Date & Day' : 'తేదీ & వారం'}
                </th>
                <th className={`p-3.5 text-xs font-black uppercase tracking-wider ${headingText}`}>
                  {isEn ? 'Occasion / Title' : 'ఉత్సవ ఘట్టం'}
                </th>
                <th className={`p-3.5 text-xs font-black uppercase tracking-wider text-amber-500`}>
                  {isEn ? 'Morning Procession' : 'ఉదయపు సేవ'}
                </th>
                <th className={`p-3.5 text-xs font-black uppercase tracking-wider text-purple-400`}>
                  {isEn ? 'Night Procession' : 'రాత్రి సేవ'}
                </th>
                <th className={`p-3.5 text-xs font-black uppercase tracking-wider text-emerald-500`}>
                  {isEn ? 'Sarvadarsanam' : 'సర్వదర్శనం'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5">
              {filteredDays.map((day) => {
                const isToday = isDateTodayIST(day.date);
                return (
                  <tr
                    key={day.dayNum}
                    className={`transition-colors ${
                      isToday
                        ? isLight
                          ? 'bg-amber-100/50 font-medium'
                          : 'bg-[#FFD700]/10 font-medium'
                        : isLight
                        ? 'hover:bg-slate-50'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Date */}
                    <td className="p-3.5 align-top">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-black whitespace-nowrap">
                          {day.date}
                        </span>
                        {isToday && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-500 text-black">
                            TODAY
                          </span>
                        )}
                      </div>
                      <div className={`text-[11px] ${mutedText}`}>
                        {isEn ? day.dayNameEn : day.dayNameTe}
                      </div>
                    </td>

                    {/* Title */}
                    <td className="p-3.5 align-top">
                      <div className={`text-xs sm:text-sm font-bold ${headingText}`}>
                        {isEn ? day.titleEn : day.titleTe}
                      </div>
                      <div className="text-[11px] text-amber-500/90 mt-0.5">
                        {day.highlight}
                      </div>
                    </td>

                    {/* Morning */}
                    <td className="p-3.5 align-top text-xs">
                      {day.morningVahanaEn ? (
                        <div>
                          <div className={`font-semibold ${headingText}`}>
                            {isEn ? day.morningVahanaEn : day.morningVahanaTe}
                          </div>
                          {day.morningTime && (
                            <div className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                              ⏱️ {day.morningTime}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className={`text-[11px] italic ${mutedText}`}>—</span>
                      )}
                    </td>

                    {/* Night */}
                    <td className="p-3.5 align-top text-xs">
                      {day.nightVahanaEn ? (
                        <div>
                          <div className={`font-semibold ${headingText}`}>
                            {isEn ? day.nightVahanaEn : day.nightVahanaTe}
                          </div>
                          {day.nightTime && (
                            <div className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 mt-0.5">
                              ⏱️ {day.nightTime}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className={`text-[11px] italic ${mutedText}`}>—</span>
                      )}
                    </td>

                    {/* Darshan */}
                    <td className="p-3.5 align-top text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                      {day.sarvadarsanamTimings || 'Regular Hours'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* VIEW MODE 2: DETAILED DAY-BY-DAY CARDS (NO IMAGES) */
        <div className="space-y-4">
          {filteredDays.map((day) => {
            const isToday = isDateTodayIST(day.date);

            return (
              <article
                key={day.dayNum}
                className={`rounded-2xl border p-5 sm:p-6 transition-all shadow-md ${
                  isToday
                    ? isLight
                      ? 'border-amber-400 bg-amber-50/40 ring-2 ring-amber-300'
                      : 'border-[#FFD700] bg-[#141923] ring-1 ring-[#FFD700]/50'
                    : cardBorder
                }`}
              >
                {/* Day Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                      isToday
                        ? 'bg-amber-500 text-black'
                        : isLight
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/40'
                    }`}>
                      {day.dayNum === 0
                        ? (isEn ? 'Prelude Rites' : 'ప్రారంభం')
                        : day.dayNum === 10
                        ? (isEn ? 'Vijayadasami' : 'విజయదశమి')
                        : (isEn ? `Day ${day.dayNum}` : `${day.dayNum}వ రోజు`)}
                    </span>

                    <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                      📅 {day.date} ({isEn ? day.dayNameEn : day.dayNameTe})
                    </span>

                    {isToday && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                        ● {isEn ? 'Happening Today' : 'ఈరోజు జరుగుతోంది'}
                      </span>
                    )}
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${
                    isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-black/30 text-amber-300 border-white/10'
                  }`}>
                    {isEn ? day.badgeEn : day.badgeTe}
                  </span>
                </div>

                {/* Day Title & Highlight */}
                <div className="mb-4">
                  <h3 className={`font-serif text-lg sm:text-xl font-black ${headingText}`}>
                    {isEn ? day.titleEn : day.titleTe}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-600 dark:text-[#FFD700]/90 font-medium mt-1">
                    ✨ {day.highlight}
                  </p>
                </div>

                {/* Morning & Night Procession Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Morning Seva */}
                  <div className={`p-4 rounded-xl border ${
                    isLight
                      ? 'bg-amber-50/60 border-amber-200/80'
                      : 'bg-black/40 border-amber-500/20'
                  }`}>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                        <Sun className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-wider">
                          {isEn ? 'Morning Procession' : 'ఉదయపు సేవ'}
                        </span>
                      </div>
                      {day.morningTime && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                          ⏱️ {day.morningTime}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm font-bold ${headingText}`}>
                      {day.morningVahanaEn
                        ? (isEn ? day.morningVahanaEn : day.morningVahanaTe)
                        : (isEn ? 'No Morning Procession' : 'ఉదయం ఊరేగింపు లేదు')}
                    </p>
                  </div>

                  {/* Night Seva */}
                  <div className={`p-4 rounded-xl border ${
                    isLight
                      ? 'bg-purple-50/60 border-purple-200/80'
                      : 'bg-black/40 border-purple-500/20'
                  }`}>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                        <Moon className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-wider">
                          {isEn ? 'Night Procession' : 'రాత్రి సేవ'}
                        </span>
                      </div>
                      {day.nightTime && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                          ⏱️ {day.nightTime}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm font-bold ${headingText}`}>
                      {day.nightVahanaEn
                        ? (isEn ? day.nightVahanaEn : day.nightVahanaTe)
                        : (isEn ? 'No Night Procession' : 'రాత్రి ఊరేగింపు లేదు')}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Sarvadarsanam Hours & Agamic Rites */}
                <div className={`p-3.5 rounded-xl border space-y-2 text-xs ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/20 border-white/10'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{isEn ? 'Sarvadarsanam Hours:' : 'సర్వదర్శనం సమయాలు:'}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      {day.sarvadarsanamTimings || 'Regular schedule'}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 dark:border-white/10 pt-2 flex items-start gap-1.5 text-[11px] leading-relaxed">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className={mutedText}>
                      <strong className={headingText}>{isEn ? 'Special Rituals:' : 'ప్రత్యేక క్రతువులు:'}</strong>{' '}
                      {isEn ? day.specialRitualsEn : day.specialRitualsTe}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
