import { useState } from 'react';
import { Award, UserRound } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { LEADERS, type Leader } from '@/data/doctors';
import { useLanguage } from '@/i18n/useLanguage';

function initialsOf(name: string): string {
  return name
    .replace(/^Dr\.\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function LeaderCard({ leader }: { leader: Leader }) {
  const { language, copy } = useLanguage();
  const [photoMissing, setPhotoMissing] = useState(false);

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-lift backdrop-blur transition duration-500 hover:-translate-y-1.5 hover:border-gold-400/40"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-navy-700 via-navy-800 to-teal-800">
        {!photoMissing ? (
          <img
            src={leader.photo}
            alt={leader.name}
            loading="lazy"
            onError={() => setPhotoMissing(true)}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-gold-400/50 bg-navy-950/40 font-serif text-3xl font-semibold text-gold-300">
              {initialsOf(leader.name) || <UserRound className="h-10 w-10" />}
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-navy-100">
              {copy.leadership.photoPending}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/80 to-transparent" />
        <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-navy-900 shadow-glow">
          <Award className="h-5 w-5" />
        </span>
      </div>

      <div className="flex flex-col gap-2 px-3 pb-4 pt-5">
        <h3 className="font-serif text-2xl font-semibold text-white">{leader.name}</h3>
        <p className="text-sm font-medium text-gold-300">{leader.role[language]}</p>
        <p className="text-sm leading-relaxed text-navy-200">{leader.credentials[language]}</p>
      </div>
    </article>
  );
}

export function LeadershipSection() {
  const { copy } = useLanguage();

  return (
    <section id="leadership" className="hero-mesh relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.leadership.eyebrow}
          title={copy.leadership.title}
          subtitle={copy.leadership.subtitle}
          invert
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {LEADERS.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}
