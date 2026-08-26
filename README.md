# Kenya QR

A free, fast, and private QR code generator built for Kenya. Create QR codes for M-PESA payments, businesses, websites, menus, Wi-Fi, WhatsApp, contacts, and more — entirely in your browser.

**Live:** [kenyaqr.com](https://kenyaqr.com)

## Features

- **M-PESA QR Codes** — Till/Buy Goods, PayBill, and Send Money
- **Business & Menu QR** — Share menus, store info, and contact details
- **Website & WhatsApp** — Direct links for online presence
- **Wi-Fi QR Codes** — One-tap network sharing
- **Customization** — Colors, size, error correction, center logo
- **Export** — Download as PNG (3x resolution) or SVG
- **Privacy-first** — Everything runs in your browser. No data leaves your device.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Lucide Icons
- qrcode.react

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx        # Sticky nav with mobile hamburger
│   ├── Hero.tsx           # Landing hero section
│   ├── QRTypeSelector.tsx # QR type picker
│   ├── QRForms.tsx        # Input forms for each QR type
│   ├── QRGenerator.tsx    # QR generation logic
│   ├── QRPreview.tsx      # Live QR preview + download
│   ├── QRTypesSection.tsx # All QR types showcase
│   ├── HowItWorks.tsx     # Step-by-step guide
│   ├── Customization.tsx  # QR customization options
│   ├── FAQ.tsx             # Frequently asked questions
│   ├── CTA.tsx            # Call to action
│   ├── Trust.tsx          # Trust signals
│   └── Footer.tsx         # Site footer
├── assets/                # Static images
├── App.tsx
├── main.tsx
└── index.css              # Global styles & Tailwind theme
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run Oxlint |
| `npm run preview` | Preview production build locally |

## License

MIT
