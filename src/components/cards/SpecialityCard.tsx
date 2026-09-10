import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Baby, 
  Stethoscope, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Crosshair, 
  AlertTriangle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Speciality } from '../../types';

interface SpecialityCardProps {
  speciality: Speciality;
}

const iconMap: Record<string, React.ReactNode> = {
  HeartPulse: <HeartPulse className="w-6 h-6 text-teal-600" />,
  Baby: <Baby className="w-6 h-6 text-teal-600" />,
  Stethoscope: <Stethoscope className="w-6 h-6 text-teal-600" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-teal-600" />,
  Activity: <Activity className="w-6 h-6 text-teal-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-teal-600" />,
  Crosshair: <Crosshair className="w-6 h-6 text-teal-600" />,
  AlertTriangle: <AlertTriangle className="w-6 h-6 text-emergency-600" />
};

export const SpecialityCard: React.FC<SpecialityCardProps> = ({ speciality }) => {
  const isEmergency = speciality.id === 'emergency-critical-care';

  return (
    <div
      className={`medical-card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 ${
        isEmergency ? 'border-red-200/80 hover:border-red-400 bg-gradient-to-b from-white to-red-50/20' : ''
      }`}
    >
      <div>
        {/* Icon & Badge */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-200 ${
              isEmergency ? 'bg-red-50 group-hover:bg-red-100' : 'bg-teal-50 group-hover:bg-teal-100'
            }`}
          >
            {iconMap[speciality.iconName] || <Activity className="w-6 h-6 text-teal-600" />}
          </div>
          {isEmergency && (
            <span className="badge-emergency">24/7 Care</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xl text-navy-900 group-hover:text-teal-700 transition-colors">
          {speciality.title}
        </h3>

        {/* Short description */}
        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
          {speciality.shortDesc}
        </p>

        {/* Treatments preview */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
          {speciality.treatments.slice(0, 3).map((treatment, idx) => (
            <div key={idx} className="flex items-start text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="truncate">{treatment}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action link */}
      <div className="mt-6 pt-3">
        <Link
          to={`/specialities/${speciality.slug}`}
          className={`inline-flex items-center text-sm font-semibold transition-colors group-hover:translate-x-0.5 duration-200 ${
            isEmergency ? 'text-emergency-600 hover:text-emergency-700' : 'text-teal-700 hover:text-teal-800'
          }`}
        >
          <span>View Speciality</span>
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
