import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../common/SectionHeader';
import { GalleryGrid } from '../gallery/GalleryGrid';
import { galleryService } from '../../services/galleryService';

export const HomeGallerySection: React.FC = () => {
  const items = galleryService.getGalleryItems();
  if (!items || items.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Hospital Photos"
          badgeVariant="teal"
          title="Hospital Gallery"
          subtitle="Official imagery of Devibai Super Speciality Hospital, specialist doctors, and clinical care units."
        />

        <GalleryGrid items={items.slice(0, 8)} showCategoryFilter={false} />

        <div className="mt-10 text-center">
          <Link to="/gallery" className="btn-teal text-sm py-3 px-6">
            Explore Full Filterable Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeGallerySection;
