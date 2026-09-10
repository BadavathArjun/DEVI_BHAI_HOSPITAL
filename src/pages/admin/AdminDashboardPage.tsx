import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  LogOut, 
  ShieldCheck, 
  Search,
  ChevronRight,
  Filter,
  Eye,
  Settings
} from 'lucide-react';
import { DOCTORS } from '../../data/doctors';
import { appointmentService, contactService } from '../../services/appointmentService';
import { AppointmentRequest, ContactMessage } from '../../types';
import { SEOHead } from '../../components/common/SEOHead';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'appointments' | 'messages' | 'doctors' | 'cms'>('appointments');
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    const token = sessionStorage.getItem('devibai_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    setAppointments(appointmentService.getStoredAppointments());
    setMessages(contactService.getStoredMessages());
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('devibai_admin_token');
    navigate('/admin/login');
  };

  const handleStatusChange = (id: string, newStatus: AppointmentRequest['status']) => {
    appointmentService.updateAppointmentStatus(id, newStatus);
    setAppointments(appointmentService.getStoredAppointments());
  };

  const filteredAppointments = statusFilter === 'All'
    ? appointments
    : appointments.filter(a => a.status === statusFilter);

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      <SEOHead title="Staff Admin Dashboard | Devibai Hospital" />

      {/* Admin Top Navigation */}
      <header className="bg-navy-950 text-white py-3.5 px-4 sm:px-8 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-white">
              DEVIBAI HOSPITAL <span className="text-teal-400 text-xs font-semibold uppercase px-2 py-0.5 rounded bg-teal-500/20 ml-2">Admin Portal</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <Link to="/" className="text-slate-300 hover:text-white flex items-center">
              <span>View Website</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-red-300 hover:text-red-200 border border-navy-700"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* KPI Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="medical-card p-5 bg-white border-l-4 border-l-teal-600">
            <div className="text-xs font-semibold text-slate-500 uppercase">Total Appointments</div>
            <div className="text-2xl font-bold font-heading text-navy-900 mt-1">{appointments.length}</div>
            <div className="text-[11px] text-teal-700 mt-0.5">
              {appointments.filter(a => a.status === 'Pending').length} Pending Review
            </div>
          </div>

          <div className="medical-card p-5 bg-white border-l-4 border-l-blue-600">
            <div className="text-xs font-semibold text-slate-500 uppercase">Inquiries Received</div>
            <div className="text-2xl font-bold font-heading text-navy-900 mt-1">{messages.length}</div>
            <div className="text-[11px] text-blue-700 mt-0.5">Via Website Forms</div>
          </div>

          <div className="medical-card p-5 bg-white border-l-4 border-l-purple-600">
            <div className="text-xs font-semibold text-slate-500 uppercase">Consultant Doctors</div>
            <div className="text-2xl font-bold font-heading text-navy-900 mt-1">{DOCTORS.length}</div>
            <div className="text-[11px] text-purple-700 mt-0.5">5 Specialists Active</div>
          </div>

          <div className="medical-card p-5 bg-white border-l-4 border-l-emerald-600">
            <div className="text-xs font-semibold text-slate-500 uppercase">Emergency Coverage</div>
            <div className="text-2xl font-bold font-heading text-navy-900 mt-1">24/7</div>
            <div className="text-[11px] text-emerald-700 mt-0.5">Smart ICU & Lab Active</div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 space-x-4 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'appointments'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            Appointment Requests ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'messages'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            Inquiries & Messages ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'doctors'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            Doctor Directory ({DOCTORS.length})
          </button>
          <button
            onClick={() => setActiveTab('cms')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'cms'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            CMS & API Architecture
          </button>
        </div>

        {/* Tab Content: Appointments */}
        {activeTab === 'appointments' && (
          <div className="medical-card p-6 bg-white rounded-b-xl border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <h2 className="font-heading font-bold text-lg text-navy-900">
                Patient Appointment Requests
              </h2>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500">Filter Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                No appointment requests found. Try booking a test appointment through the website form.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                      <th className="py-3 px-3">Ref ID</th>
                      <th className="py-3 px-3">Patient</th>
                      <th className="py-3 px-3">Phone</th>
                      <th className="py-3 px-3">Department</th>
                      <th className="py-3 px-3">Date & Slot</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-3 font-mono font-semibold text-slate-600">{apt.id}</td>
                        <td className="py-3 px-3 font-medium text-navy-900">{apt.fullName}</td>
                        <td className="py-3 px-3">
                          <a href={`tel:${apt.phone}`} className="text-teal-700 hover:underline font-semibold">
                            {apt.phone}
                          </a>
                        </td>
                        <td className="py-3 px-3 text-slate-700">{apt.department}</td>
                        <td className="py-3 px-3 text-slate-600">
                          {apt.preferredDate} <br />
                          <span className="text-[10px] text-slate-400">{apt.preferredTime}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              apt.status === 'Pending'
                                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                : apt.status === 'Contacted'
                                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                : apt.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                : apt.status === 'Completed'
                                ? 'bg-slate-100 text-slate-800'
                                : 'bg-red-100 text-red-900'
                            }`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={apt.status}
                            onChange={(e) => handleStatusChange(apt.id, e.target.value as any)}
                            className="px-2 py-1 rounded border border-slate-300 text-[11px] bg-white font-medium"
                          >
                            <option value="Pending">Set Pending</option>
                            <option value="Contacted">Set Contacted</option>
                            <option value="Confirmed">Set Confirmed</option>
                            <option value="Completed">Set Completed</option>
                            <option value="Cancelled">Set Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Messages */}
        {activeTab === 'messages' && (
          <div className="medical-card p-6 bg-white rounded-b-xl border border-slate-200 space-y-4">
            <h2 className="font-heading font-bold text-lg text-navy-900">
              Inquiries & Contact Messages
            </h2>

            {messages.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                No inquiries submitted yet.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-navy-900">{m.name}</span>
                      <span className="text-slate-400 text-xs font-mono">{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-slate-600">
                      <strong>Phone:</strong> <a href={`tel:${m.phone}`} className="text-teal-700 font-semibold">{m.phone}</a>
                      {m.email && <span> | <strong>Email:</strong> {m.email}</span>}
                      {m.subject && <span> | <strong>Subject:</strong> {m.subject}</span>}
                    </div>
                    <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200/80">
                      "{m.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Doctors */}
        {activeTab === 'doctors' && (
          <div className="medical-card p-6 bg-white rounded-b-xl border border-slate-200 space-y-4">
            <h2 className="font-heading font-bold text-lg text-navy-900">
              Hospital Doctors Directory (Verified Panel)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DOCTORS.map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl border border-slate-200 flex items-start space-x-3">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-14 h-14 rounded-lg object-cover border border-slate-200"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-navy-900 text-sm">{doc.name}</div>
                    <div className="text-xs text-teal-700 font-semibold">{doc.specialization}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{doc.qualifications}</div>
                    <div className="mt-2 inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Active on OPD Roster
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: CMS Architecture */}
        {activeTab === 'cms' && (
          <div className="medical-card p-6 bg-white rounded-b-xl border border-slate-200 space-y-6 text-sm text-slate-700 leading-relaxed">
            <div>
              <h2 className="font-heading font-bold text-lg text-navy-900 mb-1">
                Admin-Ready CMS & API Architecture
              </h2>
              <p className="text-xs text-slate-500">
                This architecture was designed so any headless CMS (Strapi, Supabase, Firebase, Node/Express REST API) can be plugged in seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-slate-900 text-teal-300 rounded-xl space-y-2">
                <div className="font-bold text-white uppercase text-[10px] tracking-wider">REST Endpoints Architecture</div>
                <div>POST /api/appointments</div>
                <div>GET /api/appointments?status=pending</div>
                <div>PATCH /api/appointments/:id/status</div>
                <div>POST /api/contact</div>
                <div>GET /api/doctors</div>
                <div>PUT /api/doctors/:id</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 font-sans text-xs">
                <div className="font-bold text-navy-900 uppercase text-[10px] tracking-wider mb-2">Data Layer Separation</div>
                <div>• All data files live in <code>src/data/</code>: hospital, doctors, specialities, services, facilities, insurance, faqs.</div>
                <div>• No UI components have hardcoded patient text or doctor qualifications.</div>
                <div>• Type safety enforced via strict TypeScript interfaces in <code>src/types/index.ts</code>.</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
