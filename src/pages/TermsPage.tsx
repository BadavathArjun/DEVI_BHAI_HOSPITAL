import React from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { HOSPITAL_INFO } from '../data/hospital';
import { SEOHead } from '../components/common/SEOHead';

export const TermsPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Terms & Conditions | Devibai Super Speciality Hospital"
        description="Terms of website use, medical disclaimer, and emergency guidance for Devibai Super Speciality Hospital, Nirmal."
        canonicalPath="/terms"
      />

      <Breadcrumbs items={[{ name: 'Terms & Conditions' }]} />

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-navy-900 mb-2">
              Terms & Conditions
            </h1>
            <p className="text-xs text-slate-500">
              Last updated: January 2026 • Devibai Super Speciality Hospital, Nirmal
            </p>
          </div>

          {/* Medical Disclaimer */}
          <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-amber-900">
              1. Medical Disclaimer
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              {HOSPITAL_INFO.disclaimers.medical}
            </p>
          </div>

          {/* Emergency Notice */}
          <div className="p-5 rounded-xl bg-red-50 border border-red-200 text-red-950 space-y-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-red-900">
              2. Emergency Care Notice
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              {HOSPITAL_INFO.disclaimers.emergency}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-navy-900">
              3. Online Appointment Requests
            </h2>
            <p>
              Submission of an appointment request via this website constitutes a preliminary scheduling request and does not represent a guaranteed or immediate doctor confirmation. The hospital front desk will review doctor availability, clinical schedules, and contact the applicant via telephone or WhatsApp to confirm the appointment time.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-navy-900">
              4. Insurance & Scheme Availability
            </h2>
            <p>
              {HOSPITAL_INFO.disclaimers.insurance} All patients utilizing government welfare schemes (such as Rajiv Aarogyasri or Telangana EHS) or private health insurance TPAs must present verified cards, valid government ID proofs, and undergo authorization prior to cashless admission or treatment.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-navy-900">
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of Telangana, India. Any disputes arising out of the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Nirmal, Telangana.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
