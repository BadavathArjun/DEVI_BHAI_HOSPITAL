import React, { useState, useEffect } from 'react';
import { galleryService } from '../services/galleryService';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { SectionHeader } from '../components/common/SectionHeader';
import { SEOHead } from '../components/common/SEOHead';
import { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(() => galleryService.getGalleryItems());

  useEffect(() => {
    setItems(galleryService.getGalleryItems());
  }, []);

  return (
    <div>
      <SEOHead
        title="Hospital Photo Gallery | Devibai Super Speciality Hospital Nirmal"
        description="Official gallery of Devibai Super Speciality Hospital in Nirmal: comprehensive photo archive of clinical facilities, modular operating theatres, IVF & fertility centre, and team."
        keywords="Devibai hospital photos, hospital pictures Nirmal, fertility centre photo gallery, operation theatre pictures Nirmal, medical facilities photos"
        canonicalPath="/gallery"
        breadcrumbs={[{ name: 'Hospital Gallery' }]}
      />

      <Breadcrumbs items={[{ name: 'Hospital Gallery' }]} />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Visual Tour"
            badgeVariant="teal"
            title="Hospital Gallery & Photographic Archive"
            subtitle="Explore our comprehensive photographic archive featuring hospital facilities, modular operation theatres, Dr. Chandrika’s Fertility (IVF) Centre, doctor team, state awards, free health camps, and community milestones in Nirmal."
          />

          <GalleryGrid items={items} showCategoryFilter={true} />
        </div>
      </section>
    </div>
  );
};
