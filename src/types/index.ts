export interface Doctor {
  id: string;
  slug: string;
  name: string;
  teluguName?: string;
  specialization: string;
  qualifications: string;
  role?: string;
  photo: string;
  fullCardPhoto?: string;
  bio: string;
  areasOfExpertise: string[];
  services: string[];
  scheduleInfo?: string;
  active: boolean;
}

export interface Speciality {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  treatments: string[];
  doctorIds: string[];
  highlights: string[];
}

export interface HospitalService {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  conditionsTreated?: string[];
  image: string;
}

export interface Facility {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  badge?: string;
  features: string[];
  image: string;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  teluguName?: string;
  logo: string;
  type: 'government' | 'private' | 'tpa';
  notes: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hospital' | 'Doctors' | 'Medical Care' | 'Facilities' | 'Services' | 'Emergency' | 'Fertility & IVF' | 'Surgery';
  image: string;
  caption?: string;
}

export interface AppointmentRequest {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  age?: string;
  gender?: 'Male' | 'Female' | 'Other';
  department: string;
  preferredDoctor?: string;
  preferredDate: string;
  preferredTime?: string;
  reason?: string;
  message?: string;
  consent: boolean;
  status: 'Pending' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  createdAt: string;
}
