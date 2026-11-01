import { CheckCircle2, Clock3, Loader2, Phone, Star } from 'lucide-react';
import type { PatientFeedback } from '@/lib/feedback';
import { useLanguage } from '@/i18n/useLanguage';

interface FeedbackCardProps {
  item: PatientFeedback;
  resolving: boolean;
  onResolve: () => void;
}

export function FeedbackCard({ item, resolving, onResolve }: FeedbackCardProps) {
  const { language, copy } = useLanguage();
  const locale = language === 'hi' ? 'hi-IN' : 'en-IN';
  const formatDate = (value: string) =>
    new Date(value).toLocaleString(locale, { dateStyle: 'medium', timeStyle: 'short' });

  // Fallback support for both phone and phone_number keys
  const displayPhone = item.phone_number || (item as any).phone || 'N/A';

  return (
    <article
      className={`flex flex-col gap-4 rounded-3xl border p-5 shadow-card transition ${
        item.is_resolved ? 'border-success-500/20 bg-success-50/40' : 'border-warning-500/30 bg-white'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-navy-900">{item.patient_name}</h4>
          <a href={`tel:+91${displayPhone}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:underline">
            <Phone className="h-3.5 w-3.5" />
            {displayPhone}
          </a>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            item.is_resolved ? 'bg-success-600 text-white' : 'bg-warning-50 text-warning-600 ring-1 ring-warning-500/40'
          }`}
        >
          {item.is_resolved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
          {item.is_resolved ? copy.admin.statusResolved : copy.admin.statusOpen}
        </span>
      </div>

      <div className="flex items-center gap-3 text-sm text-ink-600">
        <span className="flex items-center gap-0.5" aria-label={`${copy.admin.rating}: ${item.rating} / 5`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${star <= item.rating ? 'fill-gold-400 text-gold-500' : 'text-navy-200'}`}
            />
          ))}
        </span>
        <span className="text-ink-300">|</span>
        <span>
          {copy.admin.received}: {formatDate(item.created_at)}
        </span>
      </div>

      <p className="whitespace-pre-line rounded-2xl bg-ink-50 p-4 text-sm leading-relaxed text-ink-700">
        {item.feedback_text}
      </p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
        {item.is_resolved && item.resolved_at ? (
          <span className="text-xs font-medium text-success-700">
            {copy.admin.statusResolved}: {formatDate(item.resolved_at)}
          </span>
        ) : (
          <span />
        )}
        {!item.is_resolved && (
          <button
            type="button"
            onClick={onResolve}
            disabled={resolving}
            className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {resolving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4 text-gold-300" />}
            {copy.admin.markResolved}
          </button>
        )}
      </div>
    </article>
  );
}