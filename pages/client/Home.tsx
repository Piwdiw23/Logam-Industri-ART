
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteData, Product } from '../../types';

const Home: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % siteData.carousel.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [siteData.carousel.length]);

  return (
    <div className="relative bg-brand-bone min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-brand-obsidian overflow-hidden">
        {siteData.carousel.map((img, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-[2500ms] ${idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="absolute inset-0 bg-black/40 z-20 backdrop-brightness-75"></div>
            <img src={img} className={`w-full h-full object-cover transition-transform duration-[10s] ${idx === activeSlide ? 'scale-100' : 'scale-110'}`} alt="Craft" />
          </div>
        ))}

        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6">
          <div className="reveal-content space-y-8 max-w-4xl">
            <span className="text-brand-gold uppercase tracking-[0.8em] text-[10px] font-black block animate-pulse">Master Artisans of Boyolali</span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-tight tracking-tighter">
              Legacy in <br className="hidden md:block"/><span className="italic text-luxury-gradient">Pure Copper.</span>
            </h1>
            <p className="text-white/60 max-w-xl mx-auto font-light text-lg md:text-xl italic leading-relaxed">
              Manifestasi keahlian penempaan tradisional Jawa ke dalam mahakarya arsitektural modern.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link to="/produk" className="luxury-button bg-brand-copper text-white hover:bg-white hover:text-brand-obsidian">
                Explore Collection <i className="fa-solid fa-arrow-right-long text-xs"></i>
              </Link>
              <Link to="/kontak" className="luxury-button glass-dark text-white border-white/10 hover:bg-white/10">
                Custom Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 md:py-48 bg-brand-bone relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-[0.02] text-[40rem] font-serif font-black select-none pointer-events-none -mr-40 -mt-20 text-brand-gold">FORGE</div>
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-24 items-center relative z-10">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-brand-gold text-[10px] font-black uppercase tracking-widest">The Alchemy</span>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-brand-obsidian leading-none">Rhythm of <br/><span className="italic text-brand-copper">The Master's Hammer.</span></h2>
            </div>
            <p className="text-brand-slate text-xl font-light leading-relaxed max-w-lg border-l-2 border-brand-gold/20 pl-8 italic">
              "Setiap goresan palu kami adalah ritme yang menjaga jiwa tradisi tetap hidup di tengah dunia yang serba instan."
            </p>
          </div>
          <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-brand-copper/20 cursor-pointer" onClick={() => window.location.href='/#/tentang'}>
             <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Process" />
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand-obsidian/40">
                <span className="text-white font-serif italic text-2xl">The Craftsmanship Experience</span>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section with Detail Modal */}
      <section className="bg-brand-obsidian py-32 md:py-48 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em]">The Selection</span>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-white tracking-tighter italic">Featured <span className="text-luxury-gradient">Artifacts.</span></h2>
            </div>
            <Link to="/produk" className="luxury-button glass-dark text-brand-gold border-white/10 hover:bg-brand-gold hover:text-brand-obsidian">
              View All Masterpieces
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {siteData.products.slice(0, 3).map((p, idx) => (
              <div 
                key={p.id} 
                className="group cursor-pointer space-y-8"
                onClick={() => setSelectedProduct(p)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5 transition-all duration-700 group-hover:shadow-brand-gold/10">
                  <img src={p.image} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" alt={p.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                    <p className="text-brand-gold font-serif italic text-xl">Inspect Artifact</p>
                  </div>
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-[9px] font-black text-brand-gold uppercase tracking-widest">{p.material}</span>
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-brand-gold transition-colors italic">{p.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-brand-obsidian/95 backdrop-blur-3xl" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-white w-full max-w-6xl md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-reveal">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-brand-obsidian text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-obsidian transition-all z-50">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <div className="w-full md:w-1/2 h-[40vh] md:h-[80vh]">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center space-y-8">
              <span className="text-brand-gold text-[10px] font-black uppercase tracking-widest">Product Monograph</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-brand-obsidian">{selectedProduct.name}</h2>
              <p className="text-brand-slate text-lg italic leading-relaxed border-l-2 border-brand-gold/20 pl-8">{selectedProduct.description}</p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <p className="text-[9px] font-black uppercase text-brand-gold tracking-widest">Purity Grade</p>
                  <p className="text-xl font-serif font-bold italic">{selectedProduct.material}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-brand-gold tracking-widest">Investment</p>
                  <p className="text-xl font-serif font-bold italic text-brand-copper">{selectedProduct.price}</p>
                </div>
              </div>
              <a 
                href={`https://wa.me/${siteData.contact.whatsapp.replace(/\+/g, '')}?text=Inquiry: ${selectedProduct.name}`}
                className="luxury-button bg-brand-obsidian text-brand-gold hover:bg-brand-copper hover:text-white"
              >
                Inquire for Bespoke Order
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
