import React, { useState } from 'react';
import { X, Star, CheckCircle2, HeartHandshake } from 'lucide-react';
import { saveNewPatientReview } from '../../data/reviews';
import { PatientReview } from '../../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewAdded: (newReview: PatientReview) => void;
}

const DEPARTMENTS = [
  'Dr. Chandrika (Fertility, IVF & OBGY)',
  'Dr. Avinash (General & Laparoscopic Surgery)',
  'Dr. Prashant (Critical Care & Diabetology)',
  'Dr. Sudheer (Pediatrics & Neonatology)',
  'Maternity & Delivery Care',
  '24/7 Emergency & Critical Care',
  'Cleanliness & Nursing Care',
  'Pharmacy & Diagnostic Laboratory',
  'General Hospital Experience',
];

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onReviewAdded,
}) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [departmentTag, setDepartmentTag] = useState(DEPARTMENTS[0]);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!review.trim()) {
      setError('Please write a brief review of your experience.');
      return;
    }
    if (review.trim().length < 10) {
      setError('Review should be at least 10 characters.');
      return;
    }

    const created = saveNewPatientReview({
      name: name.trim(),
      rating,
      review: review.trim(),
      departmentTag,
    });

    onReviewAdded(created);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setName('');
    setReview('');
    setRating(5);
    setDepartmentTag(DEPARTMENTS[0]);
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-800 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 id="review-modal-title" className="font-heading font-bold text-lg text-white">
                Write a Patient Review
              </h3>
              <p className="text-xs text-teal-200">
                Devibai Super Speciality Hospital, Nirmal
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close review modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-heading font-extrabold text-2xl text-navy-950">
                Thank You, {name}!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your review has been successfully submitted and added to our live patient reviews section.
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="btn-teal px-8 py-3 text-sm font-bold shadow-md hover:shadow-lg"
                >
                  View My Review
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm text-slate-800 transition-all outline-none"
                />
              </div>

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Rate Your Experience <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 rounded-md hover:scale-110 active:scale-95 transition-transform"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200 fill-slate-100'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60 ml-2">
                    {rating === 5
                      ? '5.0 ★ Excellent'
                      : rating === 4
                      ? '4.0 ★ Very Good'
                      : rating === 3
                      ? '3.0 ★ Good'
                      : `${rating}.0 ★`}
                  </span>
                </div>
              </div>

              {/* Department / Doctor */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Department / Doctor Consulted
                </label>
                <select
                  value={departmentTag}
                  onChange={(e) => setDepartmentTag(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm text-slate-800 transition-all outline-none bg-white"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Review / Experience <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Share details about the doctors, treatment results, staff care, or cleanliness at DeviBai Hospital..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm text-slate-800 transition-all outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-patient-review-btn"
                  className="btn-teal px-6 py-2.5 text-sm font-bold shadow-md hover:shadow-lg"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
