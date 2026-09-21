import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Calendar, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  HeartPulse, 
  Baby, 
  Stethoscope,
  Sparkles,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospital';
import { DOCTORS } from '../data/doctors';
import { SPECIALITIES } from '../data/specialities';
import { SERVICES } from '../data/services';
import { FACILITIES } from '../data/facilities';
import { INSURANCE_PROVIDERS, INSURANCE_DISCLAIMER } from '../data/insurance';
import { FAQS } from '../data/faqs';
import { GALLERY_ITEMS } from '../data/gallery';
import { SectionHeader } from '../components/common/SectionHeader';
import { DoctorCard } from '../components/cards/DoctorCard';
import { SpecialityCard } from '../components/cards/SpecialityCard';
import { FacilityCard } from '../components/cards/FacilityCard';
import { InsuranceCard } from '../components/cards/InsuranceCard';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { AppointmentForm } from '../components/forms/AppointmentForm';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';
import { SEOHead } from '../components/common/SEOHead';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <SEOHead
        title="Devibai Super Speciality Hospital | Multi-Speciality Hospital in Nirmal"
        description="Devibai Super Speciality Hospital in Nirmal, Telangana provides fertility & IVF, maternity, pediatric, surgical, laparoscopic, urology, emergency and critical care services."
        canonicalPath="/"
      />

      {/* ==================================================
          SECTION 3 — HERO
          ================================================== */}
      <section className="relative bg-navy-950 text-white overflow-hidden py-16 sm:py-24 lg:py-32">
        {/* Background Image with Medical Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/branding/homepage-hero.jpg"
            alt="Devibai Super Speciality Hospital Facility"
            className="w-full h-full object-cover object-[75%_center] md:object-[80%_center] lg:object-[85%_center]"
          />
          {/* Multi-layer gradient: high contrast on left for readability, soft transparency on right to showcase hospital, ambulance & doctor */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/85 to-navy-950/40 lg:from-navy-950/95 lg:via-navy-950/75 lg:via-45% lg:to-navy-950/15"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-transparent to-navy-950/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span>24/7 Emergency • Pharmacy • Laboratory • ICU Services</span>
            </div>

            {/* Hospital Main Title */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
                DEVIBAI <span className="text-teal-400">SUPER SPECIALITY</span> HOSPITAL
              </h1>
              <p className="mt-3 text-xl sm:text-2xl text-teal-200 font-medium font-heading">
                "{HOSPITAL_INFO.tagline}"
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
              Comprehensive medical, surgical, maternity, fertility, pediatric and emergency healthcare under one roof in Nirmal, Telangana.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3 sm:gap-4 items-center">
              <Link
                to="/appointment"
                id="hero-book-appointment-btn"
                className="btn-teal text-sm sm:text-base py-3.5 px-6 font-bold shadow-lg shadow-teal-900/30"
              >
                <Calendar className="w-5 h-5 mr-2" />
                <span>BOOK AN APPOINTMENT</span>
              </Link>

              <a
                href={HOSPITAL_INFO.links.callPrimary}
                id="hero-call-now-btn"
                className="btn-outline border-white/40 text-white hover:bg-white/10 hover:border-white text-sm sm:text-base py-3.5 px-6 font-semibold"
              >
                <Phone className="w-4 h-4 mr-2 text-teal-300" />
                <span>CALL NOW</span>
              </a>

              <a
                href={HOSPITAL_INFO.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 text-sm sm:text-base shadow-sm"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>WHATSAPP US</span>
              </a>
            </div>

            {/* Secondary Highlight Bar */}
            <div className="pt-4 flex items-center space-x-6 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-emergency-500 flex-shrink-0" />
                <span className="font-semibold text-white">24/7 Emergency & Critical Care</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-slate-300">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>Opp. Kaveri Hospital, Yellapalli, Nirmal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4 — 24/7 EMERGENCY HIGHLIGHT
          ================================================== */}
      <section className="bg-emergency-600 text-white py-5 px-4 sm:px-6 shadow-md relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-red-100">
                Urgent Trauma & Resuscitation
              </div>
              <div className="text-lg sm:text-xl font-bold font-heading">
                Need Immediate Emergency or Critical Care? Call 24/7
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={HOSPITAL_INFO.links.callEmergency}
              id="emergency-highlight-btn"
              className="inline-flex items-center space-x-2 bg-white text-emergency-700 hover:bg-red-50 px-6 py-3 rounded-lg font-extrabold text-sm sm:text-base transition-transform active:scale-95 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>CALL EMERGENCY: 8885558061</span>
            </a>
            <Link
              to="/services/emergency"
              className="hidden lg:inline-flex text-xs font-semibold text-white/90 hover:text-white underline underline-offset-4"
            >
              Emergency Details
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5 — QUICK SERVICE CARDS (4 CARDS)
          ================================================== */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: 24/7 Emergency */}
            <div className="medical-card p-6 border-red-200/80 hover:border-red-400 group hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-emergency-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 group-hover:text-emergency-600 transition-colors">
                24/7 Emergency
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Continuous medical readiness for accident trauma, poisoning, cardiac episodes, stroke, and ventilator ICU support.
              </p>
              <Link
                to="/services/emergency"
                className="mt-4 inline-flex items-center text-xs font-bold text-emergency-600 hover:text-emergency-700"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Card 2: Fertility & IVF */}
            <div className="medical-card p-6 hover:border-teal-400 group hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 group-hover:text-teal-700 transition-colors">
                Fertility & IVF
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dr. Chandrika's Fertility Centre providing Ovulation Induction, IUI, IVF, PCOD treatment, and hormone management.
              </p>
              <Link
                to="/services/fertility"
                className="mt-4 inline-flex items-center text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Card 3: Maternity Care */}
            <div className="medical-card p-6 hover:border-teal-400 group hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Baby className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 group-hover:text-teal-700 transition-colors">
                Maternity Care
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dedicated normal delivery, cesarean sections, high-risk pregnancy monitoring, and continuous fetal CTG surveillance.
              </p>
              <Link
                to="/services/maternity"
                className="mt-4 inline-flex items-center text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Card 4: 24/7 Pharmacy & Laboratory */}
            <div className="medical-card p-6 hover:border-navy-400 group hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 group-hover:text-navy-700 transition-colors">
                24/7 Pharmacy & Lab
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Round-the-clock dispensing of genuine medications and diagnostic laboratory services supporting timely evaluation.
              </p>
              <Link
                to="/facilities"
                className="mt-4 inline-flex items-center text-xs font-bold text-navy-900 hover:text-teal-700"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6 — ABOUT SECTION (TWO COLUMN)
          ================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hospital Image / Visual */}
            <div className="relative group">
              <div className="rounded-2xl overflow-hidden shadow-medical border border-slate-200 bg-white">
                <img
                  src="/assets/branding/about-hospital.jpg"
                  alt="Devibai Super Speciality Hospital Clinical Departments & Facilities"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-5 -right-4 sm:-bottom-6 sm:-right-6 bg-navy-900 text-white p-4 sm:p-5 rounded-xl shadow-xl border border-navy-700 max-w-[240px]">
                <div className="text-xs text-teal-300 uppercase font-semibold">Location</div>
                <div className="text-sm font-bold mt-1">Yellapalli, Nirmal</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Opp. Kaveri Hospital, Old RTO Office</div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              <div>
                <span className="badge-teal mb-3">About Our Hospital</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-navy-900 tracking-tight">
                  Comprehensive Care. One Trusted Hospital.
                </h2>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                Devibai Super Speciality Hospital is a multi-speciality healthcare facility in Nirmal, Telangana, providing medical, surgical, maternity, fertility, pediatric, neonatal, urology and emergency healthcare services.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Multi-speciality healthcare",
                  "24/7 emergency support",
                  "Fertility & IVF care",
                  "Maternity services",
                  "Pediatric & neonatal care",
                  "Surgical & laparoscopic care",
                  "ICU / critical care",
                  "24/7 pharmacy & laboratory"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <Link to="/about" className="btn-primary text-sm py-3 px-6">
                  Explore Our Hospital
                </Link>
                <Link to="/contact" className="btn-outline text-sm py-3 px-5">
                  Contact Reception
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7 — SPECIALITIES SECTION
          ================================================== */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Clinical Expertise"
            badgeVariant="teal"
            title="Our Specialities"
            subtitle="Dedicated medical and surgical departments equipped with modern clinical expertise and diagnostic support."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALITIES.map((spec) => (
              <SpecialityCard key={spec.id} speciality={spec} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/specialities" className="btn-outline text-sm py-3 px-6">
              View All Specialities & Treatments
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8 — DOCTORS SECTION (5 SPECIALISTS)
          ================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Medical Leadership"
            badgeVariant="navy"
            title="Our Doctors & Specialists"
            subtitle="Experienced physicians and surgeons dedicated to patient-centered care. Qualifications shown strictly as verified in hospital materials."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {DOCTORS.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/doctors" className="btn-teal text-sm py-3 px-6">
              View All Doctor Profiles & Timings
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9 — FERTILITY & IVF SECTION
          ================================================== */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Reproductive Medicine"
            badgeVariant="teal"
            title="Fertility & IVF Care"
            subtitle="Personalized fertility care designed around your journey."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                title: "Ovulation Induction (OI)",
                desc: "Carefully monitored medical protocols to stimulate and optimize healthy egg release."
              },
              {
                title: "Intra Uterine Insemination (IUI)",
                desc: "Assisted conception procedure timed precisely with natural ovulation cycles."
              },
              {
                title: "In Vitro Fertilization (IVF)",
                desc: "Advanced assisted reproductive technologies guided by specialist reproductive protocols."
              },
              {
                title: "Treatment for PCOD",
                desc: "Targeted clinical protocols and ovulation support for polycystic ovarian conditions."
              },
              {
                title: "Hormone Imbalance Management",
                desc: "Diagnostic endocrine evaluations to stabilize hormonal parameters supporting conception."
              }
            ].map((item, idx) => (
              <div key={idx} className="medical-card p-5 border-teal-100 hover:border-teal-300">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <h4 className="font-heading font-bold text-base text-navy-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-teal-50/60 border border-teal-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-heading font-bold text-navy-900 text-base sm:text-lg">
                Consult Dr. K. Chandrika (Diploma in ART, Germany)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Compassionate, confidential fertility evaluations in a dedicated reproductive suite.
              </p>
            </div>
            <Link
              to="/appointment?doctor=dr-k-chandrika"
              className="btn-teal text-xs sm:text-sm py-2.5 px-5 flex-shrink-0"
            >
              Book Fertility Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10 — MATERNAL SERVICES
          ================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Obstetrics & Women's Health"
            badgeVariant="teal"
            title="Complete Maternal Care"
            subtitle="Supporting mothers through pregnancy, delivery, and postpartum wellness with sensitive clinical care."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Maternal Services List */}
            <div className="medical-card p-6 sm:p-8">
              <h3 className="font-heading font-bold text-xl text-navy-900 mb-4 pb-2 border-b border-slate-100">
                Maternity & Delivery Care
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Normal Delivery", desc: "Safe, supportive vaginal delivery care with continuous monitoring." },
                  { title: "Cesarean Section", desc: "Equipped for scheduled and emergency surgical deliveries." },
                  { title: "High-Risk Pregnancy", desc: "Care for gestational hypertension, diabetes, and multiple gestation." },
                  { title: "Fetal Monitoring (CTG)", desc: "Electronic cardiotocography assessing fetal heart rate and contractions." }
                ].map((m, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <h4 className="font-bold text-sm text-navy-900">{m.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Women's Health Conditions Treated */}
            <div className="medical-card p-6 sm:p-8">
              <h3 className="font-heading font-bold text-xl text-navy-900 mb-4 pb-2 border-b border-slate-100">
                Women's Gynecological Health
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Sensitive, confidential clinical consultation and treatment for common and complex gynecological conditions:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  "Uterine Fibroids",
                  "Ovarian Cysts",
                  "Irregular Periods",
                  "Excessive Bleeding",
                  "PCOD / PCOS",
                  "PID (Pelvic Infection)",
                  "STD-related conditions",
                  "Hormonal conditions"
                ].map((cond, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-teal-50/50 border border-teal-100 font-medium text-slate-700 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-2 flex-shrink-0"></span>
                    <span>{cond}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to="/appointment?dept=Obstetrics+%26+Gynecology"
                  className="btn-primary text-xs sm:text-sm py-2.5 px-5 w-full sm:w-auto text-center"
                >
                  Book Women's Health Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 11 — SURGICAL & LAPAROSCOPIC SERVICES
          ================================================== */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Surgical Sciences"
            badgeVariant="navy"
            title="Advanced Surgical & Laparoscopic Care"
            subtitle="Led by Dr. K. Avinash Kasamwar (MS General Surgery), providing general surgery and minimally invasive keyhole procedures."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* General Surgery Card */}
            <div className="medical-card p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-navy-900" />
                <h3 className="font-heading font-bold text-xl text-navy-900">
                  Advanced Surgical Care
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                Open and specialized surgical interventions for acute abdominal, endocrine, and anorectal conditions:
              </p>
              <div className="space-y-2.5 text-xs sm:text-sm">
                {[
                  "Appendectomy (Open and emergency)",
                  "Hernia Repair (Inguinal, Umbilical, Incisional)",
                  "Hysterectomy (Surgical uterine removal)",
                  "Thyroid Surgery & Gland Resection",
                  "Breast Surgery & Mass Excisions",
                  "Piles / Fistula procedures (including laser options)",
                  "Intestinal Perforation & Intestinal Obstruction emergency surgeries"
                ].map((surg, idx) => (
                  <div key={idx} className="flex items-start text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{surg}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  to="/appointment?dept=General+Surgery"
                  className="btn-outline text-xs sm:text-sm py-2.5 px-5"
                >
                  Consult a Surgeon
                </Link>
              </div>
            </div>

            {/* Laparoscopic Surgery Card */}
            <div className="medical-card p-6 sm:p-8 bg-slate-50/50">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-teal-600" />
                <h3 className="font-heading font-bold text-xl text-navy-900">
                  Minimally Invasive Laparoscopic Surgery
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                Laparoscopic procedures are minimally invasive surgical approaches performed through keyhole incisions with optical visualization when clinically appropriate:
              </p>
              <div className="space-y-2.5 text-xs sm:text-sm">
                {[
                  "Laparoscopic Cholecystectomy (Gallbladder stone removal)",
                  "Laparoscopic Appendectomy",
                  "Laparoscopic Hysterectomy",
                  "Laparoscopic Myomectomy (Fibroid excision)",
                  "Laparoscopic Cystectomy (Ovarian cyst removal)",
                  "Laparoscopic Tubectomy",
                  "Laparoscopic Ovarian Drilling (LOD for PCOD)"
                ].map((lap, idx) => (
                  <div key={idx} className="flex items-start text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{lap}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  to="/services/laparoscopic"
                  className="btn-teal text-xs sm:text-sm py-2.5 px-5"
                >
                  Explore Laparoscopic Care
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 12 — PEDIATRIC & NEONATAL CARE
          ================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Pediatric Medicine"
            badgeVariant="teal"
            title="Specialized Care for Children & Newborns"
            subtitle="Led by Dr. Sudheer Kumar G (MBBS, MD Pediatrics, Fellowship in Neonatology IAP Delhi)."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="medical-card p-6">
              <h4 className="font-heading font-bold text-lg text-navy-900 mb-3">
                Newborn & Neonatal Care
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li>• Comprehensive newborn health evaluations</li>
                <li>• Premature and low-birth-weight baby care</li>
                <li>• Neonatal jaundice phototherapy units</li>
                <li>• Radiant warmers for temperature regulation</li>
                <li>• Specialized Mother & Infant feeding room</li>
              </ul>
            </div>

            <div className="medical-card p-6">
              <h4 className="font-heading font-bold text-lg text-navy-900 mb-3">
                Childhood Illnesses & Care
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li>• Treatment for acute childhood fevers & infections</li>
                <li>• Pediatric asthma, wheezing & nebulization facility</li>
                <li>• Diarrhea, vomiting & dehydration management</li>
                <li>• Dengue, malaria, and typhoid management</li>
                <li>• Pediatric seizure and convulsion care</li>
              </ul>
            </div>

            <div className="medical-card p-6">
              <h4 className="font-heading font-bold text-lg text-navy-900 mb-3">
                Preventive & Growth Support
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li>• Complete vaccination schedules for all ages</li>
                <li>• Growth and developmental milestone tracking</li>
                <li>• Childhood diabetes screening and guidance</li>
                <li>• Congenital heart condition preliminary evaluation</li>
                <li>• 24/7 pediatric emergency consultation access</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/appointment?doctor=dr-sudheer-kumar-g"
              className="btn-teal text-sm py-3 px-6"
            >
              Book Pediatric Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 13 — EMERGENCY & CRITICAL CARE
          ================================================== */}
      <section className="py-16 sm:py-24 bg-emergency-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/20 text-white border border-white/30 mb-3">
              Emergency Medicine & Smart ICU
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
              24/7 Emergency & Critical Care
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-red-100 font-medium">
              "When every second matters, we're here."
            </p>
            <p className="mt-2 text-sm text-red-200">
              Supervised by Critical Care Specialist Dr. Prashant Kumar Waghmare and emergency surgical teams.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {[
              "Accident Cases",
              "All Sorts of Trauma",
              "Poisoning Resuscitation",
              "Septic Shock",
              "Emergency Dialysis Coordination",
              "Severe Pneumonia",
              "Respiratory Failure",
              "Heart Failure",
              "Heart Attack (MI / Chest Pain)",
              "Paralysis / Stroke",
              "Continuous Ventilator Support",
              "24/7 Resuscitation Bay"
            ].map((cond, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/15 p-3 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                <span className="truncate">{cond}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-red-200">
                Emergency Services Available 24 Hours • 7 Days
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
                Direct Emergency Hotline: 8885558061
              </div>
            </div>

            <a
              href={HOSPITAL_INFO.links.callEmergency}
              className="btn-emergency bg-white text-emergency-800 hover:bg-red-50 text-base sm:text-lg py-4 px-8 font-extrabold shadow-2xl flex-shrink-0"
            >
              <PhoneCall className="w-5 h-5 mr-2 text-emergency-600 animate-pulse" />
              <span>CALL EMERGENCY</span>
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 14 — 24/7 PHARMACY & LABORATORY
          ================================================== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Essential Services"
            badgeVariant="navy"
            title="24/7 PHARMACY & LAB SERVICES"
            subtitle="Continuous diagnostic and medication support directly inside the hospital campus."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="medical-card overflow-hidden border-navy-200/80 flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 sm:h-56 overflow-hidden bg-slate-100 relative">
                <img
                  src="/assets/facilities/pharmacy-24-7.jpg"
                  alt="24/7 In-House Pharmacy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3 bg-navy-900/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                  Round-the-Clock
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-heading font-extrabold text-2xl text-white drop-shadow-sm">
                    24/7 PHARMACY
                  </h3>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    "Round-the-clock pharmacy services for patient convenience."
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Fully stocked with genuine emergency medications, critical care injectables, pediatric formulations, and surgical consumables.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-navy-800">In-Hospital Dispensing</span>
                  <Link to="/facilities" className="text-xs font-bold text-navy-700 hover:text-navy-900">
                    View Facility Details →
                  </Link>
                </div>
              </div>
            </div>

            <div className="medical-card overflow-hidden border-teal-200/80 flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 sm:h-56 overflow-hidden bg-slate-100 relative">
                <img
                  src="/assets/facilities/diagnostic-laboratory-24-7.jpg"
                  alt="24/7 Diagnostic Laboratory"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3 bg-teal-800/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                  Fast & Accurate
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-heading font-extrabold text-2xl text-white drop-shadow-sm">
                    24/7 DIAGNOSTIC LABORATORY
                  </h3>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    "Diagnostic laboratory services supporting timely medical evaluation."
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Rapid turnaround diagnostic testing for hematology, biochemistry, infectious disease markers, hormone assays, and critical care monitoring.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-800">Automated Equipment</span>
                  <Link to="/facilities" className="text-xs font-bold text-teal-700 hover:text-teal-900">
                    View Facility Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 15 — INSURANCE & AROGYASRI
          ================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Healthcare Schemes & TPA"
            badgeVariant="teal"
            title="Insurance & Healthcare Schemes"
            subtitle="Displaying the healthcare schemes and TPA networks shown in hospital materials."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {INSURANCE_PROVIDERS.map((ins) => (
              <InsuranceCard key={ins.id} provider={ins} />
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed text-center max-w-3xl mx-auto">
            <strong>Important Notice:</strong> {INSURANCE_DISCLAIMER}
          </div>

          <div className="mt-8 text-center flex items-center justify-center gap-4">
            <Link to="/arogyasri" className="btn-teal text-xs sm:text-sm py-2.5 px-5">
              Aarogyasri Details
            </Link>
            <Link to="/insurance" className="btn-outline text-xs sm:text-sm py-2.5 px-5">
              Insurance Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 16 — FACILITIES
          ================================================== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Hospital Infrastructure"
            badgeVariant="navy"
            title="Hospital Facilities"
            subtitle="Facilities verified and supported by official hospital materials."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES.slice(0, 8).map((fac) => (
              <FacilityCard key={fac.id} facility={fac} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/facilities" className="btn-outline text-sm py-3 px-6">
              View Complete Hospital Infrastructure
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 17 — GALLERY
          ================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Hospital Photos"
            badgeVariant="teal"
            title="Hospital Gallery"
            subtitle="Official imagery of Devibai Super Speciality Hospital, specialist doctors, and clinical care units."
          />

          <GalleryGrid items={GALLERY_ITEMS.slice(0, 8)} showCategoryFilter={false} />

          <div className="mt-10 text-center">
            <Link to="/gallery" className="btn-teal text-sm py-3 px-6">
              Explore Full Filterable Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 18 — FAQ
          ================================================== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Frequently Asked Questions"
            badgeVariant="navy"
            title="Hospital FAQs"
            subtitle="Accurate answers regarding hospital services, emergency availability, doctors, and appointments."
          />

          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      {/* ==================================================
          SECTION 19 — APPOINTMENT CTA
          ================================================== */}
      <section className="py-16 sm:py-24 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Patient Scheduling"
            badgeVariant="teal"
            title="Book an Appointment"
            subtitle="Submit your appointment request online. Our hospital reception desk will contact you to confirm doctor availability."
          />

          <AppointmentForm />
        </div>
      </section>

      {/* ==================================================
          SECTION 20 — CONTACT + GOOGLE MAPS
          ================================================== */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact Details */}
            <div className="space-y-6">
              <div>
                <span className="badge-navy mb-3">Visit Hospital</span>
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-navy-900 tracking-tight">
                  Hospital Location & Contact
                </h2>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                  <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-900 font-bold mb-1">
                      DEVIBAI SUPER SPECIALITY HOSPITAL
                    </strong>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                      Opposite Kaveri Hospital, Old RTO Office, Yellapalli, Nirmal – 504106, Telangana, India.
                    </p>
                    <span className="inline-block text-xs text-slate-500 mt-1">
                      (Also noted as Beside DS Mart, Mancherial Road, Shastrinagar, Nirmal)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="text-xs font-bold text-slate-500 uppercase">Hospital Phone</div>
                    <div className="text-sm font-bold text-navy-900 mt-1">
                      {HOSPITAL_INFO.phones.primary} / {HOSPITAL_INFO.phones.secondary}
                    </div>
                    <div className="text-xs text-slate-500">Landline: {HOSPITAL_INFO.phones.landline}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
                    <div className="text-xs font-bold text-emerald-800 uppercase">WhatsApp Inquiry</div>
                    <div className="text-sm font-bold text-emerald-900 mt-1">
                      {HOSPITAL_INFO.phones.whatsappFormatted}
                    </div>
                    <div className="text-xs text-emerald-700">Message anytime</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={HOSPITAL_INFO.links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs sm:text-sm py-3 px-5"
                >
                  <MapPin className="w-4 h-4 mr-2 text-teal-300" />
                  Get Directions
                </a>
                <a
                  href={HOSPITAL_INFO.links.callPrimary}
                  className="btn-outline text-xs sm:text-sm py-3 px-5"
                >
                  <Phone className="w-4 h-4 mr-2 text-navy-900" />
                  Call Hospital
                </a>
                <a
                  href={HOSPITAL_INFO.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-teal text-xs sm:text-sm py-3 px-5"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-medical bg-slate-100 aspect-[4/3] relative">
              <iframe
                title="Devibai Super Speciality Hospital Location Map"
                src="https://maps.google.com/maps?q=Devibai+Super+Speciality+Hospital+Yellapalli+Nirmal+Telangana&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 rounded-lg text-xs font-bold text-navy-900 shadow-md border border-slate-200 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>Nirmal – 504106</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Footer Medical Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MedicalDisclaimer isEmergencyOnly={false} />
      </div>
    </div>
  );
};
