import { Instagram, PhoneCall } from 'lucide-react';
import { HOSPITAL } from '@/data/hospital';
import { useLanguage } from '@/i18n/useLanguage';
import type { Language } from '@/i18n/copy';

const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी' },
];

function LanguageSwitcher() {
  const { language, setLanguage, copy } = useLanguage();

  return (
    <div
      role="group"
      aria-label={copy.topBar.languageLabel}
      className="flex items-center rounded-full bg-white/10 p-1 ring-1 ring-white/15"
    >
      {LANGUAGE_OPTIONS.map((option) => {
        const active = option.value === language;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => setLanguage(option.value)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 ${
              active
                ? 'bg-gold-400 text-navy-900 shadow-glow'
                : 'text-white/80 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function TopBar() {
  const { copy } = useLanguage();

  return (
    <div className="bg-navy-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-error-600 to-error-500 p-1 pr-1 shadow-lg shadow-error-600/30">
            <a
              href={`tel:+91${HOSPITAL.emergencyPhone}`}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition hover:bg-white/10 sm:text-sm"
            >
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <PhoneCall className="h-3.5 w-3.5" />
              </span>
              <span className="whitespace-nowrap">
                {copy.topBar.emergencyLabel}: {HOSPITAL.emergencyPhone}
              </span>
            </a>
          </div>
          <a
            href={`tel:+91${HOSPITAL.receptionPhone}`}
            className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/15 transition hover:bg-white/20 sm:text-sm"
          >
            <PhoneCall className="h-3.5 w-3.5 text-teal-300" />
            <span className="whitespace-nowrap">
              {copy.topBar.receptionLabel}: {HOSPITAL.receptionPhone}
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={HOSPITAL.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.topBar.instagram}
            className="flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 px-3 py-1.5 text-xs font-semibold text-navy-900 transition hover:brightness-110 sm:text-sm"
          >
            <Instagram className="h-4 w-4" />
            <span className="hidden sm:inline">{copy.topBar.instagram}</span>
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
