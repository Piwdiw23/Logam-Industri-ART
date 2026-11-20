
import React from 'react';
import { Link } from 'react-router-dom';
import { SiteData } from '../types';

/**
 * Contact page for manifestating visions and commissioning artifacts.
 * Includes tracking for various communication channels.
 */
interface ContactProps {
  siteData: SiteData;
  onTrack?: (type: any) => void;
}

const Contact: React.FC<ContactProps> = ({ siteData, onTrack }) => {
  return (
    <div className="bg-brand-bone min-h-screen">
      {/* Editorial Header */}
      <section className="pt-48 pb-20 container mx-auto px-6">
        <div className="max-w-4xl animate-reveal">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-10 bg-brand-gold"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Inquiry Terminal</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-obsidian leading-[0.85] tracking-tighter">
            Manifesting <br />
            <span className="italic text-gold-gradient font-light">Your Vision.</span>
          </h1>
          <p className="text-brand-slate text-xl mt-10 font-serif italic max-w-2xl">
            "Baik untuk kolaborasi arsitektural maupun koleksi pesanan pribadi, master pandai besi kami siap menjembatani celah antara imajinasi dan logam."
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="pb-32 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Channels */}
          <div className="lg:col-span-5 space-y-6 animate-reveal" style={{ animationDelay: '150ms' }}>
            
            {/* WhatsApp - Primary Channel */}
            <a 
              href={`https://wa.me/${siteData.contact.whatsapp.replace(/\+/g, '')}`} 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrack?.('whatsapp')}
              className="group block glass-luxury p-10 rounded-[2.5rem] border-brand-gold/10 hover:border-brand-gold/40 hover:shadow-2xl transition-all duration-700"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-brand-obsidian rounded-2xl flex items-center justify-center text-brand-gold shadow-lg group-hover:scale-110 transition-transform">
                  <i className="fa-brands fa-whatsapp text-2xl"></i>
                </div>
                <span className="text-[8px] font-black text-brand-gold uppercase tracking-widest border border-brand-gold/20 px-3 py-1 rounded-full">Fast Response</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-obsidian mb-2">Direct Concierge</h3>
              <p className="text-brand-slate font-light text-sm mb-6">Konsultasi waktu nyata untuk estimasi proyek dan pemilihan material.</p>
              <p className="text-brand-obsidian font-bold tracking-widest text-lg">{siteData.contact.whatsapp}</p>
            </a>

            {/* Email - Official Inquiries */}
            <a 
              href={`mailto:${siteData.contact.email}`}
              className="group block bg-white p-10 rounded-[2.5rem] border border-brand-obsidian/5 hover:shadow-xl transition-all duration-700"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-brand-bone rounded-2xl flex items-center justify-center text-brand-obsidian border border-brand-obsidian/5 shadow-sm group-hover:bg-brand-obsidian group-hover:text-brand-gold transition-all">
                  <i className="fa-solid fa-envelope-open-text text-xl"></i>
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-obsidian mb-2">Institutional Registry</h3>
              <p className="text-brand-slate font-light text-sm mb-6">Untuk cetak biru arsitektural, RFP, dan kemitraan perusahaan resmi.</p>
              <p className="text-brand-obsidian font-bold text-lg break-all italic">{siteData.contact.email}</p>
            </a>

            {/* Social Presence */}
            <div className="bg-brand-obsidian p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 opacity-5 text-8xl text-brand-gold">
                 <i className="fa-solid fa-hashtag"></i>
               </div>
               <h3 className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-8">Visual Networks</h3>
               <div className="flex gap-8">
                 {[
                   { id: 'instagram', icon: 'fa-instagram' },
                   { id: 'youtube', icon: 'fa-youtube' },
                   { id: 'facebook', icon: 'fa-facebook-f' },
                   { id: 'linkedin', icon: 'fa-linkedin-in' }
                 ].map(social => (
                   <a 
                     key={social.id} 
                     href="#" 
                     onClick={(e) => { e.preventDefault(); onTrack?.(social.id); }}
                     className="text-white/30 hover:text-brand-gold transition-all text-2xl hover:-translate-y-1 transform"
                   >
                     <i className={`fa-brands ${social.icon}`}></i>
                   </a>
                 ))}
               </div>
            </div>
          </div>

          {/* Right: Geographical Hub (Map) */}
          <div className="lg:col-span-7 h-full min-h-[600px] animate-reveal" style={{ animationDelay: '300ms' }}>
            <div className="w-full h-full rounded-[3.5rem] overflow-hidden relative border border-brand-obsidian/5 shadow-2xl group">
              <iframe 
                src={siteData.contact.mapUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) contrast(1.1) brightness(0.95)' }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Institutional Hub Location"
                className="group-hover:filter-none transition-all duration-[2s] ease-in-out scale-105 group-hover:scale-100"
              ></iframe>
              
              {/* Institutional Location Tag */}
              <div className="absolute bottom-10 left-10 right-10 md:right-auto glass-obsidian p-8 rounded-3xl border border-brand-gold/20 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold">Central Forge Node</p>
                </div>
                <h4 className="text-white font-serif font-bold text-xl italic mb-2">Cepogo Artisan District</h4>
                <p className="text-white/50 text-xs font-light leading-relaxed max-w-xs">
                  {siteData.contact.address}
                </p>
                <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Lat: 7.51° S | Lon: 110.51° E</span>
                  <button className="text-brand-gold text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors">Open in Nav <i className="fa-solid fa-arrow-up-right-from-square ml-1"></i></button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Institutional CTA Section */}
      <section className="pb-40 container mx-auto px-6">
        <div className="bg-brand-obsidian rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none text-[20rem] font-serif font-bold text-brand-gold flex items-center justify-center">
            LOGAM
          </div>
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white italic">Ready to forge the <br/>exceptional?</h2>
            <p className="text-brand-bone/40 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Kami mengkhususkan diri dalam elemen arsitektural khusus. Beritahu kami tentang ruang Anda, dan mari kita tentukan ritme tembaga yang menjadi miliknya.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href={`https://wa.me/${siteData.contact.whatsapp.replace(/\+/g, '')}?text=Institutional Enquiry: I am interested in a custom commission for a new project.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrack?.('whatsapp')}
                className="px-14 py-6 bg-brand-gold text-brand-obsidian font-black text-[11px] uppercase tracking-[0.4em] rounded-full hover:bg-white transition-all shadow-xl shadow-brand-gold/10"
              >
                Start Commission
              </a>
              <Link 
                to="/produk" 
                className="px-14 py-6 border border-white/20 text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-full hover:bg-white/5 transition-all flex items-center justify-center"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
