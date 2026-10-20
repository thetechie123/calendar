import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  HelpCircle,
  Sparkles,
  Ticket,
  Shirt,
  HeartHandshake,
  BookOpen,
  Building,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  X,
  PhoneCall
} from 'lucide-react';
import { PILGRIM_FAQS } from '../data/pilgrimData';
import { TOKEN_FAQS } from '../data/tokenFaqData';
import { DARSHAN_FAQS } from '../data/darshanFaqData';
import { isModifiedClick } from '../utils/navigation';

function FormattedAnswerText({ text, isLight }) {
  if (!text) return null;

  const lines = text.split('\n');

  const parseInline = (line) => {
    const parts = [];
    let lastIndex = 0;
    const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }

      if (match[1] && match[2]) {
        // Link [text](url)
        parts.push(
          <a
            key={`link-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold underline inline-flex items-center gap-0.5 transition-colors cursor-pointer ${
              isLight
                ? 'text-amber-800 hover:text-amber-950 decoration-amber-600'
                : 'text-[#FFD700] hover:text-white decoration-[#FFD700]/60'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <span>{match[1]}</span>
            <ExternalLink className="w-3 h-3 inline shrink-0" />
          </a>
        );
      } else if (match[3]) {
        // Bold **text**
        parts.push(
          <strong
            key={`bold-${match.index}`}
            className={isLight ? 'font-extrabold text-slate-900' : 'font-extrabold text-[#FFD700]'}
          >
            {match[3]}
          </strong>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return parts.length > 0 ? parts : line;
  };

  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }
        return (
          <p key={idx} className="leading-relaxed">
            {parseInline(line)}
          </p>
        );
      })}
    </div>
  );
}

export default function FaqPage({
  lang = 'en',
  themeMode = 'dark',
  onNavigate,
  onOpenFeedbackTab
}) {
  const isTe = lang === 'te';
  const isLight = themeMode === 'light';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaqId, setExpandedFaqId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Combine datasets into a unified FAQ catalog (concise short answers only)
  const allFaqs = useMemo(() => {
    // 1. Process Token FAQs
    const tokenList = TOKEN_FAQS.map(faq => ({
      id: `token-${faq.id}`,
      category: 'tokens',
      questionEn: faq.question,
      questionTe: faq.questionTe,
      answerEn: faq.answer,
      answerTe: faq.answerTe,
      source: 'TTD Official Token Guidelines',
      type: 'tokens'
    }));

    // 2. Process Pilgrim FAQs
    const pilgrimList = PILGRIM_FAQS.map(faq => ({
      id: faq.id,
      category: faq.category, // 'rules', 'rituals', 'traditions', 'amenities'
      questionEn: faq.questionEn,
      questionTe: faq.questionTe,
      answerEn: faq.answerEn,
      answerTe: faq.answerTe,
      source: faq.source || null,
      type: 'general'
    }));

    return [...tokenList, ...pilgrimList];
  }, []);

  // Category definitions
  const categories = useMemo(() => [
    { id: 'all', labelEn: 'All Questions', labelTe: 'అన్ని ప్రశ్నలు', icon: '🌟' },
    { id: 'tokens', labelEn: 'Tokens & Darshan', labelTe: 'దర్శనం & టోకెన్లు', icon: '🎟️' },
    { id: 'rules', labelEn: 'Rules & Dress Code', labelTe: 'ఆలయ నియమాలు', icon: '🌸' },
    { id: 'rituals', labelEn: 'Rituals & Sanctions', labelTe: 'పూజలు & క్రతువులు', icon: '🛕' },
    { id: 'traditions', labelEn: 'Puranic Traditions', labelTe: 'పురాణ విశేషాలు', icon: '📜' },
    { id: 'amenities', labelEn: 'Laddus & Amenities', labelTe: 'లడ్డూలు & వసతులు', icon: '🥥' }
  ], []);

  // Filtered FAQs based on category & search query
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allFaqs.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!q) return true;

      const qEn = (faq.questionEn || '').toLowerCase();
      const qTe = (faq.questionTe || '').toLowerCase();
      const aEn = (faq.answerEn || '').toLowerCase();
      const aTe = (faq.answerTe || '').toLowerCase();

      return qEn.includes(q) || qTe.includes(q) || aEn.includes(q) || aTe.includes(q);
    });
  }, [allFaqs, selectedCategory, searchQuery]);

  // Deep linking: support ?faq=<id> in URL
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const targetFaq = params.get('faq');
      if (targetFaq) {
        setExpandedFaqId(targetFaq);
        const el = document.getElementById(`faq-card-${targetFaq}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    } catch (e) {
      console.warn('FAQ deep link error:', e);
    }
  }, []);

  const handleCopyLink = (faqId, e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/faqs?faq=${encodeURIComponent(faqId)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(faqId);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(err => console.warn(err));
  };

  const handleExpandAll = () => {
    if (expandedFaqId === 'all') {
      setExpandedFaqId(null);
    } else {
      setExpandedFaqId('all');
    }
  };

  const isFaqExpanded = (id) => expandedFaqId === 'all' || expandedFaqId === id;

  const getCategoryBadge = (catId) => {
    switch (catId) {
      case 'tokens':
        return { labelEn: 'Tokens & Darshan', labelTe: 'దర్శనం & టోకెన్లు', color: 'bg-amber-500/15 text-amber-500 border-amber-500/30' };
      case 'rules':
        return { labelEn: 'Rules & Etiquette', labelTe: 'ఆలయ నియమాలు', color: 'bg-rose-500/15 text-rose-500 border-rose-500/30' };
      case 'rituals':
        return { labelEn: 'Rituals & Sanctions', labelTe: 'పూజలు & క్రతువులు', color: 'bg-purple-500/15 text-purple-500 border-purple-500/30' };
      case 'traditions':
        return { labelEn: 'Puranic Traditions', labelTe: 'పురాణ విశేషాలు', color: 'bg-blue-500/15 text-blue-500 border-blue-500/30' };
      case 'amenities':
        return { labelEn: 'Laddus & Amenities', labelTe: 'లడ్డూలు & వసతులు', color: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' };
      default:
        return { labelEn: 'General', labelTe: 'సాధారణం', color: 'bg-slate-500/15 text-slate-400 border-slate-500/30' };
    }
  };

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* 1. HERO BANNER */}
      <section
        className={`p-6 sm:p-10 rounded-3xl border transition-colors relative overflow-hidden text-center space-y-4 ${
          isLight
            ? 'bg-white border-amber-300/60 shadow-lg'
            : 'glass-card border-[#D4AF37]/40 shadow-2xl bg-gradient-to-br from-[#141923] via-[#0B0E14] to-[#141923]'
        }`}
      >
        <div className="flex justify-center mb-1">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 flex items-center justify-center shadow-lg ${
              isLight
                ? 'bg-amber-50 border-amber-500 text-amber-800'
                : 'bg-[#141923] border-[#FFD700] text-[#FFD700]'
            }`}
          >
            <HelpCircle className="w-8 h-8" />
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            isLight
              ? 'bg-amber-100 text-amber-950 border border-amber-300'
              : 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {isTe
              ? 'యాత్రికుల సందేహ నివృత్తి వేదిక'
              : 'Comprehensive Pilgrim Knowledge Base'}
          </span>
        </div>

        <h1
          className={`font-serif text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-amber-950' : 'gold-gradient-text'
          }`}
        >
          {isTe ? 'తరచుగా అడిగే ప్రశ్నలు & సమాధానాలు' : 'Frequently Asked Questions'}
        </h1>

        <p
          className={`text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-medium ${
            isLight ? 'text-slate-700' : 'text-[#94A3B8]'
          }`}
        >
          {isTe
            ? 'తిరుమల దర్శనం, ఉచిత SSD/DD టోకెన్లు, లడ్డూ కియోస్క్లు, వస్త్రధారణ నియమావళి మరియు పవిత్ర సంప్రదాయాలపై భక్తులు అడిగే ముఖ్య ప్రశ్నల సమాధానాలు.'
            : 'Clear, authentic answers on free SSD/DD tokens, laddu purchase kiosks, temple dress code, reporting timings, and sacred traditions.'}
        </p>

        {/* SEARCH BOX */}
        <div className="pt-2 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#D4AF37]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isTe
                  ? 'ప్రశ్నలు, టోకెన్లు లేదా కీవర్డ్లతో వెతకండి...'
                  : 'Search questions, tokens, rules, or keywords...'
              }
              className={`w-full pl-10 pr-10 py-3 rounded-2xl text-xs sm:text-sm font-medium border transition-all focus:outline-none focus:ring-2 ${
                isLight
                  ? 'bg-slate-50 border-amber-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-amber-500 focus:border-amber-500'
                  : 'bg-[#0B0E14] border-[#D4AF37]/40 text-white placeholder-slate-500 focus:ring-[#FFD700] focus:border-[#FFD700]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS & CONTROLS */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? isLight
                        ? 'bg-amber-900 text-white shadow-md'
                        : 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-lg font-extrabold'
                      : isLight
                        ? 'bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50/50'
                        : 'bg-[#141923] border border-[#D4AF37]/30 text-[#CBD5E1] hover:text-[#FFD700] hover:border-[#FFD700]/50'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{isTe ? cat.labelTe : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Expand/Collapse All Button */}
          <button
            onClick={handleExpandAll}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              isLight
                ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-[#FFD700] hover:border-[#FFD700]/40'
            }`}
          >
            {expandedFaqId === 'all'
              ? (isTe ? 'అన్నీ మూసివేయండి' : 'Collapse All')
              : (isTe ? 'అన్నీ తెరవండి' : 'Expand All')}
          </button>
        </div>

        {/* Counter Results */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
          <span>
            {isTe
              ? `${filteredFaqs.length} ప్రశ్నలు కనుగొనబడ్డాయి`
              : `Showing ${filteredFaqs.length} of ${allFaqs.length} questions`}
          </span>
          {searchQuery && (
            <span>
              {isTe
                ? `శోధన: "${searchQuery}"`
                : `Filter active: "${searchQuery}"`}
            </span>
          )}
        </div>
      </section>

      {/* 3. ACCORDION FAQ CARDS LIST */}
      <section className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div
            className={`p-10 rounded-2xl border text-center space-y-3 ${
              isLight
                ? 'bg-white border-slate-200 text-slate-700'
                : 'glass-card border-[#D4AF37]/30 text-slate-300'
            }`}
          >
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="font-serif text-base font-bold">
              {isTe ? 'ఎటువంటి ప్రశ్నలు కనుగొనబడలేదు' : 'No matching questions found'}
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {isTe
                ? 'దయచేసి వేరే పదాలతో శోధించండి లేదా అన్ని ప్రశ్నల ట్యాబ్ ఎంచుకోండి.'
                : 'Try adjusting your search query or clear the filter to view all questions.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-bold text-[#FF5722] hover:underline cursor-pointer"
            >
              {isTe ? 'ఫిల్టర్లను తొలగించండి' : 'Reset filters'}
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = isFaqExpanded(faq.id);
            const badge = getCategoryBadge(faq.category);

            return (
              <div
                key={faq.id}
                id={`faq-card-${faq.id}`}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isLight
                    ? isExpanded
                      ? 'bg-white border-amber-400 shadow-md ring-1 ring-amber-400/30'
                      : 'bg-white border-slate-200 hover:border-amber-300'
                    : isExpanded
                      ? 'glass-card border-[#FFD700]/70 bg-[#141923]/90 shadow-xl'
                      : 'glass-card border-[#D4AF37]/30 hover:border-[#FFD700]/50 bg-[#141923]/60'
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() =>
                    setExpandedFaqId(expandedFaqId === faq.id ? null : faq.id)
                  }
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Q Badge */}
                    <span
                      className={`w-7 h-7 rounded-xl text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 border ${
                        isLight
                          ? 'bg-amber-100 text-amber-950 border-amber-300'
                          : 'bg-[#FFD700]/15 text-[#FFD700] border-[#FFD700]/40'
                      }`}
                    >
                      Q
                    </span>

                    <div className="space-y-1">
                      {/* Category tag */}
                      <div className="inline-block">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.color}`}
                        >
                          {isTe ? badge.labelTe : badge.labelEn}
                        </span>
                      </div>

                      {/* Question Text */}
                      <h3
                        className={`font-serif text-sm sm:text-base font-bold leading-snug ${
                          isLight ? 'text-slate-900' : 'text-slate-100'
                        }`}
                      >
                        {isTe ? faq.questionTe : faq.questionEn}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    {/* Copy Direct Link Button */}
                    <button
                      type="button"
                      onClick={(e) => handleCopyLink(faq.id, e)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        copiedId === faq.id
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : isLight
                            ? 'bg-slate-100 text-slate-500 hover:text-amber-900 border-slate-200'
                            : 'bg-white/5 text-slate-400 hover:text-[#FFD700] border-white/10'
                      }`}
                      title={isTe ? 'ప్రశ్న లింక్‌ను కాపీ చేయండి' : 'Copy link to this question'}
                    >
                      {copiedId === faq.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Chevron */}
                    <div
                      className={`p-1 rounded-lg transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 ${
                          isLight ? 'text-amber-900' : 'text-[#FFD700]'
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Accordion Body */}
                {isExpanded && (
                  <div
                    className={`px-4 sm:px-5 pb-5 pt-1 space-y-3 border-t ${
                      isLight ? 'border-amber-100' : 'border-white/5'
                    }`}
                  >
                    <div
                      className={`text-xs sm:text-sm leading-relaxed p-4 rounded-xl border ${
                        isLight
                          ? 'bg-amber-50/50 text-slate-800 border-amber-200/80 font-normal'
                          : 'bg-[#0B0E14] text-slate-200 border-white/5 font-normal'
                      }`}
                    >
                      <FormattedAnswerText
                        text={isTe ? faq.answerTe : faq.answerEn}
                        isLight={isLight}
                      />
                    </div>

                    {/* Source Citation */}
                    {faq.source && (
                      <div
                        className={`text-[11px] font-medium flex items-center gap-1.5 pl-1 ${
                          isLight ? 'text-slate-600' : 'text-[#94A3B8]'
                        }`}
                      >
                        <span>📜</span>
                        <span>
                          <strong>{isTe ? 'మూలం:' : 'Source:'}</strong> {faq.source}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* 4. HELPFUL PILGRIM ASSISTANCE & STILL HAVE QUESTIONS SECTION */}
      <section
        className={`p-6 sm:p-8 rounded-2xl border space-y-5 transition-colors ${
          isLight
            ? 'bg-white border-amber-200/80 shadow-md'
            : 'glass-card border-[#D4AF37]/30'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h3
              className={`font-serif text-base sm:text-lg font-bold ${
                isLight ? 'text-amber-950' : 'gold-gradient-text'
              }`}
            >
              {isTe
                ? 'మీ ప్రశ్నకు సమాధానం దొరకలేదా?'
                : 'Still have questions or need assistance?'}
            </h3>
            <p
              className={`text-xs sm:text-sm ${
                isLight ? 'text-slate-600' : 'text-[#94A3B8]'
              }`}
            >
              {isTe
                ? 'మా కమ్యూనిటీ ఫీడ్‌బ్యాక్ ద్వారా మీ సందేహాన్ని పంపండి లేదా అధికారిక TTD హెల్ప్‌లైన్‌ను సంప్రదించండి.'
                : 'Share your question through our community feedback or contact official TTD pilgrim helplines.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                if (onOpenFeedbackTab) {
                  onOpenFeedbackTab();
                } else if (onNavigate) {
                  onNavigate('/feedback');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black font-extrabold text-xs inline-flex items-center gap-2 shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-black" />
              <span>{isTe ? 'ప్రశ్నను పంపండి' : 'Ask a Question'}</span>
            </button>
          </div>
        </div>

        {/* Official TTD Helplines Callout */}
        <div
          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
            isLight
              ? 'bg-amber-50/70 border-amber-200 text-slate-800'
              : 'bg-[#0B0E14] border-white/10 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <div>
              <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {isTe ? 'అధికారిక TTD 24/7 కాల్ సెంటర్:' : 'Official TTD 24/7 Call Center:'}
              </span>{' '}
              <span className={`font-mono font-bold ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                0877-2277777 / 2233333
              </span>
            </div>
          </div>

          <a
            href="https://ttdevasthanams.ap.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 font-bold hover:underline ${
              isLight ? 'text-amber-900' : 'text-[#FFD700]'
            }`}
          >
            <span>ttdevasthanams.ap.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
