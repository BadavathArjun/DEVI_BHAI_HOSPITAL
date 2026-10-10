import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LogOut, 
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  Search,
  Filter,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Pencil,
  X,
  RefreshCw
} from 'lucide-react';
import { galleryService } from '../../services/galleryService';
import { GalleryItem } from '../../types';
import { SEOHead } from '../../components/common/SEOHead';

const AVAILABLE_CATEGORIES: GalleryItem['category'][] = [
  'Hospital',
  'Doctors',
  'Facilities',
  'Fertility & IVF',
  'Surgery',
  'Emergency',
  'Medical Care',
  'Services',
  'Awards & Recognition',
  'Events & Celebrations'
];

/**
 * Compresses and optimizes an uploaded image file using an HTML5 Canvas.
 * Ensures the image fits comfortably in browser storage without throwing QuotaExceededError.
 */
const compressImageFile = (file: File, maxWidth = 1600, maxHeight = 1200, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image data.'));
      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

          // Scale down if image exceeds max dimensions
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 0.85 quality for optimal clarity and small file footprint
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch {
          // Fallback to original data URL if canvas manipulation fails
          resolve(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Authentication check
  useEffect(() => {
    const token = sessionStorage.getItem('devibai_admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('devibai_admin_token');
    navigate('/admin/login');
  };

  // Gallery state
  const [items, setItems] = useState<GalleryItem[]>(() => galleryService.getGalleryItems());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Add Photo Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Hospital');
  const [imageInputType, setImageInputType] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImageData, setUploadedImageData] = useState('');
  const [caption, setCaption] = useState('');
  const [isCompressingAdd, setIsCompressingAdd] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  // Update / Edit Photo State
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<GalleryItem['category']>('Hospital');
  const [editImageInputType, setEditImageInputType] = useState<'upload' | 'url'>('upload');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editUploadedImageData, setEditUploadedImageData] = useState('');
  const [editCaption, setEditCaption] = useState('');
  const [isCompressingEdit, setIsCompressingEdit] = useState(false);
  const [editPreviewError, setEditPreviewError] = useState(false);

  // Handle file upload for ADD
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    setErrorMessage('');
    setIsCompressingAdd(true);

    try {
      const optimizedData = await compressImageFile(file);
      setUploadedImageData(optimizedData);
      setPreviewError(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process image.');
    } finally {
      setIsCompressingAdd(false);
    }
  };

  // Handle file upload for EDIT/UPDATE
  const handleEditFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    setErrorMessage('');
    setIsCompressingEdit(true);

    try {
      const optimizedData = await compressImageFile(file);
      setEditUploadedImageData(optimizedData);
      setEditPreviewError(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process image.');
    } finally {
      setIsCompressingEdit(false);
    }
  };

  // Open Edit / Update Modal
  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditCaption(item.caption || '');
    setEditPreviewError(false);

    if (item.image.startsWith('data:')) {
      setEditImageInputType('upload');
      setEditUploadedImageData(item.image);
      setEditImageUrl('');
    } else {
      setEditImageInputType('url');
      setEditImageUrl(item.image);
      setEditUploadedImageData(item.image);
    }
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setEditingItem(null);
    setEditTitle('');
    setEditImageUrl('');
    setEditUploadedImageData('');
    setEditCaption('');
  };

  // ADD Photo Submit Handler
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!title.trim()) {
      setErrorMessage('Please enter an image name / title.');
      return;
    }

    const imageSource = imageInputType === 'upload' ? uploadedImageData : imageUrl.trim();
    if (!imageSource) {
      setErrorMessage(
        imageInputType === 'upload'
          ? 'Please select and upload an image file from your device.'
          : 'Please enter a valid image URL or file path (e.g. /assets/gallery/photo.jpg).'
      );
      return;
    }

    const newItem: GalleryItem = {
      id: 'gallery-' + Date.now(),
      title: title.trim(),
      category,
      image: imageSource,
      caption: caption.trim() || undefined
    };

    try {
      const updated = galleryService.addGalleryItem(newItem);
      setItems(updated);
      setSuccessMessage(`Image "${title.trim()}" has been added to the gallery successfully without any error!`);

      // Reset Form
      setTitle('');
      setImageUrl('');
      setUploadedImageData('');
      setCaption('');
      setShowAddForm(false);
      if (fileInputRef.current) fileInputRef.current.value = '';

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err: any) {
      setErrorMessage(`Failed to save image: ${err?.message || 'Storage error'}`);
    }
  };

  // UPDATE Photo Submit Handler
  const handleUpdatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setErrorMessage('');
    setSuccessMessage('');

    if (!editTitle.trim()) {
      setErrorMessage('Please enter an image name / title.');
      return;
    }

    const updatedImageSource =
      editImageInputType === 'upload'
        ? editUploadedImageData || editingItem.image
        : editImageUrl.trim() || editingItem.image;

    if (!updatedImageSource) {
      setErrorMessage('Please provide an image for this gallery item.');
      return;
    }

    const updatedItem: GalleryItem = {
      ...editingItem,
      title: editTitle.trim(),
      category: editCategory,
      image: updatedImageSource,
      caption: editCaption.trim() || undefined
    };

    try {
      const updated = galleryService.updateGalleryItem(updatedItem);
      setItems(updated);
      setSuccessMessage(`Image "${editTitle.trim()}" has been updated successfully without any error!`);
      closeEditModal();
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err: any) {
      setErrorMessage(`Failed to update image: ${err?.message || 'Storage error'}`);
    }
  };

  // DELETE Photo Handler
  const handleDeletePhoto = (id: string, photoTitle: string) => {
    if (window.confirm(`Are you sure you want to remove "${photoTitle}" from the gallery?`)) {
      const updated = galleryService.deleteGalleryItem(id);
      setItems(updated);
      setSuccessMessage(`"${photoTitle}" was removed from the gallery.`);
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  // RESET Defaults Handler
  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to restore the default gallery photos? Any newly added or updated photos will be reset.'
      )
    ) {
      const reset = galleryService.resetToDefault();
      setItems(reset);
      setSuccessMessage('Gallery has been restored to default photos.');
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeCategoriesCount = new Set(items.map((i) => i.category)).size;
  const currentPreviewImage = imageInputType === 'upload' ? uploadedImageData : imageUrl.trim();
  const currentEditPreviewImage =
    editImageInputType === 'upload'
      ? editUploadedImageData || editingItem?.image
      : editImageUrl.trim() || editingItem?.image;

  // Export JSON/TS code for src/data/gallery.ts
  const exportCode = `import { GalleryItem } from '../types';\n\nexport const GALLERY_ITEMS: GalleryItem[] = ${JSON.stringify(
    items,
    null,
    2
  )};\n`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(exportCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <SEOHead title="Gallery Photo Manager | Devibai Hospital Admin" />

      {/* Admin Top Navigation */}
      <header className="bg-navy-950 text-white py-3.5 px-4 sm:px-8 border-b border-navy-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="font-heading font-extrabold text-sm sm:text-lg tracking-tight text-white">
              DEVIBAI HOSPITAL
            </span>
            <span className="text-teal-400 text-[10px] sm:text-xs font-semibold uppercase px-2 py-0.5 rounded bg-teal-500/20">
              Gallery Photo Manager
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 text-xs">
            <Link
              to="/gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white flex items-center px-2.5 py-1.5 rounded-lg bg-navy-900/80 hover:bg-navy-900 border border-navy-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1 text-teal-400" />
              <span>View Live Gallery</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-red-300 hover:text-red-200 border border-navy-700 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* Banner / Notification */}
        {successMessage && (
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-sm flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <span className="font-medium">{successMessage}</span>
            </div>
            <button
              onClick={() => setSuccessMessage('')}
              className="text-teal-600 hover:text-teal-800 text-xs font-semibold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-emergency-700 text-sm flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage('')}
              className="text-red-600 hover:text-red-800 text-xs font-semibold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dashboard Header Bar */}
        <div className="medical-card p-5 sm:p-6 bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-xl sm:text-2xl text-navy-900 flex items-center">
              <ImageIcon className="w-6 h-6 mr-2.5 text-teal-600" />
              Hospital Photo Gallery Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Add new images, update existing images, categorize them, and manage the live gallery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                if (!showAddForm) setEditingItem(null);
              }}
              className="btn-teal text-xs sm:text-sm py-2.5 px-4 font-bold shadow-sm"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              {showAddForm ? 'Close Add Form' : 'Add New Photo'}
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="btn-outline text-xs sm:text-sm py-2.5 px-3.5"
              title="Export photo records as code for permanent saving in git"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-teal-600" />
              Export Code
            </button>

            <button
              onClick={handleResetDefaults}
              className="p-2.5 rounded-lg border border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs transition-colors"
              title="Restore initial gallery default photos"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] font-semibold uppercase text-slate-400">Total Photos</div>
            <div className="text-2xl font-bold font-heading text-navy-900 mt-1">{items.length}</div>
            <div className="text-[11px] text-teal-700 mt-0.5">Live on website</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] font-semibold uppercase text-slate-400">Categories</div>
            <div className="text-2xl font-bold font-heading text-navy-900 mt-1">{activeCategoriesCount}</div>
            <div className="text-[11px] text-teal-700 mt-0.5">Active sections</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] font-semibold uppercase text-slate-400">Storage Sync</div>
            <div className="text-2xl font-bold font-heading text-emerald-700 mt-1">Active</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Instant browser sync</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] font-semibold uppercase text-slate-400">Filtered View</div>
            <div className="text-2xl font-bold font-heading text-teal-700 mt-1">{filteredItems.length}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Matching criteria</div>
          </div>
        </div>

        {/* ==============================================================
            ADD PHOTO FORM
            ============================================================== */}
        {showAddForm && (
          <div className="medical-card p-6 sm:p-8 bg-white border border-teal-200 shadow-md animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h2 className="font-heading font-bold text-lg text-navy-900 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-teal-600" />
                Add New Photo to Hospital Gallery
              </h2>
              <span className="text-xs text-slate-500">All changes appear live on the website immediately</span>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Form Inputs */}
                <div className="space-y-4">
                  {/* Field 1: Image Name */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Image Name <span className="text-emergency-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Modern Laparoscopy Surgery Suite"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                    />
                  </div>

                  {/* Field 2: Image Category */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Image Category <span className="text-emergency-600">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors bg-white"
                    >
                      {AVAILABLE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Field 3: Upload Image */}
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                      Upload Image / Source <span className="text-emergency-600">*</span>
                    </label>

                    {/* Toggle between upload and path/URL */}
                    <div className="flex items-center space-x-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setImageInputType('upload')}
                        className={`text-xs py-1.5 px-3 rounded-md font-semibold transition-colors flex items-center ${
                          imageInputType === 'upload'
                            ? 'bg-teal-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <Upload className="w-3.5 h-3.5 mr-1" />
                        Upload Image from Device
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageInputType('url')}
                        className={`text-xs py-1.5 px-3 rounded-md font-semibold transition-colors flex items-center ${
                          imageInputType === 'url'
                            ? 'bg-teal-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5 mr-1" />
                        Image URL / File Path
                      </button>
                    </div>

                    {imageInputType === 'upload' ? (
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-teal-500 transition-colors bg-slate-50 relative">
                        <input
                          type="file"
                          id="gallery-file-upload"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="gallery-file-upload"
                          className="cursor-pointer flex flex-col items-center justify-center space-y-1.5"
                        >
                          {isCompressingAdd ? (
                            <div className="flex flex-col items-center space-y-2 py-2">
                              <RefreshCw className="w-6 h-6 text-teal-600 animate-spin" />
                              <span className="text-xs font-semibold text-teal-700">
                                Optimizing & preparing image...
                              </span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-teal-600" />
                              <span className="text-xs font-semibold text-teal-700">
                                Click to select image from your computer
                              </span>
                              <span className="text-[11px] text-slate-400">
                                Supports JPG, PNG, WEBP (auto-optimized for error-free storage)
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                            setPreviewError(false);
                          }}
                          placeholder="e.g. /assets/gallery/my-photo.jpg or https://..."
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">
                          You can place files into <code>public/assets/gallery/</code> and reference them here.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Caption / Description (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Brief description of the photo shown when clicked..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Right Image Live Preview */}
                <div className="flex flex-col">
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Image Live Preview
                  </label>
                  <div className="flex-1 min-h-[220px] rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden relative p-2">
                    {currentPreviewImage && !previewError ? (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <img
                          src={currentPreviewImage}
                          alt="Preview"
                          onError={() => setPreviewError(true)}
                          className="max-h-[200px] w-auto max-w-full rounded-lg object-contain shadow-sm"
                        />
                        <div className="mt-2 text-center text-xs text-slate-600 font-medium line-clamp-1">
                          {title || 'Untitled Image'} • <span className="text-teal-700">{category}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-slate-400 p-6">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                        <div className="text-xs font-medium">No image selected yet</div>
                        <div className="text-[11px] mt-0.5">Upload an image or enter a URL on the left</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-outline text-xs sm:text-sm py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCompressingAdd}
                  className="btn-teal text-xs sm:text-sm py-2.5 px-6 font-bold shadow-md disabled:opacity-50"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Save Photo to Gallery
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==============================================================
            UPDATE / EDIT PHOTO MODAL
            ============================================================== */}
        {editingItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <Pencil className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg text-navy-900">
                      Update Image Details
                    </h2>
                    <p className="text-xs text-slate-500">
                      Editing: <span className="font-medium text-slate-700">"{editingItem.title}"</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeEditModal}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdatePhoto} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Form Inputs */}
                  <div className="space-y-4">
                    {/* Update Option 1: Image Name */}
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Image Name <span className="text-emergency-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="e.g. Modern Laparoscopy Surgery Suite"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                      />
                    </div>

                    {/* Update Option 2: Image Category */}
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Image Category <span className="text-emergency-600">*</span>
                      </label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors bg-white"
                      >
                        {AVAILABLE_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Update Option 3: Uploaded Image / Replacement */}
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                        Uploaded Image / Replacement
                      </label>

                      <div className="flex items-center space-x-2 mb-3">
                        <button
                          type="button"
                          onClick={() => setEditImageInputType('upload')}
                          className={`text-xs py-1.5 px-3 rounded-md font-semibold transition-colors flex items-center ${
                            editImageInputType === 'upload'
                              ? 'bg-teal-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <Upload className="w-3.5 h-3.5 mr-1" />
                          Upload New Image
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditImageInputType('url')}
                          className={`text-xs py-1.5 px-3 rounded-md font-semibold transition-colors flex items-center ${
                            editImageInputType === 'url'
                              ? 'bg-teal-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <ImageIcon className="w-3.5 h-3.5 mr-1" />
                          Image URL / Path
                        </button>
                      </div>

                      {editImageInputType === 'upload' ? (
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-teal-500 transition-colors bg-slate-50 relative">
                          <input
                            type="file"
                            id="edit-gallery-file-upload"
                            ref={editFileInputRef}
                            accept="image/*"
                            onChange={handleEditFileUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="edit-gallery-file-upload"
                            className="cursor-pointer flex flex-col items-center justify-center space-y-1.5"
                          >
                            {isCompressingEdit ? (
                              <div className="flex flex-col items-center space-y-2 py-2">
                                <RefreshCw className="w-6 h-6 text-teal-600 animate-spin" />
                                <span className="text-xs font-semibold text-teal-700">
                                  Optimizing new image...
                                </span>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-6 h-6 text-teal-600" />
                                <span className="text-xs font-semibold text-teal-700">
                                  Click to upload replacement image
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  Leave unchanged to keep current image
                                </span>
                              </>
                            )}
                          </label>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="text"
                            value={editImageUrl}
                            onChange={(e) => {
                              setEditImageUrl(e.target.value);
                              setEditPreviewError(false);
                            }}
                            placeholder="e.g. /assets/gallery/photo.jpg or https://..."
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Caption / Description (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        placeholder="Brief description shown when clicked in lightbox..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Right Image Live Preview for Edit */}
                  <div className="flex flex-col">
                    <label className="block text-xs font-semibold text-navy-900 mb-1">
                      Updated Image Live Preview
                    </label>
                    <div className="flex-1 min-h-[220px] rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden relative p-3">
                      {currentEditPreviewImage && !editPreviewError ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <img
                            src={currentEditPreviewImage}
                            alt="Preview"
                            onError={() => setEditPreviewError(true)}
                            className="max-h-[220px] w-auto max-w-full rounded-lg object-contain shadow-sm"
                          />
                          <div className="mt-2 text-center text-xs text-slate-600 font-medium line-clamp-1">
                            {editTitle || 'Untitled'} • <span className="text-teal-700">{editCategory}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-slate-400 p-6">
                          <ImageIcon className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                          <div className="text-xs font-medium">No image preview available</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Update Modal Action Buttons */}
                <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="btn-outline text-xs sm:text-sm py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCompressingEdit}
                    className="btn-teal text-xs sm:text-sm py-2.5 px-6 font-bold shadow-md disabled:opacity-50 flex items-center"
                  >
                    <Check className="w-4 h-4 mr-1.5" />
                    Save & Update Image
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Gallery Search & Filter Controls */}
        <div className="medical-card p-4 sm:p-5 bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images by name or caption..."
              className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto scrollbar-none pb-1 md:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({items.length})
            </button>
            {AVAILABLE_CATEGORIES.map((cat) => {
              const count = items.filter((i) => i.category === cat).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="medical-card p-12 text-center bg-white border border-slate-200 rounded-xl space-y-3">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-navy-900 font-heading">No Images Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? `No images matched "${searchQuery}". Try a different keyword.`
                : 'There are no images in this category yet. Click "Add New Photo" to add one!'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="btn-outline text-xs py-1.5 px-3 mt-2"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-navy-950/80 backdrop-blur-sm text-teal-300 border border-teal-500/30">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Photo Meta & Actions */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-heading font-bold text-sm text-navy-900 line-clamp-1" title={item.title}>
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2" title={item.caption}>
                        {item.caption}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    {/* Update / Edit Option */}
                    <button
                      onClick={() => openEditModal(item)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-teal-50 text-teal-700 hover:bg-teal-100 font-semibold border border-teal-200/80 transition-colors"
                      title="Update image name, category, or photo"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Update</span>
                    </button>

                    {/* Delete Option */}
                    <button
                      onClick={() => handleDeletePhoto(item.id, item.title)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors flex items-center space-x-1"
                      title="Delete this image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Export Modal / Drawer */}
        {showExportModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-fadeIn max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <h3 className="font-heading font-bold text-lg text-navy-900">
                    Export Gallery Code for `src/data/gallery.ts`
                  </h3>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold px-2 py-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Images added or updated through this portal are already live and saved in browser storage. If you wish to permanently freeze them into your Git repository, copy this snippet and replace the contents of <code>src/data/gallery.ts</code>.
              </p>

              <div className="flex-1 overflow-auto bg-slate-900 text-teal-300 p-4 rounded-xl text-xs font-mono max-h-80 border border-slate-800">
                <pre>{exportCode}</pre>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="btn-outline text-xs py-2 px-4"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="btn-teal text-xs py-2 px-5 font-bold flex items-center"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5" />
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
