import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { COMPANY_CONFIG, getQuickConsultationUrl } from '../data/hogoData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  return (
    <footer className="bg-[#052344] text-white pt-16 pb-12 border-t border-[#093566]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Motto Column (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* White card container for crisp logo presentation */}
            <div className="inline-block bg-white px-4 py-2 rounded-xl shadow-xs">
              <img
                src={COMPANY_CONFIG.logoPath}
                alt="HOGO Pest Management Logo"
                className="h-10 sm:h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Requested tagline: Protect - Prevent - Preserve under the logo */}
            <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-emerald-400 uppercase">
              Protect · Prevent · Preserve
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Layanan profesional pembasmi hama residensial dan komersial dengan pendekatan Integrated Pest Management (IPM), formulasi ramah lingkungan, dan garansi resmi bersertifikat.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Standar Kementerian Pertanian & WHO</span>
            </div>
          </div>

          {/* Quick Nav Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Navigasi Cepat
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#layanan" className="hover:text-emerald-400 transition-colors">Semua Layanan</a></li>
              <li><a href="#tentang" className="hover:text-emerald-400 transition-colors">Profil & Visi Misi</a></li>
              <li><a href="#kalkulator" className="hover:text-emerald-400 transition-colors">Kalkulator Estimasi</a></li>
              <li><a href="#panduan" className="hover:text-emerald-400 transition-colors">Kenali Tanda Hama</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Tanya Jawab (FAQ)</a></li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                >
                  Booking Jadwal Online
                </button>
              </li>
            </ul>
          </div>

          {/* Services Quick List (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Layanan Unggulan
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#layanan" className="hover:text-emerald-400 transition-colors">Anti Rayap (Garansi s/d 5 Tahun)</a></li>
              <li><a href="#layanan" className="hover:text-emerald-400 transition-colors">Pengendalian Tikus (Rodent Control)</a></li>
              <li><a href="#layanan" className="hover:text-emerald-400 transition-colors">Kecoak & Semut (Gel Baiting)</a></li>
              <li><a href="#layanan" className="hover:text-emerald-400 transition-colors">Pengendalian Nyamuk & Fogging ULV</a></li>
              <li><a href="#layanan" className="hover:text-emerald-400 transition-colors">Eliminasi Kutu Kasur (Steam 180°C)</a></li>
              <li><a href="#layanan" className="hover:text-emerald-400 transition-colors">Kontrak IPM Restoran, Pabrik & Gudang</a></li>
            </ul>
          </div>

          {/* Contact & Hours (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Hubungi Kami
            </p>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href={getQuickConsultationUrl('Tanya via Footer')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="tabular-nums font-semibold">{COMPANY_CONFIG.displayPhone} (WA)</span>
              </a>

              <a
                href={`tel:${COMPANY_CONFIG.whatsappNumber}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="tabular-nums">{COMPANY_CONFIG.displayPhone}</span>
              </a>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COMPANY_CONFIG.email}</span>
              </div>

              <div className="flex items-start gap-2 pt-1 text-slate-400 leading-relaxed">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.headquarters}</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-emerald-300 font-semibold">
                Jam Kerja Layanan:
              </p>
              <p className="text-[11px] text-slate-400">
                {COMPANY_CONFIG.operationalHours}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom row copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-slate-200">HOGO Pest Management</strong>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-emerald-400 underline underline-offset-2 cursor-pointer"
            >
              Admin CMS Login
            </button>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Syarat & Ketentuan Layanan</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
