
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError('');

    // Artificial delay for "Security Handshake" feel
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (password === 'min333') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('AUTHORIZATION DENIED: Protocol Mismatch.');
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bone flex items-center justify-center p-6">
      <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl max-w-lg w-full border border-brand-obsidian/5 relative overflow-hidden animate-reveal">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-obsidian via-brand-gold to-brand-obsidian shadow-[0_0_15px_rgba(197,160,89,0.3)]"></div>
        
        <div className="text-center mb-16 space-y-4">
          <div className="w-24 h-24 bg-brand-obsidian text-brand-gold rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto mb-10 shadow-2xl transition-transform duration-700 hover:rotate-[360deg] border border-brand-gold/20">
            <i className="fa-solid fa-key"></i>
          </div>
          <h1 className="text-4xl font-serif font-bold text-brand-obsidian tracking-tighter italic">Executive Access</h1>
          <p className="text-brand-slate uppercase text-[9px] font-black tracking-[0.5em] opacity-60">Secure Institutional Node</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-10">
          <div className="space-y-4">
            <label className="block text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] ml-2">Access Credential</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-6 bg-brand-bone border border-brand-obsidian/5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all text-center tracking-[0.6em] font-bold text-xl"
              placeholder="••••••••"
              disabled={isAuthenticating}
            />
          </div>
          
          {error && (
            <div className="flex items-center justify-center gap-3 text-red-500 bg-red-50 p-4 rounded-xl border border-red-100 animate-pulse">
              <i className="fa-solid fa-triangle-exclamation text-xs"></i>
              <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={isAuthenticating}
            className={`w-full py-6 bg-brand-obsidian text-brand-gold font-black text-[11px] uppercase tracking-[0.5em] rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-4 ${
              isAuthenticating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-gold hover:text-brand-obsidian active:scale-95'
            }`}
          >
            {isAuthenticating ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                Authenticating...
              </>
            ) : (
              <>
                Initiate Session <i className="fa-solid fa-arrow-right-long"></i>
              </>
            )}
          </button>
        </form>
        
        <div className="mt-16 pt-8 border-t border-brand-bone text-center">
            <p className="text-[8px] text-brand-slate/40 uppercase tracking-[0.4em]">Node ID: {Math.random().toString(16).substring(2, 12).toUpperCase()} &bull; Logam OS v3.1</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
