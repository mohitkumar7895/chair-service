export type ServiceCategory = 'office_chair' | 'recliner_chair' | 'salon_chair' | 'sofa_repair';

export type RepairUrgency = 'normal' | 'same_day' | 'emergency';

export type BookingStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  detailedDescription: string;
  startingPrice: number;
  priceFormatted: string;
  turnaroundTime: string;
  features: string[];
  image: string;
  badge?: string;
  isPopular?: boolean;
  processSteps?: ServiceProcessStep[];
  galleryImages?: string[];
}

export interface BookingRequest {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  category: ServiceCategory;
  serviceId?: string;
  serviceName: string;
  itemCount: number;
  issueDescription: string;
  preferredDate: string;
  urgency: RepairUrgency;
  status: BookingStatus;
  estimatedCost: number;
  photoUrl?: string;
  createdAt: string;
  notes?: string;
}

export interface InquiryMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: ServiceCategory | 'general';
  serviceInterest?: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'contacted';
}

export interface CustomerReview {
  id: string;
  name: string;
  customerName?: string;
  role?: string;
  location?: string;
  rating: number;
  serviceType?: string;
  comment: string;
  date: string;
  verified?: boolean;
}

export interface AdminStats {
  totalBookings: number;
  pendingRepairs: number;
  inProgressRepairs: number;
  completedRepairs: number;
  cancelledRepairs: number;
  estimatedRevenue: number;
  officeChairBookings?: number;
  reclinerBookings?: number;
  salonChairBookings: number;
  sofaBookings: number;
  totalInquiries: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: ServiceCategory | 'all';
  imageUrl: string;
  description?: string;
  createdAt: string;
}
