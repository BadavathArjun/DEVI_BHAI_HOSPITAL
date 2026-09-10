import React, { useState } from 'react';
import { Search, Filter, Stethoscope } from 'lucide-react';
import { DOCTORS } from '../data/doctors';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DoctorCard } from '../components/cards/DoctorCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { SEOHead } from '../components/common/SEOHead';

export const DoctorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All');

  const specialitiesList = [
    'All',
    'Obstetrics & Gynecology',
    'General & Laparoscopic Surgery',
    'General Medicine & Diabetology',
    'Pediatrics & Neonatology',
    'Urology'
  ];

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.areasOfExpertise.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSpeciality =
      selectedSpeciality === 'All' ||
      doc.specialization.toLowerCase().includes(selectedSpeciality.toLowerCase());

    return matchesSearch && matchesSpeciality;
  });

  return (
    <div>
      <SEOHead
        title="Our Doctors & Specialists | Devibai Super Speciality Hospital"
        description="Meet the consultant physicians, laparoscopic surgeons, pediatricians, obstetricians and urologists at Devibai Super Speciality Hospital in Nirmal, Telangana."
        canonicalPath="/doctors"
      />

      <Breadcrumbs items={[{ name: 'Doctors & Specialists' }]} />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Consultant Team"
            badgeVariant="navy"
            title="Our Doctors & Specialists"
            subtitle="Meet our dedicated team of experienced medical and surgical consultants. Qualifications and roles are displayed strictly as verified in official hospital materials."
          />

          {/* Search & Filter bar */}
          <div className="max-w-4xl mx-auto mb-10 bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search doctor by name, specialty, or condition..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-500 hidden sm:inline" />
              <select
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 bg-white text-slate-700"
              >
                {specialitiesList.map((sp) => (
                  <option key={sp} value={sp}>
                    {sp === 'All' ? 'All Departments' : sp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Doctor Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto p-6">
              <Stethoscope className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No doctors found matching your search.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedSpeciality('All'); }}
                className="btn-outline text-xs py-2 px-4 mt-3"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
