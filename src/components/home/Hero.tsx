import { ArrowRight, CalendarCheck, Phone, ShieldPlus } from 'lucide-react';
import { HOSPITAL } from '@/data/hospital';
import { useLanguage } from '@/i18n/useLanguage';

const HERO_IMAGE = 'https://i.ibb.co/RkbCHpdy/unnamed.webp';

export function Hero() {
  const { copy } = useLanguage();

  return (
    <section id="home" className="hero-mesh relative overflow-hidden pt-40 pb-20 text-white lg:pt-44 lg:pb-28">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-gold-400/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="animate-fade-up flex flex-col gap-7 lg:col-span-7">
          <span className="glass inline-flex w-fit items-center gap-2.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-400" />
            </span>
            {copy.hero.badge}
          </span>

          <h1 className="font-serif text-5xl font-semibold leading-[1.1] sm:text-6xl lg:text-7xl">
            <span className="block text-white">{copy.hero.titleLead}</span>
            <span className="gold-text block pb-1">{copy.hero.titleAccent}</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">{copy.hero.subtitle}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={HOSPITAL.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 px-7 py-4 text-sm font-semibold text-navy-900 shadow-glow transition hover:-translate-y-0.5 hover:brightness-105"
            >
              <CalendarCheck className="h-5 w-5" />
              {copy.hero.primaryCta}
            </a>
            <a
              href="#doctors"
              className="glass group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              {copy.hero.secondaryCta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>

          <dl className="mt-2 grid grid-cols-3 gap-3 sm:max-w-xl sm:gap-4">
            {copy.hero.stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-4 py-4">
                <dt className="text-xs font-medium text-navy-200">{stat.label}</dt>
                <dd className="mt-1 font-serif text-2xl font-semibold text-gold-300 sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-up lg:col-span-5" style={{ animationDelay: '150ms' }}>
          <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/15">
            <img
              src={HERO_IMAGE}
              alt="Al Mannat Hospital building"
              className="h-[420px] w-full object-cover sm:h-[480px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-navy-800 shadow-card">
              <ShieldPlus className="h-4 w-4 text-teal-600" />
              Al Mannat Hospital
            </div>
          </div>

          <div className="glass animate-float absolute -bottom-6 left-4 right-4 rounded-3xl p-5 shadow-lift sm:left-auto sm:right-[-1rem] sm:w-[300px]">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-error-500 text-white shadow-lg shadow-error-500/40">
                <Phone className="h-5 w-5" />
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-white">{copy.hero.floatingTitle}</p>
                <p className="text-sm text-navy-100">{copy.hero.floatingBody}</p>
              </div>
            </div>
            <a
              href={`tel:+91${HOSPITAL.emergencyPhone}`}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition hover:bg-gold-50"
            >
              <Phone className="h-4 w-4 text-error-600" />
              {copy.hero.floatingCta}: {HOSPITAL.emergencyPhone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}