import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Phone, Calendar, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/services';
import { HOSPITAL_INFO } from '../data/hospital';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AppointmentForm } from '../components/forms/AppointmentForm';
import { SEOHead } from '../components/common/SEOHead';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const isEmergency = service.id === 'emergency' || service.id === 'critical-care';

  return (
    <div>
      <SEOHead
        title={`${service.title} | Devibai Super Speciality Hospital`}
        description={service.shortDesc}
        canonicalPath={`/services/${service.slug}`}
      />

      <Breadcrumbs
        items={[
          { name: 'Services', path: '/services' },
          { name: service.title }
        ]}
      />

      {/* Header */}
      <section className={`py-14 sm:py-18 text-white relative overflow-hidden ${isEmergency ? 'bg-emergency-900' : 'bg-navy-950'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isEmergency ? 'bg-red-800 text-white' : 'bg-teal-500/20 text-teal-300'}`}>
              {service.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              {service.shortDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-8">
              {/* Feature photo */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-medical max-h-96">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900 mb-3">
                  Service Description
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {service.fullDesc}
                </p>
              </div>

              {/* Key Features */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="text-base font-heading font-bold text-navy-900 mb-3">
                  Key Features & Procedures
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f, idx) => (
                    <div key={idx} className="flex items-start text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditions Treated */}
              {service.conditionsTreated && service.conditionsTreated.length > 0 && (
                <div>
                  <h3 className="text-lg font-heading font-bold text-navy-900 mb-3">
                    Conditions Evaluated & Managed
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                    {service.conditionsTreated.map((cond, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-teal-50/40 border border-teal-100 flex items-center space-x-2 text-slate-800"
                      >
                        <span className="w-2 h-2 rounded-full bg-teal-600 flex-shrink-0"></span>
                        <span className="font-medium">{cond}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Quick Action Widget */}
            <div className="lg:col-span-4 space-y-5">
              <div className="medical-card p-6 border border-slate-200">
                <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">
                  Request an Appointment
                </h3>
                <p className="text-xs text-slate-600 mb-4">
                  Schedule your consultation with the relevant clinical specialist.
                </p>

                <div className="space-y-3">
                  <a
                    href="#book-appointment"
                    className="w-full btn-teal text-xs py-3 justify-center font-bold"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Consultation
                  </a>

                  <a
                    href={HOSPITAL_INFO.links.callPrimary}
                    className="w-full btn-outline text-xs py-3 justify-center font-semibold"
                  >
                    <Phone className="w-4 h-4 mr-2 text-navy-900" />
                    Call: {HOSPITAL_INFO.phones.primary}
                  </a>

                  {isEmergency && (
                    <a
                      href={HOSPITAL_INFO.links.callEmergency}
                      className="w-full btn-emergency text-xs py-3 justify-center font-bold"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      24/7 Emergency Desk
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section id="book-appointment" className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="badge-teal mb-2">Scheduling</span>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
              Book a Consultation for {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Submit your preferred date and slot to request an appointment.
            </p>
          </div>

          <AppointmentForm />
        </div>
      </section>
    </div>
  );
};
