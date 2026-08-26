import type {
  QRType,
  WebsiteData,
  TextData,
  WifiData,
  WhatsAppData,
  PhoneData,
  SmsData,
  EmailData,
  ContactData,
  LocationData,
  EventData,
  SocialData,
  CustomData,
  UploadData,
  MPesaData,
  MPesaPayBillData,
  MPesaSendData,
  BankPaymentData,
  PaymentLinkData,
} from '../types';

export function encodeQR(type: QRType, data: Record<string, unknown>): string {
  switch (type) {
    case 'website':
      return encodeWebsite(data as unknown as WebsiteData);
    case 'text':
      return encodeText(data as unknown as TextData);
    case 'wifi':
      return encodeWifi(data as unknown as WifiData);
    case 'whatsapp':
      return encodeWhatsApp(data as unknown as WhatsAppData);
    case 'phone':
      return encodePhone(data as unknown as PhoneData);
    case 'sms':
      return encodeSms(data as unknown as SmsData);
    case 'email':
      return encodeEmail(data as unknown as EmailData);
    case 'contact':
      return encodeContact(data as unknown as ContactData);
    case 'location':
      return encodeLocation(data as unknown as LocationData);
    case 'event':
      return encodeEvent(data as unknown as EventData);
    case 'social':
      return encodeSocial(data as unknown as SocialData);
    case 'custom':
      return encodeCustom(data as unknown as CustomData);
    case 'upload':
      return encodeUpload(data as unknown as UploadData);
    case 'mpesa':
      return encodeMPesa(data as unknown as MPesaData);
    case 'mpesa-till':
      return encodeMPesaTill(data as unknown as MPesaData);
    case 'mpesa-paybill':
      return encodeMPesaPayBill(data as unknown as MPesaPayBillData);
    case 'mpesa-send':
      return encodeMPesaSend(data as unknown as MPesaSendData);
    case 'bank-payment':
      return encodeBankPayment(data as unknown as BankPaymentData);
    case 'payment-link':
      return encodePaymentLink(data as unknown as PaymentLinkData);
    default:
      return '';
  }
}

