
export interface Product {
  id: string;
  name: string;
  description: string;
  material: string;
  price: string;
  unitCost: number;
  image: string;
  stock: number;
  minStock: number;
  monthlySales: number;
}

export interface FinancialData {
  month: string;
  revenue: number;
  expenses: number;
  notes?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LegalityItem {
  id: string;
  name: string;
  image: string;
}

export interface AnalyticsData {
  aiInteractions: number;
  whatsappInquiries: number;
  socialReach: {
    instagram: number;
    youtube: number;
    linkedin: number;
    facebook: number;
  };
}

export interface SiteData {
  companyName: string;
  description: string;
  history: string;
  vision: string;
  mission: string;
  legalities: LegalityItem[];
  contact: {
    address: string;
    phone: string;
    email: string;
    instagram: string;
    whatsapp: string;
    mapUrl: string;
  };
  products: Product[];
  gallery: GalleryItem[];
  articles: Article[];
  faqs: FAQItem[];
  carousel: string[];
  finances: FinancialData[];
  analytics: AnalyticsData;
}
