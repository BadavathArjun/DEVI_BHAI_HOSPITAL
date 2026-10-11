import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  User, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare
} from 'lucide-react';
import { doctorService } from '../../services/doctorService';
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
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedAppointment, setSubmittedAppointment] = useState<AppointmentRequest | null>(null);

  // Inferred context if coming from doctor or department link
  const departmentContext = initialDepartment || urlDept || undefined;
  const doctorSlugContext = initialDoctorId || urlDoctorSlug || undefined;

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
      department: departmentContext,
      preferredDoctor: doctorSlugContext,
      consent: true
    });

    setLoading(false);

    if (res.success && res.data) {
      setSubmittedAppointment(res.data);
      // Auto-open WhatsApp with appointment details to official number 9092915222
      const docName = res.data.preferredDoctor
        ? (doctorService.getDoctorBySlug(res.data.preferredDoctor)?.name || res.data.preferredDoctor)
        : undefined;

      const lines = [
        'Hello Devibai Hospital, I have submitted an appointment request:',
        `*Request ID:* ${res.data.id}`,
        `*Patient Name:* ${res.data.fullName}`,
        `*Phone:* ${res.data.phone}`
      ];
      if (res.data.age) lines.push(`*Age:* ${res.data.age}`);
      if (res.data.gender) lines.push(`*Gender:* ${res.data.gender}`);
      if (res.data.department) lines.push(`*Department:* ${res.data.department}`);
      if (docName) lines.push(`*Preferred Doctor:* ${docName}`);
      lines.push('Please confirm my appointment. Thank you!');

      const waMsg = lines.join('\n');
      const waUrl = `https://wa.me/919092915222?text=${encodeURIComponent(waMsg)}`;
      try {
        window.open(waUrl, '_blank');
      } catch {
        // Fallback handled by button
      }

      // Reset form
      setFullName('');
      setPhone('');
      setEmail('');
      setAge('');
      setConsent(false);
    } else {
      setErrorMsg(res.error || 'Failed to submit appointment request. Please call 9092916222.');
    }
  };

  return (
    <div className="medical-card p-4 sm:p-8 lg:p-10 border border-slate-200">
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
              <strong>Mobile Number:</strong> {submittedAppointment.phone}
            </div>
            {submittedAppointment.email && (
              <div>
                <strong>Email:</strong> {submittedAppointment.email}
              </div>
            )}
            {submittedAppointment.age && (
              <div>
                <strong>Age:</strong> {submittedAppointment.age} {submittedAppointment.gender ? `(${submittedAppointment.gender})` : ''}
              </div>
            )}
            {submittedAppointment.department && (
              <div>
                <strong>Department:</strong> {submittedAppointment.department}
              </div>
            )}
            {submittedAppointment.preferredDoctor && (
              <div>
                <strong>Preferred Doctor:</strong> {doctorService.getDoctorBySlug(submittedAppointment.preferredDoctor)?.name || submittedAppointment.preferredDoctor}
              </div>
            )}
          </div>

          <div className="max-w-md mx-auto text-sm text-slate-700 leading-relaxed font-medium">
            "Thank you. Your appointment request has been received. Our hospital response and confirmation will be provided via official WhatsApp (+91 9092915222)."
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 max-w-lg mx-auto text-xs text-emerald-900 font-semibold">
            Official WhatsApp for Appointment Response: +91 9092915222 | Voice Helpline: 9092916222
          </div>

          <p className="text-xs text-slate-500 italic max-w-md mx-auto">
            Note: For urgent medical emergencies, please call 9092916222 immediately or visit the emergency triage bay.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/919092915222?text=${encodeURIComponent(
                `Hello Devibai Hospital, I have submitted appointment request ${submittedAppointment.id} for ${submittedAppointment.fullName}. Phone: ${submittedAppointment.phone}. Please confirm my appointment.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal text-xs sm:text-sm py-2.5 px-5 w-full sm:w-auto font-bold shadow-md"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send / Confirm on WhatsApp (+91 9092915222)
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
              Patient Information
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors bg-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
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
              <MessageSquare className="w-4 h-4 mr-2" />
              {loading ? 'Submitting Request...' : 'Submit Request (Response via WhatsApp +91 9092915222)'}
            </button>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Appointment requests are confirmed via WhatsApp (+91 9092915222). For emergency calls, reach 9092916222 directly.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
