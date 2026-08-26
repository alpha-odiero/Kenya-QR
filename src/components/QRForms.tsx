import type { QRType } from '../types';

interface Props {
  type: QRType;
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
}

const cls = "w-full px-3.5 py-2.5 text-[13px] border border-border/80 rounded-xl bg-white text-text-dark placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all";

export default function QRForms({ type, data, onChange }: Props) {
  const u = (f: string, v: string | boolean) => onChange({ ...data, [f]: v });

  switch (type) {
    case 'website':
      return (
        <div>
          <label htmlFor="qr-url" className="block text-[12px] font-medium text-text-dark mb-1.5">Website URL</label>
          <input id="qr-url" type="url" placeholder="https://example.com" value={(data.url as string) || ''} onChange={(e) => u('url', e.target.value)} className={cls} />
        </div>
      );

    case 'text':
      return (
        <div>
          <label htmlFor="qr-text" className="block text-[12px] font-medium text-text-dark mb-1.5">Text content</label>
          <textarea id="qr-text" placeholder="Enter any text..." value={(data.text as string) || ''} onChange={(e) => u('text', e.target.value)} rows={3} className={`${cls} resize-none`} />
        </div>
      );

    case 'wifi':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="wifi-ssid" className="block text-[12px] font-medium text-text-dark mb-1.5">Network name</label>
            <input id="wifi-ssid" type="text" placeholder="My WiFi Network" value={(data.ssid as string) || ''} onChange={(e) => u('ssid', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="wifi-password" className="block text-[12px] font-medium text-text-dark mb-1.5">Password</label>
            <input id="wifi-password" type="text" placeholder="Password" value={(data.password as string) || ''} onChange={(e) => u('password', e.target.value)} className={cls} />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="wifi-security" className="block text-[12px] font-medium text-text-dark mb-1.5">Security</label>
              <select id="wifi-security" value={(data.security as string) || 'WPA'} onChange={(e) => u('security', e.target.value)} className={`${cls} appearance-none`}>
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Open</option>
              </select>
            </div>
            <div className="flex items-end pb-0.5">
              <label className="flex items-center gap-1.5 cursor-pointer py-1.5">
                <input type="checkbox" checked={(data.hidden as boolean) || false} onChange={(e) => u('hidden', e.target.checked)} className="w-3.5 h-3.5 rounded accent-accent" />
                <span className="text-[11px] text-text-muted">Hidden</span>
              </label>
            </div>
          </div>
        </div>
      );

    case 'whatsapp':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="wa-phone" className="block text-[12px] font-medium text-text-dark mb-1.5">Phone number</label>
            <div className="flex gap-2">
              <select value={(data.countryCode as string) || '+254'} onChange={(e) => u('countryCode', e.target.value)} className="w-20 px-2 py-2.5 text-[13px] border border-border/80 rounded-xl bg-white text-text-dark focus:outline-none focus:border-accent transition-all appearance-none" aria-label="Country code">
                <option value="+254">+254</option>
                <option value="+255">+255</option>
                <option value="+256">+256</option>
                <option value="+211">+211</option>
                <option value="+250">+250</option>
                <option value="+257">+257</option>
                <option value="+253">+253</option>
                <option value="+260">+260</option>
                <option value="+263">+263</option>
                <option value="+27">+27</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
              </select>
              <input id="wa-phone" type="tel" placeholder="712 345 678" value={(data.phone as string) || ''} onChange={(e) => u('phone', e.target.value)} className={`${cls} flex-1`} />
            </div>
          </div>
          <div>
            <label htmlFor="wa-message" className="block text-[12px] font-medium text-text-dark mb-1.5">Message <span className="text-text-muted font-normal">(optional)</span></label>
            <textarea id="wa-message" placeholder="Hello, I'd like to..." value={(data.message as string) || ''} onChange={(e) => u('message', e.target.value)} rows={2} className={`${cls} resize-none`} />
          </div>
        </div>
      );

    case 'phone':
      return (
        <div>
          <label htmlFor="tel-phone" className="block text-[12px] font-medium text-text-dark mb-1.5">Phone number</label>
          <input id="tel-phone" type="tel" placeholder="712 345 678" value={(data.phone as string) || ''} onChange={(e) => u('phone', e.target.value)} className={cls} />
        </div>
      );

    case 'sms':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="sms-phone" className="block text-[12px] font-medium text-text-dark mb-1.5">Phone number</label>
            <input id="sms-phone" type="tel" placeholder="712 345 678" value={(data.phone as string) || ''} onChange={(e) => u('phone', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="sms-message" className="block text-[12px] font-medium text-text-dark mb-1.5">Message <span className="text-text-muted font-normal">(optional)</span></label>
            <textarea id="sms-message" placeholder="Your message..." value={(data.message as string) || ''} onChange={(e) => u('message', e.target.value)} rows={2} className={`${cls} resize-none`} />
          </div>
        </div>
      );

    case 'email':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="email-addr" className="block text-[12px] font-medium text-text-dark mb-1.5">Email address</label>
            <input id="email-addr" type="email" placeholder="name@example.com" value={(data.email as string) || ''} onChange={(e) => u('email', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="email-subject" className="block text-[12px] font-medium text-text-dark mb-1.5">Subject <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="email-subject" type="text" placeholder="Subject line" value={(data.subject as string) || ''} onChange={(e) => u('subject', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="email-body" className="block text-[12px] font-medium text-text-dark mb-1.5">Message <span className="text-text-muted font-normal">(optional)</span></label>
            <textarea id="email-body" placeholder="Email content..." value={(data.message as string) || ''} onChange={(e) => u('message', e.target.value)} rows={2} className={`${cls} resize-none`} />
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 min-w-0">
              <label htmlFor="contact-first" className="block text-[12px] font-medium text-text-dark mb-1.5">First name</label>
              <input id="contact-first" type="text" placeholder="John" value={(data.firstName as string) || ''} onChange={(e) => u('firstName', e.target.value)} className={cls} />
            </div>
            <div className="flex-1 min-w-0">
              <label htmlFor="contact-last" className="block text-[12px] font-medium text-text-dark mb-1.5">Last name</label>
              <input id="contact-last" type="text" placeholder="Doe" value={(data.lastName as string) || ''} onChange={(e) => u('lastName', e.target.value)} className={cls} />
            </div>
          </div>
          <div>
            <label htmlFor="contact-org" className="block text-[12px] font-medium text-text-dark mb-1.5">Organization <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="contact-org" type="text" placeholder="Company name" value={(data.organization as string) || ''} onChange={(e) => u('organization', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="contact-phone" className="block text-[12px] font-medium text-text-dark mb-1.5">Phone <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="contact-phone" type="tel" placeholder="+254 712 345 678" value={(data.phone as string) || ''} onChange={(e) => u('phone', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-[12px] font-medium text-text-dark mb-1.5">Email <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="contact-email" type="email" placeholder="john@example.com" value={(data.email as string) || ''} onChange={(e) => u('email', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="contact-website" className="block text-[12px] font-medium text-text-dark mb-1.5">Website <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="contact-website" type="url" placeholder="https://example.com" value={(data.website as string) || ''} onChange={(e) => u('website', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="contact-address" className="block text-[12px] font-medium text-text-dark mb-1.5">Address <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="contact-address" type="text" placeholder="Nairobi, Kenya" value={(data.address as string) || ''} onChange={(e) => u('address', e.target.value)} className={cls} />
          </div>
        </div>
      );

    case 'location':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="loc-address" className="block text-[12px] font-medium text-text-dark mb-1.5">Address or place name</label>
            <input id="loc-address" type="text" placeholder="Nairobi, Kenya" value={(data.address as string) || ''} onChange={(e) => u('address', e.target.value)} className={cls} />
          </div>
          <p className="text-[10px] text-text-muted">Or enter coordinates</p>
          <div className="flex gap-2">
            <div className="flex-1 min-w-0">
              <label htmlFor="loc-lat" className="block text-[12px] font-medium text-text-dark mb-1.5">Latitude</label>
              <input id="loc-lat" type="text" placeholder="-1.2921" value={(data.latitude as string) || ''} onChange={(e) => u('latitude', e.target.value)} className={cls} />
            </div>
            <div className="flex-1 min-w-0">
              <label htmlFor="loc-lng" className="block text-[12px] font-medium text-text-dark mb-1.5">Longitude</label>
              <input id="loc-lng" type="text" placeholder="36.8219" value={(data.longitude as string) || ''} onChange={(e) => u('longitude', e.target.value)} className={cls} />
            </div>
          </div>
        </div>
      );

    case 'event':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="evt-name" className="block text-[12px] font-medium text-text-dark mb-1.5">Event name</label>
            <input id="evt-name" type="text" placeholder="Annual Conference" value={(data.name as string) || ''} onChange={(e) => u('name', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="evt-location" className="block text-[12px] font-medium text-text-dark mb-1.5">Location <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="evt-location" type="text" placeholder="KICC, Nairobi" value={(data.location as string) || ''} onChange={(e) => u('location', e.target.value)} className={cls} />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 min-w-0">
              <label htmlFor="evt-start" className="block text-[12px] font-medium text-text-dark mb-1.5">Start</label>
              <input id="evt-start" type="datetime-local" value={(data.startDate as string) || ''} onChange={(e) => u('startDate', e.target.value)} className={cls} />
            </div>
            <div className="flex-1 min-w-0">
              <label htmlFor="evt-end" className="block text-[12px] font-medium text-text-dark mb-1.5">End</label>
              <input id="evt-end" type="datetime-local" value={(data.endDate as string) || ''} onChange={(e) => u('endDate', e.target.value)} className={cls} />
            </div>
          </div>
          <div>
            <label htmlFor="evt-desc" className="block text-[12px] font-medium text-text-dark mb-1.5">Description <span className="text-text-muted font-normal">(optional)</span></label>
            <textarea id="evt-desc" placeholder="Event description..." value={(data.description as string) || ''} onChange={(e) => u('description', e.target.value)} rows={2} className={`${cls} resize-none`} />
          </div>
        </div>
      );

    case 'social':
      return (
        <div>
          <label htmlFor="social-url" className="block text-[12px] font-medium text-text-dark mb-1.5">Profile URL</label>
          <input id="social-url" type="url" placeholder="https://twitter.com/username" value={(data.url as string) || ''} onChange={(e) => u('url', e.target.value)} className={cls} />
        </div>
      );

    case 'custom':
      return (
        <div>
          <label htmlFor="custom-text" className="block text-[12px] font-medium text-text-dark mb-1.5">Content</label>
          <textarea id="custom-text" placeholder="Enter any text, URL, or data..." value={(data.text as string) || ''} onChange={(e) => u('text', e.target.value)} rows={4} className={`${cls} resize-none font-mono text-[12px]`} />
        </div>
      );

    case 'mpesa':
    case 'mpesa-till':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="mpesa-business" className="block text-[12px] font-medium text-text-dark mb-1.5">Business name</label>
            <input id="mpesa-business" type="text" placeholder="e.g. Mama Njeri's Shop" value={(data.businessName as string) || ''} onChange={(e) => u('businessName', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="mpesa-till" className="block text-[12px] font-medium text-text-dark mb-1.5">Till / Buy Goods number</label>
            <input id="mpesa-till" type="text" placeholder="e.g. 123456" value={(data.tillNumber as string) || ''} onChange={(e) => u('tillNumber', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="mpesa-amount" className="block text-[12px] font-medium text-text-dark mb-1.5">Amount (KES) <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="mpesa-amount" type="number" placeholder="0.00" value={(data.amount as string) || ''} onChange={(e) => u('amount', e.target.value)} className={cls} min="0" step="0.01" />
          </div>
          <div>
            <label htmlFor="mpesa-ref" className="block text-[12px] font-medium text-text-dark mb-1.5">Payment reference <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="mpesa-ref" type="text" placeholder="e.g. Invoice #001" value={(data.reference as string) || ''} onChange={(e) => u('reference', e.target.value)} className={cls} />
          </div>
        </div>
      );

    case 'mpesa-paybill':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="paybill-business" className="block text-[12px] font-medium text-text-dark mb-1.5">Business name</label>
            <input id="paybill-business" type="text" placeholder="e.g. Kenya Power" value={(data.businessName as string) || ''} onChange={(e) => u('businessName', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="paybill-number" className="block text-[12px] font-medium text-text-dark mb-1.5">PayBill number</label>
            <input id="paybill-number" type="text" placeholder="e.g. 888888" value={(data.payBillNumber as string) || ''} onChange={(e) => u('payBillNumber', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="paybill-account" className="block text-[12px] font-medium text-text-dark mb-1.5">Account number <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="paybill-account" type="text" placeholder="e.g. ACC-12345" value={(data.accountNumber as string) || ''} onChange={(e) => u('accountNumber', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="paybill-amount" className="block text-[12px] font-medium text-text-dark mb-1.5">Amount (KES) <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="paybill-amount" type="number" placeholder="0.00" value={(data.amount as string) || ''} onChange={(e) => u('amount', e.target.value)} className={cls} min="0" step="0.01" />
          </div>
          <div>
            <label htmlFor="paybill-ref" className="block text-[12px] font-medium text-text-dark mb-1.5">Reference <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="paybill-ref" type="text" placeholder="e.g. Invoice #001" value={(data.reference as string) || ''} onChange={(e) => u('reference', e.target.value)} className={cls} />
          </div>
        </div>
      );

    case 'mpesa-send':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="send-phone" className="block text-[12px] font-medium text-text-dark mb-1.5">Recipient phone number</label>
            <input id="send-phone" type="tel" placeholder="712 345 678" value={(data.phoneNumber as string) || ''} onChange={(e) => u('phoneNumber', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="send-amount" className="block text-[12px] font-medium text-text-dark mb-1.5">Amount (KES) <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="send-amount" type="number" placeholder="0.00" value={(data.amount as string) || ''} onChange={(e) => u('amount', e.target.value)} className={cls} min="0" step="0.01" />
          </div>
          <div>
            <label htmlFor="send-ref" className="block text-[12px] font-medium text-text-dark mb-1.5">Reference <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="send-ref" type="text" placeholder="e.g. Lunch money" value={(data.reference as string) || ''} onChange={(e) => u('reference', e.target.value)} className={cls} />
          </div>
        </div>
      );

    case 'bank-payment':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="bank-name" className="block text-[12px] font-medium text-text-dark mb-1.5">Bank name</label>
            <select id="bank-name" value={(data.bankName as string) || ''} onChange={(e) => u('bankName', e.target.value)} className={`${cls} appearance-none`}>
              <option value="">Select a bank</option>
              <option value="KCB">KCB Bank</option>
              <option value="Equity Bank">Equity Bank</option>
              <option value="Co-operative Bank">Co-operative Bank</option>
              <option value="Stanbic Bank">Stanbic Bank</option>
              <option value="Barclays/ABSA">Barclays / ABSA</option>
              <option value="Standard Chartered">Standard Chartered</option>
              <option value="NCBA Bank">NCBA Bank</option>
              <option value="DTB">DTB</option>
              <option value="I&M Bank">I&M Bank</option>
              <option value="Family Bank">Family Bank</option>
              <option value="Housing Finance">Housing Finance</option>
              <option value="Chase Bank">Chase Bank</option>
              <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="bank-account-name" className="block text-[12px] font-medium text-text-dark mb-1.5">Account name</label>
            <input id="bank-account-name" type="text" placeholder="e.g. John Doe Limited" value={(data.accountName as string) || ''} onChange={(e) => u('accountName', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="bank-account-number" className="block text-[12px] font-medium text-text-dark mb-1.5">Account number</label>
            <input id="bank-account-number" type="text" placeholder="e.g. 1234567890" value={(data.accountNumber as string) || ''} onChange={(e) => u('accountNumber', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="bank-branch" className="block text-[12px] font-medium text-text-dark mb-1.5">Branch <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="bank-branch" type="text" placeholder="e.g. Nairobi CBD" value={(data.branch as string) || ''} onChange={(e) => u('branch', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="bank-amount" className="block text-[12px] font-medium text-text-dark mb-1.5">Amount (KES) <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="bank-amount" type="number" placeholder="0.00" value={(data.amount as string) || ''} onChange={(e) => u('amount', e.target.value)} className={cls} min="0" step="0.01" />
          </div>
          <div>
            <label htmlFor="bank-ref" className="block text-[12px] font-medium text-text-dark mb-1.5">Payment reference <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="bank-ref" type="text" placeholder="e.g. Invoice #001" value={(data.reference as string) || ''} onChange={(e) => u('reference', e.target.value)} className={cls} />
          </div>
        </div>
      );

    case 'payment-link':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="pl-business" className="block text-[12px] font-medium text-text-dark mb-1.5">Business name <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="pl-business" type="text" placeholder="e.g. My Shop" value={(data.businessName as string) || ''} onChange={(e) => u('businessName', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="pl-url" className="block text-[12px] font-medium text-text-dark mb-1.5">Payment page URL</label>
            <input id="pl-url" type="url" placeholder="https://pay.example.com/invoice/123" value={(data.paymentUrl as string) || ''} onChange={(e) => u('paymentUrl', e.target.value)} className={cls} />
          </div>
          <div>
            <label htmlFor="pl-desc" className="block text-[12px] font-medium text-text-dark mb-1.5">Description <span className="text-text-muted font-normal">(optional)</span></label>
            <input id="pl-desc" type="text" placeholder="e.g. Pay for order #123" value={(data.description as string) || ''} onChange={(e) => u('description', e.target.value)} className={cls} />
          </div>
        </div>
      );

    default:
      return null;
  }
}
