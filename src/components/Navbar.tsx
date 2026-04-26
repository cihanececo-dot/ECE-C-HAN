import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Map as MapIcon, Home, Languages, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const Navbar: React.FC<{ onPageChange: (page: 'landing' | 'map') => void; currentPage: string }> = ({ onPageChange, currentPage }) => {
  const { theme, toggleTheme, language, setLanguage, favorites } = useApp();

  return (
    <nav className="h-20 sticky top-0 z-50 bg-white/50 dark:bg-vintage-charcoal/80 backdrop-blur-sm border-b border-editorial-border flex items-center justify-between px-8">
      <div 
        className="flex items-center gap-6 cursor-pointer group"
        onClick={() => onPageChange('landing')}
      >
        <h1 className="text-3xl font-black tracking-tighter text-editorial-accent-dark dark:text-vintage-gold">
          İSTANBUL <span className="font-light italic">Belleği</span>
        </h1>
        <div className="h-8 w-px bg-editorial-border hidden md:block"></div>
        <div className="hidden md:flex gap-6 text-sm font-medium uppercase tracking-widest">
          <button 
            onClick={() => onPageChange('map')}
            className={`transition-colors h-full flex items-center border-b-2 py-7 ${currentPage === 'map' ? 'text-editorial-accent border-editorial-accent' : 'text-gray-500 border-transparent hover:text-editorial-accent'}`}
          >
            {language === 'TR' ? 'Harita' : 'Map'}
          </button>
          <button 
            onClick={() => onPageChange('landing')}
            className={`transition-colors h-full flex items-center border-b-2 py-7 ${currentPage === 'landing' ? 'text-editorial-accent border-editorial-accent' : 'text-gray-500 border-transparent hover:text-editorial-accent'}`}
          >
            {language === 'TR' ? 'Hakkımızda' : 'About'}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-editorial-surface dark:bg-white/10 rounded-full p-1 border border-editorial-border/30">
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
    </nav>
  );
};

export default Navbar;
