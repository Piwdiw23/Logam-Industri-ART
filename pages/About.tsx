
import React, { useState, useEffect, useRef } from 'react';
import { SiteData, LegalityItem } from '../types';

const About: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const [selectedDoc, setSelectedDoc] = useState<LegalityItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedDoc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedDoc]);

  return (
    <div className="bg-brand-bone min-h-screen">
      {/* Editorial Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-7 space-y-8 md:space-y-10 animate-reveal">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-brand-gold"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Our Origin</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-obsidian leading-tight md:leading-[0.85] tracking-tighter">
                The Rhythm of <br className="hidden md:block" />
                <span className="italic text-gold-gradient font-light">The Hammer.</span>
              </h1>
              <p className="text-brand-slate text-lg md:text-xl lg:text-2xl leading-relaxed font-serif italic max-w-2xl border-l-2 border-brand-gold/20 pl-6 md:pl-8">
                "{siteData.description}"
              </p>
            </div>
            <div className="lg:col-span-5 relative group animate-reveal mt-12 lg:mt-0" style={{ animationDelay: '200ms' }}>
              <div className="aspect-[4/5] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl border border-brand-obsidian/5">
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80" 
                  alt="Master Smith" 
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-6 md:-bottom-10 -left-6 md:-left-10 glass-luxury p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hidden sm:block border border-brand-gold/20">
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-brand-gold mb-1 md:mb-2">Established</p>
                <p className="text-xl md:text-2xl font-serif font-bold text-brand-obsidian italic">MMV • Boyolali</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Narrative */}
      <section className="py-24 md:py-32 bg-brand-obsidian text-brand-bone relative overflow-hidden px-6">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.01] md:opacity-[0.02] text-[15rem] md:text-[30rem] font-serif font-bold text-brand-gold -ml-10 md:-ml-20 -mt-10 md:-mt-20 select-none">
          LOGAM
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
            <div className="w-px h-16 md:h-24 bg-brand-gold mx-auto opacity-30"></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold italic text-brand-gold">Historical Registry</h2>
            <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed opacity-70 italic px-4">
              {siteData.history}
            </p>
            <div className="pt-8 md:pt-12 flex flex-col sm:flex-row justify-center gap-10 md:gap-20">
               <div className="text-center">
                  <p className="text-3xl md:text-4xl font-serif font-bold text-brand-gold">18+</p>
                  <p className="text-[9px] uppercase tracking-[0.4em] opacity-40 mt-2 font-black">Years of Mastery</p>
               </div>
               <div className="text-center">
                  <p className="text-3xl md:text-4xl font-serif font-bold text-brand-gold">99.9%</p>
                  <p className="text-[9px] uppercase tracking-[0.4em] opacity-40 mt-2 font-black">Purity Grade</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 md:py-40 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="glass-luxury p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border-brand-gold/10 hover:shadow-2xl transition-all duration-700">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-obsidian rounded-xl md:rounded-2xl flex items-center justify-center text-brand-gold mb-8 md:mb-10 shadow-lg">
              <i className="fa-solid fa-eye text-lg md:text-xl"></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-obsidian mb-4 md:mb-6 italic">Institutional Vision</h3>
            <p className="text-brand-slate text-base md:text-lg leading-relaxed font-light">{siteData.vision}</p>
          </div>

          <div className="glass-luxury p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border-brand-gold/10 hover:shadow-2xl transition-all duration-700">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-obsidian rounded-xl md:rounded-2xl flex items-center justify-center text-brand-gold mb-8 md:mb-10 shadow-lg">
              <i className="fa-solid fa-scroll text-lg md:text-xl"></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-obsidian mb-4 md:mb-6 italic">Operational Mission</h3>
            <ul className="space-y-4 md:space-y-6">
              {siteData.mission.split('\n').map((m, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="text-brand-gold font-serif italic text-lg md:text-xl mt-0.5">0{i+1}.</span>
                  <span className="text-brand-slate text-base md:text-lg font-light group-hover:text-brand-obsidian transition-colors">{m.replace(/^\d\.\s/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="pb-24 md:pb-40 container mx-auto px-4 md:px-6">
        <div className="bg-white border border-brand-obsidian/5 rounded-[2rem] md:rounded-[4rem] p-8 md:p-24 shadow-sm relative overflow-hidden">
          <div className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.01] text-[20rem] font-serif font-black italic -ml-10 -mt-20">VALID</div>
          <div className="relative z-10">
            <header className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-10">
              <div className="space-y-4 max-w-2xl">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Verification Hub</span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-obsidian tracking-tighter italic leading-tight">The Artifact <br className="hidden md:block"/> Credentials.</h2>
                <p className="text-brand-slate font-light text-lg md:text-xl italic pt-4">
                  Menjaga standar transparansi yang tanpa kompromi. Setiap pesanan didukung oleh sertifikasi institusional dan kepatuhan global.
                </p>
              </div>
              <div className="flex items-center gap-4 text-brand-gold shrink-0">
                 <div className="hidden md:block w-px h-16 bg-brand-gold/30"></div>
                 <p className="text-[9px] font-black uppercase tracking-widest max-w-[150px] leading-relaxed">Klik untuk memeriksa bukti digital keaslian.</p>
              </div>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {siteData.legalities.map((leg, i) => (
                <div 
                  key={leg.id} 
                  className="group cursor-pointer relative"
                  onClick={() => setSelectedDoc(leg)}
                >
                  <div className="relative aspect-[3/4] sm:aspect-[3/4.5] rounded-2xl overflow-hidden bg-[#F1F1F1] border-4 md:border-8 border-white shadow-xl transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] group-hover:border-brand-gold/10">
                    <img 
                      src={leg.image} 
                      alt={leg.name} 
                      className="w-full h-full object-cover mix-blend-multiply opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:mix-blend-normal group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-brand-obsidian/5 opacity-40"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 md:top-6 left-4 md:left-6 z-10">
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-full glass-luxury border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-lg">
                          <i className="fa-solid fa-stamp text-[10px] md:text-xs"></i>
                       </div>
                    </div>

                    {/* Interaction Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                       <div className="px-5 md:px-6 py-2 md:py-3 glass-luxury rounded-full text-brand-obsidian text-[8px] md:text-[10px] font-black uppercase tracking-widest border-white/40 shadow-2xl">
                          Inspect Monograph
                       </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-8 space-y-2 md:space-y-3 px-2 md:px-4">
                    <div className="flex items-center gap-3">
                       <span className="w-4 md:w-6 h-px bg-brand-gold"></span>
                       <span className="text-[8px] md:text-[9px] font-black text-brand-gold uppercase tracking-[0.4em]">Serial ID: {leg.id}</span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-serif font-bold text-brand-obsidian leading-snug group-hover:text-brand-gold transition-colors italic">{leg.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Credential Lightbox Modal */}
      {selectedDoc && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 overflow-hidden"
        >
          {/* Backdrop - Click to Close */}
          <div 
            className="absolute inset-0 bg-brand-obsidian/98 backdrop-blur-[30px] transition-opacity duration-700 cursor-zoom-out" 
            onClick={() => setSelectedDoc(null)}
          ></div>
          
          <div className="relative w-full max-w-5xl flex flex-col items-center animate-reveal z-10">
            {/* Functional Circular X Close Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDoc(null);
              }}
              className="absolute -top-14 right-0 sm:top-6 sm:right-6 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-gold text-brand-obsidian flex items-center justify-center hover:bg-white hover:scale-110 active:scale-90 transition-all duration-300 shadow-2xl z-[220] border border-brand-gold/20"
              title="Close Document"
            >
              <i className="fa-solid fa-xmark text-lg sm:text-2xl"></i>
            </button>

            {/* The Document "Gallery Frame" */}
            <div className="w-full bg-[#E8E8E8] p-4 md:p-10 lg:p-14 rounded-[2rem] md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-[6px] md:border-[16px] border-brand-obsidian relative overflow-hidden flex flex-col">
               {/* Inner Passepartout Frame */}
               <div className="absolute inset-0 border border-white/20 pointer-events-none"></div>
               <div className="bg-white p-4 md:p-8 shadow-inner relative flex flex-col items-center justify-center">
                  {/* Subtle Paper Texture Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
                  
                  <div className="max-h-[50vh] md:max-h-[60vh] overflow-y-auto custom-scrollbar w-full flex items-center justify-center">
                    <img 
                      src={selectedDoc.image} 
                      alt={selectedDoc.name} 
                      className="max-h-full max-w-full h-auto w-auto object-contain shadow-sm" 
                    />
                  </div>

                  {/* Embossed Seal Detail (Visual Only) */}
                  <div className="hidden sm:block absolute bottom-4 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-20 md:h-20 opacity-10 pointer-events-none grayscale">
                    <i className="fa-solid fa-crown text-4xl md:text-7xl"></i>
                  </div>
               </div>
            </div>

            {/* Document Metadata Footer */}
            <div className="mt-6 md:mt-10 text-center space-y-2 md:space-y-4 max-w-2xl px-4">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-6 md:w-8 bg-brand-gold/40"></span>
                <span className="text-[7px] md:text-[9px] font-black text-brand-gold uppercase tracking-[0.5em]">Official Record Monograph</span>
                <span className="h-px w-6 md:w-8 bg-brand-gold/40"></span>
              </div>
              <h3 className="text-xl md:text-4xl font-serif font-bold text-white italic tracking-tight leading-snug">
                {selectedDoc.name}
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 pt-2">
                <p className="text-white/40 text-[8px] md:text-[10px] font-medium tracking-[0.2em] uppercase">
                  Digital UID: <span className="text-brand-gold">{selectedDoc.id}</span>
                </p>
                <div className="hidden md:block w-px h-4 bg-white/20"></div>
                <button 
                  onClick={() => window.open(selectedDoc.image, '_blank')}
                  className="flex items-center gap-2 text-brand-gold hover:text-white transition-colors text-[8px] md:text-[10px] font-black uppercase tracking-widest"
                >
                  <i className="fa-solid fa-up-right-from-square"></i> Open Master File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
