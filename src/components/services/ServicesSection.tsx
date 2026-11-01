import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SpecialtyVisual } from '@/components/specialty/SpecialtyVisual';
import { HOSPITAL } from '@/data/hospital';
import { SERVICE_SPECIALTIES, type Specialty } from '@/data/specialties';
import { useLanguage } from '@/i18n/useLanguage';

function ServiceCard({ specialty }: { specialty: Specialty }) {
  const { language, copy } = useLanguage();
  const bookingMessage = encodeURIComponent(`Hello, I would like to book an appointment for ${specialty.name.en}.`);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <SpecialtyVisual specialty={specialty.key} className="h-52 w-full" />

      <div className="flex flex-1 flex-col gap-5 p-6">
        <p className="text-sm leading-relaxed text-ink-600">{specialty.description[language]}</p>

        <ul className="flex flex-col gap-2.5">
          {specialty.highlights.map((highlight) => (
            <li key={highlight.en} className="flex items-start gap-2.5 text-sm text-navy-800">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              {highlight[language]}
            </li>
          ))}
        </ul>

        <a
          href={`${HOSPITAL.bookingUrl}?text=${bookingMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-between gap-2 rounded-full border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 transition hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700"
        >
          {copy.services.bookSpeciality}
          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

export function ServicesSection() {
  const { copy } = useLanguage();

  return (
    <section id="services" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          subtitle={copy.services.subtitle}
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICE_SPECIALTIES.map((specialty) => (
            <ServiceCard key={specialty.key} specialty={specialty} />
          ))}
        </div>
      </div>
    </section>
  );
}
