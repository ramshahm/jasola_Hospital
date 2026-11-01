import { Activity, BedDouble, Droplets, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { HOSPITAL } from '@/data/hospital';
import { SPECIALTIES } from '@/data/specialties';
import { useLanguage } from '@/i18n/useLanguage';

const FEATURE_ICONS = [Droplets, Activity, BedDouble, ShieldCheck];

export function DialysisSection() {
  const { copy } = useLanguage();

  const dialysisWhatsAppMessage = encodeURIComponent(
    "Hello Al Mannat Hospital, I would like to inquire about 24/7 Dialysis slots, AV Fistula surgery, and package rates. Please guide me."
  );
  const dialysisWhatsAppUrl = `https://wa.me/919756017861?text=${dialysisWhatsAppMessage}`;

  return (
    <section id="dialysis" className="relative overflow-hidden bg-gradient-to-b from-white to-teal-50/60 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        
        {/* Left Column: Image with badges */}
        <div className="relative lg:col-span-5">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-lift">
            <img
              src={SPECIALTIES?.dialysis?.image || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"}
              alt="24/7 Dialysis Unit"
              loading="lazy"
              className="h-[380px] w-full object-cover sm:h-[480px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
            
            <span className="glass absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal-300" />
              {copy?.dialysis?.badge || "24/7 Advanced Unit"}
            </span>

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-navy-900/80 p-4 backdrop-blur-md border border-white/10 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-teal-300">Strict Safety Standards</p>
                  <p className="text-sm font-semibold">Double-Stage RO Water & Single-Use Filters</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content & Features */}
        <div className="flex flex-col gap-10 lg:col-span-7">
          <div className="flex flex-col gap-5">
            <SectionHeading
              align="left"
              eyebrow={copy?.dialysis?.eyebrow || "Nephrology & Critical Care"}
              title={copy?.dialysis?.title || "24/7 Advanced Dialysis Facility"}
              subtitle={copy?.dialysis?.subtitle || "State-of-the-art dialysis machines with expert nephrology supervision, AV fistula support, and patient comfort care in Shaheen Bagh."}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {copy?.dialysis?.features?.map((feature, index) => {
              const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
              return (
                <article
                  key={feature.title || index}
                  className="flex gap-4 rounded-3xl border border-white bg-white p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-semibold text-navy-800">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-600">{feature.body}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={`tel:+91${HOSPITAL?.emergencyPhone || "9355410932"}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-navy-800 px-7 py-4 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lift"
            >
              <Phone className="h-4 w-4 text-gold-300" />
              {copy?.dialysis?.callCta || "Emergency Helpline"}: {HOSPITAL?.emergencyPhone || "9355410932"}
            </a>

            <a
              href={dialysisWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-success-600 px-7 py-4 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-success-700 hover:shadow-lift"
            >
              <MessageCircle className="h-4 w-4" />
              Inquire Dialysis Slots on WhatsApp
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}