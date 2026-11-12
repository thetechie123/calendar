/**
 * RemindMeButton
 *
 * A self-contained "Remind Me" button for temple event cards.
 * Uses useRemindMe hook under the hood. Supports compact (icon-only)
 * and full (icon + text) display variants.
 *
 * Props:
 *  event   - event object { id, title, titleTe, startDate, startTime }
 *  lang    - 'en' | 'te'
 *  compact - if true, renders icon-only style (for tight spaces)
 *  className - extra classes to merge
 */
import React, { useState } from 'react';
import { Bell, BellOff, BellRing } from 'lucide-react';
import useRemindMe from '../../hooks/useRemindMe';

export default function RemindMeButton({ event, lang = 'en', compact = false, className = '' }) {
  const { isReminded, toggleReminder } = useRemindMe(event, lang);
  const [animating, setAnimating] = useState(false);

  const handleClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnimating(true);
    await toggleReminder();
    setTimeout(() => setAnimating(false), 600);
  };

  const isEn = lang === 'en';

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={
          isReminded
            ? (isEn ? 'Cancel Reminder' : 'రిమైండర్ రద్దు చేయండి')
            : (isEn ? 'Remind Me' : 'రిమైండర్ సెట్ చేయండి')
        }
        className={`p-1.5 rounded-lg font-extrabold text-xs shadow transition-all active:scale-90 ${
          isReminded
            ? 'bg-amber-500 text-black hover:bg-amber-400'
            : 'bg-[#1A1A2E] border border-[#D4AF37]/50 text-[#FFD700] hover:bg-[#D4AF37]/20'
        } ${animating ? 'scale-110' : ''} ${className}`}
        aria-pressed={isReminded}
        aria-label={isEn ? 'Remind Me' : 'రిమైండర్'}
      >
        {isReminded ? (
          <BellRing className={`w-3.5 h-3.5 ${animating ? 'animate-bounce' : ''}`} />
        ) : (
          <Bell className="w-3.5 h-3.5" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title={
        isReminded
          ? (isEn ? 'Click to cancel your reminder' : 'రిమైండర్ రద్దు చేయండి')
          : (isEn ? 'Get a notification before this event' : 'ఈ ఉత్సవానికి ముందు నోటిఫికేషన్ పొందండి')
      }
      className={`px-2.5 py-1.5 rounded-lg font-extrabold text-xs flex items-center gap-1 shadow transition-all active:scale-90 ${
        isReminded
          ? 'bg-amber-500 text-black hover:bg-amber-400 ring-1 ring-amber-300'
          : 'bg-[#1A1A2E] border border-[#D4AF37]/50 text-[#FFD700] hover:bg-[#D4AF37]/20 hover:border-[#FFD700]'
      } ${animating ? 'scale-105' : ''} ${className}`}
      aria-pressed={isReminded}
      aria-label={isEn ? 'Remind Me' : 'రిమైండర్'}
    >
      {isReminded ? (
        <>
          <BellRing className={`w-3.5 h-3.5 ${animating ? 'animate-bounce' : ''}`} />
          <span className="hidden sm:inline">{isEn ? 'Reminded' : 'సెట్!'}</span>
        </>
      ) : (
        <>
          <Bell className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isEn ? 'Remind Me' : 'రిమైండర్'}</span>
        </>
      )}
    </button>
  );
}
