import React from 'react';
import { Play, Award, Film, Sparkles, ChevronDown } from 'lucide-react';
import { VideoItem } from '../types';

interface HeroShowreelProps {
  featuredVideo?: VideoItem;
  onPlayVideo: (video: VideoItem) => void;
  onExploreClick: () => void;
}

export const HeroShowreel: React.FC<HeroShowreelProps> = ({
  featuredVideo,
  onPlayVideo,
  onExploreClick,
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-[#08080a] bg-film-grain">
      {/* Background Decorative Gold Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#d4af37]/15 via-[#b8860b]/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#d4af37]/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Main Content Box */}
      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
        
        {/* Award Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16151c]/90 border border-[#d4af37]/30 text-amber-200/90 text-xs font-mono tracking-[0.25em] uppercase gold-border-glow shadow-xl">
          <Award className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>CINEMATIC DIRECTING & VISUAL PRODUCTION</span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>

        {/* Main Title Heading */}
        <div className="space-y-4">
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.12em] text-stone-100 uppercase leading-[1.15]">
            Nghệ Thuật <br className="hidden sm:inline" />
            <span className="gold-gradient-text drop-shadow-md">Điện Ảnh & Ánh Sáng</span>
          </h1>
          <p className="max-w-2xl mx-auto text-stone-400 text-sm sm:text-base font-light tracking-wide leading-relaxed">
            Tuyển tập các tác phẩm Phim ngắn, TVC Quảng Cáo, Music Video và Phim tài liệu chất lượng 4K/8K được thực hiện bằng góc quay chuẩn Cinema và quy trình màu sắc chuyên nghiệp.
          </p>
        </div>

        {/* Featured Video Card / Play Showreel Trigger */}
        {featuredVideo && (
          <div className="relative max-w-4xl mx-auto mt-8 group cursor-pointer" onClick={() => onPlayVideo(featuredVideo)}>
            {/* Outer Gold Frame */}
            <div className="relative aspect-[21/9] sm:aspect-[2.39/1] rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-black/80 gold-border-glow transition-all duration-500 group-hover:border-[#d4af37] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.3)]">
              {/* Thumbnail Image */}
              <img
                src={featuredVideo.thumbnailUrl}
                alt={featuredVideo.title}
                className="w-full h-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-95"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Center Play Icon Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 border border-[#d4af37] flex items-center justify-center text-[#d4af37] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-black group-hover:shadow-[0_0_30px_#d4af37]">
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1 fill-current" />
                </div>
              </div>

              {/* Bottom Video Badge Info */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 text-left">
                <div>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase font-mono text-[#d4af37] tracking-widest mb-1">
                    <Film className="w-3.5 h-3.5" />
                    <span>SHOWREEL NỔI BẬT • {featuredVideo.year}</span>
                  </div>
                  <h3 className="font-cinzel text-base sm:text-xl font-bold text-white tracking-wider line-clamp-1">
                    {featuredVideo.title}
                  </h3>
                </div>
                <div className="text-[11px] font-mono text-stone-300 bg-black/70 px-3 py-1 rounded-full border border-stone-800">
                  {featuredVideo.duration} • {featuredVideo.cameraGear?.split('+')[0] || 'ARRI Alexa 4K'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons & Scroll Indicator */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {featuredVideo && (
            <button
              onClick={() => onPlayVideo(featuredVideo)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#996515] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Xem Showreel Tác Phẩm</span>
            </button>
          )}

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#d4af37]/30 bg-[#121118]/80 text-stone-200 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Khám Phá Tất Cả Video</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Key Metrics / Highlights Grid */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-gold-card p-4 rounded-xl text-center space-y-1">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold gold-gradient-text">120+</div>
            <div className="text-[11px] uppercase tracking-wider text-stone-400 font-mono">Dự án Sản xuất</div>
          </div>
          <div className="glass-gold-card p-4 rounded-xl text-center space-y-1">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold gold-gradient-text">8+ Năm</div>
            <div className="text-[11px] uppercase tracking-wider text-stone-400 font-mono">Kinh nghiệm Directing</div>
          </div>
          <div className="glass-gold-card p-4 rounded-xl text-center space-y-1">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold gold-gradient-text">14 Giải</div>
            <div className="text-[11px] uppercase tracking-wider text-stone-400 font-mono">Giải Thưởng Điện Ảnh</div>
          </div>
          <div className="glass-gold-card p-4 rounded-xl text-center space-y-1">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold gold-gradient-text">4K / 8K</div>
            <div className="text-[11px] uppercase tracking-wider text-stone-400 font-mono">ARRI & RED Quality</div>
          </div>
        </div>

      </div>
    </section>
  );
};
