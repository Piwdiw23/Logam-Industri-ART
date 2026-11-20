
import React, { useState, useMemo, useEffect } from 'react';
import { SiteData, Product } from '../../types';

interface ProductsProps {
  siteData: SiteData;
  onTrack?: (type: any) => void;
}

const Products: React.FC<ProductsProps> = ({ siteData, onTrack }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<'All' | 'Copper' | 'Brass'>('All');

  useEffect(() => {
    if (selectedProduct) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedProduct]);

  const filteredProducts = useMemo(() => {
    if (filter === 'All') return siteData.products;
    return siteData.products.filter(p => p.material.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, siteData.products]);

  const categories = ['All', 'Copper', 'Brass'];

  return (
    <div className="min-h-screen bg-brand-bone">
      {/* Editorial Header */}
      <section className="pt-32 md:pt-48 pb-20 container mx-auto px-6">
        <div className="text-center space-y-8 reveal-content">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-brand-gold"></span>
            <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.8em]">Master Catalog</span>
            <span className="h-px w-12 bg-brand-gold"></span>
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold text-brand-obsidian leading-none tracking-tighter italic">
            Artisan <span className="text-luxury-gradient">Collection.</span>
          </h1>
          <p className="text-brand-slate max-w-2xl mx-auto font-light text-xl italic leading-relaxed">
            Mahakarya yang diciptakan dengan ritme palu tradisional untuk standar kemewahan masa depan.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center mt-16">
          <div className="glass-luxury p-1.5 rounded-full flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  filter === cat ? 'bg-brand-obsidian text-brand-gold shadow-xl' : 'text-brand-obsidian/40 hover:text-brand-obsidian'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>
        
      {/* Product Grid */}
      <section className="pb-48 container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredProducts.map((p, idx) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedProduct(p)}
              className="group cursor-pointer flex flex-col space-y-8 animate-reveal"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-xl group-hover:shadow-brand-copper/10 transition-all duration-700 bg-white border border-black/5">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-brand-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="luxury-button bg-brand-gold text-brand-obsidian">Inspect Monograph</span>
                </div>
              </div>
              <div className="px-4 space-y-2 text-center">
                <div className="flex items-center justify-center gap-3">
                   <span className="text-[9px] font-black uppercase text-brand-gold tracking-widest">{p.material}</span>
                   <span className="w-1 h-1 rounded-full bg-brand-gold/30"></span>
                   <span className="text-[9px] font-black uppercase text-brand-slate/40 tracking-widest">Bespoke</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-obsidian italic leading-tight group-hover:text-brand-copper transition-colors">
                  {p.name}
                </h3>
                <p className="text-xl font-serif font-bold text-brand-obsidian/60 italic">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-brand-obsidian/95 backdrop-blur-3xl" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-white w-full max-w-7xl md:rounded-[5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-reveal h-full md:h-auto overflow-y-auto md:overflow-hidden">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-brand-obsidian text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-obsidian transition-all z-50 shadow-2xl border border-white/10">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            
            <div className="w-full md:w-3/5 h-[50vh] md:h-auto shrink-0 relative">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt="" />
              <div className="absolute bottom-10 left-10 glass-luxury p-8 rounded-3xl border-white/20 hidden md:block">
                 <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Certification</p>
                 <p className="text-white font-serif italic text-lg mt-1">Authentic Hammer Stroke</p>
              </div>
            </div>

            <div className="w-full md:w-2/5 p-12 md:p-24 flex flex-col justify-center space-y-12 bg-white">
              <div className="space-y-4">
                <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.6em]">Registry ID: ART-{selectedProduct.id}</span>
                <h2 className="text-4xl md:text-7xl font-serif font-bold italic text-brand-obsidian leading-tight tracking-tighter">{selectedProduct.name}</h2>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase text-brand-gold tracking-widest flex items-center gap-4">
                  <span className="w-8 h-px bg-brand-gold/30"></span> The Narrative
                </h4>
                <p className="text-brand-slate text-xl italic font-light leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-12 pt-8 border-t border-black/5">
                <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase text-brand-gold tracking-widest">Base Material</p>
                  <p className="text-2xl font-serif font-bold italic text-brand-obsidian">{selectedProduct.material}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase text-brand-gold tracking-widest">Market Value</p>
                  <p className="text-2xl font-serif font-bold italic text-brand-copper">{selectedProduct.price}</p>
                </div>
              </div>

              <div className="pt-10 space-y-6">
                <a 
                  href={`https://wa.me/${siteData.contact.whatsapp.replace(/\+/g, '')}?text=Enquiry: ${selectedProduct.name}`}
                  onClick={() => onTrack?.('whatsapp')}
                  className="luxury-button bg-brand-obsidian text-brand-gold hover:bg-brand-copper hover:text-white py-6"
                >
                  <i className="fa-brands fa-whatsapp text-lg"></i> Inquire for Custom Commission
                </a>
                <p className="text-center text-[8px] font-black uppercase text-brand-slate/30 tracking-[0.4em]">International White-Glove Logistics Available</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
