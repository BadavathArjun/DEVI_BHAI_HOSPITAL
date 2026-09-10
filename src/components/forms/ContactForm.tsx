import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { contactService } from '../../services/appointmentService';

export const ContactForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get('subject') || '';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please provide your name, phone number, and message.');
      return;
    }

    setLoading(true);
    const res = await contactService.submitContactMessage({
      name,
      phone,
      email,
      subject,
      message
    });
    setLoading(false);

    if (res.success) {
      setSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else {
      setErrorMsg(res.error || 'Failed to send your inquiry. Please contact the hospital by phone.');
    }
  };

  return (
    <div className="medical-card p-6 sm:p-8 border border-slate-200">
      <h3 className="font-heading font-bold text-xl text-navy-900 mb-2">
        Send Us an Inquiry
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-6">
        Have questions about our doctors, treatments, or healthcare schemes? Send us a message and our reception team will respond.
      </p>

      {success ? (
        <div className="p-6 rounded-xl bg-teal-50 border border-teal-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-heading font-bold text-navy-900 text-lg">
            Message Sent Successfully
          </h4>
          <p className="text-xs sm:text-sm text-slate-600">
            Thank you for reaching out. Our hospital help desk will review your message and contact you.
          </p>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="btn-outline text-xs py-2 px-4 mt-2"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-emergency-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Your Name <span className="text-emergency-600">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Phone Number <span className="text-emergency-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile Number"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Aarogyasri Inquiry, Doctor Timings"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              Your Message <span className="text-emergency-600">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we assist you?"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            id="contact-form-submit-btn"
            className="w-full btn-primary text-sm py-3 justify-center"
          >
            <Send className="w-4 h-4 mr-2" />
            {loading ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      )}
    </div>
  );
};
