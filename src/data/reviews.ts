import { PatientReview } from '../types';

export const INITIAL_PATIENT_REVIEWS: PatientReview[] = [
  {
    id: 'rev-syed-ansar',
    name: 'Syed Ansar',
    initials: 'SA',
    rating: 5,
    review: 'The hospital is neat and clean, and the environment is well-maintained. The nursing staff are caring, experienced, and supportive. Overall, I am satisfied with the service and would recommend this hospital to others.',
    departmentTag: 'Hygiene & Nursing Care',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-teal-600 to-navy-800',
  },
  {
    id: 'rev-nadigatla-ashwini',
    name: 'Nadigatla Ashwini',
    initials: 'NA',
    rating: 5,
    review: 'Dr. Chandrika Madam was kind, caring, and supportive throughout my treatment. She explained everything in simple words and made me feel comfortable.',
    departmentTag: "Dr. Chandrika (Fertility & OBGY)",
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-pink-500 to-rose-700',
  },
  {
    id: 'rev-mohammad-rasool',
    name: 'Mohammad Rasool',
    initials: 'MR',
    rating: 5,
    review: 'We had a wonderful experience at DeviBai Hospital during the birth of our baby boy. Dr. Chandrika Madam and Avinash Sir were kind, attentive, and supportive.',
    departmentTag: 'Maternity & Delivery',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-blue-600 to-cyan-800',
  },
  {
    id: 'rev-sriramoju-nagarjuna',
    name: 'Sriramoju Nagarjuna',
    initials: 'SN',
    rating: 5,
    review: 'The hospital is very clean and well-maintained. The doctors and staff are friendly and professional. I received proper treatment and felt well cared for. Highly recommended!',
    departmentTag: 'General Medicine & Care',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-emerald-600 to-teal-800',
  },
  {
    id: 'rev-pravin-katpelwar',
    name: 'Pravin Katpelwar',
    initials: 'PK',
    rating: 5,
    review: "Dr. Avinash Sir and Dr. Chandrika Madam are good doctors. Dr. Avinash Sir is a great surgeon. Thank you for helping with my daughter's surgery.",
    departmentTag: 'Dr. Avinash (Laparoscopic Surgery)',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-indigo-600 to-blue-900',
  },
  {
    id: 'rev-jagan-anupa',
    name: 'Jagan Anupa',
    initials: 'JA',
    rating: 5,
    review: 'After waiting for seven years and consulting many hospitals and doctors, we got results at DeviBai Hospital in just one month. Thank you, Dr. Chandrika Madam!',
    departmentTag: 'Fertility & IVF Success',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-amber-600 to-rose-800',
  },
  {
    id: 'rev-afnan-ahmed',
    name: 'Afnan Ahmed',
    initials: 'AA',
    rating: 5,
    review: "It's a really nice hospital with highly qualified doctors providing 24/7 services. Our family is very satisfied with DeviBai Hospital.",
    departmentTag: '24/7 Emergency & ICU',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-cyan-600 to-teal-900',
  },
  {
    id: 'rev-eshwar-madnurkar',
    name: 'Eshwar Madnurkar',
    initials: 'EM',
    rating: 5,
    review: 'Excellent patient service with pediatric services under Aarogyasri. Thank you, Dr. Sudheer Sir and team.',
    departmentTag: 'Aarogyasri & Pediatrics',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-purple-600 to-indigo-900',
  },
  {
    id: 'rev-karipe-lingavva',
    name: 'Karipe Lingavva',
    initials: 'KL',
    rating: 5,
    review: 'Good doctors, good care, and excellent cleanliness and hygiene. A very good hospital in Nirmal.',
    departmentTag: 'Hospital Cleanliness',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-teal-700 to-emerald-900',
  },
  {
    id: 'rev-srinivas-a',
    name: 'Srinivas A',
    initials: 'SR',
    rating: 5,
    review: 'One of the hospitals in Nirmal offering 24/7 emergency critical care, anaesthesia, and specialist services. The staff are helpful and caring.',
    departmentTag: '24/7 Critical Care & Anaesthesia',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-sky-600 to-navy-900',
  },
  {
    id: 'rev-rajita-dasari',
    name: 'Rajita Dasari',
    initials: 'RD',
    rating: 5,
    review: 'Nice hospital with good doctors and nursing staff. Best treatment from Dr. Prashant Sir and Dr. Avinash Sir.',
    departmentTag: 'General Medicine & Surgery',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-fuchsia-600 to-pink-900',
  },
  {
    id: 'rev-karupaka-shekar',
    name: 'Karupaka Shekar',
    initials: 'KS',
    rating: 5,
    review: 'Super hospital with excellent doctors and good services. Dr. Prashant Sir and Dr. Avinash Sir are highly appreciated.',
    departmentTag: 'Critical Care & Surgery',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-emerald-700 to-navy-900',
  },
  {
    id: 'rev-erekar-sai',
    name: 'Erekar Sai',
    initials: 'ES',
    rating: 5,
    review: 'Best doctor, Dr. Chandrika Madam. Thank you, Madam!',
    departmentTag: 'Dr. Chandrika (OBGY & Fertility)',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-teal-600 to-blue-800',
  },
  {
    id: 'rev-mounika-pyata',
    name: 'Mounika Pyata',
    initials: 'MP',
    rating: 5,
    review: 'Dr. Prashant Sir is a nice doctor who provides good treatment. Dr. Avinash Sir is also appreciated for his surgical skills.',
    departmentTag: 'Dr. Prashant & Dr. Avinash',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-rose-600 to-purple-900',
  },
  {
    id: 'rev-k-sravanthi',
    name: 'K. Sravanthi',
    initials: 'KS',
    rating: 5,
    review: 'Good hospital with good doctors and a clean environment. Dr. Prashant Sir provides excellent treatment.',
    departmentTag: 'General Medicine & Diabetology',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-amber-600 to-emerald-900',
  },
  {
    id: 'rev-rajueppa-eppa',
    name: 'Rajueppa Eppa',
    initials: 'RE',
    rating: 5,
    review: "Dr. Chandrika Madam's treatment is very good and has been successful for many couples hoping to have children.",
    departmentTag: 'Fertility & IVF Centre',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-cyan-600 to-indigo-900',
  },
  {
    id: 'rev-medipally-lavanya',
    name: 'Medipally Lavanya',
    initials: 'ML',
    rating: 5,
    review: 'High success rate in Nirmal. Thank you, Dr. Chandrika Madam, for bringing happiness into so many families’ lives.',
    departmentTag: 'Fertility & Maternity Success',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-teal-600 to-rose-700',
  },
  {
    id: 'rev-erekar-bhoomika',
    name: 'Erekar Bhoomika',
    initials: 'EB',
    rating: 5,
    review: 'A happy experience during the first visit to DeviBai Hospital. We received good news. Thank you, Madam!',
    departmentTag: 'First Visit & Consultation',
    date: 'Verified Patient',
    isVerified: true,
    avatarGradient: 'from-blue-600 to-teal-800',
  },
];

