import { useState } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { LeadershipSection } from '@/components/leadership/LeadershipSection';
import { DoctorsSection } from '@/components/doctors/DoctorsSection';
import { DialysisSection } from '@/components/dialysis/DialysisSection';
import { ServicesSection } from '@/components/services/ServicesSection';
import { ReviewsSection } from '@/components/reviews/ReviewsSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { AdminPortal } from '@/components/admin/AdminPortal';
import { WhatsAppFab } from '@/components/whatsapp/WhatsAppFab';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-x-hidden bg-white font-sans text-ink-900">
        <Header onOpenAdmin={() => setShowAdmin(true)} />
        <main>
          <Hero />
          <About />
          <LeadershipSection />
          <DoctorsSection />
          <DialysisSection />
          <ServicesSection />
          <ReviewsSection />
          <ContactSection />
        </main>
        <Footer />
        <WhatsAppFab />
        {showAdmin && <AdminPortal onClose={() => setShowAdmin(false)} />}
      </div>
    </LanguageProvider>
  );
}

export default App;
