import { Palette, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const customizationFeatures = [
  { label: 'QR Color', description: 'Match your brand colors' },
  { label: 'Background', description: 'Custom background options' },
  { label: 'Shape', description: 'Round or sharp dot styles' },
  { label: 'Logo', description: 'Add your brand logo' },
  { label: 'Frame', description: 'Add call-to-action frames' },
  { label: 'Size', description: 'High-resolution downloads' },
];

export default function Customization() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: QR Preview */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="bg-white rounded-3xl border border-border shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-8 sm:p-10">
                <QRCodeSVG
                  value="https://kenyaqr.com"
                  size={200}
                  fgColor="#16805C"
                  bgColor="#FFFFFF"
                  level="M"
                  marginSize={4}
                />
              </div>

              {/* Floating customization chips */}
              <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-border px-3 py-2 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent" />
                <span className="text-[11px] font-semibold text-text-dark">Custom Color</span>
              </div>

              <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-border px-3 py-2 flex items-center gap-2">
                <Palette size={14} className="text-accent" />
                <span className="text-[11px] font-semibold text-text-dark">Brand Logo</span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="inline-block text-[11px] font-semibold text-accent uppercase tracking-widest mb-3">Customization</span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-text-dark tracking-tight">
              Make Your QR Code Yours
            </h2>
            <p className="mt-3 text-[15px] text-text-muted leading-relaxed max-w-md">
              Create QR codes that fit your brand, campaign or business. Customize colors, add logos, and make every QR code uniquely yours.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {customizationFeatures.map((item) => (
                <div key={item.label} className="flex items-start gap-3 bg-white rounded-xl border border-border p-3.5 hover:border-accent/20 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-accent/8 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-text-dark">{item.label}</p>
                    <p className="text-[11px] text-text-muted mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
