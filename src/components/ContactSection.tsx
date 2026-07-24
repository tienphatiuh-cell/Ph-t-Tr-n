import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, Calendar, CheckCircle2, MapPin, Sparkles, Clock, Globe } from 'lucide-react';
import { ContactFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'commercial',
    budgetRange: '50M - 150M VND',
    timeline: 'Trong tháng này',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const budgetOptions = [
    '20M - 50M VND',
    '50M - 150M VND',
    '150M - 300M VND',
    'Trên 300M VND (Standard Cinema)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase font-mono text-[#d4af37] tracking-[0.3em]">
          <MessageSquare className="w-4 h-4" />
          <span>START A PROJECT</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-stone-100 uppercase">
          Liên Hệ <span className="gold-gradient-text">Hợp Tác Sản Xuất</span>
        </h2>
        <p className="text-stone-400 text-sm font-light">
          Gửi thông tin ý tưởng hoặc yêu cầu báo giá dự án phim của bạn. Ekip AURA NOIR sẽ phản hồi trong vòng 24 giờ làm việc.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Quick Contact Info */}
        <div className="lg:col-span-5 space-y-8 glass-gold-card p-8 rounded-3xl">
          <div className="space-y-2">
            <h3 className="font-cinzel text-xl font-bold text-white uppercase tracking-wider">
              AURA NOIR FILM STUDIOS
            </h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Văn phòng đại diện & Studio sản xuất hình ảnh cao cấp tại Sài Gòn và Hà Nội.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-3.5 text-xs text-stone-300">
              <div className="p-2.5 rounded-xl bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-[#d4af37] text-[11px] uppercase">Địa Chỉ Studio</div>
                <div className="text-stone-200 mt-0.5">District 1, TP. Hồ Chí Minh & Cầu Giấy, Hà Nội</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-xs text-stone-300">
              <div className="p-2.5 rounded-xl bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-[#d4af37] text-[11px] uppercase">Email Báo Giá</div>
                <a href="mailto:booking@auranoir.film" className="text-stone-200 hover:text-[#d4af37] transition-colors mt-0.5 block font-mono">
                  booking@auranoir.film
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-xs text-stone-300">
              <div className="p-2.5 rounded-xl bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-[#d4af37] text-[11px] uppercase">Hotline / Zalo Booking</div>
                <a href="tel:+84908123456" className="text-stone-200 hover:text-[#d4af37] transition-colors mt-0.5 block font-mono">
                  +84 (0) 908 123 456
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-xs text-stone-300">
              <div className="p-2.5 rounded-xl bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-[#d4af37] text-[11px] uppercase">Thời Gian Phục Vụ</div>
                <div className="text-stone-200 mt-0.5">Thứ 2 - Thứ 7 (08:30 - 20:00)</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-800 space-y-3">
            <div className="text-xs font-mono uppercase text-stone-400">Kết nối Mạng Xã Hội</div>
            <div className="flex items-center gap-3">
              {['Vimeo', 'YouTube', 'Instagram', 'Behance'].map((net) => (
                <a
                  key={net}
                  href={`#${net.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-full bg-black/60 border border-stone-800 text-[11px] font-mono text-stone-400 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors"
                >
                  {net}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Project Inquiry Form */}
        <div className="lg:col-span-7 glass-gold-card p-8 rounded-3xl">
          {submitted ? (
            <div className="py-16 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white">
                Gửi Yêu Cầu Thành Công!
              </h3>
              <p className="text-stone-300 text-xs font-light max-w-md mx-auto leading-relaxed">
                Cảm ơn bạn <span className="text-[#d4af37] font-semibold">{formData.fullName}</span>. Producer của AURA NOIR đã nhận được thông tin dự án và sẽ chủ động gọi điện tư vấn trực tiếp trong thời gian sớm nhất.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full border border-[#d4af37]/40 text-[#d4af37] text-xs font-mono uppercase tracking-widest hover:bg-[#d4af37] hover:text-black cursor-pointer"
              >
                Gửi Yêu Cầu Khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-[#d4af37]">Họ & Tên Của Bạn *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 rounded-xl bg-[#121118] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-[#d4af37]">Số Điện Thoại / Zalo *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0908 123 456"
                    className="w-full px-4 py-3 rounded-xl bg-[#121118] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-[#d4af37]">Email Liên Hệ</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#121118] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-[#d4af37]">Thể Loại Dự Án</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'commercial', label: 'Quảng Cáo TVC' },
                    { id: 'short_film', label: 'Phim Ngắn' },
                    { id: 'music_video', label: 'Music Video' },
                    { id: 'fashion', label: 'Thời Trang' },
                    { id: 'documentary', label: 'Tài Liệu' },
                    { id: 'event', label: 'Sự Kiện Cinema' },
                  ].map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setFormData({ ...formData, projectType: type.id })}
                      className={`p-2.5 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                        formData.projectType === type.id
                          ? 'bg-[#d4af37] text-black font-semibold border-[#d4af37]'
                          : 'bg-[#121118] border-stone-800 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-[#d4af37]">Ngân Sách Dự Kiến</label>
                <div className="grid grid-cols-2 gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budgetRange: b })}
                      className={`p-2.5 rounded-xl text-xs font-mono text-center border transition-all cursor-pointer ${
                        formData.budgetRange === b
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-amber-200 font-semibold'
                          : 'bg-[#121118] border-stone-800 text-stone-400 hover:border-stone-600'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-[#d4af37]">Chi Tiết Ý Tưởng & Lời Nhắn</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Hãy chia sẻ ngắn gọn về thông điệp, địa điểm quay mong muốn hoặc deadline phát hành..."
                  className="w-full px-4 py-3 rounded-xl bg-[#121118] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#996515] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all hover:brightness-110 shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Yêu Cầu Tư Vấn Ngay</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
