import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, MessageCircle, HelpCircle } from 'lucide-react';
import { TESTIMONIALS_LIST, FAQ_LIST, getQuickConsultationUrl } from '../data/hogoData';

export const TestimonialsFAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#0E6B5A] uppercase mb-2">
            BUKTI KEPUASAN PELANGGAN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052344] tracking-tight text-balance">
            Dipercaya Oleh Ribuan Pemilik Rumah & Pelaku Usaha
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Pengalaman nyata klien yang telah merasakan ketenangan pikiran setelah propertinya ditangani oleh HOGO Pest Management.
          </p>
        </div>

        {/* Testimonials Cards (Attributable Testimonials per design constitution) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {TESTIMONIALS_LIST.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#0E6B5A]/40 transition-colors"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm font-bold text-[#052344]">{item.name}</p>
                <p className="text-xs text-slate-600">{item.role} · {item.propertyType}</p>
                <div className="flex items-center justify-between text-[11px] text-[#0E6B5A] mt-1 font-medium">
                  <span>{item.city}</span>
                  <span className="text-slate-400">·</span>
                  <span className="truncate">{item.serviceUsed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-10 h-10 rounded-xl bg-[#edf8f6] text-[#0E6B5A] flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#052344] tracking-tight">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Segala hal yang perlu Anda ketahui mengenai keamanan, prosedur kerja, dan garansi HOGO.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_LIST.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/60 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#052344] leading-snug">
                      {faq.question}
                    </span>
                    <span className="text-slate-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-[#0E6B5A]" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick FAQ footer note */}
          <div className="mt-8 text-center p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>Masih ada pertanyaan seputar hama di lokasi Anda?</span>
            <a
              href={getQuickConsultationUrl('Tanya Tim Customer Care HOGO')}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0E6B5A] hover:underline flex items-center gap-1.5 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Tim Konsultan Kami</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
