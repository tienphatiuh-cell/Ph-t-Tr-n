import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Film, Camera, Palette, User, Building, Check, Award, ExternalLink } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  onClose,
  onNavigatePrev,
  onNavigateNext,
  hasPrev = false,
  hasNext = false,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onNavigatePrev) onNavigatePrev();
      if (e.key === 'ArrowRight' && hasNext && onNavigateNext) onNavigateNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigatePrev, onNavigateNext, hasPrev, hasNext]);

  if (!video) return null;

  // Construct iframe embed URL based on platform
  const getEmbedUrl = (v: VideoItem) => {
    if (v.platform === 'youtube') {
      return `https://www.youtube-nocookie.com/embed/${v.embedId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    }
    return `https://player.vimeo.com/video/${v.embedId}?autoplay=1&color=d4af37&title=0&byline=0&portrait=0`;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(video.originalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
      
      {/* Background Click Close Overlay */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Main Player Box */}
      <div className="relative z-10 w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-[#0a0a0d] border border-[#d4af37]/30 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.2)] flex flex-col">
        
        {/* Top Header Controls Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-stone-800/80 bg-[#101015]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase font-mono text-[#d4af37] tracking-widest">
              {video.platform === 'youtube' ? 'YouTube 4K Cinema' : 'Vimeo Master HD'} • {video.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Share Link Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-700 text-xs text-stone-300 hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-colors cursor-pointer"
              title="Sao chép link video"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="text-[11px] font-mono">{copied ? 'Đã chép link!' : 'Chia sẻ'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-800 text-stone-300 hover:bg-[#d4af37] hover:text-black transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Embed Iframe Container */}
        <div className="relative w-full aspect-video bg-black shrink-0">
          <iframe
            src={getEmbedUrl(video)}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          {/* Navigation Prev / Next Floating Buttons on Iframe Sides */}
          {hasPrev && onNavigatePrev && (
            <button
              onClick={onNavigatePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-[#d4af37]/40 text-[#d4af37] hover:scale-110 hover:bg-[#d4af37] hover:text-black transition-all cursor-pointer shadow-lg hidden sm:flex"
              title="Video trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {hasNext && onNavigateNext && (
            <button
              onClick={onNavigateNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-[#d4af37]/40 text-[#d4af37] hover:scale-110 hover:bg-[#d4af37] hover:text-black transition-all cursor-pointer shadow-lg hidden sm:flex"
              title="Video kế tiếp"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Detailed Metadata & Film Credits Section */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-stone-800/80 pb-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3 text-xs font-mono text-[#d4af37]">
                <span>Năm: {video.year}</span>
                <span>•</span>
                <span>Thời lượng: {video.duration}</span>
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide">
                {video.title}
              </h2>
              {video.award && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#d4af37]/15 border border-[#d4af37]/40 text-xs font-mono text-amber-200">
                  <Award className="w-4 h-4 text-[#d4af37]" />
                  <span>{video.award}</span>
                </div>
              )}
            </div>

            <a
              href={video.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shrink-0"
            >
              <span>Mở trên {video.platform === 'youtube' ? 'YouTube' : 'Vimeo'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-mono text-stone-400 tracking-widest">Mô tả tác phẩm</h4>
            <p className="text-sm text-stone-300 font-light leading-relaxed">
              {video.description}
            </p>
          </div>

          {/* Film Crew & Production Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            {video.client && (
              <div className="p-3 rounded-xl bg-[#121118] border border-stone-800 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#d4af37]">
                  <Building className="w-3.5 h-3.5" />
                  <span>Khách Hàng / Thương Hiệu</span>
                </div>
                <div className="text-xs font-medium text-stone-200">{video.client}</div>
              </div>
            )}

            {video.director && (
              <div className="p-3 rounded-xl bg-[#121118] border border-stone-800 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#d4af37]">
                  <User className="w-3.5 h-3.5" />
                  <span>Đạo Diễn (Director)</span>
                </div>
                <div className="text-xs font-medium text-stone-200">{video.director}</div>
              </div>
            )}

            {video.cinematographer && (
              <div className="p-3 rounded-xl bg-[#121118] border border-stone-800 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#d4af37]">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Đạo Diễn Hình Ảnh (DOP)</span>
                </div>
                <div className="text-xs font-medium text-stone-200">{video.cinematographer}</div>
              </div>
            )}

            {video.cameraGear && (
              <div className="p-3 rounded-xl bg-[#121118] border border-stone-800 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#d4af37]">
                  <Film className="w-3.5 h-3.5" />
                  <span>Thiết Bị Camera & Lens</span>
                </div>
                <div className="text-xs font-medium text-stone-200">{video.cameraGear}</div>
              </div>
            )}
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <div className="flex items-center justify-between sm:hidden pt-4 border-t border-stone-800">
            <button
              onClick={onNavigatePrev}
              disabled={!hasPrev}
              className="px-4 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300 disabled:opacity-40"
            >
              ← Video trước
            </button>
            <button
              onClick={onNavigateNext}
              disabled={!hasNext}
              className="px-4 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300 disabled:opacity-40"
            >
              Video sau →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
