import { MessageCircle } from 'lucide-react';
import { HOSPITAL } from '@/data/hospital';
import { useLanguage } from '@/i18n/useLanguage';

export function WhatsAppFab() {
  const { copy } = useLanguage();

  // Pre-filled custom auto-chat message for WhatsApp
  const message = "Hello Al Mannat Hospital, I would like to book an online appointment or check doctor availability. Please guide me with the available slots.";
  
  // Clean phone number or base booking URL from HOSPITAL object, appending the encoded text
  const baseWhatsAppUrl = HOSPITAL?.bookingUrl || "https://wa.me/919756017861";
  const whatsappHref = `${baseWhatsAppUrl}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy?.whatsapp?.label || "Chat on WhatsApp"}
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success-500 text-white shadow-lift transition hover:-translate-y-1 hover:bg-success-600 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full" />
      <MessageCircle className="relative h-7 w-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-navy-900 px-4 py-2 text-sm font-medium text-white opacity-0 shadow-card transition group-hover:opacity-100 md:block">
        {copy?.whatsapp?.label || "Chat on WhatsApp"}
      </span>
    </a>
  );
}