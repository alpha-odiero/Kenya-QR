export type QRType =
  | 'website'
  | 'text'
  | 'wifi'
  | 'whatsapp'
  | 'phone'
  | 'sms'
  | 'email'
  | 'contact'
  | 'location'
  | 'event'
  | 'social'
  | 'custom'
  | 'upload'
  | 'mpesa'
  | 'mpesa-till'
  | 'mpesa-paybill'
  | 'mpesa-send'
  | 'bank-payment'
  | 'payment-link';

export type QRCategory = 'all' | 'payments' | 'business' | 'connectivity' | 'content' | 'marketing' | 'uploads';

export interface QRTypeConfig {
  id: QRType;
  label: string;
  description: string;
  icon: string;
  category: QRCategory;
}

export interface WebsiteData {
  url: string;
}

export interface TextData {
  text: string;
}

export interface WifiData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface WhatsAppData {
  phone: string;
  message: string;
  countryCode: string;
}

export interface PhoneData {
  phone: string;
}

export interface SmsData {
  phone: string;
  message: string;
}

export interface EmailData {
  email: string;
  subject: string;
  message: string;
}

export interface ContactData {
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

export interface LocationData {
  latitude: string;
  longitude: string;
  address: string;
}

export interface EventData {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SocialData {
  url: string;
}

export interface CustomData {
  text: string;
}

export interface UploadData {
  uploadType: 'image' | 'pdf' | 'file';
  dataUrl: string;
  fileName: string;
  mimeType: string;
}

export interface MPesaData {
  businessName: string;
  tillNumber: string;
  amount: string;
  reference: string;
}

export interface MPesaPayBillData {
  businessName: string;
  payBillNumber: string;
  accountNumber: string;
  amount: string;
  reference: string;
}

export interface MPesaSendData {
  phoneNumber: string;
  amount: string;
  reference: string;
}

export interface BankPaymentData {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  amount: string;
  reference: string;
}

export interface PaymentLinkData {
  businessName: string;
  paymentUrl: string;
  description: string;
}

export type QRData =
  | WebsiteData
  | TextData
  | WifiData
  | WhatsAppData
  | PhoneData
  | SmsData
  | EmailData
  | ContactData
  | LocationData
  | EventData
  | SocialData
  | CustomData
  | UploadData
  | MPesaData
  | MPesaPayBillData
  | MPesaSendData
  | BankPaymentData
  | PaymentLinkData;

export interface QRConfig {
  foreground: string;
  background: string;
  size: number;
  margin: number;
  level: 'L' | 'M' | 'Q' | 'H';
  logo: string | null;
}

export const defaultQRConfig: QRConfig = {
  foreground: '#17252D',
  background: '#FFFFFF',
  size: 256,
  margin: 4,
  level: 'M',
  logo: null,
};

export const defaultWifiData: WifiData = {
  ssid: '',
  password: '',
  security: 'WPA',
  hidden: false,
};

export const defaultWhatsAppData: WhatsAppData = {
  phone: '',
  message: '',
  countryCode: '+254',
};

export const defaultContactData: ContactData = {
  firstName: '',
  lastName: '',
  organization: '',
  phone: '',
  email: '',
  website: '',
  address: '',
};

export const defaultLocationData: LocationData = {
  latitude: '',
  longitude: '',
  address: '',
};

export const defaultEventData: EventData = {
  name: '',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
};

export const defaultMPesaData: MPesaData = {
  businessName: '',
  tillNumber: '',
  amount: '',
  reference: '',
};

export const defaultMPesaPayBillData: MPesaPayBillData = {
  businessName: '',
  payBillNumber: '',
  accountNumber: '',
  amount: '',
  reference: '',
};

export const defaultMPesaSendData: MPesaSendData = {
  phoneNumber: '',
  amount: '',
  reference: '',
};

export const defaultBankPaymentData: BankPaymentData = {
  bankName: '',
  accountName: '',
  accountNumber: '',
  branch: '',
  amount: '',
  reference: '',
};

export const defaultPaymentLinkData: PaymentLinkData = {
  businessName: '',
  paymentUrl: '',
  description: '',
};
