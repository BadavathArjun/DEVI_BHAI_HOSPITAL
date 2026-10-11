# 🏥 Devibai Super Speciality Hospital — Web Portal & CMS

[![Website Status](https://img.shields.io/badge/Website-Live-teal?style=for-the-badge&logo=google-chrome&logoColor=white)](https://devibaisuperspecialityhospital.com)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

Official high-performance web portal, patient care platform, and administrative Content Management System (CMS) for **Devibai Super Speciality Hospital**, located in Nirmal, Telangana, India.

---

## 📑 Table of Contents

1. [Hospital Overview](#-hospital-overview)
2. [Key Website Features](#-key-website-features)
3. [Technology Stack & Languages](#-technology-stack--languages)
4. [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
5. [How the Website was Built](#-how-the-website-was-built)
6. [SEO, Performance & Pre-Rendering Architecture](#-seo-performance--pre-rendering-architecture)
7. [Admin CMS Portal & Staff Access](#-admin-cms-portal--staff-access)
8. [Connecting Custom Domain (Complete DNS Guide)](#-connecting-custom-domain-complete-dns-guide)
9. [Getting Started (Local Development)](#-getting-started-local-development)
10. [Build & Deployment Guide](#-build--deployment-guide)
11. [Configuration & Environment Details](#-configuration--environment-details)
12. [Contact & Hospital Coordinates](#-contact--hospital-coordinates)

---

## 🏥 Hospital Overview

- **Name**: DEVIBAI SUPER SPECIALITY HOSPITAL (also recognized as Devi Bai Hospital / Devi Bhai Hospital)
- **Tagline**: *Advanced Healthcare • Compassionate Care • Trusted by Families*
- **Location**: Beside DS Mart, Mancherial Road, Shastri Nagar, Nirmal – 504106, Telangana, India.
- **Flagship Centres**:
  - **Dr. Chandrika's Fertility (IVF) & Laparoscopic Centre**
  - **24/7 Emergency & Advanced Trauma Care**
  - **Smart ICU & Critical Care Unit**
  - **Comprehensive Maternity & High-Risk Pregnancy Care**
  - **General, Laparoscopic & Laser Surgery**
  - **In-House 24/7 Pharmacy & NABL-grade Pathology Labs**
  - **Government Schemes**: Aarogyasri Empanelled & All Major Private Cashless Health Insurances / TPAs

---

## 🌟 Key Website Features

### 1. Patient Experience & Clinical Information
- **Interactive Home Page**: Fast-loading hero section, quick appointment booking trigger, emergency hotline access, key specialty highlights, doctor spotlights, patient reviews, and Google Maps location guide.
- **Doctor Directory & Detailed Profiles**: Complete doctor profiles detailing qualifications, clinical experience, OP timings, specializations, consultation fees, and direct booking links.
- **Specialities & Services**: Dedicated detail pages for Obstetrics & Gynecology, Infertility & IVF, General Surgery, Pediatrics, General Medicine, Laparoscopy, and Orthopedics.
- **Aarogyasri & Cashless Insurance Portal**: Dedicated pages guiding rural and urban patients on document requirements, eligible health schemes, and claim processing.
- **Interactive Media Gallery**: Filterable photo gallery categorized into Hospital, Doctors, Facilities, IVF Lab, Operation Theatres, and Events with integrated full-screen lightbox preview.
- **Emergency Action Bar & Mobile Sticky Tray**: Instant 1-tap emergency calling (`+91 9092916222`) and direct WhatsApp consultation routing (`+91 9092915222`).

### 2. Patient Services & Booking
- **Online Appointment Booking Modal & Page**: Multi-step booking form capturing patient details, preferred doctor, time slot, department, and medical reason with sanitization and validation.
- **Instant Contact Desk**: Direct inquiry dispatch with location guidance and contact numbers.

### 3. Administrative Portal (CMS)
- Secure hospital administration desk (`/admin/login` & `/admin/dashboard`) with session-based authentication.
- **Doctors CMS**: Add new doctors, edit existing doctor profiles, update consultation schedules, toggle active/inactive status, or remove profiles.
- **Photo Gallery CMS**: Upload new hospital photos with automatic client-side HTML5 Canvas compression to optimize storage and loading speeds.
- **Patient Inquiries & Appointment Tracking**: View submitted appointments and inquiries, manage fulfillment status (`Pending`, `Confirmed`, `Completed`, `Cancelled`).

---

## 💻 Technology Stack & Languages

### 1. Programming & Markup Languages
| Language | Version / Specification | Usage |
| :--- | :--- | :--- |
| **TypeScript** | `~6.0.2` | 100% strict type safety across all components, hooks, services, data models, and routing. |
| **JavaScript (ES Modules)** | Node.js v18+ / ES2022 | Pre-rendering build scripts, asset optimization, build validation, and bundler plugins. |
| **HTML5** | Semantic Living Standard | High-accessibility semantic structure (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`). |
| **CSS3** | PostCSS + Tailwind CSS v3 | Modern layout design: Flexbox, CSS Grid, custom CSS variables, glassmorphism, responsive breakpoints. |
| **JSON & JSON-LD** | Schema.org Standard | Structured microdata schemas for Google rich search results and local SEO indexing. |
| **Python** | Python 3.10+ (Scripts) | Asset extraction, database indexing, and image optimization pipelines in `scripts/`. |

---

### 2. Frameworks & Core Libraries
- **React (`v19.2.8`)**: Modern reactive UI library utilizing React Suspense, Concurrent Rendering, and lazy route splitting for maximum responsiveness.
- **React DOM (`v19.2.8`)**: High-performance browser virtual DOM renderer.
- **React Router DOM (`v7.18.3`)**: Client-side Single Page Application (SPA) router supporting nested layouts, deep linking, dynamic slug parameters (`:slug`), and automated URL case-normalization.
- **Lucide React (`v1.44.0`)**: Comprehensive, lightweight, tree-shakeable SVG icon set for hospital navigation and clinical indicators.

---

### 3. Build Tools, Bundlers & Utilities
- **Vite (`v8.2.2`)**: Next-generation frontend build tool providing ultra-fast Hot Module Replacement (HMR) and optimized Rollup production builds.
- **@vitejs/plugin-react (`v6.1.0`)**: Official Vite plugin for React fast refresh and JSX transformation.
- **Tailwind CSS (`v3.4.17`)**: Utility-first CSS framework with tailored hospital theme color palette (`navy-900`, `teal-600`, `teal-500`, `emergency-700`).
- **PostCSS (`v8.5.28`)** & **Autoprefixer (`v10.5.5`)**: Automatic vendor prefixing and modern CSS parsing.
- **Oxlint (`v1.79.0`)**: Ultra-fast Rust-based linter for high-speed static code analysis.

---

## 📂 Project Architecture & Directory Structure

```plaintext
DEVI_BHAI_HOSPITAL/
├── index.html                   # Master HTML5 template, core meta tags, Google Fonts, base Schema.org JSON-LD
├── package.json                 # Project dependencies, metadata, and build scripts
├── tsconfig.json                # Root TypeScript configuration
├── tsconfig.app.json            # Client-side TypeScript compilation options
├── tsconfig.node.json           # Node/Vite tooling TypeScript configuration
├── vite.config.ts               # Vite configuration (plugins, build targets, server settings)
├── tailwind.config.js           # Custom hospital colors, typography, shadow elevations, animations
├── postcss.config.js            # PostCSS configuration for Tailwind and Autoprefixer
├── vercel.json                  # Production hosting rules, SPA rewrites, security headers, 301 redirects
├── public/                      # Static assets served at domain root
│   ├── favicon.svg              # Official hospital vector favicon
│   ├── manifest.json            # Progressive Web App (PWA) manifest
│   ├── robots.txt               # Search engine crawler instructions
│   ├── sitemap.xml              # Complete Google XML Sitemap covering all URLs
│   ├── assets/                  # Public branding and facility photographs
│   └── photos/                  # Hospital gallery image bank
├── scripts/                     # Automation and SEO build tools
│   ├── prerender-seo.js         # Pre-rendering engine generating static SEO snapshots for all routes
│   ├── build_gallery_database.py# Script indexing hospital photos into JSON
│   ├── optimize_assets.py       # Image resizing and WebP compression pipeline
│   └── verify_build.cjs         # Pre-flight build integrity check
└── src/                         # Application source code
    ├── main.tsx                 # React application mounting point
    ├── App.tsx                  # Master router, lazy route definitions, PublicLayout shell
    ├── App.css                  # Component-specific styles and animations
    ├── index.css                # Global design system, utility classes, Tailwind directives
    ├── types/                   # TypeScript interfaces (Doctor, Service, Facility, Appointment, etc.)
    ├── data/                    # Seed data stores:
    │   ├── hospital.ts          # Hospital contact numbers, addresses, social handles, disclaimers
    │   ├── doctors.ts           # Clinical staff, specialties, qualifications, OP timings
    │   ├── specialities.ts      # Medical departments and clinical capabilities
    │   ├── services.ts          # Treatments, surgeries, diagnostic services
    │   ├── facilities.ts        # Smart ICU, Operation Theatres, Pharmacy, Laboratory
    │   ├── insurance.ts         # Aarogyasri and TPA insurance providers
    │   ├── reviews.ts           # Verified patient feedback and testimonials
    │   ├── faqs.ts              # Frequently asked questions for patients
    │   └── gallery.ts           # Gallery photographs database
    ├── services/                # Business logic and persistence layers:
    │   ├── doctorService.ts     # CRUD for doctor profiles (localStorage with fallback + real-time broadcast)
    │   ├── galleryService.ts    # Photo management, category sorting, search
    │   └── appointmentService.ts# Appointment and contact inquiry submission and tracking
    ├── utils/
    │   └── seoSchemas.ts        # Dynamic Schema.org structured data generators (JSON-LD)
    ├── components/
    │   ├── layout/              # Navbar, Footer, EmergencyBar, MobileBottomBar
    │   ├── common/              # SEOHead, ScrollToTop, Breadcrumbs, SectionHeading
    │   ├── cards/               # DoctorCard, ServiceCard, FacilityCard, ReviewCard
    │   ├── forms/               # AppointmentModal, AppointmentForm, ContactForm
    │   ├── gallery/             # PhotoGrid, LightboxModal, CategoryFilter
    │   └── home/                # HeroSection, QuickStats, SpecialistsSection, MapSection
    └── pages/                   # Application views:
        ├── HomePage.tsx         # Comprehensive hospital landing page
        ├── AboutPage.tsx        # Hospital history, vision, leadership, mission
        ├── DoctorsPage.tsx      # All doctors directory with search & department filters
        ├── DoctorDetailPage.tsx # Dynamic individual doctor profile (`/doctors/:slug`)
        ├── SpecialitiesPage.tsx # Overview of all medical departments
        ├── SpecialityDetailPage.tsx # Detailed department overview (`/specialities/:slug`)
        ├── ServicesPage.tsx     # Medical treatments & surgical facilities
        ├── ServiceDetailPage.tsx# Detailed service procedure (`/services/:slug`)
        ├── FacilitiesPage.tsx   # Infrastructure, ICU, OT, diagnostic labs
        ├── InsurancePage.tsx    # Cashless health insurance & TPA list
        ├── AarogyasriPage.tsx   # Telangana Aarogyasri scheme eligibility & patient guide
        ├── GalleryPage.tsx      # Filterable photo gallery with lightbox
        ├── AppointmentPage.tsx  # Direct appointment booking page
        ├── ContactPage.tsx      # Hospital contact numbers, inquiry form, Google Map
        ├── EmergencyPage.tsx    # 24/7 Trauma, ICU & Ambulance protocols
        ├── PrivacyPolicyPage.tsx# Patient data & privacy policies
        ├── TermsPage.tsx        # Terms of hospital website usage
        ├── NotFoundPage.tsx     # Custom 404 page with quick recovery links
        └── admin/
            ├── AdminLoginPage.tsx   # Hospital staff authentication desk
            └── AdminDashboardPage.tsx # Complete CMS for doctors, gallery, and appointments
```

---

## 🛠️ How the Website Was Built

### 1. Design Philosophy & Medical UI/UX
- **Color Palette**: Built around a reassuring clinical medical theme:
  - Deep Trust Navy (`#0b1e36`) representing stability and authority.
  - Vibrant Medical Teal (`#0d9488` / `#14b8a6`) representing healing, hygiene, and care.
  - Emergency Alert Red (`#dc2626`) for immediate trauma hotline identification.
  - Soft Slate Backgrounds (`#f8fafc`) for readable contrast and reduced eye fatigue.
- **Mobile-First Accessibility**:
  - Full touch-friendly target sizes (min 44px).
  - Floating Mobile Bottom Bar with 1-tap call, WhatsApp, and appointment booking.
  - Top Emergency Strip highlighting 24/7 hotline across all screen sizes.
- **Performance-Driven Code Splitting**:
  - `HomePage` is eagerly imported for instant initial paint and high Google Core Web Vitals scores.
  - All secondary pages and heavy administrative CMS components are lazy-loaded via `React.lazy()` and `React.Suspense`.

### 2. State & Data Persistence Layer
- Public doctor records and photo galleries are seeded from typed data files in `src/data/`.
- The administrative CMS uses `localStorage` with fallbacks and custom window event listeners (`devibai_doctors_updated`) to broadcast updates in real time across open browser tabs without requiring a heavy backend setup.
- Image uploads in the admin panel are processed via an in-browser HTML5 `<canvas>` compressor that downsizes high-resolution camera photos (to max 1200px width at 82% quality) to prevent browser quota exhaustion.

---

## 🚀 SEO, Performance & Pre-Rendering Architecture

This website implements enterprise-grade search engine optimization tailored specifically for hospitals and healthcare centers:

### 1. Hybrid Static SEO Pre-Rendering (`scripts/prerender-seo.js`)
Because standard Single Page Applications (SPAs) render blank HTML until JavaScript loads, web crawlers may experience delays when indexing content. 

This website features a dedicated post-build pre-rendering engine:
1. Vite compiles the client bundles into `dist/`.
2. `node scripts/prerender-seo.js` executes immediately.
3. It iterates through all public routes (`/`, `/about`, `/doctors`, `/emergency`, `/services`, etc.).
4. For each route, it generates a physical `index.html` file inside `dist/<route>/` containing:
   - Dedicated page `<title>` and `<meta name="description">`
   - Canonical URL tag pointing to `https://devibaisuperspecialityhospital.com`
   - Hyper-local geo tags (`geo.region: IN-TG`, `geo.placename: Nirmal, Telangana, India`, `ICBM: 19.0968, 78.3444`)
   - Open Graph (OG) and Twitter card metadata with dedicated preview images
   - Complete Schema.org JSON-LD microdata

### 2. Schema.org Medical Structured Data
Integrated schemas include:
- `Hospital` & `MedicalClinic` (Name, alternate names, address, phone numbers, geo-coordinates, rating, opening hours, accepted payment methods).
- `Physician` (Doctor credentials, specialties, hospital affiliation).
- `EmergencyService` (24/7 trauma desk availability).
- `FAQPage` (Common questions regarding appointments, treatments, and Aarogyasri).
- `BreadcrumbList` (Hierarchical navigation structure for Google Search snippets).

### 3. Caching & Security Headers (`vercel.json`)
- All compiled JS, CSS, and media bundles in `/assets/*` are served with 1-year immutable caching (`max-age=31536000, immutable`).
- Enterprise HTTP security headers applied across all routes:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`

---

## 🔐 Admin CMS Portal & Staff Access

The website includes an administrative dashboard designed for hospital administrative staff:

- **Portal Login URL**: `https://devibaisuperspecialityhospital.com/admin/login`
- **Dashboard URL**: `https://devibaisuperspecialityhospital.com/admin/dashboard`
- **Default Administrative Credentials**:
  - **Username**: `devibaisuperspecialityhospital`
  - **Password**: `devibaihospital@@83462`

### Admin Capabilities:
1. **Doctors Management**:
   - Add new specialist doctors with qualifications, registration number, consultation fees, and OP timings.
   - Edit existing doctor profiles and upload new profile photographs.
   - Toggle doctor availability on/off without deleting their profile.
   - Reset directory to hospital defaults at any time.
2. **Photo Gallery Management**:
   - Upload new hospital images directly from desktop or mobile.
   - Automatic client-side canvas compression ensures rapid loading.
   - Assign categories (Hospital, Doctors, Facilities, IVF Lab, Operation Theatres, Events).
   - Delete outdated photos.
3. **Appointment & Inquiry Management**:
   - Real-time review of patient appointment bookings submitted through the portal.
   - Update appointment status (`Pending` ➔ `Confirmed` ➔ `Completed` / `Cancelled`).

---

## 🌐 Connecting Custom Domain (Complete DNS Guide)

This website is hosted on **Vercel** and connected to its official custom domain: **`devibaisuperspecialityhospital.com`**.

Follow the step-by-step instructions below to configure or re-link this domain (or any custom domain) on your domain registrar (GoDaddy, Namecheap, Hostinger, Cloudflare, Google Domains/Squarespace):

### Step 1: Add the Domain in Vercel Dashboard
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Open the **`DEVI_BHAI_HOSPITAL`** project.
3. Navigate to **Settings** ➔ **Domains**.
4. Enter your root domain in the input box:
   ```text
   devibaisuperspecialityhospital.com
   ```
5. Click **Add**.
6. Vercel will recommend adding both:
   - `devibaisuperspecialityhospital.com` (Apex domain)
   - `www.devibaisuperspecialityhospital.com` (Subdomain redirecting to apex)
7. Select **Recommended**: Redirect `www.devibaisuperspecialityhospital.com` to `devibaisuperspecialityhospital.com` (or vice-versa according to your preference).

---

### Step 2: Configure DNS Records in Your Domain Registrar
Log in to the DNS management panel where your domain was purchased (e.g. GoDaddy, Namecheap, Hostinger, Cloudflare, BigRock):

#### 1. Configure the Apex / Root Domain (`@`)
Add an **A Record** pointing directly to Vercel's global Anycast IP address:

| Type | Name / Host | Value / Target IP | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or leave blank) | **`76.76.21.21`** | `Automatic` or `3600` |

> ⚠️ **Note**: If your DNS provider already has an existing `A` record pointing `@` to an old parking page or previous server, edit or remove it so it points exclusively to `76.76.21.21`.

---

#### 2. Configure the `www` Subdomain
Add a **CNAME Record** for the `www` subdomain pointing to Vercel's DNS router:

| Type | Name / Host | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME**| `www` | **`cname.vercel-dns.com.`** | `Automatic` or `3600` |

---

### Step 3: Domain Provider Specific Walkthroughs

<details>
<summary><b>Click here to view GoDaddy instructions</b></summary>

1. Log into your [GoDaddy Domain Portfolio](https://dcc.godaddy.com/).
2. Select **`devibaisuperspecialityhospital.com`** and click **DNS**.
3. Under **DNS Records**:
   - Find the record with Type `A` and Name `@`. Click **Edit** and set Value to `76.76.21.21`.
   - Find the record with Type `CNAME` and Name `www`. Click **Edit** and set Value to `cname.vercel-dns.com`.
4. Click **Save**.
</details>

<details>
<summary><b>Click here to view Namecheap instructions</b></summary>

1. Log into [Namecheap Dashboard](https://ap.www.namecheap.com/).
2. Click **Domain List** ➔ Click **Manage** next to `devibaisuperspecialityhospital.com`.
3. Switch to the **Advanced DNS** tab.
4. Under **Host Records**:
   - Click **Add New Record** ➔ Select **A Record** ➔ Host: `@` ➔ IP Address: `76.76.21.21` ➔ TTL: `Automatic`.
   - Click **Add New Record** ➔ Select **CNAME Record** ➔ Host: `www` ➔ Target: `cname.vercel-dns.com.` ➔ TTL: `Automatic`.
5. Click **Save All Changes**.
</details>

<details>
<summary><b>Click here to view Hostinger instructions</b></summary>

1. Log into [Hostinger hPanel](https://hpanel.hostinger.com/).
2. Go to **Domains** ➔ Select your domain ➔ Click **DNS / Nameservers**.
3. Under **Manage DNS records**:
   - Set Type: `A` ➔ Name: `@` ➔ Points to: `76.76.21.21` ➔ Click **Add Record**.
   - Set Type: `CNAME` ➔ Name: `www` ➔ Target: `cname.vercel-dns.com` ➔ Click **Add Record**.
</details>

<details>
<summary><b>Click here to view Cloudflare instructions</b></summary>

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/) and select your domain.
2. Click on **DNS** ➔ **Records**.
3. Add the records:
   - Type: `A` ➔ Name: `@` ➔ IPv4 address: `76.76.21.21` ➔ Proxy status: **DNS only** (Grey Cloud recommended during verification).
   - Type: `CNAME` ➔ Name: `www` ➔ Target: `cname.vercel-dns.com` ➔ Proxy status: **DNS only**.
4. Click **Save**.
</details>

---

### Step 4: Verification & Automated SSL Certification
1. Return to **Vercel Settings ➔ Domains**.
2. Vercel will periodically query your DNS. Once the records propagate (usually within 1 to 15 minutes), the status badge will turn from blue/yellow to **Valid Configuration (Green Checkmark)**.
3. Vercel automatically generates and installs an **Enterprise SSL Certificate (Let's Encrypt / DigiCert)** free of charge.
4. Both HTTP and HTTPS traffic will now securely resolve to your website:
   - `https://devibaisuperspecialityhospital.com`
   - `https://www.devibaisuperspecialityhospital.com` (auto-redirects cleanly)

---

## 💻 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (Version **18.0.0** or higher recommended)
- `npm` (bundled with Node.js) or `yarn` / `pnpm`

### Installation Steps

1. **Clone or navigate to the repository directory**:
   ```bash
   cd c:\Users\badav\Desktop\2026\DEVI_BHAI_HOSPITAL
   ```

2. **Install all project dependencies**:
   ```bash
   npm install
   ```

3. **Launch the local development server**:
   ```bash
   npm run dev
   ```
   The development server will start instantly with HMR on:
   ```text
   http://localhost:5173
   ```

4. **Run code linting**:
   ```bash
   npm run lint
   ```

---

## 🏗️ Build & Deployment Guide

### Building for Production
To generate a production-optimized build with static SEO pre-rendering:

```bash
npm run build
```

This single command triggers three automated stages defined in `package.json`:
1. `tsc -b`: Compiles TypeScript and performs full project type-checking.
2. `vite build`: Bundles, tree-shakes, minifies, and splits assets into the `dist/` directory.
3. `node scripts/prerender-seo.js`: Generates SEO-ready HTML snapshots for all major routes inside `dist/`.

To test the generated production build locally:
```bash
npm run preview
```

---

### Deploying to Vercel

#### Method 1: Continuous Deployment via GitHub (Recommended)
1. Push your latest code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete hospital web portal and CMS"
   git push origin main
   ```
2. Link your GitHub repository in the [Vercel Dashboard](https://vercel.com).
3. Every commit to `main` will automatically trigger an optimized build and deploy globally across Vercel's Edge Network in under 60 seconds.

#### Method 2: Deploying via Vercel CLI
```bash
# Install Vercel CLI globally (if not installed)
npm install -g vercel

# Deploy preview build
vercel

# Deploy directly to production
vercel --prod
```

---

## ⚙️ Configuration & Environment Details

### 1. `vercel.json`
Ensures single-page navigation, search engine index friendliness, and deep-link routing:
- **`cleanUrls: true`**: Removes `.html` extensions from URLs.
- **SPA Rewrites**:
  ```json
  {
    "rewrites": [
      {
        "source": "/((?!assets/|photos/|favicon.svg|icons.svg|robots.txt|sitemap.xml|manifest.json).*$)",
        "destination": "/index.html"
      }
    ]
  }
  ```
  Prevents 404 errors when visitors refresh deep pages such as `/doctors`, `/emergency`, or `/about`.
- **Case Normalization**: 301 redirects capitalize routes (e.g. `/Contact` ➔ `/contact`) to avoid duplicate content penalties.
- **Asset Caching**: 1-year immutable cache headers for hashed bundles.

### 2. `tailwind.config.js`
Contains hospital-tailored design tokens:
- **`navy`**: Palette from `#081424` to `#46678e` for institutional branding.
- **`teal`**: Palette from `#074e47` to `#7ce5db` for healthcare accents.
- **`emergency`**: Palette from `#5f0d0d` to `#ef5350` for urgent care highlights.
- **Fonts**: `Outfit` (Headings) and `Inter` (Body typography).

---

## 📞 Contact & Hospital Coordinates

| Attribute | Details |
| :--- | :--- |
| **Hospital Name** | **DEVIBAI SUPER SPECIALITY HOSPITAL** |
| **Address** | Beside DS Mart, Mancherial Road, Shastri Nagar, Nirmal – 504106, Telangana, India |
| **Emergency Hotline (24/7)** | **+91 9092916222** |
| **Primary Reception** | **+91 9092916222** |
| **WhatsApp Inquiry Desk** | **+91 9092915222** |
| **Official Website** | [https://devibaisuperspecialityhospital.com](https://devibaisuperspecialityhospital.com) |
| **Google Maps Navigation** | [View on Google Maps](https://www.google.com/maps/search/?api=1&query=Devibai+Super+Speciality+Hospital+Yellapalli+Nirmal+Telangana) |
| **Social Media** | [Instagram](https://www.instagram.com/drchandrika) • [Facebook](https://www.facebook.com/devibai.hospital) |

---

*Devibai Super Speciality Hospital Web Portal — Engineered for clinical excellence, rapid patient access, and top-tier search visibility.*