function encodeWebsite(data: WebsiteData): string {
  const url = data.url?.trim() || '';
  if (!url) return '';
  if (url.match(/^https?:\/\//i)) return url;
  return `https://${url}`;
}

function encodeText(data: TextData): string {
  return data.text?.trim() || '';
}

function encodeWifi(data: WifiData): string {
  const ssid = data.ssid?.trim() || '';
  if (!ssid) return '';
  const password = data.password || '';
  const security = data.security || 'WPA';
  const hidden = data.hidden ? 'true' : 'false';
  return `WIFI:T:${security};S:${escapeWifiString(ssid)};P:${escapeWifiString(password)};H:${hidden};;`;
}

function escapeWifiString(str: string): string {
  return str.replace(/[\\;,:\"]/g, (match) => {
    switch (match) {
      case '\\': return '\\\\';
      case ';': return '\\;';
      case ',': return '\\,';
      case ':': return '\\:';
      case '"': return '\\"';
      default: return match;
    }
  });
}

function encodeWhatsApp(data: WhatsAppData): string {
  let phone = data.phone?.trim() || '';
  const countryCode = data.countryCode || '+254';
  if (!phone) return '';
  phone = phone.replace(/^0+/, '');
  const fullPhone = `${countryCode}${phone}`;
  const message = data.message?.trim() || '';
  if (message) {
    return `https://wa.me/${fullPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/${fullPhone.replace('+', '')}`;
}

function encodePhone(data: PhoneData): string {
  const phone = data.phone?.trim() || '';
  if (!phone) return '';
  if (phone.startsWith('+')) return `tel:${phone}`;
  return `tel:+254${phone.replace(/^0+/, '')}`;
}

function encodeSms(data: SmsData): string {
  const phone = data.phone?.trim() || '';
  if (!phone) return '';
  const message = data.message?.trim() || '';
  const formattedPhone = phone.startsWith('+') ? phone : `+254${phone.replace(/^0+/, '')}`;
  if (message) {
    return `sms:${formattedPhone}?body=${encodeURIComponent(message)}`;
  }
  return `sms:${formattedPhone}`;
}

function encodeEmail(data: EmailData): string {
  const email = data.email?.trim() || '';
  if (!email) return '';
  const subject = data.subject?.trim() || '';
  const message = data.message?.trim() || '';
  let mailto = `mailto:${email}`;
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (message) params.push(`body=${encodeURIComponent(message)}`);
  if (params.length > 0) mailto += `?${params.join('&')}`;
  return mailto;
}

function encodeContact(data: ContactData): string {
  const firstName = data.firstName?.trim() || '';
  const lastName = data.lastName?.trim() || '';
  if (!firstName && !lastName) return '';
  const org = data.organization?.trim() || '';
  const phone = data.phone?.trim() || '';
  const email = data.email?.trim() || '';
  const website = data.website?.trim() || '';
  const address = data.address?.trim() || '';
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${firstName} ${lastName}`.trim(),
  ];
  if (org) lines.push(`ORG:${org}`);
  if (phone) lines.push(`TEL:${phone}`);
  if (email) lines.push(`EMAIL:${email}`);
  if (website) lines.push(`URL:${website}`);
  if (address) lines.push(`ADR:;;${address};;;;`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

function encodeLocation(data: LocationData): string {
  const lat = data.latitude?.trim() || '';
  const lng = data.longitude?.trim() || '';
  const address = data.address?.trim() || '';
  if (lat && lng) return `geo:${lat},${lng}`;
  if (address) return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  return '';
}

function encodeEvent(data: EventData): string {
  const name = data.name?.trim() || '';
  if (!name) return '';
  const location = data.location?.trim() || '';
  const start = data.startDate ? formatEventDate(data.startDate) : '';
  const end = data.endDate ? formatEventDate(data.endDate) : '';
  const description = data.description?.trim() || '';
  const lines = [
    'BEGIN:VEVENT',
    `SUMMARY:${name}`,
  ];
  if (location) lines.push(`LOCATION:${location}`);
  if (start) lines.push(`DTSTART:${start}`);
  if (end) lines.push(`DTEND:${end}`);
  if (description) lines.push(`DESCRIPTION:${description.replace(/\n/g, '\\n')}`);
  lines.push('END:VEVENT');
  return lines.join('\n');
}

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function encodeSocial(data: SocialData): string {
  const url = data.url?.trim() || '';
  if (!url) return '';
  if (url.match(/^https?:\/\//i)) return url;
  return `https://${url}`;
}

function encodeCustom(data: CustomData): string {
  return data.text?.trim() || '';
}

function encodeUpload(data: UploadData): string {
  return data.dataUrl?.trim() || '';
}

// --- Kenya Payment Encoders ---

function encodeMPesa(data: MPesaData): string {
  const till = data.tillNumber?.trim() || '';
  if (!till) return '';
  const business = data.businessName?.trim() || '';
  const amount = data.amount?.trim() || '';
  const ref = data.reference?.trim() || '';
  const lines = [
    'M-PESA PAYMENT',
    business ? `Business: ${business}` : '',
    `Till: ${till}`,
    amount ? `Amount: KES ${amount}` : '',
    ref ? `Ref: ${ref}` : '',
  ].filter(Boolean);
  return lines.join('\n');
}

function encodeMPesaTill(data: MPesaData): string {
  const till = data.tillNumber?.trim() || '';
  if (!till) return '';
  const business = data.businessName?.trim() || '';
  const amount = data.amount?.trim() || '';
  const ref = data.reference?.trim() || '';
  const lines = [
    'M-PESA TILL PAYMENT',
    business ? `Business: ${business}` : '',
    `Buy Goods Till: ${till}`,
    amount ? `Amount: KES ${amount}` : '',
    ref ? `Ref: ${ref}` : '',
  ].filter(Boolean);
  return lines.join('\n');
}

function encodeMPesaPayBill(data: MPesaPayBillData): string {
  const paybill = data.payBillNumber?.trim() || '';
  if (!paybill) return '';
  const business = data.businessName?.trim() || '';
  const account = data.accountNumber?.trim() || '';
  const amount = data.amount?.trim() || '';
  const ref = data.reference?.trim() || '';
  const lines = [
    'M-PESA PAYBILL',
    business ? `Business: ${business}` : '',
    `PayBill: ${paybill}`,
    account ? `Account: ${account}` : '',
    amount ? `Amount: KES ${amount}` : '',
    ref ? `Ref: ${ref}` : '',
  ].filter(Boolean);
  return lines.join('\n');
}

function encodeMPesaSend(data: MPesaSendData): string {
  let phone = data.phoneNumber?.trim() || '';
  if (!phone) return '';
  phone = phone.replace(/^0+/, '');
  const fullPhone = phone.startsWith('+') ? phone : `+254${phone}`;
  const amount = data.amount?.trim() || '';
  const ref = data.reference?.trim() || '';
  const lines = [
    'M-PESA SEND MONEY',
    `Phone: ${fullPhone}`,
    amount ? `Amount: KES ${amount}` : '',
    ref ? `Ref: ${ref}` : '',
  ].filter(Boolean);
  return lines.join('\n');
}

function encodeBankPayment(data: BankPaymentData): string {
  const bank = data.bankName?.trim() || '';
  if (!bank) return '';
  const accountName = data.accountName?.trim() || '';
  const accountNum = data.accountNumber?.trim() || '';
  const branch = data.branch?.trim() || '';
  const amount = data.amount?.trim() || '';
  const ref = data.reference?.trim() || '';
  const lines = [
    'BANK PAYMENT',
    `Bank: ${bank}`,
    accountName ? `Account Name: ${accountName}` : '',
    accountNum ? `Account Number: ${accountNum}` : '',
    branch ? `Branch: ${branch}` : '',
    amount ? `Amount: KES ${amount}` : '',
    ref ? `Ref: ${ref}` : '',
  ].filter(Boolean);
  return lines.join('\n');
}

function encodePaymentLink(data: PaymentLinkData): string {
  let url = data.paymentUrl?.trim() || '';
  if (!url) return '';
  if (!url.match(/^https?:\/\//i)) url = `https://${url}`;
  const business = data.businessName?.trim() || '';
  const desc = data.description?.trim() || '';
  if (business || desc) {
    const params = new URL(url);
    if (business) params.searchParams.set('business', business);
    if (desc) params.searchParams.set('desc', desc);
    return params.toString();
  }
  return url;
}
