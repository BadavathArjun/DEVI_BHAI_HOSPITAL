import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { EmergencyBar } from './components/layout/EmergencyBar';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';

// Homepage is eagerly loaded for instant initial render and LCP
import { HomePage } from './pages/HomePage';

// Route-based code splitting for sub-pages & heavy admin modules
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const DoctorsPage = React.lazy(() => import('./pages/DoctorsPage').then(m => ({ default: m.DoctorsPage })));
const DoctorDetailPage = React.lazy(() => import('./pages/DoctorDetailPage').then(m => ({ default: m.DoctorDetailPage })));
const SpecialitiesPage = React.lazy(() => import('./pages/SpecialitiesPage').then(m => ({ default: m.SpecialitiesPage })));
const SpecialityDetailPage = React.lazy(() => import('./pages/SpecialityDetailPage').then(m => ({ default: m.SpecialityDetailPage })));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = React.lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const FacilitiesPage = React.lazy(() => import('./pages/FacilitiesPage').then(m => ({ default: m.FacilitiesPage })));
const InsurancePage = React.lazy(() => import('./pages/InsurancePage').then(m => ({ default: m.InsurancePage })));
const AarogyasriPage = React.lazy(() => import('./pages/AarogyasriPage').then(m => ({ default: m.AarogyasriPage })));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const AppointmentPage = React.lazy(() => import('./pages/AppointmentPage').then(m => ({ default: m.AppointmentPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const EmergencyPage = React.lazy(() => import('./pages/EmergencyPage').then(m => ({ default: m.EmergencyPage })));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = React.lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Admin CMS Pages (Heavy modules isolated from public bundle)
const AdminLoginPage = React.lazy(() => import('./pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = React.lazy(() => import('./pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));

const PageLoaderFallback: React.FC = () => (
  <div className="min-h-[40vh] flex flex-col items-center justify-center py-12">
    <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
    <span className="sr-only">Loading page...</span>
  </div>
);

// Public Layout Wrapper
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <EmergencyBar />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <React.Suspense fallback={<PageLoaderFallback />}>
          <Outlet />
        </React.Suspense>
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <React.Suspense fallback={<PageLoaderFallback />}>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Doctors */}
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:slug" element={<DoctorDetailPage />} />

            {/* Specialities */}
            <Route path="/specialities" element={<SpecialitiesPage />} />
            <Route path="/specialities/:slug" element={<SpecialityDetailPage />} />

            {/* Services */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />

            {/* Facilities, Insurance & Aarogyasri */}
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/arogyasri" element={<AarogyasriPage />} />

            {/* Gallery, Appointment, Contact, Emergency */}
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />

            {/* Policies & Terms */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Case Normalization Redirects */}
            <Route path="/Contact" element={<Navigate to="/contact" replace />} />
            <Route path="/About" element={<Navigate to="/about" replace />} />
            <Route path="/Doctors" element={<Navigate to="/doctors" replace />} />
            <Route path="/Appointment" element={<Navigate to="/appointment" replace />} />
            <Route path="/Emergency" element={<Navigate to="/emergency" replace />} />
            <Route path="/Facilities" element={<Navigate to="/facilities" replace />} />
            <Route path="/Insurance" element={<Navigate to="/insurance" replace />} />
            <Route path="/Arogyasri" element={<Navigate to="/arogyasri" replace />} />
            <Route path="/Aarogyasri" element={<Navigate to="/arogyasri" replace />} />
            <Route path="/aarogyasri" element={<Navigate to="/arogyasri" replace />} />
            <Route path="/Gallery" element={<Navigate to="/gallery" replace />} />
            <Route path="/Services" element={<Navigate to="/services" replace />} />
            <Route path="/Specialities" element={<Navigate to="/specialities" replace />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin CMS Portal Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/appointments" element={<AdminDashboardPage />} />
          <Route path="/admin/doctors" element={<AdminDashboardPage />} />
          <Route path="/admin/services" element={<AdminDashboardPage />} />
          <Route path="/admin/messages" element={<AdminDashboardPage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
