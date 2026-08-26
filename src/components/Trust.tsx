import { Shield, Zap, Lock, Eye, Smartphone, Share2 } from 'lucide-react';

const benefits = [
  {
    icon: Lock,
    title: 'Fully Private',
    desc: 'Your information never leaves your device. Everything stays completely confidential.',
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    desc: 'No waiting, no delays. Your QR code is ready in seconds.',
  },
  {
    icon: Eye,
    title: 'No Sign-Ups',
    desc: 'Jump straight in. No accounts, no forms, no personal details required.',
  },
  {
    icon: Shield,
    title: 'Nothing Stored',
    desc: 'Zero data collection. When you leave, everything disappears.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    desc: 'Works perfectly on any device — phone, tablet or desktop.',
  },
  {
    icon: Share2,
    title: 'Easy to Share',
    desc: 'Download as PNG or SVG and use your QR code anywhere.',
  },
];

export default function Trust() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-[11px] font-semibold text-accent uppercase tracking-widest mb-3">Why Kenya QR</span>
          <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-text-dark tracking-tight">
            Trusted for Everyday Digital Connections
          </h2>
          <p className="mt-3 text-[15px] text-text-muted leading-relaxed max-w-lg mx-auto">
            Your information is yours alone. We never see, store, or share any of the data you enter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative bg-white rounded-2xl border border-border/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(22,128,92,0.08)] hover:border-accent/20 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/8 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="text-[15px] font-semibold text-text-dark mb-1.5">{item.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
