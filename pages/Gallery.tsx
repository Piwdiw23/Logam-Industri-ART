
import React, { useState, useEffect } from 'react';
import { SiteData, GalleryItem } from '../types';

const Gallery: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Mencegah scroll pada body saat modal terbuka
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  const handleScheduleVisit = () => {
    const message = encodeURIComponent("Greetings Logam Industri ART, I've explored your exquisite gallery and would like to schedule a private visit to your workshop to witness the heritage smithing process.");
    const whatsappUrl = `https://wa.me/${siteData.contact.whatsapp.replace(/\+/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-bone">
      {/* Editorial Header */}
      <div className="container mx-auto px-6 pt-32 md:pt-48 pb-16 md:pb-24">
        <div className="text-center space-y-4 md:space-y-6 animate-reveal">
          <div className="flex items-center justify-center gap-4">
             <span className="w-8 h-px bg-brand-gold/30"></span>
             <span className="text-brand-gold text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em]">The Archive</span>
             <span className="w-8 h-px bg-brand-gold/30"></span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-obsidian leading-none tracking-tighter">
            Mastery in <span className="italic text-gold-gradient">Motion.</span>
          </h1>
          <p className="text-brand-slate max-w-2xl mx-auto font-light text-base md:text-lg italic px-4">
            "A visual journey through our dedication to preserving traditional metal arts through modern application."
          </p>
        </div>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {siteData.gallery.map((g, idx) => (
            <div 
              key={g.id} 
              onClick={() => setSelectedItem(g)}
              className="group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-brand-bone aspect-square border border-brand-obsidian/5 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 animate-reveal"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {g.type === 'image' ? (
                <img src={g.url} alt={g.title} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
              ) : (
                <div className="w-full h-full bg-brand-obsidian flex items-center justify-center">
                  <i className="fa-solid fa-play text-4xl text-brand-gold"></i>
                </div>
              )}
              
              {/* Interaction Hint Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/95 via-brand-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-gold mb-2 block">View Artifact</span>
                  <p className="font-serif text-xl md:text-2xl font-bold italic text-white leading-tight">{g.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refined Gallery Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 overflow-hidden">
          {/* Backdrop - Click to Close */}
          <div 
            className="absolute inset-0 bg-brand-obsidian/98 backdrop-blur-[25px] transition-opacity duration-500 cursor-zoom-out" 
            onClick={() => setSelectedItem(null)}
          ></div>
          
          <div className="relative w-full max-w-5xl flex flex-col items-center animate-reveal z-10">
            {/* High-Visibility Circular X Close Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(null);
              }}
              className="absolute -top-14 right-0 sm:top-6 sm:right-6 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-brand-gold text-brand-obsidian flex items-center justify-center hover:bg-white hover:scale-110 active:scale-90 transition-all duration-300 shadow-2xl z-[230] border border-brand-gold/20"
              title="Close Gallery"
            >
              <i className="fa-solid fa-xmark text-xl sm:text-2xl"></i>
            </button>

            {/* Content Container with safer max-height */}
            <div className="w-full glass-obsidian rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col">
              <div className="w-full flex items-center justify-center bg-black/30 p-2 md:p-6 lg:p-8">
                {selectedItem.type === 'image' ? (
                  <img 
                    src={selectedItem.url} 
                    alt={selectedItem.title} 
                    className="max-h-[55vh] sm:max-h-[65vh] md:max-h-[70vh] w-auto h-auto object-contain transition-transform duration-700" 
                  />
                ) : (
                  <div className="text-white text-center p-12 min-h-[40vh] flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mb-6">
                      <i className="fa-solid fa-play text-3xl text-brand-gold"></i>
                    </div>
                    <p className="font-serif italic text-2xl text-brand-gold">Video Documentation</p>
                  </div>
                )}
              </div>
              
              {/* Bottom Metadata Panel */}
              <div className="p-6 md:p-10 bg-brand-obsidian/90 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-px bg-brand-gold"></span>
                    <span className="text-[8px] font-black text-brand-gold uppercase tracking-[0.4em]">Artifact Registry</span>
                  </div>
                  <h3 className="text-xl md:text-3xl font-serif font-bold text-white italic tracking-tight">{selectedItem.title}</h3>
                </div>
                <div className="shrink-0">
                   <p className="text-white/20 text-[8px] font-black uppercase tracking-[0.4em] mb-1">Heritage ID</p>
                   <p className="text-brand-gold font-serif italic text-base md:text-lg">{selectedItem.id.toUpperCase()}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Hint */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="mt-6 text-white/20 text-[8px] font-black uppercase tracking-[0.6em] hover:text-brand-gold transition-colors hidden sm:block"
            >
              Click outside frame to dismiss archive
            </button>
          </div>
        </div>
      )}

      {/* Visit Section */}
      <div className="container mx-auto px-6 pb-40">
        <div className="p-10 md:p-24 bg-brand-obsidian rounded-[3rem] md:rounded-[5rem] text-center border border-brand-gold/10 relative overflow-hidden shadow-2xl group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 space-y-8 md:space-y-12">
            <div className="flex flex-col items-center gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                   <i className="fa-solid fa-fire-burner text-2xl"></i>
                </div>
                <h3 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-white italic leading-tight tracking-tighter">
                  Witness the alchemy <br className="hidden md:block" /> of metal <span className="text-gold-gradient">first-hand.</span>
                </h3>
            </div>
            
            <p className="text-brand-bone/40 max-w-2xl mx-auto font-light text-base md:text-xl leading-relaxed">
              Kami mengundang Anda ke workshop kami di Jawa Tengah untuk tur pribadi proses penempaan tradisional dan perpustakaan material kami.
            </p>
            
            <button 
              onClick={handleScheduleVisit}
              className="px-10 md:px-16 py-4 md:py-6 bg-brand-gold text-brand-obsidian font-black rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_-10px_rgba(197,160,89,0.3)] flex items-center gap-4 mx-auto text-[9px] md:text-[11px] uppercase tracking-[0.4em]"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i> Schedule Private Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
