import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  ChevronLeft,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { SERVICES_LIST, getWhatsAppBookingUrl, COMPANY_CONFIG } from '../data/hogoData';
import { BookingData } from '../types';

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

const PROPERTY_TYPES = [
  'Rumah Tinggal',
  'Apartemen / Kondominium',
  'Ruko / Kantor',
  'Restoran / Kafe / F&B',
  'Gudang / Pabrik',
  'Hotel / Villa / Kost'
];

const TIME_SLOTS = [
  { id: 'morning', label: 'Pagi (08:00 - 12:00)', desc: 'Ideal untuk inspeksi menyeluruh' },
  { id: 'afternoon', label: 'Siang (13:00 - 16:00)', desc: 'Jam tenang & fleksibel' },
  { id: 'evening', label: 'Sore (16:00 - 19:00)', desc: 'Setelah jam kerja / aktivitas keluarga' },
  { id: 'urgent', label: 'Layanan Darurat / Hari Ini', desc: 'Respon cepat prioritas teknisi' }
];

export const QuickBookingModal: React.FC<QuickBookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId
}) => {
  const [step, setStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  const [formData, setFormData] = useState<BookingData>({
    serviceId: initialServiceId || SERVICES_LIST[0].id,
    serviceName: SERVICES_LIST.find(s => s.id === initialServiceId)?.name || SERVICES_LIST[0].name,
    propertyType: PROPERTY_TYPES[0],
    areaSize: 150,
    scheduledDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    timeSlot: TIME_SLOTS[0].label,
    fullName: '',
    phoneWhatsApp: '',
    address: '',
    city: 'DKI Jakarta',
    notes: '',
    isUrgent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleServiceSelect = (serviceId: string) => {
    const s = SERVICES_LIST.find(item => item.id === serviceId);
    if (s) {
      setFormData(prev => ({
        ...prev,
        serviceId: s.id,
        serviceName: s.name
      }));
    }
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.serviceId) newErrors.serviceId = 'Pilih salah satu layanan';
    } else if (step === 2) {
      if (!formData.propertyType) newErrors.propertyType = 'Pilih tipe properti';
      if (!formData.areaSize || formData.areaSize <= 0) newErrors.areaSize = 'Masukkan luas area yang valid';
    } else if (step === 3) {
      if (!formData.scheduledDate) newErrors.scheduledDate = 'Pilih tanggal kunjungan';
      if (!formData.timeSlot) newErrors.timeSlot = 'Pilih sesi waktu';
    } else if (step === 4) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Nama lengkap wajib diisi';
      if (!formData.phoneWhatsApp.trim()) {
        newErrors.phoneWhatsApp = 'Nomor WhatsApp wajib diisi';
      } else if (!/^[0-9+-\s]{8,16}$/.test(formData.phoneWhatsApp)) {
        newErrors.phoneWhatsApp = 'Nomor WhatsApp tidak valid (min. 9 digit)';
      }
      if (!formData.address.trim()) newErrors.address = 'Alamat lengkap wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        // Finalize booking
        const randomCode = 'HOGO-' + Math.floor(100000 + Math.random() * 900000);
        setBookingRef(randomCode);
        setStep(5); // confirmation screen
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleCopySummary = () => {
    const summaryText = `Booking Ref: ${bookingRef}\nNama: ${formData.fullName}\nLayanan: ${formData.serviceName}\nProperti: ${formData.propertyType} (${formData.areaSize} m²)\nJadwal: ${formData.scheduledDate} - ${formData.timeSlot}\nLokasi: ${formData.address}, ${formData.city}\nCatatan: ${formData.notes || '-'}`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        
        {/* Modal Header */}
        <div className="bg-[#052344] px-5 py-4 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
                HOGO Instant Booking
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-300">Survei & Jadwal Cepat</span>
            </div>
            <h2 id="booking-modal-title" className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {step === 5 ? 'Booking Berhasil Terjadwal!' : 'Penjadwalan Layanan Hama'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Tutup form booking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator (when not in confirmation step) */}
        {step < 5 && (
          <div className="bg-slate-100 px-5 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 shrink-0">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="w-5 h-5 rounded-full bg-[#052344] text-white flex items-center justify-center text-[11px] font-bold">
                {step}
              </span>
              <span>
                {step === 1 && 'Pilih Layanan Hama'}
                {step === 2 && 'Tipe & Luas Properti'}
                {step === 3 && 'Pilih Tanggal & Waktu'}
                {step === 4 && 'Data Kontak Pemesan'}
              </span>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">Langkah {step} dari 4</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          
          {/* STEP 1: PILIH LAYANAN */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 mb-2">
                Pilih jenis masalah hama yang ingin ditangani di lokasi Anda:
              </p>
              
              <div className="grid grid-cols-1 gap-2.5">
                {SERVICES_LIST.map((service) => {
                  const isSelected = formData.serviceId === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceSelect(service.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected 
                          ? 'border-[#0E6B5A] bg-[#edf8f6] shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-bold ${isSelected ? 'text-[#052344]' : 'text-slate-800'}`}>
                            {service.name}
                          </p>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {service.shortDescription}
                        </p>
                        <div className="text-[11px] font-medium text-[#0E6B5A] flex items-center gap-2 pt-0.5">
                          <span>{service.warranty}</span>
                          <span>·</span>
                          <span className="font-semibold">{service.startingPrice}</span>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'border-[#0E6B5A] bg-[#0E6B5A] text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: PROPERTI & LUAS */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Tipe Properti / Bangunan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PROPERTY_TYPES.map((pt) => {
                    const isSelected = formData.propertyType === pt;
                    return (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => setFormData({ ...formData, propertyType: pt })}
                        className={`py-2.5 px-3 rounded-lg text-xs font-semibold border text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#052344] text-white border-[#052344]'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {pt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Estimasi Luas Area (m²)
                  </label>
                  <span className="text-sm font-bold text-[#0E6B5A] tabular-nums">
                    {formData.areaSize} m²
                  </span>
                </div>
                
                <input
                  type="range"
                  min="30"
                  max="1500"
                  step="10"
                  value={formData.areaSize}
                  onChange={(e) => setFormData({ ...formData, areaSize: Number(e.target.value) })}
                  className="w-full accent-[#0E6B5A] cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>30 m² (Kecil/Apartemen)</span>
                  <span>500 m² (Gedung/Ruko)</span>
                  <span>1.500 m² (Industri)</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#0E6B5A] shrink-0 mt-0.5" />
                <p>
                  Ukuran area membantu teknisi kami menyiapkan volume bahan ramah lingkungan yang presisi dan perkiraan durasi treatment di lokasi.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: TANGGAL & SESI WAKTU */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Pilih Tanggal Rencana Treatment / Survei
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A] focus:border-[#0E6B5A]"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                </div>
                {errors.scheduledDate && <p className="text-red-500 text-xs mt-1">{errors.scheduledDate}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Pilihan Waktu Kunjungan Teknisi
                </label>
                <div className="space-y-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = formData.timeSlot === slot.label;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setFormData({ 
                          ...formData, 
                          timeSlot: slot.label,
                          isUrgent: slot.id === 'urgent'
                        })}
                        className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-[#0E6B5A] bg-[#edf8f6]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div>
                          <p className={`text-xs font-bold ${isSelected ? 'text-[#052344]' : 'text-slate-800'}`}>
                            {slot.label}
                          </p>
                          <p className="text-[11px] text-slate-500">{slot.desc}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#0E6B5A] bg-[#0E6B5A] text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DATA PEMESAN */}
          {step === 4 && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Nama Lengkap Pemesan *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bpk. Michael Salim"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A]"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    No. WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    placeholder="0812XXXXXXXX"
                    value={formData.phoneWhatsApp}
                    onChange={(e) => setFormData({ ...formData, phoneWhatsApp: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A]"
                  />
                  {errors.phoneWhatsApp && <p className="text-red-500 text-xs mt-1">{errors.phoneWhatsApp}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Kota / Wilayah *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A]"
                  >
                    {COMPANY_CONFIG.serviceCoverage.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Alamat Lengkap Lokasi *
                </label>
                <textarea
                  rows={2}
                  placeholder="Nama jalan, nomor rumah/ruko, patokan lokasi..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A]"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Deskripsi Keluhan / Catatan Khusus (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Terlihat jalur tanah rayap di kusen pintu utama"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgentCheck"
                  checked={formData.isUrgent}
                  onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                  className="rounded text-[#0E6B5A] focus:ring-[#0E6B5A] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="urgentCheck" className="text-xs text-slate-700 cursor-pointer">
                  Tandai sebagai <span className="font-bold text-amber-700">Penanganan Darurat / Butuh Respon Segera</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS / CONFIRMATION & WHATSAPP REDIRECT */}
          {step === 5 && (
            <div className="text-center py-2 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-[#0E6B5A] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-[#0E6B5A] tracking-wider uppercase">
                  Kode Referensi: {bookingRef}
                </span>
                <h3 className="text-xl font-bold text-[#052344] mt-1">
                  Jadwal Layanan Siap Dikonfirmasi!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-1">
                  Terima kasih, <span className="font-semibold text-slate-800">{formData.fullName}</span>. Tim kami siap mengatur kedatangan teknisi dan inspeksi sesuai detail berikut:
                </p>
              </div>

              {/* Order Card Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Layanan:</span>
                  <span className="font-bold text-[#052344]">{formData.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Properti & Luas:</span>
                  <span className="font-medium text-slate-800">{formData.propertyType} ({formData.areaSize} m²)</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Waktu Kunjungan:</span>
                  <span className="font-medium text-slate-800">{formData.scheduledDate} · {formData.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Alamat:</span>
                  <span className="font-medium text-slate-800 text-right truncate max-w-[200px]">{formData.address}, {formData.city}</span>
                </div>
              </div>

              {/* WhatsApp Call to Action: The primary execution path */}
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={getWhatsAppBookingUrl(formData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 text-sm font-bold text-white bg-[#0E6B5A] hover:bg-[#094f42] rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Kirim & Konfirmasi ke WhatsApp CS</span>
                </a>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    onClick={handleCopySummary}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Tersalin ke Clipboard' : 'Salin Ringkasan'}</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 py-1.5 px-3"
                  >
                    Selesai & Tutup
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls (Steps 1-4) */}
        {step < 5 && (
          <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#052344] hover:bg-[#03172e] rounded-xl shadow-xs hover:shadow flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <span>{step === 4 ? 'Konfirmasi Booking' : 'Lanjutkan'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
