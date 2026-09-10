import React from 'react';
import { Link } from 'react-router-dom';
import { FACILITIES } from '../data/facilities';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { FacilityCard } from '../components/cards/FacilityCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { SEOHead } from '../components/common/SEOHead';
import { Calendar, Phone } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospital';

export const FacilitiesPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Hospital Facilities & Infrastructure | Devibai Super Speciality Hospital"
        description="Explore the infrastructure at Devibai Hospital Nirmal: 24/7 Emergency Room, Smart ICU, Round-the-Clock Pharmacy, Diagnostic Laboratory, Operation Theatres, and Maternal suites."
        canonicalPath="/facilities"
      />

      <Breadcrumbs items={[{ name: 'Facilities' }]} />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Hospital Infrastructure"
            badgeVariant="navy"
            title="Hospital Facilities & Clinical Units"
            subtitle="Explore our verified medical infrastructure, 24/7 support units, and specialized care environments."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-3xl mx-auto space-y-4">
            <h3 className="text-xl font-heading font-bold text-navy-900">
              Need Assistance or Inpatient Inquiry?
            </h3>
            <p className="text-sm text-slate-600">
              Our patient reception and admissions desk is available 24/7 to guide you on hospital facilities and consultations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/appointment" className="btn-teal text-xs sm:text-sm py-2.5 px-5">
                <Calendar className="w-4 h-4 mr-1.5" />
                Book Appointment
              </Link>
              <a href={HOSPITAL_INFO.links.callPrimary} className="btn-outline text-xs sm:text-sm py-2.5 px-5">
                <Phone className="w-4 h-4 mr-1.5 text-navy-900" />
                Call Reception
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
