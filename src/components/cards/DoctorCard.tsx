import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Award } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="medical-card overflow-hidden flex flex-col group h-full">
      {/* Photo with subtle zoom hover */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-slate-100 border-b border-slate-100">
        <img
          src={doctor.photo}
          alt={`Portrait of ${doctor.name}`}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/assets/branding/db-logo.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-semibold flex items-center">
            View Complete Profile <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </span>
        </div>

        {doctor.role && (
          <div className="absolute top-3 right-3 bg-navy-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
            {doctor.role.includes('Visiting') ? 'Visiting Consultant' : 'Consultant'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-navy-900 group-hover:text-teal-700 transition-colors">
              {doctor.name}
            </h3>
          </div>
          {doctor.teluguName && (
            <div className="text-xs font-medium text-teal-800 font-sans">
              {doctor.teluguName}
            </div>
          )}

          {/* Specialization */}
          <div className="mt-2 text-xs font-semibold text-teal-700 uppercase tracking-wide">
            {doctor.specialization}
          </div>

          {/* Exact Qualifications */}
          <div className="mt-2 flex items-start space-x-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
            <Award className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
            <span className="font-medium leading-snug">{doctor.qualifications}</span>
          </div>

          {/* Key areas preview */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {doctor.areasOfExpertise.slice(0, 3).map((area, idx) => (
              <span
                key={idx}
                className="inline-block bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded"
              >
                {area}
              </span>
            ))}
            {doctor.areasOfExpertise.length > 3 && (
              <span className="inline-block text-[10px] text-slate-400 font-medium self-center">
                +{doctor.areasOfExpertise.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
          <Link
            to={`/doctors/${doctor.slug}`}
            className="btn-outline text-xs py-2 px-3 text-center justify-center"
          >
            View Profile
          </Link>
          <Link
            to={`/appointment?doctor=${doctor.slug}`}
            className="btn-teal text-xs py-2 px-3 text-center justify-center"
          >
            <Calendar className="w-3.5 h-3.5 mr-1" />
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};
