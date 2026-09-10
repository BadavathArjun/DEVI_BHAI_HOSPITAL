import React from 'react';
import { Phone, MessageSquare, Clock, MapPin, ShieldCheck, AlertCircle } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospital';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AppointmentForm } from '../components/forms/AppointmentForm';
import { SectionHeader } from '../components/common/SectionHeader';
import { SEOHead } from '../components/common/SEOHead';

export const AppointmentPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Book an Appointment | Devibai Super Speciality Hospital"
        description="Request an appointment with our specialist doctors at Devibai Super Speciality Hospital, Nirmal. Consultations in fertility, maternity, pediatrics, surgery, medicine, and urology."
        canonicalPath="/appointment"
      />

      <Breadcrumbs items={[{ name: 'Book Appointment' }]} />

      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Online Scheduling"
            badgeVariant="teal"
            title="Book an Appointment"
            subtitle="Submit your appointment request online. Our hospital desk will verify doctor availability and contact you directly to confirm."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Interactive Form */}
            <div className="lg:col-span-8">
              <AppointmentForm />
            </div>

            {/* Right: Hospital Guidance & Fast Links */}
            <div className="lg:col-span-4 space-y-6">
              {/* Direct Booking via Phone / WhatsApp */}
              <div className="medical-card p-6 border border-slate-200">
                <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">
                  Prefer Direct Booking?
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  You can also book directly by calling our reception numbers or chatting with us on WhatsApp during OPD hours.
                </p>

                <div className="space-y-3">
                  <a
                    href={HOSPITAL_INFO.links.callPrimary}
                    className="w-full btn-primary text-xs py-3 justify-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call: {HOSPITAL_INFO.phones.primaryFormatted}
                  </a>

                  <a
                    href={HOSPITAL_INFO.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-teal text-xs py-3 justify-center"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp: {HOSPITAL_INFO.phones.whatsappFormatted}
                  </a>
                </div>
              </div>

              {/* Emergency Alert Widget */}
              <div className="medical-card p-6 border-red-200 bg-red-50/50">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-emergency-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-navy-900">
                      Medical Emergency Notice
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      For acute trauma, accidents, poisoning, heart attacks, or stroke, do not wait for an online appointment. Reach our 24/7 emergency desk immediately:
                    </p>
                    <div className="pt-3">
                      <a
                        href={HOSPITAL_INFO.links.callEmergency}
                        className="btn-emergency text-xs py-2 px-4 inline-flex items-center font-bold"
                      >
                        Call 24/7 Emergency: {HOSPITAL_INFO.phones.primary}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hospital Location Summary */}
              <div className="medical-card p-6 border border-slate-200 space-y-3 text-xs text-slate-600">
                <h4 className="font-bold text-navy-900 text-sm flex items-center">
                  <MapPin className="w-4 h-4 text-teal-600 mr-2" />
                  Hospital Location
                </h4>
                <p className="leading-relaxed">
                  {HOSPITAL_INFO.address.fullAddress}
                </p>
                <p className="text-slate-500 text-[11px]">
                  Landmark: {HOSPITAL_INFO.address.landmark}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
