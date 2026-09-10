import { Speciality } from '../types';

export const SPECIALITIES: Speciality[] = [
  {
    id: "fertility-ivf",
    slug: "fertility-ivf",
    title: "Fertility & IVF",
    shortDesc: "Personalized fertility care and assisted reproductive technologies designed around your family journey.",
    fullDesc: "Dr. Chandrika's Fertility (IVF) & Laparoscopic Centre at Devibai Super Speciality Hospital offers compassionate, evidence-based reproductive care. From comprehensive hormonal evaluations to advanced ART protocols, our dedicated department provides tailored care for couples aspiring to parenthood.",
    iconName: "HeartPulse",
    treatments: [
      "Ovulation Induction (OI)",
      "Intra Uterine Insemination (IUI)",
      "In Vitro Fertilization (IVF)",
      "Treatment for PCOD and Hormonal Imbalance",
      "Follicular Tracking and Monitoring",
      "Fertility Counseling & Diagnostics"
    ],
    doctorIds: ["dr-k-chandrika"],
    highlights: [
      "Specialist with Diploma in ART (Germany)",
      "Dedicated fertility consultation and procedures",
      "Evidence-based, ethical reproductive care",
      "Personalized treatment protocols without generic promises"
    ]
  },
  {
    id: "obstetrics-gynecology",
    slug: "obstetrics-gynecology",
    title: "Obstetrics & Gynecology",
    shortDesc: "Complete maternal care, high-risk pregnancy monitoring, and comprehensive women's health services.",
    fullDesc: "Our Obstetrics & Gynecology department provides holistic care for women through all phases of life. We support expecting mothers with prenatal counseling, fetal monitoring, normal deliveries, and cesarean sections, alongside sensitive clinical management of gynecological conditions.",
    iconName: "Baby",
    treatments: [
      "Normal Delivery & Cesarean Section",
      "High-Risk Pregnancy Care",
      "Continuous Fetal Monitoring (CTG)",
      "Management of Fibroids & Ovarian Cysts",
      "Treatment for Irregular Periods & Excessive Bleeding",
      "Care for PCOD, PID and Gynecological Infections"
    ],
    doctorIds: ["dr-k-chandrika"],
    highlights: [
      "Fellowship in Infertility & DNB OBGY (Fernandez Hospital)",
      "Continuous fetal heart rate & uterine monitoring (CTG)",
      "Sensitive and confidential women's healthcare",
      "Modern delivery suite and operating facilities"
    ]
  },
  {
    id: "general-medicine",
    slug: "general-medicine",
    title: "General Medicine",
    shortDesc: "Consultant physician care, internal medicine, advanced diabetology, and multi-system illness management.",
    fullDesc: "The General Medicine department provides thorough clinical evaluation, diagnosis, and management of adult health conditions. Led by Consultant Physician and Diabetologist Dr. Prashant Kumar Waghmare, the department handles complex metabolic disorders, chronic lifestyle conditions, and acute infectious diseases.",
    iconName: "Stethoscope",
    treatments: [
      "Diabetes Mellitus Diagnosis and Comprehensive Care",
      "Hypertension and Cardiovascular Risk Management",
      "Infectious Diseases (Dengue, Malaria, Typhoid)",
      "Jaundice, Liver Cirrhosis & Hepatic Conditions",
      "Kidney & Renal Health Evaluation",
      "Adult Immunizations and General Health Checkups"
    ],
    doctorIds: ["dr-prashant-kumar-waghmare"],
    highlights: [
      "Led by MD Physician & Diabetologist",
      "Integrated 24/7 emergency and critical care support",
      "In-house 24/7 laboratory for rapid diagnostic results",
      "Individualized long-term disease management plans"
    ]
  },
  {
    id: "pediatrics-neonatology",
    slug: "pediatrics-neonatology",
    title: "Pediatrics & Neonatology",
    shortDesc: "Specialized clinical care for newborns, premature infants, and children through all stages of growth.",
    fullDesc: "Our Pediatrics & Neonatology department is dedicated to the health and well-being of infants, children, and adolescents. Led by Dr. Sudheer Kumar G (Fellowship in Neonatology, IAP Delhi), the department combines clinical gentleness with critical care equipment including phototherapy, warmers, and specialized feeding rooms.",
    iconName: "ShieldCheck",
    treatments: [
      "Newborn Care & Premature Baby Care",
      "Neonatal Intensive Care Support (PICU / SNCU)",
      "Phototherapy & Radiant Warmers for Jaundice & Thermal Care",
      "Nebulization Facility for Asthma and Respiratory Distress",
      "Childhood Fevers, Cough, Pneumonia, Diarrhea & Vomiting",
      "Childhood Diabetes & Congenital Heart Condition Evaluation",
      "Vaccination & Complete Immunization for All Ages",
      "Growth Monitoring, Weight Gain & Developmental Support"
    ],
    doctorIds: ["dr-sudheer-kumar-g"],
    highlights: [
      "Specialist with Fellowship in Neonatology (IAP Delhi)",
      "Dedicated Mother & Infant Feeding Room",
      "Equipped with Radiant Warmers & Phototherapy Units",
      "24/7 Pediatric emergency consultation availability"
    ]
  },
  {
    id: "general-surgery",
    slug: "general-surgery",
    title: "General Surgery",
    shortDesc: "Expert open and operative surgical procedures for acute and elective surgical conditions.",
    fullDesc: "Our General Surgery department provides precise surgical management for abdominal, endocrine, and soft-tissue conditions. Under Dr. K. Avinash Kasamwar, we perform both planned elective surgeries and emergent interventions for trauma, intestinal perforation, and acute abdominal pain.",
    iconName: "Activity",
    treatments: [
      "Appendectomy (Open & Laparoscopic)",
      "Hernia Repair (Inguinal, Umbilical, Incisional)",
      "Hysterectomy (Surgical Uterine Removal)",
      "Thyroid Surgeries",
      "Breast Surgeries & Lump Excisions",
      "Piles and Fistula Procedures (including Laser Treatments)",
      "Emergency Surgery for Intestinal Perforation & Obstruction"
    ],
    doctorIds: ["dr-k-avinash-kasamwar"],
    highlights: [
      "Experienced MS General Surgeon leadership",
      "Fully equipped modern operating theatre (OT)",
      "Round-the-clock emergency surgical readiness",
      "Post-operative monitoring and surgical recovery care"
    ]
  },
  {
    id: "laparoscopic-surgery",
    slug: "laparoscopic-surgery",
    title: "Laparoscopic Surgery",
    shortDesc: "Minimally invasive keyhole surgical techniques for faster clinical recovery and reduced tissue trauma.",
    fullDesc: "Laparoscopic surgery uses small keyhole incisions and high-definition optical guidance to perform delicate abdominal and gynecological operations. When clinically appropriate, laparoscopic approaches significantly reduce surgical trauma, minimize post-operative discomfort, and support timely patient recovery.",
    iconName: "Sparkles",
    treatments: [
      "Laparoscopic Cholecystectomy (Gallbladder Removal)",
      "Laparoscopic Appendectomy",
      "Laparoscopic Hysterectomy",
      "Laparoscopic Myomectomy (Fibroid Removal)",
      "Laparoscopic Cystectomy (Ovarian Cyst Removal)",
      "Laparoscopic Tubectomy",
      "Laparoscopic Ovarian Drilling (for resistant PCOD)"
    ],
    doctorIds: ["dr-k-avinash-kasamwar", "dr-k-chandrika"],
    highlights: [
      "Advanced laparoscopic equipment and imaging",
      "Minimally invasive approach when clinically indicated",
      "Smaller incisions with focused tissue preservation",
      "Collaborative surgical team across general surgery and gynecology"
    ]
  },
  {
    id: "urology",
    slug: "urology",
    title: "Urology",
    shortDesc: "Specialized clinical diagnosis and management of urinary tract disorders, kidney stones, and prostate health.",
    fullDesc: "Our Urology service provides comprehensive assessment and treatment for conditions affecting the kidneys, ureters, bladder, and prostate gland. Visiting Consultant Dr. K. Ravichandra (MCh Urology) conducts evaluations for kidney stones, prostate enlargement, and urinary complications.",
    iconName: "Crosshair",
    treatments: [
      "Kidney Stone Evaluation and Treatment",
      "Prostate Gland Disorders & Interventions",
      "Urinary Tract Obstruction Management",
      "Varicose Veins & Vascular Support Evaluations",
      "Specialist Urological Consultations"
    ],
    doctorIds: ["dr-k-ravichandra"],
    highlights: [
      "Super-specialist visiting consultant (MCh Urology)",
      "Modern diagnostic support for stone disease",
      "Tailored treatment plans for prostate conditions",
      "Scheduled visiting clinics with advance booking"
    ]
  },
  {
    id: "emergency-critical-care",
    slug: "emergency-critical-care",
    title: "Emergency & Critical Care",
    shortDesc: "24/7 rapid medical response for trauma, poisoning, cardiac emergencies, and intensive Smart ICU monitoring.",
    fullDesc: "When every second matters, Devibai Super Speciality Hospital's Emergency & Critical Care unit delivers immediate resuscitation and continuous life-support care. Operating 24 hours a day, 365 days a year, the department handles acute trauma, respiratory failure, stroke, and septic shock with advanced ventilator support.",
    iconName: "AlertTriangle",
    treatments: [
      "Accident & Severe Trauma Stabilization",
      "Poisoning and Toxic Ingestion Management",
      "Septic Shock and Multi-Organ Failure Resuscitation",
      "Continuous Ventilator Support & Mechanical Ventilation",
      "Emergency Dialysis Coordination",
      "Acute Respiratory Failure & Pneumonia Support",
      "Cardiac Emergencies (Heart Attack / MI / Chest Pain / Heart Failure)",
      "Brain Stroke / Paralysis Emergency Management"
    ],
    doctorIds: ["dr-prashant-kumar-waghmare", "dr-k-avinash-kasamwar"],
    highlights: [
      "Always open: 24/7/365 Emergency department",
      "Smart ICU with continuous multipara monitoring & ventilators",
      "Immediate emergency phone helpline: 8885558061",
      "Coordinated with 24/7 pharmacy and laboratory"
    ]
  }
];
