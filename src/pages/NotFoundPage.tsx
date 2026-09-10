import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PhoneCall, Calendar, Search } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospital';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Page Not Found (404) | Devibai Super Speciality Hospital"
        description="The requested page could not be found on Devibai Super Speciality Hospital website."
        canonicalPath="/404"
      />

      <section className="min-h-[60vh] py-20 bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-5">
          <div className="w-20 h-20 bg-teal-100 text-teal-700 font-heading font-extrabold text-3xl rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            404
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-navy-900">
            Page Not Found
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Please navigate to one of our core hospital sections below:
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="btn-primary text-xs sm:text-sm py-2.5 px-5 w-full sm:w-auto">
              <Home className="w-4 h-4 mr-1.5" />
              Return Home
            </Link>

            <Link to="/appointment" className="btn-teal text-xs sm:text-sm py-2.5 px-5 w-full sm:w-auto">
              <Calendar className="w-4 h-4 mr-1.5" />
              Book Appointment
            </Link>
          </div>

          <div className="pt-6 border-t border-slate-200 text-xs text-slate-500">
            Need urgent assistance? Call our 24/7 Emergency helpline:{' '}
            <a href={HOSPITAL_INFO.links.callEmergency} className="text-emergency-600 font-bold hover:underline">
              {HOSPITAL_INFO.phones.primary}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
