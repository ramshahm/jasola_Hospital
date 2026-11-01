import { useMemo, useState } from 'react';
import { Search, X, UserSearch } from 'lucide-react';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { SectionHeading } from '@/components/common/SectionHeading';
import { DOCTORS, type Doctor } from '@/data/doctors';
import { SPECIALTIES } from '@/data/specialties';
import { useLanguage } from '@/i18n/useLanguage';

function doctorMatchesQuery(doctor: Doctor, query: string): boolean {
  const specialty = SPECIALTIES[doctor.specialty];
  const haystack = [
    doctor.name,
    doctor.credentials.en,
    doctor.credentials.hi,
    specialty.name.en,
    specialty.name.hi,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}

export function DoctorsSection() {
  const { copy } = useLanguage();
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const visibleDoctors = useMemo(
    () =>
      normalizedQuery
        ? DOCTORS.filter((doctor) => doctorMatchesQuery(doctor, normalizedQuery))
        : DOCTORS,
    [normalizedQuery],
  );

  return (
    <section id="doctors" className="relative bg-ink-50 py-20 sm:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.doctors.eyebrow}
          title={copy.doctors.title}
          subtitle={copy.doctors.subtitle}
        />

        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
          <label htmlFor="doctor-search" className="sr-only">
            {copy.doctors.searchLabel}
          </label>
          <div className="group relative flex items-center">
            <Search className="pointer-events-none absolute left-5 h-5 w-5 text-ink-400 transition group-focus-within:text-teal-600" />
            <input
              id="doctor-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.doctors.searchPlaceholder}
              className="w-full rounded-full border border-navy-100 bg-white py-4 pl-14 pr-14 text-base text-navy-900 shadow-card outline-none transition placeholder:text-ink-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={copy.doctors.clearSearch}
                className="absolute right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-600 transition hover:bg-ink-200 hover:text-navy-800"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-center text-sm text-ink-500" aria-live="polite">
            <span className="font-semibold text-navy-800">{visibleDoctors.length}</span> / {DOCTORS.length}{' '}
            {copy.doctors.shownLabel}
          </p>
        </div>

        {visibleDoctors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibleDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-navy-200 bg-white px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-700">
              <UserSearch className="h-7 w-7" />
            </span>
            <p className="max-w-md text-base text-ink-600">{copy.doctors.noResults}</p>
          </div>
        )}
      </div>
    </section>
  );
}
