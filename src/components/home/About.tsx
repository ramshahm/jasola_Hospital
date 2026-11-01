import { Clock, HeartHandshake, ShieldCheck, Stethoscope, type LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { useLanguage } from '@/i18n/useLanguage';

const POINT_ICONS: LucideIcon[] = [Stethoscope, HeartHandshake, Clock, ShieldCheck];

export function About() {
  const { copy } = useLanguage();

  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-teal-100/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow={copy.about.eyebrow}
            title={copy.about.title}
          />
          <p className="text-base leading-relaxed text-ink-600 sm:text-lg">{copy.about.body}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {copy.about.points.map((point, index) => {
            const Icon = POINT_ICONS[index];
            return (
              <article
                key={point.title}
                className="group flex flex-col gap-4 rounded-3xl border border-navy-100 bg-gradient-to-b from-white to-navy-50/60 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-800 text-gold-300 transition group-hover:bg-teal-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-serif text-xl font-semibold text-navy-800">{point.title}</h3>
                <p className="text-sm leading-relaxed text-ink-600">{point.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
