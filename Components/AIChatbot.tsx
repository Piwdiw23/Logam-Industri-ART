
import React, { useState, useRef, useEffect } from 'react';
import { SiteData } from '../types';
import { getGeminiResponse } from '../services/geminiService';

/**
 * AIChatbot component provides a luxury concierge interface powered by Gemini.
 * Includes tracking support for user interactions.
 */
interface AIChatbotProps {
  siteData: SiteData;
  onTrack?: () => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ siteData, onTrack }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Greetings. I am your Aurum Concierge. How may I assist you with our artisan copper collection today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  interface Message {
    text: string;
    isBot: boolean;
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setIsLoading(true);
    
    // Trigger AI interaction tracking
    onTrack?.();

    const botMsg = await getGeminiResponse(userMsg, siteData);
    setMessages(prev => [...prev, { text: botMsg, isBot: true }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
      {isOpen ? (
        <div className="w-[320px] md:w-[380px] glass-obsidian rounded-[2rem] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-500 border border-brand-gold/20">
          
          {/* Refined Header */}
          <div className="p-5 bg-brand-obsidian/40 border-b border-brand-gold/10 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-obsidian text-sm font-serif font-black shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                A
              </div>
              <div>
                <span className="text-white font-serif font-bold block text-base leading-none italic">Concierge</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[8px] text-brand-gold/60 uppercase tracking-[0.3em] font-black">AI Intelligence</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-brand-gold hover:bg-white/5 rounded-full transition-all"
            >
              <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>
          </div>
          
          {/* Slim Chat Body */}
          <div ref={scrollRef} className="h-[400px] overflow-y-auto p-5 space-y-4 bg-transparent scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed tracking-wide ${
                  m.isBot 
                    ? 'bg-white/5 text-white/80 rounded-tl-none border border-white/5 font-light' 
                    : 'bg-brand-gold text-brand-obsidian rounded-tr-none font-bold shadow-lg'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-gold/40 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-brand-gold/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-brand-gold/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Compact Input Area */}
          <div className="p-4 bg-brand-obsidian/60 border-t border-brand-gold/10 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your inquiry..."
              className="flex-grow py-3 px-5 text-[11px] bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold/50 transition-all tracking-wider placeholder:text-white/20"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-brand-obsidian transition-all ${
                isLoading ? 'bg-white/10 opacity-30 cursor-not-allowed' : 'bg-brand-gold hover:scale-105 active:scale-95 shadow-lg shadow-brand-gold/10'
              }`}
            >
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-brand-obsidian rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] flex items-center justify-center text-brand-gold text-2xl hover:scale-110 active:scale-90 transition-all border border-brand-gold/30 group relative overflow-hidden"
        >
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          <i className="fa-solid fa-crown group-hover:rotate-12 transition-transform text-xl"></i>
          
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-brand-copper border-2 border-brand-obsidian rounded-full translate-x-1 -translate-y-1"></span>
        </button>
      )}
    </div>
  );
};

export default AIChatbot;
