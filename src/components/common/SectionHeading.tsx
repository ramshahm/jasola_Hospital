import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  invert?: boolean;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', invert = false }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignClass}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
        {eyebrow}
      </span>
      <h2
        className={`font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${
          invert ? 'text-white' : 'text-navy-800'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base leading-relaxed sm:text-lg ${invert ? 'text-navy-100' : 'text-ink-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
