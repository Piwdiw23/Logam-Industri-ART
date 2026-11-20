
import React, { useState, useEffect } from 'react';
import { SiteData, GalleryItem } from '../../types';

const Gallery: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (selectedItem) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-brand-bone">
      {/* Page Header */}
      <section className="pt-32 md:pt-48 pb-20 container mx-auto px-6 text-center space-y-10 reveal-content">
        <div className="flex items-center justify-center gap-4">
           <span className="h-px w-12 bg-brand-gold/30"></span>
           <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.8em]">Visual Archive</span>
           <span className="h-px w-12 bg-brand-gold/30"></span>
        </div>
        <h1 className="text-5xl md:text-9xl font-serif font-bold text-brand-obsidian leading-none tracking-tighter italic">
          Alchemy in <span className="text-luxury-gradient">Motion.</span>
        </h1>
        <p className="text-brand-slate max-w-2xl mx-auto font-light text-xl italic leading-relaxed">
          "Setiap bayangan dan kilau adalah saksi dari jam-jam dedikasi di depan bara api."
        </p>
      </section>

      {/* Gallery Wall */}
      <section className="container mx-auto px-6 pb-48">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteData.gallery.map((g, idx) => (
            <div 
              key={g.id} 
              onClick={() => setSelectedItem(g)}
              className="group relative overflow-hidden rounded-[2.5rem] bg-white aspect-square border border-black/5 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-1000 animate-reveal"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <img src={g.url} alt={g.title} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                <span className="text-brand-gold text-[8px] font-black uppercase tracking-widest mb-2">Exhibition Item</span>
                <p className="font-serif text-2xl font-bold italic text-white tracking-tight">{g.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-brand-obsidian/98 backdrop-blur-3xl" onClick={() => setSelectedItem(null)}></div>
          <div className="relative w-full max-w-6xl animate-reveal flex flex-col items-center gap-12">
            <button onClick={() => setSelectedItem(null)} className="absolute -top-16 right-0 text-white hover:text-brand-gold transition-all text-4xl">
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="w-full glass-dark rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl">
               <div className="p-4 md:p-12 bg-black/40 flex items-center justify-center">
                  <img src={selectedItem.url} className="max-h-[60vh] rounded-3xl object-contain shadow-2xl" alt="" />
               </div>
               <div className="p-12 md:p-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="space-y-2">
                    <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.6em]">Registry: {selectedItem.id}</span>
                    <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-white">{selectedItem.title}</h3>
                  </div>
                  <button onClick={() => window.open(selectedItem.url)} className="luxury-button bg-white text-brand-obsidian hover:bg-brand-gold">
                    View Full Artifact
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
