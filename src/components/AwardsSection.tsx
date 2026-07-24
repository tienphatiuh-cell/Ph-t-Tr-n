import React from 'react';
import { Award, Trophy, Star, Sparkles } from 'lucide-react';
import { AWARDS_LIST } from '../data/initialVideos';

export const AwardsSection: React.FC = () => {
  return (
    <section id="awards" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 bg-film-grain">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase font-mono text-[#d4af37] tracking-[0.3em]">
          <Trophy className="w-4 h-4" />
          <span>ACCOLADES & RECOGNITION</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-stone-100 uppercase">
          Giải Thưởng & <span className="gold-gradient-text">Đề Danh Điện Ảnh</span>
        </h2>
        <p className="text-stone-400 text-sm font-light">
          Sự ghi nhận từ các Liên hoan phim quốc tế và hội đồng giám khảo chuyên môn.
        </p>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {AWARDS_LIST.map((item, idx) => (
          <div
            key={idx}
            className="glass-gold-card p-6 rounded-2xl space-y-4 text-center hover:border-[#d4af37] transition-all duration-300 group hover:-translate-y-1.5"
          >
            {/* Laurel Wreath Icon */}
            <div className="w-12 h-12 mx-auto rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#d4af37] uppercase tracking-widest">{item.year}</span>
              <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                {item.festival}
              </h3>
            </div>

            <div className="border-t border-stone-800 pt-3 space-y-1">
              <div className="text-xs font-semibold text-stone-200">{item.projectTitle}</div>
              <div className="text-[11px] font-mono text-stone-400">{item.category}</div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
