import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Shield, Calendar } from 'lucide-react';
import { COMPANY_CONFIG, getQuickConsultationUrl } from '../data/hogoData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Layanan', href: '#layanan' },
    { label: 'Profil & Visi', href: '#tentang' },
    { label: 'Kalkulator Biaya', href: '#kalkulator' },
    { label: 'Panduan Hama', href: '#panduan' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      {/* Top micro bar for quick contacts */}
      <div className="bg-[#052344] text-white py-1 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-200">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#168d77]" />
              <span className="hidden sm:inline">Layanan Pengendalian Hama Profesional & Bergaransi</span>
              <span className="sm:hidden">HOGO Pest Management</span>
            </span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline text-slate-300">Survei & Konsultasi Awal Gratis</span>
          </div>

          <div className="flex items-center gap-4 text-slate-200">
            <button
              onClick={onOpenAdmin}
              className="text-slate-300 hover:text-white text-[11px] font-medium underline underline-offset-2 cursor-pointer"
            >
              Admin CMS
            </button>
            <span className="text-slate-500">|</span>
            <a
              href={`tel:${COMPANY_CONFIG.whatsappNumber}`}
              className="flex items-center gap-1 hover:text-[#168d77] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-[#168d77]" />
              <span className="tabular-nums font-medium">{COMPANY_CONFIG.displayPhone}</span>
            </a>
            <span className="text-slate-500">|</span>
            <a
              href={getQuickConsultationUrl('Tanya Tim Ahli HOGO')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp CS</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Zone with Logo Image and requested tagline underneath */}
          <a href="#" className="flex flex-col items-start group shrink-0">
            <div className="h-10 sm:h-12 flex items-center">
              <img
                src="../assets/images/logo.jpeg"
                alt="HOGO Pest Management Logo"
                className="h-9 sm:h-11 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Tagline as requested: Protect - Prevent - Preserve under the logo */}
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#0E6B5A] uppercase mt-0.5 whitespace-nowrap group-hover:text-[#052344] transition-colors">
              Protect · Prevent · Preserve
            </span>
          </a>

          {/* Zone 2: 4-5 single-line clean navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#0E6B5A] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#0E6B5A]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={getQuickConsultationUrl('Konsultasi Cepat via WhatsApp')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-semibold text-[#052344] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Konsultasi langsung dengan tim teknisi"
            >
              <MessageCircle className="w-4 h-4 text-[#0E6B5A]" />
              <span>Tanya Teknisi</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#052344] hover:bg-[#03172e] rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Booking Layanan</span>
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3 py-2 text-xs font-semibold text-white bg-[#052344] rounded-lg flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Booking</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#052344] rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#0E6B5A] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 px-4 text-sm font-bold text-white bg-[#052344] rounded-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Jadwalkan Layanan / Survei Gratis</span>
              </button>

              <a
                href={getQuickConsultationUrl('Konsultasi Cepat via WhatsApp')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-sm font-semibold text-[#052344] bg-[#edf8f6] hover:bg-[#e1f4f0] border border-[#168d77]/20 rounded-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#0E6B5A]" />
                <span>Chat WhatsApp Resmi ({COMPANY_CONFIG.displayPhone})</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
