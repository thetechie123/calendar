import React from 'react';
import { Home, Calendar, Clock, Ticket, Sparkles, BookOpen, Search, ArrowLeft } from 'lucide-react';
import { isModifiedClick } from '../utils/navigation';

export default function NotFoundPage({ lang = 'en', onNavigate, onNavigateHome }) {
  const isEn = lang === 'en';

  const handleNav = (path, e) => {
    if (isModifiedClick(e)) return;
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else if (onNavigateHome) {
      onNavigateHome();
    }
  };

  const QUICK_LINKS = [
    {
      title: isEn ? 'Festival Calendar 2026–2027' : 'ఉత్సవాల క్యాలెండర్ 2026–2027',
      desc: isEn ? 'Explore daily utsavams, vahana sevas, and Brahmotsavam schedules.' : 'నిత్య ఉత్సవాలు, వాహన సేవలు మరియు బ్రహ్మోత్సవాల వివరాలు.',
      path: '/calendar',
      icon: Calendar,
      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/40 text-amber-400'
    },
    {
      title: isEn ? 'SSD & DD Tokens Guide' : 'దర్శనం టోకెన్ల మార్గదర్శిని',
      desc: isEn ? 'Live issuance counters, quota timings, and difference between SSD & DD.' : 'కౌంటర్లు, జారీ సమయాలు మరియు నిబంధనల సమాచారం.',
      path: '/tokens',
      icon: Ticket,
      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/40 text-blue-400'
    },
    {
      title: isEn ? 'Daily & Weekly Sevas' : 'నిత్య & వారపు సేవలు',
      desc: isEn ? 'Suprabhatam, Tomala, Archana, and Kalyanotsavam timings.' : 'సుప్రభాతం, తోమాల, అర్చన మరియు కల్యాణోత్సవం సమయాలు.',
      path: '/sevas',
      icon: Clock,
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/40 text-emerald-400'
    },
    {
      title: isEn ? 'Garuda Vahanam Heritage Guide' : 'గరుడ వాహన సమగ్ర దర్శిని',
      desc: isEn ? 'Moola Virat jewels, Garuda Purana lore, and multi-temple sevas.' : 'మూలవిరాట్ ఆభరణాలు, గరుడ పురాణం మరియు ఆలయ విశేషాలు.',
      path: '/festivals/garuda-vahanam',
      icon: Sparkles,
      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/40 text-purple-400'
    },
    {
      title: isEn ? 'Festival & Utsavam Glossary' : 'ఉత్సవ నిఘంటువు & పదాల అర్థాలు',
      desc: isEn ? 'Vedic terminology, sacred Alwar pasurams, and ritual origins.' : 'వేద పదాలు, ఆళ్వార్ పాశురాలు మరియు క్రతువుల వివరణ.',
      path: '/glossary',
      icon: BookOpen,
      color: 'from-rose-500/20 to-rose-600/10 border-rose-500/40 text-rose-400'
    }
  ];

  return (
    <main className="container max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center space-y-8 animate-fadeIn">
      {/* 404 Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-[#D4AF37]/40 text-[#FFD700] text-xs font-black uppercase tracking-widest shadow-inner">
        <span>404 Error</span>
        <span>•</span>
        <span>{isEn ? 'Page Not Found' : 'పేజీ కనుగొనబడలేదు'}</span>
      </div>

      {/* Main Heading & Message */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black gold-gradient-text tracking-tight">
          {isEn ? 'Sacred Path Not Found' : 'ఈ పేజీ అందుబాటులో లేదు'}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 light-theme:text-slate-700 max-w-xl mx-auto leading-relaxed">
          {isEn
            ? 'Om Namo Venkatesaya. The sacred URL or guide you requested does not exist or has been relocated. Please explore our verified festival guides and token schedules below.'
            : 'ఓం నమో వేంకటేశాయ. మీరు వెతుకుతున్న పేజీ లేదా లింక్ అందుబాటులో లేదు. క్రింది ముఖ్య విభాగాలు మరియు ఉత్సవాల వివరాలను చూడండి.'}
        </p>
      </div>

      {/* Primary Action Button */}
      <div>
        <a
          href="/"
          onClick={(e) => handleNav('/', e)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF5722] via-[#FF9800] to-[#FFD700] text-black font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Home className="w-4 h-4 text-black" />
          <span>{isEn ? 'Return to Home Calendar' : 'ప్రధాన క్యాలెండర్‌కు వెళ్లండి'}</span>
        </a>
      </div>

      {/* Helpful Quick Links Grid */}
      <div className="pt-6 border-t border-white/10 light-theme:border-slate-200">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#FFD700] light-theme:text-amber-800 mb-4">
          {isEn ? 'Explore Verified Pilgrim Resources' : 'ముఖ్య దర్శనీయ విభాగాలు'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNav(link.path, e)}
                className={`p-4 rounded-xl bg-gradient-to-br ${link.color} bg-[#141923] light-theme:bg-white border transition-all hover:scale-[1.02] shadow-md group`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-black/30 light-theme:bg-slate-100 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-white light-theme:text-slate-900 group-hover:text-[#FFD700] light-theme:group-hover:text-amber-800 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-xs text-slate-400 light-theme:text-slate-600 mt-0.5 line-clamp-2">
                      {link.desc}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
