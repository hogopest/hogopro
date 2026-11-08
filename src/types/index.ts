export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  category: 'residential' | 'commercial' | 'industrial' | 'specialized';
  icon: string;
  warranty: string;
  targetPest: string;
  treatmentMethod: string[];
  features: string[];
  suitableFor: string[];
  startingPrice: string;
}

export interface BookingData {
  serviceId: string;
  serviceName: string;
  propertyType: string;
  areaSize: number;
  scheduledDate: string;
  timeSlot: string;
  fullName: string;
  phoneWhatsApp: string;
  address: string;
  city: string;
  notes: string;
  isUrgent: boolean;
}

export interface PestGuideItem {
  id: string;
  name: string;
  latinName: string;
  riskLevel: 'Tinggi' | 'Sedang' | 'Kritis';
  signs: string[];
  risks: string[];
  recommendation: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  propertyType: string;
  city: string;
  quote: string;
  rating: number;
  serviceUsed: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
