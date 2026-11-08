import React, { useState } from 'react';
import { AlertTriangle, Check, ShieldAlert, ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { PEST_GUIDE_LIST, getQuickConsultationUrl } from '../data/hogoData';

interface PestIdentifierGuideProps {
  onOpenBooking: () => void;
}

export const PestIdentifierGuide: React.FC<PestIdentifierGuideProps> = ({ onOpenBooking }) => {
  const [selectedPestId, setSelectedPestId] = useState<string>(PEST_GUIDE_LIST[0].id);

  const currentPest = PEST_GUIDE_LIST.find(p => p.id === selectedPestId) || PEST_GUIDE_LIST[0];

  return (
    <section id="panduan" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#0E6B5A] uppercase mb-2">
            DETEKSI DINI & IDENTIFIKASI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052344] tracking-tight text-balance">
            Kenali Tanda-Tanda Infestasi Hama di Properti Anda
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Hama sering kali bersembunyi di balik dinding, plafon, atau celah lantai sebelum menyebabkan kerusakan fatal. Kenali gejalanya sejak awal.
          </p>
        </div>

        {/* Pest Selector Tabs (Buttons with click handlers) */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {PEST_GUIDE_LIST.map((pest) => {
            const isSelected = pest.id === selectedPestId;
            return (
              <button
                key={pest.id}
                type="button"
                onClick={() => setSelectedPestId(pest.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#052344] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {pest.name}
              </button>
            );
          })}
        </div>

        {/* Detailed Guide Card */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-3">
            <div>
              <span className="text-xs font-mono text-[#0E6B5A] font-semibold italic">
                {currentPest.latinName}
              </span>
              <h3 className="text-2xl font-bold text-[#052344] mt-0.5">
                {currentPest.name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Tingkat Ancaman:</span>
              <span className="text-xs font-bold px-2.5 py-1 bg-red-100 text-red-800 rounded-md">
                {currentPest.riskLevel}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
            
            {/* Warning Signs */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Gejala & Tanda Keberadaan:</span>
              </p>
              <ul className="space-y-2">
                {currentPest.signs.map((sign, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hidden Risks */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>Risiko Terhadap Properti & Kesehatan:</span>
              </p>
              <ul className="space-y-2">
                {currentPest.risks.map((risk, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Expert Advice Box */}
          <div className="mt-2 p-4 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
            <p className="font-bold text-[#052344]">Rekomendasi Tindakan Teknisi HOGO:</p>
            <p className="text-slate-600 leading-relaxed">{currentPest.recommendation}</p>
          </div>

          {/* CTAs */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Temukan tanda-tanda di atas? Jangan biarkan koloni bertambah besar.
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#052344] hover:bg-[#03172e] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Jadwalkan Inspeksi</span>
              </button>

              <a
                href={getQuickConsultationUrl(`Konsultasi Masalah ${currentPest.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#0E6B5A] bg-[#edf8f6] hover:bg-[#ddf2ee] rounded-xl border border-[#0E6B5A]/20 flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Tanya via WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
