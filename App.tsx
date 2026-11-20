
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/client/Home';
import About from './pages/client/About';
import Products from './pages/client/Products';
import Gallery from './pages/client/Gallery';
import Articles from './pages/client/Articles';
import FAQ from './pages/client/FAQ';
import Contact from './pages/client/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AIChatbot from './components/AIChatbot';
import { initialSiteData } from './data';
import { SiteData } from './types';

// HOC untuk Proteksi Admin
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

const App: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData>(initialSiteData);

  // Persistence Logic
  useEffect(() => {
    const saved = localStorage.getItem('siteData');
    if (saved) {
      try { setSiteData(JSON.parse(saved)); } 
      catch (e) { console.error("Data integrity failure:", e); }
    }
  }, []);

  const handleUpdateData = (newData: SiteData) => {
    setSiteData(newData);
    localStorage.setItem('siteData', JSON.stringify(newData));
  };

  const trackMetric = useCallback((type: string) => {
    setSiteData(prev => {
      const updated = { ...prev };
      if (type === 'ai') updated.analytics.aiInteractions++;
      if (type === 'whatsapp') updated.analytics.whatsappInquiries++;
      localStorage.setItem('siteData', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Konten Administrasi (Terisolasi) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard siteData={siteData} setSiteData={handleUpdateData} />
          </ProtectedRoute>
        } />

        {/* Konten Klien (Global Layout) */}
        <Route path="*" element={
          <Layout siteData={siteData} onTrack={trackMetric}>
            <Routes>
              <Route path="/" element={<Home siteData={siteData} />} />
              <Route path="/tentang" element={<About siteData={siteData} />} />
              <Route path="/produk" element={<Products siteData={siteData} onTrack={trackMetric} />} />
              <Route path="/galery" element={<Gallery siteData={siteData} />} />
              <Route path="/artikel" element={<Articles siteData={siteData} />} />
              <Route path="/faq" element={<FAQ siteData={siteData} />} />
              <Route path="/kontak" element={<Contact siteData={siteData} onTrack={trackMetric} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <AIChatbot siteData={siteData} onTrack={() => trackMetric('ai')} />
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
