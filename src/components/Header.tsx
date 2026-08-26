import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

const navItems = [
  { label: 'QR Types', href: '#qr-types' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className={`transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
          : 'bg-white/70 backdrop-blur-sm border-b border-transparent'
      }`}>
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[64px]">
            <a href="#" className="flex items-center gap-2.5 text-text-dark no-underline">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="7" fill="#16805C"/>
                <rect x="6" y="6" width="8" height="8" rx="1.5" fill="white"/>
                <rect x="18" y="6" width="8" height="8" rx="1.5" fill="white"/>
                <rect x="6" y="18" width="8" height="8" rx="1.5" fill="white"/>
                <rect x="8" y="8" width="4" height="4" rx="0.5" fill="#16805C"/>
                <rect x="20" y="8" width="4" height="4" rx="0.5" fill="#16805C"/>
                <rect x="8" y="20" width="4" height="4" rx="0.5" fill="#16805C"/>
                <rect x="18" y="18" width="3" height="3" rx="0.5" fill="white"/>
                <rect x="23" y="18" width="3" height="3" rx="0.5" fill="white"/>
                <rect x="18" y="23" width="3" height="3" rx="0.5" fill="white"/>
                <rect x="23" y="23" width="3" height="3" rx="0.5" fill="white"/>
              </svg>
              <span className="text-[17px] font-semibold tracking-tight">Kenya QR</span>
            </a>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-[13.5px] font-medium text-text-muted hover:text-text-dark transition-all duration-200 rounded-lg hover:bg-surface"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#generator"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[13px] font-semibold bg-accent text-white hover:bg-accent-dark transition-all duration-200 shadow-[0_2px_8px_rgba(22,128,92,0.2)] hover:shadow-[0_4px_12px_rgba(22,128,92,0.3)]"
              >
                Create QR
                <ChevronRight size={14} strokeWidth={2.5} />
              </a>
            </div>

            <button
              className="lg:hidden p-2.5 -mr-2 text-text-muted hover:text-text-dark transition-colors rounded-xl active:scale-95"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-[64px] left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-border bg-white shadow-lg">
          <div className="px-5 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-3.5 text-[15px] font-medium text-text-muted hover:text-text-dark rounded-xl hover:bg-surface active:bg-surface transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="#generator"
                className="flex items-center justify-center gap-1.5 w-full px-5 py-3.5 rounded-xl text-[14px] font-semibold bg-accent text-white hover:bg-accent-dark active:scale-[0.98] transition-all duration-200 shadow-[0_2px_8px_rgba(22,128,92,0.2)]"
                onClick={() => setMobileOpen(false)}
              >
                Create QR
                <ChevronRight size={14} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
