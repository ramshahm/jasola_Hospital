import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidthClass?: string;
  labelledBy?: string;
}

export function Modal({ open, onClose, children, maxWidthClass = 'max-w-lg', labelledBy }: ModalProps) {
  const { copy } = useLanguage();

  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label={copy.admin.close}
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-navy-950/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`animate-scale-in relative flex max-h-[92vh] w-full ${maxWidthClass} flex-col overflow-hidden rounded-t-3xl bg-white shadow-lift sm:rounded-3xl`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.admin.close}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-700 transition hover:bg-ink-200 hover:text-navy-800"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
