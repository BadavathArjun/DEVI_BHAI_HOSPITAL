import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneCall, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Activity, 
  ShieldAlert, 
  ArrowRight,
  HeartPulse
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospital';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';

export const EmergencyPage: React.FC = () => {
  const emergencyConditions = [
    { title: "Accident Cases", desc: "Road traffic collisions, high-velocity injuries, and acute orthopedic trauma." },
    { title: "All Sorts of Trauma", desc: "Blunt abdominal trauma, head injuries, lacerations, and severe hemorrhage." },
    { title: "Poisoning Resuscitation", desc: "Immediate gastric lavage, toxicology stabilization, and antidote protocols." },
    { title: "Septic Shock", desc: "Rapid volume resuscitation, vasopressor support, and targeted broad-spectrum therapy." },
    { title: "Emergency Dialysis", desc: "Acute renal failure emergency hemodialysis stabilization and coordination." },
    { title: "Severe Pneumonia", desc: "Hypoxemic respiratory stabilization and continuous aerosolized pharmacotherapy." },
    { title: "Respiratory Failure", desc: "Invasive and non-invasive mechanical ventilation support in Smart ICU." },
    { title: "Heart Failure", desc: "Decompensated acute cardiac pulmonary edema and inotropic therapy." },
    { title: "Heart Attack (MI / Chest Pain)", desc: "Immediate triage, cardiac enzymes, oxygenation, and acute thrombolysis protocols." },
    { title: "Paralysis / Stroke", desc: "Acute ischemic stroke stabilization and immediate neuro-monitoring." },
    { title: "Ventilator Support", desc: "Round-the-clock mechanical ventilatory care supervised by critical care doctors." },
    { title: "Pediatric Emergencies", desc: "High fevers with seizures, acute respiratory distress, and neonatal collapse." }
  ];

  return (
    <div>
      <SEOHead
        title="24/7 Emergency & Critical Care | Devibai Super Speciality Hospital Nirmal"
        description="24/7 Emergency Care in Nirmal. Call 8885558061 for accident trauma, poisoning, cardiac arrest, heart attack, stroke, respiratory failure, and Smart ICU ventilator support."
        canonicalPath="/emergency"
      />

      <Breadcrumbs items={[{ name: '24/7 Emergency & Critical Care' }]} />

      {/* High Urgency Emergency Header */}
      <section className="bg-emergency-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/facilities/emergency-trauma-care.jpg"
            alt="Emergency Resuscitation"
            className="w-full h-full object-cover opacity-20 filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emergency-950 via-emergency-950/90 to-red-900/80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider backdrop-blur-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
              <span>24 Hours • 7 Days • 365 Days Immediate Care</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
                24/7 Emergency & Critical Care
              </h1>
              <p className="mt-3 text-xl sm:text-2xl text-red-100 font-medium">
                "When every second matters, we're here."
              </p>
            </div>

            <p className="text-base sm:text-lg text-red-200 leading-relaxed font-normal">
              Continuous medical readiness for accident trauma, acute poisoning, cardiac emergencies, stroke, and life-threatening respiratory collapse in Nirmal, Telangana.
            </p>

            <div className="pt-4 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 items-stretch xs:items-center">
              <a
                href={HOSPITAL_INFO.links.callEmergency}
                id="emergency-page-call-btn"
                className="btn-emergency bg-white text-emergency-800 hover:bg-red-50 text-xs xs:text-sm sm:text-lg py-3.5 sm:py-4 px-4 sm:px-8 font-extrabold shadow-2xl transition-transform active:scale-95 w-full xs:w-auto text-center justify-center"
              >
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emergency-600 animate-pulse flex-shrink-0" />
                <span>CALL EMERGENCY: 8885558061</span>
              </a>

              <a
                href={HOSPITAL_INFO.links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-white text-white hover:bg-white/10 text-sm sm:text-base py-3 sm:py-4 px-5 sm:px-6 font-semibold w-full xs:w-auto text-center justify-center"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Emergency Directions
              </a>
            </div>

            <div className="text-xs text-red-200 italic pt-2">
              * This website does not replace emergency medical care. If experiencing an immediate life threat, call our emergency helpline or proceed directly to the hospital triage bay.
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Treated in Emergency */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="badge-emergency mb-2">Clinical Triage Readiness</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-navy-900 tracking-tight">
              Emergency Conditions Handled
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Conditions and clinical services explicitly supported and staffed by our emergency and critical care department:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyConditions.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-red-100 bg-red-50/30 hover:border-red-300 hover:bg-red-50/60 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emergency-600"></span>
                    <h3 className="font-heading font-bold text-base text-navy-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart ICU & Critical Care Feature */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="badge-navy mb-3">Intensive Care</span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
                Critical Care & Smart ICU Support
              </h3>
              <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                Our Smart ICU is supervised by Consultant Physician & Critical Care Specialist Dr. Prashant Kumar Waghmare (MD General Medicine). Designed for continuous multi-parameter physiological surveillance and advanced life-support interventions.
              </p>

              <div className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  <span>Continuous multipara cardiac, invasive arterial, and vitals monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  <span>Advanced mechanical ventilator support for respiratory failure and ARDS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  <span>Septic shock resuscitation protocols and inotropic hemodynamic titration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  <span>Emergency dialysis coordination and acute electrolyte correction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  <span>Post-operative critical care monitoring for major surgical cases</span>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/services/critical-care" className="btn-outline text-xs sm:text-sm py-2.5 px-5">
                  Critical Care Department Details →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-medical">
              <img
                src="/assets/facilities/emergency-trauma-care.jpg"
                alt="Devibai Hospital Emergency & Critical Care"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Helpline Bottom Banner */}
      <section className="py-12 bg-emergency-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            Emergency Desk Open Right Now
          </h3>
          <p className="text-xs sm:text-sm text-red-100">
            Opposite Kaveri Hospital, Old RTO Office, Yellapalli, Nirmal – 504106, Telangana.
          </p>
          <div className="pt-2">
            <a
              href={HOSPITAL_INFO.links.callEmergency}
              className="btn-emergency bg-white text-emergency-800 hover:bg-red-50 text-base py-3.5 px-8 font-extrabold inline-flex items-center"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              Call Emergency: 8885558061
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
