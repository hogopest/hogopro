import React, { useState } from 'react';
import { MessageCircle, X, Shield, PhoneCall } from 'lucide-react';
import { COMPANY_CONFIG, getQuickConsultationUrl } from '../data/hogoData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expandable Tooltip Card */}
      {showTooltip && (
        <div className="mb-3 max-w-xs bg-white rounded-2xl shadow-xl border border-slate-200 p-4 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#0E6B5A]" />
              <span className="text-xs font-bold text-[#052344]">HOGO Customer Care</span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Tutup pesan"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Halo! Ada masalah rayap, tikus, atau serangga di rumah? Konsultasikan dan jadwalkan inspeksi gratis langsung di WhatsApp kami.
          </p>

          <a
            href={getQuickConsultationUrl('Halo CS HOGO, saya butuh bantuan')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 bg-[#0E6B5A] hover:bg-[#094f42] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat WhatsApp Sekarang</span>
          </a>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="flex items-center gap-2">
        {!showTooltip && (
          <button
            onClick={() => setShowTooltip(true)}
            className="hidden sm:flex items-center gap-1.5 bg-white text-[#052344] px-3 py-2 rounded-full shadow-md border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            <span>Konsultasi Cepat</span>
          </button>
        )}

        <a
          href={getQuickConsultationUrl('Konsultasi via Floating Button')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0E6B5A] hover:bg-[#094f42] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group focus:outline-hidden focus:ring-4 focus:ring-[#0E6B5A]/30"
          aria-label="Chat WhatsApp Resmi HOGO Pest Management"
          title="Chat WhatsApp Resmi HOGO Pest Management"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="sr-only">WhatsApp HOGO</span>
        </a>
      </div>
    </div>
  );
};
