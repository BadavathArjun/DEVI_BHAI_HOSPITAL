import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info } from 'lucide-react';
import { InsuranceProvider } from '../../types';

interface InsuranceCardProps {
  provider: InsuranceProvider;
}

export const InsuranceCard: React.FC<InsuranceCardProps> = ({ provider }) => {
  const isAarogyasri = provider.id === 'aarogyasri';

  return (
    <div
      className={`medical-card p-5 flex flex-col justify-between group hover:-translate-y-0.5 transition-all duration-300 ${
        isAarogyasri ? 'border-teal-300 ring-1 ring-teal-200/50 bg-teal-50/10' : ''
      }`}
    >
      <div>
        {/* Logo Container */}
        <div className="h-24 w-full bg-white rounded-lg p-2.5 flex items-center justify-center border border-slate-200/70 shadow-sm overflow-hidden mb-4">
          <img
            src={provider.logo}
            alt={`${provider.name} Logo`}
            className={`max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200 ${provider.id === 'galaxy' ? 'rounded' : ''}`}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLElement;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* Title & Type Badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading font-bold text-base text-navy-900 group-hover:text-teal-700 transition-colors">
              {provider.name}
            </h3>
            {provider.teluguName && (
              <div className="text-xs text-slate-500 mt-0.5 font-sans">
                {provider.teluguName}
              </div>
            )}
          </div>
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
              provider.type === 'government'
                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                : provider.type === 'tpa'
                ? 'bg-purple-100 text-purple-900 border border-purple-200'
                : 'bg-blue-100 text-blue-900 border border-blue-200'
            }`}
          >
            {provider.type}
          </span>
        </div>

        {/* Notes */}
        <p className="mt-3 text-xs text-slate-600 leading-relaxed">
          {provider.notes}
        </p>
      </div>

      {/* Action link */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {isAarogyasri ? (
          <Link
            to="/arogyasri"
            className="font-bold text-teal-700 hover:text-teal-800 flex items-center"
          >
            <span>Scheme Details</span>
            <ShieldCheck className="w-3.5 h-3.5 ml-1 text-teal-600" />
          </Link>
        ) : (
          <span className="text-[11px] text-slate-400 flex items-center">
            <Info className="w-3 h-3 mr-1" />
            Subject to authorization
          </span>
        )}

        <Link
          to="/contact?subject=Insurance+Enquiry"
          className="font-semibold text-navy-900 hover:text-teal-700"
        >
          Enquire
        </Link>
      </div>
    </div>
  );
};
