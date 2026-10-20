import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import { Calendar, MapPin, Clock, Ticket, Menu } from 'lucide-react';

/**
 * BottomNavBar – Mobile-only fixed bottom navigation for "The Tirumala Verse".
 *
 * Props:
 *  - activeTab   : string   – currently active tab ID
 *  - setActiveTab : fn      – callback to change the active tab
 *  - lang        : string   – 'en' | 'te'
 *  - onNavigatePath : fn    – optional navigation callback
 */

const TAB_LABELS = {
  'calendar-page': { en: 'Calendar', te: 'క్యాలెండర్' },
  'pilgrim-guide': { en: 'Guide',    te: 'యాత్ర గైడ్' },
  sevas:           { en: 'Sevas',    te: 'సేవలు' },
  tokens:          { en: 'Tokens',   te: 'టోకెన్లు' },
  more:            { en: 'More',     te: 'మరిన్ని' },
};

const MORE_ITEMS = [
  { id: 'faqs',            emoji: '❓', en: 'FAQs',           te: 'ప్రశ్నోత్తరాలు' },
  { id: 'glossary',        emoji: '📖', en: 'Glossary',       te: 'నిఘంటువు' },
  { id: 'heritage-guides', emoji: '📚', en: 'Heritage',       te: 'వారసత్వం' },
  { id: 'about',           emoji: 'ℹ️',  en: 'About Us',       te: 'మా గురించి' },
  { id: 'feedback',        emoji: '💬', en: 'Feedback',       te: 'అభిప్రాయాలు' },
];

const TABS = [
  { id: 'calendar-page', Icon: Calendar, emoji: '📅' },
  { id: 'pilgrim-guide', Icon: MapPin,   emoji: '🛕' },
  { id: 'sevas',         Icon: Clock,    emoji: null },
  { id: 'tokens',        Icon: Ticket,   emoji: '🎟️' },
  { id: 'more',          Icon: Menu,     emoji: null },
];

/* ------------------------------------------------------------------ */

const BottomNavBar = memo(function BottomNavBar({
  activeTab,
  setActiveTab,
  lang = 'en',
  onNavigatePath,
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  // Close popover on outside click
  useEffect(() => {
    if (!moreOpen) return;
    const handleClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClick);
    return () => document.removeEventListener('pointerdown', handleClick);
  }, [moreOpen]);

  const handleTabPress = useCallback(
    (tabId) => {
      if (tabId === 'more') {
        setMoreOpen((prev) => !prev);
        return;
      }
      setMoreOpen(false);
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [setActiveTab],
  );

  const handleMoreItem = useCallback(
    (itemId) => {
      setMoreOpen(false);
      setActiveTab(itemId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [setActiveTab],
  );

  const l = lang === 'te' ? 'te' : 'en';

  return (
    <nav
      className={[
        'fixed bottom-0 inset-x-0 z-50 sm:hidden',
        'bg-[#0B0E14]/95 backdrop-blur-md',
        'border-t border-[#D4AF37]/40',
        '[.light-theme_&]:bg-white/95 [.light-theme_&]:border-amber-300/40',
      ].join(' ')}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* ---- More popover ---- */}
      {moreOpen && (
        <div
          ref={moreRef}
          className={[
            'absolute bottom-full right-2 mb-2 w-48',
            'rounded-xl overflow-hidden shadow-xl',
            'bg-[#141923] border border-[#D4AF37]/30',
            '[.light-theme_&]:bg-white [.light-theme_&]:border-amber-300/40',
            'animate-in fade-in slide-in-from-bottom-2',
          ].join(' ')}
        >
          {MORE_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleMoreItem(item.id)}
              className={[
                'flex items-center gap-3 w-full px-4 py-3 text-left text-sm',
                'transition-colors',
                activeTab === item.id
                  ? 'text-[#FFD700] bg-[#FFD700]/10'
                  : 'text-[#94A3B8] hover:text-[#FFD700] hover:bg-[#FFD700]/5',
                '[.light-theme_&]:hover:bg-amber-50',
                activeTab === item.id
                  ? '[.light-theme_&]:text-[#FF5722] [.light-theme_&]:bg-orange-50'
                  : '[.light-theme_&]:text-gray-600 [.light-theme_&]:hover:text-[#FF5722]',
              ].join(' ')}
            >
              <span className="text-base leading-none">{item.emoji}</span>
              <span>{item[l]}</span>
            </button>
          ))}
        </div>
      )}

      {/* ---- Tab bar ---- */}
      <div className="flex items-center justify-around h-14">
        {TABS.map(({ id, Icon, emoji }) => {
          const isActive =
            id === 'more'
              ? moreOpen ||
                MORE_ITEMS.some((m) => m.id === activeTab)
              : activeTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => handleTabPress(id)}
              className={[
                'relative flex flex-col items-center justify-center flex-1 h-full',
                'transition-colors duration-150',
                isActive
                  ? 'text-[#FFD700] [.light-theme_&]:text-[#FF5722]'
                  : 'text-[#94A3B8] [.light-theme_&]:text-gray-500',
              ].join(' ')}
              aria-label={TAB_LABELS[id]?.en}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active dot indicator */}
              {isActive && (
                <span
                  className={[
                    'absolute top-1 w-1 h-1 rounded-full',
                    'bg-[#FFD700] [.light-theme_&]:bg-[#FF5722]',
                  ].join(' ')}
                />
              )}

              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="text-[10px] mt-0.5 leading-tight">
                {TAB_LABELS[id]?.[l]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

BottomNavBar.displayName = 'BottomNavBar';

export default BottomNavBar;
