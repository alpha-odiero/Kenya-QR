import { ArrowRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function CTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="relative bg-primary rounded-3xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="qr-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" rx="1" fill="white"/>
                  <rect x="16" y="16" width="8" height="8" rx="1" fill="white"/>
                  <rect x="32" y="32" width="8" height="8" rx="1" fill="white"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#qr-pattern)"/>
            </svg>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 sm:p-12 lg:p-16">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-white tracking-tight leading-tight">
                Create your M-PESA QR code now
              </h2>
              <p className="mt-4 text-[15px] text-white/60 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Free, fast, and private. No signup needed. Works on any device.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <a
                  href="#generator"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-semibold bg-white text-text-dark hover:bg-surface transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  Create Your QR Code
                  <ArrowRight size={16} strokeWidth={2.5} />
                </a>
              </div>
            </div>

            {/* Right QR illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
                <QRCodeSVG
                  value="https://kenyaqr.com"
                  size={160}
                  fgColor="#FFFFFF"
                  bgColor="transparent"
                  level="M"
                  marginSize={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
