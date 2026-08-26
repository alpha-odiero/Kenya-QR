import { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import QRGenerator from './components/QRGenerator';
import HowItWorks from './components/HowItWorks';
import QRTypesSection from './components/QRTypesSection';
import Customization from './components/Customization';
import Trust from './components/Trust';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white splash-fade-out">
          <div className="qr-loader mb-6">
            <div className="qr-loader-ring" />
            <div className="qr-loader-icon">
              <QrCode size={36} strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sm font-semibold text-text-dark mb-1">Kenya QR</p>
          <p className="text-[12px] text-text-muted">Loading your QR generator...</p>
          <div className="flex gap-1.5 mt-4">
            <span className="qr-dot qr-dot-1" />
            <span className="qr-dot qr-dot-2" />
            <span className="qr-dot qr-dot-3" />
          </div>
        </div>
      )}
      <Header />
      <main>
        <Hero />
        <QRGenerator />
        <HowItWorks />
        <QRTypesSection />
        <Customization />
        <Trust />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
