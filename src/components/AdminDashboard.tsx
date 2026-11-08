import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  LogOut, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Image as ImageIcon, 
  Settings, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Phone,
  Building,
  Sparkles
} from 'lucide-react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { COMPANY_CONFIG, SERVICES_LIST } from '../data/hogoData';
import { ServiceItem } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onContentUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, onContentUpdated }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('admin@hogopest.id');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'services' | 'hero'>('general');
  const [successMessage, setSuccessMessage] = useState('');

  // Editable Site Settings State
  const [settings, setSettings] = useState({
    companyName: COMPANY_CONFIG.name,
    tagline: COMPANY_CONFIG.tagline,
    phone: COMPANY_CONFIG.displayPhone,
    whatsapp: COMPANY_CONFIG.whatsappNumber,
    email: COMPANY_CONFIG.email,
    address: COMPANY_CONFIG.headquarters,
    heroTitle: 'Perlindungan Hama Menyeluruh, Modern & Bergaransi Resmi',
    heroDescription: 'Jaga kenyamanan hunian, keselamatan keluarga, dan reputasi bisnis Anda dari ancaman rayap, tikus, kecoak, serta serangga berbahaya.',
    heroImageUrl: '/src/assets/images/hero_pest_inspection_1792946456058.jpg',
    logoUrl: COMPANY_CONFIG.logoPath
  });

  const [services, setServices] = useState<ServiceItem[]>(SERVICES_LIST);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchCloudData();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchCloudData = async () => {
    try {
      setLoading(true);
      // Fetch settings
      const settingsRef = doc(db, 'site_content', 'main_settings');
      const settingsSnap = await getDoc(settingsRef);
      if (settingsSnap.exists()) {
        setSettings(settingsSnap.data() as any);
      } else {
        // Initialize if not exists
        await setDoc(settingsRef, settings);
      }

      // Fetch services
      const servicesSnap = await getDocs(collection(db, 'services'));
      if (!servicesSnap.empty) {
        const cloudServices: ServiceItem[] = [];
        servicesSnap.forEach((d) => {
          cloudServices.push({ id: d.id, ...d.data() } as ServiceItem);
        });
        setServices(cloudServices);
      }
    } catch (err) {
      console.error('Error fetching cloud data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      // If user doesn't exist yet, try creating default admin account for convenience
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (createErr: any) {
        setLoginError('Login gagal. Periksa kembali email dan password Anda (min. 6 karakter).');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const settingsRef = doc(db, 'site_content', 'main_settings');
      await setDoc(settingsRef, settings, { merge: true });
      setSuccessMessage('Pengaturan situs berhasil disimpan ke Cloud Database!');
      onContentUpdated();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Gagal menyimpan pengaturan.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      setLoading(true);
      if (isAddingService) {
        const docRef = await addDoc(collection(db, 'services'), {
          name: editingService.name,
          shortDescription: editingService.shortDescription,
          category: editingService.category,
          warranty: editingService.warranty,
          startingPrice: editingService.startingPrice,
          targetPest: editingService.targetPest,
          treatmentMethod: ['Chemical Barrier', 'Inspeksi Thermal', 'Garansi Resmi'],
          features: ['Garansi Ulang', 'Bahan Eco-Safe'],
          suitableFor: ['Rumah Tinggal', 'Komersial']
        });
        setServices(prev => [...prev, { ...editingService, id: docRef.id }]);
      } else {
        const docRef = doc(db, 'services', editingService.id);
        await updateDoc(docRef, { ...editingService });
        setServices(prev => prev.map(s => s.id === editingService.id ? editingService : s));
      }
      setEditingService(null);
      setIsAddingService(false);
      setSuccessMessage('Data layanan berhasil diperbarui!');
      onContentUpdated();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving service:', err);
      alert('Gagal menyimpan layanan.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm('Hapus layanan ini dari database?')) return;
    try {
      await deleteDoc(doc(db, 'services', serviceId));
      setServices(prev => prev.filter(s => s.id !== serviceId));
      setSuccessMessage('Layanan berhasil dihapus.');
      onContentUpdated();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#052344] px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0E6B5A] flex items-center justify-center text-white">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">HOGO Admin CMS Dashboard</h2>
              <p className="text-xs text-slate-300">Kelola Konten, Banner, Logo, & Layanan Website</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          
          {!user ? (
            /* Login Screen */
            <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm my-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#edf8f6] text-[#0E6B5A] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#052344]">Login Admin HOGO</h3>
                <p className="text-xs text-slate-500 mt-1">Masukkan kredensial admin untuk mengakses panel CMS</p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Email Admin
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Password (Min. 6 Karakter)
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#052344] hover:bg-[#03172e] text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? 'Memproses...' : 'Masuk ke Dashboard Admin'}
                </button>
              </form>
            </div>
          ) : (
            /* Admin Dashboard Panel */
            <div className="space-y-6">
              
              {/* Success Notification */}
              {successMessage && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-xs animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-[#0E6B5A] shrink-0" />
                  <span className="font-medium">{successMessage}</span>
                </div>
              )}

              {/* Top User Bar */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0E6B5A] flex items-center justify-center font-bold">
                    A
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Masuk sebagai:</p>
                    <p className="text-sm font-bold text-[#052344]">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'general' ? 'bg-[#052344] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Informasi & Kontak Perusahaan
                </button>

                <button
                  onClick={() => setActiveTab('hero')}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'hero' ? 'bg-[#052344] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Banner & Teks Hero
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'services' ? 'bg-[#052344] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Kelola Layanan Hama ({services.length})
                </button>
              </div>

              {/* TAB 1: GENERAL & CONTACT */}
              {activeTab === 'general' && (
                <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <h3 className="text-base font-bold text-[#052344] border-b border-slate-100 pb-2">
                    Pengaturan Identitas & Kontak Website
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Nama Perusahaan
                      </label>
                      <input
                        type="text"
                        value={settings.companyName}
                        onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Tagline (Di Bawah Logo)
                      </label>
                      <input
                        type="text"
                        value={settings.tagline}
                        onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                        No. Telepon / Hotline
                      </label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Nomor WhatsApp (Format: 628XXXXXXXX)
                      </label>
                      <input
                        type="text"
                        value={settings.whatsapp}
                        onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Email Resmi
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Alamat Kantor Pusat
                    </label>
                    <textarea
                      rows={2}
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      URL Path Logo Perusahaan
                    </label>
                    <input
                      type="text"
                      value={settings.logoUrl}
                      onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-[#052344] hover:bg-[#03172e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Save className="w-4 h-4 text-emerald-400" />
                      <span>Simpan Perubahan Kontak</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: HERO & BANNER */}
              {activeTab === 'hero' && (
                <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <h3 className="text-base font-bold text-[#052344] border-b border-slate-100 pb-2">
                    Kelola Teks Utama & Banner Gambar Hero
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Judul Utama Hero (Headline)
                    </label>
                    <input
                      type="text"
                      value={settings.heroTitle}
                      onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Deskripsi Hero
                    </label>
                    <textarea
                      rows={3}
                      value={settings.heroDescription}
                      onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      URL Gambar Banner Utama (Hero Image URL / Path)
                    </label>
                    <input
                      type="text"
                      value={settings.heroImageUrl}
                      onChange={(e) => setSettings({ ...settings, heroImageUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Anda dapat memasukkan path lokal (cth: /src/assets/images/...) atau URL gambar publik.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-[#052344] hover:bg-[#03172e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Save className="w-4 h-4 text-emerald-400" />
                      <span>Simpan Perubahan Banner & Hero</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: SERVICES */}
              {activeTab === 'services' && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-[#052344]">Daftar Layanan Pembasmi Hama</h3>
                      <p className="text-xs text-slate-500">Tambah, ubah, atau hapus layanan yang tampil di website</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingService({
                          id: 'new-' + Date.now(),
                          name: '',
                          shortDescription: '',
                          category: 'residential',
                          warranty: 'Garansi 1 Tahun',
                          startingPrice: 'Mulai Rp 500.000',
                          targetPest: '',
                          treatmentMethod: [],
                          features: [],
                          suitableFor: [],
                          icon: 'ShieldAlert'
                        } as any);
                        setIsAddingService(true);
                      }}
                      className="px-4 py-2 bg-[#0E6B5A] hover:bg-[#094f42] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Layanan Baru</span>
                    </button>
                  </div>

                  {/* Add/Edit Service Modal Form */}
                  {editingService && (
                    <div className="bg-slate-50 border border-slate-300 rounded-xl p-5 my-4 space-y-3 animate-in fade-in">
                      <h4 className="text-sm font-bold text-[#052344]">
                        {isAddingService ? 'Tambah Layanan Baru' : `Edit Layanan: ${editingService.name}`}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Nama Layanan</label>
                          <input
                            type="text"
                            value={editingService.name}
                            onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                            placeholder="Cth: Termite Control"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                          <select
                            value={editingService.category}
                            onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                          >
                            <option value="residential">Hunian / Residential</option>
                            <option value="commercial">Komersial / Bisnis</option>
                            <option value="specialized">Spesialis</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                        <textarea
                          rows={2}
                          value={editingService.shortDescription}
                          onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Garansi</label>
                          <input
                            type="text"
                            value={editingService.warranty}
                            onChange={(e) => setEditingService({ ...editingService, warranty: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Harga Mulai</label>
                          <input
                            type="text"
                            value={editingService.startingPrice}
                            onChange={(e) => setEditingService({ ...editingService, startingPrice: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Target Hama</label>
                          <input
                            type="text"
                            value={editingService.targetPest}
                            onChange={(e) => setEditingService({ ...editingService, targetPest: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-200 rounded-lg cursor-pointer"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveService}
                          className="px-4 py-2 text-xs font-bold text-white bg-[#052344] rounded-lg cursor-pointer"
                        >
                          Simpan Layanan
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Services List Table */}
                  <div className="space-y-2">
                    {services.map((s) => (
                      <div key={s.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-[#052344]">{s.name}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{s.shortDescription}</p>
                          <div className="flex items-center gap-3 text-[11px] text-[#0E6B5A] font-medium mt-1">
                            <span>{s.warranty}</span>
                            <span>·</span>
                            <span>{s.startingPrice}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingService(s);
                              setIsAddingService(false);
                            }}
                            className="p-2 text-slate-600 hover:text-[#052344] bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit Layanan"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteService(s.id)}
                            className="p-2 text-red-600 bg-white border border-slate-200 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Hapus Layanan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Firebase Cloud Database terhubung aman · Perubahan tersinkron otomatis untuk publik.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-[#052344] bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Tutup Panel Admin
          </button>
        </div>

      </div>
    </div>
  );
};
