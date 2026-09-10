import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { HospitalService } from '../../types';

interface ServiceCardProps {
  service: HospitalService;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const isEmergency = service.id === 'emergency' || service.id === 'critical-care';

  return (
    <div
      className={`medical-card overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 ${
        isEmergency ? 'border-red-200/80 hover:border-red-400' : ''
      }`}
    >
      {/* Optional image header */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"></div>
        <div className="absolute bottom-3 left-4 right-4">
          <span className="inline-block bg-teal-600/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1">
            {service.category}
          </span>
          <h3 className="font-heading font-bold text-lg text-white drop-shadow-sm">
            {service.title}
          </h3>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {service.shortDesc}
          </p>

          <div className="mt-4 space-y-1.5">
            {service.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start text-xs text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={`/services/${service.slug}`}
            className="inline-flex items-center text-xs font-bold text-navy-900 group-hover:text-teal-700 transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/appointment"
            className="text-xs font-semibold text-teal-700 hover:text-teal-800"
          >
            Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};
