import { Facility } from '../types';

export const FACILITIES: Facility[] = [
  {
    id: "24-7-emergency",
    title: "24/7 Emergency Department",
    badge: "Always Open",
    shortDesc: "Round-the-clock emergency triage and acute resuscitation for trauma, medical, and surgical crises.",
    fullDesc: "Our emergency room operates continuously with dedicated medical personnel, life-support equipment, and immediate diagnostic support. We provide rapid stabilization for accident trauma, poisoning, cardiac episodes, and severe infections.",
    features: [
      "Open 24 hours a day, 7 days a week, 365 days a year",
      "Immediate trauma and acute resuscitation bay",
      "Direct emergency hotline (8885558061)",
      "Continuous triage and rapid stabilization protocols"
    ],
    image: "/assets/facilities/emergency-trauma-care.jpg"
  },
  {
    id: "smart-icu",
    title: "Smart ICU & Critical Care Unit",
    badge: "Continuous Monitoring",
    shortDesc: "Advanced intensive care facility equipped with mechanical ventilators and multiparameter monitoring.",
    fullDesc: "Supervised by Critical Care Specialist Dr. Prashant Kumar Waghmare, our Smart ICU delivers round-the-clock intensive life-support, hemodynamic monitoring, and invasive ventilation for critically ill patients.",
    features: [
      "Advanced mechanical ventilators for respiratory support",
      "Continuous multipara physiological vitals monitoring",
      "Septic shock resuscitation protocols",
      "Post-operative high-dependency observation"
    ],
    image: "/assets/facilities/smart-icu.jpg"
  },
  {
    id: "24-7-pharmacy",
    title: "24/7 In-House Pharmacy",
    badge: "Round-the-Clock",
    shortDesc: "Fully stocked hospital pharmacy providing genuine medications and emergency surgical consumables at all hours.",
    fullDesc: "Patients and families have seamless 24/7 access to authentic prescription medications, emergency injectables, neonatal formulations, and surgical consumables without needing to travel outside during night hours.",
    features: [
      "Round-the-clock dispensing for emergency and inpatient care",
      "Comprehensive stock of pediatric, maternal, and critical care medicines",
      "Strict temperature-controlled medication storage",
      "Direct coordination with hospital doctors and nursing staff"
    ],
    image: "/assets/facilities/pharmacy-24-7.jpg"
  },
  {
    id: "24-7-laboratory",
    title: "24/7 Diagnostic Laboratory",
    badge: "Rapid Evaluation",
    shortDesc: "On-site diagnostic pathology and biochemistry laboratory delivering timely clinical test results.",
    fullDesc: "Fast, accurate diagnostics are critical for medical emergencies and inpatient management. Our round-the-clock laboratory performs blood counts, biochemistry profiles, electrolytes, infection panels, and cardiac markers.",
    features: [
      "24/7 diagnostic testing for urgent emergency and ICU decisions",
      "Hematology, biochemistry, and infection serology panels",
      "Routine prenatal, maternal, and pediatric screening tests",
      "Quality-assured testing procedures and fast turnarounds"
    ],
    image: "/assets/branding/hospital-header-brand.jpg"
  },
  {
    id: "fertility-centre",
    title: "Fertility & IVF Centre",
    badge: "Specialized Centre",
    shortDesc: "Dedicated centre for fertility counseling, ovulation induction, IUI, and assisted reproductive procedures.",
    fullDesc: "Dr. Chandrika's Fertility (IVF) & Laparoscopic Centre provides a private, supportive clinical environment where couples receive personalized evaluations, follicular monitoring, and evidence-based reproductive care.",
    features: [
      "Private fertility consultation and ultrasound monitoring suite",
      "Ovulation induction and IUI preparation facilities",
      "Advanced ART guidance and care protocols",
      "Compassionate, confidential patient environment"
    ],
    image: "/assets/facilities/fertility-ivf-centre.jpg"
  },
  {
    id: "maternity-suite",
    title: "Maternal & Delivery Suites",
    badge: "Maternal Care",
    shortDesc: "Comfortable labor suites, continuous CTG fetal monitoring, and emergency surgical delivery readiness.",
    fullDesc: "Designed to ensure a safe, dignified childbirth experience, our maternal facility includes dedicated labor rooms, electronic cardiotocography (CTG) monitoring, and instant access to the operating theatre if surgical delivery becomes necessary.",
    features: [
      "Continuous electronic fetal heart rate monitoring (CTG)",
      "Normal delivery suites and recovery bays",
      "Immediate surgical readiness for cesarean sections",
      "High-risk antenatal and postnatal monitoring"
    ],
    image: "/assets/facilities/maternal-fetal-monitoring.jpg"
  },
  {
    id: "pediatric-unit",
    title: "Pediatric & Neonatal Care Unit",
    badge: "Child-Friendly",
    shortDesc: "Equipped with radiant warmers, phototherapy, nebulization facility, and dedicated feeding rooms.",
    fullDesc: "Our pediatric infrastructure caters to the vulnerable medical needs of newborns and children. Equipped with radiant warmers, infant phototherapy units for jaundice, and a calm mother-baby feeding room.",
    features: [
      "Radiant warmers and infant temperature control",
      "Phototherapy units for neonatal hyperbilirubinemia",
      "Dedicated mother and child feeding room",
      "Pediatric nebulization and respiratory support area"
    ],
    image: "/assets/facilities/pediatric-neonatal-care.jpg"
  },
  {
    id: "operation-theatre",
    title: "Advanced Operating Theatres",
    badge: "Sterile & Equipped",
    shortDesc: "Modern surgical theatres equipped for laparoscopic minimally invasive and open surgical interventions.",
    fullDesc: "Our operating theatres adhere to strict infection control and sterility protocols, equipped with modern anesthesia workstations, laparoscopic surgical towers, and surgical lighting to perform abdominal, gynecological, and emergency procedures.",
    features: [
      "Modern laparoscopic video towers and instruments",
      "Sterile operating environment with specialized surgical lighting",
      "Anesthesia workstations and continuous vital monitoring",
      "Prepared for planned elective and emergency surgical cases"
    ],
    image: "/assets/facilities/laparoscopic-surgery-ot.jpg"
  }
];
