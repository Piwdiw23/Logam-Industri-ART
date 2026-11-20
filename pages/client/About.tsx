
import React, { useState, useEffect } from 'react';
import { SiteData, LegalityItem } from '../../types';

const About: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const [selectedDoc, setSelectedDoc] = useState<LegalityItem | null>(null);

  useEffect(() => {
    if (selectedDoc) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedDoc]);

  return (
    <div className="bg-brand-bone min-h-screen">
      {/* Editorial Hero */}
      <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 space-y-12 reveal-content">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-brand-gold"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-gold">Institutional Origin</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-serif font-bold text-brand-obsidian leading-none tracking-tighter">
                Crafting <span className="italic text-luxury-gradient">Generations.</span>
              </h1>
              <p className="text-brand-slate text-xl md:text-2xl leading-relaxed font-serif italic border-l-2 border-brand-gold/20 pl-8">
                "{siteData.description}"
              </p>
            </div>
            <div className="lg:col-span-5 relative group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-brand-obsidian/5">
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80" 
                  alt="Master Smith" 
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission with hoverable details */}
      <section className="py-32 md:py-48 bg-brand-obsidian text-brand-bone px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-24">
          <div className="glass-dark p-16 rounded-[4rem] border-white/5 space-y-10 group hover:border-brand-gold/30 transition-all duration-700">
             <div className="w-16 h-16 bg-brand-gold text-brand-obsidian rounded-2xl flex items-center justify-center text-3xl shadow-xl">
               <i className="fa-solid fa-eye"></i>
             </div>
             <h2 className="text-3xl font-serif font-bold italic">Master Vision</h2>
             <p className="text-white/60 text-xl font-light leading-relaxed">{siteData.vision}</p>
          </div>
          <div className="glass-dark p-16 rounded-[4rem] border-white/5 space-y-10 group hover:border-brand-gold/30 transition-all duration-700">
             <div className="w-16 h-16 bg-brand-gold text-brand-obsidian rounded-2xl flex items-center justify-center text-3xl shadow-xl">
               <i className="fa-solid fa-scroll"></i>
             </div>
             <h2 className="text-3xl font-serif font-bold italic">Institutional Mission</h2>
             <div className="space-y-6">
               {siteData.mission.split('\n').map((m, i) => (
                 <div key={i} className="flex gap-4">
                   <span className="text-brand-gold font-serif italic text-xl">0{i+1}</span>
                   <p className="text-white/40 group-hover:text-white/80 transition-colors">{m.replace(/^\d\.\s/, '')}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Legality Credentials Section - CLICK TO DETAIL */}
      <section className="py-32 md:py-48 px-6 container mx-auto">
        <div className="text-center mb-24 space-y-6">
          <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.6em]">Trust & Compliance</span>
          <h2 className="text-4xl md:text-7xl font-serif font-bold italic">Official <span className="text-brand-copper">Registry.</span></h2>
          <p className="text-brand-slate max-w-2xl mx-auto italic">Transparansi tanpa kompromi. Klik pada setiap sertifikasi untuk memeriksa monograph digital.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {siteData.legalities.map((leg) => (
            <div key={leg.id} className="group cursor-pointer space-y-8 text-center" onClick={() => setSelectedDoc(leg)}>
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl bg-white border-8 border-white transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-brand-gold/10">
                <img src={leg.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="" />
                <div className="absolute inset-0 bg-brand-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="luxury-button bg-white text-brand-obsidian text-[8px]">Inspect Document</span>
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold italic group-hover:text-brand-copper transition-colors">{leg.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Legality Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-brand-obsidian/98 backdrop-blur-3xl" onClick={() => setSelectedDoc(null)}></div>
          <div className="relative w-full max-w-4xl bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl animate-reveal overflow-hidden flex flex-col items-center gap-12 text-center">
             <button onClick={() => setSelectedDoc(null)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-brand-obsidian text-brand-gold flex items-center justify-center hover:scale-110 transition-all">
                <i className="fa-solid fa-xmark text-xl"></i>
             </button>
             <div className="w-full max-h-[60vh] overflow-y-auto rounded-2xl shadow-inner border border-black/5 p-4">
                <img src={selectedDoc.image} className="w-full h-auto" alt={selectedDoc.name} />
             </div>
             <div className="space-y-4">
                <span className="text-brand-gold text-[9px] font-black uppercase tracking-widest">Digital Registry ID: {selectedDoc.id}</span>
                <h3 className="text-3xl md:text-5xl font-serif font-bold italic">{selectedDoc.name}</h3>
                <p className="text-brand-slate max-w-xl mx-auto italic">Dokumen ini memverifikasi kepatuhan operasional Logam Industri ART terhadap standar industri global dan ekspor internasional.</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
