import React, { useState, useMemo } from 'react';
import { Play, Film, Search, Grid, LayoutList, Youtube, Video, Trash2, Tag, Award, ExternalLink } from 'lucide-react';
import { VideoItem, Category } from '../types';

interface VideoGridProps {
  videos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  onDeleteVideo?: (id: string) => void;
  onOpenAddModal: () => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  onSelectVideo,
  onDeleteVideo,
  onOpenAddModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'youtube' | 'vimeo'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'strip'>('grid');

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'short_film', label: 'Phim Ngắn' },
    { id: 'commercial', label: 'Quảng Cáo TVC' },
    { id: 'music_video', label: 'Music Video' },
    { id: 'documentary', label: 'Tài Liệu' },
    { id: 'fashion', label: 'Thời Trang' },
  ];

  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      // Category match
      if (selectedCategory !== 'all' && v.category !== selectedCategory) {
        return false;
      }
      // Platform match
      if (selectedPlatform !== 'all' && v.platform !== selectedPlatform) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = v.title.toLowerCase().includes(query);
        const matchClient = v.client?.toLowerCase().includes(query);
        const matchDirector = v.director?.toLowerCase().includes(query);
        const matchDesc = v.description.toLowerCase().includes(query);
        const matchTags = v.tags.some((t) => t.toLowerCase().includes(query));
        return matchTitle || matchClient || matchDirector || matchDesc || matchTags;
      }
      return true;
    });
  }, [videos, selectedCategory, selectedPlatform, searchQuery]);

  return (
    <section id="showcase" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#d4af37]/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-mono text-[#d4af37] tracking-[0.3em] mb-2">
            <Film className="w-4 h-4" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-stone-100 uppercase">
            Bộ Sưu Tập <span className="gold-gradient-text">Video</span>
          </h2>
        </div>

        {/* Search & Layout Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tác phẩm, thiết bị, camera..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#121118] border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>

          {/* Platform Selector */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as any)}
            aria-label="Lọc theo nền tảng video"
            className="px-3 py-2 rounded-full bg-[#121118] border border-stone-800 text-xs text-stone-300 focus:outline-none focus:border-[#d4af37] cursor-pointer"
          >
            <option value="all">Tất cả Nền tảng</option>
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
          </select>

          {/* Layout Mode Buttons */}
          <div className="flex items-center bg-[#121118] border border-stone-800 rounded-full p-1">
            <button
              onClick={() => setLayoutMode('grid')}
              aria-label="Chế độ lưới"
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                layoutMode === 'grid' ? 'bg-[#d4af37] text-black' : 'text-stone-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('strip')}
              aria-label="Chế độ danh sách"
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                layoutMode === 'strip' ? 'bg-[#d4af37] text-black' : 'text-stone-400 hover:text-white'
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#d4af37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-[#121118] border border-stone-800 text-stone-400 hover:border-[#d4af37]/40 hover:text-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Video Gallery Listing */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-20 bg-[#121118]/60 border border-stone-800/80 rounded-2xl space-y-4">
          <Film className="w-12 h-12 text-stone-600 mx-auto" />
          <p className="text-stone-400 text-sm">Không tìm thấy video phù hợp với tiêu chí của bạn.</p>
          <button
            onClick={onOpenAddModal}
            className="px-6 py-2.5 rounded-full bg-[#d4af37] text-black font-medium text-xs uppercase tracking-widest hover:brightness-110 cursor-pointer"
          >
            ＋ Thêm Video Mới Ngay
          </button>
        </div>
      ) : (
        <div
          className={
            layoutMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
              : 'space-y-6'
          }
        >
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className={`group glass-gold-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between ${
                layoutMode === 'strip' ? 'md:flex-row md:items-center' : ''
              }`}
            >
              {/* Thumbnail Container */}
              <div
                className={`relative overflow-hidden cursor-pointer bg-black/90 ${
                  layoutMode === 'strip'
                    ? 'w-full md:w-80 aspect-video shrink-0'
                    : 'w-full aspect-video'
                }`}
                onClick={() => onSelectVideo(video)}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 group-hover:opacity-90 opacity-80"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Platform Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-stone-700 text-[10px] font-mono uppercase tracking-wider text-stone-200">
                  {video.platform === 'youtube' ? (
                    <>
                      <Youtube className="w-3 h-3 text-red-500 fill-current" />
                      <span>YouTube</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-3 h-3 text-sky-400 fill-current" />
                      <span>Vimeo</span>
                    </>
                  )}
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-stone-300 border border-stone-800">
                  {video.duration}
                </div>

                {/* Center Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <div className="w-14 h-14 rounded-full bg-[#d4af37] text-black flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_25px_#d4af37]">
                    <Play className="w-6 h-6 ml-0.5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Category & Award Row */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#d4af37]">
                    <span className="uppercase tracking-wider">{video.categoryLabel}</span>
                    <span className="text-stone-500">{video.year}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectVideo(video)}
                    className="font-cinzel text-base sm:text-lg font-bold text-stone-100 group-hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {video.title}
                  </h3>

                  {/* Award Badge if Present */}
                  {video.award && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#d4af37]/10 border border-[#d4af37]/30 text-[10px] font-mono text-amber-200">
                      <Award className="w-3 h-3 text-[#d4af37]" />
                      <span className="line-clamp-1">{video.award}</span>
                    </div>
                  )}

                  {/* Short Description */}
                  <p className="text-xs text-stone-400 line-clamp-2 font-light leading-relaxed">
                    {video.description}
                  </p>
                </div>

                {/* Footer Tag Row & Actions */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 overflow-hidden text-[10px] text-stone-500 font-mono">
                    {video.client && <span className="text-stone-400 truncate">Khách hằng: {video.client}</span>}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {onDeleteVideo && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Bạn có chắc muốn xóa video "${video.title}" khỏi portfolio?`)) {
                            onDeleteVideo(video.id);
                          }
                        }}
                        className="text-stone-600 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="Xóa video này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => onSelectVideo(video)}
                      className="flex items-center gap-1 text-[11px] font-medium text-[#d4af37] hover:underline cursor-pointer"
                    >
                      <span>Xem Phim</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
