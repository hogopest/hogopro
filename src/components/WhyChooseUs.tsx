import React from 'react';
import { ShieldCheck, Leaf, Award, Cpu, FileCheck2, Clock, CheckCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const advantages = [
    {
      icon: <Leaf className="w-6 h-6 text-[#0E6B5A]" />,
      title: 'Formulasi Ramah Lingkungan (Eco-Safe)',
      description: 'Bahan termitisida dan pestisida terdaftar resmi di Kementerian Pertanian RI & standar WHO, tidak berbau tajam, dan aman bagi keluarga serta hewan peliharaan.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#052344]" />,
      title: 'Garansi Tertulis 3 - 5 Tahun',
      description: 'Jaminan sertifikat anti rayap resmi. Jika rayap muncul kembali selama masa garansi, teknisi kami melakukan respray ulang gratis tanpa biaya tambahan.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#0E6B5A]" />,
      title: 'Sensor Termal & Deteksi Presisi',
      description: 'Menggunakan Termite Thermal Imager & Moisture Detector untuk memetakan koloni di balik tembok atau lantai tanpa membongkar struktur bangunan.'
    },
    {
      icon: <Award className="w-6 h-6 text-[#052344]" />,
      title: 'Teknisi Tersertifikasi ASPPHAMI',
      description: 'Tenaga ahli berpengalaman dengan sertifikat kompetensi resmi dari Asosiasi Perusahaan Pengendalian Hama Indonesia dan standar Kemenkes.'
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-[#0E6B5A]" />,
      title: 'Laporan Digital & Kepatuhan Audit',
      description: 'Pencatatan tren hama digital, barcode monitoring stasiun umpan, serta dokumentasi SDS untuk audit HACCP, ISO, dan Dinas Kesehatan.'
    },
    {
      icon: <Clock className="w-6 h-6 text-[#052344]" />,
      title: 'Respon Cepat Siaga Darurat',
      description: 'Jadwal kunjungan fleksibel, teknisi tepat waktu, dan respon cepat kurang dari 2 jam untuk kasus darurat di perumahan maupun tempat usaha.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-widest text-[#0E6B5A] uppercase mb-2">
            STANDAR KEUNGGULAN KAMI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052344] tracking-tight text-balance">
            Mengapa Mempercayakan Perlindungan Properti pada HOGO?
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Perpaduan teknologi modern, legalitas lengkap, dan tanggung jawab lingkungan menjadikan HOGO pilihan utama ribuan pemilik hunian dan pelaku bisnis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((item, idx) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#0E6B5A]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#052344] mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Standard Operational Procedure */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold tracking-widest text-[#0E6B5A] uppercase">
              STANDAR OPERASIONAL PROSEDUR (SOP)
            </span>
            <h3 className="text-2xl font-bold text-[#052344] tracking-tight mt-1">
              4 Langkah Penanganan Hama HOGO
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 border-l-2 border-[#052344] pl-4">
              <span className="text-xs font-mono font-bold text-slate-400">LANGKAH 01</span>
              <p className="text-base font-bold text-[#052344]">Inspeksi Menyeluruh</p>
              <p className="text-xs text-slate-600">Survei gratis dengan sensor untuk menemukan sarang dan titik jalur masuk hama.</p>
            </div>

            <div className="space-y-2 border-l-2 border-[#0E6B5A] pl-4">
              <span className="text-xs font-mono font-bold text-slate-400">LANGKAH 02</span>
              <p className="text-base font-bold text-[#0E6B5A]">Diagnosis & Rencana</p>
              <p className="text-xs text-slate-600">Penyusunan solusi IPM spesifik dengan penawaran biaya transparan tanpa markup.</p>
            </div>

            <div className="space-y-2 border-l-2 border-[#052344] pl-4">
              <span className="text-xs font-mono font-bold text-slate-400">LANGKAH 03</span>
              <p className="text-base font-bold text-[#052344]">Aplikasi Terukur</p>
              <p className="text-xs text-slate-600">Treatment ramah lingkungan oleh teknisi berseragam rapi dan alat berkalibrasi.</p>
            </div>

            <div className="space-y-2 border-l-2 border-[#0E6B5A] pl-4">
              <span className="text-xs font-mono font-bold text-slate-400">LANGKAH 04</span>
              <p className="text-base font-bold text-[#0E6B5A]">Monitoring & Garansi</p>
              <p className="text-xs text-slate-600">Pemberian sertifikat garansi resmi dan kontrol berkala memastikan properti tetap steril.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
