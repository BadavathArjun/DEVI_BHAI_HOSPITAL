# Devibai Super Speciality Hospital Website

Official web portal and patient management application for **Devibai Super Speciality Hospital**, located in Yellapalli, Nirmal, Telangana.

Built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```
The site runs locally on `http://localhost:5173` (or the next available port).

### Production Build
```bash
npm run build
```
Generates production-ready optimized assets in the `dist/` directory.

---

## ☁️ Deploying to Vercel

The project is pre-configured for seamless 1-click deployment on **Vercel** with full Single-Page Application (SPA) routing support via [`vercel.json`](./vercel.json).

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** → **"Project"**.
4. Import your `DEVI_BHAI_HOSPITAL` repository.
5. Vercel automatically detects Vite. Verify the default settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Your site will be live on a `*.vercel.app` domain with an SSL certificate within 1 minute!

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy directly from terminal
vercel

# For production deployment
vercel --prod
```

---

## ⚙️ Configuration Files for Vercel

- **[`vercel.json`](./vercel.json)**:
  - Configures SPA rewrites so direct navigation and browser refreshing on deep routes (e.g. `/doctors`, `/emergency`, `/services`, `/admin`) do not return 404 errors.
  - Applies 1-year immutable caching for `/assets/*` bundles.
  - Implements production security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`).
- **[`.gitignore`](./.gitignore)**:
  - Excludes `.vercel`, `.env`, and build artifacts from version control.
- **[`tsconfig.app.json`](./tsconfig.app.json)**:
  - Configured with `forceConsistentCasingInFileNames: true` ensuring cross-platform build stability between Windows and Linux environments.
