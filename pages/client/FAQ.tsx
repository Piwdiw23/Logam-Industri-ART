
import React, { useState } from 'react';
import { SiteData } from '../../types';

const FAQ: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen bg-brand-bone overflow-hidden">
      <div className="container mx-auto px-6 py-40 max-w-5xl relative z-10">
        <div className="text-center mb-32 space-y-6 animate-reveal">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-obsidian leading-none tracking-tighter">
            Executive <span className="italic text-gold-gradient">Knowledge</span>
          </h1>
        </div>

        <div className="space-y-4">
          {siteData.faqs.map((f, i) => (
            <div key={i} className={`group transition-all duration-700 rounded-[2.5rem] overflow-hidden ${openIdx === i ? 'glass-luxury shadow-2xl border-brand-gold/30' : 'bg-white border border-brand-obsidian/5'}`}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full p-10 md:p-12 text-left flex justify-between items-center outline-none">
                <span className="text-xl md:text-2xl font-serif font-bold tracking-tight">{f.question}</span>
                <span className="text-2xl font-serif font-bold">{openIdx === i ? '-' : '+'}</span>
              </button>
              {openIdx === i && (
                <div className="px-10 md:px-24 pb-12 animate-in fade-in duration-500">
                  <p className="text-brand-slate leading-relaxed font-light text-xl italic">{f.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
