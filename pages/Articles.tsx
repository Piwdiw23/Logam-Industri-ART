
import React, { useState, useEffect, useRef } from 'react';
import { SiteData, Article } from '../types';

const Articles: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const readerRef = useRef<HTMLDivElement>(null);

  // Helper to render content with enhanced editorial styling
  const renderContent = (content: string) => {
    return content.split('\n').filter(p => p.trim() !== '').map((para, idx) => (
      <p key={idx} className={`leading-[1.9] text-brand-obsidian/80 mb-10 text-lg md:text-xl font-serif ${
        idx === 0 ? 'first-letter:text-7xl first-letter:font-bold first-letter:text-brand-gold first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8] mt-2' : ''
      }`}>
        {para}
      </p>
    ));
  };

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedArticle]);

  return (
    <div className="relative min-h-screen bg-brand-bone">
      {/* Background Subtle Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.012] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

      <div className="container mx-auto px-6 py-48 relative z-10">
        {/* Elegant Header */}
        <header className="mb-32 space-y-6 animate-reveal">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-brand-gold"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">The Monographs</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-obsidian leading-[0.85] tracking-tighter">
            Insights & <br />
            <span className="italic text-gold-gradient font-light">Heritage.</span>
          </h1>
          <div className="h-px w-full max-w-xs bg-brand-gold/20 mt-8"></div>
        </header>

        {/* Professional Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
          {siteData.articles.map((a, idx) => (
            <article 
              key={a.id} 
              className="group cursor-pointer flex flex-col space-y-8 animate-reveal"
              onClick={() => setSelectedArticle(a)}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Image Frame - Smaller Aspect for Elegance */}
              <div className="relative overflow-hidden rounded-3xl bg-brand-obsidian aspect-[4/3] shadow-lg transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-brand-gold/5 border border-brand-obsidian/5">
                <img 
                  src={a.image} 
                  alt={a.title} 
                  className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/20 to-transparent"></div>
                
                {/* Index Number */}
                <div className="absolute top-6 right-6">
                  <span className="text-[9px] font-black text-white/30 tracking-[0.2em] group-hover:text-brand-gold transition-colors">
                    REF. {a.id.padStart(3, '0')}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-4 px-1">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.4em]">{a.date}</span>
                  <div className="w-1 h-1 rounded-full bg-brand-gold/30"></div>
                  <span className="text-[9px] font-black text-brand-slate/40 uppercase tracking-[0.4em]">Article</span>
                </div>
                
                <h2 className="text-2xl font-serif font-bold text-brand-obsidian leading-snug transition-all duration-500 group-hover:text-brand-gold">
                  {a.title}
                </h2>
                
                <p className="text-brand-slate/70 text-sm font-light leading-relaxed line-clamp-2 italic">
                  {a.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-3 group/btn">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-obsidian border-b border-brand-gold/0 group-hover/btn:border-brand-gold transition-all duration-300">Explore Monograph</span>
                  <i className="fa-solid fa-arrow-right-long text-[10px] text-brand-gold transition-transform duration-500 group-hover/btn:translate-x-2"></i>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Detail Modal - Improved Full Resolution Editorial View */}
      {selectedArticle && (
        <div 
          ref={readerRef}
          className="fixed inset-0 z-[200] overflow-y-auto bg-brand-bone animate-in fade-in duration-500 custom-scrollbar"
        >
          {/* Top Navigation */}
          <div className="sticky top-0 left-0 right-0 z-[210] p-6 md:p-8 flex justify-between items-center pointer-events-none">
            <div className="flex gap-4 pointer-events-auto">
                <div className="bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-brand-obsidian/5 shadow-md">
                    <span className="text-[8px] font-black text-brand-obsidian uppercase tracking-[0.5em]">Aurum Digital Journal</span>
                </div>
            </div>
            <button 
              onClick={() => setSelectedArticle(null)}
              className="w-12 h-12 rounded-full bg-brand-obsidian text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-obsidian hover:rotate-90 transition-all shadow-xl pointer-events-auto border border-brand-gold/20"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div className="container mx-auto px-6 max-w-6xl pb-32">
            {/* Featured Image - Large, Full Aspect, Uncropped */}
            <div className="mt-8 mb-16 animate-reveal">
              <div className="relative w-full bg-brand-obsidian rounded-[3rem] overflow-hidden shadow-2xl border border-brand-obsidian/10 group">
                <div 
                  className="absolute inset-0 opacity-20 blur-3xl scale-110 pointer-events-none"
                  style={{ backgroundImage: `url(${selectedArticle.image})`, backgroundSize: 'cover' }}
                ></div>
                
                <div className="relative flex items-center justify-center min-h-[40vh] md:min-h-[60vh] lg:min-h-[75vh]">
                   <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title} 
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain block mx-auto z-10"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-obsidian/40 pointer-events-none"></div>
              </div>
              <div className="mt-6 flex justify-center">
                 <p className="text-[9px] font-black text-brand-gold uppercase tracking-[0.6em] opacity-40 italic">Digital Master Archive Monograph No. {selectedArticle.id}</p>
              </div>
            </div>

            {/* Editorial Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-brand-gold/10 pt-16">
              <aside className="lg:col-span-3 space-y-12">
                <div className="space-y-4">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold">Contributor</h4>
                  <p className="text-lg font-serif font-bold italic text-brand-obsidian">Master Smith <br/>Heritage Board</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold">Metadata</h4>
                  <div className="space-y-2">
                    <p className="text-[10px] text-brand-slate font-light uppercase tracking-widest">Released: {selectedArticle.date}</p>
                    <p className="text-[10px] text-brand-slate font-light uppercase tracking-widest">ID: {selectedArticle.id.padStart(4, '0')}</p>
                  </div>
                </div>
              </aside>

              <main className="lg:col-span-7 lg:col-start-5">
                <header className="mb-12 space-y-4">
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-obsidian leading-[1.1] tracking-tight italic">
                    {selectedArticle.title}
                  </h1>
                  <div className="w-12 h-px bg-brand-gold"></div>
                </header>
                
                <div className="prose-luxury pb-20">
                  {renderContent(selectedArticle.content)}
                </div>
                
                <div className="pt-20 border-t border-brand-gold/10 flex flex-col items-center text-center space-y-8">
                  <div className="w-14 h-14 rounded-full bg-brand-bone flex items-center justify-center text-brand-gold border border-brand-gold/20">
                    <i className="fa-solid fa-scroll text-xl"></i>
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-[0.5em] text-brand-slate/30">End of Institutional Registry</p>
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="group px-12 py-5 bg-brand-obsidian text-brand-gold rounded-full font-black text-[9px] uppercase tracking-[0.4em] hover:bg-brand-gold hover:text-brand-obsidian transition-all shadow-xl"
                  >
                    Return to Journal
                  </button>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
