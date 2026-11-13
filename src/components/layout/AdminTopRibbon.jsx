import React from 'react';
import { ShieldCheck, Plus, MessageSquare, Cloud, LogOut, Ticket } from 'lucide-react';

export default function AdminTopRibbon({
  onOpenAddEventModal,
  onOpenAdminModalMode,
  feedbackCount,
  newFeedbackCount,
  onLogout
}) {
  return (
    <div className="bg-gradient-to-r from-[#FF5722] via-[#E65100] to-[#FF5722] text-white py-1.5 px-4 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-lg sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#FFD700] animate-bounce shrink-0" />
        <span className="font-extrabold text-[#FFD700]">ADMIN MODE ACTIVE:</span>
        <span className="hidden sm:inline">You are viewing the live website. Click "Edit" or "Delete" on any card!</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* SSD / DD Tokens Button */}
        <button
          onClick={() => onOpenAdminModalMode('token-management')}
          className="px-2.5 py-1 rounded bg-black/40 text-[#FFD700] hover:bg-black/60 font-extrabold flex items-center gap-1 border border-[#D4AF37]/50"
          title="Manage SSD / DD Tokens"
        >
          <Ticket className="w-3.5 h-3.5 text-[#FFD700]" />
          <span>Tokens</span>
        </button>

        {/* Live ➕ Add Event Button */}
        <button
          onClick={onOpenAddEventModal}
          className="px-2.5 py-1 rounded bg-black/40 text-[#FFD700] hover:bg-black/60 font-extrabold flex items-center gap-1 border border-[#FFD700]/40"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Event</span>
        </button>

        {/* 💬 Devotee Feedback Inbox Button */}
        <button
          onClick={() => onOpenAdminModalMode('feedback-inbox')}
          className="px-2.5 py-1 rounded bg-black/40 text-white hover:bg-black/60 font-bold flex items-center gap-1 relative border border-white/20"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#FFD700]" />
          <span>Feedback Inbox ({feedbackCount})</span>
          {newFeedbackCount > 0 && (
            <span className="px-1.5 py-0.2 bg-[#FFD700] text-black text-[10px] font-extrabold rounded-full animate-pulse">
              {newFeedbackCount} New
            </span>
          )}
        </button>

        {/* ⚡ Cloud Database Sync Button */}
        <button
          onClick={() => onOpenAdminModalMode('cloud-sync')}
          className="px-2.5 py-1 rounded bg-black/40 text-[#FFD700] hover:bg-black/60 font-bold flex items-center gap-1 border border-[#D4AF37]/40"
        >
          <Cloud className="w-3.5 h-3.5 text-[#FFD700]" />
          <span>Cloud Sync</span>
        </button>

        {/* 🔴 TTD YouTube Live Stream Embed Settings Button */}
        <button
          onClick={() => onOpenAdminModalMode('youtube-live')}
          className="px-2.5 py-1 rounded bg-black/40 text-red-300 hover:text-white hover:bg-black/60 font-extrabold flex items-center gap-1 border border-red-500/50"
          title="Configure TTD Daily YouTube Live Stream URL"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span>🔴 YouTube Live</span>
        </button>

        {/* Logout Admin — animated expand button */}
        <button
          onClick={onLogout}
          title="Logout"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '36px',
            height: '36px',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'width 0.3s ease, border-radius 0.3s ease',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
            backgroundColor: 'rgb(255, 65, 65)',
            padding: 0,
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.width = '110px';
            e.currentTarget.style.borderRadius = '40px';
            const icon = e.currentTarget.querySelector('.logout-icon');
            const text = e.currentTarget.querySelector('.logout-text');
            if (icon) { icon.style.width = '30%'; icon.style.paddingLeft = '14px'; }
            if (text) { text.style.opacity = '1'; text.style.width = '70%'; }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.width = '36px';
            e.currentTarget.style.borderRadius = '50%';
            const icon = e.currentTarget.querySelector('.logout-icon');
            const text = e.currentTarget.querySelector('.logout-text');
            if (icon) { icon.style.width = '100%'; icon.style.paddingLeft = '0'; }
            if (text) { text.style.opacity = '0'; text.style.width = '0%'; }
          }}
          onMouseDown={e => { e.currentTarget.style.transform = 'translate(2px, 2px)'; }}
          onMouseUp={e => { e.currentTarget.style.transform = 'translate(0, 0)'; }}
        >
          <span
            className="logout-icon"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'width 0.3s ease, padding-left 0.3s ease',
              flexShrink: 0,
            }}
          >
            <LogOut style={{ width: '15px', height: '15px', color: 'white', flexShrink: 0 }} />
          </span>
          <span
            className="logout-text"
            style={{
              position: 'absolute',
              right: 0,
              width: '0%',
              opacity: 0,
              color: 'white',
              fontSize: '0.85em',
              fontWeight: 700,
              transition: 'opacity 0.3s ease, width 0.3s ease',
              whiteSpace: 'nowrap',
              paddingRight: '10px',
              pointerEvents: 'none',
            }}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