const STORAGE_KEY = 'devibhai_patient_reviews_v1';

const GRADIENTS = [
  'from-teal-600 to-navy-800',
  'from-blue-600 to-cyan-800',
  'from-emerald-600 to-teal-800',
  'from-indigo-600 to-blue-900',
  'from-pink-600 to-rose-800',
  'from-purple-600 to-indigo-900',
  'from-amber-600 to-rose-800',
  'from-cyan-600 to-teal-900',
];

export function getInitials(name: string): string {
  if (!name) return 'PT';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getStoredUserReviews(): PatientReview[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to parse patient reviews from localStorage:', e);
    return [];
  }
}

export function saveNewPatientReview(reviewData: {
  name: string;
  rating: number;
  review: string;
  departmentTag?: string;
}): PatientReview {
  const initials = getInitials(reviewData.name);
  const randomGradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];

  const newReview: PatientReview = {
    id: `rev-user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: reviewData.name.trim(),
    initials,
    rating: Math.max(1, Math.min(5, Math.round(reviewData.rating))),
    review: reviewData.review.trim(),
    departmentTag: reviewData.departmentTag?.trim() || 'Verified Patient Review',
    date: 'Recently Submitted',
    isVerified: true,
    avatarGradient: randomGradient,
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getStoredUserReviews();
      const updated = [newReview, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save patient review to localStorage:', e);
    }
  }

  return newReview;
}

export function getAllPatientReviews(): PatientReview[] {
  const userReviews = getStoredUserReviews();
  return [...userReviews, ...INITIAL_PATIENT_REVIEWS];
}
