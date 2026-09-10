import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Calendar, Phone, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { SPECIALITIES } from '../data/specialities';
import { DOCTORS } from '../data/doctors';
import { HOSPITAL_INFO } from '../data/hospital';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DoctorCard } from '../components/cards/DoctorCard';
import { AppointmentForm } from '../components/forms/AppointmentForm';
import { SEOHead } from '../components/common/SEOHead';

export const SpecialityDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const speciality = SPECIALITIES.find((s) => s.slug === slug);

  if (!speciality) {
    return <Navigate to="/specialities" replace />;
  }

  const assignedDoctors = DOCTORS.filter((d) =>
    speciality.doctorIds.includes(d.id)
  );

  const isEmergency = speciality.id === 'emergency-critical-care';

  return (
    <div>
      <SEOHead
        title={`${speciality.title} Department | Devibai Super Speciality Hospital`}
        description={speciality.shortDesc}
        canonicalPath={`/specialities/${speciality.slug}`}
      />

      <Breadcrumbs
        items={[
          { name: 'Specialities', path: '/specialities' },
          { name: speciality.title }
        ]}
      />

      {/* Header */}
      <section className={`py-14 sm:py-18 text-white relative overflow-hidden ${isEmergency ? 'bg-emergency-900' : 'bg-navy-950'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isEmergency ? 'bg-red-800 text-white border border-red-700' : 'bg-teal-500/20 text-teal-300 border border-teal-400/30'}`}>
              Clinical Department
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              {speciality.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              {speciality.shortDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Details & Treatments */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900 mb-3">
                  Overview of Care
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {speciality.fullDesc}
                </p>
              </div>

              {/* Department Highlights */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="text-base font-heading font-bold text-navy-900 mb-3">
                  Department Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {speciality.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2.5 flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Treatments List */}
              <div>
                <h3 className="text-lg font-heading font-bold text-navy-900 mb-4">
                  Conditions & Treatments Evaluated
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {speciality.treatments.map((treatment, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-teal-50/40 border border-teal-100 flex items-center space-x-2 text-slate-800"
                    >
                      <span className="w-2 h-2 rounded-full bg-teal-600 flex-shrink-0"></span>
                      <span className="font-medium">{treatment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Quick Action Widget */}
            <div className="lg:col-span-4 space-y-5">
              <div className="medical-card p-6 border border-slate-200">
                <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">
                  Need a Consultation?
                </h3>
                <p className="text-xs text-slate-600 mb-4">
                  Request an appointment with our specialists or reach out to our hospital helpline.
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

      {/* Associated Specialists */}
      {assignedDoctors.length > 0 && (
        <section className="py-14 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy-900 mb-6">
              Department Specialists
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Appointment Form */}
      <section id="book-appointment" className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="badge-teal mb-2">Scheduling</span>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
              Request an Appointment in {speciality.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fill out the form below to request a consultation with the department.
            </p>
          </div>

          <AppointmentForm initialDepartment={speciality.title} />
        </div>
      </section>
    </div>
  );
};
