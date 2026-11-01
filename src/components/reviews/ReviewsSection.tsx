import { useState } from 'react';
import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { FeedbackForm } from '@/components/reviews/FeedbackForm';
import { GoogleReviewModal } from '@/components/reviews/GoogleReviewModal';
import { RatingWidget } from '@/components/reviews/RatingWidget';
import { useLanguage } from '@/i18n/useLanguage';

const GOOGLE_REVIEW_MIN_RATING = 4;

export function ReviewsSection() {
  const { copy } = useLanguage();
  const [rating, setRating] = useState(0);
  const [googleOpen, setGoogleOpen] = useState(false);

  const handleRate = (value: number) => {
    setRating(value);
    setGoogleOpen(value >= GOOGLE_REVIEW_MIN_RATING);
  };

  const handleReset = () => {
    setRating(0);
    setGoogleOpen(false);
  };

  const needsPrivateFeedback = rating > 0 && rating < GOOGLE_REVIEW_MIN_RATING;

  return (
    <section id="reviews" className="relative overflow-hidden bg-gradient-to-b from-navy-50 to-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-gold-300/20 blur-3xl" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.reviews.eyebrow}
          title={copy.reviews.title}
          subtitle={copy.reviews.subtitle}
        />

        <div className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-lift">
          <div className="flex flex-col items-center gap-6 px-6 py-12 sm:px-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-800 text-gold-300 shadow-card">
              <Star className="h-7 w-7 fill-gold-400" />
            </span>
            <RatingWidget value={rating} onRate={handleRate} />
            {rating > 0 && (
              <p className="animate-fade-in text-sm text-ink-500">
                {copy.reviews.selectedLabel}: <span className="font-semibold text-navy-800">{rating} / 5</span>
              </p>
            )}
            {rating >= GOOGLE_REVIEW_MIN_RATING && !googleOpen && (
              <button
                type="button"
                onClick={() => setGoogleOpen(true)}
                className="rounded-full border border-navy-200 px-5 py-2.5 text-sm font-semibold text-navy-800 transition hover:border-teal-500 hover:text-teal-700"
              >
                {copy.reviews.googleCta}
              </button>
            )}
          </div>

          {needsPrivateFeedback && (
            <div key={rating} className="animate-fade-up border-t border-navy-100 bg-ink-50/60">
              <FeedbackForm rating={rating} onReset={handleReset} />
            </div>
          )}
        </div>
      </div>

      <GoogleReviewModal open={googleOpen} onClose={() => setGoogleOpen(false)} />
    </section>
  );
}
