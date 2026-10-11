import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  PhoneCall, 
  Calendar 
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospital';
import { InstagramIcon, YoutubeIcon, FacebookIcon } from '../components/common/SocialIcons';
import { SPECIALITIES } from '../data/specialities';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeader } from '../components/common/SectionHeader';
import { ReviewsSection } from '../components/common/ReviewsSection';
import { SEOHead } from '../components/common/SEOHead';

export const AboutPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="About Us | Devibai Super Speciality Hospital Nirmal"
        description="Learn about Devibai Super Speciality Hospital in Nirmal, Telangana. Multi-speciality medical, surgical, maternity, pediatric, and 24/7 critical care services."
        canonicalPath="/about"
      />

      <Breadcrumbs items={[{ name: 'About Hospital' }]} />

      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/branding/homepage-hero.jpg"
            alt="Devibai Hospital Facility"
            className="w-full h-full object-cover opacity-25 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="badge-teal mb-3">About Hospital</span>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Devibai Super Speciality Hospital
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-teal-200 font-medium">
              "{HOSPITAL_INFO.tagline}"
            </p>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Established to provide multi-speciality clinical excellence, advanced diagnostics, and compassionate healthcare to patients and families in Nirmal and surrounding regions of Telangana.
            </p>

            {/* Social Media Links in About Hero */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-teal-300 flex items-center">
                <span className="w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                Follow Us:
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <a
                  href={HOSPITAL_INFO.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="about-hero-instagram-btn"
                  aria-label="Follow Dr. Chandrika on Instagram"
                  className="group inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] text-white border border-white/20 hover:border-transparent transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-300 group-hover:text-white transition-colors" />
                  <span className="text-xs font-semibold">Instagram</span>
                </a>

                <a
                  href={HOSPITAL_INFO.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="about-hero-youtube-btn"
                  aria-label="Watch Devibai Hospital on YouTube"
                  className="group inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF0000] text-white border border-white/20 hover:border-[#FF0000] transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                >
                  <YoutubeIcon className="w-3.5 h-3.5 text-red-400 group-hover:text-white transition-colors" />
                  <span className="text-xs font-semibold">YouTube</span>
                </a>

                <a
                  href={HOSPITAL_INFO.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="about-hero-facebook-btn"
                  aria-label="Follow Devibai Hospital on Facebook"
                  className="group inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#1877F2] text-white border border-white/20 hover:border-[#1877F2] transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                >
                  <FacebookIcon className="w-3.5 h-3.5 text-blue-400 group-hover:text-white transition-colors" />
                  <span className="text-xs font-semibold">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are & Healthcare Philosophy */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-navy mb-3">Who We Are</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-navy-900 tracking-tight">
                Comprehensive Healthcare. One Trusted Destination.
              </h2>
              <p className="mt-4 text-base text-slate-700 leading-relaxed">
                Devibai Super Speciality Hospital is a modern multi-speciality healthcare centre situated beside DS Mart, Mancherial Road, Shastri Nagar, Nirmal.
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                We integrate comprehensive clinical disciplines — from dedicated fertility and IVF care under Dr. K. Chandrika to general and laparoscopic surgery under Dr. K. Avinash Kasamwar, internal medicine and critical care under Dr. Prashant Kumar Waghmare, pediatric and neonatal care under Dr. Sudheer Kumar G, and visiting urology consultations by Dr. K. Ravichandra.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Patient-centric clinical protocols designed around safety and dignity",
                  "24/7 continuous emergency triage and intensive care unit (Smart ICU)",
                  "In-house 24/7 round-the-clock pharmacy and diagnostic laboratory",
                  "Facilitation for Rajiv Aarogyasri and leading health insurance TPAs"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2.5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-medical border border-slate-200">
                <img
                  src="/assets/gallery/all-doctors-team.jpg"
                  alt="Devibai Hospital Medical Specialists"
                  className="w-full h-auto object-cover rounded-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/branding/about-hospital.jpg';
                  }}
                />
              </div>
              <div className="mt-3 text-center text-xs text-slate-500 italic">
                Our consultant medical, surgical, pediatric, and critical care specialists
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Departments Overview */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Departments"
            badgeVariant="teal"
            title="Our Specialities & Healthcare Services"
            subtitle="Clinical services offered under specialist medical guidance at Devibai Super Speciality Hospital."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALITIES.map((spec) => (
              <div key={spec.id} className="medical-card p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">
                    {spec.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {spec.shortDesc}
                  </p>
                  <div className="space-y-1 text-xs text-slate-700">
                    {spec.treatments.slice(0, 3).map((t, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-2"></span>
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <Link
                    to={`/specialities/${spec.slug}`}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800"
                  >
                    View Speciality Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Round the Clock Care */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Hospital Infrastructure"
            badgeVariant="navy"
            title="Modern Infrastructure & 24/7 Support"
            subtitle="Equipped for routine consultations as well as acute life-saving medical care."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "24/7 Emergency",
                desc: "Immediate trauma, poisoning, cardiac, and acute medical resuscitation available at all hours."
              },
              {
                title: "Smart ICU",
                desc: "Equipped with mechanical ventilators and continuous multipara monitoring for critical patients."
              },
              {
                title: "24/7 Pharmacy",
                desc: "Round-the-clock access to genuine emergency medicines and surgical consumables."
              },
              {
                title: "24/7 Laboratory",
                desc: "On-site diagnostic investigations for rapid clinical decision making."
              }
            ].map((f, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center mb-3">
                  0{idx + 1}
                </div>
                <h4 className="font-heading font-bold text-base text-navy-900 mb-1">{f.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Reviews Section */}
      <ReviewsSection />

      {/* Contact CTA */}
      <section className="py-14 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold">
            Need Medical Guidance or an Appointment?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Our hospital reception is ready to assist you. Book an appointment online, call our help desk, or visit our hospital in Nirmal.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/appointment" className="btn-teal text-sm py-3 px-6">
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Link>
            <a href={HOSPITAL_INFO.links.callPrimary} className="btn-outline border-white/40 text-white hover:bg-white/10 text-sm py-3 px-6">
              <PhoneCall className="w-4 h-4 mr-2 text-teal-300" />
              Call Reception: {HOSPITAL_INFO.phones.primary}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
