import { CalendarCheck, Clock, GraduationCap } from 'lucide-react';
import { SpecialtyVisual } from '@/components/specialty/SpecialtyVisual';
import { HOSPITAL } from '@/data/hospital';
import type { Doctor } from '@/data/doctors';
import { SPECIALTIES } from '@/data/specialties';
import { useLanguage } from '@/i18n/useLanguage';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const { language, copy } = useLanguage();
  const specialty = SPECIALTIES[doctor.specialty];
  const bookingMessage = encodeURIComponent(`Hello, I would like to book an appointment with ${doctor.name}.`);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <SpecialtyVisual specialty={doctor.specialty} className="h-44 w-full" />

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-serif text-xl font-semibold text-navy-800">{doctor.name}</h3>
          <p className="text-sm font-semibold text-teal-700">{specialty.name[language]}</p>
        </div>

        <div className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600">
          <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
              {copy.doctors.qualificationLabel}
            </span>
            <span>{doctor.credentials[language]}</span>
          </div>
        </div>

        <div className="mt-auto flex items-start gap-2.5 rounded-2xl bg-teal-50 px-4 py-3 text-sm text-teal-900">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
              {copy.doctors.timingLabel}
            </span>
            <span className="font-medium">{doctor.timing[language]}</span>
          </div>
        </div>

        <a
          href={`${HOSPITAL.bookingUrl}?text=${bookingMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
        >
          <CalendarCheck className="h-4 w-4 text-gold-300" />
          {copy.doctors.bookDoctor}
        </a>
      </div>
    </article>
  );
}
