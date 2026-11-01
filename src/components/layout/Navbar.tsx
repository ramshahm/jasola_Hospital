// import { useState } from 'react';
// import { Menu, X, CalendarCheck } from 'lucide-react';
// import { HOSPITAL } from '@/data/hospital';
// import { useLanguage } from '@/i18n/useLanguage';

// interface NavbarProps {
//   scrolled: boolean;
//   onOpenAdmin: () => void;
// }

// const SECTION_LINKS = [
//   { id: 'home', key: 'home' },
//   { id: 'about', key: 'about' },
//   { id: 'leadership', key: 'leadership' },
//   { id: 'doctors', key: 'doctors' },
//   { id: 'dialysis', key: 'dialysis' },
//   { id: 'services', key: 'services' },
//   { id: 'reviews', key: 'reviews' },
//   { id: 'contact', key: 'contact' },
// ] as const;

// export function Navbar({ scrolled, onOpenAdmin }: NavbarProps) {
//   const { copy } = useLanguage();
//   const [menuOpen, setMenuOpen] = useState(false);

// // Pre-filled WhatsApp Appointment Message for Navbar CTA
//   const navbarWhatsAppMessage = encodeURIComponent(
//     "Hello Al Mannat Hospital, I would like to book an appointment with a doctor. Could you please share the available time slots and OPD schedule?"
//   );

//   const linkClass =
//     'relative whitespace-nowrap py-2 text-sm font-medium text-navy-800 transition hover:text-teal-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full';

//   const bookingButtonClass =
//     'inline-flex items-center gap-2 rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lift';

//   return (
//     <nav
//       className={`transition-all duration-500 ${
//         scrolled || menuOpen
//           ? 'border-b border-navy-100 bg-white/95 shadow-card backdrop-blur-xl'
//           : 'bg-white/80 backdrop-blur-md'
//       }`}
//     >
//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
//         <a href="#home" className="flex items-center gap-3">
//           <img
//             src="https://i.ibb.co/ZpLdG50m/IMG-20261018-WA0001-1.jpg"
//             alt="Al Mannat Hospital logo"
//             className="h-11 w-11 rounded-2xl object-cover shadow-card ring-1 ring-navy-100"
//           />
//           <span className="flex flex-col leading-tight">
//             <span className="font-serif text-lg font-semibold text-navy-800">Al Mannat</span>
//             <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700">
//               Hospital
//             </span>
//           </span>
//         </a>

//         <div className="hidden items-center gap-5 xl:flex">
//           {SECTION_LINKS.map((link) => (
//             <a key={link.id} href={`#${link.id}`} className={linkClass}>
//               {copy.nav[link.key]}
//             </a>
//           ))}
//           <button
//             type="button"
//             onClick={onOpenAdmin}
//             className="rounded-full border border-gold-500/50 bg-gold-50 px-3.5 py-1.5 text-sm font-semibold text-gold-800 transition hover:bg-gold-100"
//           >
//             {copy.nav.admin}
//           </button>
//         </div>

//         <div className="flex items-center gap-3">
//           <a
//             href={HOSPITAL.bookingUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={`${bookingButtonClass} hidden md:inline-flex`}
//           >
//             <CalendarCheck className="h-4 w-4 text-gold-300" />
//             {copy.nav.bookCta}
//           </a>
//           <button
//             type="button"
//             onClick={() => setMenuOpen((open) => !open)}
//             aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
//             aria-expanded={menuOpen}
//             className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-800 transition hover:bg-navy-100 xl:hidden"
//           >
//             {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//           </button>
//         </div>
//       </div>

