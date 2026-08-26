import { Heart } from 'lucide-react';

const qrTypesLinks = [
  { label: 'M-PESA Paybill QR', href: '#generator' },
  { label: 'M-PESA Till QR', href: '#generator' },
  { label: 'M-PESA Send Money', href: '#generator' },
  { label: 'Website QR', href: '#generator' },
  { label: 'WhatsApp QR', href: '#generator' },
  { label: 'WiFi QR', href: '#generator' },
  { label: 'Restaurant Menu QR', href: '#generator' },
  { label: 'All QR Types', href: '#qr-types' },
];

const resourceLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
  { label: 'QR Code Guide', href: '#how-it-works' },
  { label: 'M-PESA QR Guide', href: '#faq' },
  { label: 'Help', href: '#faq' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" rx="1" fill="white"/>
              <rect x="16" y="16" width="8" height="8" rx="1" fill="white"/>
              <rect x="32" y="32" width="8" height="8" rx="1" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)"/>
        </svg>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="py-14 sm:py-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
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
              <span className="text-[17px] font-semibold">Kenya QR</span>
            </div>
            <p className="text-[13px] text-white/45 leading-relaxed max-w-[260px]">
              Free M-PESA QR code generator for Kenya. Create QR codes for Paybill, Till/Buy Goods, menus, WiFi and more — no signup needed.
            </p>
          </div>

          {/* QR Types */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-4">QR Types</h4>
            <div className="space-y-2.5">
              {qrTypesLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[13px] text-white/55 hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-4">Resources</h4>
            <div className="space-y-2.5">
              {resourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[13px] text-white/55 hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-4">Legal</h4>
            <div className="space-y-2.5">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[13px] text-white/55 hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/30">
            &copy; 2026 Kenya QR. All rights reserved.
          </p>
          <p className="text-[12px] text-white/30 flex items-center gap-1.5">
            Built for Kenya <span className="text-[14px]">&#127472;&#127466;</span>
          </p>
          <p className="text-[12px] text-white/30 flex items-center gap-1">
            Developed with <Heart size={10} className="text-accent fill-accent" /> by Alpha Odiero
          </p>
        </div>
      </div>
    </footer>
  );
}
