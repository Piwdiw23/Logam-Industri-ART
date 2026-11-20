
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteData, Product, FinancialData, Article, GalleryItem, LegalityItem } from '../types';

declare const jspdf: any;

interface AdminDashboardProps {
  siteData: SiteData;
  setSiteData: (data: SiteData) => void;
}

type TabType = 'analytics' | 'finance' | 'inventory' | 'editorial' | 'assets' | 'showcase' | 'identity';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ siteData, setSiteData }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState<TabType>('analytics');
  const [draftData, setDraftData] = useState<SiteData>(siteData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<{ type: string, id: string | number } | null>(null);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    setDraftData(siteData);
  }, [siteData]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') navigate('/admin/login');
  }, [navigate]);

  const showNotify = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const businessIntelligence = useMemo(() => {
    const finances = draftData.finances;
    const totalRev = finances.reduce((a, b) => a + (b.revenue || 0), 0);
    const totalExp = finances.reduce((a, b) => a + (b.expenses || 0), 0);
    const netProfit = totalRev - totalExp;
    const profitMargin = totalRev > 0 ? (netProfit / totalRev) * 100 : 0;
    
    const parsePrice = (p: string) => {
        if (!p) return 0;
        const cleaned = p.replace(/[^0-9]/g, '');
        return parseInt(cleaned) || 0;
    };
    
    const stockMarketValue = draftData.products.reduce((a, b) => a + (parsePrice(b.price) * (b.stock || 0)), 0);
    const stockAssetCost = draftData.products.reduce((a, b) => a + ((b.unitCost || 0) * (b.stock || 0)), 0);
    const potentialProfitFromStock = stockMarketValue - stockAssetCost;
    const lowStockItems = draftData.products.filter(p => p.stock <= p.minStock);
    const currentMonth = finances[finances.length - 1];
    const prevMonth = finances[finances.length - 2];
    const revGrowth = prevMonth ? ((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100 : 0;

    return { 
      totalRev, totalExp, netProfit, profitMargin, 
      stockMarketValue, stockAssetCost, potentialProfitFromStock,
      lowStockItems, revGrowth, finances 
    };
  }, [draftData]);

  const publishToLive = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setSiteData(draftData);
      setIsProcessing(false);
      showNotify("PRODUCTION SYNC: All systems updated successfully.");
    }, 1500);
  };

  const formatIDR = (n: number) => new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR', maximumFractionDigits: 0}).format(n);

  const triggerUpload = (type: string, id: string | number) => {
    setUploadTarget({ type, id });
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTarget) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const { type, id } = uploadTarget;
        const nextData = { ...draftData };
        if (type === 'prod') nextData.products = nextData.products.map(p => p.id === id ? { ...p, image: base64 } : p);
        if (type === 'art') nextData.articles = nextData.articles.map(a => a.id === id ? { ...a, image: base64 } : a);
        if (type === 'gal') nextData.gallery = nextData.gallery.map(g => g.id === id ? { ...g, url: base64 } : g);
        if (type === 'hero') nextData.carousel = nextData.carousel.map((img, idx) => idx === id ? base64 : img);
        if (type === 'leg') nextData.legalities = nextData.legalities.map(l => l.id === id ? { ...l, image: base64 } : l);
        setDraftData(nextData);
        setUploadTarget(null);
        showNotify("Visual asset updated.");
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex font-sans overflow-hidden">
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
      
      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] animate-reveal">
          <div className={`px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 backdrop-blur-xl border border-white/20 ${notification.type === 'success' ? 'bg-brand-obsidian text-brand-gold' : 'bg-red-500 text-white'}`}>
             <i className={`fa-solid ${notification.type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
             <span className="text-[10px] font-black uppercase tracking-widest">{notification.msg}</span>
          </div>
        </div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`bg-brand-obsidian h-screen sticky top-0 transition-all duration-700 z-[150] flex flex-col shadow-2xl shrink-0 ${isSidebarOpen ? 'w-80' : 'w-24'}`}>
        <div className="p-8 border-b border-white/5 flex items-center gap-5">
           <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-brand-bronze rounded-2xl flex items-center justify-center text-brand-obsidian shadow-lg shrink-0">
              <i className="fa-solid fa-crown text-xl"></i>
           </div>
           <div className={`transition-opacity duration-500 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-white font-serif font-bold italic text-lg leading-tight tracking-tight">Logam Console</h2>
              <p className="text-brand-gold text-[7px] font-black uppercase tracking-[0.4em] mt-1 opacity-70">Enterprise v5.3</p>
           </div>
        </div>
        <nav className="flex-grow p-4 space-y-2 mt-6 overflow-y-auto custom-scrollbar">
          {[
            { id: 'analytics', icon: 'fa-chart-pie', label: 'Analytics' },
            { id: 'finance', icon: 'fa-vault', label: 'Ledger' },
            { id: 'inventory', icon: 'fa-boxes-stacked', label: 'Artifacts' },
            { id: 'editorial', icon: 'fa-pen-nib', label: 'Journal' },
            { id: 'assets', icon: 'fa-images', label: 'Assets' },
            { id: 'showcase', icon: 'fa-display', label: 'Exhibition' },
            { id: 'identity', icon: 'fa-fingerprint', label: 'Identity' }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id as TabType)} className={`w-full flex items-center gap-5 p-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-brand-gold text-brand-obsidian font-bold shadow-xl' : 'text-white/30 hover:bg-white/5 hover:text-white'}`}>
              <i className={`fa-solid ${item.icon} w-6 text-center text-lg`}></i>
              <span className={`text-[10px] uppercase font-black tracking-[0.2em] ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 mt-auto">
            <button onClick={handleLogout} className="w-full flex items-center gap-5 p-4 rounded-2xl text-red-400/50 hover:text-red-400 hover:bg-red-400/5 transition-all">
                <i className="fa-solid fa-house w-6 text-center"></i>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Back to Home</span>
            </button>
        </div>
      </aside>

      {/* --- MASTER VIEWPORT --- */}
      <main className="flex-grow h-screen overflow-y-auto bg-[#F9F9F9] custom-scrollbar pb-32">
        <div className="max-w-7xl mx-auto p-8 md:p-14 space-y-12">
          
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-10 rounded-[3.5rem] border border-black/[0.03] shadow-sm gap-8 relative overflow-hidden">
            <div className="flex items-center gap-8">
               <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-obsidian hover:bg-brand-gold transition-all shadow-inner"><i className={`fa-solid ${isSidebarOpen ? 'fa-align-right' : 'fa-align-left'}`}></i></button>
               <div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold">Secure Master Node</p>
                  </div>
                  <h1 className="text-3xl font-serif font-bold italic text-brand-obsidian mt-1 capitalize">{activeTab} Hub</h1>
               </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
               <button 
                  onClick={publishToLive} 
                  disabled={isProcessing}
                  className={`px-10 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-2xl bg-brand-gold text-brand-obsidian hover:scale-105 active:scale-95`}
               >
                  {isProcessing ? 'Syncing...' : 'Deploy Production'}
               </button>
            </div>
          </header>

          {/* --- TAB: ANALYTICS --- */}
          {activeTab === 'analytics' && (
            <div className="space-y-12 animate-reveal">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white p-8 rounded-[3.5rem] border border-black/5 shadow-sm space-y-6">
                      <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-2xl flex items-center justify-center text-xl shadow-inner"><i className="fa-solid fa-coins"></i></div>
                      <div>
                          <p className="text-[8px] font-black uppercase text-gray-400 mb-1 tracking-widest">Stock Market Value</p>
                          <p className="text-2xl font-serif font-bold text-brand-obsidian">{formatIDR(businessIntelligence.stockMarketValue)}</p>
                          <p className="text-[9px] text-brand-copper font-bold mt-1">Cost Asset: {formatIDR(businessIntelligence.stockAssetCost)}</p>
                      </div>
                  </div>
                  <div className="bg-white p-8 rounded-[3.5rem] border border-black/5 shadow-sm space-y-6">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl shadow-inner"><i className="fa-solid fa-chart-line"></i></div>
                      <div>
                          <p className="text-[8px] font-black uppercase text-gray-400 mb-1 tracking-widest">Total Net Profit</p>
                          <p className="text-2xl font-serif font-bold text-brand-obsidian">{formatIDR(businessIntelligence.netProfit)}</p>
                          <div className={`flex items-center gap-1 mt-1 text-[9px] font-bold ${businessIntelligence.revGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                             <i className={`fa-solid ${businessIntelligence.revGrowth >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                             {Math.abs(businessIntelligence.revGrowth).toFixed(1)}% Growth
                          </div>
                      </div>
                  </div>
                  <div className="bg-white p-8 rounded-[3.5rem] border border-black/5 shadow-sm space-y-6">
                      <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-xl shadow-inner"><i className="fa-solid fa-bolt"></i></div>
                      <div>
                          <p className="text-[8px] font-black uppercase text-gray-400 mb-1 tracking-widest">Profit Margin</p>
                          <p className="text-2xl font-serif font-bold text-brand-obsidian">{businessIntelligence.profitMargin.toFixed(1)}%</p>
                          <p className="text-[9px] text-gray-400 mt-1 uppercase font-black">Institutional Healthy</p>
                      </div>
                  </div>
                  <div className="bg-white p-8 rounded-[3.5rem] border border-black/5 shadow-sm space-y-6">
                      <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-xl shadow-inner"><i className="fa-solid fa-warning"></i></div>
                      <div>
                          <p className="text-[8px] font-black uppercase text-gray-400 mb-1 tracking-widest">Critical Artifacts</p>
                          <p className="text-2xl font-serif font-bold text-brand-obsidian">{businessIntelligence.lowStockItems.length} Low Stock</p>
                          <p className="text-[9px] text-red-400 mt-1 uppercase font-black">Requires Forge Node</p>
                      </div>
                  </div>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 bg-white p-12 rounded-[4.5rem] border border-black/5 shadow-sm space-y-10">
                     <h3 className="text-2xl font-serif font-bold italic">Revenue Velocity Profile</h3>
                     <div className="relative h-64 bg-gray-50 rounded-3xl p-8 border border-black/[0.02] shadow-inner flex items-end justify-between">
                        {businessIntelligence.finances.map((f, i) => {
                          const max = Math.max(...businessIntelligence.finances.map(x => x.revenue));
                          const height = (f.revenue / max) * 100;
                          return (
                            <div key={i} className="flex flex-col items-center gap-4 w-full group">
                               <div className="relative w-8 bg-brand-gold/10 rounded-full flex flex-col justify-end overflow-hidden h-40">
                                  <div className="w-full bg-brand-gold rounded-full transition-all duration-1000 shadow-lg" style={{ height: `${height}%` }}></div>
                               </div>
                               <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest">{f.month.split(' ')[0]}</span>
                            </div>
                          )
                        })}
                     </div>
                  </div>
                  <div className="bg-brand-obsidian p-10 rounded-[4rem] text-brand-gold space-y-10 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl"><i className="fa-solid fa-network-wired"></i></div>
                     <h3 className="text-xl font-serif font-bold italic text-white relative z-10">Social Resonance</h3>
                     <div className="space-y-6 relative z-10">
                        {[
                          { name: 'Instagram', val: draftData.analytics.socialReach.instagram, icon: 'fa-instagram' },
                          { name: 'WhatsApp', val: draftData.analytics.whatsappInquiries, icon: 'fa-whatsapp' },
                          { name: 'AI Concierge', val: draftData.analytics.aiInteractions, icon: 'fa-robot' }
                        ].map(s => (
                           <div key={s.name} className="space-y-2">
                              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                 <span className="text-white/40 flex items-center gap-2"><i className={`fa-solid ${s.icon}`}></i> {s.name}</span>
                                 <span>{s.val.toLocaleString()}</span>
                              </div>
                              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-brand-gold animate-pulse" style={{ width: `${(s.val/10000)*100}%` }}></div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* --- TAB: LEDGER --- */}
          {activeTab === 'finance' && (
            <div className="space-y-10 animate-reveal">
               <div className="bg-white p-12 rounded-[4rem] border border-black/5 shadow-sm">
                  <h3 className="text-2xl font-serif font-bold italic mb-12">New Fiscal Commitment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase text-brand-gold ml-2 tracking-widest">Cycle ID</label>
                        <input id="f_month" placeholder="Dec 2024" className="w-full p-5 bg-gray-50 rounded-2xl text-xs font-bold border-none shadow-inner" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase text-brand-gold ml-2 tracking-widest">Revenue</label>
                        <input id="f_rev" type="number" className="w-full p-5 bg-gray-50 rounded-2xl text-xs font-bold border-none shadow-inner" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase text-brand-gold ml-2 tracking-widest">Expenses</label>
                        <input id="f_exp" type="number" className="w-full p-5 bg-gray-50 rounded-2xl text-xs font-bold border-none shadow-inner" />
                     </div>
                     <button onClick={() => {
                        const m = (document.getElementById('f_month') as HTMLInputElement).value;
                        const r = parseInt((document.getElementById('f_rev') as HTMLInputElement).value) || 0;
                        const e = parseInt((document.getElementById('f_exp') as HTMLInputElement).value) || 0;
                        if(m) {
                           setDraftData({...draftData, finances: [...draftData.finances, {month: m, revenue: r, expenses: e}]});
                           showNotify("Fiscal record committed.");
                        }
                     }} className="mt-7 bg-brand-obsidian text-brand-gold font-black text-[9px] uppercase tracking-widest rounded-2xl hover:bg-brand-gold hover:text-brand-obsidian transition-all">Commit Cycle</button>
                  </div>
               </div>
               <div className="bg-white rounded-[4rem] border border-black/5 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                     <thead className="bg-gray-50 border-b border-black/5">
                        <tr>
                           <th className="p-10 text-[9px] font-black uppercase text-brand-gold tracking-widest">Cycle ID</th>
                           <th className="p-10 text-[9px] font-black uppercase text-brand-gold tracking-widest">Revenue Flow</th>
                           <th className="p-10 text-[9px] font-black uppercase text-brand-gold tracking-widest">Burn Rate</th>
                           <th className="p-10 text-[9px] font-black uppercase text-brand-gold tracking-widest">Net Alpha</th>
                           <th className="p-10"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {draftData.finances.map((f, i) => (
                           <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                              <td className="p-10 text-sm font-bold text-brand-obsidian">{f.month}</td>
                              <td className="p-10 text-sm">{formatIDR(f.revenue)}</td>
                              <td className="p-10 text-sm text-red-500">-{formatIDR(f.expenses)}</td>
                              <td className="p-10 text-sm font-black text-brand-copper">{formatIDR(f.revenue-f.expenses)}</td>
                              <td className="p-10 text-right">
                                 <button onClick={() => setDraftData({...draftData, finances: draftData.finances.filter((_, idx) => idx !== i)})} className="text-gray-200 hover:text-red-500 transition-all"><i className="fa-solid fa-trash-can"></i></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          )}

          {/* --- TAB: INVENTORY --- */}
          {activeTab === 'inventory' && (
            <div className="space-y-12 animate-reveal">
                <header className="flex justify-between items-center px-4">
                    <h2 className="text-3xl font-serif font-bold italic">Artifact Collection</h2>
                    <button onClick={() => setDraftData({...draftData, products: [{id: Date.now().toString(), name: 'New Artifact', description: '', material: 'Copper', price: 'Rp 0', unitCost: 0, stock: 0, minStock: 1, monthlySales: 0, image: ''}, ...draftData.products]})} className="px-10 py-5 bg-brand-gold text-brand-obsidian font-black text-[9px] uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl">+ New Registry</button>
                </header>
                <div className="grid grid-cols-1 gap-10">
                    {draftData.products.map(p => (
                        <div key={p.id} className="bg-white p-12 rounded-[4.5rem] border border-black/5 flex flex-col xl:flex-row gap-16 items-center hover:shadow-2xl transition-all group relative">
                            <div onClick={() => triggerUpload('prod', p.id)} className="w-64 aspect-square bg-gray-50 rounded-[3.5rem] overflow-hidden cursor-pointer relative shrink-0 shadow-inner group-hover:shadow-2xl transition-all border-2 border-transparent group-hover:border-brand-gold/20">
                                {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 italic text-[10px] uppercase font-black"><i className="fa-solid fa-camera text-4xl mb-3"></i> Upload</div>}
                                <div className="absolute inset-0 bg-brand-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-brand-gold text-2xl"><i className="fa-solid fa-pen-nib"></i></div>
                            </div>
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 w-full">
                                <div className="xl:col-span-2 space-y-2">
                                    <label className="text-[9px] font-black uppercase text-brand-gold ml-2 tracking-widest">Nomenclature</label>
                                    <input value={p.name} onChange={e => setDraftData({...draftData, products: draftData.products.map(x => x.id === p.id ? {...x, name: e.target.value} : x)})} className="w-full p-6 bg-gray-50 rounded-2xl text-sm font-bold border-none shadow-inner" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-brand-gold ml-2 tracking-widest">Unit Price</label>
                                    <input value={p.price} onChange={e => setDraftData({...draftData, products: draftData.products.map(x => x.id === p.id ? {...x, price: e.target.value} : x)})} className="w-full p-6 bg-gray-50 rounded-2xl text-sm font-bold border-none shadow-inner text-brand-copper" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-brand-gold ml-2 tracking-widest">Unit Cost</label>
                                    <input type="number" value={p.unitCost} onChange={e => setDraftData({...draftData, products: draftData.products.map(x => x.id === p.id ? {...x, unitCost: parseInt(e.target.value) || 0} : x)})} className="w-full p-6 bg-gray-50 rounded-2xl text-sm font-bold border-none shadow-inner text-red-400" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-brand-gold ml-2 tracking-widest">Inventory</label>
                                    <input type="number" value={p.stock} onChange={e => setDraftData({...draftData, products: draftData.products.map(x => x.id === p.id ? {...x, stock: parseInt(e.target.value) || 0} : x)})} className="w-full p-6 bg-gray-50 rounded-2xl text-sm border-none shadow-inner" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-brand-gold ml-2 tracking-widest">Safety Limit</label>
                                    <input type="number" value={p.minStock} onChange={e => setDraftData({...draftData, products: draftData.products.map(x => x.id === p.id ? {...x, minStock: parseInt(e.target.value) || 1} : x)})} className="w-full p-6 bg-gray-50 rounded-2xl text-sm border-none shadow-inner" />
                                </div>
                                <div className="xl:col-span-2 flex items-end">
                                   <div className="bg-gray-50 p-6 rounded-2xl w-full flex justify-between items-center shadow-inner">
                                      <span className="text-[9px] font-black uppercase tracking-widest text-brand-gold">Asset Value</span>
                                      <span className="text-sm font-black text-brand-obsidian">{formatIDR((p.unitCost || 0) * (p.stock || 0))}</span>
                                   </div>
                                </div>
                            </div>
                            <button onClick={() => setDraftData({...draftData, products: draftData.products.filter(x => x.id !== p.id)})} className="absolute top-10 right-10 text-gray-200 hover:text-red-500 transition-all"><i className="fa-solid fa-circle-xmark text-xl"></i></button>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {/* --- TAB: JOURNAL --- */}
          {activeTab === 'editorial' && (
            <div className="space-y-12 animate-reveal">
                <header className="flex justify-between items-center px-4">
                    <h2 className="text-3xl font-serif font-bold italic text-brand-obsidian">Editorial Journal</h2>
                    <button onClick={() => setDraftData({...draftData, articles: [{id: Date.now().toString(), title: 'Untilted journal', excerpt: '', content: '', date: new Date().toLocaleDateString(), image: ''}, ...draftData.articles]})} className="px-10 py-5 bg-brand-obsidian text-brand-gold font-black text-[9px] uppercase tracking-widest rounded-2xl shadow-xl hover:bg-brand-gold hover:text-brand-obsidian transition-all">+ New Entry</button>
                </header>
                <div className="grid grid-cols-1 gap-12">
                   {draftData.articles.map(a => (
                      <div key={a.id} className="bg-white p-12 rounded-[4rem] border border-black/5 shadow-sm space-y-10 group relative">
                         <div className="flex flex-col xl:flex-row gap-12">
                             <div onClick={() => triggerUpload('art', a.id)} className="w-full xl:w-80 aspect-video bg-gray-50 rounded-[3rem] overflow-hidden cursor-pointer relative shadow-inner shrink-0">
                                {a.image ? <img src={a.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 font-black text-[9px] uppercase italic tracking-widest"><i className="fa-solid fa-newspaper text-4xl mb-3"></i> Upload Image</div>}
                                <div className="absolute inset-0 bg-brand-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-brand-gold text-2xl"><i className="fa-solid fa-camera"></i></div>
                             </div>
                             <div className="flex-grow space-y-6">
                                <input value={a.title} placeholder="Article Title" onChange={e => setDraftData({...draftData, articles: draftData.articles.map(x => x.id === a.id ? {...x, title: e.target.value} : x)})} className="w-full p-6 bg-gray-50 rounded-2xl text-xl font-serif font-bold italic border-none shadow-inner" />
                                <textarea value={a.excerpt} placeholder="Brief summary..." onChange={e => setDraftData({...draftData, articles: draftData.articles.map(x => x.id === a.id ? {...x, excerpt: e.target.value} : x)})} className="w-full p-6 bg-gray-50 rounded-2xl text-xs h-24 border-none resize-none shadow-inner leading-relaxed" />
                                <textarea value={a.content} placeholder="Full monograph content..." onChange={e => setDraftData({...draftData, articles: draftData.articles.map(x => x.id === a.id ? {...x, content: e.target.value} : x)})} className="w-full p-8 bg-gray-50 rounded-[2.5rem] text-sm h-64 border-none resize-none shadow-inner leading-loose" />
                             </div>
                         </div>
                         <button onClick={() => setDraftData({...draftData, articles: draftData.articles.filter(x => x.id !== a.id)})} className="absolute top-10 right-10 text-gray-200 hover:text-red-500 transition-all"><i className="fa-solid fa-trash-can text-lg"></i></button>
                      </div>
                   ))}
                </div>
            </div>
          )}

          {/* --- TAB: ASSETS --- */}
          {activeTab === 'assets' && (
            <div className="space-y-12 animate-reveal">
                <header className="flex justify-between items-center px-4">
                    <h2 className="text-3xl font-serif font-bold italic text-brand-obsidian">Visual Resource Assets</h2>
                    <button onClick={() => setDraftData({...draftData, gallery: [{id: Date.now().toString(), type: 'image', url: '', title: 'New Resource'}, ...draftData.gallery]})} className="px-10 py-5 bg-brand-gold text-brand-obsidian font-black text-[9px] uppercase tracking-widest rounded-2xl shadow-xl hover:bg-brand-obsidian hover:text-brand-gold transition-all">+ Add Asset</button>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {draftData.gallery.map(g => (
                        <div key={g.id} className="bg-white p-6 rounded-[3.5rem] border border-black/5 shadow-sm space-y-4 group relative">
                            <div onClick={() => triggerUpload('gal', g.id)} className="aspect-square bg-gray-50 rounded-[2.5rem] overflow-hidden cursor-pointer relative shadow-inner">
                                {g.url ? <img src={g.url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 font-black text-[8px] uppercase italic"><i className="fa-solid fa-image text-3xl mb-3"></i> Upload</div>}
                                <div className="absolute inset-0 bg-brand-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-brand-gold text-lg"><i className="fa-solid fa-up-from-bracket"></i></div>
                            </div>
                            <input value={g.title} onChange={e => setDraftData({...draftData, gallery: draftData.gallery.map(x => x.id === g.id ? {...x, title: e.target.value} : x)})} className="w-full p-4 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest border-none shadow-inner" />
                            <button onClick={() => setDraftData({...draftData, gallery: draftData.gallery.filter(x => x.id !== g.id)})} className="absolute top-4 right-4 text-gray-200 hover:text-red-500 transition-all"><i className="fa-solid fa-circle-xmark"></i></button>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {/* --- TAB: EXHIBITION --- */}
          {activeTab === 'showcase' && (
            <div className="space-y-12 animate-reveal">
                <header className="flex justify-between items-center px-4">
                    <h2 className="text-3xl font-serif font-bold italic text-brand-obsidian">Exhibition Slideshow</h2>
                    <button onClick={() => setDraftData({...draftData, carousel: ['', ...draftData.carousel]})} className="px-10 py-5 bg-brand-obsidian text-brand-gold font-black text-[9px] uppercase tracking-widest rounded-2xl shadow-xl hover:bg-brand-gold hover:text-brand-obsidian transition-all">+ Append Frame</button>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   {draftData.carousel.map((img, idx) => (
                      <div key={idx} className="bg-white p-10 rounded-[4rem] border border-black/5 shadow-sm space-y-6 group relative">
                         <div className="flex justify-between items-center px-2">
                            <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.6em]">Slide Frame 0{idx+1}</span>
                            <button onClick={() => setDraftData({...draftData, carousel: draftData.carousel.filter((_, i) => i !== idx)})} className="text-gray-300 hover:text-red-500 transition-colors"><i className="fa-solid fa-trash-can"></i></button>
                         </div>
                         <div onClick={() => triggerUpload('hero', idx)} className="aspect-[21/9] bg-gray-50 rounded-[2.5rem] overflow-hidden cursor-pointer relative shadow-inner border-2 border-transparent group-hover:border-brand-gold/30 transition-all">
                            {img ? <img src={img} className="w-full h-full object-cover" /> : <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 font-black text-[9px] uppercase italic tracking-widest"><i className="fa-solid fa-panorama text-4xl mb-3"></i> Set Visual</div>}
                            <div className="absolute inset-0 bg-brand-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-brand-gold text-2xl"><i className="fa-solid fa-cloud-arrow-up"></i></div>
                         </div>
                      </div>
                   ))}
                </div>
            </div>
          )}

          {/* --- TAB: IDENTITY & LEGALITIES --- */}
          {activeTab === 'identity' && (
            <div className="space-y-12 animate-reveal">
              <div className="bg-white p-16 md:p-24 rounded-[4.5rem] border border-black/5 shadow-sm space-y-20 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 text-[25rem] font-serif font-black italic opacity-[0.015] pointer-events-none select-none">IDENTITY</div>
                  <header className="relative z-10">
                      <h2 className="text-5xl font-serif font-bold italic text-brand-obsidian leading-none tracking-tight">Institutional <br/>Credentials</h2>
                      <div className="h-px w-24 bg-brand-gold mt-10"></div>
                  </header>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                      <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase text-brand-gold tracking-[0.6em] ml-6">Corporate Name</label>
                          <input value={draftData.companyName} onChange={e => setDraftData({...draftData, companyName: e.target.value})} className="w-full p-8 bg-gray-50 rounded-[2.5rem] text-lg font-serif font-bold italic border-none shadow-inner" />
                      </div>
                      <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase text-brand-gold tracking-[0.6em] ml-6">Registry Email</label>
                          <input value={draftData.contact.email} onChange={e => setDraftData({...draftData, contact: {...draftData.contact, email: e.target.value}})} className="w-full p-8 bg-gray-50 rounded-[2.5rem] text-sm border-none shadow-inner" />
                      </div>
                      <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase text-brand-gold tracking-[0.6em] ml-6">Concierge WhatsApp</label>
                          <input value={draftData.contact.whatsapp} onChange={e => setDraftData({...draftData, contact: {...draftData.contact, whatsapp: e.target.value}})} className="w-full p-8 bg-gray-50 rounded-[2.5rem] text-sm font-bold border-none shadow-inner" />
                      </div>
                      <div className="md:col-span-2 space-y-4">
                          <label className="text-[10px] font-black uppercase text-brand-gold tracking-[0.6em] ml-6">Global Headquarters</label>
                          <input value={draftData.contact.address} onChange={e => setDraftData({...draftData, contact: {...draftData.contact, address: e.target.value}})} className="w-full p-8 bg-gray-50 rounded-[2.5rem] text-sm border-none shadow-inner" />
                      </div>
                  </div>
              </div>

              {/* LEGAL DOCS MANAGEMENT */}
              <div className="bg-white p-16 md:p-24 rounded-[4.5rem] border border-black/5 shadow-sm space-y-12">
                  <div className="flex justify-between items-center">
                      <h3 className="text-3xl font-serif font-bold italic">Legal Document Vault</h3>
                      <button onClick={() => setDraftData({...draftData, legalities: [{id: `leg-${Date.now()}`, name: 'New Doc', image: ''}, ...draftData.legalities]})} className="px-8 py-4 bg-brand-obsidian text-brand-gold font-black text-[9px] uppercase tracking-widest rounded-2xl hover:bg-brand-gold hover:text-brand-obsidian transition-all">+ Register Document</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      {draftData.legalities.map(leg => (
                          <div key={leg.id} className="bg-gray-50 p-8 rounded-[3rem] border border-black/5 space-y-6 group relative">
                              <div onClick={() => triggerUpload('leg', leg.id)} className="aspect-[3/4] bg-white rounded-2xl overflow-hidden cursor-pointer relative shadow-inner border border-brand-gold/10">
                                  {leg.image ? <img src={leg.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 italic text-[8px] uppercase font-black"><i className="fa-solid fa-file-shield text-4xl mb-3"></i> Upload Doc</div>}
                                  <div className="absolute inset-0 bg-brand-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-brand-gold text-xl"><i className="fa-solid fa-cloud-arrow-up"></i></div>
                              </div>
                              <div className="space-y-2">
                                  <label className="text-[8px] font-black uppercase text-brand-gold tracking-widest ml-2">Document Name</label>
                                  <input value={leg.name} onChange={e => setDraftData({...draftData, legalities: draftData.legalities.map(x => x.id === leg.id ? {...x, name: e.target.value} : x)})} className="w-full p-4 bg-white rounded-xl text-xs font-bold border-none shadow-sm" />
                              </div>
                              <button onClick={() => setDraftData({...draftData, legalities: draftData.legalities.filter(x => x.id !== leg.id)})} className="absolute top-4 right-4 text-gray-200 hover:text-red-500 transition-all"><i className="fa-solid fa-circle-xmark"></i></button>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
