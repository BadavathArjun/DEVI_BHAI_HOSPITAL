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
  RefreshCw,
  Stethoscope,
  Eye,
  Award,
  Clock,
  CheckCircle,
  Grid,
  List
} from 'lucide-react';
import { doctorService } from '../../services/doctorService';
import { galleryService } from '../../services/galleryService';
import { Doctor, GalleryItem } from '../../types';
import { SEOHead } from '../../components/common/SEOHead';

const AVAILABLE_GALLERY_CATEGORIES: GalleryItem['category'][] = [
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

const SPECIALITY_PRESETS = [
  'Obstetrics & Gynecology, Fertility & IVF',
  'General & Laparoscopic Surgery',
  'MD Physician, Consultant Physician & Diabetologist',
  'Pediatrics & Neonatology',
  'Urology',
  'Emergency & Critical Care',
  'Orthopedics & Joint Care',
  'Anesthesiology & Critical Care'
];

/**
 * Compresses and optimizes an uploaded image file using an HTML5 Canvas.
 * Ensures the image fits comfortably in browser storage without throwing QuotaExceededError.
 */
const compressImageFile = (file: File, maxWidth = 1200, maxHeight = 1000, quality = 0.82): Promise<string> => {
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

          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch {
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

  // Active Main Tab (Doctors and Photo Gallery)
  const [activeTab, setActiveTab] = useState<'doctors' | 'gallery'>('doctors');

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

  // Feedback notifications
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setErrorMessage('');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setSuccessMessage('');
  };

  // =========================================================================
  // DOCTORS STATE & MANAGEMENT
  // =========================================================================
  const [doctors, setDoctors] = useState<Doctor[]>(() => doctorService.getDoctors());
  const [doctorSearch, setDoctorSearch] = useState('');
  const [doctorSpecialityFilter, setDoctorSpecialityFilter] = useState('All');
  const [doctorStatusFilter, setDoctorStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [doctorViewMode, setDoctorViewMode] = useState<'grid' | 'table'>('grid');

  // Modals for Doctors
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [viewingDoctor, setViewingDoctor] = useState<Doctor | null>(null);
  const [deletingDoctor, setDeletingDoctor] = useState<Doctor | null>(null);
  const [showDoctorExportModal, setShowDoctorExportModal] = useState(false);
  const [copiedDoctorCode, setCopiedDoctorCode] = useState(false);

  // Form State for Add / Edit Doctor
  const [docFormName, setDocFormName] = useState('');
  const [docFormTeluguName, setDocFormTeluguName] = useState('');
  const [docFormSpecialization, setDocFormSpecialization] = useState(SPECIALITY_PRESETS[0]);
  const [docFormCustomSpec, setDocFormCustomSpec] = useState('');
  const [docFormQualifications, setDocFormQualifications] = useState('');
  const [docFormRole, setDocFormRole] = useState('');
  const [docFormBio, setDocFormBio] = useState('');
  const [docFormPhotoType, setDocFormPhotoType] = useState<'upload' | 'url'>('upload');
  const [docFormPhotoUrl, setDocFormPhotoUrl] = useState('');
  const [docFormUploadedPhoto, setDocFormUploadedPhoto] = useState('');
  const [docFormSchedule, setDocFormSchedule] = useState('');
  const [docFormActive, setDocFormActive] = useState(true);

  // Dynamic tags
  const [docFormExpertiseList, setDocFormExpertiseList] = useState<string[]>([]);
  const [currentExpertiseInput, setCurrentExpertiseInput] = useState('');
  const [docFormServicesList, setDocFormServicesList] = useState<string[]>([]);
  const [currentServiceInput, setCurrentServiceInput] = useState('');
  const [isCompressingDoctorPhoto, setIsCompressingDoctorPhoto] = useState(false);

  const doctorFileInputRef = useRef<HTMLInputElement>(null);

  // Open Add Doctor Modal
  const openAddDoctorModal = () => {
    setDocFormName('');
    setDocFormTeluguName('');
    setDocFormSpecialization(SPECIALITY_PRESETS[0]);
    setDocFormCustomSpec('');
    setDocFormQualifications('');
    setDocFormRole('Consultant Specialist');
    setDocFormBio('');
    setDocFormPhotoType('upload');
    setDocFormPhotoUrl('');
    setDocFormUploadedPhoto('');
    setDocFormSchedule('Available for daily OPD consultations & appointments.');
    setDocFormActive(true);
    setDocFormExpertiseList(['Consultation & Evaluation', 'Clinical Diagnosis']);
    setDocFormServicesList(['Outpatient Clinic', 'Specialist Assessment']);
    setCurrentExpertiseInput('');
    setCurrentServiceInput('');
    setShowAddDoctorModal(true);
  };

  // Open Edit Doctor Modal
  const openEditDoctorModal = (doc: Doctor) => {
    setEditingDoctor(doc);
    setDocFormName(doc.name);
    setDocFormTeluguName(doc.teluguName || '');
    if (SPECIALITY_PRESETS.includes(doc.specialization)) {
      setDocFormSpecialization(doc.specialization);
      setDocFormCustomSpec('');
    } else {
      setDocFormSpecialization('Other');
      setDocFormCustomSpec(doc.specialization);
    }
    setDocFormQualifications(doc.qualifications);
    setDocFormRole(doc.role || '');
    setDocFormBio(doc.bio || '');
    setDocFormSchedule(doc.scheduleInfo || '');
    setDocFormActive(doc.active !== false);
    setDocFormExpertiseList(doc.areasOfExpertise || []);
    setDocFormServicesList(doc.services || []);
    setCurrentExpertiseInput('');
    setCurrentServiceInput('');

    if (doc.photo.startsWith('data:')) {
      setDocFormPhotoType('upload');
      setDocFormUploadedPhoto(doc.photo);
      setDocFormPhotoUrl('');
    } else {
      setDocFormPhotoType('url');
      setDocFormPhotoUrl(doc.photo);
      setDocFormUploadedPhoto(doc.photo);
    }
  };

  // Close Doctor Form Modals
  const closeDoctorModal = () => {
    setShowAddDoctorModal(false);
    setEditingDoctor(null);
  };

  // Upload doctor photo
  const handleDoctorPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setIsCompressingDoctorPhoto(true);
    try {
      const compressed = await compressImageFile(file, 900, 1100, 0.85);
      setDocFormUploadedPhoto(compressed);
      setErrorMessage('');
    } catch (err: any) {
      showError(err.message || 'Failed to compress photo.');
    } finally {
      setIsCompressingDoctorPhoto(false);
    }
  };

  // Tag helper: add expertise
  const handleAddExpertise = () => {
    if (currentExpertiseInput.trim()) {
      if (!docFormExpertiseList.includes(currentExpertiseInput.trim())) {
        setDocFormExpertiseList([...docFormExpertiseList, currentExpertiseInput.trim()]);
      }
      setCurrentExpertiseInput('');
    }
  };

  // Tag helper: remove expertise
  const handleRemoveExpertise = (indexToRemove: number) => {
    setDocFormExpertiseList(docFormExpertiseList.filter((_, idx) => idx !== indexToRemove));
  };

  // Tag helper: add service
  const handleAddService = () => {
    if (currentServiceInput.trim()) {
      if (!docFormServicesList.includes(currentServiceInput.trim())) {
        setDocFormServicesList([...docFormServicesList, currentServiceInput.trim()]);
      }
      setCurrentServiceInput('');
    }
  };

  // Tag helper: remove service
  const handleRemoveService = (indexToRemove: number) => {
    setDocFormServicesList(docFormServicesList.filter((_, idx) => idx !== indexToRemove));
  };

  // Submit Add Doctor
  const handleSubmitAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFormName.trim()) {
      showError('Doctor full name is required.');
      return;
    }
    if (!docFormQualifications.trim()) {
      showError('Qualifications are required.');
      return;
    }

    const chosenSpec = docFormSpecialization === 'Other' 
      ? (docFormCustomSpec.trim() || 'General Medicine')
      : docFormSpecialization;

    const photoFinal = docFormPhotoType === 'upload' 
      ? (docFormUploadedPhoto || '/assets/branding/db-logo.jpg')
      : (docFormPhotoUrl.trim() || '/assets/branding/db-logo.jpg');

    const cleanSlug = docFormName
      .toLowerCase()
      .trim()
      .replace(/dr\.?\s*/i, 'dr-')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newDoctor: Doctor = {
      id: cleanSlug || `dr-${Date.now()}`,
      slug: cleanSlug || `dr-${Date.now()}`,
      name: docFormName.trim(),
      teluguName: docFormTeluguName.trim() || undefined,
      specialization: chosenSpec,
      qualifications: docFormQualifications.trim(),
      role: docFormRole.trim() || 'Consultant Specialist',
      photo: photoFinal,
      bio: docFormBio.trim() || `${docFormName.trim()} is an experienced specialist at Devibai Super Speciality Hospital providing clinical expertise and dedicated patient care.`,
      areasOfExpertise: docFormExpertiseList.length > 0 ? docFormExpertiseList : ['Clinical Consultation'],
      services: docFormServicesList.length > 0 ? docFormServicesList : ['Outpatient Care'],
      scheduleInfo: docFormSchedule.trim() || 'Available by appointment at Devibai Super Speciality Hospital reception.',
      active: docFormActive
    };

    try {
      const updated = doctorService.addDoctor(newDoctor);
      setDoctors(updated);
      closeDoctorModal();
      showSuccess(`Doctor ${newDoctor.name} has been added successfully!`);
    } catch (err: any) {
      showError(`Failed to add doctor: ${err?.message || 'Storage error'}`);
    }
  };

  // Submit Edit Doctor
  const handleSubmitEditDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor) return;

    if (!docFormName.trim()) {
      showError('Doctor full name is required.');
      return;
    }
    if (!docFormQualifications.trim()) {
      showError('Qualifications are required.');
      return;
    }

    const chosenSpec = docFormSpecialization === 'Other'
      ? (docFormCustomSpec.trim() || editingDoctor.specialization)
      : docFormSpecialization;

    const photoFinal = docFormPhotoType === 'upload'
      ? (docFormUploadedPhoto || editingDoctor.photo)
      : (docFormPhotoUrl.trim() || editingDoctor.photo);

    const updatedDoctor: Doctor = {
      ...editingDoctor,
      name: docFormName.trim(),
      teluguName: docFormTeluguName.trim() || undefined,
      specialization: chosenSpec,
      qualifications: docFormQualifications.trim(),
      role: docFormRole.trim() || undefined,
      photo: photoFinal,
      bio: docFormBio.trim() || editingDoctor.bio,
      areasOfExpertise: docFormExpertiseList.length > 0 ? docFormExpertiseList : editingDoctor.areasOfExpertise,
      services: docFormServicesList.length > 0 ? docFormServicesList : editingDoctor.services,
      scheduleInfo: docFormSchedule.trim() || editingDoctor.scheduleInfo,
      active: docFormActive
    };

    try {
      const updated = doctorService.updateDoctor(updatedDoctor);
      setDoctors(updated);
      closeDoctorModal();
      showSuccess(`Doctor ${updatedDoctor.name} details have been updated successfully!`);
    } catch (err: any) {
      showError(`Failed to update doctor: ${err?.message || 'Storage error'}`);
    }
  };

  // Toggle Doctor Active Status
  const handleToggleDoctorStatus = (id: string, name: string) => {
    const updated = doctorService.toggleDoctorStatus(id);
    setDoctors(updated);
    const target = updated.find(d => d.id === id);
    showSuccess(`Doctor ${name} status changed to ${target?.active ? 'Active (Live)' : 'Inactive (Hidden)'}.`);
  };

  // Confirm Delete Doctor
  const handleConfirmDeleteDoctor = () => {
    if (!deletingDoctor) return;
    try {
      const updated = doctorService.deleteDoctor(deletingDoctor.id);
      setDoctors(updated);
      showSuccess(`Doctor ${deletingDoctor.name} was removed from the hospital directory.`);
      setDeletingDoctor(null);
    } catch (err: any) {
      showError(`Failed to delete doctor: ${err?.message || 'Error'}`);
    }
  };

  // Reset Default Doctors
  const handleResetDoctors = () => {
    if (window.confirm('Restore original default hospital doctors list? Any newly added doctors will be replaced by the default roster.')) {
      const reset = doctorService.resetToDefault();
      setDoctors(reset);
      showSuccess('Doctor roster has been reset to default hospital consultants.');
    }
  };

  // Filter doctors
  const filteredDoctors = doctors.filter((doc) => {
    const searchLow = doctorSearch.toLowerCase().trim();
    const matchesSearch =
      searchLow === '' ||
      doc.name.toLowerCase().includes(searchLow) ||
      (doc.teluguName && doc.teluguName.toLowerCase().includes(searchLow)) ||
      doc.specialization.toLowerCase().includes(searchLow) ||
      doc.qualifications.toLowerCase().includes(searchLow) ||
      doc.areasOfExpertise.some(exp => exp.toLowerCase().includes(searchLow));

    const matchesSpeciality =
      doctorSpecialityFilter === 'All' ||
      doc.specialization.toLowerCase().includes(doctorSpecialityFilter.toLowerCase());

    const matchesStatus =
      doctorStatusFilter === 'all' ||
      (doctorStatusFilter === 'active' && doc.active !== false) ||
      (doctorStatusFilter === 'inactive' && doc.active === false);

    return matchesSearch && matchesSpeciality && matchesStatus;
  });

  const activeDoctorsCount = doctors.filter(d => d.active !== false).length;

  // Export Code for Doctors
  const doctorsExportCode = `import { Doctor } from '../types';\n\nexport const DOCTORS: Doctor[] = ${JSON.stringify(
    doctors,
    null,
    2
  )};\n`;

  const handleCopyDoctorsCode = () => {
    navigator.clipboard.writeText(doctorsExportCode);
    setCopiedDoctorCode(true);
    setTimeout(() => setCopiedDoctorCode(false), 2500);
  };

  // =========================================================================
  // GALLERY STATE & MANAGEMENT
  // =========================================================================
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => galleryService.getGalleryItems());
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('All');
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [showGalleryExportModal, setShowGalleryExportModal] = useState(false);
  const [copiedGalleryCode, setCopiedGalleryCode] = useState(false);

  // Gallery Form State
  const [galleryFormTitle, setGalleryFormTitle] = useState('');
  const [galleryFormCategory, setGalleryFormCategory] = useState<GalleryItem['category']>('Hospital');
  const [galleryFormType, setGalleryFormType] = useState<'upload' | 'url'>('upload');
  const [galleryFormUrl, setGalleryFormUrl] = useState('');
  const [galleryFormUploaded, setGalleryFormUploaded] = useState('');
  const [galleryFormCaption, setGalleryFormCaption] = useState('');
  const [isCompressingGallery, setIsCompressingGallery] = useState(false);

  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showError('Please select a valid image file.');
      return;
    }

    setIsCompressingGallery(true);
    try {
      const compressed = await compressImageFile(file, 1600, 1200, 0.85);
      setGalleryFormUploaded(compressed);
      setErrorMessage('');
    } catch (err: any) {
      showError(err.message || 'Failed to compress gallery image.');
    } finally {
      setIsCompressingGallery(false);
    }
  };

  const openAddGallery = () => {
    setGalleryFormTitle('');
    setGalleryFormCategory('Hospital');
    setGalleryFormType('upload');
    setGalleryFormUrl('');
    setGalleryFormUploaded('');
    setGalleryFormCaption('');
    setShowAddGalleryModal(true);
  };

  const openEditGallery = (item: GalleryItem) => {
    setEditingGalleryItem(item);
    setGalleryFormTitle(item.title);
    setGalleryFormCategory(item.category);
    setGalleryFormCaption(item.caption || '');
    if (item.image.startsWith('data:')) {
      setGalleryFormType('upload');
      setGalleryFormUploaded(item.image);
      setGalleryFormUrl('');
    } else {
      setGalleryFormType('url');
      setGalleryFormUrl(item.image);
      setGalleryFormUploaded(item.image);
    }
  };

  const handleSaveAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFormTitle.trim()) {
      showError('Image title is required.');
      return;
    }
    const imgSrc = galleryFormType === 'upload' ? galleryFormUploaded : galleryFormUrl.trim();
    if (!imgSrc) {
      showError('Please upload an image or provide an image URL.');
      return;
    }

    const newItem: GalleryItem = {
      id: 'gallery-' + Date.now(),
      title: galleryFormTitle.trim(),
      category: galleryFormCategory,
      image: imgSrc,
      caption: galleryFormCaption.trim() || undefined
    };

    const updated = galleryService.addGalleryItem(newItem);
    setGalleryItems(updated);
    setShowAddGalleryModal(false);
    showSuccess(`Image "${newItem.title}" added to gallery successfully!`);
  };

  const handleSaveEditGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGalleryItem) return;
    if (!galleryFormTitle.trim()) {
      showError('Image title is required.');
      return;
    }
    const imgSrc = galleryFormType === 'upload' ? (galleryFormUploaded || editingGalleryItem.image) : (galleryFormUrl.trim() || editingGalleryItem.image);

    const updatedItem: GalleryItem = {
      ...editingGalleryItem,
      title: galleryFormTitle.trim(),
      category: galleryFormCategory,
      image: imgSrc,
      caption: galleryFormCaption.trim() || undefined
    };

    const updated = galleryService.updateGalleryItem(updatedItem);
    setGalleryItems(updated);
    setEditingGalleryItem(null);
    showSuccess(`Image "${updatedItem.title}" updated successfully!`);
  };

  const handleDeleteGallery = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}" from the gallery?`)) {
      const updated = galleryService.deleteGalleryItem(id);
      setGalleryItems(updated);
      showSuccess(`"${title}" was removed from the gallery.`);
    }
  };

  const handleResetGallery = () => {
    if (window.confirm('Restore initial gallery default photos?')) {
      const reset = galleryService.resetToDefault();
      setGalleryItems(reset);
      showSuccess('Gallery restored to default photos.');
    }
  };

  const filteredGallery = galleryItems.filter((i) => {
    const matchesCat = galleryCategoryFilter === 'All' || i.category === galleryCategoryFilter;
    const matchesSearch =
      gallerySearch.trim() === '' ||
      i.title.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      (i.caption && i.caption.toLowerCase().includes(gallerySearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const galleryExportCode = `import { GalleryItem } from '../types';\n\nexport const GALLERY_ITEMS: GalleryItem[] = ${JSON.stringify(
    galleryItems,
    null,
    2
  )};\n`;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <SEOHead title="Executive Administration Portal | Devibai Super Speciality Hospital" noindex={true} />

      {/* ==============================================================
          EXECUTIVE ADMIN TOP BAR
          ============================================================== */}
      <header className="bg-navy-950 text-white border-b border-navy-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Hospital Brand */}
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-400 text-navy-950 flex items-center justify-center font-extrabold text-lg shadow-inner">
                DB
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-heading font-extrabold text-sm sm:text-base tracking-tight text-white uppercase">
                    DEVIBAI HOSPITAL
                  </h1>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-1.5 animate-pulse"></span>
                    Admin Suite
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Super Speciality Hospital Operations & Clinical CMS
                </p>
              </div>
            </div>

            {/* Right: Actions & User */}
            <div className="flex items-center space-x-2.5 sm:space-x-4 text-xs">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center px-3 py-1.5 rounded-lg bg-navy-900/90 text-slate-300 hover:text-white border border-navy-800 hover:border-slate-700 transition-colors"
                title="Open Public Website"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
                Live Website
              </Link>

              <Link
                to="/doctors"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-teal-900/40 text-teal-300 hover:text-teal-200 border border-teal-500/30 hover:border-teal-500/60 transition-colors"
                title="View Live Doctors Directory"
              >
                <Stethoscope className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
                <span>Doctors Directory</span>
              </Link>

              <div className="h-6 w-px bg-navy-800 hidden sm:block"></div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 hover:text-red-200 border border-red-800/60 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Strip: Doctors & Specialists and Photo Gallery */}
        <div className="bg-navy-900 border-t border-navy-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center space-x-2 py-2">
            {/* TAB: DOCTORS */}
            <button
              onClick={() => setActiveTab('doctors')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'doctors'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Doctors & Specialists</span>
              <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'doctors' ? 'bg-teal-800 text-teal-100' : 'bg-navy-800 text-slate-400'
              }`}>
                {doctors.length}
              </span>
            </button>

            {/* TAB: GALLERY */}
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photo Gallery</span>
              <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'gallery' ? 'bg-teal-800 text-teal-100' : 'bg-navy-800 text-slate-400'
              }`}>
                {galleryItems.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ==============================================================
          MAIN CONTENT WORKSPACE
          ============================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Toast / Notification Banners */}
        {successMessage && (
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-sm flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <span className="font-medium">{successMessage}</span>
            </div>
            <button
              onClick={() => setSuccessMessage('')}
              className="text-teal-600 hover:text-teal-800 text-xs font-semibold px-2 py-1 rounded"
            >
              Dismiss
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="font-medium">{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage('')}
              className="text-red-600 hover:text-red-800 text-xs font-semibold px-2 py-1 rounded"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ==============================================================
            TAB 1: DOCTORS & SPECIALISTS MANAGEMENT
            ============================================================== */}
        {activeTab === 'doctors' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header Card */}
            <div className="medical-card p-5 sm:p-6 bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-navy-900">
                      Doctors & Medical Specialists
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Add, edit, manage profiles, specialities, OPD schedules, and live directory status.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={openAddDoctorModal}
                  className="btn-teal text-xs sm:text-sm py-2.5 px-4 font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add New Doctor
                </button>

                <button
                  onClick={() => setShowDoctorExportModal(true)}
                  className="btn-outline text-xs sm:text-sm py-2.5 px-3.5"
                  title="Export doctor records as TypeScript array for git version control"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-teal-600" />
                  Export Code
                </button>

                <button
                  onClick={handleResetDoctors}
                  className="p-2.5 rounded-lg border border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs transition-colors"
                  title="Restore initial doctor roster"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[11px] font-semibold uppercase text-slate-400">Total Doctors</div>
                <div className="text-2xl font-bold font-heading text-navy-900 mt-1">{doctors.length}</div>
                <div className="text-[11px] text-teal-700 mt-0.5">In hospital roster</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[11px] font-semibold uppercase text-slate-400">Active Live</div>
                <div className="text-2xl font-bold font-heading text-emerald-600 mt-1">{activeDoctorsCount}</div>
                <div className="text-[11px] text-emerald-700 mt-0.5">Visible to public</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[11px] font-semibold uppercase text-slate-400">Specialities</div>
                <div className="text-2xl font-bold font-heading text-teal-700 mt-1">
                  {new Set(doctors.map(d => d.specialization)).size}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Clinical departments</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[11px] font-semibold uppercase text-slate-400">Matching View</div>
                <div className="text-2xl font-bold font-heading text-navy-800 mt-1">{filteredDoctors.length}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Filtered results</div>
              </div>
            </div>

            {/* Search, Filter & View Controls */}
            <div className="medical-card p-4 sm:p-5 bg-white border border-slate-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={doctorSearch}
                  onChange={(e) => setDoctorSearch(e.target.value)}
                  placeholder="Search doctor by name, qualifications, Telugu name, or condition..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                />
              </div>

              {/* Department & Status Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center space-x-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200 text-xs">
                  <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                  <select
                    value={doctorSpecialityFilter}
                    onChange={(e) => setDoctorSpecialityFilter(e.target.value)}
                    className="bg-transparent border-0 py-1.5 pr-6 text-xs font-semibold text-slate-700 focus:ring-0 cursor-pointer"
                  >
                    <option value="All">All Departments</option>
                    <option value="Obstetrics & Gynecology">Gynecology & IVF</option>
                    <option value="Surgery">General Surgery</option>
                    <option value="Physician">Internal Medicine</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Urology">Urology</option>
                  </select>
                </div>

                <div className="flex items-center space-x-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200 text-xs">
                  <select
                    value={doctorStatusFilter}
                    onChange={(e) => setDoctorStatusFilter(e.target.value as any)}
                    className="bg-transparent border-0 py-1.5 pr-6 text-xs font-semibold text-slate-700 focus:ring-0 cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>

                {/* View Switch */}
                <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setDoctorViewMode('grid')}
                    className={`p-1.5 rounded ${
                      doctorViewMode === 'grid' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Grid Card View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDoctorViewMode('table')}
                    className={`p-1.5 rounded ${
                      doctorViewMode === 'table' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Table Row View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Doctors Grid / Table Display */}
            {filteredDoctors.length === 0 ? (
              <div className="medical-card p-12 text-center bg-white border border-slate-200 rounded-xl space-y-3">
                <Stethoscope className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-navy-900 font-heading">No Doctors Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {doctorSearch
                    ? `No doctor matches "${doctorSearch}". Try a different name or specialty.`
                    : 'No doctors match the selected filter criteria.'}
                </p>
                <button
                  onClick={() => { setDoctorSearch(''); setDoctorSpecialityFilter('All'); setDoctorStatusFilter('all'); }}
                  className="btn-outline text-xs py-1.5 px-3 mt-2"
                >
                  Clear Filters
                </button>
              </div>
            ) : doctorViewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group relative"
                  >
                    {/* Top Card Section */}
                    <div className="p-5 flex items-start space-x-4 border-b border-slate-100">
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                        <img
                          src={doc.photo}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/assets/branding/db-logo.jpg';
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            doc.active !== false
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1 ${doc.active !== false ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                            {doc.active !== false ? 'Active Live' : 'Inactive'}
                          </span>

                          <button
                            onClick={() => handleToggleDoctorStatus(doc.id, doc.name)}
                            className="text-[11px] text-slate-400 hover:text-teal-700 font-medium"
                            title="Click to toggle active on website"
                          >
                            {doc.active !== false ? 'Hide' : 'Publish'}
                          </button>
                        </div>

                        <h3 className="font-heading font-bold text-base text-navy-900 truncate" title={doc.name}>
                          {doc.name}
                        </h3>

                        {doc.teluguName && (
                          <div className="text-xs text-teal-800 font-sans truncate">
                            {doc.teluguName}
                          </div>
                        )}

                        <div className="text-xs font-semibold text-teal-700 mt-1 line-clamp-1" title={doc.specialization}>
                          {doc.specialization}
                        </div>

                        {doc.role && (
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {doc.role}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Middle Card Details */}
                    <div className="p-4 flex-1 space-y-3 text-xs bg-slate-50/50">
                      <div className="flex items-start space-x-2 text-slate-700">
                        <Award className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium line-clamp-2 leading-relaxed" title={doc.qualifications}>
                          {doc.qualifications}
                        </span>
                      </div>

                      {doc.scheduleInfo && (
                        <div className="flex items-start space-x-2 text-slate-600">
                          <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2 leading-relaxed text-[11px]" title={doc.scheduleInfo}>
                            {doc.scheduleInfo}
                          </span>
                        </div>
                      )}

                      {/* Expertise Badges */}
                      <div className="pt-2 flex flex-wrap gap-1">
                        {doc.areasOfExpertise.slice(0, 3).map((exp, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-white text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200"
                          >
                            {exp}
                          </span>
                        ))}
                        {doc.areasOfExpertise.length > 3 && (
                          <span className="text-[10px] text-slate-400 font-medium self-center">
                            +{doc.areasOfExpertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setViewingDoctor(doc)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                          title="View complete profile preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/doctors/${doc.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition-colors"
                          title="Open live website page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => openEditDoctorModal(doc)}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 font-semibold border border-teal-200/80 transition-colors text-xs"
                        >
                          <Pencil className="w-3.5 h-3.5 mr-1" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeletingDoctor(doc)}
                          className="inline-flex items-center p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete doctor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* TABLE VIEW */
              <div className="medical-card bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Doctor</th>
                        <th className="py-3.5 px-4">Specialization</th>
                        <th className="py-3.5 px-4">Qualifications</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDoctors.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                <img
                                  src={doc.photo}
                                  alt={doc.name}
                                  className="w-full h-full object-cover object-top"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/assets/branding/db-logo.jpg';
                                  }}
                                />
                              </div>
                              <div>
                                <div className="font-heading font-bold text-navy-900 text-sm">{doc.name}</div>
                                {doc.teluguName && <div className="text-teal-800 text-[11px]">{doc.teluguName}</div>}
                                <div className="text-slate-400 text-[10px]">{doc.role || 'Consultant'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-teal-800">{doc.specialization}</span>
                          </td>
                          <td className="py-3.5 px-4 max-w-xs">
                            <span className="text-slate-600 line-clamp-2">{doc.qualifications}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => handleToggleDoctorStatus(doc.id, doc.name)}
                              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                doc.active !== false
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${doc.active !== false ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                              {doc.active !== false ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end space-x-1.5">
                              <button
                                onClick={() => setViewingDoctor(doc)}
                                className="p-1.5 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openEditDoctorModal(doc)}
                                className="p-1.5 text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded"
                                title="Edit Doctor"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeletingDoctor(doc)}
                                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                title="Delete Doctor"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==============================================================
            TAB 2: PHOTO GALLERY MANAGEMENT
            ============================================================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="medical-card p-5 sm:p-6 bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-navy-900 flex items-center">
                  <ImageIcon className="w-6 h-6 mr-2.5 text-teal-600" />
                  Hospital Photo Gallery Manager
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Add photos, replace photos, categorize them, and manage the live gallery page.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={openAddGallery}
                  className="btn-teal text-xs sm:text-sm py-2.5 px-4 font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add New Photo
                </button>

                <button
                  onClick={() => setShowGalleryExportModal(true)}
                  className="btn-outline text-xs sm:text-sm py-2.5 px-3.5"
                  title="Export photo records as code for permanent saving in git"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-teal-600" />
                  Export Code
                </button>

                <button
                  onClick={handleResetGallery}
                  className="p-2.5 rounded-lg border border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs transition-colors"
                  title="Restore initial gallery default photos"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Gallery Search & Filter Controls */}
            <div className="medical-card p-4 sm:p-5 bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  placeholder="Search images by name or caption..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-colors"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto scrollbar-none pb-1 md:pb-0">
                <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <button
                  onClick={() => setGalleryCategoryFilter('All')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    galleryCategoryFilter === 'All'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({galleryItems.length})
                </button>
                {AVAILABLE_GALLERY_CATEGORIES.map((cat) => {
                  const count = galleryItems.filter((i) => i.category === cat).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={cat}
                      onClick={() => setGalleryCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                        galleryCategoryFilter === cat
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

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
                >
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
                      <button
                        onClick={() => openEditGallery(item)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-teal-50 text-teal-700 hover:bg-teal-100 font-semibold border border-teal-200/80 transition-colors"
                      >
                        <Pencil className="w-3 h-3" />
                        <span>Update</span>
                      </button>

                      <button
                        onClick={() => handleDeleteGallery(item.id, item.title)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-semibold">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ==============================================================
          MODAL: ADD / EDIT DOCTOR
          ============================================================== */}
      {(showAddDoctorModal || editingDoctor) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn my-8 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-navy-900">
                    {editingDoctor ? 'Edit Doctor Details' : 'Add New Doctor to Hospital'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingDoctor ? `Updating profile for ${editingDoctor.name}` : 'Fill in the doctor profile details below'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeDoctorModal}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={editingDoctor ? handleSubmitEditDoctor : handleSubmitAddDoctor}
              className="flex-1 overflow-y-auto space-y-5 pr-1"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Doctor Name */}
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Doctor Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={docFormName}
                    onChange={(e) => setDocFormName(e.target.value)}
                    placeholder="e.g. Dr. Sunita Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                  />
                </div>

                {/* Telugu Name */}
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Doctor Name in Telugu (Optional)
                  </label>
                  <input
                    type="text"
                    value={docFormTeluguName}
                    onChange={(e) => setDocFormTeluguName(e.target.value)}
                    placeholder="e.g. డా॥ సునీత శర్మ"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Specialization */}
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Department / Specialization <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={docFormSpecialization}
                    onChange={(e) => setDocFormSpecialization(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                  >
                    {SPECIALITY_PRESETS.map((sp) => (
                      <option key={sp} value={sp}>{sp}</option>
                    ))}
                    <option value="Other">Other / Custom Specialization...</option>
                  </select>

                  {docFormSpecialization === 'Other' && (
                    <input
                      type="text"
                      required
                      value={docFormCustomSpec}
                      onChange={(e) => setDocFormCustomSpec(e.target.value)}
                      placeholder="Type custom specialization..."
                      className="mt-2 w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-teal-600"
                    />
                  )}
                </div>

                {/* Role / Title */}
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Designation / Hospital Role
                  </label>
                  <input
                    type="text"
                    value={docFormRole}
                    onChange={(e) => setDocFormRole(e.target.value)}
                    placeholder="e.g. Consultant Obstetrician & Laparoscopic Specialist"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                  />
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Academic Qualifications <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={docFormQualifications}
                  onChange={(e) => setDocFormQualifications(e.target.value)}
                  placeholder="e.g. MBBS, DNB - Obstetrics & Gynecology, Fellow in Infertility (IMA)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                />
              </div>

              {/* Photo Input (Upload or URL) */}
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                  Doctor Profile Photo
                </label>
                <div className="flex items-center space-x-2 mb-2.5">
                  <button
                    type="button"
                    onClick={() => setDocFormPhotoType('upload')}
                    className={`text-xs py-1.5 px-3 rounded-md font-semibold transition-colors flex items-center ${
                      docFormPhotoType === 'upload'
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5 mr-1" />
                    Upload from Device
                  </button>
                  <button
                    type="button"
                    onClick={() => setDocFormPhotoType('url')}
                    className={`text-xs py-1.5 px-3 rounded-md font-semibold transition-colors flex items-center ${
                      docFormPhotoType === 'url'
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 mr-1" />
                    Photo File Path / URL
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <div className="sm:col-span-2">
                    {docFormPhotoType === 'upload' ? (
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-teal-500 transition-colors bg-slate-50 relative">
                        <input
                          type="file"
                          id="doctor-file-upload"
                          ref={doctorFileInputRef}
                          accept="image/*"
                          onChange={handleDoctorPhotoUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="doctor-file-upload"
                          className="cursor-pointer flex flex-col items-center justify-center space-y-1"
                        >
                          {isCompressingDoctorPhoto ? (
                            <div className="flex items-center space-x-2 py-1">
                              <RefreshCw className="w-5 h-5 text-teal-600 animate-spin" />
                              <span className="text-xs font-semibold text-teal-700">Compressing photo...</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-teal-600" />
                              <span className="text-xs font-semibold text-teal-700">Choose photo file</span>
                              <span className="text-[11px] text-slate-400">JPG, PNG, WEBP (auto-compressed)</span>
                            </>
                          )}
                        </label>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={docFormPhotoUrl}
                        onChange={(e) => setDocFormPhotoUrl(e.target.value)}
                        placeholder="e.g. /assets/doctors/dr-name.jpg or https://..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-teal-600"
                      />
                    )}
                  </div>

                  {/* Photo Thumbnail Preview */}
                  <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center">
                      {(docFormPhotoType === 'upload' ? docFormUploadedPhoto : docFormPhotoUrl) ? (
                        <img
                          src={docFormPhotoType === 'upload' ? docFormUploadedPhoto : docFormPhotoUrl}
                          alt="Preview"
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/assets/branding/db-logo.jpg';
                          }}
                        />
                      ) : (
                        <Stethoscope className="w-6 h-6 text-slate-300" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">Preview</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Professional Bio / Description
                </label>
                <textarea
                  rows={3}
                  value={docFormBio}
                  onChange={(e) => setDocFormBio(e.target.value)}
                  placeholder="Doctor's background, training, fellowship, and hospital responsibilities..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-teal-600"
                />
              </div>

              {/* Areas of Expertise Tag Manager */}
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Areas of Expertise (Chips)
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={currentExpertiseInput}
                    onChange={(e) => setCurrentExpertiseInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddExpertise();
                      }
                    }}
                    placeholder="e.g. Laparoscopic Surgery, High-Risk Pregnancy (Press Enter)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddExpertise}
                    className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold hover:bg-teal-100"
                  >
                    Add Chip
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[30px] p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                  {docFormExpertiseList.map((exp, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-2xs"
                    >
                      <span>{exp}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExpertise(idx)}
                        className="text-slate-400 hover:text-red-500 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {docFormExpertiseList.length === 0 && (
                    <span className="text-[11px] text-slate-400 italic">No expertise chips added yet.</span>
                  )}
                </div>
              </div>

              {/* Services Offered Tag Manager */}
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Services / Treatments Offered (Chips)
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={currentServiceInput}
                    onChange={(e) => setCurrentServiceInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddService();
                      }
                    }}
                    placeholder="e.g. Normal Delivery & Cesarean, Hysterectomy (Press Enter)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold hover:bg-teal-100"
                  >
                    Add Chip
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[30px] p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                  {docFormServicesList.map((srv, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-teal-800 text-xs font-medium shadow-2xs"
                    >
                      <span>{srv}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(idx)}
                        className="text-slate-400 hover:text-red-500 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {docFormServicesList.length === 0 && (
                    <span className="text-[11px] text-slate-400 italic">No clinical services chips added yet.</span>
                  )}
                </div>
              </div>

              {/* OPD Schedule Info */}
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  OPD Schedule & Consultation Timings
                </label>
                <input
                  type="text"
                  value={docFormSchedule}
                  onChange={(e) => setDocFormSchedule(e.target.value)}
                  placeholder="e.g. Mon - Sat: 10:00 AM - 4:00 PM. 24/7 Emergency."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-teal-600"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="doc-active-checkbox"
                  checked={docFormActive}
                  onChange={(e) => setDocFormActive(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                />
                <label htmlFor="doc-active-checkbox" className="text-xs font-semibold text-navy-900 cursor-pointer">
                  Active & Visible on Public Website
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100 flex-shrink-0">
                <button
                  type="button"
                  onClick={closeDoctorModal}
                  className="btn-outline text-xs sm:text-sm py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCompressingDoctorPhoto}
                  className="btn-teal text-xs sm:text-sm py-2.5 px-6 font-bold shadow-md disabled:opacity-50"
                >
                  <Check className="w-4 h-4 mr-1.5" />
                  {editingDoctor ? 'Save Changes' : 'Create Doctor Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL: VIEW DOCTOR DETAILS PREVIEW
          ============================================================== */}
      {viewingDoctor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn my-8">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                  <img
                    src={viewingDoctor.photo}
                    alt={viewingDoctor.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/branding/db-logo.jpg';
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-navy-900">
                      {viewingDoctor.name}
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      viewingDoctor.active !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {viewingDoctor.active !== false ? 'Active Live' : 'Hidden'}
                    </span>
                  </div>
                  {viewingDoctor.teluguName && (
                    <div className="text-teal-800 text-xs font-sans font-medium">{viewingDoctor.teluguName}</div>
                  )}
                  <div className="text-teal-700 text-xs font-semibold mt-0.5">{viewingDoctor.specialization}</div>
                  <div className="text-slate-500 text-xs">{viewingDoctor.qualifications}</div>
                </div>
              </div>

              <button
                onClick={() => setViewingDoctor(null)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Clinical Biography</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {viewingDoctor.bio}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-1.5">
                  {viewingDoctor.areasOfExpertise.map((exp, i) => (
                    <span key={i} className="bg-teal-50 text-teal-800 px-2 py-1 rounded-md font-medium text-[11px] border border-teal-100">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">Services & Procedures</h4>
                <div className="flex flex-wrap gap-1.5">
                  {viewingDoctor.services.map((srv, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-medium text-[11px]">
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {viewingDoctor.scheduleInfo && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Consultation Schedule</h4>
                  <div className="flex items-center text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <Clock className="w-4 h-4 mr-2 text-teal-600 flex-shrink-0" />
                    <span>{viewingDoctor.scheduleInfo}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={`/doctors/${viewingDoctor.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs py-2 px-3 inline-flex items-center"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
                View Public Web Page
              </Link>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const doc = viewingDoctor;
                    setViewingDoctor(null);
                    openEditDoctorModal(doc);
                  }}
                  className="btn-teal text-xs py-2 px-4 font-bold"
                >
                  <Pencil className="w-3.5 h-3.5 mr-1" />
                  Edit This Doctor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL: DELETE DOCTOR CONFIRMATION
          ============================================================== */}
      {deletingDoctor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="font-heading font-extrabold text-lg text-navy-900">
              Delete Doctor Profile?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently remove <strong className="text-navy-900">{deletingDoctor.name}</strong> from the Devibai Hospital directory? This will also remove their profile from the public doctors page.
            </p>

            <div className="pt-2 flex items-center justify-center space-x-3">
              <button
                onClick={() => setDeletingDoctor(null)}
                className="btn-outline text-xs py-2 px-4"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeleteDoctor}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Yes, Delete Doctor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL: EXPORT DOCTORS CODE
          ============================================================== */}
      {showDoctorExportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-fadeIn max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <h3 className="font-heading font-bold text-lg text-navy-900">
                  Export Doctors Data for `src/data/doctors.ts`
                </h3>
              </div>
              <button
                onClick={() => setShowDoctorExportModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Doctors are already live and saved in browser storage. To permanently freeze these records into your git repository, copy this snippet and replace <code>src/data/doctors.ts</code>.
            </p>

            <div className="flex-1 overflow-auto bg-slate-900 text-teal-300 p-4 rounded-xl text-xs font-mono max-h-80 border border-slate-800">
              <pre>{doctorsExportCode}</pre>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowDoctorExportModal(false)}
                className="btn-outline text-xs py-2 px-4"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleCopyDoctorsCode}
                className="btn-teal text-xs py-2 px-5 font-bold flex items-center"
              >
                {copiedDoctorCode ? (
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

      {/* ==============================================================
          MODAL: ADD GALLERY PHOTO
          ============================================================== */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-heading font-bold text-lg text-navy-900 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-teal-600" />
                Add Photo to Hospital Gallery
              </h3>
              <button onClick={() => setShowAddGalleryModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddGallery} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Image Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={galleryFormTitle}
                  onChange={(e) => setGalleryFormTitle(e.target.value)}
                  placeholder="e.g. Modern Laparoscopy Surgery Suite"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Image Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={galleryFormCategory}
                  onChange={(e) => setGalleryFormCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 bg-white"
                >
                  {AVAILABLE_GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                  Upload Image / Source <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2 mb-2.5">
                  <button
                    type="button"
                    onClick={() => setGalleryFormType('upload')}
                    className={`text-xs py-1.5 px-3 rounded-md font-semibold ${
                      galleryFormType === 'upload' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Upload from Device
                  </button>
                  <button
                    type="button"
                    onClick={() => setGalleryFormType('url')}
                    className={`text-xs py-1.5 px-3 rounded-md font-semibold ${
                      galleryFormType === 'url' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Image URL / Path
                  </button>
                </div>

                {galleryFormType === 'upload' ? (
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50">
                    <input
                      type="file"
                      id="gallery-add-input"
                      ref={galleryFileInputRef}
                      accept="image/*"
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                    <label htmlFor="gallery-add-input" className="cursor-pointer flex flex-col items-center">
                      {isCompressingGallery ? (
                        <div className="flex items-center space-x-2">
                          <RefreshCw className="w-5 h-5 text-teal-600 animate-spin" />
                          <span className="text-xs font-semibold text-teal-700">Compressing...</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-teal-600 mb-1" />
                          <span className="text-xs font-semibold text-teal-700">Select Image File</span>
                          <span className="text-[11px] text-slate-400">JPG, PNG, WEBP</span>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={galleryFormUrl}
                    onChange={(e) => setGalleryFormUrl(e.target.value)}
                    placeholder="e.g. /assets/gallery/photo.jpg"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Caption (Optional)
                </label>
                <textarea
                  rows={2}
                  value={galleryFormCaption}
                  onChange={(e) => setGalleryFormCaption(e.target.value)}
                  placeholder="Caption displayed when photo is clicked..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddGalleryModal(false)}
                  className="btn-outline text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCompressingGallery}
                  className="btn-teal text-xs py-2 px-5 font-bold shadow-sm"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL: EDIT GALLERY PHOTO
          ============================================================== */}
      {editingGalleryItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-heading font-bold text-lg text-navy-900 flex items-center">
                <Pencil className="w-5 h-5 mr-2 text-teal-600" />
                Update Gallery Photo
              </h3>
              <button onClick={() => setEditingGalleryItem(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditGallery} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">Image Name</label>
                <input
                  type="text"
                  required
                  value={galleryFormTitle}
                  onChange={(e) => setGalleryFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">Image Category</label>
                <select
                  value={galleryFormCategory}
                  onChange={(e) => setGalleryFormCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white"
                >
                  {AVAILABLE_GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1.5">Replace Image</label>
                <div className="flex items-center space-x-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setGalleryFormType('upload')}
                    className={`text-xs py-1 px-3 rounded ${
                      galleryFormType === 'upload' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Upload New
                  </button>
                  <button
                    type="button"
                    onClick={() => setGalleryFormType('url')}
                    className={`text-xs py-1 px-3 rounded ${
                      galleryFormType === 'url' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    URL / Path
                  </button>
                </div>

                {galleryFormType === 'upload' ? (
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-3 text-center bg-slate-50">
                    <input
                      type="file"
                      id="gallery-edit-input"
                      accept="image/*"
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                    <label htmlFor="gallery-edit-input" className="cursor-pointer text-xs font-semibold text-teal-700">
                      Click to upload replacement image
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={galleryFormUrl}
                    onChange={(e) => setGalleryFormUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">Caption</label>
                <textarea
                  rows={2}
                  value={galleryFormCaption}
                  onChange={(e) => setGalleryFormCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingGalleryItem(null)}
                  className="btn-outline text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-teal text-xs py-2 px-5 font-bold shadow-sm">
                  Update Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL: EXPORT GALLERY CODE
          ============================================================== */}
      {showGalleryExportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-fadeIn max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <h3 className="font-heading font-bold text-lg text-navy-900">
                  Export Gallery Code for `src/data/gallery.ts`
                </h3>
              </div>
              <button onClick={() => setShowGalleryExportModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Copy this snippet to replace <code>src/data/gallery.ts</code> to permanently commit photos into your Git repository.
            </p>

            <div className="flex-1 overflow-auto bg-slate-900 text-teal-300 p-4 rounded-xl text-xs font-mono max-h-80 border border-slate-800">
              <pre>{galleryExportCode}</pre>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowGalleryExportModal(false)}
                className="btn-outline text-xs py-2 px-4"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(galleryExportCode);
                  setCopiedGalleryCode(true);
                  setTimeout(() => setCopiedGalleryCode(false), 2500);
                }}
                className="btn-teal text-xs py-2 px-5 font-bold flex items-center"
              >
                {copiedGalleryCode ? 'Copied to Clipboard!' : 'Copy Code'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
