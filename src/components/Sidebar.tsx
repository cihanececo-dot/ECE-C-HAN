import React from 'react';
import { Shop } from '../types';
import { useApp } from '../context/AppContext';
import { X, Phone, MapPin, Heart, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import CommentSection from './CommentSection';
import Survey from './Survey';

interface SidebarProps {
  shop: Shop;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ shop, onClose }) => {
  const { language, favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(shop.id);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute right-0 top-0 h-full w-full md:w-[450px] bg-editorial-bg shadow-2xl z-[1000] overflow-y-auto custom-scrollbar border-l border-editorial-border"
    >
      <div className="h-40 bg-editorial-surface/50 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-editorial-accent) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
        <div className="text-6xl mb-2 drop-shadow-lg">
          {shop.category === 'Gıda' ? '🍬' : shop.category === 'Tamir' ? '🕰️' : shop.category === 'Kitap' ? '📚' : shop.category === 'Sanat' ? '🎨' : '🏛️'}
        </div>
        <div className="text-[10px] font-black tracking-[0.3em] text-editorial-accent uppercase px-3 py-1 bg-editorial-bg/80 rounded-full">
          {shop.category}
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-editorial-bg/80 hover:bg-editorial-bg transition-colors shadow-sm"
        >
          <X size={18} className="text-editorial-accent-dark" />
        </button>
      </div>

      <div className="p-8">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-serif font-black text-editorial-accent-dark dark:text-vintage-gold mb-4 leading-tight tracking-tighter">
            {shop.name}
          </h2>
          
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => toggleFavorite(shop.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${
                isFavorite 
                ? 'bg-red-50 text-red-500 border-red-200' 
                : 'text-gray-500 border-editorial-border hover:border-editorial-accent'
              }`}
            >
              <Heart size={14} className={isFavorite ? 'fill-current' : ''} />
              {language === 'TR' ? (isFavorite ? 'Favori' : 'Ekle') : (isFavorite ? 'Fav' : 'Add')}
            </button>
            <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-editorial-border text-gray-500 hover:border-editorial-accent transition-all text-xs font-bold uppercase tracking-widest">
              <Share2 size={14} />
              {language === 'TR' ? 'Paylaş' : 'Share'}
            </button>
          </div>

          <div className="space-y-6 text-left">
            <div className="group">
              <p className="text-[10px] font-black text-editorial-accent uppercase tracking-widest mb-2 opacity-60">
                {language === 'TR' ? 'Konum' : 'Location'}
              </p>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-editorial-card border border-editorial-border shadow-sm group-hover:shadow-md transition-shadow">
                <MapPin size={20} className="text-editorial-accent shrink-0" />
                <div>
                  <p className="text-sm font-serif italic text-gray-700 dark:text-gray-300 leading-relaxed">{shop.address}</p>
                  <p className="text-xs font-bold text-editorial-accent-dark dark:text-vintage-gold mt-2 uppercase tracking-tighter">{shop.district} / İSTANBUL</p>
                </div>
              </div>
            </div>

            {shop.phone !== '-' && (
              <div className="group">
                <p className="text-[10px] font-black text-editorial-accent uppercase tracking-widest mb-2 opacity-60">
                  {language === 'TR' ? 'İletişim' : 'Contact'}
                </p>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-editorial-card border border-editorial-border shadow-sm group-hover:shadow-md transition-shadow">
                  <Phone size={20} className="text-editorial-accent shrink-0" />
                  <p className="text-sm font-bold tracking-widest">{shop.phone}</p>
                </div>
              </div>
            )}

            <button 
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${shop.coordinates[0]},${shop.coordinates[1]}`, '_blank')}
              className="w-full py-4 bg-editorial-accent text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-editorial-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <Share2 size={16} className="rotate-90" />
              {language === 'TR' ? 'YOL TARİFİ AL' : 'GET DIRECTIONS'}
            </button>
          </div>
        </div>

        <Survey />

        <div className="mt-12">
          <CommentSection shopId={shop.id} />
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
