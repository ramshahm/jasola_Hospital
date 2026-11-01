import { CalendarCheck, ExternalLink, Instagram, MapPin, Phone } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { HOSPITAL } from '@/data/hospital';
import { useLanguage } from '@/i18n/useLanguage';

const HELPLINE_LABELS = ['emergencyLine', 'receptionLine', 'helpLine'] as const;

export function ContactSection() {
  const { copy } = useLanguage();

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-50 py-20 sm:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={copy.contact.eyebrow} title={copy.contact.title} subtitle={copy.contact.subtitle} />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-[2rem] bg-navy-800 p-8 text-white shadow-lift hero-mesh lg:col-span-7 sm:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="relative flex flex-col gap-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400 text-navy-900 shadow-glow">
                <MapPin className="h-7 w-7" />
              </span>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{copy.contact.addressLabel}</p>
                <h3 className="font-serif text-2xl font-semibold leading-snug sm:text-3xl">{HOSPITAL.name}</h3>
                {HOSPITAL.addressLines.map((line) => (
                  <p key={line} className="text-base text-navy-100">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <a
              href={HOSPITAL.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-7 py-4 text-sm font-semibold text-navy-800 transition hover:-translate-y-0.5 hover:bg-gold-50 hover:shadow-lift"
            >
              <ExternalLink className="h-4 w-4 text-teal-600" />
              {copy.contact.openMaps}
            </a>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="flex flex-col gap-4 rounded-[2rem] border border-navy-100 bg-white p-6 shadow-card sm:p-8">
              <h3 className="font-serif text-xl font-semibold text-navy-800">{copy.contact.helplinesTitle}</h3>
              {HOSPITAL.helplinePhones.map((phone, index) => (
                <a
                  key={phone}
                  href={`tel:+91${phone}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-navy-100 px-4 py-3.5 transition hover:border-teal-300 hover:bg-teal-50"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xs font-medium text-ink-500">{copy.contact[HELPLINE_LABELS[index]]}</span>
                      <span className="font-semibold text-navy-800">{phone}</span>
                    </span>
                  </span>
                  <Phone className="h-4 w-4 text-ink-300 transition group-hover:text-teal-600" />
                </a>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a
                href={HOSPITAL.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-[2rem] bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 p-6 text-navy-900 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
              >
                <Instagram className="h-6 w-6" />
                <span className="font-serif text-lg font-semibold">{copy.contact.instagramTitle}</span>
                <span className="text-sm font-medium">{copy.contact.instagramCta}</span>
              </a>
              <a
                href={HOSPITAL.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-[2rem] bg-navy-800 p-6 text-white shadow-card transition hover:-translate-y-1 hover:shadow-lift"
              >
                <CalendarCheck className="h-6 w-6 text-gold-300" />
                <span className="font-serif text-lg font-semibold">{copy.contact.bookTitle}</span>
                <span className="text-sm text-navy-100">{copy.contact.bookBody}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
