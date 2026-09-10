import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info, FileText, Phone, MessageSquare } from 'lucide-react';
import { INSURANCE_PROVIDERS, INSURANCE_DISCLAIMER } from '../data/insurance';
import { HOSPITAL_INFO } from '../data/hospital';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { InsuranceCard } from '../components/cards/InsuranceCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { ContactForm } from '../components/forms/ContactForm';
import { SEOHead } from '../components/common/SEOHead';

export const InsurancePage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Insurance & Healthcare Schemes | Devibai Super Speciality Hospital"
        description="Information on health insurance, TPAs, and government schemes empaneled at Devibai Hospital in Nirmal, including Rajiv Aarogyasri and Telangana EHS."
        canonicalPath="/insurance"
      />

      <Breadcrumbs items={[{ name: 'Insurance & Healthcare Schemes' }]} />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Cashless & Schemes"
            badgeVariant="teal"
            title="Insurance & Healthcare Schemes"
            subtitle="Displaying the insurance partners, TPAs, and government healthcare schemes shown on the official hospital panel."
          />

          {/* Prominent Mandatory Disclaimer */}
          <div className="max-w-4xl mx-auto mb-10 p-5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start space-x-3.5">
            <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="block font-bold text-amber-900 mb-0.5 uppercase tracking-wide text-xs">
                Scheme & Policy Availability Terms
              </strong>
              <p>{INSURANCE_DISCLAIMER}</p>
            </div>
          </div>

          {/* Providers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSURANCE_PROVIDERS.map((provider) => (
              <InsuranceCard key={provider.id} provider={provider} />
            ))}
          </div>

          {/* Aarogyasri Highlight Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-1 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Government Welfare Scheme</span>
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-navy-900">
                Rajiv Aarogyasri Scheme Assistance Desk
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Learn how Rajiv Aarogyasri healthcare facilitation operates at Devibai Hospital and submit your eligibility enquiry directly to our desk.
              </p>
            </div>

            <Link
              to="/arogyasri"
              className="btn-teal text-xs sm:text-sm py-3 px-6 whitespace-nowrap flex-shrink-0 font-bold"
            >
              Explore Aarogyasri Details →
            </Link>
          </div>

          {/* Insurance Inquiry Form Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="badge-navy mb-2">Help Desk</span>
              <h3 className="font-heading font-extrabold text-2xl text-navy-900">
                Insurance Desk Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Have questions regarding cashless pre-authorization, eligible policy types, or scheme documentation? Send us an enquiry.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};
