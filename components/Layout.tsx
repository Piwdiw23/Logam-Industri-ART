
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { SiteData } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  siteData: SiteData;
  onTrack?: (type: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, siteData, onTrack }) => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bone selection:bg-brand-gold selection:text-brand-obsidian">
      <Navbar siteData={siteData} />
      <main className="flex-grow pt-20 md:pt-0">
        {children}
      </main>
      <Footer siteData={siteData} onTrack={onTrack} />
    </div>
  );
};

export default Layout;
