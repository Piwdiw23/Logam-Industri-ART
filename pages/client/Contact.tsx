
import React from 'react';
import { SiteData } from '../../types';

interface ContactProps {
  siteData: SiteData;
  onTrack?: (type: any) => void;
}

const Contact: React.FC<ContactProps> = ({ siteData, onTrack }) => {
  return (
    <div className="bg-brand-bone min-h-screen">
      <section className="pt-48 pb-20 container mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-obsidian leading-[0.85] tracking-tighter">
          Manifesting <br />
          <span className="italic text-gold-gradient font-light">Your Vision.</span>
        </h1>
      </section>

      <section className="pb-32 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <a 
              href={`https://wa.me/${siteData.contact.whatsapp.replace(/\+/g, '')}`} 
              target="_blank"
              onClick={() => onTrack?.('whatsapp')}
              className="group block glass-luxury p-10 rounded-[2.5rem] border-brand-gold/10 hover:shadow-2xl transition-all duration-700"
            >
              <h3 className="text-2xl font-serif font-bold text-brand-obsidian mb-2">Direct Concierge</h3>
              <p className="text-brand-obsidian font-bold tracking-widest text-lg">{siteData.contact.whatsapp}</p>
            </a>
          </div>
          <div className="lg:col-span-7 h-[600px] rounded-[3.5rem] overflow-hidden border border-brand-obsidian/5 shadow-2xl">
            <iframe src={siteData.contact.mapUrl} width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1)' }} allowFullScreen={true} loading="lazy" title="Map"></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
