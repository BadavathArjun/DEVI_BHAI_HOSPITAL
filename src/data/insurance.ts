import { InsuranceProvider } from '../types';

export const INSURANCE_DISCLAIMER = "Insurance and healthcare scheme availability is subject to eligibility, policy terms and hospital/TPA authorization. Please contact the hospital for current details.";

export const INSURANCE_PROVIDERS: InsuranceProvider[] = [
  {
    id: "aarogyasri",
    name: "Rajiv Aarogyasri",
    teluguName: "రాజీవ్ ఆరోగ్యశ్రీ",
    logo: "/assets/insurance/aarogyasri.png",
    type: "government",
    notes: "Flagship Telangana Government community health scheme shown on hospital panel. Coverage and eligibility subject to active card status and scheme guidelines."
  },
  {
    id: "aditya-birla",
    name: "Aditya Birla Health",
    teluguName: "ఆదిత్య బిర్లా హెల్త్",
    logo: "/assets/insurance/aditya-birla.png",
    type: "private",
    notes: "Private health insurance partner displayed in hospital network. Pre-authorization required for cashless hospitalization."
  },
  {
    id: "ericson",
    name: "Ericson Insurance TPA Pvt. Ltd.",
    teluguName: "ఎరిక్సన్ ఇన్సూరెన్స్ టిపిఎ",
    logo: "/assets/insurance/ericson.png",
    type: "tpa",
    notes: "Authorized Third Party Administrator (TPA) for cashless medical claims processing."
  },
  {
    id: "akna",
    name: "AKNA Health Insurance TPA Pvt. Ltd.",
    teluguName: "అక్నా హెల్త్ ఇన్సూరెన్స్ టిపిఎ",
    logo: "/assets/insurance/akna.png",
    type: "tpa",
    notes: "Third Party Administrator partner facilitating health claim authorizations."
  },
  {
    id: "galaxy",
    name: "Galaxy Health Insurance",
    teluguName: "గెలాక్సీ హెల్త్ ఇన్సూరెన్స్",
    logo: "/assets/insurance/galaxy.png",
    type: "private",
    notes: "Health insurance partner recognized on the hospital panel."
  },
  {
    id: "volo",
    name: "Volo Health",
    teluguName: "వోలో హెల్త్",
    logo: "/assets/insurance/volo.png",
    type: "tpa",
    notes: "TPA & healthcare administration network displayed in hospital brochure."
  },
  {
    id: "icici-lombard",
    name: "ICICI Lombard",
    teluguName: "ఐసిఐసిఐ లాంబార్డ్",
    logo: "/assets/insurance/icici-lombard.png",
    type: "private",
    notes: "Major health insurance provider on hospital cashless facilitation panel."
  },
  {
    id: "telangana-ehs",
    name: "Telangana Government Employees Health Scheme (EHS)",
    teluguName: "తెలంగాణ స్టేట్ గవర్నమెంట్ ఎంప్లాయీస్ హెల్త్ స్కీమ్ (EHS)",
    logo: "/assets/insurance/telangana-ehs.png",
    type: "government",
    notes: "Government health scheme for state employees and pensioners, subject to government guidelines and hospital empanelment criteria."
  }
];
