import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { EmergencyBar } from './components/layout/EmergencyBar';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { SpecialitiesPage } from './pages/SpecialitiesPage';
import { SpecialityDetailPage } from './pages/SpecialityDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { InsurancePage } from './pages/InsurancePage';
import { AarogyasriPage } from './pages/AarogyasriPage';
import { GalleryPage } from './pages/GalleryPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

// Public Layout Wrapper
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <EmergencyBar />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
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
    </BrowserRouter>
  );
};

export default App;
