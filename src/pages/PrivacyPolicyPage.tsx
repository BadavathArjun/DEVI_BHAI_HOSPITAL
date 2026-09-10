import React from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { HOSPITAL_INFO } from '../data/hospital';
import { SEOHead } from '../components/common/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Privacy Policy | Devibai Super Speciality Hospital"
        description="Privacy policy and patient health information handling protocols for Devibai Super Speciality Hospital in Nirmal, Telangana."
        canonicalPath="/privacy-policy"
      />

      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-navy-900 mb-2">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500">
              Last updated: January 2026 • Devibai Super Speciality Hospital, Nirmal
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-navy-900">
              1. Commitment to Patient Confidentiality
            </h2>
            <p>
              Devibai Super Speciality Hospital ("we", "hospital", "our") respects the privacy and confidentiality of every individual who visits our website or utilizes our medical, surgical, maternal, pediatric, or emergency services in Nirmal, Telangana.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-navy-900">
              2. Information Collected Online
            </h2>
            <p>
              When you submit an appointment request, contact message, or insurance inquiry through our website, we collect personal contact details including your name, mobile phone number, optional email, patient age, gender, preferred department, and symptoms provided voluntarily to facilitate scheduling.
            </p>
            <p>
              We do not sell, rent, or trade your personal information with any third-party marketing companies.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-navy-900">
              3. Use of Information
            </h2>
            <p>
              The information submitted through our forms is solely used by our authorized hospital administrative and reception team to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Verify doctor availability and schedule requested outpatient consultations.</li>
              <li>Contact you via phone or WhatsApp regarding your appointment or healthcare inquiry.</li>
              <li>Coordinate insurance pre-authorization or scheme documentation if requested.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-navy-900">
              4. Contact Regarding Privacy
            </h2>
            <p>
              If you have any questions regarding your data privacy, please contact the hospital administration at {HOSPITAL_INFO.address.fullAddress} or telephone {HOSPITAL_INFO.phones.primaryFormatted}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
