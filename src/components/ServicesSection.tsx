import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Rat, 
  Bug, 
  Sparkles, 
  BedDouble, 
  Building2, 
  Check, 
  ArrowRight, 
  Calendar,
  MessageCircle,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { SERVICES_LIST, getQuickConsultationUrl } from '../data/hogoData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'commercial' | 'specialized'>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const filteredServices = activeCategory === 'all' 
    ? SERVICES_LIST 
    : SERVICES_LIST.filter(s => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-[#052344]" />;
      case 'Rat': return <Rat className="w-6 h-6 text-[#052344]" />;
      case 'Bug': return <Bug className="w-6 h-6 text-[#052344]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#052344]" />;
      case 'BedDouble': return <BedDouble className="w-6 h-6 text-[#052344]" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-[#052344]" />;
      default: return <ShieldCheck className="w-6 h-6 text-[#052344]" />;
    }
  };

  return (
    <section id="layanan" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#0E6B5A] uppercase mb-2">
            SOLUSI INTEGRATED PEST MANAGEMENT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052344] tracking-tight text-balance">
            Detail Layanan Pembasmi Hama Profesional
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Metode ilmiah yang ditargetkan langsung ke titik sarang, memutus siklus hidup hama, dan melindungi properti dengan garansi purna-layanan resmi.
          </p>

          {/* Filter Tabs / Segmented Controls (buttons allowed for functional state) */}
          <div className="mt-8 inline-flex p-1 bg-slate-100 rounded-xl max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-[#052344] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Layanan ({SERVICES_LIST.length})
            </button>
            <button
              onClick={() => setActiveCategory('residential')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'residential'
                  ? 'bg-white text-[#052344] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hunian / Rumah
            </button>
            <button
              onClick={() => setActiveCategory('commercial')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'commercial'
                  ? 'bg-white text-[#052344] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bisnis & Komersial
            </button>
            <button
              onClick={() => setActiveCategory('specialized')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'specialized'
                  ? 'bg-white text-[#052344] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Spesialis Kutu Kasur
            </button>
          </div>
        </div>

        {/* Services Grid (Single-elevation, hairline borders, no slop pills) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, idx) => {
            const isExpanded = expandedServiceId === service.id;
            const editorialIndex = `0${idx + 1}.`;

            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#0E6B5A]/50 transition-all duration-200 flex flex-col justify-between p-6 sm:p-7 shadow-xs hover:shadow-md"
              >
                <div>
                  {/* Top line: Index number and Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {editorialIndex}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-[#edf8f6] group-hover:border-[#0E6B5A]/30 transition-colors flex items-center justify-center">
                      {getServiceIcon(service.icon)}
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-[#052344] tracking-tight group-hover:text-[#0E6B5A] transition-colors">
                    {service.name}
                  </h3>

                  {/* Target Pest unboxed metadata */}
                  <div className="flex items-center gap-1.5 text-xs text-[#0E6B5A] font-medium mt-1 mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{service.warranty}</span>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Treatment methods list */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Metode & Keunggulan HOGO:
                    </p>
                    <ul className="space-y-1.5">
                      {service.treatmentMethod.slice(0, isExpanded ? 4 : 2).map((m, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#0E6B5A] shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expand/Collapse toggle */}
                    <button
                      type="button"
                      onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                      className="text-xs font-medium text-[#0E6B5A] hover:underline pt-1 cursor-pointer block"
                    >
                      {isExpanded ? 'Lihat Lebih Sedikit' : 'Lihat Detail Pengerjaan +'}
                    </button>
                  </div>

                  {/* Expanded features block */}
                  {isExpanded && (
                    <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs space-y-2 border border-slate-200 animate-in fade-in duration-150">
                      <p className="font-semibold text-slate-800">Cocok Untuk:</p>
                      <div className="text-slate-600 text-[11px] leading-relaxed">
                        {service.suitableFor.join(' · ')}
                      </div>
                      <p className="font-semibold text-slate-800 pt-1">Target Hama:</p>
                      <div className="text-slate-500 italic text-[11px]">
                        {service.targetPest}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer: Starting Price & CTAs */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3 text-xs">
                    <span className="text-slate-500">Estimasi Biaya:</span>
                    <span className="font-bold text-[#052344] tabular-nums">
                      {service.startingPrice}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectServiceToBook(service.id)}
                      className="py-2.5 px-3 bg-[#052344] hover:bg-[#03172e] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Jadwalkan</span>
                    </button>

                    <a
                      href={getQuickConsultationUrl(`Tanya Layanan ${service.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-[#edf8f6] hover:bg-[#d8f1ec] text-[#052344] border border-[#0E6B5A]/20 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#0E6B5A]" />
                      <span>Tanya CS</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Free Inspection Callout Banner (Single CTA, hairline border, no slop pills) */}
        <div className="mt-12 bg-gradient-to-r from-[#052344] to-[#0a386b] rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                SURVEI AWAL & PEMERIKSAAN SENSOR GRATIS
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Bingung Masalah Hama Apa yang Sedang Menyerang?
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                Dapatkan inspeksi thermal sensor bebas biaya oleh teknisi berlisensi kami. Kami mengidentifikasi titik sarang tersembunyi dan memberikan rencana penanganan transparan tanpa komitmen.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => onSelectServiceToBook('termite-control')}
                className="px-6 py-3.5 text-sm font-bold text-[#052344] bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#0E6B5A]" />
                <span>Klaim Survei Gratis</span>
              </button>
              
              <a
                href={getQuickConsultationUrl('Klaim Survei Lokasi & Inspeksi Gratis')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#0E6B5A] hover:bg-[#094f42] rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
