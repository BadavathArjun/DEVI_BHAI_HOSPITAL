import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Facility } from '../../types';

interface FacilityCardProps {
  facility: Facility;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  return (
    <div className="medical-card overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={facility.image}
          alt={facility.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"></div>
        {facility.badge && (
          <div className="absolute top-3 right-3 bg-teal-700/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
            {facility.badge}
          </div>
        )}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-heading font-bold text-lg text-white drop-shadow-sm">
            {facility.title}
          </h3>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <p className="text-sm text-slate-600 leading-relaxed">
          {facility.shortDesc}
        </p>

        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
          {facility.features.map((feat, idx) => (
            <div key={idx} className="flex items-start text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
