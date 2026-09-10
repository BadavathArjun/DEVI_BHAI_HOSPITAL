import React from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { SectionHeader } from '../components/common/SectionHeader';
import { SEOHead } from '../components/common/SEOHead';

export const GalleryPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Hospital Gallery | Devibai Super Speciality Hospital"
        description="Official gallery of Devibai Super Speciality Hospital in Nirmal: clinical facilities, specialist doctor team, operating theatres, pediatric unit, emergency care and maternity suites."
        canonicalPath="/gallery"
      />

      <Breadcrumbs items={[{ name: 'Hospital Gallery' }]} />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Visual Tour"
            badgeVariant="teal"
            title="Hospital Gallery"
            subtitle="Browse official images of our hospital building, specialist team, emergency department, operating theatres, and clinical facilities in Nirmal."
          />

          <GalleryGrid items={GALLERY_ITEMS} showCategoryFilter={true} />
        </div>
      </section>
    </div>
  );
};
