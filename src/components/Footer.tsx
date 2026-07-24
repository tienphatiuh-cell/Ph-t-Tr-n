import React from 'react';
import { Clapperboard, ArrowUp, Heart, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#d4af37]/20 bg-[#060608] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
            <Clapperboard className="w-4 h-4" />
          </div>
          <div>
            <span className="font-cinzel text-base font-bold gold-gradient-text tracking-widest uppercase">
              PHÁT TRẦN
            </span>
            <div className="text-[10px] text-stone-500 font-mono">
              © {new Date().getFullYear()} Cinematic Video Portfolio. All rights reserved.
            </div>
          </div>
        </div>

        {/* Speed & Optimization Specs */}
        <div className="text-xs font-mono text-stone-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Tốc độ tải trang 60fps • Tối ưu di động & Ultra HD 4K Embeds</span>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#121118] border border-stone-800 text-stone-300 hover:text-[#d4af37] hover:border-[#d4af37]/40 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
        >
          <span>Đầu trang</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
};
