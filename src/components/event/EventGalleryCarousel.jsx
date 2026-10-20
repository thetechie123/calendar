import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventGalleryCarousel({
  allImages,
  activeImgIndex,
  activeImage,
  eventTitle,
  onImageClick,
  onPrevImage,
  onNextImage,
  onSelectThumbnail
}) {
  const touchStartRef = useRef({ x: 0, y: 0 });

  if (allImages.length === 0 || !activeImage) return null;

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches.length > 0 && allImages.length > 1) {
      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX < 0) {
          onNextImage(e);
        } else {
          onPrevImage(e);
        }
      }
    }
  };

  return (
    <div className="relative w-full bg-[#141923] select-none">
      {/* Main Active Image Display */}
      <div 
        onClick={onImageClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-64 sm:h-80 w-full overflow-hidden cursor-pointer group"
        title="Click picture to expand full screen (Swipe left/right)"
      >
        <img 
          src={activeImage.url} 
          alt={activeImage.caption || eventTitle} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-black/30"></div>

        {/* Next / Prev Navigation Overlay Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={onPrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-[#FFD700] hover:bg-black border border-[#D4AF37]/40 flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-10"
              title="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={onNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-[#FFD700] hover:bg-black border border-[#D4AF37]/40 flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-10"
              title="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Caption & Counter Overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 z-10 pointer-events-none">
          {activeImage.caption && (
            <div className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[#FFD700] text-xs font-bold border border-[#D4AF37]/40 max-w-[80%] truncate">
              📷 {activeImage.caption}
            </div>
          )}

          {allImages.length > 1 && (
            <div className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/20 ml-auto shrink-0 font-mono">
              {activeImgIndex + 1} / {allImages.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails Strip if multiple images */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-2 p-2.5 bg-[#0B0E14] overflow-x-auto no-scrollbar border-b border-[#D4AF37]/30">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelectThumbnail(idx)}
              className={`h-12 w-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                activeImgIndex === idx
                  ? 'border-[#FFD700] ring-2 ring-[#FF5722] scale-105'
                  : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
