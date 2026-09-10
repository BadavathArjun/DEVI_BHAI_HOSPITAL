import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Calendar, AlertTriangle } from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospital';

export const MobileBottomBar: React.FC = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-2 px-3">
      <div className="grid grid-cols-4 gap-1.5 items-center max-w-md mx-auto">
        {/* CALL */}
        <a
          href={HOSPITAL_INFO.links.callPrimary}
          id="mobile-bottom-call-btn"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg text-slate-700 hover:text-navy-900 active:bg-slate-100 transition-colors"
          aria-label="Call Hospital"
        >
          <div className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center text-navy-900 mb-0.5">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Call</span>
        </a>

        {/* WHATSAPP */}
        <a
          href={HOSPITAL_INFO.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-bottom-whatsapp-btn"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg text-emerald-700 hover:text-emerald-800 active:bg-emerald-50 transition-colors"
          aria-label="WhatsApp Us"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-0.5">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* APPOINTMENT */}
        <Link
          to="/appointment"
          id="mobile-bottom-appointment-btn"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg text-teal-700 hover:text-teal-800 active:bg-teal-50 transition-colors"
          aria-label="Book Appointment"
        >
          <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 mb-0.5">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Book</span>
        </Link>

        {/* 24/7 EMERGENCY */}
        <a
          href={HOSPITAL_INFO.links.callEmergency}
          id="mobile-bottom-emergency-btn"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg bg-emergency-600 text-white active:bg-emergency-700 transition-colors shadow-sm"
          aria-label="Emergency Call"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mb-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Emergency</span>
        </a>
      </div>
    </div>
  );
};
