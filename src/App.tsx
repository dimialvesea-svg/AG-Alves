import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { DiagnosticFormSection } from './components/DiagnosticFormSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaAndFooter } from './components/FinalCtaAndFooter';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MethodologySection } from './components/MethodologySection';
import { ProblemsSection } from './components/ProblemsSection';
import { SolutionsSection } from './components/SolutionsSection';
import { initTracking } from './utils/tracking';

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    initTracking();
  }, []);

  useEffect(() => {
    if (!privacyOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPrivacyOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [privacyOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#334155]">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#102B50] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Ir para o conteúdo principal
      </a>

      <Header />

      <main id="conteudo-principal" className="flex-1">
        <HeroSection />
        <ProblemsSection />
        <SolutionsSection />
        <MethodologySection />
        <AboutSection />
        <DiagnosticFormSection onOpenPrivacy={() => setPrivacyOpen(true)} />
        <FaqSection />
      </main>

      <FinalCtaAndFooter
        privacyOpen={privacyOpen}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onClosePrivacy={() => setPrivacyOpen(false)}
      />
    </div>
  );
}
