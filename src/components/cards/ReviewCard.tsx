import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { PatientReview } from '../../types';

interface ReviewCardProps {
  review: PatientReview;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="w-[320px] sm:w-[360px] md:w-[380px] shrink-0 bg-white rounded-2xl border border-slate-200/80 hover:border-teal-400/80 shadow-medical hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between h-[270px] group relative overflow-hidden select-none">
      {/* Decorative top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-navy-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top Header: Avatar + Patient Name + Verification */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3 min-w-0">
            <div
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${
                review.avatarGradient || 'from-teal-600 to-navy-800'
              } text-white font-heading font-extrabold text-sm flex items-center justify-center shadow-sm flex-shrink-0`}
            >
              {review.initials || review.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h4 className="font-heading font-bold text-navy-950 text-sm sm:text-base leading-tight truncate">
                {review.name}
              </h4>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold text-teal-800 bg-teal-50/90 border border-teal-200/60 px-2 py-0.5 rounded-full truncate max-w-[200px]">
                  {review.departmentTag || 'Verified Patient'}
                </span>
              </div>
            </div>
          </div>

          {/* Google / Verified Badge */}
          <div className="flex items-center space-x-1 flex-shrink-0 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden xs:inline">Verified</span>
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex items-center space-x-1 mt-3 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200 fill-slate-100'
              }`}
            />
          ))}
          <span className="text-xs font-bold text-slate-700 ml-1.5">
            {review.rating}.0
          </span>
        </div>

        {/* Review Text with subtle quote styling */}
        <div className="relative mt-2">
          <Quote className="w-6 h-6 text-teal-600/10 absolute -top-2.5 -left-1 pointer-events-none" />
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-4 font-normal relative z-10 pl-2">
            "{review.review}"
          </p>
        </div>
      </div>

      {/* Bottom Footer: Date & Hospital attribution */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
        <span className="font-medium text-teal-800 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5 inline-block" />
          Devibai Hospital
        </span>
        <span className="text-slate-600">{review.date || 'Google Review'}</span>
      </div>
    </div>
  );
};
