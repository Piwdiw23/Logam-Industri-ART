
import React from 'react';
import { Link } from 'react-router-dom';
import { SiteData } from '../types';

interface FooterProps {
  siteData: SiteData;
  onTrack?: (type: any) => void;
}

const Footer: React.FC<FooterProps> = ({ siteData, onTrack }) => {
  const navLinks = [
    { name: 'Collection', path: '/produk' },
    { name: 'Gallery', path: '/galery' },
    { name: 'Insights', path: '/artikel' },
    { name: 'About', path: '/tentang' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <footer className="bg-brand-obsidian text-brand-bone pt-20 md:pt-32 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mb-20">
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-gold tracking-widest uppercase italic">LOGAM INDUSTRI ART</h2>
          <p className="text-brand-bone/40 leading-relaxed font-light text-sm italic max-w-sm">Menciptakan warisan antargenerasi. Tembaga kemurnian tinggi & kuningan arsitektural pesanan.</p>
        </div>
        <div className="space-y-6 md:space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Master Navigation</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className="text-[11px] font-medium text-white/40 hover:text-brand-gold transition-colors uppercase tracking-widest">{link.name}</Link>
            ))}
          </div>
        </div>
        <div className="space-y-6 md:space-y-8 sm:col-span-2 lg:col-span-1">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Global Hub</h4>
          <p className="text-xs text-white/30 font-light italic max-w-xs">{siteData.contact.address}</p>
          <div className="flex gap-6 mt-4">
              <a onClick={() => onTrack?.('instagram')} href={`https://instagram.com/${siteData.contact.instagram}`} target="_blank" className="text-white/40 hover:text-brand-gold transition-all"><i className="fa-brands fa-instagram text-xl"></i></a>
              <a onClick={() => onTrack?.('whatsapp')} href={`https://wa.me/${siteData.contact.whatsapp.replace(/\+/g, '')}`} target="_blank" className="text-white/40 hover:text-brand-gold transition-all"><i className="fa-brands fa-whatsapp text-xl"></i></a>
              <a onClick={() => onTrack?.('linkedin')} href="#" target="_blank" className="text-white/40 hover:text-brand-gold transition-all"><i className="fa-brands fa-linkedin text-xl"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
