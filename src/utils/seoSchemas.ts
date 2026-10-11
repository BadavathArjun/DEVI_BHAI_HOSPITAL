import { Doctor, Speciality, HospitalService, FAQ } from '../types';
import { HOSPITAL_INFO } from '../data/hospital';

const BASE_URL = 'https://devibaihospital.com';

/**
 * Standard BreadcrumbList Schema for Google Search Rich Results
 */
export const generateBreadcrumbSchema = (items: { name: string; path?: string }[]) => {
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${BASE_URL}/`
    },
    ...items.map((item, index) => {
      const position = index + 2;
      const url = item.path ? `${BASE_URL}${item.path.startsWith('/') ? item.path : `/${item.path}`}` : undefined;
      return {
        '@type': 'ListItem',
        position,
        name: item.name,
        ...(url ? { item: url } : {})
      };
    })
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };
};

/**
 * Physician / Doctor Schema
 */
export const generatePhysicianSchema = (doctor: Doctor) => {
  const photoUrl = doctor.photo.startsWith('http')
    ? doctor.photo
    : `${BASE_URL}${doctor.photo.startsWith('/') ? doctor.photo : `/${doctor.photo}`}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${BASE_URL}/doctors/${doctor.slug}#physician`,
    name: doctor.name,
    alternateName: doctor.teluguName,
    jobTitle: doctor.role,
    medicalSpecialty: doctor.specialization,
    description: doctor.bio,
    image: photoUrl,
    telephone: HOSPITAL_INFO.phones.primaryFormatted,
    url: `${BASE_URL}/doctors/${doctor.slug}`,
    worksFor: {
      '@type': 'Hospital',
      '@id': `${BASE_URL}/#hospital`,
      name: HOSPITAL_INFO.name,
      url: BASE_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: HOSPITAL_INFO.address.line1,
        addressLocality: HOSPITAL_INFO.address.city,
        addressRegion: HOSPITAL_INFO.address.state,
        postalCode: HOSPITAL_INFO.address.pincode,
        addressCountry: 'IN'
      }
    },
    knowsAbout: doctor.areasOfExpertise,
    availableService: doctor.services.map((srv) => ({
      '@type': 'MedicalProcedure',
      name: srv
    }))
  };
};

/**
 * MedicalSpecialty / MedicalDepartment Schema
 */
export const generateSpecialitySchema = (speciality: Speciality, doctors: Doctor[] = []) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${BASE_URL}/specialities/${speciality.slug}#speciality`,
    name: `${speciality.title} - Devibai Super Speciality Hospital Nirmal`,
    description: speciality.shortDesc,
    url: `${BASE_URL}/specialities/${speciality.slug}`,
    specialty: speciality.title,
    aspect: ['Overview', 'Treatments', 'Clinical Consultation'],
    about: {
      '@type': 'MedicalSpecialty',
      name: speciality.title,
      description: speciality.fullDesc
    },
    provider: {
      '@type': 'Hospital',
      '@id': `${BASE_URL}/#hospital`,
      name: HOSPITAL_INFO.name,
      url: BASE_URL
    },
    offers: speciality.treatments.map((treatment) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'MedicalProcedure',
        name: treatment
      }
    })),
    mainEntity: doctors.map((doc) => ({
      '@type': 'Physician',
      name: doc.name,
      jobTitle: doc.role,
      url: `${BASE_URL}/doctors/${doc.slug}`
    }))
  };
};

/**
 * HealthcareService / MedicalProcedure Schema
 */
export const generateServiceSchema = (service: HospitalService) => {
  const imageUrl = service.image
    ? service.image.startsWith('http')
      ? service.image
      : `${BASE_URL}${service.image.startsWith('/') ? service.image : `/${service.image}`}`
    : `${BASE_URL}/assets/branding/homepage-hero.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'HealthcareService',
    '@id': `${BASE_URL}/services/${service.slug}#service`,
    name: `${service.title} - Devibai Super Speciality Hospital`,
    serviceType: service.category,
    description: service.shortDesc,
    url: `${BASE_URL}/services/${service.slug}`,
    image: imageUrl,
    provider: {
      '@type': 'Hospital',
      '@id': `${BASE_URL}/#hospital`,
      name: HOSPITAL_INFO.name,
      url: BASE_URL
    },
    serviceOutput: service.features,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Nirmal District, Telangana'
    }
  };
};

/**
 * FAQPage Schema
 */
export const generateFaqSchema = (faqs: FAQ[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

/**
 * 24/7 Emergency Service Schema
 */
export const generateEmergencySchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    '@id': `${BASE_URL}/emergency#service`,
    name: '24/7 Emergency & Critical Care Department - Devibai Hospital Nirmal',
    description: 'Round-the-clock emergency medical care, ICU ventilator support, accident trauma resuscitation, and poison stabilization in Nirmal, Telangana.',
    url: `${BASE_URL}/emergency`,
    telephone: HOSPITAL_INFO.phones.emergencyFormatted,
    image: `${BASE_URL}/assets/facilities/emergency-trauma-care.jpg`,
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
        description: 'Open 24 Hours, 365 Days a Year for Emergency & ICU Services'
      }
    ],
    provider: {
      '@type': 'Hospital',
      '@id': `${BASE_URL}/#hospital`,
      name: HOSPITAL_INFO.name,
      telephone: HOSPITAL_INFO.phones.primaryFormatted
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Nirmal, Adilabad, Nizamabad, Telangana'
    }
  };
};

/**
 * Aarogyasri Healthcare Scheme Schema
 */
export const generateAarogyasriSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${BASE_URL}/arogyasri#webpage`,
    name: 'Rajiv Aarogyasri Healthcare Scheme - Devibai Super Speciality Hospital Nirmal',
    description: 'Cashless healthcare support under Telangana Rajiv Aarogyasri and Government Employees Health Scheme (EHS) at Devibai Hospital Nirmal.',
    url: `${BASE_URL}/arogyasri`,
    about: {
      '@type': 'GovernmentService',
      name: 'Rajiv Aarogyasri Health Scheme',
      serviceType: 'Public Healthcare Financial Protection Scheme',
      provider: {
        '@type': 'GovernmentOrganization',
        name: 'Government of Telangana'
      }
    },
    provider: {
      '@type': 'Hospital',
      '@id': `${BASE_URL}/#hospital`,
      name: HOSPITAL_INFO.name,
      url: BASE_URL
    }
  };
};
