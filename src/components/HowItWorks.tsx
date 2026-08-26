import { QrCode, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Choose a QR Type',
    description: 'Select the type of QR code that matches what you want to share — payment, contact, website, and more.',
  },
  {
    number: '02',
    title: 'Add Your Information',
    description: 'Enter your website, payment details, business information or content. It takes just a few seconds.',
  },
  {
    number: '03',
    title: 'Generate & Share',
    description: 'Create your QR code and download or share it instantly. Use it anywhere — online or in print.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-border">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-semibold text-accent uppercase tracking-widest mb-3">Simple Process</span>
          <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-text-dark tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-[15px] text-text-muted max-w-lg mx-auto">
            Three simple steps to create your QR code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-[2px] bg-gradient-to-r from-accent/20 to-accent/5 z-0" />
              )}

              <div className="relative z-10 text-center px-4">
                {/* Large number */}
                <div className="inline-flex items-center justify-center w-[72px] h-[72px] rounded-2xl bg-accent/8 border border-accent/15 mb-5">
                  <span className="text-[28px] font-bold text-accent">{step.number}</span>
                </div>

                <h3 className="text-[17px] font-semibold text-text-dark mb-2">{step.title}</h3>
                <p className="text-[14px] text-text-muted leading-relaxed max-w-[300px] mx-auto">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#generator"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold bg-accent text-white hover:bg-accent-dark transition-all duration-200 shadow-[0_2px_12px_rgba(22,128,92,0.25)] hover:shadow-[0_4px_20px_rgba(22,128,92,0.35)]"
          >
            <QrCode size={16} />
            Try It Now
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
