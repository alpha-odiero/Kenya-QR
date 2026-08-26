import { useState, useRef, useCallback, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode, ArrowLeft, Sparkles, Upload, X, Printer,
  Globe, Type, Wifi, MessageCircle, Phone, MessageSquare, Mail,
  UserCircle, MapPin, Share2, Code, Send, Receipt, Landmark, Link,
  ChevronRight, Palette, ArrowDownToLine, Share, RotateCcw,
  FileImage, FileText, File as FileIcon, Lock,
  CalendarDays, Smartphone, Store, CreditCard,
} from 'lucide-react';
import { QR_TYPES } from '../types/qrTypes';
import type { QRType, QRConfig } from '../types';
import {
  defaultQRConfig,
  defaultWifiData,
  defaultWhatsAppData,
  defaultContactData,
  defaultLocationData,
  defaultEventData,
  defaultMPesaData,
  defaultMPesaPayBillData,
  defaultMPesaSendData,
  defaultBankPaymentData,
  defaultPaymentLinkData,
} from '../types';
import { encodeQR } from '../utils/qrEncoder';
import { downloadPNG, downloadSVG, printQR } from '../utils/download';

const iconMap: Record<string, typeof Globe> = {
  globe: Globe, type: Type, wifi: Wifi, 'message-circle': MessageCircle,
  phone: Phone, 'message-square': MessageSquare, mail: Mail, user: UserCircle,
  'map-pin': MapPin, calendar: CalendarDays, 'share-2': Share2, code: Code,
  smartphone: Smartphone, store: Store, receipt: Receipt, send: Send,
  landmark: Landmark, link: Link, upload: Upload,
};

type Step = 1 | 2 | 3 | 4;

const steps: { pct: number; label: string }[] = [
  { pct: 10, label: 'Category' },
  { pct: 20, label: 'Type' },
  { pct: 30, label: 'Details' },
  { pct: 40, label: 'Result' },
];

interface QRGeneratorProps {
  initialType?: string | null;
}

function getDefaultData(type: QRType): Record<string, unknown> {
  switch (type) {
    case 'website': return { url: '' };
    case 'text': return { text: '' };
    case 'wifi': return { ...defaultWifiData };
    case 'whatsapp': return { ...defaultWhatsAppData };
    case 'phone': return { phone: '' };
    case 'sms': return { phone: '', message: '' };
    case 'email': return { email: '', subject: '', message: '' };
    case 'contact': return { ...defaultContactData };
    case 'location': return { ...defaultLocationData };
    case 'event': return { ...defaultEventData };
    case 'social': return { url: '' };
    case 'custom': return { text: '' };
    case 'upload': return { uploadType: 'image', dataUrl: '', fileName: '', mimeType: '' };
    case 'mpesa': return { ...defaultMPesaData };
    case 'mpesa-till': return { ...defaultMPesaData };
    case 'mpesa-paybill': return { ...defaultMPesaPayBillData };
    case 'mpesa-send': return { ...defaultMPesaSendData };
    case 'bank-payment': return { ...defaultBankPaymentData };
    case 'payment-link': return { ...defaultPaymentLinkData };
    default: return {};
  }
}

const paymentTypes = QR_TYPES.filter(t => t.category === 'payments');
const businessTypes = QR_TYPES.filter(t => t.category === 'business');

