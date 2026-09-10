import { AppointmentRequest, ContactMessage } from '../types';

const APPOINTMENTS_STORAGE_KEY = 'devibai_hospital_appointments_v1';
const MESSAGES_STORAGE_KEY = 'devibai_hospital_messages_v1';

export const appointmentService = {
  async submitAppointment(
    data: Omit<AppointmentRequest, 'id' | 'status' | 'createdAt'>
  ): Promise<{ success: boolean; data?: AppointmentRequest; error?: string }> {
    try {
      // Basic sanitization
      const sanitizedPhone = data.phone.trim().replace(/[^\d+]/g, '');
      if (sanitizedPhone.length < 10) {
        return { success: false, error: 'Please enter a valid 10-digit mobile number' };
      }
      if (!data.fullName.trim()) {
        return { success: false, error: 'Full name is required' };
      }
      if (!data.department) {
        return { success: false, error: 'Please select a clinical department' };
      }
      if (!data.preferredDate) {
        return { success: false, error: 'Please choose a preferred appointment date' };
      }
      if (!data.consent) {
        return { success: false, error: 'Consent to contact regarding this appointment is required' };
      }

      const newAppointment: AppointmentRequest = {
        id: 'APT-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        fullName: data.fullName.trim(),
        phone: sanitizedPhone,
        email: data.email?.trim() || undefined,
        age: data.age?.trim() || undefined,
        gender: data.gender,
        department: data.department,
        preferredDoctor: data.preferredDoctor,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        reason: data.reason?.trim() || undefined,
        message: data.message?.trim() || undefined,
        consent: true,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      // In production with backend: fetch('/api/appointments', { method: 'POST', body: JSON.stringify(newAppointment) })
      // Fallback to local persistence for offline / frontend-only demo
      const existing = this.getStoredAppointments();
      const updated = [newAppointment, ...existing];
      try {
        localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Safe failover if storage restricted
      }

      return { success: true, data: newAppointment };
    } catch {
      return { success: false, error: 'An unexpected error occurred. Please call 8885558061 directly.' };
    }
  },

  getStoredAppointments(): AppointmentRequest[] {
    try {
      const stored = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored) as AppointmentRequest[];
    } catch {
      return [];
    }
  },

  updateAppointmentStatus(id: string, newStatus: AppointmentRequest['status']): boolean {
    try {
      const list = this.getStoredAppointments();
      const updated = list.map(item => item.id === id ? { ...item, status: newStatus } : item);
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }
};

export const contactService = {
  async submitContactMessage(
    data: Omit<ContactMessage, 'id' | 'createdAt'>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (!data.name.trim() || !data.phone.trim() || !data.message.trim()) {
        return { success: false, error: 'Name, phone number and message are required.' };
      }

      const newMsg: ContactMessage = {
        id: 'MSG-' + Date.now(),
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email?.trim(),
        subject: data.subject?.trim(),
        message: data.message.trim(),
        createdAt: new Date().toISOString()
      };

      try {
        const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
        const list = stored ? JSON.parse(stored) : [];
        localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify([newMsg, ...list]));
      } catch {
        // Safe failover
      }

      return { success: true };
    } catch {
      return { success: false, error: 'Unable to send message at this time. Please call 8885558061 directly.' };
    }
  },

  getStoredMessages(): ContactMessage[] {
    try {
      const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
};
