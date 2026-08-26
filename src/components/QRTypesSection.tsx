import { useState } from 'react';
import {
  Smartphone, Store, CalendarDays, CreditCard,
  UserCircle, Globe, Type, Wifi, MessageCircle, Phone, MessageSquare, Mail,
  MapPin, Share2, Code, Upload, Send, Receipt, Landmark, Link,
} from 'lucide-react';

const categoryCards = [
  {
    key: 'payments',
    icon: CreditCard,
    title: 'Payments',
    description: 'M-PESA, Till, PayBill, Bank and payment links.',
    color: 'bg-emerald-500',
  },
  {
    key: 'business',
    icon: Store,
    title: 'Business',
    description: 'Website, contact, location and social profiles.',
    color: 'bg-primary',
  },
  {
    key: 'connectivity',
    icon: MessageCircle,
    title: 'Connectivity',
    description: 'WhatsApp, phone, SMS, email and Wi-Fi.',
    color: 'bg-indigo-500',
  },
  {
    key: 'content',
    icon: Type,
    title: 'Content',
    description: 'Text, custom data and file uploads.',
    color: 'bg-blue-500',
  },
  {
    key: 'marketing',
    icon: CalendarDays,
    title: 'Marketing',
    description: 'Events, social links and promotional QR codes.',
    color: 'bg-purple-500',
  },
];

const paymentOptions = [
  { id: 'mpesa', icon: Smartphone, label: 'M-PESA', desc: 'Accept M-PESA payments' },
  { id: 'mpesa-till', icon: Store, label: 'M-PESA Till', desc: 'Buy Goods / Till number' },
  { id: 'mpesa-paybill', icon: Receipt, label: 'PayBill', desc: 'M-PESA PayBill' },
  { id: 'mpesa-send', icon: Send, label: 'Send Money', desc: 'M-PESA Send Money' },
  { id: 'bank-payment', icon: Landmark, label: 'Bank Payment', desc: 'Kenyan bank payment' },
  { id: 'payment-link', icon: Link, label: 'Payment Link', desc: 'Online payment page' },
];

const businessOptions = [
  { id: 'website', icon: Globe, label: 'Website', desc: 'Share any URL' },
  { id: 'contact', icon: UserCircle, label: 'Contact', desc: 'Share contact details' },
  { id: 'location', icon: MapPin, label: 'Location', desc: 'Share a location' },
  { id: 'social', icon: Share2, label: 'Social', desc: 'Social media profile' },
];

const connectivityOptions = [
  { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', desc: 'Start a conversation' },
  { id: 'phone', icon: Phone, label: 'Phone', desc: 'Dial a number' },
  { id: 'sms', icon: MessageSquare, label: 'SMS', desc: 'Send a text message' },
  { id: 'email', icon: Mail, label: 'Email', desc: 'Compose an email' },
  { id: 'wifi', icon: Wifi, label: 'Wi-Fi', desc: 'Quick Wi-Fi access' },
];

const contentOptions = [
  { id: 'text', icon: Type, label: 'Text', desc: 'Encode plain text' },
  { id: 'custom', icon: Code, label: 'Custom', desc: 'Any text or data' },
  { id: 'upload', icon: Upload, label: 'Upload', desc: 'Image, PDF or file' },
];

const marketingOptions = [
  { id: 'event', icon: CalendarDays, label: 'Event', desc: 'Calendar event' },
  { id: 'social', icon: Share2, label: 'Social Link', desc: 'Social media link' },
];

const allOptions: Record<string, { id: string; icon: typeof Globe; label: string; desc: string }[]> = {
  payments: paymentOptions,
  business: businessOptions,
  connectivity: connectivityOptions,
  content: contentOptions,
  marketing: marketingOptions,
};

const categoryColors: Record<string, string> = {
  payments: 'emerald',
  business: 'primary',
  connectivity: 'indigo',
  content: 'blue',
  marketing: 'purple',
};

interface QRTypesSectionProps {
  onSelectType?: (typeId: string) => void;
}

export default function QRTypesSection({ onSelectType }: QRTypesSectionProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleSelect = (typeId: string) => {
    setExpandedCategory(null);
    onSelectType?.(typeId);
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="qr-types" className="py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-[11px] font-semibold text-accent uppercase tracking-widest mb-3">All QR Types</span>
          <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-text-dark tracking-tight">
            Every QR code you need
          </h2>
          <p className="mt-3 text-[15px] text-text-muted max-w-xl mx-auto leading-relaxed">
            From M-PESA payments to restaurant menus and WiFi access — create any QR code for your Kenyan business, all in one free tool.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            const isExpanded = expandedCategory === cat.key;
            const options = allOptions[cat.key] || [];
            const accent = categoryColors[cat.key];

            return (
              <div
                key={cat.key}
                className="relative group bg-white rounded-2xl border border-border hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-accent/20 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : cat.key)}
                  className="w-full text-left p-6 flex items-start gap-4"
                >
                  <div className={`w-11 h-11 rounded-xl ${cat.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[15px] font-semibold text-text-dark">{cat.title}</h3>
                      <span className="text-[11px] font-semibold text-text-muted/50 tabular-nums">
                        {options.length} types
                      </span>
                    </div>
                    <p className="text-[13px] text-text-muted mt-1 leading-relaxed">{cat.description}</p>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border bg-surface/50 p-4">
                    <div className="grid grid-cols-2 gap-2">
                      {options.map((opt) => {
                        const OptIcon = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect(opt.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl bg-white border border-border hover:border-${accent}/30 hover:shadow-sm transition-all duration-200 text-left group/opt`}
                          >
                            <div className={`w-9 h-9 rounded-lg bg-${accent}/10 flex items-center justify-center flex-shrink-0 group-hover/opt:scale-105 transition-transform`}>
                              <OptIcon size={16} className={`text-${accent}`} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold text-text-dark leading-tight">{opt.label}</p>
                              <p className="text-[11px] text-text-muted leading-tight mt-0.5 truncate">{opt.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-3 text-center">
                      <button
                        onClick={() => setExpandedCategory(null)}
                        className="text-[12px] font-medium text-text-muted hover:text-text-dark transition-colors"
                      >
                        Show less
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
