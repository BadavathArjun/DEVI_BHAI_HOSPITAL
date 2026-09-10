import React from 'react';
import { AlertCircle, PhoneCall } from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospital';

interface MedicalDisclaimerProps {
  isEmergencyOnly?: boolean;
  className?: string;
}

export const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({
  isEmergencyOnly = false,
  className = ''
}) => {
  return (
    <div
      className={`rounded-xl p-4 sm:p-5 border ${
        isEmergencyOnly
          ? 'bg-red-50/90 border-red-200 text-red-950'
          : 'bg-slate-100/90 border-slate-200 text-slate-800'
      } ${className}`}
    >
      <div className="flex items-start space-x-3.5">
        <AlertCircle
          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
            isEmergencyOnly ? 'text-emergency-600' : 'text-navy-900'
          }`}
        />
        <div className="text-xs sm:text-sm leading-relaxed space-y-1">
          <div className="font-bold uppercase tracking-wider text-[11px]">
            {isEmergencyOnly ? 'Immediate Emergency Guidance' : 'Important Medical Notice'}
          </div>
          <p>
            {isEmergencyOnly
              ? HOSPITAL_INFO.disclaimers.emergency
              : HOSPITAL_INFO.disclaimers.medical}
          </p>
          {isEmergencyOnly && (
            <div className="pt-2">
              <a
                href={HOSPITAL_INFO.links.callEmergency}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emergency-600 text-white font-bold text-xs hover:bg-emergency-700 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Emergency: {HOSPITAL_INFO.phones.primary}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
