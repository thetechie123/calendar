import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  ChevronDown,
  Share2,
  ShieldCheck,
  Check,
  Info
} from 'lucide-react';

export default function DarshanHero({
  topic,
  lang = 'en',
  isLight = false,
  onScrollToBooking
}) {
  const isTe = lang === 'te';
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: isTe ? topic.titleTe : topic.titleEn,
        text: isTe ? topic.subtitleTe : topic.subtitleEn,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isOnlineBooking = Boolean(topic.bookingUrl);
  const isSarvaDarshanam = topic.slug === 'sarva-darshanam';

  return (
    <header className={`p-6 sm:p-8 lg:p-10 rounded-3xl border-2 shadow-2xl relative overflow-hidden mb-8 transition-colors ${
      isLight
        ? 'bg-white border-amber-300 shadow-amber-950/5'
        : 'bg-[#141923] border-[#D4AF37]/50 shadow-black/50'
    }`}>
      {/* Decorative ambient radiance */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#FFD700]/15 to-transparent pointer-events-none rounded-full blur-3xl -mr-28 -mt-28" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-4 max-w-3xl">
          {/* Top badges & category label */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className={`px-3.5 py-1 rounded-full border text-xs font-black tracking-wide flex items-center gap-1.5 ${
              isLight
                ? 'bg-amber-100 border-amber-400 text-amber-900'
                : 'bg-[#FFD700]/20 border-[#FFD700]/40 text-[#FFD700]'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isTe ? topic.badgeTe : topic.badgeEn}</span>
            </span>

            <span className={`text-xs font-mono tracking-wide ${isLight ? 'text-slate-600 font-semibold' : 'text-[#94A3B8]'}`}>
              {isTe ? 'అధికారిక దర్శన మార్గదర్శిని' : 'Official Pilgrim Guide'}
            </span>

            <span className={`text-xs px-2.5 py-0.5 rounded-md border font-semibold ${
              isLight
                ? 'bg-slate-100 text-slate-800 border-slate-300'
                : 'bg-white/5 text-slate-300 border-white/10'
            }`}>
              {topic.cost}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold gold-gradient-text tracking-tight leading-tight">
            {isTe ? topic.titleTe : topic.titleEn}
          </h1>

          {/* Subtitle / Concise explanation */}
          <p className={`text-sm sm:text-base md:text-lg leading-relaxed font-medium ${
            isLight ? 'text-slate-800' : 'text-slate-200'
          }`}>
            {isTe ? topic.subtitleTe : topic.subtitleEn}
          </p>

          {/* ACTION CTAs: Primary + Secondary (Hidden on Sarva Darshanam) */}
          {!isSarvaDarshanam && (
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {isOnlineBooking ? (
                <a
                  href={topic.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-black font-extrabold text-sm sm:text-base flex items-center gap-2 hover:brightness-110 shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
                >
                  <span>{isTe ? 'అధికారిక టీటీడీ వెబ్‌సైట్‌లో బుక్ చేయండి' : 'Book on Official TTD Website'}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              ) : (
                <a
                  href="https://ttdevasthanams.ap.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 hover:brightness-110 shadow-lg active:scale-98 transition-all cursor-pointer"
                >
                  <span>{isTe ? 'అధికారిక టీటీడీ పోర్టల్' : 'Official TTD Portal'}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              )}

              <button
                type="button"
                onClick={onScrollToBooking}
                className={`px-5 py-3 rounded-xl border font-bold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                  isLight
                    ? 'bg-slate-100 border-amber-400 text-slate-800 hover:bg-amber-50'
                    : 'bg-black/40 border-[#D4AF37]/50 text-slate-200 hover:border-[#FFD700] hover:bg-white/5'
                }`}
              >
                <span>{isTe ? 'ఎలా బుక్ చేయాలి & నిబంధనలు' : 'How to Book & Rules'}</span>
                <ChevronDown className={`w-4 h-4 ${isLight ? 'text-amber-800' : 'text-[#FFD700]'}`} />
              </button>
            </div>
          )}
        </div>

        {/* Share Utility Action (Print button removed across all pages) */}
        <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 self-start">
          <button
            type="button"
            onClick={handleShare}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm flex items-center gap-1.5 text-xs font-semibold ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-slate-800 hover:border-amber-500'
                : 'bg-black/40 border-white/10 text-slate-200 hover:border-[#FFD700]'
            }`}
            title="Share Guide"
            aria-label="Share this Darshan guide"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Share2 className={`w-4 h-4 ${isLight ? 'text-amber-800' : 'text-[#FFD700]'}`} />
            )}
            <span>{copied ? (isTe ? 'కాపీ అయింది!' : 'Copied!') : (isTe ? 'షేర్' : 'Share')}</span>
          </button>
        </div>
      </div>

      {/* TTD Governance & Availability Notice (Hidden on Sarva Darshanam) */}
      {!isSarvaDarshanam && (
        <div className={`mt-6 pt-4 border-t flex items-start sm:items-center gap-2.5 text-xs font-medium rounded-xl p-3 ${
          isLight
            ? 'bg-amber-50/80 border-amber-200/80 text-slate-700'
            : 'bg-black/30 border-white/10 text-slate-300'
        }`}>
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className={`font-bold mr-1 ${isLight ? 'text-amber-900' : 'text-[#FFD700]'}`}>
              {isTe ? 'అధికారిక టీటీడీ సూచన:' : 'Official TTD Governance Notice:'}
            </strong>
            {isTe
              ? 'ఈ దర్శనానికి సంబంధించిన టికెట్ కోటాలు, ధరలు, కౌంటర్లు మరియు ప్రవేశ నిబంధనలు పూర్తిగా తిరుమల తిరుపతి దేవస్థానాల (TTD) పాలకమండలి నిర్ణయాల ప్రకారం మాత్రమే నియంత్రించబడతాయి.'
              : 'Darshan quota release schedules, ticket pricing, reporting venues, and slot availability are strictly administered and governed by Tirumala Tirupati Devasthanams (TTD).'}
          </p>
        </div>
      )}
    </header>
  );
}
