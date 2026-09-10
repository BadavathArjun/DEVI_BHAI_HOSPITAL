import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  Stethoscope, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  FileText
} from 'lucide-react';
import { DOCTORS } from '../../data/doctors';
import { SPECIALITIES } from '../../data/specialities';
import { HOSPITAL_INFO } from '../../data/hospital';
import { appointmentService } from '../../services/appointmentService';
import { AppointmentRequest } from '../../types';

interface AppointmentFormProps {
  initialDoctorId?: string;
  initialDepartment?: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialDoctorId,
  initialDepartment
}) => {
  const [searchParams] = useSearchParams();
  const urlDoctorSlug = searchParams.get('doctor');
  const urlDept = searchParams.get('dept');

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | undefined>('Female');
  const [department, setDepartment] = useState(initialDepartment || urlDept || 'Fertility & IVF');
  const [preferredDoctor, setPreferredDoctor] = useState(initialDoctorId || urlDoctorSlug || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (09:00 AM - 01:00 PM)');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedAppointment, setSubmittedAppointment] = useState<AppointmentRequest | null>(null);

  // Sync preferredDoctor if URL parameter changes
  useEffect(() => {
    if (urlDoctorSlug) {
      setPreferredDoctor(urlDoctorSlug);
      // Automatically select department if doctor found
      const doc = DOCTORS.find(d => d.slug === urlDoctorSlug);
      if (doc) {
        if (doc.slug === 'dr-k-chandrika') setDepartment('Fertility & IVF');
        else if (doc.slug === 'dr-k-avinash-kasamwar') setDepartment('General & Laparoscopic Surgery');
        else if (doc.slug === 'dr-prashant-kumar-waghmare') setDepartment('General Medicine & Diabetology');
        else if (doc.slug === 'dr-sudheer-kumar-g') setDepartment('Pediatrics & Neonatology');
        else if (doc.slug === 'dr-k-ravichandra') setDepartment('Urology');
      }
    }
  }, [urlDoctorSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter patient full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!department) {
      setErrorMsg('Please select a hospital department.');
      return;
    }
    if (!preferredDate) {
      setErrorMsg('Please select a preferred date for your visit.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please agree to allow the hospital team to contact you.');
      return;
    }

    setLoading(true);

    const res = await appointmentService.submitAppointment({
      fullName,
      phone,
      email: email || undefined,
      age: age || undefined,
      gender,
      department,
      preferredDoctor: preferredDoctor || undefined,
      preferredDate,
      preferredTime,
      reason: reason || undefined,
      message: message || undefined,
      consent: true
    });

    setLoading(false);

    if (res.success && res.data) {
      setSubmittedAppointment(res.data);
      // Reset form
      setFullName('');
      setPhone('');
      setEmail('');
      setAge('');
      setReason('');
      setMessage('');
      setConsent(false);
    } else {
      setErrorMsg(res.error || 'Failed to submit appointment request. Please call 8885558061.');
    }
  };

  return (
    <div className="medical-card p-6 sm:p-8 lg:p-10 border border-slate-200">
      {/* Success Confirmation Modal / Banner */}
      {submittedAppointment ? (
        <div className="bg-teal-50/80 border border-teal-200 rounded-xl p-6 sm:p-8 text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-navy-900 font-heading">
            Appointment Request Received
          </h3>

          <div className="bg-white p-4 rounded-lg border border-teal-200/60 max-w-lg mx-auto text-left text-xs sm:text-sm space-y-1.5 text-slate-700">
            <div>
              <strong>Request Reference:</strong> <span className="font-mono text-teal-800 font-semibold">{submittedAppointment.id}</span>
            </div>
            <div>
              <strong>Patient Name:</strong> {submittedAppointment.fullName}
            </div>
            <div>
              <strong>Department:</strong> {submittedAppointment.department}
            </div>
            <div>
              <strong>Preferred Date:</strong> {submittedAppointment.preferredDate} ({submittedAppointment.preferredTime})
            </div>
            {submittedAppointment.preferredDoctor && (
              <div>
                <strong>Preferred Doctor:</strong> {DOCTORS.find(d => d.slug === submittedAppointment.preferredDoctor)?.name || submittedAppointment.preferredDoctor}
              </div>
            )}
          </div>

          <div className="max-w-md mx-auto text-sm text-slate-700 leading-relaxed font-medium">
            "Thank you. Your appointment request has been received. Our hospital team will contact you to confirm availability."
          </div>

          <p className="text-xs text-slate-500 italic max-w-md mx-auto">
            Note: This is a request submission and does not guarantee immediate appointment confirmation. For acute urgent medical emergencies, call the hospital emergency room immediately.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/919092915222?text=Hello%20Devibai%20Hospital,%20I%20have%20submitted%20appointment%20request%20${submittedAppointment.id}%20for%20${encodeURIComponent(submittedAppointment.fullName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal text-xs sm:text-sm py-2.5 px-4 w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Notify on WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setSubmittedAppointment(null)}
              className="btn-outline text-xs sm:text-sm py-2.5 px-4 w-full sm:w-auto"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-emergency-700 text-sm flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section: Patient Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-800 mb-4 pb-2 border-b border-slate-100 flex items-center">
              <User className="w-4 h-4 mr-2 text-teal-600" />
              1. Patient Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Full Name <span className="text-emergency-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar / Anitha"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Mobile Number <span className="text-emergency-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors bg-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Appointment Preference */}
          <div className="pt-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-800 mb-4 pb-2 border-b border-slate-100 flex items-center">
              <Stethoscope className="w-4 h-4 mr-2 text-teal-600" />
              2. Department & Doctor Preference
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Clinical Department <span className="text-emergency-600">*</span>
                </label>
                <select
                  required
                  value={department}
                  onChange={(e) => {
                    const dept = e.target.value;
                    setDepartment(dept);
                    // Preselect matching doctor
                    if (dept === 'Fertility & IVF' || dept === 'Obstetrics & Gynecology') {
                      setPreferredDoctor('dr-k-chandrika');
                    } else if (dept === 'General Surgery' || dept === 'Laparoscopic Surgery') {
                      setPreferredDoctor('dr-k-avinash-kasamwar');
                    } else if (dept === 'General Medicine & Diabetology') {
                      setPreferredDoctor('dr-prashant-kumar-waghmare');
                    } else if (dept === 'Pediatrics & Neonatology') {
                      setPreferredDoctor('dr-sudheer-kumar-g');
                    } else if (dept === 'Urology') {
                      setPreferredDoctor('dr-k-ravichandra');
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors bg-white"
                >
                  <option value="Fertility & IVF">Fertility & IVF (Dr. Chandrika)</option>
                  <option value="Obstetrics & Gynecology">Obstetrics & Gynecology (Dr. Chandrika)</option>
                  <option value="General Medicine & Diabetology">General Medicine & Diabetology (Dr. Prashant)</option>
                  <option value="Pediatrics & Neonatology">Pediatrics & Neonatology (Dr. Sudheer Kumar)</option>
                  <option value="General Surgery">General Surgery (Dr. Avinash Kasamwar)</option>
                  <option value="Laparoscopic Surgery">Laparoscopic Surgery (Dr. Avinash Kasamwar)</option>
                  <option value="Urology">Urology (Dr. K. Ravichandra - Visiting)</option>
                  <option value="Emergency & Critical Care">Emergency & Critical Care (Smart ICU)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Preferred Doctor (Optional)
                </label>
                <select
                  value={preferredDoctor}
                  onChange={(e) => setPreferredDoctor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors bg-white"
                >
                  <option value="">Any Available Specialist</option>
                  {DOCTORS.map((doc) => (
                    <option key={doc.slug} value={doc.slug}>
                      {doc.name} — {doc.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Preferred Date <span className="text-emergency-600">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Preferred Slot
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors bg-white"
                >
                  <option value="Morning (09:00 AM - 01:00 PM)">Morning (09:00 AM - 01:00 PM)</option>
                  <option value="Afternoon (01:00 PM - 04:00 PM)">Afternoon (01:00 PM - 04:00 PM)</option>
                  <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Reason for Visit */}
          <div className="pt-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-800 mb-4 pb-2 border-b border-slate-100 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-teal-600" />
              3. Symptoms or Reason for Visit
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Primary Reason (Optional)
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Fertility evaluation, Routine prenatal check, Abdominal pain, Child fever"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Additional Notes / Medical History (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any relevant past treatments, current medications, or notes for the doctor..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start space-x-3 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500 cursor-pointer"
              />
              <span className="text-xs text-slate-600 leading-normal">
                I agree that the hospital may contact me regarding my appointment request via phone or WhatsApp.
              </span>
            </label>
          </div>

          {/* Submit CTA */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              id="appointment-form-submit-btn"
              className="w-full btn-teal text-sm sm:text-base py-3.5 justify-center shadow-md font-bold"
            >
              {loading ? 'Submitting Request...' : 'Request Appointment'}
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              For emergency trauma or immediate critical crises, please call 8885558061 directly.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
