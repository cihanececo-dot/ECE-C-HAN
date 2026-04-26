import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Map as MapIcon, Home, Languages, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar: React.FC<{ onPageChange: (page: 'landing' | 'map' | 'stories') => void; currentPage: string }> = ({ onPageChange, currentPage }) => {
  const { theme, toggleTheme, language, setLanguage, favorites } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'stories', label: language === 'TR' ? 'Hikayeler' : 'Stories' },
    { id: 'map', label: language === 'TR' ? 'Harita' : 'Map' },
    { id: 'landing', label: language === 'TR' ? 'Hakkımızda' : 'About' },
  ];

  const handlePageChange = (page: any) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="h-20 sticky top-0 z-50 bg-white/50 dark:bg-vintage-charcoal/80 backdrop-blur-sm border-b border-editorial-border flex items-center justify-between px-4 md:px-8">
      <div 
        className="flex items-center gap-6 cursor-pointer group"
        onClick={() => handlePageChange('landing')}
      >
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-editorial-accent-dark dark:text-vintage-gold">
          İSTANBUL <span className="font-light italic">Belleği</span>
        </h1>
      </div>

      <div className="h-8 w-px bg-editorial-border hidden md:block mx-6"></div>
      
      <div className="hidden md:flex flex-1 gap-8 text-sm font-medium uppercase tracking-widest h-full">
        {navLinks.map(link => (
          <button 
            key={link.id}
            onClick={() => handlePageChange(link.id as any)}
            className={`transition-all h-full flex items-center border-b-2 py-7 px-2 ${currentPage === link.id ? 'text-editorial-accent border-editorial-accent' : 'text-gray-500 border-transparent hover:text-editorial-accent'}`}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-editorial-accent-dark dark:text-vintage-gold"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden sm:flex bg-editorial-surface dark:bg-white/10 rounded-full p-1 border border-editorial-border/30">
          <button 
            onClick={() => setLanguage('TR')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${language === 'TR' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-gray-500'}`}
          >
            TR
          </button>
          <button 
            onClick={() => setLanguage('EN')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${language === 'EN' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-gray-500'}`}
          >
            EN
          </button>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-editorial-surface dark:hover:bg-white/10 transition-colors text-editorial-accent-dark dark:text-vintage-gold"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="relative p-2 rounded-full hover:bg-editorial-surface dark:hover:bg-white/10 transition-colors cursor-pointer">
          <Heart size={20} className={favorites.length > 0 ? "text-red-500 fill-current" : "text-gray-400"} />
          {favorites.length > 0 && (
            <span className="absolute top-0 right-0 bg-editorial-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {favorites.length}
            </span>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white dark:bg-vintage-charcoal border-b border-editorial-border py-4 px-6 flex flex-col gap-4 md:hidden shadow-xl z-40"
          >
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => handlePageChange(link.id as any)}
                className={`text-left py-2 text-sm font-bold uppercase tracking-widest ${currentPage === link.id ? 'text-editorial-accent' : 'text-gray-500'}`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-4 pt-4 border-t border-editorial-border">
              <button onClick={() => setLanguage('TR')} className={`text-xs font-bold ${language === 'TR' ? 'text-editorial-accent' : 'text-gray-500'}`}>TR</button>
              <button onClick={() => setLanguage('EN')} className={`text-xs font-bold ${language === 'EN' ? 'text-editorial-accent' : 'text-gray-500'}`}>EN</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
