import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Phone, MessageSquare, Info, FileCheck } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospital';
import { INSURANCE_DISCLAIMER } from '../data/insurance';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ContactForm } from '../components/forms/ContactForm';
import { SEOHead } from '../components/common/SEOHead';

export const AarogyasriPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Rajiv Aarogyasri Healthcare Services | Devibai Super Speciality Hospital"
        description="Rajiv Aarogyasri healthcare scheme services at Devibai Super Speciality Hospital in Nirmal, Telangana. Assistance desk, eligibility inquiries, and hospital coordination."
        canonicalPath="/arogyasri"
      />

      <Breadcrumbs
        items={[
          { name: 'Insurance', path: '/insurance' },
          { name: 'Rajiv Aarogyasri' }
        ]}
      />

      {/* Header */}
      <section className="bg-navy-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Telangana State Healthcare Scheme</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Rajiv Aarogyasri Healthcare Services
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Devibai Super Speciality Hospital displays Rajiv Aarogyasri among its healthcare schemes to assist eligible beneficiaries in Nirmal and neighboring areas.
            </p>
          </div>
        </div>
      </section>

      {/* Information & Disclaimer Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              {/* Scheme Logo Card */}
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-20 h-20 bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/assets/insurance/aarogyasri.png"
                    alt="Rajiv Aarogyasri Logo"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg text-navy-900">
                    రాజీవ్ ఆరోగ్యశ్రీ (Rajiv Aarogyasri)
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Community health scheme implemented by the Government of Telangana.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-navy-900 mb-2">
                  Hospital Assistance Desk
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  As shown in our official hospital brochure, Devibai Super Speciality Hospital features Rajiv Aarogyasri on our healthcare facilitation panel. Our hospital reception desk is equipped to guide patients and family members through scheme inquiries, patient identity verification, and required medical documentation.
                </p>
              </div>

              {/* Three Core Areas */}
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100">
                  <h4 className="font-bold text-sm text-navy-900 flex items-center">
                    <FileCheck className="w-4 h-4 text-teal-600 mr-2" />
                    1. Eligibility Enquiry
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Verify whether your Aarogyasri card or White Food Security Card is active and eligible for clinical consultation or required hospital admissions under scheme rules.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100">
                  <h4 className="font-bold text-sm text-navy-900 flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2" />
                    2. Treatment Enquiry
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Inquire regarding specific medical, surgical, or gynecological procedures covered under the scheme as per current government guidelines and hospital authorization.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100">
                  <h4 className="font-bold text-sm text-navy-900 flex items-center">
                    <ShieldCheck className="w-4 h-4 text-teal-600 mr-2" />
                    3. Hospital Assistance
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Our on-site administrative staff helps patients navigate pre-authorization steps, admission procedures, and discharge documentation.
                  </p>
                </div>
              </div>

              {/* Strict Notice */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start space-x-2.5">
                <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Important Notice:</strong> {INSURANCE_DISCLAIMER} Please contact our hospital help desk with your original beneficiary documentation for real-time verification.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={HOSPITAL_INFO.links.callPrimary}
                  className="btn-primary text-xs sm:text-sm py-3 px-5 font-bold"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Hospital: {HOSPITAL_INFO.phones.primary}
                </a>

                <a
                  href={`https://wa.me/919092915222?text=Hello%20Devibai%20Hospital,%20I%20would%20like%20to%20enquire%20about%20Rajiv%20Aarogyasri%20scheme%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-teal text-xs sm:text-sm py-3 px-5 font-bold"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Aarogyasri WhatsApp Inquiry
                </a>
              </div>
            </div>

            {/* Right: Direct Inquiry Form */}
            <div className="lg:col-span-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
