import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types';

const GALLERY_STORAGE_KEY = 'devibai_hospital_gallery_v2';

export const galleryService = {
  getGalleryItems(): GalleryItem[] {
    try {
      const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= GALLERY_ITEMS.length) {
          return parsed as GalleryItem[];
        }
      }
    } catch {
      // Safe fallback to default data
    }
    return GALLERY_ITEMS;
  },

  saveGalleryItems(items: GalleryItem[]): boolean {
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
      return true;
    } catch (e) {
      console.error('Failed to save gallery items to localStorage', e);
      return false;
    }
  },

  addGalleryItem(item: GalleryItem): GalleryItem[] {
    const current = this.getGalleryItems();
    const updated = [item, ...current];
    this.saveGalleryItems(updated);
    return updated;
  },

  updateGalleryItem(updatedItem: GalleryItem): GalleryItem[] {
    const current = this.getGalleryItems();
    const updated = current.map(item => item.id === updatedItem.id ? updatedItem : item);
    this.saveGalleryItems(updated);
    return updated;
  },

  deleteGalleryItem(id: string): GalleryItem[] {
    const current = this.getGalleryItems();
    const updated = current.filter(item => item.id !== id);
    this.saveGalleryItems(updated);
    return updated;
  },

  resetToDefault(): GalleryItem[] {
    try {
      localStorage.removeItem(GALLERY_STORAGE_KEY);
    } catch {
      // Safe fallback
    }
    return GALLERY_ITEMS;
  }
};
