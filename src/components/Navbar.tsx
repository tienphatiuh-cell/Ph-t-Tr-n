import React, { useState, useEffect } from 'react';
import { Film, Plus, Menu, X, Sparkles, Volume2, VolumeX, Clapperboard } from 'lucide-react';

interface NavbarProps {
  onOpenAddModal: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAddModal, activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAmbientAudioPlaying, setIsAmbientAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'showcase', label: 'Sản Phẩm' },
    { id: 'about', label: 'Đạo Diễn & Ekip' },
    { id: 'gear', label: 'Thiết Bị' },
    { id: 'awards', label: 'Giải Thưởng' },
    { id: 'contact', label: 'Liên Hệ' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080a]/90 backdrop-blur-md border-b border-[#d4af37]/25 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] via-[#b8860b] to-[#553b09] p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#08080a] rounded-full flex items-center justify-center">
              <Clapperboard className="w-4 h-4 text-[#d4af37] transition-transform duration-300 group-hover:rotate-12" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.25em] gold-gradient-text uppercase">
              PHÁT TRẦN
            </span>
            <span className="text-[9px] tracking-[0.3em] text-amber-200/60 uppercase font-mono -mt-1">
              Cinematic Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer relative py-1 ${
                activeSection === item.id
                  ? 'text-[#d4af37] font-semibold'
                  : 'text-stone-400 hover:text-amber-100'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions: Add Video & Mobile Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Add Custom Video Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase border border-[#d4af37]/40 bg-[#121118]/80 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 gold-border-glow cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Thêm Video</span>
            <span className="sm:hidden">Thêm</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#141419] border border-[#d4af37]/20 text-[#d4af37] hover:text-amber-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0e]/95 border-b border-[#d4af37]/30 backdrop-blur-xl px-6 py-6 mt-2 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left py-2 text-sm uppercase tracking-[0.2em] font-medium text-stone-300 hover:text-[#d4af37] border-b border-stone-800/50"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
