
import React, { useState, useEffect } from 'react';
import { SiteData } from '../types';
import { Link } from 'react-router-dom';

const Home: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % siteData.carousel.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [siteData.carousel.length]);

  return (
    <div className="space-y-0 overflow-x-hidden bg-brand-bone">
      {/* Editorial Hero */}
      <section className="relative h-screen overflow-hidden bg-brand-obsidian">
        {siteData.carousel.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-20"></div>
            <img 
              src={img} 
              alt={`Exhibition ${idx}`} 
              className="w-full h-full object-cover scale-105" 
              style={{ transition: 'transform 10s linear', transform: idx === currentSlide ? 'scale(1)' : 'scale(1.1)' }}
            />
            <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center text-white text-center px-6 transition-all duration-1000 ${idx === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <span className="text-brand-gold font-sans font-bold uppercase tracking-[0.6em] md:tracking-[0.8em] mb-6 md:mb-8 text-[9px] md:text-xs">Bespoke Metal Mastery</span>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold mb-8 md:mb-12 leading-tight md:leading-none tracking-tighter">
                Timeless <br className="hidden md:block" /> <span className="italic text-gold-gradient">Artifacts</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full max-w-xs sm:max-w-none justify-center">
                <Link to="/produk" className="px-10 md:px-14 py-4 md:py-5 bg-brand-gold text-brand-obsidian font-bold rounded-full transition-all hover:bg-white shadow-2xl tracking-[0.2em] md:tracking-[0.3em] text-[10px] uppercase text-center">
                  Explore Catalog
                </Link>
                <Link to="/kontak" className="px-10 md:px-14 py-4 md:py-5 border border-white/20 backdrop-blur-xl text-white font-bold rounded-full transition-all hover:bg-white/10 tracking-[0.2em] md:tracking-[0.3em] text-[10px] uppercase text-center">
                  Consultation
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* Navigation Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-2 md:gap-4">
          {siteData.carousel.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={`w-8 md:w-16 h-0.5 transition-all ${i === currentSlide ? 'bg-brand-gold' : 'bg-white/20 hover:bg-white/40'}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-40 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8 md:space-y-12 animate-reveal">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight">Every stroke tells a <br/><span className="italic text-brand-gold">generational story.</span></h2>
            <p className="text-brand-slate text-lg md:text-xl leading-relaxed max-w-xl font-light">
              Kami percaya bahwa kemewahan bukan tentang kesempurnaan, melainkan tentang kehadiran tangan manusia. Tembaga kami bukan sekadar bahan; ia adalah kanvas ritme dan niat.
            </p>
            <div className="grid grid-cols-2 gap-8 md:gap-12 pt-8">
              <div>
                <h4 className="font-serif text-3xl md:text-4xl font-bold mb-2 md:mb-4">99.9%</h4>
                <p className="text-[10px] uppercase tracking-widest text-brand-slate font-bold">Purity Standard</p>
              </div>
              <div>
                <h4 className="font-serif text-3xl md:text-4xl font-bold mb-2 md:mb-4">500+</h4>
                <p className="text-[10px] uppercase tracking-widest text-brand-slate font-bold">Global Installations</p>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl md:rounded-none">
            <div className="hidden md:block absolute -inset-4 border border-brand-gold/20 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
            <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80" className="relative z-10 w-full aspect-square md:aspect-auto md:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" alt="Craftsmanship" />
          </div>
        </div>
      </section>

      {/* Featured Assets Grid */}
      <section className="bg-brand-obsidian py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12">
            <div className="max-w-2xl">
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">The Collection</span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 md:mb-8">Iconic Masterpieces</h2>
              <p className="text-brand-bone/40 text-base md:text-lg font-light leading-relaxed">Memilih karya-karya yang menentukan perjalanan kami. Dari api Boyolali ke penthouse terbaik di dunia.</p>
            </div>
            <Link to="/produk" className="px-8 md:px-10 py-3 md:py-4 border border-brand-gold/30 text-brand-gold rounded-full hover:bg-brand-gold hover:text-brand-obsidian transition-all uppercase tracking-[0.2em] text-[10px] font-bold">
              View Master Catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {siteData.products.slice(0, 4).map((p, idx) => (
              <Link to="/produk" key={p.id} className={`group relative overflow-hidden aspect-[3/4] ${idx % 2 !== 0 ? 'lg:mt-16' : ''}`}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-3">{p.material}</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight group-hover:text-brand-gold transition-all">{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-40 md:py-60 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] md:opacity-[0.03] text-[20rem] md:text-[50rem] font-serif font-bold text-brand-gold -mt-40 md:-mt-80 -ml-20 md:-ml-40 select-none">LOGAM</div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-12 md:space-y-16">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold text-brand-obsidian max-w-5xl mx-auto leading-tight md:leading-[1.1] tracking-tighter px-4">Crafting a home that speaks the language of <span className="italic">legacy.</span></h2>
          <Link to="/kontak" className="inline-block px-10 md:px-16 py-5 md:py-7 bg-brand-obsidian text-brand-gold font-bold rounded-full hover:bg-brand-gold hover:text-brand-obsidian transition-all shadow-2xl uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px]">
            Inquire for Commission
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
