import { useState } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';

interface RatingWidgetProps {
  value: number;
  onRate: (rating: number) => void;
}

export function RatingWidget({ value, onRate }: RatingWidgetProps) {
  const { copy } = useLanguage();
  const [hovered, setHovered] = useState(0);
  const displayed = hovered || value;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        role="radiogroup"
        aria-label={copy.reviews.title}
        className="flex items-center gap-2 sm:gap-3"
        onMouseLeave={() => setHovered(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= displayed;
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={value === star}
              aria-label={`${star} / 5 - ${copy.reviews.ratingHints[star - 1]}`}
              onMouseEnter={() => setHovered(star)}
              onFocus={() => setHovered(star)}
              onBlur={() => setHovered(0)}
              onClick={() => onRate(star)}
              className="group relative rounded-2xl p-1.5 transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200"
            >
              <Star
                className={`h-10 w-10 transition-all duration-300 sm:h-12 sm:w-12 ${
                  filled
                    ? 'scale-110 fill-gold-400 text-gold-500 drop-shadow-[0_4px_12px_rgba(212,175,55,0.45)]'
                    : 'fill-transparent text-navy-200 group-hover:text-gold-300'
                }`}
              />
            </button>
          );
        })}
      </div>
      <p className="min-h-[1.5rem] text-sm font-semibold text-navy-700" aria-live="polite">
        {displayed > 0 ? copy.reviews.ratingHints[displayed - 1] : copy.reviews.tapToRate}
      </p>
    </div>
  );
}
