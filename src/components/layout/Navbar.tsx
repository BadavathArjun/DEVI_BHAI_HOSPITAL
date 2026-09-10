import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Calendar, Menu, X, AlertCircle } from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospital';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Specialities', path: '/specialities' },
    { name: 'Services', path: '/services' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Insurance', path: '/insurance' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-b ${
        isScrolled ? 'py-2 shadow-md border-slate-200' : 'py-3.5 border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Hospital Brand */}
          <Link
            to="/"
            className="flex items-center space-x-3 group focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg p-1"
            aria-label="Devibai Super Speciality Hospital Homepage"
          >
            {/* Real Logo Crop */}
            <div className="relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center p-0.5">
              <img
                src="/assets/branding/db-logo.jpg"
                alt="DB Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to text initials if image fails
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
              <span className="sr-only">DB Logo</span>
            </div>

            <div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-heading font-extrabold text-navy-900 text-base sm:text-lg tracking-tight group-hover:text-teal-700 transition-colors">
                  DEVIBAI
                </span>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200/50">
                  Super Speciality
                </span>
              </div>
              <div className="text-[11px] sm:text-xs font-medium text-slate-500 tracking-wide">
                Hospital • Nirmal, Telangana
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-navy-900 bg-slate-100 font-semibold'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Quick Emergency Icon/Button */}
            <a
              href={HOSPITAL_INFO.links.callEmergency}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-50 text-emergency-600 hover:bg-emergency-600 hover:text-white border border-red-200 transition-colors shadow-sm"
              title="Emergency Desk 24/7"
              aria-label="Call Emergency Directly"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Book Appointment CTA */}
            <Link
              to="/appointment"
              id="navbar-book-appointment-btn"
              className="btn-primary text-xs sm:text-sm py-2 px-4 shadow-sm"
            >
              <Calendar className="w-4 h-4 mr-1.5 text-teal-300" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Link
              to="/appointment"
              className="sm:hidden inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-semibold bg-navy-900 text-white"
            >
              Book
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-navy-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 max-h-[80vh] overflow-y-auto z-50 animate-fadeIn">
          <div className="space-y-1 pb-4 border-b border-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-navy-900 bg-teal-50 font-semibold text-teal-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 space-y-2.5">
            <Link
              to="/appointment"
              className="w-full btn-teal text-sm py-3 justify-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book an Appointment
            </Link>

            <a
              href={HOSPITAL_INFO.links.callEmergency}
              className="w-full btn-emergency text-sm py-3 justify-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              24/7 Emergency: {HOSPITAL_INFO.phones.primary}
            </a>

            <div className="text-center pt-2 text-xs text-slate-500">
              Opposite Kaveri Hospital, Old RTO Office, Yellapalli, Nirmal
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
