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
        title="Specialities | Best Hospital & Fertility Centre in Nirmal | Devibai Hospital"
        description="Explore medical and surgical specialities at Devibai Super Speciality Hospital (Devi Bai Hospital) Nirmal: Best Fertility & IVF Centre, Maternity, Laparoscopic Surgery, Pediatrics & 24/7 Emergency."
        keywords="best hospital in nirmal, best fertility hospital in nirmal, devi bai hospital specialities, ivf clinic nirmal, laparoscopic surgery nirmal, maternity hospital nirmal, devi bhai hospital nirmal"
        canonicalPath="/specialities"
        breadcrumbs={[{ name: 'Specialities' }]}
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
