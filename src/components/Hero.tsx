import React from 'react';
import { ShieldCheck, MessageCircle, Calendar, ArrowRight, Award, Clock, Leaf } from 'lucide-react';
import { getQuickConsultationUrl } from '../data/hogoData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-200">
      {/* Subtle decorative background gradient accents */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-0 -mr-40 -mt-20 w-96 h-96 rounded-full bg-[#0E6B5A]/5 blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 left-0 -ml-40 -mb-20 w-96 h-96 rounded-full bg-[#052344]/5 blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Proposition, Headline, Value Props, CTAs (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Unboxed Brand Kicker (No Pill Badges!) */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#0E6B5A] uppercase">
              <span>HOGO PEST MANAGEMENT</span>
              <span aria-hidden="true">·</span>
              <span>PROTECT · PREVENT · PRESERVE</span>
            </div>

            {/* Main Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#052344] tracking-tight leading-[1.15] text-balance">
              Perlindungan Hama Menyeluruh, Modern & Bergaransi Resmi
            </h1>

            {/* Concrete Value Proposition */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Jaga kenyamanan hunian, keselamatan keluarga, dan reputasi bisnis Anda dari ancaman rayap, tikus, kecoak, serta serangga berbahaya. Menggunakan metodologi <span className="font-semibold text-slate-800">Integrated Pest Management (IPM)</span> dengan formulasi ramah lingkungan berstandar WHO & Kementan RI.
            </p>

            {/* 3 Pillars in Clean Unboxed Layout */}
            <div className="grid grid-cols-3 gap-3 pt-2 pb-1 border-y border-slate-200/80 max-w-xl mx-auto lg:mx-0">
              <div className="text-left">
                <p className="text-xs font-bold text-[#052344] uppercase tracking-wide">Protect</p>
                <p className="text-xs text-slate-500 mt-0.5">Benteng aset & keluarga</p>
              </div>
              <div className="text-left border-l border-slate-200 pl-3">
                <p className="text-xs font-bold text-[#0E6B5A] uppercase tracking-wide">Prevent</p>
                <p className="text-xs text-slate-500 mt-0.5">Cegah infestasi tuntas</p>
              </div>
              <div className="text-left border-l border-slate-200 pl-3">
                <p className="text-xs font-bold text-[#052344] uppercase tracking-wide">Preserve</p>
                <p className="text-xs text-slate-500 mt-0.5">Kelestarian lingkungan</p>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#052344] hover:bg-[#03172e] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span>Jadwalkan Layanan Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={getQuickConsultationUrl('Konsultasi Cepat via WhatsApp')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold text-[#052344] bg-[#edf8f6] hover:bg-[#d8f1ec] border border-[#0E6B5A]/20 rounded-xl transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-5 h-5 text-[#0E6B5A]" />
                <span>Konsultasi WhatsApp Langsung</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0E6B5A]" />
                <span>Garansi Eliminasi Tuntas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-[#0E6B5A]" />
                <span>Formulasi Eco-Safe & Pet-Friendly</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#0E6B5A]" />
                <span>Teknisi Berlisensi ASPPHAMI</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Photo & Proof Card (lg:col-span-5) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_pest_inspection_1792946456058.jpg"
                alt="Teknisi profesional HOGO Pest Management melakukan inspeksi presisi"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#052344]/90 via-[#052344]/30 to-transparent pointer-events-none" />

              {/* Bottom content overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold tracking-wider uppercase mb-1">
                  <span>Inspeksi Berteknologi Sensor</span>
                  <span>Garansi Resmi</span>
                </div>
                <p className="text-base font-bold text-white leading-snug">
                  Deteksi dini koloni rayap & sarang hama tanpa merusak konstruksi dinding.
                </p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/15 text-xs text-slate-200">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> Respon Siaga Cepat
                  </span>
                  <span>·</span>
                  <span>Survei Lokasi Gratis</span>
                </div>
              </div>
            </div>

            {/* Floating verification card (Single-elevation) */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white border border-slate-200 rounded-xl p-3.5 shadow-lg items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-[#edf8f6] text-[#0E6B5A] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#052344]">Garansi Sertifikat s/d 5 Tahun</p>
                <p className="text-[11px] text-slate-500">Free re-spray bila hama muncul kembali</p>
              </div>
            </div>

          </div>

        </div>

        {/* 4-Column Metric Strip Row Below Hero */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="text-center sm:text-left">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#052344] tabular-nums tracking-tight">
                5.200+
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                Titik Properti & Bisnis Terlindungi
              </p>
            </div>

            <div className="text-center sm:text-left sm:border-l sm:border-slate-200 sm:pl-6">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0E6B5A] tabular-nums tracking-tight">
                100%
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                Formulasi Standar Kementan & WHO
              </p>
            </div>

            <div className="text-center sm:text-left sm:border-l sm:border-slate-200 sm:pl-6">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#052344] tabular-nums tracking-tight">
                3 - 5 Thn
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                Jaminan Garansi Anti Rayap Resmi
              </p>
            </div>

            <div className="text-center sm:text-left sm:border-l sm:border-slate-200 sm:pl-6">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0E6B5A] tabular-nums tracking-tight">
                &lt; 2 Jam
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                Respon Cepat Penanganan Darurat
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
