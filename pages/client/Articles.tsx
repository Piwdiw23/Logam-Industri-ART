
import React, { useState, useEffect } from 'react';
import { SiteData, Article } from '../../types';

const Articles: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (selectedArticle) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedArticle]);

  return (
    <div className="relative min-h-screen bg-brand-bone">
      {/* Section Header */}
      <section className="pt-32 md:pt-48 pb-24 container mx-auto px-6 space-y-8 reveal-content">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-brand-gold"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-brand-gold">Heritage Journal</span>
        </div>
        <h1 className="text-6xl md:text-9xl font-serif font-bold text-brand-obsidian leading-none tracking-tighter italic">
          Insights & <br/><span className="text-luxury-gradient">Heritage.</span>
        </h1>
        <p className="text-brand-slate text-xl md:text-2xl font-serif italic max-w-2xl leading-relaxed">
          Eksplorasi mendalam tentang material, sejarah, dan masa depan pengerjaan logam mewah.
        </p>
      </section>

      {/* Article Grid */}
      <section className="container mx-auto px-6 pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {siteData.articles.map((a, idx) => (
            <article 
              key={a.id} 
              className="group cursor-pointer space-y-10 animate-reveal"
              onClick={() => setSelectedArticle(a)}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="relative overflow-hidden rounded-[3rem] aspect-[4/3] shadow-xl border border-black/5 bg-white">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-brand-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="luxury-button glass-luxury text-brand-obsidian border-white/40">Read Monograph</span>
                </div>
              </div>
              <div className="space-y-4 px-4">
                <div className="flex items-center gap-4 text-brand-gold text-[9px] font-black uppercase tracking-widest">
                   <span>{a.date}</span>
                   <span className="w-1 h-1 rounded-full bg-brand-gold/30"></span>
                   <span>Archive No. {a.id}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-obsidian italic leading-tight group-hover:text-brand-copper transition-colors">{a.title}</h2>
                <p className="text-brand-slate italic line-clamp-2 text-lg font-light leading-relaxed">{a.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Article Detail (Reader Modal) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[200] bg-brand-bone overflow-y-auto animate-in fade-in duration-500">
          <div className="sticky top-0 z-[210] p-8 flex justify-between items-center pointer-events-none">
             <div className="glass-luxury px-8 py-3 rounded-full border border-black/5 pointer-events-auto">
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Aurum Digital Journal</span>
             </div>
             <button onClick={() => setSelectedArticle(null)} className="w-14 h-14 rounded-full bg-brand-obsidian text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-obsidian transition-all shadow-2xl pointer-events-auto">
                <i className="fa-solid fa-xmark text-2xl"></i>
             </button>
          </div>

          <div className="container mx-auto px-6 max-w-5xl pt-12 pb-32 space-y-20">
             <div className="relative w-full aspect-[21/9] rounded-[4rem] overflow-hidden shadow-2xl border border-black/5">
                <img src={selectedArticle.image} className="w-full h-full object-cover" alt="" />
             </div>
             
             <div className="space-y-12 max-w-3xl mx-auto">
                <div className="space-y-4 text-center">
                   <span className="text-brand-gold text-[10px] font-black uppercase tracking-widest">{selectedArticle.date}</span>
                   <h1 className="text-5xl md:text-8xl font-serif font-bold italic tracking-tighter leading-none">{selectedArticle.title}</h1>
                </div>
                
                <div className="h-px w-24 bg-brand-gold/30 mx-auto"></div>
                
                <div className="space-y-10">
                   {selectedArticle.content.split('\n').map((para, i) => (
                      <p key={i} className={`text-xl md:text-2xl font-serif leading-[1.8] text-brand-slate italic ${i === 0 ? 'first-letter:text-8xl first-letter:font-bold first-letter:text-brand-gold first-letter:mr-6 first-letter:float-left' : ''}`}>
                         {para}
                      </p>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
