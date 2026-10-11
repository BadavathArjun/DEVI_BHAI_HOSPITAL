import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://devibaisuperspecialityhospital.com';
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(BASE_HTML_PATH)) {
  console.error('Error: dist/index.html not found! Run "vite build" first.');
  process.exit(1);
}

const baseHtmlTemplate = fs.readFileSync(BASE_HTML_PATH, 'utf8');

// Hospital Metadata
const HOSPITAL_INFO = {
  name: "DEVIBAI SUPER SPECIALITY HOSPITAL",
  address: "Beside DS Mart, Mancherial Road, Shastri Nagar, Nirmal – 504106, Telangana, India",
  phone: "+91 9092916222",
  emergencyPhone: "+91 9092916222",
  defaultImage: `${BASE_URL}/assets/branding/homepage-hero.jpg`
};

// Route Definitions for Pre-rendering Static SEO Snapshots
const ROUTES = [
  {
    path: '/',
    title: 'DEVIBAI SUPER SPECIALITY HOSPITAL | Nirmal, Telangana',
    description: 'Visit the official website of DeviBai Super Speciality Hospital in Nirmal, Telangana. Explore hospital services, doctors, location and contact information.',
    keywords: 'devi bai hospital, devibai super speciality hospital, devibai hospital nirmal, devi bai hospital nirmal, devi bhai hospital, hospital in nirmal, best hospital in nirmal, best fertility center in nirmal, dr chandrika fertility centre nirmal, maternity hospital nirmal, emergency hospital nirmal 24/7, laparoscopic surgery nirmal',
    image: `${BASE_URL}/assets/branding/homepage-hero.jpg`,
    schema: {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: 'DEVIBAI SUPER SPECIALITY HOSPITAL',
      alternateName: [
        'DeviBai Hospital',
        'Devi Bai Hospital',
        'Devibai Super Speciality Hospital',
        'Devi Bhai Hospital',
        'Devi Bai Super Speciality Hospital Nirmal'
      ],
      publisher: {
        '@type': 'Hospital',
        '@id': `${BASE_URL}/#hospital`,
        name: 'DEVIBAI SUPER SPECIALITY HOSPITAL',
        url: `${BASE_URL}/`
      }
    }
  },
  {
    path: '/about',
    title: 'About Devi Bai Hospital Nirmal | Best Hospital in Nirmal',
    description: 'Devibai Super Speciality Hospital (Devi Bai Hospital) is the best hospital and top fertility & IVF centre in Nirmal, Telangana. Multi-speciality clinical excellence, 24/7 emergency & Smart ICU.',
    keywords: 'about devi bai hospital, devibai super speciality hospital nirmal, best hospital in nirmal, best fertility center in nirmal, devi bhai hospital nirmal, hospital beside ds mart nirmal',
    image: `${BASE_URL}/assets/branding/about-hospital.jpg`,
    breadcrumbs: [{ name: 'About Hospital' }]
  },
  {
    path: '/doctors',
    title: 'Best Doctors in Nirmal | Devibai Super Speciality Hospital',
    description: 'Consult the best doctors in Nirmal at Devibai Super Speciality Hospital (Devi Bai Hospital). Featuring top fertility specialist & gynecologist Dr. K. Chandrika, surgeon Dr. K. Avinash, and pediatrician Dr. Sudheer Kumar.',
    keywords: 'best doctors in nirmal, best gynecologist in nirmal, best fertility doctor in nirmal, devi bai hospital doctors, dr chandrika nirmal, best surgeon nirmal, pediatric doctor nirmal',
    image: `${BASE_URL}/assets/branding/homepage-hero.jpg`,
    breadcrumbs: [{ name: 'Doctors & Specialists' }]
  },
  {
    path: '/doctors/dr-k-chandrika',
    title: 'Dr. K. Chandrika | Best Fertility Specialist & Gynecologist in Nirmal | Devibai Hospital',
    description: 'Consult Dr. K. Chandrika (Diploma in ART Germany, DNB Fernandez, Fellow in Infertility), leading fertility specialist and gynecologist in Nirmal at Devibai Super Speciality Hospital (Devi Bai Hospital).',
    keywords: 'best fertility doctor in nirmal, best gynecologist in nirmal, dr chandrika nirmal, best fertility center in nirmal, devi bai hospital gynecologist, ivf doctor nirmal, test tube baby doctor nirmal',
    image: `${BASE_URL}/assets/doctors/dr-k-chandrika.jpg`,
    type: 'profile',
    breadcrumbs: [{ name: 'Doctors', path: '/doctors' }, { name: 'Dr. K. Chandrika' }],
    schema: {
      '@type': 'Physician',
      '@id': `${BASE_URL}/doctors/dr-k-chandrika#physician`,
      name: 'Dr. K. Chandrika',
      alternateName: 'డా॥ కె. చంద్రిక',
      jobTitle: 'Consultant Obstetrician, Gynecologist & Fertility Specialist',
      medicalSpecialty: 'Obstetrics & Gynecology, Fertility & IVF',
      description: 'Nirmal\'s premier specialist in Obstetrics & Gynecology with advanced training in Reproductive Medicine and Assisted Reproductive Technologies (ART, Germany). Leads Dr. Chandrika\'s Fertility (IVF) & Laparoscopic Centre at Devibai Super Speciality Hospital.',
      image: `${BASE_URL}/assets/doctors/dr-k-chandrika.jpg`,
      telephone: '+919092916222',
      url: `${BASE_URL}/doctors/dr-k-chandrika`
    }
  },
  {
    path: '/doctors/dr-k-avinash-kasamwar',
    title: 'Dr. K. Avinash Kasamwar - General & Laparoscopic Surgeon | Devibai Hospital Nirmal',
    description: 'Consult Dr. K. Avinash Kasamwar (MS - General Surgery) at Devibai Super Speciality Hospital, Nirmal. Minimally invasive laparoscopic and general surgery specialist.',
    keywords: 'Dr K Avinash Kasamwar, Surgeon Nirmal, Laparoscopic surgeon Nirmal, Appendectomy Nirmal, Hernia repair Nirmal, Gallbladder surgery Nirmal, Piles surgery Nirmal',
    image: `${BASE_URL}/assets/doctors/dr-k-avinash-kasamwar.jpg`,
    type: 'profile',
    breadcrumbs: [{ name: 'Doctors', path: '/doctors' }, { name: 'Dr. K. Avinash Kasamwar' }],
    schema: {
      '@type': 'Physician',
      '@id': `${BASE_URL}/doctors/dr-k-avinash-kasamwar#physician`,
      name: 'Dr. K. Avinash Kasamwar',
      alternateName: 'డా॥ అవినాశ్ కాసవార్',
      jobTitle: 'Consultant General & Laparoscopic Surgeon',
      medicalSpecialty: 'General & Laparoscopic Surgery',
      description: 'Consultant general and laparoscopic surgeon specializing in minimally invasive abdominal procedures, emergency surgical interventions, and advanced GI surgeries.',
      image: `${BASE_URL}/assets/doctors/dr-k-avinash-kasamwar.jpg`,
      telephone: '+919092916222',
      url: `${BASE_URL}/doctors/dr-k-avinash-kasamwar`
    }
  },
  {
    path: '/doctors/dr-prashant-kumar-waghmare',
    title: 'Dr. Prashant Kumar Waghmare - MD Physician & Diabetologist | Devibai Hospital Nirmal',
    description: 'Consult Dr. Prashant Kumar Waghmare (MD - General Medicine) at Devibai Hospital Nirmal for diabetes, hypertension, cardiac care, and critical care management.',
    keywords: 'Dr Prashant Kumar Waghmare, Physician Nirmal, Diabetologist Nirmal, General medicine doctor Nirmal, ICU doctor Nirmal, Internal medicine Nirmal',
    image: `${BASE_URL}/assets/doctors/dr-prashant-kumar-waghmare.jpg`,
    type: 'profile',
    breadcrumbs: [{ name: 'Doctors', path: '/doctors' }, { name: 'Dr. Prashant Kumar Waghmare' }],
    schema: {
      '@type': 'Physician',
      '@id': `${BASE_URL}/doctors/dr-prashant-kumar-waghmare#physician`,
      name: 'Dr. Prashant Kumar Waghmare',
      alternateName: 'డా॥ ప్రశాంత్ కుమార్ వాగ్మారే',
      jobTitle: 'Consultant Physician, Diabetologist & Critical Care Specialist',
      medicalSpecialty: 'General Medicine, Diabetology & Critical Care',
      description: 'MD Physician with extensive expertise in internal medicine, comprehensive diabetes care, cardiac emergencies, and critical care ICU supervision.',
      image: `${BASE_URL}/assets/doctors/dr-prashant-kumar-waghmare.jpg`,
      telephone: '+919092916222',
      url: `${BASE_URL}/doctors/dr-prashant-kumar-waghmare`
    }
  },
  {
    path: '/doctors/dr-sudheer-kumar-g',
    title: 'Dr. Sudheer Kumar G - Pediatrician & Neonatologist | Devibai Hospital Nirmal',
    description: 'Consult Dr. Sudheer Kumar G (MBBS, MD Pediatrics, Fellowship in Neonatology IAP Delhi) at Devibai Hospital Nirmal. Expert child & premature newborn care.',
    keywords: 'Dr Sudheer Kumar G, Pediatrician Nirmal, Child specialist Nirmal, Neonatologist Nirmal, Newborn doctor Nirmal, Vaccination Nirmal, Baby doctor Nirmal',
    image: `${BASE_URL}/assets/doctors/dr-sudheer-kumar-g.jpg`,
    type: 'profile',
    breadcrumbs: [{ name: 'Doctors', path: '/doctors' }, { name: 'Dr. Sudheer Kumar G' }],
    schema: {
      '@type': 'Physician',
      '@id': `${BASE_URL}/doctors/dr-sudheer-kumar-g#physician`,
      name: 'Dr. Sudheer Kumar G',
      alternateName: 'డా॥ సుధీర్ కుమార్ జి',
      jobTitle: 'Consultant Pediatrician & Neonatologist',
      medicalSpecialty: 'Pediatrics & Neonatology',
      description: 'Pediatric medicine and advanced neonatology specialist with Fellowship in Neonatology from IAP Delhi providing specialized newborn, premature infant, and child care.',
      image: `${BASE_URL}/assets/doctors/dr-sudheer-kumar-g.jpg`,
      telephone: '+919092916222',
      url: `${BASE_URL}/doctors/dr-sudheer-kumar-g`
    }
  },
  {
    path: '/doctors/dr-k-ravichandra',
    title: 'Dr. K. Ravichandra - Consultant Urologist | Devibai Hospital Nirmal',
    description: 'Consult visiting Urologist Dr. K. Ravichandra (MBBS, MS, MCh - Urology) at Devibai Hospital Nirmal for kidney stones, prostate conditions, and uro-surgeries.',
    keywords: 'Dr K Ravichandra, Urologist Nirmal, Kidney stone doctor Nirmal, Prostate specialist Nirmal, Urine infection doctor Nirmal, Urology surgery Nirmal',
    image: `${BASE_URL}/assets/doctors/dr-k-ravichandra.jpg`,
    type: 'profile',
    breadcrumbs: [{ name: 'Doctors', path: '/doctors' }, { name: 'Dr. K. Ravichandra' }],
    schema: {
      '@type': 'Physician',
      '@id': `${BASE_URL}/doctors/dr-k-ravichandra#physician`,
      name: 'Dr. K. Ravichandra',
      alternateName: 'డా॥ కె. రవిచంద్ర',
      jobTitle: 'Visiting Consultant Urologist',
      medicalSpecialty: 'Urology & Uro-Surgery',
      description: 'Visiting consultant urologist holding an MCh in Urology for complex urological conditions, kidney stone treatments, and prostate healthcare.',
      image: `${BASE_URL}/assets/doctors/dr-k-ravichandra.jpg`,
      telephone: '+919092916222',
      url: `${BASE_URL}/doctors/dr-k-ravichandra`
    }
  },
  {
    path: '/specialities',
    title: 'Specialities | Best Hospital & Fertility Centre in Nirmal | Devibai Hospital',
    description: 'Explore medical and surgical specialities at Devibai Super Speciality Hospital (Devi Bai Hospital) Nirmal: Best Fertility & IVF Centre, Maternity, Laparoscopic Surgery, Pediatrics & 24/7 Emergency.',
    keywords: 'best hospital in nirmal, best fertility hospital in nirmal, devi bai hospital specialities, ivf clinic nirmal, laparoscopic surgery nirmal, maternity hospital nirmal, devi bhai hospital nirmal',
    breadcrumbs: [{ name: 'Specialities' }]
  },
  {
    path: '/specialities/fertility-ivf',
    title: 'Best Fertility Hospital & Centre in Nirmal | IVF Clinic | Devibai Hospital',
    description: 'Looking for the best fertility hospital or center in Nirmal? Consult Dr. K. Chandrika (Diploma in ART Germany) at Devibai Super Speciality Hospital for IVF, IUI, PCOD & reproductive care.',
    keywords: 'best fertility hospital in nirmal, best fertility center in nirmal, best ivf center in nirmal, fertility clinic in nirmal, test tube baby center nirmal, dr chandrika fertility nirmal, devi bai hospital fertility, iui treatment nirmal, pcod treatment nirmal',
    image: `${BASE_URL}/assets/facilities/fertility-ivf-centre.jpg`,
    breadcrumbs: [{ name: 'Specialities', path: '/specialities' }, { name: 'Fertility & IVF' }],
    schema: {
      '@type': 'MedicalWebPage',
      name: 'Best Fertility Hospital & IVF Centre in Nirmal - Dr. Chandrika Fertility Centre',
      specialty: 'Reproductive Medicine / Infertility',
      url: `${BASE_URL}/specialities/fertility-ivf`
    }
  },
  {
    path: '/specialities/obstetrics-gynecology',
    title: 'Obstetrics & Gynecology in Nirmal | Devibai Super Speciality Hospital',
    description: 'Safe normal delivery, high-risk pregnancy management, C-section, CTG fetal monitoring, and women healthcare at Devibai Hospital Nirmal.',
    keywords: 'Gynecologist Nirmal, Maternity hospital Nirmal, Normal delivery Nirmal, C-Section delivery Nirmal, High risk pregnancy Nirmal, Women hospital Nirmal',
    image: `${BASE_URL}/assets/facilities/maternal-fetal-monitoring.jpg`,
    breadcrumbs: [{ name: 'Specialities', path: '/specialities' }, { name: 'Obstetrics & Gynecology' }],
    schema: {
      '@type': 'MedicalWebPage',
      name: 'Obstetrics & Gynecology Department - Devibai Super Speciality Hospital',
      specialty: 'Obstetrics and Gynecology',
      url: `${BASE_URL}/specialities/obstetrics-gynecology`
    }
  },
  {
    path: '/specialities/general-medicine',
    title: 'General Medicine & Diabetology in Nirmal | Devibai Super Speciality Hospital',
    description: 'Consultant physician care for diabetes, hypertension, infectious diseases (dengue, malaria), cardiac crises, and multi-system medical illnesses.',
    keywords: 'General physician Nirmal, Diabetologist Nirmal, Internal medicine Nirmal, Fever hospital Nirmal, BP doctor Nirmal, Thyroid doctor Nirmal',
    breadcrumbs: [{ name: 'Specialities', path: '/specialities' }, { name: 'General Medicine' }]
  },
  {
    path: '/specialities/pediatrics-neonatology',
    title: 'Pediatrics & Neonatology in Nirmal | Devibai Super Speciality Hospital',
    description: 'Compassionate pediatric healthcare, phototherapy warmers, neonatal intensive support, and childhood immunization schedules in Nirmal.',
    keywords: 'Pediatric hospital Nirmal, Newborn ICU Nirmal, Neonatology Nirmal, Child doctor Nirmal, Vaccination center Nirmal, Phototherapy Nirmal',
    image: `${BASE_URL}/assets/facilities/pediatric-care.jpg`,
    breadcrumbs: [{ name: 'Specialities', path: '/specialities' }, { name: 'Pediatrics & Neonatology' }]
  },
  {
    path: '/specialities/general-surgery',
    title: 'General Surgery in Nirmal | Devibai Super Speciality Hospital',
    description: 'Surgical management of appendicitis, hernias, gallbladder conditions, piles, fistula, trauma, and thyroid at Devibai Super Speciality Hospital.',
    keywords: 'General surgery Nirmal, Appendectomy Nirmal, Hernia surgery Nirmal, Piles doctor Nirmal, Fistula surgery Nirmal, Emergency surgery Nirmal',
    breadcrumbs: [{ name: 'Specialities', path: '/specialities' }, { name: 'General Surgery' }]
  },
  {
    path: '/specialities/laparoscopic-surgery',
    title: 'Advanced Laparoscopic Surgery in Nirmal | Keyhole Surgery Hospital',
    description: 'Minimally invasive keyhole laparoscopic procedures with rapid recovery, reduced pain, and minimal scarring performed by expert surgeons in Nirmal.',
    keywords: 'Laparoscopic surgery Nirmal, Keyhole surgery Nirmal, Laparoscopic appendectomy Nirmal, Laparoscopic cholecystectomy Nirmal, Laparoscopic hysterectomy Nirmal',
    image: `${BASE_URL}/assets/facilities/laparoscopic-surgery.jpg`,
    breadcrumbs: [{ name: 'Specialities', path: '/specialities' }, { name: 'Laparoscopic Surgery' }]
  },
  {
    path: '/specialities/urology',
    title: 'Urology Department in Nirmal | Devibai Super Speciality Hospital',
    description: 'Specialist urological consultations, kidney stone treatment, and prostate gland interventions by visiting consultant Dr. K. Ravichandra (MCh Urology).',
    keywords: 'Urology Nirmal, Kidney stone hospital Nirmal, Prostate treatment Nirmal, Urine blockage doctor Nirmal, Uro surgery Nirmal',
    breadcrumbs: [{ name: 'Specialities', path: '/specialities' }, { name: 'Urology' }]
  },
  {
    path: '/services',
    title: 'Clinical Healthcare Services | Devibai Super Speciality Hospital Nirmal',
    description: 'Comprehensive healthcare services: Fertility & IVF, Maternal & Delivery Care, Pediatrics, Surgery, Laparoscopy, 24/7 Emergency, and Smart ICU.',
    keywords: 'Hospital services Nirmal, IVF services Nirmal, Maternity delivery Nirmal, Pediatric ICU Nirmal, Laparoscopic surgery Nirmal, 24/7 emergency service Nirmal',
    breadcrumbs: [{ name: 'Clinical Services' }]
  },
  {
    path: '/services/fertility',
    title: 'Best Fertility Hospital & Centre in Nirmal | Devibai Hospital',
    description: 'Recognized as the best fertility hospital and top IVF center in Nirmal. Comprehensive fertility tests, IUI, IVF, and PCOD care under Dr. K. Chandrika at Devi Bai Hospital.',
    keywords: 'best fertility hospital in nirmal, best fertility center in nirmal, fertility clinic in nirmal, best ivf center in nirmal, devi bai hospital fertility, dr chandrika fertility nirmal, test tube baby center nirmal',
    image: `${BASE_URL}/assets/facilities/fertility-ivf-centre.jpg`,
    breadcrumbs: [{ name: 'Services', path: '/services' }, { name: 'Fertility & IVF' }]
  },
  {
    path: '/services/maternity',
    title: 'Maternal & Delivery Care in Nirmal | Devibai Super Speciality Hospital',
    description: 'Complete pregnancy care, continuous fetal CTG monitoring, safe normal delivery, and cesarean sections in Nirmal, Telangana.',
    keywords: 'Maternity care Nirmal, Delivery hospital Nirmal, Normal delivery Nirmal, Cesarean section Nirmal, CTG monitoring Nirmal',
    image: `${BASE_URL}/assets/facilities/maternal-fetal-monitoring.jpg`,
    breadcrumbs: [{ name: 'Services', path: '/services' }, { name: 'Maternal & Delivery Care' }]
  },
  {
    path: '/services/pediatric',
    title: 'Pediatric & Neonatal Services in Nirmal | Devibai Hospital',
    description: 'Healthcare for newborns, infants, and growing children with dedicated SNCU/PICU, phototherapy warmers, and complete vaccination schedules.',
    keywords: 'Pediatric services Nirmal, Child checkup Nirmal, Newborn care Nirmal, Pediatric phototherapy Nirmal, Infant vaccination Nirmal',
    image: `${BASE_URL}/assets/facilities/pediatric-care.jpg`,
    breadcrumbs: [{ name: 'Services', path: '/services' }, { name: 'Pediatric & Neonatal Services' }]
  },
  {
    path: '/services/surgical',
    title: 'Surgical Procedures & Operation Theatres | Devibai Hospital Nirmal',
    description: 'Modern sterile operating theatres for elective and emergency abdominal, general, gynecological, and trauma surgeries in Nirmal.',
    keywords: 'Operation theatre Nirmal, Surgical services Nirmal, Emergency surgery Nirmal, General surgery hospital Nirmal',
    image: `${BASE_URL}/assets/facilities/operation-theatres.jpg`,
    breadcrumbs: [{ name: 'Services', path: '/services' }, { name: 'Surgical Procedures' }]
  },
  {
    path: '/services/laparoscopic',
    title: 'Laparoscopic Surgical Care in Nirmal | Devibai Hospital',
    description: 'Minimally invasive laparoscopic surgery for gallbladder, appendix, hysterectomy, ovarian cysts, and hernias with rapid patient recovery.',
    keywords: 'Laparoscopic services Nirmal, Keyhole surgery Nirmal, Minimally invasive surgery Nirmal, Laparoscopy hospital Nirmal',
    image: `${BASE_URL}/assets/facilities/laparoscopic-surgery.jpg`,
    breadcrumbs: [{ name: 'Services', path: '/services' }, { name: 'Laparoscopic Care' }]
  },
  {
    path: '/services/emergency',
    title: '24/7 Emergency Medical Services in Nirmal | Devibai Hospital',
    description: 'Round-the-clock emergency medical desk, trauma stabilization, poisoning resuscitation, and ambulance coordination in Nirmal. Call 9092916222.',
    keywords: '24/7 Emergency Nirmal, Ambulance Nirmal, Accident hospital Nirmal, Trauma service Nirmal, Poisoning hospital Nirmal, Emergency desk 9092916222',
    image: `${BASE_URL}/assets/facilities/emergency-trauma-care.jpg`,
    breadcrumbs: [{ name: 'Services', path: '/services' }, { name: 'Emergency Care' }]
  },
  {
    path: '/services/critical-care',
    title: 'Smart ICU & Critical Care Services in Nirmal | Devibai Hospital',
    description: 'Continuous hemodynamic monitoring, mechanical ventilators, septic shock protocols, and acute critical care physician supervision.',
    keywords: 'Smart ICU Nirmal, Ventilator hospital Nirmal, Critical care Nirmal, ICU bed Nirmal, Heart attack ICU Nirmal, Stroke ICU Nirmal',
    image: `${BASE_URL}/assets/facilities/smart-icu.jpg`,
    breadcrumbs: [{ name: 'Services', path: '/services' }, { name: 'Critical Care (ICU)' }]
  },
  {
    path: '/facilities',
    title: 'Hospital Facilities & Infrastructure | Devibai Super Speciality Hospital Nirmal',
    description: 'Explore the infrastructure at Devibai Hospital Nirmal: 24/7 Emergency Room, Smart ICU, Round-the-Clock Pharmacy, Diagnostic Laboratory, and OTs.',
    keywords: 'Hospital facilities Nirmal, ICU Nirmal, 24/7 Pharmacy Nirmal, diagnostic laboratory Nirmal, operation theatre Nirmal, hospital infrastructure Nirmal',
    breadcrumbs: [{ name: 'Facilities' }]
  },
  {
    path: '/insurance',
    title: 'Insurance & Healthcare Schemes | Devibai Super Speciality Hospital Nirmal',
    description: 'Information on health insurance, cashless TPAs, and government schemes supported at Devibai Hospital in Nirmal, including Rajiv Aarogyasri and Telangana EHS.',
    keywords: 'Health insurance hospital Nirmal, cashless hospital Nirmal, ICICI Lombard Nirmal, Star Health Nirmal, Aditya Birla Health Nirmal, mediclaim hospital Nirmal',
    breadcrumbs: [{ name: 'Insurance & Schemes' }]
  },
  {
    path: '/arogyasri',
    title: 'Rajiv Aarogyasri Healthcare Scheme in Nirmal | Devibai Hospital',
    description: 'Rajiv Aarogyasri healthcare scheme services at Devibai Super Speciality Hospital in Nirmal, Telangana. Cashless treatment assistance, EHS eligibility, and desk.',
    keywords: 'Aarogyasri hospital Nirmal, Rajiv Aarogyasri Telangana, EHS cashless hospital Nirmal, free treatment hospital Nirmal, Aarogyasri empanelled hospital Nirmal',
    image: `${BASE_URL}/assets/insurance/aarogyasri.png`,
    breadcrumbs: [{ name: 'Insurance', path: '/insurance' }, { name: 'Rajiv Aarogyasri' }],
    schema: {
      '@type': 'GovernmentService',
      name: 'Rajiv Aarogyasri Health Scheme Desk - Devibai Hospital Nirmal',
      serviceType: 'Public Healthcare Financial Protection Scheme',
      provider: {
        '@type': 'Hospital',
        name: 'Devibai Super Speciality Hospital',
        url: BASE_URL
      }
    }
  },
  {
    path: '/gallery',
    title: 'Hospital Photo Gallery | Devibai Super Speciality Hospital Nirmal',
    description: 'Official gallery of Devibai Super Speciality Hospital in Nirmal: comprehensive photo archive of clinical facilities, modular operating theatres, IVF centre, and team.',
    keywords: 'Devibai hospital photos, hospital pictures Nirmal, fertility centre photo gallery, operation theatre pictures Nirmal, medical facilities photos',
    breadcrumbs: [{ name: 'Hospital Gallery' }]
  },
  {
    path: '/appointment',
    title: 'Book Doctor Appointment Online | Devibai Super Speciality Hospital Nirmal',
    description: 'Request an appointment with our specialist doctors at Devibai Super Speciality Hospital, Nirmal. Consultations in fertility, maternity, pediatrics, surgery, and medicine.',
    keywords: 'Book doctor appointment Nirmal, Devibai hospital appointment booking, OPD doctor Nirmal, doctor consultation Nirmal, consult Dr Chandrika Nirmal',
    breadcrumbs: [{ name: 'Book Appointment' }]
  },
  {
    path: '/contact',
    title: 'Contact DeviBai Super Speciality Hospital | Location & Directions',
    description: 'Contact Devi Bai Super Speciality Hospital (Devibai Hospital) in Nirmal, Telangana. Located beside DS Mart, Mancherial Road. 24/7 Phone: 9092916222, WhatsApp: 9092915222.',
    keywords: 'devi bai hospital contact number, devibai super speciality hospital nirmal phone, devi bhai hospital nirmal, hospital beside ds mart mancherial road nirmal, best hospital in nirmal phone',
    breadcrumbs: [{ name: 'Contact & Directions' }]
  },
  {
    path: '/emergency',
    title: '24/7 Emergency Hospital in Nirmal | Devi Bai Super Speciality Hospital',
    description: 'Devibai Super Speciality Hospital (Devi Bai Hospital) provides 24/7 emergency & critical care in Nirmal. Immediate trauma care, poisoning resuscitation, ICU ventilators & ambulance. Call 9092916222.',
    keywords: 'best hospital in nirmal, 24/7 emergency hospital nirmal, devi bai hospital emergency, devi bai super specility hospital nirmal, trauma hospital nirmal, icu ventilator nirmal, devi bhai hospital nirmal',
    image: `${BASE_URL}/assets/facilities/emergency-trauma-care.jpg`,
    breadcrumbs: [{ name: '24/7 Emergency & Critical Care' }],
    schema: {
      '@type': 'EmergencyService',
      '@id': `${BASE_URL}/emergency#service`,
      name: '24/7 Emergency Department - Devi Bai Super Speciality Hospital',
      telephone: '+919092916222',
      url: `${BASE_URL}/emergency`
    }
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Devibai Super Speciality Hospital Nirmal',
    description: 'Privacy policy and patient health information handling protocols for Devibai Super Speciality Hospital in Nirmal, Telangana.',
    breadcrumbs: [{ name: 'Privacy Policy' }]
  },
  {
    path: '/terms',
    title: 'Terms & Conditions | Devibai Super Speciality Hospital Nirmal',
    description: 'Terms of website use, medical disclaimer, and emergency guidance for Devibai Super Speciality Hospital, Nirmal.',
    breadcrumbs: [{ name: 'Terms & Conditions' }]
  }
];

