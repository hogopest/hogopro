import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  Send, 
  CheckCircle, 
  Building
} from 'lucide-react';
import { COMPANY_CONFIG, getQuickConsultationUrl } from '../data/hogoData';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Anti Rayap (Termite Control)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Build WhatsApp URL and open
    const waText = encodeURIComponent(
      `Halo HOGO Pest Management, saya ${name} (${phone}).\n` +
      `Ingin berkonsultasi mengenai layanan: *${service}*.\n` +
      (message ? `Pesan: ${message}\n` : '') +
      `Mohon info tindak lanjut dan survei lokasi. Terima kasih!`
    );

    window.open(`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${waText}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="kontak" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-widest text-[#0E6B5A] uppercase mb-2">
            HUBUNGI KAMI & KONSULTASI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052344] tracking-tight text-balance">
            Konsultasi Langsung & Jadwalkan Survei Lokasi
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Tim teknisi dan konsultan HOGO siap membantu Anda 24/7 untuk penanganan hama darurat maupun penjadwalan inspeksi rutin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info: Contact channels & office (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
              <h3 className="text-lg font-bold text-[#052344]">
                Kontak Resmi HOGO Pest Management
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* WhatsApp Hotlink */}
                <a
                  href={getQuickConsultationUrl('Konsultasi via Website')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-[#edf8f6] hover:bg-[#ddf2ee] border border-[#0E6B5A]/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0E6B5A] text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#052344] group-hover:text-[#0E6B5A] transition-colors">
                      WhatsApp Customer Support (24 Jam)
                    </p>
                    <p className="text-[#0E6B5A] font-semibold tabular-nums mt-0.5">
                      {COMPANY_CONFIG.displayPhone}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Klik untuk chat langsung tanpa simpan nomor</p>
                  </div>
                </a>

                {/* Telephone */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-[#052344] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#052344]">Hotline Kantor & Layanan Cepat</p>
                    <p className="text-slate-700 font-medium tabular-nums mt-0.5">
                      {COMPANY_CONFIG.displayPhone}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Operasional Pagi - Malam</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#052344]">Email Resmi & Permintaan Proposal</p>
                    <p className="text-slate-700 font-medium mt-0.5">{COMPANY_CONFIG.email}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#052344]">Kantor Pusat Operasional</p>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                      {COMPANY_CONFIG.headquarters}
                    </p>
                  </div>
                </div>

              </div>

              {/* Service Areas */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  Wilayah Cakupan Layanan:
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                  {COMPANY_CONFIG.serviceCoverage.map(area => (
                    <span key={area} className="px-2 py-0.5 bg-slate-100 rounded-md text-slate-700 border border-slate-200">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Form: Quick Inquiry Form (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-[#052344] mb-1">
              Kirim Pesan Konsultasi Cepat
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Isi data berikut untuk langsung terhubung dengan tim teknis kami via WhatsApp atau dijadwalkan inspeksi.
            </p>

            {submitted ? (
              <div className="text-center py-10 space-y-3 bg-[#edf8f6] rounded-xl border border-[#0E6B5A]/30 p-6">
                <CheckCircle className="w-12 h-12 text-[#0E6B5A] mx-auto" />
                <h4 className="text-lg font-bold text-[#052344]">Pesan Anda Terhubung ke WhatsApp!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Jika chat WhatsApp belum terbuka otomatis, silakan klik tombol di bawah ini:
                </p>
                <div className="pt-2">
                  <a
                    href={getQuickConsultationUrl(`Konsultasi ${service}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0E6B5A] rounded-xl"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Buka Chat WhatsApp Sekarang</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Nama Anda *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08XXXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Layanan yang Diperlukan
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A] focus:bg-white"
                  >
                    <option value="Anti Rayap (Termite Control)">Anti Rayap (Termite Control) - Garansi 3-5 Tahun</option>
                    <option value="Pengendalian Tikus (Rodent Control)">Pengendalian Tikus (Rodent Control)</option>
                    <option value="Kecoak & Semut (General Pest)">Kecoak & Semut (General Pest)</option>
                    <option value="Nyamuk & Lalat (Fogging/ULV)">Nyamuk & Lalat (Fogging/ULV)</option>
                    <option value="Kutu Kasur (Bed Bug Heat Treatment)">Kutu Kasur (Bed Bug Heat Treatment)</option>
                    <option value="Kontrak IPM Bisnis / Resto / Gudang">Kontrak IPM Bisnis / Resto / Gudang</option>
                    <option value="Survei & Inspeksi Lokasi Gratis">Survei & Inspeksi Lokasi Gratis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Ceritakan Masalah Hama Anda (Opsional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Lokasi properti, indikasi yang terlihat, atau waktu yang diharapkan..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E6B5A] focus:bg-white"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#0E6B5A] hover:bg-[#094f42] rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Kirim & Mulai Konsultasi WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-bold text-[#052344] bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#0E6B5A]" />
                    <span>Atau Buka Formulir Booking</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
