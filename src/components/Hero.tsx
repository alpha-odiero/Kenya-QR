import { QrCode, ArrowRight } from 'lucide-react';
import heroImage from '../assets/hero.jpg';

export default function Hero() {
  return (
    <section className="pt-10 pb-4 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 lg:gap-6 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/8 border border-accent/15 mb-5">
              <QrCode size={14} className="text-accent" />
              <span className="text-[12px] font-semibold text-accent tracking-wide">Kenya QR</span>
            </div>

            <h1 className="text-[30px] sm:text-[40px] md:text-[46px] lg:text-[50px] font-bold text-text-dark leading-[1.08] tracking-tight">
              Create QR Codes{' '}
              <span className="gradient-text">Made for Kenya</span>
            </h1>

            <p className="mt-4 text-[14px] sm:text-[16px] text-text-muted max-w-[480px] mx-auto lg:mx-0 leading-relaxed">
              Create QR codes for payments, businesses, websites, menus, Wi-Fi, contacts and more — quickly and easily.
            </p>

            <div className="mt-3 text-[12px] text-text-muted/60 font-medium">
              No account needed. Free forever. Your data stays private.
            </div>

            <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <a
                href="#generator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-semibold bg-accent text-white hover:bg-accent-dark transition-all duration-200 shadow-[0_2px_12px_rgba(22,128,92,0.3)] hover:shadow-[0_4px_20px_rgba(22,128,92,0.4)] active:scale-[0.98]"
              >
                Create a QR Code
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
              <a
                href="#qr-types"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-semibold text-text-dark bg-white border border-border hover:border-accent/30 hover:bg-surface transition-all duration-200"
              >
                Explore QR Types
              </a>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="hidden sm:flex justify-center lg:justify-end">
            <img
              src={heroImage}
              alt="Kenya QR Code Generator"
              className="w-[85%] sm:w-full h-auto object-contain"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
