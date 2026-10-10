import React, { useState, useMemo } from 'react';
import { Maximize2, Layers, Search, X, ChevronDown, Sparkles } from 'lucide-react';
import { GalleryItem } from '../../types';
import { GalleryLightbox } from './GalleryLightbox';

interface GalleryGridProps {
  items: GalleryItem[];
  showCategoryFilter?: boolean;
}

const ITEMS_PER_PAGE = 32;

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  showCategoryFilter = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categoryOrder = [
    'All',
    'Awards & Recognition',
    'Events & Celebrations',
    'Hospital',
    'Facilities',
    'Doctors',
    'Fertility & IVF',
    'Surgery',
    'Emergency',
    'Medical Care',
    'Services'
  ];

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: items.length };
    items.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  const presentCategories = useMemo(() => {
    const set = new Set(items.map((item) => item.category));
    return categoryOrder.filter((cat) => cat === 'All' || set.has(cat as any));
  }, [items]);

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!q) return true;
      const titleMatch = item.title.toLowerCase().includes(q);
      const captionMatch = item.caption?.toLowerCase().includes(q);
      const catMatch = item.category.toLowerCase().includes(q);
      return titleMatch || captionMatch || catMatch;
    });
  }, [items, selectedCategory, searchQuery]);

  // Reset visible count when category or search changes
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length));
  };

  const showAll = () => {
    setVisibleCount(filteredItems.length);
  };

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

  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-base text-navy-900 mb-1">Gallery Updates Coming Soon</h3>
        <p className="text-xs text-slate-500">Official hospital photographs and facility images will be uploaded here shortly.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Category Pills & Search Controls */}
      {showCategoryFilter && (
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search gallery by title, dignitary, event, surgery..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick status counter */}
            <div className="text-xs font-medium text-slate-500 flex items-center gap-1.5 self-start sm:self-center">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>
                Showing <strong className="text-navy-900">{visibleItems.length}</strong> of{' '}
                <strong className="text-navy-900">{filteredItems.length}</strong> photos
              </span>
            </div>
          </div>

          {/* Category Pills Scrollable */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x -mx-1 px-1">
            {presentCategories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`min-h-[38px] px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="medical-card group overflow-hidden cursor-pointer relative aspect-[4/3] bg-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                // Graceful fallback to avoid broken images
                const target = e.currentTarget;
                if (!target.src.includes('about-hospital.jpg')) {
                  target.src = '/assets/branding/about-hospital.jpg';
                }
              }}
            />

            {/* Category tag */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="bg-navy-900/85 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 shadow-sm">
                {item.category}
              </span>
            </div>

            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 text-white">
              <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center mb-2 self-end shadow-md">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-heading font-bold text-sm leading-snug line-clamp-2 drop-shadow-sm">
                {item.title}
              </h4>
              {item.caption && (
                <p className="text-[11px] text-slate-200 line-clamp-2 mt-1 drop-shadow-sm font-normal">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Results Fallback */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto my-6">
          <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="font-heading font-bold text-base text-navy-900 mb-1">No matching photos found</h4>
          <p className="text-xs text-slate-500 mb-4">
            Try adjusting your search terms or selecting a different category filter.
          </p>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 underline"
            >
              Reset all filters
            </button>
          )}
        </div>
      )}

      {/* Load More / Show All Controls */}
      {visibleCount < filteredItems.length && (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={loadMore}
            className="w-full sm:w-auto px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center justify-center space-x-2 active:scale-98"
          >
            <span>Load More Photos</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={showAll}
            className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-98"
          >
            Show All ({filteredItems.length})
          </button>
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
