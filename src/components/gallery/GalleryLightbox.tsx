import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { GalleryItem } from '../../types';

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext
}) => {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      onNext();
    } else if (distance < -minSwipeDistance) {
      onPrev();
    }
  };

  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 select-none"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between text-white z-10 pt-safe">
        <div className="text-xs sm:text-sm font-medium tracking-wide text-slate-300">
          <span className="text-white font-bold">{currentIndex + 1}</span> of{' '}
          <span>{items.length}</span> —{' '}
          <span className="text-teal-400 font-semibold">{currentItem.category}</span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center justify-center min-h-[44px] min-w-[44px]"
            title={isZoomed ? "Zoom out" : "Zoom in"}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-emergency-600 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center justify-center min-h-[44px] min-w-[44px]"
            title="Close gallery (Esc)"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main image view with previous & next controls */}
      <div
        className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="absolute left-1.5 sm:left-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center justify-center"
          title="Previous image (Left arrow)"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div
          className={`transition-all duration-200 max-h-full max-w-full flex items-center justify-center ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-[68vh] sm:max-h-[75vh] max-w-[94vw] sm:max-w-[90vw] object-contain rounded-lg shadow-2xl border border-white/10"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="absolute right-1.5 sm:right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center justify-center"
          title="Next image (Right arrow)"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom caption */}
      <div className="text-center text-white max-w-2xl mx-auto z-10 px-4 pb-safe">
        <h4 className="font-heading font-bold text-sm sm:text-lg line-clamp-1">
          {currentItem.title}
        </h4>
        {currentItem.caption && (
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5 line-clamp-2">
            {currentItem.caption}
          </p>
        )}
      </div>
    </div>
  );
};