function generateBreadcrumbSchema(items) {
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
    '@type': 'BreadcrumbList',
    itemListElement
  };
}

console.log(`Starting Advanced SEO Pre-rendering for ${ROUTES.length} routes...`);

let generatedCount = 0;

for (const route of ROUTES) {
  const canonicalUrl = `${BASE_URL}${route.path === '/' ? '/' : route.path}`;
  const fullImageUrl = route.image ? (route.image.startsWith('http') ? route.image : `${BASE_URL}${route.image}`) : HOSPITAL_INFO.defaultImage;

  let pageHtml = baseHtmlTemplate;

  // 1. Replace Title
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
  pageHtml = pageHtml.replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${route.title}" />`);

  // 2. Replace Description
  pageHtml = pageHtml.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.description}" />`);

  // 3. Replace Keywords
  if (route.keywords) {
    pageHtml = pageHtml.replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${route.keywords}" />`);
  }

  // 4. Replace Canonical URL
  pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 5. Replace Open Graph
  pageHtml = pageHtml.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  pageHtml = pageHtml.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`);
  pageHtml = pageHtml.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.description}" />`);
  pageHtml = pageHtml.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${fullImageUrl}" />`);
  pageHtml = pageHtml.replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="${route.type || 'website'}" />`);

  // 6. Replace Twitter
  pageHtml = pageHtml.replace(/<meta property="twitter:url" content=".*?" \/>/, `<meta property="twitter:url" content="${canonicalUrl}" />`);
  pageHtml = pageHtml.replace(/<meta property="twitter:title" content=".*?" \/>/, `<meta property="twitter:title" content="${route.title}" />`);
  pageHtml = pageHtml.replace(/<meta property="twitter:description" content=".*?" \/>/, `<meta property="twitter:description" content="${route.description}" />`);
  pageHtml = pageHtml.replace(/<meta property="twitter:image" content=".*?" \/>/, `<meta property="twitter:image" content="${fullImageUrl}" />`);

  // 7. Inject Page-Specific Structured Data Schema Graph
  const graphItems = [];

  if (route.breadcrumbs && route.breadcrumbs.length > 0) {
    graphItems.push(generateBreadcrumbSchema(route.breadcrumbs, canonicalUrl));
  }

  if (route.schema) {
    if (Array.isArray(route.schema)) {
      graphItems.push(...route.schema);
    } else {
      graphItems.push(route.schema);
    }
  }

  if (graphItems.length > 0) {
    const sanitizedItems = graphItems.map(item => {
      const { '@context': _, ...rest } = item;
      return rest;
    });

    const pageSchemaJson = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': sanitizedItems
    }, null, 2);

    const schemaScriptTag = `\n    <!-- Page-Specific Structured Data JSON-LD -->\n    <script id="page-schema-ld-json" type="application/ld+json">\n${pageSchemaJson}\n    </script>\n  </head>`;
    pageHtml = pageHtml.replace('</head>', schemaScriptTag);
  }

  // 8. Determine destination directory & save file
  if (route.path === '/') {
    fs.writeFileSync(BASE_HTML_PATH, pageHtml, 'utf8');
  } else {
    const cleanPath = route.path.replace(/^\//, '');
    const routeDir = path.join(DIST_DIR, cleanPath);
    fs.mkdirSync(routeDir, { recursive: true });
    const targetFile = path.join(routeDir, 'index.html');
    fs.writeFileSync(targetFile, pageHtml, 'utf8');

    // Also write clean-path.html (e.g. dist/contact.html) so static hosting directly resolves clean URLs without trailing slashes
    const htmlFile = path.join(DIST_DIR, `${cleanPath}.html`);
    const htmlDir = path.dirname(htmlFile);
    if (!fs.existsSync(htmlDir)) {
      fs.mkdirSync(htmlDir, { recursive: true });
    }
    fs.writeFileSync(htmlFile, pageHtml, 'utf8');
  }

  generatedCount++;
}

console.log(`Successfully pre-rendered static SEO HTML for ${generatedCount} pages!`);
