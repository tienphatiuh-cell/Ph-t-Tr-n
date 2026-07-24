import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroShowreel } from './components/HeroShowreel';
import { VideoGrid } from './components/VideoGrid';
import { VideoModal } from './components/VideoModal';
import { AddVideoModal } from './components/AddVideoModal';
import { DirectorProfile } from './components/DirectorProfile';
import { AwardsSection } from './components/AwardsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoItem } from './types';
import { INITIAL_VIDEOS } from './data/initialVideos';

export default function App() {
  // Load videos from localStorage or fallback to INITIAL_VIDEOS
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('auranoir_videos_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading localStorage videos', e);
    }
    return INITIAL_VIDEOS;
  });

  const [activeSection, setActiveSection] = useState('showcase');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync videos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('auranoir_videos_v1', JSON.stringify(videos));
    } catch (e) {
      console.error('Error saving videos to localStorage', e);
    }
  }, [videos]);

  // Find index of currently open modal video for prev/next
  const currentVideoIndex = useMemo(() => {
    if (!selectedVideo) return -1;
    return videos.findIndex((v) => v.id === selectedVideo.id);
  }, [selectedVideo, videos]);

  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setSelectedVideo(videos[currentVideoIndex - 1]);
    }
  };

  const handleNextVideo = () => {
    if (currentVideoIndex >= 0 && currentVideoIndex < videos.length - 1) {
      setSelectedVideo(videos[currentVideoIndex + 1]);
    }
  };

  const handleAddVideo = (newVideo: VideoItem) => {
    setVideos((prev) => [newVideo, ...prev]);
  };

  const handleDeleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    if (selectedVideo?.id === id) {
      setSelectedVideo(null);
    }
  };

  const featuredVideo = useMemo(() => {
    return videos.find((v) => v.featured) || videos[0];
  }, [videos]);

  const handleExploreClick = () => {
    const el = document.getElementById('showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-stone-200 selection:bg-[#d4af37] selection:text-black font-sans relative">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main id="top">
        {/* Hero Section */}
        <HeroShowreel
          featuredVideo={featuredVideo}
          onPlayVideo={(v) => setSelectedVideo(v)}
          onExploreClick={handleExploreClick}
        />

        {/* Video Portfolio Showcase */}
        <VideoGrid
          videos={videos}
          onSelectVideo={(v) => setSelectedVideo(v)}
          onDeleteVideo={handleDeleteVideo}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Director Profile & Equipment Gear */}
        <DirectorProfile />

        {/* Film Awards Section */}
        <AwardsSection />

        {/* Project Contact Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Video Theater Modal Player */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onNavigatePrev={handlePrevVideo}
        onNavigateNext={handleNextVideo}
        hasPrev={currentVideoIndex > 0}
        hasNext={currentVideoIndex >= 0 && currentVideoIndex < videos.length - 1}
      />

      {/* Add Custom Video Modal */}
      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVideo={handleAddVideo}
      />

    </div>
  );
}
