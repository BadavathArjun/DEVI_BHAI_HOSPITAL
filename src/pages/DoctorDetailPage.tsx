import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Award, 
  Calendar, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { DOCTORS } from '../data/doctors';
import { SPECIALITIES } from '../data/specialities';
import { HOSPITAL_INFO } from '../data/hospital';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AppointmentForm } from '../components/forms/AppointmentForm';
import { SEOHead } from '../components/common/SEOHead';

export const DoctorDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const doctor = DOCTORS.find((d) => d.slug === slug);

  if (!doctor) {
    return <Navigate to="/doctors" replace />;
  }

  // Related specialities
  const relatedSpecialities = SPECIALITIES.filter((sp) =>
    sp.doctorIds.includes(doctor.id)
  );

  return (
    <div>
      <SEOHead
        title={`${doctor.name} - ${doctor.specialization} | Devibai Hospital Nirmal`}
        description={`Consult ${doctor.name} (${doctor.qualifications}) at Devibai Super Speciality Hospital, Nirmal. Specializing in ${doctor.specialization}.`}
        canonicalPath={`/doctors/${doctor.slug}`}
      />

      <Breadcrumbs
        items={[
          { name: 'Doctors', path: '/doctors' },
          { name: doctor.name }
        ]}
      />

      {/* Profile Header */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Doctor Photo */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="medical-card p-3 rounded-2xl overflow-hidden border border-slate-200 shadow-medical">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {doctor.role && (
                    <div className="absolute top-3 left-3 bg-navy-900/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                      {doctor.role}
                    </div>
                  )}
                </div>

                {/* Quick Action Buttons Under Photo */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={HOSPITAL_INFO.links.callPrimary}
                    className="btn-outline text-xs py-2.5 px-3 text-center justify-center font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5 mr-1.5 text-navy-900" />
                    Call Hospital
                  </a>
                  <a
                    href={`https://wa.me/919092915222?text=Hello%20Devibai%20Hospital,%20I%20would%20like%20to%20enquire%20about%20consultation%20with%20${encodeURIComponent(doctor.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-teal text-xs py-2.5 px-3 text-center justify-center font-semibold"
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Info, Bio & Credentials */}
            <div className="md:col-span-7 lg:col-span-8 space-y-6">
              <div>
                <div className="flex items-baseline space-x-3">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-navy-900">
                    {doctor.name}
                  </h1>
                </div>
                {doctor.teluguName && (
                  <div className="text-sm font-medium text-teal-800 font-sans mt-0.5">
                    {doctor.teluguName}
                  </div>
                )}
                <div className="mt-2 text-base font-semibold text-teal-700">
                  {doctor.specialization}
                </div>
              </div>

              {/* Exact Qualifications Banner */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3">
                <Award className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Verified Medical Qualifications
                  </div>
                  <div className="text-sm sm:text-base font-bold text-navy-900 mt-0.5">
                    {doctor.qualifications}
                  </div>
                </div>
              </div>

              {/* About Doctor */}
              <div>
                <h2 className="text-lg font-heading font-bold text-navy-900 mb-2">
                  About {doctor.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {doctor.bio}
                </p>
              </div>

              {/* Areas of Expertise */}
              <div>
                <h3 className="text-base font-heading font-bold text-navy-900 mb-3">
                  Areas of Expertise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {doctor.areasOfExpertise.map((area, idx) => (
                    <div key={idx} className="flex items-start text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Services Provided */}
              <div>
                <h3 className="text-base font-heading font-bold text-navy-900 mb-3">
                  Clinical Procedures & Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-teal-50 text-teal-900 border border-teal-200/60 text-xs font-medium px-3 py-1.5 rounded-lg"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consulting Hours Notice */}
              {doctor.scheduleInfo && (
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/60 text-xs sm:text-sm text-blue-900 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Consultation Availability:</strong>
                    <span>{doctor.scheduleInfo}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking Section for this Doctor */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="badge-teal mb-2">Direct Appointment Request</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
              Book a Consultation with {doctor.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Submit your preferred date and slot. Our hospital desk will verify doctor availability and contact you.
            </p>
          </div>

          <AppointmentForm initialDoctorId={doctor.slug} />
        </div>
      </section>

      {/* Related Specialities */}
      {relatedSpecialities.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-heading font-bold text-navy-900 mb-6">
              Related Clinical Specialities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedSpecialities.map((spec) => (
                <div key={spec.id} className="medical-card p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-base text-navy-900 mb-1">{spec.title}</h4>
                    <p className="text-xs text-slate-600">{spec.shortDesc}</p>
                  </div>
                  <Link
                    to={`/specialities/${spec.slug}`}
                    className="mt-4 text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center"
                  >
                    <span>View Speciality Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
