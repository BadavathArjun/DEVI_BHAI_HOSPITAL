import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, Mail, Clock, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospital';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-navy-800/80">
          {/* Col 1: Hospital Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white p-0.5 border border-navy-700">
                <img
                  src="/assets/branding/db-logo.jpg"
                  alt="Devibai Hospital Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-heading font-extrabold text-lg tracking-tight">
                  DEVIBAI
                </h3>
                <div className="text-xs uppercase tracking-wider text-teal-400 font-semibold">
                  Super Speciality Hospital
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 italic">
              "{HOSPITAL_INFO.tagline}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {HOSPITAL_INFO.supportingTagline}. Providing medical, surgical, maternity, fertility, pediatric, neonatal, urology, and 24/7 critical care in Nirmal, Telangana.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700/60 text-xs text-teal-300">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>24/7 Emergency & ICU Always Open</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-teal-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Hospital</Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">Our Doctors & Specialists</Link>
              </li>
              <li>
                <Link to="/specialities" className="hover:text-white transition-colors">Medical Specialities</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Clinical Services</Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-white transition-colors">Hospital Facilities</Link>
              </li>
              <li>
                <Link to="/insurance" className="hover:text-white transition-colors">Insurance & TPA</Link>
              </li>
              <li>
                <Link to="/arogyasri" className="hover:text-white transition-colors">Rajiv Aarogyasri</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">Hospital Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact & Directions</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Clinical Services */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-teal-400">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/fertility" className="hover:text-white transition-colors">Fertility & IVF Care</Link>
              </li>
              <li>
                <Link to="/services/maternity" className="hover:text-white transition-colors">Maternal & Delivery Care</Link>
              </li>
              <li>
                <Link to="/services/pediatric" className="hover:text-white transition-colors">Pediatric & Neonatology</Link>
              </li>
              <li>
                <Link to="/services/surgical" className="hover:text-white transition-colors">General Surgery</Link>
              </li>
              <li>
                <Link to="/services/laparoscopic" className="hover:text-white transition-colors">Laparoscopic Surgery</Link>
              </li>
              <li>
                <Link to="/specialities/general-medicine" className="hover:text-white transition-colors">General Medicine & Diabetes</Link>
              </li>
              <li>
                <Link to="/specialities/urology" className="hover:text-white transition-colors">Urology & Stone Care</Link>
              </li>
              <li>
                <Link to="/services/emergency" className="text-red-400 hover:text-red-300 font-semibold flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
                  24/7 Emergency & Trauma
                </Link>
              </li>
              <li>
                <Link to="/services/critical-care" className="hover:text-white transition-colors">Smart ICU & Critical Care</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-teal-400">
              Contact Hospital
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-slate-300">
                  {HOSPITAL_INFO.address.fullAddress}
                  <span className="block text-[11px] text-slate-400 mt-1">
                    (Landmark: {HOSPITAL_INFO.address.landmark})
                  </span>
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <div className="text-xs">
                  <a href={HOSPITAL_INFO.links.callPrimary} className="hover:text-white font-medium">
                    {HOSPITAL_INFO.phones.primaryFormatted}
                  </a>
                  {' / '}
                  <a href={HOSPITAL_INFO.links.callSecondary} className="hover:text-white font-medium">
                    {HOSPITAL_INFO.phones.secondaryFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-300">
                  Landline:{' '}
                  <a href={HOSPITAL_INFO.links.callLandline} className="hover:text-white font-medium">
                    {HOSPITAL_INFO.phones.landline}
                  </a>
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={HOSPITAL_INFO.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-300 hover:text-emerald-200 font-medium"
                >
                  WhatsApp: {HOSPITAL_INFO.phones.whatsappFormatted}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={HOSPITAL_INFO.links.callEmergency}
                  className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-emergency-700/80 hover:bg-emergency-600 text-white font-bold text-xs transition-colors border border-red-500/40"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>24/7 Emergency: {HOSPITAL_INFO.phones.primary}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Medical & Insurance Disclaimer */}
        <div className="py-6 border-b border-navy-800/80 text-xs text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-300">Medical Disclaimer:</strong> {HOSPITAL_INFO.disclaimers.medical}
          </p>
          <p>
            <strong className="text-slate-300">Emergency Notice:</strong> {HOSPITAL_INFO.disclaimers.emergency}
          </p>
          <p>
            <strong className="text-slate-300">Healthcare Scheme Notice:</strong> {HOSPITAL_INFO.disclaimers.insurance}
          </p>
        </div>

        {/* Bottom Rights & Admin Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Devibai Super Speciality Hospital, Nirmal. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-teal-400 text-slate-500 transition-colors" title="Hospital Staff / CMS Portal">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
