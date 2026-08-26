import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import type { QRConfig } from '../types';

interface Props {
  value: QRConfig;
  onChange: (config: QRConfig) => void;
}

const SIZE_MIN = 128;
const SIZE_MAX = 512;
const MARGIN_MIN = 0;
const MARGIN_MAX = 10;

function sizePercent(v: number) {
  return Math.round(((v - SIZE_MIN) / (SIZE_MAX - SIZE_MIN)) * 100);
}

function marginPercent(v: number) {
  return Math.round(((v - MARGIN_MIN) / (MARGIN_MAX - MARGIN_MIN)) * 100);
}

export default function QRPreview({ value, onChange }: Props) {
  const [logoName, setLogoName] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Logo must be under 2MB'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange({ ...value, logo: ev.target?.result as string });
      setLogoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-3 pt-3 border-t border-border/60 space-y-2.5">
      <p className="text-[11px] font-semibold text-text-dark uppercase tracking-wider">Customize</p>

      <div className="grid grid-cols-[auto_auto_1fr] gap-2.5 items-end">
        <div>
          <label className="block text-[10px] text-text-muted mb-0.5">Color</label>
          <input type="color" value={value.foreground} onChange={(e) => onChange({ ...value, foreground: e.target.value })} aria-label="QR foreground color" />
        </div>
        <div>
          <label className="block text-[10px] text-text-muted mb-0.5">Bg</label>
          <input type="color" value={value.background} onChange={(e) => onChange({ ...value, background: e.target.value })} aria-label="QR background color" />
        </div>
        <div className="min-w-0">
          <label className="block text-[10px] text-text-muted mb-0.5">Size <span className="tabular-nums font-semibold text-accent">{sizePercent(value.size)}%</span></label>
          <input type="range" min={SIZE_MIN} max={SIZE_MAX} step={16} value={value.size} onChange={(e) => onChange({ ...value, size: Number(e.target.value) })} className="w-full" aria-label="QR code size" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="block text-[10px] text-text-muted mb-0.5">Margin <span className="tabular-nums font-semibold text-accent">{marginPercent(value.margin)}%</span></label>
          <input type="range" min={MARGIN_MIN} max={MARGIN_MAX} step={1} value={value.margin} onChange={(e) => onChange({ ...value, margin: Number(e.target.value) })} className="w-full" aria-label="QR code margin" />
        </div>
        <div>
          <label className="block text-[10px] text-text-muted mb-0.5">Error correction</label>
          <select value={value.level} onChange={(e) => onChange({ ...value, level: e.target.value as QRConfig['level'] })} className="w-full px-2 py-1.5 text-[11px] border border-border/80 rounded-lg bg-white text-text-dark focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer" aria-label="Error correction level">
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="Q">Quartile</option>
            <option value="H">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] text-text-muted mb-0.5">Center logo</label>
        <div className="flex items-center gap-1.5">
          <label className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-[10px] text-text-muted bg-white border border-dashed border-border/80 rounded-lg cursor-pointer hover:bg-surface hover:border-accent/30 transition-all">
            <Upload size={10} />
            {logoName || 'Upload'}
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="sr-only" aria-label="Upload center logo" />
          </label>
          {value.logo && (
            <button onClick={() => { onChange({ ...value, logo: null }); setLogoName(null); }} className="p-1 text-text-muted hover:text-red-500 transition-colors rounded hover:bg-red-50" aria-label="Remove logo">
              <X size={10} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
