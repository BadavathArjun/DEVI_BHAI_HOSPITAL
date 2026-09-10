import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Clock, 
  ExternalLink, 
  PhoneCall, 
  AlertTriangle 
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospital';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ContactForm } from '../components/forms/ContactForm';
import { SectionHeader } from '../components/common/SectionHeader';
import { SEOHead } from '../components/common/SEOHead';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Contact & Hospital Directions | Devibai Super Speciality Hospital"
        description="Contact Devibai Super Speciality Hospital in Nirmal, Telangana. Phone numbers 8885558061, 8885558062, WhatsApp 9092915222, address and Google Maps directions."
        canonicalPath="/contact"
      />

      <Breadcrumbs items={[{ name: 'Contact & Directions' }]} />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Get In Touch"
            badgeVariant="navy"
            title="Contact Devibai Hospital"
            subtitle="Reach our hospital reception, emergency desk, or specialist outpatient departments. We are located in Yellapalli, Nirmal."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Contact Info & Map */}
            <div className="lg:col-span-6 space-y-6">
              {/* Address Card */}
              <div className="medical-card p-6 border border-slate-200">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-navy-900 mb-1">
                      Hospital Address
                    </h3>
                    <p className="text-sm font-semibold text-slate-800">
                      DEVIBAI SUPER SPECIALITY HOSPITAL
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Opposite Kaveri Hospital, Old RTO Office, Yellapalli, Nirmal – 504106, Telangana, India.
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5">
                      (Also noted as Beside DS Mart, Mancherial Road, Shastrinagar, Nirmal)
                    </p>

                    <div className="pt-4 flex flex-wrap gap-2.5">
                      <a
                        href={HOSPITAL_INFO.links.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs py-2 px-4 font-bold"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        Get Google Maps Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone & Helpline Directory */}
              <div className="medical-card p-6 border border-slate-200 space-y-4">
                <h3 className="font-heading font-bold text-lg text-navy-900 border-b border-slate-100 pb-2 flex items-center">
                  <Phone className="w-4 h-4 text-teal-600 mr-2" />
                  Telephone Directory
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
                    <div className="text-slate-500 text-xs font-semibold uppercase">Mobile 1 (Helpline)</div>
                    <a href={HOSPITAL_INFO.links.callPrimary} className="font-bold text-navy-900 hover:text-teal-700 text-base mt-0.5 block">
                      {HOSPITAL_INFO.phones.primaryFormatted}
                    </a>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
                    <div className="text-slate-500 text-xs font-semibold uppercase">Mobile 2</div>
                    <a href={HOSPITAL_INFO.links.callSecondary} className="font-bold text-navy-900 hover:text-teal-700 text-base mt-0.5 block">
                      {HOSPITAL_INFO.phones.secondaryFormatted}
                    </a>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
                    <div className="text-slate-500 text-xs font-semibold uppercase">Landline Reception</div>
                    <a href={HOSPITAL_INFO.links.callLandline} className="font-bold text-navy-900 hover:text-teal-700 text-base mt-0.5 block">
                      {HOSPITAL_INFO.phones.landline}
                    </a>
                  </div>

                  <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200/70">
                    <div className="text-emerald-800 text-xs font-semibold uppercase">WhatsApp Chat</div>
                    <a
                      href={HOSPITAL_INFO.links.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-900 hover:text-emerald-700 text-base mt-0.5 block"
                    >
                      {HOSPITAL_INFO.phones.whatsappFormatted}
                    </a>
                  </div>
                </div>

                {/* 24/7 Emergency Helpline Callout */}
                <div className="p-4 rounded-xl bg-emergency-50 border border-emergency-200 text-emergency-900 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-emergency-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <strong className="block text-emergency-800 uppercase font-bold text-xs">
                      24/7 Emergency & ICU Immediate Helpline
                    </strong>
                    <span>Direct line for urgent ambulances and critical trauma: </span>
                    <a href={HOSPITAL_INFO.links.callEmergency} className="font-extrabold underline hover:text-emergency-700">
                      {HOSPITAL_INFO.phones.primary}
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-medical bg-slate-100 aspect-[16/10]">
                <iframe
                  title="Devibai Super Speciality Hospital Nirmal Map"
                  src="https://maps.google.com/maps?q=Devibai+Super+Speciality+Hospital+Yellapalli+Nirmal+Telangana&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
