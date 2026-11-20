
import React, { useState } from 'react';
import { SiteData } from '../types';

const FAQ: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen bg-brand-bone overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 opacity-[0.02] text-[40rem] font-serif font-bold text-brand-gold -mr-40 -mt-20 pointer-events-none select-none">
        FAQ
      </div>

      <div className="container mx-auto px-6 py-40 max-w-5xl relative z-10">
        {/* Editorial Header */}
        <div className="text-center mb-32 space-y-6 animate-reveal">
          <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.6em] block">Inquiry Protocol</span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-obsidian leading-none tracking-tighter">
            Executive <span className="italic text-gold-gradient">Knowledge</span>
          </h1>
          <p className="text-brand-slate font-light text-xl max-w-2xl mx-auto leading-relaxed">
            Mengklarifikasi standar proses pengrajin kami, komisi pesanan, dan kerangka kerja logistik global.
          </p>
          <div className="flex justify-center items-center gap-4 pt-8">
            <div className="h-px w-12 bg-brand-gold/30"></div>
            <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
            <div className="h-px w-12 bg-brand-gold/30"></div>
          </div>
        </div>

        {/* Premium Accordion Directory */}
        <div className="space-y-4">
          {siteData.faqs.map((f, i) => (
            <div 
              key={i} 
              className={`group transition-all duration-700 rounded-[2.5rem] overflow-hidden ${
                openIdx === i 
                  ? 'glass-luxury shadow-2xl scale-[1.02] border-brand-gold/30' 
                  : 'bg-white border border-brand-obsidian/5 hover:border-brand-gold/20'
              }`}
            >
              <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-10 md:p-12 text-left flex justify-between items-center outline-none"
              >
                <div className="flex items-center gap-8 md:gap-12">
                  <span className={`font-serif text-2xl italic transition-colors duration-500 ${openIdx === i ? 'text-brand-gold' : 'text-brand-slate/30'}`}>
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <span className={`text-xl md:text-2xl font-serif font-bold tracking-tight transition-all duration-500 ${
                    openIdx === i ? 'text-brand-obsidian translate-x-2' : 'text-brand-obsidian group-hover:text-brand-gold'
                  }`}>
                    {f.question}
                  </span>
                </div>
                
                {/* Custom Luxury Toggle Icon */}
                <div className={`relative w-8 h-8 flex items-center justify-center transition-transform duration-700 ${openIdx === i ? 'rotate-180' : ''}`}>
                  <div className={`absolute w-full h-0.5 bg-brand-gold rounded-full transition-transform duration-500 ${openIdx === i ? 'rotate-0' : 'rotate-90'}`}></div>
                  <div className="absolute w-full h-0.5 bg-brand-gold rounded-full"></div>
                </div>
              </button>

              <div className={`transition-all duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
                openIdx === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-10 md:px-24 pb-12">
                  <div className="pt-8 border-t border-brand-gold/10">
                    <p className="text-brand-slate leading-relaxed font-light text-xl italic">
                      {f.answer}
                    </p>
                    <div className="mt-10 flex gap-4">
                      <span className="w-8 h-px bg-brand-gold/40 mt-3"></span>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold">Official Policy / Logam Industri ART</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Concierge Callout */}
        <div className="mt-48 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h3 className="text-4xl font-serif font-bold text-brand-obsidian leading-tight">
              Unanswered <br/><span className="italic text-brand-gold">Specifics?</span>
            </h3>
            <p className="text-brand-slate text-lg font-light leading-relaxed">
              Untuk kolaborasi arsitektural atau komisi pribadi skala besar, pramutamu kami tersedia untuk konsultasi virtual atau fisik satu lawan satu.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a 
              href={`tel:${siteData.contact.phone}`}
              className="group p-10 bg-brand-obsidian rounded-[2rem] border border-brand-gold/20 shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-obsidian transition-all">
                <i className="fa-solid fa-phone-volume"></i>
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-brand-gold mb-2">Voice Line</p>
              <p className="text-white font-serif font-bold text-lg">{siteData.contact.phone}</p>
            </a>
            
            <a 
              href={`mailto:${siteData.contact.email}`}
              className="group p-10 bg-white rounded-[2rem] border border-brand-obsidian/5 shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-obsidian flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-paper-plane"></i>
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-brand-slate mb-2">Digital Inquiry</p>
              <p className="text-brand-obsidian font-serif font-bold text-lg break-all">{siteData.contact.email}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