export default function QRGenerator({ initialType }: QRGeneratorProps) {
  const [qrType, setQrType] = useState<QRType>('website');
  const [data, setData] = useState<Record<string, unknown>>(getDefaultData('website'));
  const [config, setConfig] = useState<QRConfig>(defaultQRConfig);
  const [encoded, setEncoded] = useState('');
  const [step, setStep] = useState<Step>(1);
  const [showResult, setShowResult] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEncoded(encodeQR(qrType, data));
  }, [qrType, data]);

  useEffect(() => {
    if (initialType) {
      const t = initialType as QRType;
      setQrType(t);
      setData(getDefaultData(t));
      setStep(3);
    }
  }, [initialType]);

  const handleTypeChange = useCallback((type: QRType) => {
    setQrType(type);
    setData(getDefaultData(type));
    setShowTypeModal(null);
    setStep(3);
  }, []);

  const handleCategoryClick = (cat: string) => {
    setCategory(cat);
    if (cat === 'payments' || cat === 'business') {
      setShowTypeModal(cat);
    } else {
      const firstType = QR_TYPES.find(t => t.category === cat);
      if (firstType) handleTypeChange(firstType.id as QRType);
    }
    setStep(2);
  };

  const handleSelectCategoryType = (typeId: string) => {
    handleTypeChange(typeId as QRType);
  };

  const findSvg = () => svgRef.current?.querySelector('svg');

  const handleGenerate = () => { setShowResult(true); setStep(4); };
  const handleCreateAnother = () => { setShowResult(false); setStep(1); setCategory(null); };
  const handleBackToDetails = () => { setShowResult(false); setStep(3); };

  const handleDownloadPNG = () => { const s = findSvg(); if (s) downloadPNG(s, `kenya-qr-${qrType}.png`); };
  const handleDownloadSVG = () => { const s = findSvg(); if (s) downloadSVG(s, `kenya-qr-${qrType}.svg`); };
  const handlePrint = () => { const s = findSvg(); if (s) printQR(s); };

  const categoryCards = [
    { key: 'payments', icon: CreditCard, title: 'Payments', desc: 'M-PESA, Till, PayBill, Bank and payment links.', color: 'bg-emerald-500' },
    { key: 'business', icon: Store, title: 'Business', desc: 'Website, contact, location and social profiles.', color: 'bg-primary' },
    { key: 'connectivity', icon: MessageCircle, title: 'Connectivity', desc: 'WhatsApp, phone, SMS, email and Wi-Fi.', color: 'bg-indigo-500' },
    { key: 'content', icon: Type, title: 'Content', desc: 'Text, custom data and file uploads.', color: 'bg-blue-500' },
    { key: 'marketing', icon: CalendarDays, title: 'Marketing', desc: 'Events, social links and promotional codes.', color: 'bg-purple-500' },
  ];

  return (
    <section id="generator" className="py-8 sm:py-12">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-border/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Percentage Steps */}
          <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              {steps.map((s, i) => {
                const isActive = step === i + 1;
                const isCompleted = step > i + 1;
                return (
                  <div key={s.pct} className="flex items-center gap-2 flex-1">
                    <button
                      onClick={() => {
                        if (isCompleted) {
                          if (i === 0) { setStep(1); setCategory(null); setShowResult(false); }
                          else if (i === 1) { setStep(2); setShowTypeModal(category); setShowResult(false); }
                          else if (i === 2) { setStep(3); setShowResult(false); }
                        }
                      }}
                      disabled={!isCompleted && !isActive}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 flex-1 ${
                        isActive ? 'bg-accent/10 border border-accent/30' :
                        isCompleted ? 'bg-surface hover:bg-surface/80 cursor-pointer border border-border/60' :
                        'opacity-40 border border-transparent'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                        isActive ? 'bg-accent text-white' :
                        isCompleted ? 'bg-accent/15 text-accent' : 'bg-border/50 text-text-muted'
                      }`}>
                        {isCompleted ? '✓' : `${s.pct}%`}
                      </span>
                      <span className={`text-[12px] font-medium hidden sm:block ${
                        isActive ? 'text-accent' : isCompleted ? 'text-text-dark' : 'text-text-muted'
                      }`}>{s.label}</span>
                    </button>
                    {i < steps.length - 1 && (
                      <ChevronRight size={14} className="text-text-muted/30 flex-shrink-0 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 sm:p-5">
            {/* Step 1: Category */}
            {step === 1 && (
              <div className="space-y-3">
                <p className="text-[13px] text-text-muted text-center">Select a category to get started.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryCards.map(cat => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.title}
                        onClick={() => handleCategoryClick(cat.key)}
                        className="group bg-white rounded-2xl border border-border p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-accent/20 transition-all duration-300 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                            <Icon size={22} className="text-white" />
                          </div>
                          <div>
                            <h3 className="text-[15px] font-semibold text-text-dark">{cat.title}</h3>
                            <p className="text-[13px] text-text-muted mt-0.5">{cat.desc}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setStep(2); setShowTypeModal(category); }}
                    className="text-text-muted hover:text-text-dark transition-colors"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div>
                    <p className="text-[13px] font-semibold text-text-dark">
                      {QR_TYPES.find(t => t.id === qrType)?.label || qrType}
                    </p>
                    <p className="text-[11px] text-text-muted">Fill in the details below</p>
                  </div>
                </div>
                <QRForms type={qrType} data={data} onChange={setData} />
                <button
                  onClick={handleGenerate}
                  disabled={!encoded}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-[13px] font-semibold text-white bg-accent hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl transition-all duration-200 shadow-[0_2px_8px_rgba(22,128,92,0.25)] hover:shadow-[0_4px_16px_rgba(22,128,92,0.35)] active:scale-[0.98]"
                >
                  <Sparkles size={16} /> Generate QR Code
                </button>
              </div>
            )}

            {/* Loading */}
            {step === 4 && !showResult && (
              <div className="flex flex-col items-center justify-center py-16 sm:py-20">
                <div className="qr-loader mb-6">
                  <div className="qr-loader-ring" />
                  <div className="qr-loader-icon">
                    <QrCode size={32} strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-sm font-medium text-text-dark mb-1">Generating your QR code</p>
                <p className="text-[12px] text-text-muted">Almost there...</p>
                <div className="flex gap-1.5 mt-4">
                  <span className="qr-dot qr-dot-1" />
                  <span className="qr-dot qr-dot-2" />
                  <span className="qr-dot qr-dot-3" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Type Selector Modal */}
      {showTypeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowTypeModal(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
            <button onClick={() => setShowTypeModal(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface text-text-muted hover:text-text-dark transition-colors">
              <X size={18} />
            </button>
            <h3 className="text-[18px] font-bold text-text-dark mb-1 pr-10">
              {showTypeModal === 'payments' ? 'Payment Types' : 'Business Types'}
            </h3>
            <p className="text-[13px] text-text-muted mb-5">
              {showTypeModal === 'payments' ? 'Choose a payment method to create a QR code for.' : 'Choose a business type to create a QR code for.'}
            </p>
            <div className="space-y-2">
              {(showTypeModal === 'payments' ? paymentTypes : businessTypes).map(t => {
                const Icon = iconMap[t.icon] || Globe;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectCategoryType(t.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent/30 hover:bg-surface hover:shadow-sm transition-all duration-200 text-left group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-text-dark leading-tight">{t.label}</p>
                      <p className="text-[12px] text-text-muted leading-tight mt-0.5">{t.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Floating Result Modal */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleBackToDetails} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
            <button onClick={handleBackToDetails} className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface text-text-muted hover:text-text-dark transition-colors">
              <X size={18} />
            </button>

            <div className="text-center mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-semibold">
                <Sparkles size={10} /> Ready to scan
              </span>
            </div>

            <div ref={svgRef} className="flex items-center justify-center p-6 bg-white rounded-2xl border border-border/60 mb-5 qr-fade-in">
              <QRCodeSVG
                value={encoded}
                size={config.size}
                fgColor={config.foreground}
                bgColor={config.background}
                level={config.level}
                marginSize={config.margin}
                imageSettings={config.logo ? {
                  src: config.logo,
                  height: Math.round(config.size * 0.2),
                  width: Math.round(config.size * 0.2),
                  excavate: true,
                } : undefined}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <button onClick={handleDownloadPNG} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-accent text-white hover:bg-accent-dark transition-all duration-200 shadow-sm hover:shadow-md">
                <ArrowDownToLine size={18} />
                <span className="text-[11px] font-semibold">PNG</span>
              </button>
              <button onClick={handleDownloadSVG} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-accent/8 text-accent hover:bg-accent/15 border border-accent/20 transition-all duration-200">
                <ArrowDownToLine size={18} />
                <span className="text-[11px] font-semibold">SVG</span>
              </button>
              <button onClick={handlePrint} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-surface text-text-dark hover:bg-surface/80 border border-border transition-all duration-200">
                <Printer size={18} />
                <span className="text-[11px] font-semibold">Print</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => { handleBackToDetails(); setTimeout(() => setShowCustomize(true), 100); }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-border hover:border-accent/30 hover:bg-surface transition-all duration-200"
              >
                <Palette size={16} className="text-text-muted" />
                <span className="text-[11px] font-medium text-text-muted">Customize</span>
              </button>
              <button
                onClick={() => { navigator.share?.({ title: 'QR Code', text: 'Check out this QR code!' }).catch(() => {}); }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-border hover:border-accent/30 hover:bg-surface transition-all duration-200"
              >
                <Share size={16} className="text-text-muted" />
                <span className="text-[11px] font-medium text-text-muted">Share</span>
              </button>
              <button
                onClick={handleCreateAnother}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-border hover:border-accent/30 hover:bg-surface transition-all duration-200"
              >
                <RotateCcw size={16} className="text-text-muted" />
                <span className="text-[11px] font-medium text-text-muted">New QR</span>
              </button>
            </div>

            <button
              onClick={handleBackToDetails}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-[12px] font-medium text-text-muted bg-surface hover:bg-surface/80 border border-border/80 hover:border-accent/30 rounded-xl transition-all duration-150"
            >
              <ArrowLeft size={12} /> Back to details
            </button>
          </div>
        </div>
      )}

      {/* Floating Customize Modal */}
      {showCustomize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCustomize(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowCustomize(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface text-text-muted hover:text-text-dark transition-colors">
              <X size={18} />
            </button>
            <h3 className="text-[16px] font-bold text-text-dark mb-1">Customize QR Code</h3>
            <p className="text-[12px] text-text-muted mb-4">Adjust colors, size and more.</p>
            <QRPreview value={config} onChange={setConfig} />
            <div className="mt-4 pt-4 border-t border-border/60">
              <button
                onClick={() => setShowCustomize(false)}
                className="w-full px-4 py-2.5 text-[13px] font-semibold text-white bg-accent hover:bg-accent-dark rounded-xl transition-all duration-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// --- Inline Sub-Components ---

function QRForms({ type, data, onChange }: { type: QRType; data: Record<string, unknown>; onChange: (d: Record<string, unknown>) => void }) {
  const set = (k: string, v: unknown) => onChange({ ...data, [k]: v });

  const handleFileRead = (file: File, uploadType: 'image' | 'pdf' | 'file') => {
    if (file.size > 10 * 1024 * 1024) { alert('File must be under 10MB'); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange({ uploadType, dataUrl: e.target?.result as string, fileName: file.name, mimeType: file.type });
    };
    reader.readAsDataURL(file);
  };

  const handleUrlPaste = (url: string) => {
    if (url.trim()) {
      onChange({ uploadType: 'file', dataUrl: url.trim(), fileName: url.trim(), mimeType: 'text/uri-list' });
    }
  };

  switch (type) {
    case 'website': {
      const d = data as { url: string };
      return (
        <div>
          <label className="block text-[12px] font-semibold text-text-dark mb-1.5">Website URL</label>
          <input value={d.url} onChange={e => set('url', e.target.value)} placeholder="example.com" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all" />
        </div>
      );
    }
    case 'text': {
      const d = data as { text: string };
      return (
        <div>
          <label className="block text-[12px] font-semibold text-text-dark mb-1.5">Text Content</label>
          <textarea value={d.text} onChange={e => set('text', e.target.value)} placeholder="Enter any text..." rows={4} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all resize-none" />
        </div>
      );
    }
    case 'wifi': {
      const d = data as { ssid: string; password: string; security: string; hidden: boolean };
      return (
        <div className="space-y-3">
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Network Name (SSID)</label><input value={d.ssid} onChange={e => set('ssid', e.target.value)} placeholder="My Wi-Fi" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Password</label><input value={d.password} onChange={e => set('password', e.target.value)} type="password" placeholder="Password" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Security</label><select value={d.security} onChange={e => set('security', e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"><option value="WPA">WPA/WPA2</option><option value="WEP">WEP</option><option value="nopass">None</option></select></div>
            <div className="flex items-end pb-1"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={d.hidden} onChange={e => set('hidden', e.target.checked)} className="w-4 h-4 rounded border-border text-accent focus:ring-accent" /><span className="text-[12px] font-medium text-text-dark">Hidden network</span></label></div>
          </div>
        </div>
      );
    }
    case 'whatsapp': {
      const d = data as { phone: string; message: string; countryCode: string };
      return (
        <div className="space-y-3">
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Phone Number</label><div className="flex gap-2"><select value={d.countryCode} onChange={e => set('countryCode', e.target.value)} className="w-24 px-2 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"><option value="+254">+254</option><option value="+255">+255</option><option value="+256">+256</option></select><input value={d.phone} onChange={e => set('phone', e.target.value)} placeholder="712 345 678" className="flex-1 px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all" /></div></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Message <span className="text-text-muted font-normal">(optional)</span></label><textarea value={d.message} onChange={e => set('message', e.target.value)} placeholder="Hello!" rows={3} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all resize-none" /></div>
        </div>
      );
    }
    case 'phone': {
      const d = data as { phone: string };
      return (
        <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Phone Number</label><input value={d.phone} onChange={e => set('phone', e.target.value)} placeholder="712 345 678" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all" /></div>
      );
    }
    case 'sms': {
      const d = data as { phone: string; message: string };
      return (
        <div className="space-y-3">
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Phone Number</label><input value={d.phone} onChange={e => set('phone', e.target.value)} placeholder="712 345 678" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Message</label><textarea value={d.message} onChange={e => set('message', e.target.value)} placeholder="Your message..." rows={3} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all resize-none" /></div>
        </div>
      );
    }
    case 'email': {
      const d = data as { email: string; subject: string; message: string };
      return (
        <div className="space-y-3">
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Email Address</label><input value={d.email} onChange={e => set('email', e.target.value)} type="email" placeholder="name@example.com" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Subject <span className="text-text-muted font-normal">(optional)</span></label><input value={d.subject} onChange={e => set('subject', e.target.value)} placeholder="Subject" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Message <span className="text-text-muted font-normal">(optional)</span></label><textarea value={d.message} onChange={e => set('message', e.target.value)} placeholder="Your message..." rows={3} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:bg-white transition-all resize-none" /></div>
        </div>
      );
    }
    case 'contact': {
      const d = data as { firstName: string; lastName: string; organization: string; phone: string; email: string; website: string; address: string };
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">First Name</label><input value={d.firstName} onChange={e => set('firstName', e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all" /></div>
            <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Last Name</label><input value={d.lastName} onChange={e => set('lastName', e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all" /></div>
          </div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Organization <span className="text-text-muted font-normal">(optional)</span></label><input value={d.organization} onChange={e => set('organization', e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Phone <span className="text-text-muted font-normal">(optional)</span></label><input value={d.phone} onChange={e => set('phone', e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Email <span className="text-text-muted font-normal">(optional)</span></label><input value={d.email} onChange={e => set('email', e.target.value)} type="email" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Website <span className="text-text-muted font-normal">(optional)</span></label><input value={d.website} onChange={e => set('website', e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Address <span className="text-text-muted font-normal">(optional)</span></label><input value={d.address} onChange={e => set('address', e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all" /></div>
        </div>
      );
    }
    case 'location': {
      const d = data as { latitude: string; longitude: string; address: string };
      return (
        <div className="space-y-3">
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Address / Place Name</label><input value={d.address} onChange={e => set('address', e.target.value)} placeholder="Nairobi, Kenya" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Latitude <span className="text-text-muted font-normal">(optional)</span></label><input value={d.latitude} onChange={e => set('latitude', e.target.value)} placeholder="-1.2921" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
            <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Longitude <span className="text-text-muted font-normal">(optional)</span></label><input value={d.longitude} onChange={e => set('longitude', e.target.value)} placeholder="36.8219" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          </div>
        </div>
      );
    }
    case 'event': {
      const d = data as { name: string; location: string; startDate: string; endDate: string; description: string };
      return (
        <div className="space-y-3">
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Event Name</label><input value={d.name} onChange={e => set('name', e.target.value)} placeholder="Tech Meetup Nairobi" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Location <span className="text-text-muted font-normal">(optional)</span></label><input value={d.location} onChange={e => set('location', e.target.value)} placeholder="KICC, Nairobi" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Start</label><input type="datetime-local" value={d.startDate} onChange={e => set('startDate', e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all" /></div>
            <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">End <span className="text-text-muted font-normal">(optional)</span></label><input type="datetime-local" value={d.endDate} onChange={e => set('endDate', e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all" /></div>
          </div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Description <span className="text-text-muted font-normal">(optional)</span></label><textarea value={d.description} onChange={e => set('description', e.target.value)} rows={3} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all resize-none" /></div>
        </div>
      );
    }
    case 'social': {
      const d = data as { url: string };
      return (
        <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Social Profile URL</label><input value={d.url} onChange={e => set('url', e.target.value)} placeholder="https://twitter.com/username" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
      );
    }
    case 'custom': {
      const d = data as { text: string };
      return (
        <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Custom Content</label><textarea value={d.text} onChange={e => set('text', e.target.value)} placeholder="Enter any text, data, or URL..." rows={5} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all resize-none font-mono text-[12px]" /></div>
      );
    }
    case 'upload': {
      const d = data as { uploadType: string; dataUrl: string; fileName: string };
      return (
        <div className="space-y-3">
          <p className="text-[11px] text-text-muted flex items-center gap-1"><Lock size={10} /> Your file stays on your device — nothing is uploaded to any server.</p>
          {d.dataUrl ? (
            <div className="p-3 bg-surface rounded-xl border border-border/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  {d.uploadType === 'image' ? <FileImage size={14} className="text-accent flex-shrink-0" /> : d.uploadType === 'pdf' ? <FileText size={14} className="text-red-500 flex-shrink-0" /> : <FileIcon size={14} className="text-blue-500 flex-shrink-0" />}
                  <span className="text-[12px] font-medium text-text-dark truncate">{d.fileName}</span>
                </div>
                <button onClick={() => onChange({ uploadType: 'image', dataUrl: '', fileName: '', mimeType: '' })} className="p-1 rounded hover:bg-white text-text-muted hover:text-red-500 transition-colors flex-shrink-0"><X size={12} /></button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2">
                <label className="flex flex-col items-center gap-2 p-4 bg-surface/50 border border-dashed border-border rounded-xl cursor-pointer hover:bg-surface hover:border-accent/30 transition-all">
                  <FileImage size={20} className="text-emerald-500" /><span className="text-[11px] font-medium text-text-dark">Image</span>
                  <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) handleFileRead(f, 'image'); }} className="sr-only" />
                </label>
                <label className="flex flex-col items-center gap-2 p-4 bg-surface/50 border border-dashed border-border rounded-xl cursor-pointer hover:bg-surface hover:border-accent/30 transition-all">
                  <FileText size={20} className="text-red-500" /><span className="text-[11px] font-medium text-text-dark">PDF</span>
                  <input type="file" accept=".pdf" onChange={e => { const f = e.target.files?.[0]; if (f) handleFileRead(f, 'pdf'); }} className="sr-only" />
                </label>
                <label className="flex flex-col items-center gap-2 p-4 bg-surface/50 border border-dashed border-border rounded-xl cursor-pointer hover:bg-surface hover:border-accent/30 transition-all">
                  <FileIcon size={20} className="text-blue-500" /><span className="text-[11px] font-medium text-text-dark">File</span>
                  <input type="file" onChange={e => { const f = e.target.files?.[0]; if (f) handleFileRead(f, 'file'); }} className="sr-only" />
                </label>
              </div>
              <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/60" /></div><div className="relative flex justify-center"><span className="bg-white px-3 text-[11px] text-text-muted">or paste a public URL</span></div></div>
              <input type="url" placeholder="https://example.com/document.pdf" onChange={e => handleUrlPaste(e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" />
            </>
          )}
        </div>
      );
    }
    case 'mpesa':
    case 'mpesa-till': {
      const d = data as { businessName: string; tillNumber: string; amount: string; reference: string };
      return (
        <div className="space-y-3">
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Business Name <span className="text-text-muted font-normal">(optional)</span></label><input value={d.businessName} onChange={e => set('businessName', e.target.value)} placeholder="Business Name" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Till / Buy Goods Number</label><input value={d.tillNumber} onChange={e => set('tillNumber', e.target.value)} placeholder="123456" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Amount (KES) <span className="text-text-muted font-normal">(optional)</span></label><input value={d.amount} onChange={e => set('amount', e.target.value)} type="number" placeholder="0" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Reference <span className="text-text-muted font-normal">(optional)</span></label><input value={d.reference} onChange={e => set('reference', e.target.value)} placeholder="Invoice #123" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
        </div>
      );
    }
    case 'mpesa-paybill': {
      const d = data as { businessName: string; payBillNumber: string; accountNumber: string; amount: string; reference: string };
      return (
        <div className="space-y-3">
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Business Name <span className="text-text-muted font-normal">(optional)</span></label><input value={d.businessName} onChange={e => set('businessName', e.target.value)} placeholder="Business Name" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">PayBill Number</label><input value={d.payBillNumber} onChange={e => set('payBillNumber', e.target.value)} placeholder="123456" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Account Number <span className="text-text-muted font-normal">(optional)</span></label><input value={d.accountNumber} onChange={e => set('accountNumber', e.target.value)} placeholder="Account Number" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Amount (KES) <span className="text-text-muted font-normal">(optional)</span></label><input value={d.amount} onChange={e => set('amount', e.target.value)} type="number" placeholder="0" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Reference <span className="text-text-muted font-normal">(optional)</span></label><input value={d.reference} onChange={e => set('reference', e.target.value)} placeholder="Invoice #123" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
        </div>
      );
    }
    case 'mpesa-send': {
      const d = data as { phoneNumber: string; amount: string; reference: string };
      return (
        <div className="space-y-3">
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Recipient Phone Number</label><input value={d.phoneNumber} onChange={e => set('phoneNumber', e.target.value)} placeholder="712 345 678" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Amount (KES) <span className="text-text-muted font-normal">(optional)</span></label><input value={d.amount} onChange={e => set('amount', e.target.value)} type="number" placeholder="0" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Reference <span className="text-text-muted font-normal">(optional)</span></label><input value={d.reference} onChange={e => set('reference', e.target.value)} placeholder="Invoice #123" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
        </div>
      );
    }
    case 'bank-payment': {
      const d = data as { bankName: string; accountName: string; accountNumber: string; branch: string; amount: string; reference: string };
      return (
        <div className="space-y-3">
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Bank Name</label><select value={d.bankName} onChange={e => set('bankName', e.target.value)} className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"><option value="">Select bank</option><option>KCB</option><option>Equity</option><option>Co-operative Bank</option><option>ABSA</option><option>Diamond Trust Bank</option><option>Standard Chartered</option><option>National Bank</option><option>I&M Bank</option><option>Faulu Kenya</option><option>Housing Finance</option></select></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Account Name</label><input value={d.accountName} onChange={e => set('accountName', e.target.value)} placeholder="Account Name" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Account Number</label><input value={d.accountNumber} onChange={e => set('accountNumber', e.target.value)} placeholder="1234567890" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Branch <span className="text-text-muted font-normal">(optional)</span></label><input value={d.branch} onChange={e => set('branch', e.target.value)} placeholder="Branch name" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Amount (KES) <span className="text-text-muted font-normal">(optional)</span></label><input value={d.amount} onChange={e => set('amount', e.target.value)} type="number" placeholder="0" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Reference <span className="text-text-muted font-normal">(optional)</span></label><input value={d.reference} onChange={e => set('reference', e.target.value)} placeholder="Invoice #123" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
        </div>
      );
    }
    case 'payment-link': {
      const d = data as { businessName: string; paymentUrl: string; description: string };
      return (
        <div className="space-y-3">
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Business Name <span className="text-text-muted font-normal">(optional)</span></label><input value={d.businessName} onChange={e => set('businessName', e.target.value)} placeholder="Business Name" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Payment URL</label><input value={d.paymentUrl} onChange={e => set('paymentUrl', e.target.value)} placeholder="https://pay.example.com/store" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all" /></div>
          <div><label className="block text-[12px] font-semibold text-text-dark mb-1.5">Description <span className="text-text-muted font-normal">(optional)</span></label><textarea value={d.description} onChange={e => set('description', e.target.value)} rows={2} placeholder="Brief description" className="w-full px-3.5 py-2.5 text-[13px] bg-surface/50 border border-border/80 rounded-xl text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-all resize-none" /></div>
        </div>
      );
    }
    default:
      return <p className="text-[13px] text-text-muted">Select a QR code type to get started.</p>;
  }
}

function QRPreview({ value, onChange }: { value: QRConfig; onChange: (c: QRConfig) => void }) {
  const [logoName, setLogoName] = useState<string | null>(null);
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Logo must be under 2MB'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => { onChange({ ...value, logo: ev.target?.result as string }); setLogoName(file.name); };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2"><Palette size={14} className="text-text-muted" /><span className="text-[12px] font-semibold text-text-dark">Appearance</span></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-[11px] text-text-muted mb-1">Foreground</label><div className="flex items-center gap-2"><input type="color" value={value.foreground} onChange={e => onChange({ ...value, foreground: e.target.value })} className="w-8 h-8 rounded-lg border border-border cursor-pointer" /><span className="text-[11px] font-mono text-text-muted">{value.foreground}</span></div></div>
        <div><label className="block text-[11px] text-text-muted mb-1">Background</label><div className="flex items-center gap-2"><input type="color" value={value.background} onChange={e => onChange({ ...value, background: e.target.value })} className="w-8 h-8 rounded-lg border border-border cursor-pointer" /><span className="text-[11px] font-mono text-text-muted">{value.background}</span></div></div>
      </div>
      <div><label className="block text-[11px] text-text-muted mb-1">Size <span className="font-semibold text-accent">{value.size}px</span></label><input type="range" min={128} max={512} step={16} value={value.size} onChange={e => onChange({ ...value, size: Number(e.target.value) })} className="w-full accent-accent" /></div>
      <div><label className="block text-[11px] text-text-muted mb-1">Margin <span className="font-semibold text-accent">{value.margin}</span></label><input type="range" min={0} max={10} step={1} value={value.margin} onChange={e => onChange({ ...value, margin: Number(e.target.value) })} className="w-full accent-accent" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-[11px] text-text-muted mb-1">Error Correction</label><select value={value.level} onChange={e => onChange({ ...value, level: e.target.value as QRConfig['level'] })} className="w-full px-3 py-2 text-[12px] bg-surface/50 border border-border/80 rounded-lg text-text-dark focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"><option value="L">Low</option><option value="M">Medium</option><option value="Q">Quartile</option><option value="H">High</option></select></div>
        <div><label className="block text-[11px] text-text-muted mb-1">Center Logo</label><div className="flex items-center gap-1.5"><label className="flex-1 flex items-center justify-center gap-1 px-2 py-2 text-[11px] text-text-muted bg-white border border-dashed border-border/80 rounded-lg cursor-pointer hover:bg-surface hover:border-accent/30 transition-all"><Upload size={10} />{logoName || 'Upload'}<input type="file" accept="image/*" onChange={handleLogoUpload} className="sr-only" /></label>{value.logo && <button onClick={() => { onChange({ ...value, logo: null }); setLogoName(null); }} className="p-1.5 text-text-muted hover:text-red-500 transition-colors rounded hover:bg-red-50"><X size={10} /></button>}</div></div>
      </div>
    </div>
  );
}
