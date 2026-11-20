
import React, { useState, useMemo } from 'react';
import { SiteData, Product } from '../types';

/**
 * Products page displaying the artisan catalog.
 * Supports filtering by material and detailed product views.
 */
interface ProductsProps {
  siteData: SiteData;
  onTrack?: (type: any) => void;
}

const Products: React.FC<ProductsProps> = ({ siteData, onTrack }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<'All' | 'Copper' | 'Brass'>('All');

  const filteredProducts = useMemo(() => {
    if (filter === 'All') return siteData.products;
    return siteData.products.filter(p => p.material.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, siteData.products]);

  const categories = ['All', 'Copper', 'Brass'];

  return (
    <div className="min-h-screen bg-brand-bone">
      {/* Decorative Background Element */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] md:opacity-[0.03] overflow-hidden z-0">
        <div className="absolute top-10 -left-10 md:-left-20 text-[10rem] md:text-[20rem] font-serif font-black rotate-12 text-brand-gold select-none">ARTIFACTS</div>
      </div>

      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 space-y-4 md:space-y-6 animate-reveal">
          <div className="flex items-center justify-center gap-3 md:gap-4">
             <span className="w-6 md:w-8 h-px bg-brand-gold"></span>
             <span className="text-brand-gold text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em]">The Collection</span>
             <span className="w-6 md:w-8 h-px bg-brand-gold"></span>
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-obsidian leading-none tracking-tighter">
            Artisan <span className="italic text-gold-gradient">Catalog.</span>
          </h1>
          <p className="text-brand-slate max-w-2xl mx-auto font-light text-base md:text-lg italic px-4">
            "Where ancient rhythm meets modern exclusivity."
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center mb-12 md:mb-16 overflow-x-auto scrollbar-hide">
          <div className="glass-luxury p-1 md:p-1.5 rounded-full flex gap-1 border-brand-gold/10 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 md:px-8 py-2 md:py-2.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                  filter === cat 
                    ? 'bg-brand-obsidian text-brand-gold shadow-lg' 
                    : 'text-brand-obsidian/40 hover:text-brand-obsidian hover:bg-white/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredProducts.map((p, idx) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedProduct(p)}
              className="group cursor-pointer flex flex-col animate-reveal"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Product Card Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-sm group-hover:shadow-2xl transition-all duration-700 border border-brand-obsidian/5 bg-white">
                {/* Status Badge */}
                <div className="absolute top-4 md:top-6 left-4 md:left-6 z-10">
                  <span className="px-3 md:px-4 py-1 md:py-1.5 glass-obsidian border border-white/10 rounded-full text-[7px] md:text-[8px] font-black text-brand-gold uppercase tracking-[0.2em] shadow-lg">
                    Bespoke Craft
                  </span>
                </div>
                
                {/* Main Image */}
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110" 
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/80 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10">
                   <p className="text-brand-gold font-serif italic text-lg mb-2 transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">View Details</p>
                   <div className="hidden md:block w-12 h-0.5 bg-brand-gold transform origin-left scale-x-0 md:group-hover:scale-x-100 transition-transform duration-700 delay-100"></div>
                </div>
              </div>

              {/* Card Label */}
              <div className="mt-6 md:mt-8 px-2 md:px-4 space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 md:gap-3">
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold">{p.material}</span>
                  <span className="w-1 h-1 rounded-full bg-brand-gold/30"></span>
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-brand-slate/40">Limited Edition</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-obsidian group-hover:text-brand-gold transition-colors duration-500 leading-tight">
                  {p.name}
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 md:pt-2">
                  <span className="text-lg md:text-xl font-serif font-bold text-brand-obsidian/80">{p.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10">
          <div 
            className="absolute inset-0 bg-brand-obsidian/95 backdrop-blur-2xl transition-opacity duration-500" 
            onClick={() => setSelectedProduct(null)}
          ></div>
          
          <div className="relative bg-white w-full h-full md:h-auto md:max-w-6xl md:rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl animate-reveal flex flex-col md:flex-row">
            {/* Close Button */}
            <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 md:top-8 right-6 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-obsidian text-brand-gold flex items-center justify-center z-50 hover:bg-brand-gold hover:text-brand-obsidian hover:scale-110 transition-all shadow-xl border border-brand-gold/20"
            >
                <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Visual Section */}
            <div className="w-full md:w-1/2 h-[35vh] md:h-auto relative overflow-hidden bg-brand-bone shrink-0">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/20 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-20 space-y-6 md:space-y-10 overflow-y-auto bg-white flex flex-col">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                   <span className="w-4 md:w-6 h-px bg-brand-gold"></span>
                   <span className="text-brand-gold text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">Artifact Monograph</span>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-obsidian leading-tight md:leading-[0.9] tracking-tighter italic">
                  {selectedProduct.name}
                </h2>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="space-y-3 md:space-y-4">
                  <h4 className="font-black text-brand-obsidian text-[8px] md:text-[10px] uppercase tracking-[0.4em] flex items-center gap-3">
                    <i className="fa-solid fa-feather-pointed text-brand-gold"></i> The Narrative
                  </h4>
                  <p className="text-brand-slate leading-relaxed font-light text-base md:text-lg italic border-l-2 border-brand-gold/20 pl-4 md:pl-6">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-1 md:space-y-2">
                    <h4 className="font-black text-brand-gold text-[8px] md:text-[9px] uppercase tracking-[0.4em]">Core Material</h4>
                    <p className="text-brand-obsidian font-serif font-bold text-lg md:text-xl">{selectedProduct.material}</p>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <h4 className="font-black text-brand-gold text-[8px] md:text-[9px] uppercase tracking-[0.4em]">Investment</h4>
                    <p className="text-2xl md:text-3xl font-serif font-bold text-brand-obsidian">{selectedProduct.price}</p>
                  </div>
                </div>
              </div>

              {/* Action Hub */}
              <div className="pt-6 md:pt-8 space-y-4 mt-auto">
                <a 
                  href={`https://wa.me/${siteData.contact.whatsapp.replace(/\+/g, '')}?text=Institutional Enquiry: I am interested in commissioning the ${selectedProduct.name}. Please provide a master quotation.`}
                  target="_blank"
                  onClick={() => onTrack?.('whatsapp')}
                  className="flex items-center justify-center gap-3 md:gap-4 w-full py-4 md:py-6 bg-brand-obsidian text-brand-gold rounded-xl md:rounded-2xl font-black text-[9px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-brand-copper hover:text-white transition-all shadow-xl"
                >
                  <i className="fa-brands fa-whatsapp text-base md:text-lg"></i> Direct Consultation
                </a>
                <p className="text-center text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-brand-slate/40">
                  Global Logistics & Bespoke Sizing Available
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
