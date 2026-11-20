
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SiteData } from '../types';

const Navbar: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isDark = useMemo(() => {
    if (menuOpen) return true;
    if (location.pathname === '/' && !scrolled) return true;
    return false;
  }, [menuOpen, location.pathname, scrolled]);

  const links = [
    { n: 'Collection', p: '/produk' },
    { n: 'Gallery', p: '/galery' },
    { n: 'Insights', p: '/artikel' },
    { n: 'About', p: '/tentang' },
    { n: 'FAQ', p: '/faq' },
  ];

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between px-8 py-4 rounded-full border transition-all duration-700 ${
            scrolled ? 'glass-light shadow-2xl border-brand-gold/10' : 'bg-transparent border-transparent'
          }`}>
            <Link to="/" className="flex items-center gap-3 group z-[110]">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold transition-all duration-500 shadow-lg group-hover:rotate-[360deg] ${
                  isDark ? 'bg-brand-gold text-brand-obsidian' : 'bg-brand-obsidian text-brand-gold'
                }`}
                onDoubleClick={() => navigate('/admin/login')}
              > L </div>
              <span className={`text-sm font-serif font-bold tracking-tight hidden sm:block transition-colors duration-500 ${isDark ? 'text-white' : 'text-brand-obsidian'}`}>
                LOGAM <span className={`transition-colors duration-500 ${isDark ? 'text-brand-gold' : 'text-brand-copper'}`}>INDUSTRI ART</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              {links.map(l => (
                <Link key={l.p} to={l.p} className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group ${location.pathname === l.p ? (isDark ? 'text-brand-gold' : 'text-brand-copper') : (isDark ? 'text-white/60 hover:text-white' : 'text-brand-obsidian/60 hover:text-brand-obsidian')}`}>
                  {l.n}
                  <span className={`absolute -bottom-2 left-0 h-[1.5px] bg-brand-gold transition-all duration-500 ${location.pathname === l.p ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link to="/kontak" className={`hidden md:block px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${isDark ? 'bg-brand-gold text-brand-obsidian hover:bg-white' : 'bg-brand-obsidian text-brand-gold hover:bg-brand-copper hover:text-white'}`}>
                Inquiry
              </Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden relative z-[110]">
                 <div className={`w-6 h-0.5 mb-1.5 transition-all ${isDark ? 'bg-brand-gold' : 'bg-brand-obsidian'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                 <div className={`w-4 h-0.5 mb-1.5 ml-auto transition-all ${isDark ? 'bg-brand-gold' : 'bg-brand-obsidian'} ${menuOpen ? 'opacity-0' : ''}`}></div>
                 <div className={`w-6 h-0.5 transition-all ${isDark ? 'bg-brand-gold' : 'bg-brand-obsidian'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div className={`fixed inset-0 z-[90] bg-brand-obsidian flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
         <div className="flex flex-col gap-8 text-center">
            {links.map((l, i) => (
              <Link key={l.p} to={l.p} className="text-4xl md:text-6xl font-serif font-bold text-white hover:text-brand-gold transition-all hover:scale-110" style={{ transitionDelay: `${i * 100}ms` }}>{l.n}</Link>
            ))}
            <Link to="/kontak" className="text-2xl font-serif italic text-brand-gold mt-8">Start a Commission</Link>
         </div>
      </div>
    </>
  );
};

export default Navbar;
