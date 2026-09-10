import React from 'react';
import { SERVICES } from '../data/services';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ServiceCard } from '../components/cards/ServiceCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { SEOHead } from '../components/common/SEOHead';

export const ServicesPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Clinical Healthcare Services | Devibai Super Speciality Hospital"
        description="Comprehensive healthcare services: Fertility & IVF, Maternal & Delivery Care, Pediatrics, Surgery, Laparoscopy, 24/7 Emergency, and Critical Care in Nirmal."
        canonicalPath="/services"
      />

      <Breadcrumbs items={[{ name: 'Clinical Services' }]} />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Hospital Services"
            badgeVariant="teal"
            title="Comprehensive Healthcare Services"
            subtitle="Explore our medical, surgical, maternal, neonatal, and emergency clinical services under one roof."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv) => (
              <ServiceCard key={srv.id} service={srv} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
