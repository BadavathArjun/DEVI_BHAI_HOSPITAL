import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'navy' | 'teal' | 'emergency';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'teal',
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const isCenter = align === 'center';

  const badgeStyles = {
    teal: 'bg-teal-50 text-teal-800 border-teal-200/60',
    navy: 'bg-navy-50 text-navy-900 border-navy-200/60',
    emergency: 'bg-red-50 text-red-700 border-red-200'
  };

  return (
    <div className={`mb-10 sm:mb-12 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {badge && (
        <div className={`mb-3 inline-block`}>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeStyles[badgeVariant]}`}>
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-lg text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