//       {menuOpen && (
//         <div className="animate-fade-in border-t border-navy-100 bg-white px-4 pb-6 pt-3 xl:hidden">
//           <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
//             {SECTION_LINKS.map((link) => (
//               <a
//                 key={link.id}
//                 href={`#${link.id}`}
//                 onClick={() => setMenuOpen(false)}
//                 className="rounded-xl px-4 py-3 text-sm font-medium text-navy-800 transition hover:bg-navy-50 hover:text-teal-600"
//               >
//                 {copy.nav[link.key]}
//               </a>
//             ))}
//             <button
//               type="button"
//               onClick={() => {
//                 setMenuOpen(false);
//                 onOpenAdmin();
//               }}
//               className="rounded-xl bg-gold-50 px-4 py-3 text-left text-sm font-semibold text-gold-800 transition hover:bg-gold-100"
//             >
//               {copy.nav.admin}
//             </button>
//           </div>
//           <a
//             href={HOSPITAL.bookingUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={`${bookingButtonClass} mt-4 w-full justify-center md:hidden`}
//           >
//             <CalendarCheck className="h-4 w-4 text-gold-300" />
//             {copy.nav.bookCta}
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// }



















import { useState } from 'react';
import { Menu, X, CalendarCheck } from 'lucide-react';
import { HOSPITAL } from '@/data/hospital';
import { useLanguage } from '@/i18n/useLanguage';

interface NavbarProps {
  scrolled: boolean;
  onOpenAdmin: () => void;
}

const SECTION_LINKS = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'leadership', key: 'leadership' },
  { id: 'doctors', key: 'doctors' },
  { id: 'dialysis', key: 'dialysis' },
  { id: 'services', key: 'services' },
  { id: 'reviews', key: 'reviews' },
  { id: 'contact', key: 'contact' },
] as const;

export function Navbar({ scrolled, onOpenAdmin }: NavbarProps) {
  const { copy } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  // Pre-filled WhatsApp Appointment Message for Navbar CTA
  const navbarWhatsAppMessage = encodeURIComponent(
    "Hello Al Mannat Hospital, I would like to book an appointment with a doctor. Could you please share the available time slots and OPD schedule?"
  );
  
  const baseWhatsAppUrl = HOSPITAL?.bookingUrl || "https://wa.me/919756017861";
  const navBookingUrl = `${baseWhatsAppUrl}?text=${navbarWhatsAppMessage}`;

  const linkClass =
    'relative whitespace-nowrap py-2 text-sm font-medium text-navy-800 transition hover:text-teal-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full';

  const bookingButtonClass =
    'inline-flex items-center gap-2 rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lift';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'border-b border-navy-100 bg-white/95 shadow-card backdrop-blur-xl'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img
            src="https://i.ibb.co/ZpLdG50m/IMG-20261018-WA0001-1.jpg"
            alt="Al Mannat Hospital logo"
            className="h-11 w-11 rounded-2xl object-cover shadow-card ring-1 ring-navy-100"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold text-navy-800">Al Mannat</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700">
              Hospital
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-5 xl:flex">
          {SECTION_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} className={linkClass}>
              {copy?.nav?.[link.key] || link.id}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="rounded-full border border-gold-500/50 bg-gold-50 px-3.5 py-1.5 text-sm font-semibold text-gold-800 transition hover:bg-gold-100"
          >
            {copy?.nav?.admin || 'Admin Portal'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop WhatsApp Booking CTA */}
          <a
            href={navBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bookingButtonClass} hidden md:inline-flex`}
          >
            <CalendarCheck className="h-4 w-4 text-gold-300" />
            {copy?.nav?.bookCta || 'Book Appointment'}
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? (copy?.nav?.closeMenu || 'Close Menu') : (copy?.nav?.openMenu || 'Open Menu')}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-800 transition hover:bg-navy-100 xl:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="animate-fade-in border-t border-navy-100 bg-white px-4 pb-6 pt-3 xl:hidden">
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {SECTION_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-navy-800 transition hover:bg-navy-50 hover:text-teal-600"
              >
                {copy?.nav?.[link.key] || link.id}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenAdmin();
              }}
              className="rounded-xl bg-gold-50 px-4 py-3 text-left text-sm font-semibold text-gold-800 transition hover:bg-gold-100"
            >
              {copy?.nav?.admin || 'Admin Portal'}
            </button>
          </div>
          
          {/* Mobile WhatsApp Booking CTA */}
          <a
            href={navBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bookingButtonClass} mt-4 w-full justify-center md:hidden`}
          >
            <CalendarCheck className="h-4 w-4 text-gold-300" />
            {copy?.nav?.bookCta || 'Book Appointment'}
          </a>
        </div>
      )}
    </nav>
  );
}