import {
  Baby,
  Bone,
  Brain,
  Droplets,
  HeartPulse,
  Microscope,
  Sparkles,
  Stethoscope,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import { SPECIALTIES, type SpecialtyKey } from '@/data/specialties';
import { useLanguage } from '@/i18n/useLanguage';

const SPECIALTY_ICONS: Record<SpecialtyKey, LucideIcon> = {
  general: Stethoscope,
  gastro: Microscope,
  gynae: Baby,
  derm: Sparkles,
  physio: Bone,
  psych: Brain,
  cardio: HeartPulse,
  respiratory: Wind,
  dialysis: Droplets,
};

interface SpecialtyVisualProps {
  specialty: SpecialtyKey;
  className?: string;
}

export function SpecialtyVisual({ specialty, className = '' }: SpecialtyVisualProps) {
  const { language } = useLanguage();
  const data = SPECIALTIES[specialty];
  const Icon = SPECIALTY_ICONS[specialty];

  return (
    <div className={`relative overflow-hidden bg-navy-800 ${className}`}>
      <img
        src={data.image}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-teal-900/10" />
      <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-teal-700 shadow-card backdrop-blur">
        <Icon className="h-5 w-5" />
      </span>
      <span className="absolute bottom-4 left-4 right-4 text-sm font-semibold leading-snug text-white drop-shadow">
        {data.name[language]}
      </span>
    </div>
  );
}
