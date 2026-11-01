import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { submitPatientFeedback } from '@/lib/feedback';
import { useLanguage } from '@/i18n/useLanguage';

interface FeedbackFormProps {
  rating: number;
  onReset: () => void;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full rounded-2xl border border-navy-100 bg-white px-4 py-3.5 text-sm text-navy-900 outline-none transition placeholder:text-ink-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100';

export function FeedbackForm({ rating, onReset }: FeedbackFormProps) {
  const { copy } = useLanguage();
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = patientName.trim();
    const trimmedFeedback = feedbackText.trim();
    const digits = phone.replace(/\D/g, '');

    if (!trimmedName || trimmedName.length > 120) {
      setFieldError(copy.reviews.form.invalidName);
      return;
    }
    if (digits.length < 10 || digits.length > 12) {
      setFieldError(copy.reviews.form.invalidPhone);
      return;
    }
    if (!trimmedFeedback || trimmedFeedback.length > 2000) {
      setFieldError(copy.reviews.form.invalidFeedback);
      return;
    }

    setFieldError(null);
    setSubmitState('submitting');
    try {
      await submitPatientFeedback({
        patientName: trimmedName,
        phone: digits,
        rating,
        feedbackText: trimmedFeedback,
      });
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  if (submitState === 'success') {
    return (
      <div className="animate-scale-in flex flex-col items-center gap-5 px-6 py-12 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-2xl font-semibold text-navy-800">{copy.reviews.form.successTitle}</h3>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-ink-600">{copy.reviews.form.successBody}</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-navy-200 px-5 py-2.5 text-sm font-semibold text-navy-800 transition hover:border-teal-500 hover:text-teal-700"
        >
          {copy.reviews.form.rateAgain}
        </button>
      </div>
    );
  }

  const isSubmitting = submitState === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="animate-fade-up flex flex-col gap-5 p-6 sm:p-10">
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-2xl font-semibold text-navy-800">{copy.reviews.feedbackTitle}</h3>
        <p className="text-sm leading-relaxed text-ink-600">{copy.reviews.feedbackBody}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-navy-800">
          {copy.reviews.form.name}
          <input
            type="text"
            value={patientName}
            maxLength={120}
            onChange={(event) => setPatientName(event.target.value)}
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-navy-800">
          {copy.reviews.form.phone}
          <input
            type="tel"
            value={phone}
            maxLength={20}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-navy-800">
        {copy.reviews.form.feedback}
        <textarea
          rows={5}
          value={feedbackText}
          maxLength={2000}
          onChange={(event) => setFeedbackText(event.target.value)}
          className={`${inputClass} resize-none`}
        />
      </label>

      {fieldError && (
        <p role="alert" className="rounded-2xl bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
          {fieldError}
        </p>
      )}
      {submitState === 'error' && (
        <p role="alert" className="rounded-2xl bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
          {copy.reviews.form.errorGeneric}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-800 px-6 py-4 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-fit"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 text-gold-300" />}
        {isSubmitting ? copy.reviews.form.submitting : copy.reviews.form.submit}
      </button>
    </form>
  );
}
