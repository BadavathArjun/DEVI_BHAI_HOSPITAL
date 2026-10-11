import { DOCTORS } from '../data/doctors';
import { Doctor } from '../types';

const DOCTORS_STORAGE_KEY = 'devibai_hospital_doctors_v2';
const EVENT_NAME = 'devibai_doctors_updated';

export const doctorService = {
  /**
   * Retrieves all doctors from persistent browser storage,
   * falling back to default seed data in src/data/doctors.ts.
   */
  getDoctors(): Doctor[] {
    try {
      const stored = localStorage.getItem(DOCTORS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as Doctor[];
        }
      }
    } catch (e) {
      console.warn('Failed to parse doctors from localStorage, falling back to default.', e);
    }
    // Seed localStorage if not present
    try {
      localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(DOCTORS));
    } catch {
      // Safe fallback
    }
    return DOCTORS;
  },

  /**
   * Returns only doctors marked as active for public displays
   */
  getActiveDoctors(): Doctor[] {
    return this.getDoctors().filter((doc) => doc.active !== false);
  },

  /**
   * Finds a doctor by URL slug or unique ID
   */
  getDoctorBySlug(slug: string): Doctor | undefined {
    const list = this.getDoctors();
    const cleanSlug = slug.toLowerCase().trim();
    return list.find(
      (d) => d.slug.toLowerCase() === cleanSlug || d.id.toLowerCase() === cleanSlug
    );
  },

  /**
   * Finds a doctor by exact ID
   */
  getDoctorById(id: string): Doctor | undefined {
    const list = this.getDoctors();
    return list.find((d) => d.id === id);
  },

  /**
   * Saves updated list of doctors to browser storage and dispatches update notification
   */
  saveDoctors(doctors: Doctor[]): boolean {
    try {
      localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(doctors));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: doctors }));
      }
      return true;
    } catch (e) {
      console.error('Failed to save doctors to localStorage', e);
      return false;
    }
  },

  /**
   * Adds a new doctor to the directory
   */
  addDoctor(newDoctor: Doctor): Doctor[] {
    const current = this.getDoctors();
    // Ensure unique ID and slug
    const safeId = newDoctor.id || `dr-${Date.now()}`;
    const safeSlug = newDoctor.slug || safeId;
    const doctorToSave: Doctor = {
      ...newDoctor,
      id: safeId,
      slug: safeSlug,
      active: newDoctor.active !== undefined ? newDoctor.active : true
    };

    const updated = [doctorToSave, ...current];
    this.saveDoctors(updated);
    return updated;
  },

  /**
   * Updates an existing doctor's details
   */
  updateDoctor(updatedDoctor: Doctor): Doctor[] {
    const current = this.getDoctors();
    const updated = current.map((doc) =>
      doc.id === updatedDoctor.id ? { ...doc, ...updatedDoctor } : doc
    );
    this.saveDoctors(updated);
    return updated;
  },

  /**
   * Deletes a doctor from the directory
   */
  deleteDoctor(id: string): Doctor[] {
    const current = this.getDoctors();
    const updated = current.filter((doc) => doc.id !== id);
    this.saveDoctors(updated);
    return updated;
  },

  /**
   * Toggles active / inactive status of a doctor
   */
  toggleDoctorStatus(id: string): Doctor[] {
    const current = this.getDoctors();
    const updated = current.map((doc) =>
      doc.id === id ? { ...doc, active: !doc.active } : doc
    );
    this.saveDoctors(updated);
    return updated;
  },

  /**
   * Resets doctors back to the original default seed data
   */
  resetToDefault(): Doctor[] {
    try {
      localStorage.removeItem(DOCTORS_STORAGE_KEY);
      localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(DOCTORS));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: DOCTORS }));
      }
    } catch {
      // Safe fallback
    }
    return DOCTORS;
  },

  /**
   * Subscribes to real-time updates across open tabs and windows
   */
  onUpdate(callback: (doctors: Doctor[]) => void): () => void {
    if (typeof window === 'undefined') return () => {};

    const handleCustom = (e: Event) => {
      const custom = e as CustomEvent<Doctor[]>;
      if (custom.detail) {
        callback(custom.detail);
      } else {
        callback(this.getDoctors());
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === DOCTORS_STORAGE_KEY) {
        callback(this.getDoctors());
      }
    };

    window.addEventListener(EVENT_NAME, handleCustom);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(EVENT_NAME, handleCustom);
      window.removeEventListener('storage', handleStorage);
    };
  }
};
