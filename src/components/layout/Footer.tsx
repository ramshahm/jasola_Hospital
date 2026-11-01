import { HeartPulse, Instagram, MapPin, Phone } from 'lucide-react';
import { HOSPITAL } from '@/data/hospital';
import { useLanguage } from '@/i18n/useLanguage';

const FOOTER_LINKS = ['about', 'leadership', 'doctors', 'dialysis', 'services', 'reviews', 'contact'] as const;

export function Footer() {
  const { copy } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[50rem] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white">
              <HeartPulse className="h-6 w-6" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-lg font-semibold text-white">Al Mannat</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-300">Hospital</span>
            </span>
          </div>
          <p className="font-serif text-lg italic text-gold-300">{copy.footer.tagline}</p>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{copy.footer.quickLinks}</h4>
          <ul className="grid grid-cols-2 gap-3 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link}>
                <a href={`#${link}`} className="transition hover:text-gold-300">
                  {copy.nav[link]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{copy.footer.contact}</h4>
          <div className="flex items-start gap-3 text-sm leading-relaxed">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
            <span className="flex flex-col">
              {HOSPITAL.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </div>
          <div className="flex flex-col gap-2.5 text-sm">
            {HOSPITAL.helplinePhones.map((phone) => (
              <a
                key={phone}
                href={`tel:+91${phone}`}
                className="inline-flex w-fit items-center gap-2 transition hover:text-gold-300"
              >
                <Phone className="h-3.5 w-3.5 text-teal-300" />
                {phone}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{copy.footer.follow}</h4>
          <a
            href={HOSPITAL.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white/5 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-gold-400 hover:text-navy-900 hover:ring-gold-400"
          >
            <Instagram className="h-4 w-4" />
            {HOSPITAL.instagramHandle}
          </a>
          <a
            href={HOSPITAL.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-teal-300 transition hover:text-gold-300"
          >
            <MapPin className="h-4 w-4" />
            {copy.contact.openMaps}
          </a>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {HOSPITAL.name}. {copy.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
