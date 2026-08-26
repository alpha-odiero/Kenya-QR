import type { QRType, QRTypeConfig } from '../types';
import {
  Globe, Type, Wifi, MessageCircle, Phone, MessageSquare, Mail, User,
  MapPin, Calendar, Share2, Code, Smartphone, Store, Receipt, Send,
  Landmark, Link,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  globe: Globe, type: Type, wifi: Wifi, 'message-circle': MessageCircle,
  phone: Phone, 'message-square': MessageSquare, mail: Mail, user: User,
  'map-pin': MapPin, calendar: Calendar, 'share-2': Share2, code: Code,
  smartphone: Smartphone, store: Store, receipt: Receipt, send: Send,
  landmark: Landmark, link: Link,
};

interface Props {
  types: QRTypeConfig[];
  selected: QRType;
  onSelect: (type: QRType) => void;
}

export default function QRTypeSelector({ types, selected, onSelect }: Props) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-3">Choose type</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        {types.map((type) => {
          const Icon = iconMap[type.icon] || Globe;
          const active = selected === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`group flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-center transition-all duration-200 ${
                active
                  ? 'bg-accent text-white border-accent shadow-[0_2px_8px_rgba(22,128,92,0.25)]'
                  : 'bg-white text-text-muted border-border/80 hover:border-accent/30 hover:text-text-dark hover:bg-surface/50'
              }`}
              aria-pressed={active}
              title={type.description}
            >
              <Icon
                size={20}
                strokeWidth={active ? 2.2 : 1.6}
                className={`transition-colors ${active ? 'text-white' : 'text-accent/60 group-hover:text-accent'}`}
              />
              <span className="text-[11px] font-medium leading-tight">{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
