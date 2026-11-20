
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteData, Product, FinancialData } from '../../types';

const Dashboard: React.FC<{ siteData: SiteData; setSiteData: (d: SiteData) => void }> = ({ siteData, setSiteData }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  const [draft, setDraft] = useState<SiteData>(siteData);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin/login');
  }, [navigate]);

  const metrics = useMemo(() => {
    const totalRev = draft.finances.reduce((a, b) => a + b.revenue, 0);
    const totalExp = draft.finances.reduce((a, b) => a + b.expenses, 0);
    const inventoryValue = draft.products.reduce((a, b) => a + (b.unitCost * b.stock), 0);
    return { totalRev, totalExp, profit: totalRev - totalExp, inventoryValue };
  }, [draft]);

  const handleSync = () => {
    setSiteData(draft);
    alert("SYSTEM SYNC: Data production deployed successfully.");
  };

  const tabs = [
    { id: 'analytics', icon: 'fa-chart-line', label: 'Analytics' },
    { id: 'inventory', icon: 'fa-boxes-stacked', label: 'Artifacts' },
    { id: 'ledger', icon: 'fa-vault', label: 'Financials' },
    { id: 'identity', icon: 'fa-fingerprint', label: 'Identity' }
  ];

  const formatIDR = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans">
      {/* Sidebar Profesional */}
      <aside className="w-80 bg-brand-obsidian h-screen sticky top-0 p-8 flex flex-col gap-12 shrink-0">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center text-brand-obsidian shadow-lg"><i className="fa-solid fa-crown"></i></div>
           <h2 className="text-white font-serif font-bold text-xl italic tracking-tight">Logam OS <span className="text-[10px] text-brand-gold font-black uppercase ml-2 opacity-50">Enterprise</span></h2>
        </div>
        
        <nav className="flex-grow space-y-3">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t.id ? 'bg-brand-gold text-brand-obsidian shadow-xl' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <i className={`fa-solid ${t.icon} w-6 text-center text-base`}></i>
              {t.label}
            </button>
          ))}
        </nav>

        <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/'); }} className="flex items-center gap-4 p-4 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-400/10 rounded-2xl transition-all">
          <i className="fa-solid fa-power-off"></i> Logout System
        </button>
      </aside>

      {/* Area Konten Utama */}
      <main className="flex-grow p-12 space-y-12 overflow-y-auto">
        <header className="flex justify-between items-center bg-white p-10 rounded-[3rem] shadow-sm border border-black/[0.03]">
          <div>
            <p className="text-[9px] font-black uppercase text-brand-gold tracking-[0.4em]">Operational Center</p>
            <h1 className="text-3xl font-serif font-bold italic capitalize">{activeTab} Control</h1>
          </div>
          <button onClick={handleSync} className="px-10 py-4 bg-brand-obsidian text-brand-gold rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-copper hover:text-white transition-all shadow-2xl">
            Deploy Changes
          </button>
        </header>

        {activeTab === 'analytics' && (
          <div className="space-y-10 animate-reveal">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[3rem] border-l-4 border-brand-copper shadow-sm">
                <p className="text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Total Revenue</p>
                <p className="text-3xl font-serif font-bold">{formatIDR(metrics.totalRev)}</p>
              </div>
              <div className="bg-white p-8 rounded-[3rem] border-l-4 border-red-400 shadow-sm">
                <p className="text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Operational Burn</p>
                <p className="text-3xl font-serif font-bold">{formatIDR(metrics.totalExp)}</p>
              </div>
              <div className="bg-white p-8 rounded-[3rem] border-l-4 border-green-500 shadow-sm">
                <p className="text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Net Alpha</p>
                <p className="text-3xl font-serif font-bold">{formatIDR(metrics.profit)}</p>
              </div>
            </div>
            
            <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-black/[0.03]">
               <h3 className="text-xl font-serif font-bold italic mb-8">Visitor Interactions</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  <div>
                    <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">AI Concierge</p>
                    <p className="text-3xl font-serif font-bold text-brand-gold">{draft.analytics.aiInteractions}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">WA Inquiries</p>
                    <p className="text-3xl font-serif font-bold text-brand-copper">{draft.analytics.whatsappInquiries}</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-8 animate-reveal">
            {draft.products.map(p => (
              <div key={p.id} className="bg-white p-8 rounded-[2.5rem] flex items-center gap-8 shadow-sm group">
                 <img src={p.image} className="w-24 h-24 object-cover rounded-2xl shadow-inner" alt="" />
                 <div className="flex-grow grid grid-cols-4 gap-8">
                    <div className="col-span-1">
                       <label className="text-[8px] font-black uppercase text-brand-gold tracking-widest">Artifact</label>
                       <p className="font-serif font-bold">{p.name}</p>
                    </div>
                    <div>
                       <label className="text-[8px] font-black uppercase text-brand-gold tracking-widest">Stock</label>
                       <input type="number" value={p.stock} onChange={e => {
                         const n = parseInt(e.target.value) || 0;
                         setDraft({...draft, products: draft.products.map(x => x.id === p.id ? {...x, stock: n} : x)});
                       }} className="w-full bg-gray-50 p-2 rounded-lg text-sm border-none shadow-inner" />
                    </div>
                    <div>
                       <label className="text-[8px] font-black uppercase text-brand-gold tracking-widest">Unit Price</label>
                       <p className="font-bold text-sm">{p.price}</p>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
