import React, { useState } from 'react';
import { Maximize2, Layers } from 'lucide-react';
import { GalleryItem } from '../../types';
import { GalleryLightbox } from './GalleryLightbox';

interface GalleryGridProps {
  items: GalleryItem[];
  showCategoryFilter?: boolean;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  showCategoryFilter = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Hospital',
    'Doctors',
    'Medical Care',
    'Facilities',
    'Services',
    'Emergency',
    'Fertility & IVF',
    'Surgery'
  ];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <div>
      {/* Category Pills */}
      {showCategoryFilter && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="medical-card group overflow-hidden cursor-pointer relative aspect-[4/3] bg-slate-100"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            
            {/* Category tag */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="bg-navy-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                {item.category}
              </span>
            </div>

            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 text-white">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-2 self-end">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-heading font-bold text-sm leading-snug line-clamp-2">
                {item.title}
              </h4>
              {item.caption && (
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
          <Layers className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600 font-medium">No images found in this category.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <GalleryLightbox
        items={filteredItems}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};
