import React, { useState, useEffect } from 'react';
import {
  Star,
  PenLine,
  Play,
  Pause,
  ArrowLeftRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { getAllPatientReviews } from '../../data/reviews';
import { PatientReview } from '../../types';
import { ReviewCard } from '../cards/ReviewCard';
import { WriteReviewModal } from '../forms/WriteReviewModal';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<PatientReview[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr'); // Default left-to-right as requested ("move left side to right side")
  const [newlyAddedReview, setNewlyAddedReview] = useState<string | null>(null);

  useEffect(() => {
    setReviews(getAllPatientReviews());
  }, []);

  const handleReviewAdded = (newReview: PatientReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setNewlyAddedReview(newReview.name);
    setTimeout(() => {
      setNewlyAddedReview(null);
    }, 6000);
  };

  // Duplicate for seamless infinite loop marquee
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section
      id="patient-reviews-section"
      className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/80 to-slate-100/60 border-y border-slate-200/80 overflow-hidden relative"
    >
      {/* Background soft ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-navy-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span>Real Patient Experiences & Google Ratings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-navy-950 tracking-tight">
              What Our Patients Say
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Read authentic feedback from patients and families treated by our specialist doctors, fertility centre, surgical department, and 24/7 nursing care team in Nirmal.
            </p>
          </div>

          {/* Google Rating Badge & Write Review Action */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 flex-shrink-0">
            {/* Google Rating Summary Box */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3.5 flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-heading font-extrabold text-navy-950 text-base leading-none">
                    5.0
                  </span>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                </div>
                <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                  Google Reviews • {reviews.length}+ Verified
                </div>
              </div>
            </div>

            {/* Write a Review CTA Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              id="write-patient-review-btn"
              className="btn-teal py-3 px-5 text-sm font-bold shadow-md hover:shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-all"
            >
              <PenLine className="w-4 h-4 mr-1.5" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Newly Added Success Notification Banner */}
        {newlyAddedReview && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between animate-fadeIn shadow-sm">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>
                🎉 Thank you, <strong>{newlyAddedReview}</strong>! Your review has been added to our live reviews section below.
              </span>
            </div>
            <button
              onClick={() => setNewlyAddedReview(null)}
              className="text-xs text-emerald-700 hover:text-emerald-900 underline font-bold ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Marquee Controls & Direction Indicator */}
        <div className="mt-6 pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-600">
              Continuous 1-Line Stream • Hover or tap any card to pause
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Direction Toggle */}
            <button
              onClick={() => setDirection((d) => (d === 'ltr' ? 'rtl' : 'ltr'))}
              title={`Switch scroll direction (Currently: ${
                direction === 'ltr' ? 'Left to Right' : 'Right to Left'
              })`}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-navy-900 font-medium flex items-center space-x-1.5 transition-colors shadow-2xs"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden xs:inline">
                {direction === 'ltr' ? 'Moving Left → Right' : 'Moving Right → Left'}
              </span>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused((p) => !p)}
              title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-navy-900 font-medium flex items-center space-x-1.5 transition-colors shadow-2xs"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
                  <span className="hidden xs:inline">Play</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden xs:inline">Pause</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ONE-LINE CONTINUOUS MARQUEE TRACK (LEFT TO RIGHT / RIGHT TO LEFT) */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right Soft Fade Gradient Overlays for Luxury Feel */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-20" />

        <div
          className={`flex gap-5 sm:gap-6 ${
            direction === 'ltr' ? 'animate-marquee-ltr' : 'animate-marquee-rtl'
          } ${isPaused ? 'marquee-paused' : ''}`}
        >
          {marqueeItems.map((review, idx) => (
            <ReviewCard
              key={`${review.id}-${idx}`}
              review={review}
            />
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewAdded={handleReviewAdded}
      />
    </section>
  );
};
