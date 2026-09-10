import React from 'react';
import { SPECIALITIES } from '../data/specialities';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SpecialityCard } from '../components/cards/SpecialityCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { SEOHead } from '../components/common/SEOHead';

export const SpecialitiesPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Medical Specialities & Departments | Devibai Super Speciality Hospital"
        description="Explore the clinical specialities at Devibai Hospital Nirmal: Fertility & IVF, Obstetrics & Gynecology, Pediatrics, General Surgery, Laparoscopy, Urology, Medicine, and Emergency."
        canonicalPath="/specialities"
      />

      <Breadcrumbs items={[{ name: 'Specialities' }]} />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Clinical Excellence"
            badgeVariant="teal"
            title="Our Medical Specialities"
            subtitle="Explore our comprehensive clinical departments, diagnostic approaches, and specialized procedures."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALITIES.map((spec) => (
              <SpecialityCard key={spec.id} speciality={spec} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
