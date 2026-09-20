import { HospitalService } from '../types';

export const SERVICES: HospitalService[] = [
  {
    id: "fertility",
    slug: "fertility",
    title: "Fertility & IVF Services",
    category: "Reproductive Medicine",
    shortDesc: "Individualized fertility assessments, ovulation induction, IUI, and IVF care under specialist guidance.",
    fullDesc: "Dr. Chandrika's Fertility (IVF) & Laparoscopic Centre provides a comprehensive suite of fertility investigations and assisted reproductive options. We emphasize honest clinical assessments, clear communication, and personalized plans tailored to each couple's medical history.",
    features: [
      "Ovulation Induction (OI) protocols",
      "Intra Uterine Insemination (IUI)",
      "In Vitro Fertilization (IVF)",
      "Evidence-based clinical care for PCOD / PCOS",
      "Management of Endocrine & Hormonal Imbalance",
      "Follicular monitoring and ultrasound evaluation"
    ],
    conditionsTreated: [
      "Primary & Secondary Infertility",
      "Polycystic Ovarian Syndrome (PCOD/PCOS)",
      "Anovulatory Infertility",
      "Hormonal Imbalances & Thyroid-related Infertility",
      "Luteal Phase Defect"
    ],
    image: "/assets/facilities/fertility-ivf-centre.jpg"
  },
  {
    id: "maternity",
    slug: "maternity",
    title: "Maternal & Delivery Care",
    category: "Women's Health",
    shortDesc: "Complete pregnancy care, continuous fetal CTG monitoring, normal delivery, and cesarean sections.",
    fullDesc: "Our maternal care unit supports mothers before, during, and after childbirth. We offer dedicated antenatal assessments, continuous cardiotocography (CTG) for fetal well-being, safe normal delivery suites, and emergency cesarean section capabilities.",
    features: [
      "Normal Delivery (Spontaneous vaginal delivery care)",
      "Cesarean Section (Planned and emergency surgical deliveries)",
      "Specialized High-Risk Pregnancy management",
      "Continuous Fetal Heart & Contraction Monitoring (CTG)",
      "Postnatal recovery care and maternal support",
      "Gynecological care for Fibroids, Ovarian Cysts, and Irregular Bleeding"
    ],
    conditionsTreated: [
      "High-Risk Pregnancies (Gestational Diabetes, PIH)",
      "Uterine Fibroids",
      "Ovarian Cysts",
      "Irregular Menstrual Cycles & Menorrhagia",
      "Pelvic Inflammatory Disease (PID)"
    ],
    image: "/assets/facilities/maternal-fetal-monitoring.jpg"
  },
  {
    id: "pediatric",
    slug: "pediatric",
    title: "Pediatric & Neonatal Services",
    category: "Child Healthcare",
    shortDesc: "Compassionate healthcare for newborns, infants, and growing children with dedicated newborn support.",
    fullDesc: "Under Dr. Sudheer Kumar G (Fellowship in Neonatology, IAP Delhi), our pediatric unit provides attentive medical management for pediatric illnesses, routine checkups, immunization, and high-dependency care for fragile newborns.",
    features: [
      "Specialized Newborn & Premature baby care",
      "Neonatal & Pediatric Intensive Care (PICU / SNCU)",
      "Radiant Warmers and Phototherapy units",
      "Nebulization services for childhood respiratory distress",
      "Complete vaccination schedules for all age groups",
      "Dedicated Mother & Infant Feeding Room",
      "Child growth, weight gain, and nutritional monitoring"
    ],
    conditionsTreated: [
      "Pediatric Fevers, Dengue, Malaria, and Typhoid",
      "Acute Bronchiolitis, Asthma & Pneumonia",
      "Neonatal Jaundice & Low Birth Weight Care",
      "Childhood Diarrhea, Dehydration & Vomiting",
      "Childhood Diabetes & Seizure Disorders"
    ],
    image: "/assets/facilities/pediatric-neonatal-care.jpg"
  },
  {
    id: "surgical",
    slug: "surgical",
    title: "Advanced Surgical Services",
    category: "Surgical Care",
    shortDesc: "Safe, specialist-led surgical procedures for abdominal, thyroid, breast, and anorectal conditions.",
    fullDesc: "Our surgical department delivers comprehensive operative solutions for acute conditions and elective procedures. Guided by Dr. K. Avinash Kasamwar, our surgical theater is equipped for strict sterility, surgical safety, and vigilant post-operative recovery.",
    features: [
      "Appendectomy (Emergency and planned)",
      "Hernia Repair (Inguinal, Umbilical, Ventral)",
      "Hysterectomy (Uterine surgery)",
      "Thyroidectomy & Thyroid nodule procedures",
      "Breast Surgery (Fibroadenoma excisions, mass removals)",
      "Piles and Fistula surgeries with Laser care options",
      "Urgent surgery for Intestinal Perforation & Obstruction"
    ],
    conditionsTreated: [
      "Acute Appendicitis",
      "Complicated & Uncomplicated Hernias",
      "Uterine Pathologies & Pelvic Masses",
      "Thyroid Swellings & Goitre",
      "Anorectal conditions: Hemorrhoids / Piles / Fistula",
      "Peritonitis & Bowel Obstructions"
    ],
    image: "/assets/facilities/laparoscopic-surgery-ot.jpg"
  },
  {
    id: "laparoscopic",
    slug: "laparoscopic",
    title: "Minimally Invasive Laparoscopy",
    category: "Keyhole Surgery",
    shortDesc: "Advanced keyhole surgeries with precision optics, smaller incisions, and clinically appropriate application.",
    fullDesc: "Laparoscopic surgery allows our surgeons to operate inside the abdomen through micro incisions using high-resolution video optics. We employ laparoscopy for gallbladder removal, appendectomy, gynecological cysts, and hysterectomies when clinically appropriate.",
    features: [
      "Laparoscopic Cholecystectomy (Gallbladder stone removal)",
      "Laparoscopic Appendectomy",
      "Laparoscopic Hysterectomy (Keyhole uterine removal)",
      "Laparoscopic Cystectomy (Ovarian cyst excision)",
      "Laparoscopic Myomectomy (Fibroid excision)",
      "Laparoscopic Tubectomy",
      "Laparoscopic Ovarian Drilling (LOD for PCOD)"
    ],
    conditionsTreated: [
      "Gallstones (Cholelithiasis) & Cholecystitis",
      "Appendicitis",
      "Ovarian Cysts & Endometriomas",
      "Uterine Fibroids",
      "Resistant Polycystic Ovarian Syndrome (PCOD)"
    ],
    image: "/assets/facilities/laparoscopic-surgery-ot.jpg"
  },
  {
    id: "emergency",
    slug: "emergency",
    title: "24/7 Emergency Care",
    category: "Emergency Medicine",
    shortDesc: "Round-the-clock emergency medical response for trauma, accidents, poisoning, and acute collapse.",
    fullDesc: "Our 24/7 Emergency Department provides continuous medical readiness for sudden medical, surgical, and trauma crises. Backed by immediate telephone accessibility, experienced medical personnel, emergency dialysis coordination, and an on-site laboratory, we stabilize critical patients rapidly.",
    features: [
      "24/7/365 Emergency room readiness",
      "Immediate trauma and accident resuscitation",
      "Poisoning and chemical intoxication management",
      "Stroke / Paralysis acute stabilization",
      "Heart attack (MI) and chest pain immediate response",
      "Direct emergency phone access: 8885558061"
    ],
    conditionsTreated: [
      "Road Traffic Accidents & Blunt / Penetrating Trauma",
      "Pesticide & Unknown Substance Poisoning",
      "Acute Myocardial Infarction & Severe Angina",
      "Acute Ischemic / Hemorrhagic Stroke",
      "Status Epilepticus / Fits",
      "Acute Respiratory Failure & Pneumonia"
    ],
    image: "/assets/facilities/emergency-trauma-care.jpg"
  },
  {
    id: "critical-care",
    slug: "critical-care",
    title: "Critical Care & Smart ICU",
    category: "Intensive Care",
    shortDesc: "Continuous multi-parameter monitoring, invasive ventilator support, and septic shock resuscitation.",
    fullDesc: "Our Smart ICU is engineered to support patients facing life-threatening organ dysfunction. Supervised by Dr. Prashant Kumar Waghmare (MD General Medicine, Critical Care Specialist), the unit provides mechanical ventilation, hemodynamic monitoring, and rigorous sepsis control.",
    features: [
      "Continuous multiparameter cardiac and vitals monitoring",
      "Advanced mechanical ventilator support",
      "Septic shock resuscitation protocols",
      "Continuous arterial & central venous hemodynamic monitoring",
      "Emergency dialysis support coordination",
      "Post-operative high-dependency critical recovery"
    ],
    conditionsTreated: [
      "Septic Shock & Severe Sepsis",
      "Acute Respiratory Distress Syndrome (ARDS) & Failure",
      "Cardiogenic Shock & Decompensated Heart Failure",
      "Coma and Severe Neurological Impairment",
      "Severe Metabolic Acidosis & Organ Collapse"
    ],
    image: "/assets/facilities/smart-icu.jpg"
  }
];
