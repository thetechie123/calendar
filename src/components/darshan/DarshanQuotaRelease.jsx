import React from 'react';
import {
  Calendar,
  Clock,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  MapPin
} from 'lucide-react';

export default function DarshanQuotaRelease({ topic, lang = 'en', isLight = false }) {
  const isTe = lang === 'te';
  const quota = topic.quotaRelease;

  if (!quota) {
    return (
      <section className={`p-6 sm:p-7 rounded-3xl border shadow-xl mb-8 ${
        isLight
          ? 'bg-white border-amber-200'
          : 'bg-[#141923] border-[#D4AF37]/30'
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className={`w-5 h-5 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
          <h2 className={`font-serif text-lg sm:text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {isTe ? 'కోటా విడుదల సమాచారం' : 'Quota Release Schedule'}
          </h2>
        </div>
        <p className={`text-sm font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          {isTe
            ? 'తదుపరి విడుదల షెడ్యూల్ ఇంకా అధికారికంగా ధృవీకరించబడలేదు. అధికారిక టీటీడీ ప్రకటనలను గమనించండి.'
            : 'The next release schedule has not been officially confirmed. Check the official TTD announcements.'}
        </p>
      </section>
    );
  }

  const {
    status,
    applicableMonth,
    applicableMonthTe,
    releaseDateTimeIST,
    releaseDateTimeISTTe,
    officialSource,
    officialSourceTe,
    lastVerified,
    bookingPortal,
    fallbackMessageEn,
    fallbackMessageTe,
    notesEn,
    notesTe,
    isEstimate
  } = quota;

  // Status Styling & Labeling
  const getStatusBadge = () => {
    switch (status) {
      case 'confirmed':
        return {
          bg: isLight
            ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
            : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
          dot: 'bg-emerald-500',
          labelEn: 'Official Confirmed Schedule',
          labelTe: 'ధృవీకరించబడిన అధికారిక షెడ్యూల్'
        };
      case 'offline_daily':
        return {
          bg: isLight
            ? 'bg-cyan-100 border-cyan-300 text-cyan-900'
            : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300',
          dot: 'bg-cyan-500',
          labelEn: 'Daily Physical Counters (Offline)',
          labelTe: 'రోజువారీ ప్రత్యక్ష కౌంటర్లు (ఆఫ్‌లైన్)'
        };
      case 'walkin_daily':
        return {
          bg: isLight
            ? 'bg-blue-100 border-blue-300 text-blue-900'
            : 'bg-blue-500/20 border-blue-500/40 text-blue-300',
          dot: 'bg-blue-500',
          labelEn: 'Continuous Walk-in Queue',
          labelTe: 'నిరంతర ప్రత్యక్ష క్యూ మార్గం'
        };
      case 'estimated':
        return {
          bg: isLight
            ? 'bg-purple-100 border-purple-300 text-purple-900'
            : 'bg-purple-500/20 border-purple-500/40 text-purple-300',
          dot: 'bg-purple-500',
          labelEn: 'Estimated — Unconfirmed',
          labelTe: 'అంచనా వేయబడినది — అధికారికం కాదు'
        };
      case 'past':
        return {
          bg: isLight
            ? 'bg-slate-100 border-slate-300 text-slate-800'
            : 'bg-slate-500/20 border-slate-500/40 text-slate-300',
          dot: 'bg-slate-500',
          labelEn: 'Past Announcement (Awaiting Next Cycle)',
          labelTe: 'గత ప్రకటన (తదుపరి విడుదల కొరకు నిరీక్షణ)'
        };
      case 'not_announced':
      default:
        return {
          bg: isLight
            ? 'bg-amber-100 border-amber-300 text-amber-900'
            : 'bg-amber-500/20 border-amber-500/40 text-amber-300',
          dot: 'bg-amber-500',
          labelEn: 'Not Yet Announced',
          labelTe: 'ఇంకా ప్రకటించబడలేదు'
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <section
      aria-label="Next quota release schedule"
      className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl mb-8 relative overflow-hidden ${
        isLight
          ? 'bg-white border-amber-300'
          : 'bg-gradient-to-br from-[#141923] via-[#10141d] to-[#141923] border-[#D4AF37]/50'
      }`}
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#FFD700]/10 to-transparent pointer-events-none rounded-full blur-2xl -mr-20 -mt-20" />

      {/* Header with section title and status pill */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}>
        <div className="flex items-center gap-2.5">
          <Calendar className={`w-5 h-5 shrink-0 ${isLight ? 'text-amber-700' : 'text-[#FFD700]'}`} />
          <h2 className={`font-serif text-lg sm:text-xl font-bold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {isTe ? 'తదుపరి కోటా విడుదల & షెడ్యూల్' : 'Next Quota Release & Schedule'}
          </h2>
        </div>

        <div className={`px-3 py-1 rounded-full border text-xs font-bold inline-flex items-center gap-2 self-start sm:self-auto ${statusBadge.bg}`}>
          <span className={`w-2 h-2 rounded-full ${statusBadge.dot} animate-pulse`} />
          <span>{isTe ? statusBadge.labelTe : statusBadge.labelEn}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      {status === 'not_announced' ? (
        /* SAFE FALLBACK NOTICE */
        <div className={`p-5 rounded-2xl border text-center sm:text-left space-y-2 ${
          isLight
            ? 'bg-amber-50 border-amber-300'
            : 'bg-amber-500/10 border-amber-500/30'
        }`}>
          <div className={`flex items-center gap-2 justify-center sm:justify-start font-bold text-sm sm:text-base ${
            isLight ? 'text-amber-900' : 'text-amber-400'
          }`}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              {isTe
                ? (fallbackMessageTe || 'తదుపరి విడుదల షెడ్యూల్ ఇంకా అధికారికంగా ధృవీకరించబడలేదు. అధికారిక టీటీడీ ప్రకటనలను గమనించండి.')
                : (fallbackMessageEn || 'The next release schedule has not been officially confirmed. Check the official TTD announcements.')}
            </span>
          </div>
          <p className={`text-xs leading-relaxed font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            {isTe
              ? 'టీటీడీ సాధారణంగా ప్రతి నెలా 18 నుండి 24 తేదీల మధ్య 3 నెలల ముందస్తు కోటాను విడుదల చేస్తుంది. అధికారిక పత్రికా ప్రకటన రాగానే ఇక్కడ తాజా వివరాలు ప్రదర్శించబడతాయి.'
              : 'TTD typically announces quota release dates via official press releases mid-month (approx. 18th to 24th). Verified schedules will appear here immediately upon official publication.'}
          </p>
        </div>
      ) : (
        /* ACTIVE / CONFIRMED / OFFLINE DAILY DISPLAY */
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Applicable Quota / Month */}
            <div className={`p-4 rounded-2xl border ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-black/40 border-white/10'
            }`}>
              <span className={`text-[11px] uppercase tracking-wider font-bold block mb-1 ${
                isLight ? 'text-amber-800' : 'text-[#FFD700]'
              }`}>
                {isTe ? 'కోటా వర్తింపు / నెల' : 'Applicable Darshan Quota'}
              </span>
              <p className={`font-serif font-extrabold text-base sm:text-lg ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isTe ? (applicableMonthTe || applicableMonth) : applicableMonth}
              </p>
              {isEstimate && (
                <span className={`inline-block mt-1 text-[10px] font-bold uppercase ${
                  isLight ? 'text-purple-700' : 'text-purple-400'
                }`}>
                  ⚠️ {isTe ? 'అంచనా వేయబడిన తేదీ' : 'Estimated date — unconfirmed'}
                </span>
              )}
            </div>

            {/* Confirmed Release Date & IST Time */}
            <div className={`p-4 rounded-2xl border ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-black/40 border-white/10'
            }`}>
              <span className={`text-[11px] uppercase tracking-wider font-bold block mb-1 ${
                isLight ? 'text-amber-800' : 'text-[#FFD700]'
              }`}>
                {isTe ? 'విడుదల తేదీ & సమయం (భారత కాలమానం)' : 'Confirmed Release Date & Time (IST)'}
              </span>
              <p className={`font-mono font-extrabold text-base sm:text-lg ${
                isLight ? 'text-emerald-800' : 'text-emerald-400'
              }`}>
                {isTe ? (releaseDateTimeISTTe || releaseDateTimeIST) : releaseDateTimeIST}
              </p>
            </div>

          </div>

          {/* Operational Notes / Practical Instructions */}
          {(notesEn || notesTe) && (
            <div className={`p-3.5 rounded-xl border text-xs leading-relaxed font-medium ${
              isLight
                ? 'bg-amber-50/70 border-amber-200 text-slate-800'
                : 'bg-black/20 border-white/5 text-slate-300'
            }`}>
              <span className={`font-bold mr-1.5 ${isLight ? 'text-amber-900' : 'text-[#FFD700]'}`}>
                ℹ️ {isTe ? 'ముఖ్య గమనిక:' : 'Operational Note:'}
              </span>
              <span>{isTe ? (notesTe || notesEn) : notesEn}</span>
            </div>
          )}
        </div>
      )}

      {/* Verification Stamp & Official Channel Footer */}
      <div className={`mt-5 pt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
        isLight ? 'border-slate-200 text-slate-600' : 'border-white/10 text-[#94A3B8]'
      }`}>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            {isTe ? 'ధృవీకరించబడిన మూలం:' : 'Official Source:'}{' '}
            <strong className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isTe ? (officialSourceTe || officialSource) : officialSource}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {lastVerified && (
            <span className="text-[11px] font-mono">
              {isTe ? 'చివరి నిర్ధారణ:' : 'Last verified:'} {lastVerified}
            </span>
          )}

          {bookingPortal && (
            <a
              href={bookingPortal}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline font-bold inline-flex items-center gap-1 shrink-0 ${
                isLight ? 'text-amber-800' : 'text-[#FFD700]'
              }`}
            >
              <span>{isTe ? 'పోర్టల్' : 'Portal'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
