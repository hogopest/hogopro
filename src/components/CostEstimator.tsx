import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Clock, Check, MessageCircle, Calendar } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/hogoData';

interface CostEstimatorProps {
  onOpenBooking: () => void;
}

interface PestOption {
  id: string;
  name: string;
  baseRatePerSqm: number;
  baseFixedCost: number;
  warranty: string;
  method: string;
  estimatedHours: string;
}

const PEST_OPTIONS: PestOption[] = [
  {
    id: 'rayap',
    name: 'Anti Rayap (Termites)',
    baseRatePerSqm: 18000,
    baseFixedCost: 1500000,
    warranty: 'Garansi Sertifikat 3 - 5 Tahun',
    method: 'Chemical Barrier Injeksi + Thermal Detection',
    estimatedHours: '2 - 4 Jam'
  },
  {
    id: 'tikus',
    name: 'Pengendalian Tikus (Rodents)',
    baseRatePerSqm: 4000,
    baseFixedCost: 650000,
    warranty: 'Garansi Monitoring 60 Hari',
    method: 'Exclusion Proofing + Tamper-Proof Bait Stations',
    estimatedHours: '1 - 2 Jam'
  },
  {
    id: 'kecoak',
    name: 'Kecoak & Semut (General Pest)',
    baseRatePerSqm: 3500,
    baseFixedCost: 500000,
    warranty: 'Garansi Evaluasi 60 Hari',
    method: 'Gel Baiting Odorless + Micro-Residual Spraying',
    estimatedHours: '1 - 1.5 Jam'
  },
  {
    id: 'nyamuk',
    name: 'Nyamuk & Lalat (Fogging/ULV)',
    baseRatePerSqm: 4500,
    baseFixedCost: 750000,
    warranty: 'Siklus Proteksi Berkala',
    method: 'Cold Fogging ULV Indoor + Thermal Fog Outdoor',
    estimatedHours: '1 - 2 Jam'
  },
  {
    id: 'kutu-kasur',
    name: 'Kutu Kasur (Bed Bugs)',
    baseRatePerSqm: 6000,
    baseFixedCost: 850000,
    warranty: 'Garansi Bebas Kutu 45 Hari',
    method: 'High-Heat Dry Steaming 180°C + Safe Micro Residual',
    estimatedHours: '2 - 3 Jam'
  }
];

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onOpenBooking }) => {
  const [selectedPestId, setSelectedPestId] = useState<string>('rayap');
  const [areaSize, setAreaSize] = useState<number>(120);
  const [propertyType, setPropertyType] = useState<string>('Rumah Tinggal');
  const [treatmentFrequency, setTreatmentFrequency] = useState<'single' | 'contract'>('single');

  const selectedPest = PEST_OPTIONS.find(p => p.id === selectedPestId) || PEST_OPTIONS[0];

  // Calculate realistic estimated range
  const rawEstimate = selectedPest.baseFixedCost + (areaSize * selectedPest.baseRatePerSqm);
  // Apply discount for contract
  const finalEstimate = treatmentFrequency === 'contract' ? rawEstimate * 0.85 : rawEstimate;
  
  const minEstimate = Math.round((finalEstimate * 0.9) / 50000) * 50000;
  const maxEstimate = Math.round((finalEstimate * 1.15) / 50000) * 50000;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const getWhatsAppEstimateLink = () => {
    const text = encodeURIComponent(
      `Halo HOGO Pest Management, saya mencoba Kalkulator Estimasi Biaya di website:\n\n` +
      `🎯 Hama: ${selectedPest.name}\n` +
      `🏠 Properti: ${propertyType}\n` +
      `📐 Luas Area: ${areaSize} m²\n` +
      `📋 Paket: ${treatmentFrequency === 'contract' ? 'Program Pemeliharaan Berkala' : 'Single Intensive Treatment'}\n` +
      `💰 Perkiraan: ${formatRupiah(minEstimate)} - ${formatRupiah(maxEstimate)}\n\n` +
      `Mohon verifikasi jadwal survei gratis dan proposal resmi di lokasi saya. Terima kasih!`
    );
    return `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="kalkulator" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#0E6B5A] uppercase mb-2">
            TRANSPARANSI BIAYA & METODE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052344] tracking-tight text-balance">
            Kalkulator Estimasi Biaya & Rencana Penanganan
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Dapatkan perkiraan biaya dan metode yang paling sesuai dengan luas properti Anda secara transparan dalam hitungan detik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Controls: Left Panel (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Step 1: Pest Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2.5">
                1. Pilih Kategori Masalah Hama
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PEST_OPTIONS.map((pest) => {
                  const isSelected = pest.id === selectedPestId;
                  return (
                    <button
                      key={pest.id}
                      type="button"
                      onClick={() => setSelectedPestId(pest.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#0E6B5A] bg-[#edf8f6] text-[#052344]'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <span className="truncate">{pest.name}</span>
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

            {/* Step 2: Property Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2.5">
                2. Tipe Bangunan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Rumah Tinggal', 'Ruko / Kantor', 'Resto / Cafe'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPropertyType(t)}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-medium text-center transition-colors cursor-pointer truncate ${
                      propertyType === t
                        ? 'bg-[#052344] text-white border-[#052344]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  3. Perkiraan Luas Bangunan
                </label>
                <span className="text-base font-extrabold text-[#052344] tabular-nums">
                  {areaSize} m²
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="800"
                step="10"
                value={areaSize}
                onChange={(e) => setAreaSize(Number(e.target.value))}
                className="w-full accent-[#0E6B5A] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>30 m²</span>
                <span>200 m² (Rata-rata Rumah)</span>
                <span>800 m²</span>
              </div>
            </div>

            {/* Step 4: Package Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                4. Pilihan Paket
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTreatmentFrequency('single')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    treatmentFrequency === 'single'
                      ? 'border-[#0E6B5A] bg-[#edf8f6]'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-[#052344]">Single Intensive</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Penuntasan instan 1 siklus</p>
                </button>

                <button
                  type="button"
                  onClick={() => setTreatmentFrequency('contract')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    treatmentFrequency === 'contract'
                      ? 'border-[#0E6B5A] bg-[#edf8f6]'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#052344]">Maintenance Rutin</p>
                    <span className="text-[10px] text-emerald-700 font-bold">Hemat 15%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Kontrak monitoring berkala</p>
                </button>
              </div>
            </div>

          </div>

          {/* Result: Right Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#052344] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Estimasi HOGO
                  </span>
                </div>
                <span className="text-xs text-slate-300">Survei Lokasi Rp 0</span>
              </div>

              <div>
                <span className="text-xs text-slate-300">Perkiraan Biaya Treatment:</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight mt-1">
                  {formatRupiah(minEstimate)} <span className="text-lg font-normal text-slate-300">-</span> {formatRupiah(maxEstimate)}
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  *Biaya final dikonfirmasi setelah survei inspeksi lokasi gratis oleh tim teknisi.
                </p>
              </div>

              {/* Scope details */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Garansi Layanan:</p>
                    <p className="text-slate-300">{selectedPest.warranty}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Estimasi Durasi Pengerjaan:</p>
                    <p className="text-slate-300">{selectedPest.estimatedHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Metode Utama:</p>
                    <p className="text-slate-300">{selectedPest.method}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 space-y-2.5">
              <a
                href={getWhatsAppEstimateLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#0E6B5A] hover:bg-[#094f42] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Klaim Estimasi Ini via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pilih Tanggal & Jadwalkan Sekarang</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
