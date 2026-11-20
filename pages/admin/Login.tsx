
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(r => setTimeout(r, 1000));

    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Access Denied: Invalid Credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-obsidian flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-12 reveal-content">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-brand-copper rounded-3xl flex items-center justify-center text-white text-3xl mx-auto shadow-2xl">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-widest uppercase italic">Admin Gateway</h1>
        </div>

        <form onSubmit={handleLogin} className="glass-dark p-10 rounded-[2.5rem] space-y-8 border-white/5">
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase text-brand-gold tracking-widest ml-4">Access Key</label>
             <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white text-center tracking-[0.8em] focus:outline-none focus:border-brand-copper transition-all"
              placeholder="••••••••"
             />
          </div>
          
          {error && <p className="text-red-400 text-[10px] text-center uppercase font-black tracking-widest animate-pulse">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-brand-copper text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-brand-gold transition-all shadow-xl"
          >
            {loading ? 'Authenticating...' : 'Authorize Access'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
