import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/content';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#inicio"
          className="inline-flex items-center gap-2.5 text-[#102B50] font-display font-bold text-lg tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2675D8] rounded-md px-1 py-0.5"
          aria-label="AG Alves – Consultoria e Marketing, voltar ao início"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="64" height="64" rx="14" fill="#102B50" />
            <path
              d="M16 45L26.5 19H31.8L42.3 45H36.6L34.4 39.2H23.9L21.7 45H16ZM25.4 34.7H32.9L29.15 24.8L25.4 34.7Z"
              fill="#FFFFFF"
            />
            <path d="M40 31.5H49V45H44.4V35.8H40V31.5Z" fill="#2675D8" />
            <rect x="40" y="19" width="9" height="4.5" rx="1.5" fill="#2675D8" />
          </svg>
          <span>AG Alves</span>
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#334155]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#102B50] transition-colors duration-150 border-b-2 border-transparent hover:border-[#2675D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2675D8] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#diagnostico"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#2675D8] hover:bg-[#1E60B5] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2675D8]"
          >
            Solicitar Diagnóstico
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#102B50] hover:bg-[#F1F5F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2675D8]"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Navegação móvel"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="block px-3 py-3 text-base font-medium text-[#334155] hover:text-[#102B50] hover:bg-[#F1F5F9] rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#diagnostico"
              onClick={handleNavClick}
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-[#2675D8] hover:bg-[#1E60B5] rounded-lg transition-colors"
            >
              Solicitar Diagnóstico Gratuito
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
