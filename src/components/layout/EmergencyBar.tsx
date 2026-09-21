import React from 'react';
import { PhoneCall, AlertCircle } from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospital';

export const EmergencyBar: React.FC = () => {
  return (
    <div className="bg-emergency-600 text-white text-xs sm:text-sm font-medium py-1.5 px-2.5 sm:px-4 shadow-inner relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="font-semibold tracking-wide uppercase text-[10px] sm:text-xs truncate">
            <span className="sm:hidden">24/7 Emergency</span>
            <span className="hidden sm:inline">24/7 Emergency Care Available</span>
          </span>
          <span className="hidden md:inline text-red-200">|</span>
          <span className="hidden md:inline text-red-100 text-xs truncate">
            Trauma • Acute Resuscitation • Ventilator ICU • 24/7 Lab & Pharmacy
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <span className="hidden sm:inline text-red-100 text-xs">Emergency Desk:</span>
          <a
            href={HOSPITAL_INFO.links.callEmergency}
            id="emergency-top-bar-call"
            className="inline-flex items-center space-x-1 sm:space-x-1.5 bg-white text-emergency-700 hover:bg-red-50 px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-sm active:scale-95"
            aria-label="Call Emergency at 8885558061"
          >
            <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emergency-600 animate-pulse flex-shrink-0" />
            <span>
              <span className="xs:hidden">{HOSPITAL_INFO.phones.primary}</span>
              <span className="hidden xs:inline sm:hidden">Call {HOSPITAL_INFO.phones.primary}</span>
              <span className="hidden sm:inline">Call Emergency: {HOSPITAL_INFO.phones.primary}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
