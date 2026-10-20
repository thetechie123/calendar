import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function EventImageLightbox({
  isOpen,
  eventTitle,
  allImages,
  lightboxIndex,
  onClose,
  onPrevImage,
  onNextImage
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Touch tracking refs
  const dragStartRef = useRef({ x: 0, y: 0 });
  const touchStartRef = useRef({ x: 0, y: 0 });
  const initialPinchDistRef = useRef(null);
  const initialScaleRef = useRef(1);
  const lastTapRef = useRef(0);

  // Reset zoom on image change or close
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [lightboxIndex, isOpen]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (scale === 1 && allImages.length > 1) onPrevImage(e);
      } else if (e.key === 'ArrowRight') {
        if (scale === 1 && allImages.length > 1) onNextImage(e);
      } else if (e.key === '+' || e.key === '=') {
        setScale(s => Math.min(4, s + 0.5));
      } else if (e.key === '-') {
        setScale(s => {
          const next = Math.max(1, s - 0.5);
          if (next === 1) setPosition({ x: 0, y: 0 });
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, scale, allImages.length, onClose, onPrevImage, onNextImage]);

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setScale(s => Math.min(4, Number((s + 0.5).toFixed(1))));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setScale(s => {
      const next = Math.max(1, Number((s - 0.5).toFixed(1)));
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = (e) => {
    if (e) e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Double tap to zoom
  const handleDoubleTap = (e) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (scale > 1) {
        handleResetZoom();
      } else {
        setScale(2);
      }
    }
    lastTapRef.current = now;
  };

  // Touch handlers for Pinch-to-Zoom & Swipe Navigation
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch gesture start
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchDistRef.current = dist;
      initialScaleRef.current = scale;
    } else if (e.touches.length === 1) {
      // Single touch start (for swipe or pan)
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      dragStartRef.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialPinchDistRef.current) {
      // Handle pinch zoom
      e.preventDefault();
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = currentDist / initialPinchDistRef.current;
      const newScale = Math.min(4, Math.max(1, Number((initialScaleRef.current * ratio).toFixed(2))));
      setScale(newScale);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1 && scale > 1 && isDragging) {
      // Pan zoomed image
      e.preventDefault();
      const touch = e.touches[0];
      const maxPan = (scale - 1) * 160;
      const nextX = Math.max(-maxPan, Math.min(maxPan, touch.clientX - dragStartRef.current.x));
      const nextY = Math.max(-maxPan, Math.min(maxPan, touch.clientY - dragStartRef.current.y));
      setPosition({ x: nextX, y: nextY });
    }
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    if (initialPinchDistRef.current) {
      initialPinchDistRef.current = null;
      return;
    }

    // If at 1x zoom and 1 touch ended, detect swipe left/right
    if (scale === 1 && e.changedTouches && e.changedTouches.length > 0) {
      const touchEnd = e.changedTouches[0];
      const deltaX = touchEnd.clientX - touchStartRef.current.x;
      const deltaY = touchEnd.clientY - touchStartRef.current.y;

      // Threshold: horizontal swipe > 50px and more horizontal than vertical
      if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX < 0 && allImages.length > 1) {
          onNextImage(e);
        } else if (deltaX > 0 && allImages.length > 1) {
          onPrevImage(e);
        }
      }
    }
  };

  // Mouse pan handlers for desktop when zoomed in
  const handleMouseDown = (e) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || scale <= 1) return;
    const maxPan = (scale - 1) * 200;
    const nextX = Math.max(-maxPan, Math.min(maxPan, e.clientX - dragStartRef.current.x));
    const nextY = Math.max(-maxPan, Math.min(maxPan, e.clientY - dragStartRef.current.y));
    setPosition({ x: nextX, y: nextY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen || allImages.length === 0) return null;

  const currentImage = allImages[lightboxIndex] || allImages[0];

  return (
    <div 
      className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 select-none"
      onClick={onClose}
    >
      {/* Lightbox Top Header */}
      <div className="flex items-center justify-between z-20 w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 max-w-[65%]">
          <span className="font-serif font-bold text-[#FFD700] text-xs sm:text-base truncate">
            {eventTitle}
          </span>
          {allImages.length > 1 && (
            <span className="px-2 py-0.5 rounded bg-white/10 text-xs font-mono font-bold text-[#94A3B8] shrink-0">
              {lightboxIndex + 1} / {allImages.length}
            </span>
          )}
        </div>

        {/* Zoom Controls & Close Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/15">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 1}
              className={`p-1.5 rounded-lg transition-colors ${scale <= 1 ? 'text-stone-500 opacity-40' : 'text-stone-200 hover:bg-white/10'}`}
              title="Zoom out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-1.5 text-[11px] font-mono font-bold text-[#FFD700] min-w-[38px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={scale >= 4}
              className={`p-1.5 rounded-lg transition-colors ${scale >= 4 ? 'text-stone-500 opacity-40' : 'text-stone-200 hover:bg-white/10'}`}
              title="Zoom in (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {scale > 1 && (
              <button
                onClick={handleResetZoom}
                className="p-1.5 rounded-lg text-amber-400 hover:bg-white/10 transition-colors ml-0.5"
                title="Reset zoom (100%)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs transition-all flex items-center gap-1 shadow-lg shrink-0"
            title="Close enlarged view (Esc)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* Lightbox Main Image & Touch Area */}
      <div 
        className="relative flex-grow flex items-center justify-center my-2 sm:my-4 overflow-hidden touch-none"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleTap}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
          }}
          className="will-change-transform"
        >
          <img 
            src={currentImage.url} 
            alt={currentImage.caption || eventTitle} 
            className="max-h-[75vh] max-w-[92vw] sm:max-w-[85vw] object-contain shadow-2xl rounded-xl border border-white/20 select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Previous / Next Navigation Arrows (Visible when scale === 1) */}
        {allImages.length > 1 && scale === 1 && (
          <>
            <button
              onClick={onPrevImage}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/80 text-[#FFD700] hover:bg-black border border-[#D4AF37] flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 z-20"
              title="Previous photo (Swipe right)"
            >
              <ChevronLeft className="w-7 h-7 sm:w-9 sm:h-9" />
            </button>

            <button
              onClick={onNextImage}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/80 text-[#FFD700] hover:bg-black border border-[#D4AF37] flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 z-20"
              title="Next photo (Swipe left)"
            >
              <ChevronRight className="w-7 h-7 sm:w-9 sm:h-9" />
            </button>
          </>
        )}
      </div>

      {/* Lightbox Bottom Caption Bar & Gestures Hint */}
      <div className="text-center z-20 max-w-2xl mx-auto w-full space-y-1" onClick={(e) => e.stopPropagation()}>
        {currentImage.caption ? (
          <div className="p-2.5 sm:p-3 rounded-xl bg-black/85 border border-[#D4AF37]/40 text-[#FFD700] font-bold text-xs sm:text-sm shadow-xl">
            📷 {currentImage.caption}
          </div>
        ) : null}
        <div className="text-[11px] text-[#94A3B8] font-mono">
          {scale > 1
            ? 'Drag to pan • Double-tap to reset zoom'
            : 'Pinch or tap +/- to zoom • Swipe left/right for next photo'}
        </div>
      </div>
    </div>
  );
}
