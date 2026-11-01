import { ExternalLink, Heart } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { HOSPITAL } from '@/data/hospital';
import { useLanguage } from '@/i18n/useLanguage';

interface GoogleReviewModalProps {
  open: boolean;
  onClose: () => void;
}

export function GoogleReviewModal({ open, onClose }: GoogleReviewModalProps) {
  const { copy } = useLanguage();

  return (
    <Modal open={open} onClose={onClose} maxWidthClass="max-w-md" labelledBy="google-review-title">
      <div className="flex flex-col items-center gap-6 bg-gradient-to-b from-gold-50 via-white to-white px-8 pb-10 pt-12 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-600 text-navy-900 shadow-glow">
          <Heart className="h-8 w-8" />
        </span>
        <div className="flex flex-col gap-3">
          <h3 id="google-review-title" className="font-serif text-2xl font-semibold text-navy-800">
            {copy.reviews.googleTitle}
          </h3>
          <p className="text-sm leading-relaxed text-ink-600">{copy.reviews.googleBody}</p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <a
            href={HOSPITAL.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lift"
          >
            <ExternalLink className="h-4 w-4 text-gold-300" />
            {copy.reviews.googleCta}
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-6 py-3 text-sm font-medium text-ink-500 transition hover:text-navy-800"
          >
            {copy.reviews.googleLater}
          </button>
        </div>
      </div>
    </Modal>
  );
}
