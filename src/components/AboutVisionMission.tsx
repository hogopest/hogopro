import React from 'react';
import { ShieldCheck, Lock, Leaf, CheckCircle2, Target, Compass, Award, Users } from 'lucide-react';
import { PHILOSOPHY_PILLARS, COMPANY_CONFIG } from '../data/hogoData';

export const AboutVisionMission: React.FC = () => {
  return (
    <section id="tentang" className="py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-widest text-[#0E6B5A] uppercase mb-2">
            PROFIL PERUSAHAAN & NILAI UTAMA
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052344] tracking-tight text-balance">
            Dedikasi Menjaga Kenyamanan, Kesehatan & Keamanan Properti
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            HOGO Pest Management lahir dari komitmen menghadirkan layanan pengendali hama modern yang mengutamakan keamanan penghuni, ketuntasan eliminasi, serta kelestarian ekosistem.
          </p>
        </div>

        {/* Company Overview & Split Image (12 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          
          {/* Left Text: Origin & Credibility (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0E6B5A]">
              <span>FILOSOFI HOGO (保護)</span>
              <span>·</span>
              <span>PERLINDUNGAN & PENJAGAAN</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#052344] tracking-tight">
              Mitra Terpercaya Pengendalian Hama Residensial dan Komersial di Indonesia
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Nama <strong className="text-slate-900">HOGO</strong> diambil dari filosofi perlindungan sejati. Kami percaya bahwa pembasmian hama tidak boleh dilakukan secara serampangan menggunakan racun berbahaya yang mencemari udara hunian atau lingkungan kerja.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Dengan mengintegrasikan sains entomologi perkotaan, peralatan berteknologi termal, serta formulasi berstandar <strong className="text-slate-900">WHO dan Kementerian Pertanian RI</strong>, HOGO menghadirkan solusi higienitas yang aman bagi anak-anak, lansia, dan hewan peliharaan tersayang Anda.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#edf8f6] text-[#0E6B5A] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#052344]">Sertifikasi Resmi</p>
                  <p className="text-[11px] text-slate-500">Teknisi berlisensi ASPPHAMI & Kemenkes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#edf8f6] text-[#0E6B5A] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#052344]">Respon Sigap 24/7</p>
                  <p className="text-[11px] text-slate-500">Siap melayani kebutuhan darurat & B2B</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Commercial Quality Photo Asset (lg:col-span-6) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
              <img
                src="/src/assets/images/hero2.jpg"
                alt="Standar higienitas dan IPM komersial profesional HOGO Pest Management"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#052344]/90 via-[#052344]/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
                  Standar Audit Industri & Komersial
                </p>
                <p className="text-base sm:text-lg font-bold text-white leading-snug">
                  Mendukung kepatuhan HACCP, GMP, BPOM, dan ISO untuk restoran, hotel, pabrik, dan gudang logistik.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pillars Section: PROTECT - PREVENT - PRESERVE (Requested in logo tagline) */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-[#0E6B5A] uppercase">
              TAGLINE BRAND & NILAI INTI
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#052344] tracking-tight mt-1">
              Prinsip 3P: Protect · Prevent · Preserve
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Tiga pilar operasional yang melandasi setiap langkah tindakan teknisi HOGO di lapangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PHILOSOPHY_PILLARS.map((pillar, idx) => {
              const icons = [
                <ShieldCheck key="p1" className="w-7 h-7 text-[#052344]" />,
                <Lock key="p2" className="w-7 h-7 text-[#0E6B5A]" />,
                <Leaf key="p3" className="w-7 h-7 text-[#0E6B5A]" />
              ];

              return (
                <div
                  key={pillar.title}
                  className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between hover:border-[#0E6B5A]/40 transition-colors shadow-xs"
                >
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-xs">
                      {icons[idx]}
                    </div>
                    
                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase font-mono">
                      PILAR 0{idx + 1}
                    </span>

                    <h4 className="text-xl font-extrabold text-[#052344] tracking-tight mt-1 mb-2">
                      {pillar.title}
                    </h4>

                    <p className="text-xs font-semibold text-[#0E6B5A] mb-3">
                      {pillar.meaning}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision & Mission Card (Editorial Balance) */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Vision */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#0E6B5A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E6B5A]">
                  Visi Perusahaan
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#052344] tracking-tight">
                Menjadi Simbol Kepercayaan Tertinggi Pengendali Hama di Indonesia
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Menjadi perusahaan pest management terdepan yang dikenal atas integritas profesional, kecepatan penanganan, kepatuhan ramah lingkungan, dan perlindungan total terhadap investasi aset klien.
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block lg:col-span-1 text-center">
              <div className="w-px h-36 bg-slate-300 mx-auto" />
            </div>

            {/* Mission */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#052344]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#052344]">
                  Misi Utama HOGO
                </span>
              </div>
              <ul className="space-y-2.5">
                <li className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0E6B5A] shrink-0 mt-0.5" />
                  <span>
                    <strong>Sains & Presisi:</strong> Menerapkan metodologi pembasmian hama berbasis data inspeksi komprehensif tanpa tebak-tebak.
                  </span>
                </li>
                <li className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0E6B5A] shrink-0 mt-0.5" />
                  <span>
                    <strong>Keamanan Ekologis:</strong> Memprioritaskan bahan termitisida & insektisida non-toksik bagi manusia dan hewan peliharaan.
                  </span>
                </li>
                <li className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0E6B5A] shrink-0 mt-0.5" />
                  <span>
                    <strong>Garansi Nyata:</strong> Memberikan perlindungan garansi tertulis yang ditepati dengan layanan respray bebas biaya.
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
