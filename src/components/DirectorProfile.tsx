import React from 'react';
import { Camera, Film, Wrench, Sparkles, MapPin, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { DIRECTOR_BIO, EQUIPMENT_LIST } from '../data/initialVideos';

export const DirectorProfile: React.FC = () => {
  const clients = [
    'VINFAST', 'BMW GROUP', 'NIKE', 'SAMSUNG', 'SONY MUSIC', 'HARPER\'S BAZAAR', 'MERCEDES-BENZ', 'PORSCHE'
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* Top Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase font-mono text-[#d4af37] tracking-[0.3em]">
          <Camera className="w-4 h-4" />
          <span>DIRECTOR & CINEMATOGRAPHER</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-stone-100 uppercase">
          Về Đạo Diễn & <span className="gold-gradient-text">Triết Lý Hình Ảnh</span>
        </h2>
        <p className="text-stone-400 text-sm font-light leading-relaxed">
          Đồng hành cùng các thương hiệu toàn cầu và dự án điện ảnh độc lập nhằm tạo nên những tác phẩm ghi dấu ấn thị giác trường tồn.
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Avatar Portrait Card */}
        <div className="lg:col-span-5 relative group">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-black gold-border-glow">
            <img
              src={DIRECTOR_BIO.avatarUrl}
              alt={DIRECTOR_BIO.name}
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Bottom Card Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-black/80 backdrop-blur-md border border-[#d4af37]/30 space-y-2">
              <h3 className="font-cinzel text-xl font-bold gold-gradient-text">
                {DIRECTOR_BIO.name}
              </h3>
              <p className="text-xs text-stone-300 font-mono tracking-wider">
                {DIRECTOR_BIO.title}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-mono pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{DIRECTOR_BIO.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Bio & Stats */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-4">
            <h3 className="font-cinzel text-2xl font-bold text-white uppercase tracking-wide">
              Bóng Tối, Ánh Sáng Vàng & <br />
              <span className="text-[#d4af37]">Chiều Sâu Cảm Xúc</span>
            </h3>
            <p className="text-stone-300 text-sm font-light leading-relaxed">
              {DIRECTOR_BIO.bio}
            </p>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Mỗi khuôn hình không chỉ đơn thuần là việc thu nhận ánh sáng, mà là quá trình chạm khắc nên không gian cảm xúc, định hình phong cách cho thương hiệu và truyền tải trọn vẹn câu chuyện qua từng nhịp cắt dựng.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#121118] border border-[#d4af37]/20 space-y-1">
              <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#d4af37]">{DIRECTOR_BIO.yearsExperience}+</div>
              <div className="text-[10px] uppercase font-mono text-stone-400">Năm Sáng Tạo</div>
            </div>
            <div className="p-4 rounded-xl bg-[#121118] border border-[#d4af37]/20 space-y-1">
              <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#d4af37]">{DIRECTOR_BIO.completedProjects}+</div>
              <div className="text-[10px] uppercase font-mono text-stone-400">Tác Phẩm Hoàn Thành</div>
            </div>
            <div className="p-4 rounded-xl bg-[#121118] border border-[#d4af37]/20 space-y-1">
              <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#d4af37]">{DIRECTOR_BIO.awardsCount}</div>
              <div className="text-[10px] uppercase font-mono text-stone-400">Giải Thưởng & Đề Danh</div>
            </div>
          </div>

          {/* Client Logos Row */}
          <div className="space-y-3 pt-4 border-t border-stone-800">
            <div className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
              Đối Tác & Thương Hiệu Đã Hợp Tác
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {clients.map((client, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-[#121118] border border-stone-800 text-[11px] font-mono tracking-widest text-stone-400 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors cursor-default"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Equipment & Gear Section */}
      <div id="gear" className="pt-16 space-y-8 border-t border-stone-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-2xl font-bold text-white uppercase tracking-wide">
              Hệ Thống Thiết Bị Điện Ảnh Chuyên Nghiệp
            </h3>
            <p className="text-xs text-stone-400 font-mono">
              Đáp ứng chuẩn mực hình ảnh xuất bản rạp chiếu phim và truyền hình quốc tế
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EQUIPMENT_LIST.map((eqGroup, idx) => (
            <div
              key={idx}
              className="glass-gold-card p-6 rounded-2xl space-y-4 hover:-translate-y-1 transition-transform"
            >
              <h4 className="font-cinzel text-base font-bold gold-gradient-text uppercase border-b border-stone-800 pb-2">
                {eqGroup.category}
              </h4>
              <ul className="space-y-2.5">
                {eqGroup.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-stone-300 font-light">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
