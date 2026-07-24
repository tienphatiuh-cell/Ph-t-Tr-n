import React, { useState } from 'react';
import { X, Plus, Link, Check, AlertCircle, Youtube, Video, Sparkles } from 'lucide-react';
import { VideoItem, Category } from '../types';
import { parseVideoUrl } from '../utils/videoUtils';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (newVideo: VideoItem) => void;
}

export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  isOpen,
  onClose,
  onAddVideo,
}) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('short_film');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [duration, setDuration] = useState('03:30');
  const [client, setClient] = useState('');
  const [director, setDirector] = useState('AURA NOIR Director');
  const [cameraGear, setCameraGear] = useState('ARRI Alexa Mini LF + Cinema Prime');
  const [description, setDescription] = useState('');
  const [award, setAward] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Auto detect YouTube or Vimeo info
  const parsed = parseVideoUrl(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setErrorMsg('Vui lòng nhập đường dẫn link YouTube hoặc Vimeo.');
      return;
    }

    if (!parsed) {
      setErrorMsg('Đường dẫn không hợp lệ! Hãy dán link YouTube (youtube.com/watch?v=...) hoặc Vimeo (vimeo.com/...).');
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập tiêu đề cho tác phẩm.');
      return;
    }

    const categoryLabels: Record<Category, string> = {
      all: 'Tác Phẩm',
      short_film: 'Phim Ngắn Nghệ Thuật',
      commercial: 'TVC Quảng Cáo',
      music_video: 'Music Video Âm Nhạc',
      documentary: 'Phim Tài Liệu',
      fashion: 'Thời Trang & Visual',
    };

    const newVideo: VideoItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      originalUrl: url.trim(),
      platform: parsed.platform,
      embedId: parsed.embedId,
      thumbnailUrl: parsed.thumbnailUrl,
      category,
      categoryLabel: categoryLabels[category],
      year: year.trim() || '2025',
      duration: duration.trim() || '03:00',
      client: client.trim() || undefined,
      director: director.trim() || 'AURA NOIR',
      cameraGear: cameraGear.trim() || undefined,
      description: description.trim() || 'Tác phẩm video điện ảnh độc đáo được sản xuất với tiêu chuẩn cao.',
      award: award.trim() || undefined,
      tags: [parsed.platform, category, '4K Cinema'],
    };

    onAddVideo(newVideo);
    // Reset state & close
    setUrl('');
    setTitle('');
    setDescription('');
    setAward('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Background click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-[#0e0d12] border border-[#d4af37]/40 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#131218]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <h3 className="font-cinzel text-lg font-bold text-white uppercase tracking-wider">
              Thêm Video Tác Phẩm Mới
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Video Link Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-[#d4af37] tracking-wider">
              1. Đường dẫn YouTube hoặc Vimeo (URL) *
            </label>
            <div className="relative">
              <Link className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Ví dụ: https://www.youtube.com/watch?v=LXb3EKWsInQ hoặc https://vimeo.com/76979871"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#181720] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37] transition-colors"
                required
              />
            </div>

            {/* Parsed Preview Badge */}
            {parsed && (
              <div className="mt-2 p-3 rounded-lg bg-[#14131a] border border-[#d4af37]/30 flex items-center gap-3">
                <img
                  src={parsed.thumbnailUrl}
                  alt="Thumbnail Preview"
                  className="w-20 aspect-video object-cover rounded border border-stone-800"
                />
                <div className="text-xs space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#d4af37] uppercase">
                    {parsed.platform === 'youtube' ? (
                      <>
                        <Youtube className="w-3.5 h-3.5 text-red-500" />
                        <span>Đã phát hiện YouTube ID: {parsed.embedId}</span>
                      </>
                    ) : (
                      <>
                        <Video className="w-3.5 h-3.5 text-sky-400" />
                        <span>Đã phát hiện Vimeo ID: {parsed.embedId}</span>
                      </>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-400">Xem trước Thumbnail sẵn sàng nhúng vào portfolio</div>
                </div>
              </div>
            )}
          </div>

          {/* Video Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-[#d4af37] tracking-wider">
              2. Tiêu đề Phim / Tác Phẩm *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: THE ETERNAL SILENCE — Short Film 4K"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181720] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37] transition-colors"
              required
            />
          </div>

          {/* Category & Year Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-mono uppercase text-[#d4af37] tracking-wider">
                Thể Loại
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#181720] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                <option value="short_film">Phim Ngắn Nghệ Thuật (Short Film)</option>
                <option value="commercial">Quảng Cáo TVC (Commercial)</option>
                <option value="music_video">Music Video (MV Âm Nhạc)</option>
                <option value="documentary">Phim Tài Liệu (Documentary)</option>
                <option value="fashion">Thời Trang & Visual Art (Fashion)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-[#d4af37] tracking-wider">
                Năm & Thời lượng
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2025"
                  className="w-1/2 px-2 py-2.5 rounded-lg bg-[#181720] border border-stone-800 text-xs text-stone-200 text-center"
                />
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="03:45"
                  className="w-1/2 px-2 py-2.5 rounded-lg bg-[#181720] border border-stone-800 text-xs text-stone-200 text-center"
                />
              </div>
            </div>
          </div>

          {/* Client & Camera Gear */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-[#d4af37] tracking-wider">
                Khách Hàng / Thương Hiệu
              </label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Ví dụ: Nike / VinFast / Universal Music"
                className="w-full px-3 py-2.5 rounded-lg bg-[#181720] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-[#d4af37] tracking-wider">
                Thiết Bị Camera & Lens
              </label>
              <input
                type="text"
                value={cameraGear}
                onChange={(e) => setCameraGear(e.target.value)}
                placeholder="ARRI Alexa Mini LF + Cooke Anamorphic"
                className="w-full px-3 py-2.5 rounded-lg bg-[#181720] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-[#d4af37] tracking-wider">
              Mô Tả Nội Dung Phim
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Giới thiệu ý tưởng hình ảnh, thông điệp tác phẩm..."
              className="w-full px-3 py-2.5 rounded-lg bg-[#181720] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37] resize-none"
            />
          </div>

          {/* Award Badge */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-[#d4af37] tracking-wider">
              Giải Thưởng (Nêu Có)
            </label>
            <input
              type="text"
              value={award}
              onChange={(e) => setAward(e.target.value)}
              placeholder="Ví dụ: 🏆 Best Short Film — Asian Indie Film Fest 2025"
              className="w-full px-3 py-2.5 rounded-lg bg-[#181720] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-mono uppercase text-stone-400 hover:text-white cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#996515] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Lưu Vào Portfolio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
