import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { shops } from '../data/shops';
import { useApp } from '../context/AppContext';
import { Shop } from '../types';
import Sidebar from '../components/Sidebar';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Search, Filter } from 'lucide-react';

// Fix Leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, 15);
  return null;
};

const getCategoryEmoji = (category: string) => {
  switch (category) {
    case 'Gıda': return '🍬';
    case 'Hizmet': return '⚕️';
    case 'Giyim': return '👕';
    case 'Tamir': return '🕰️';
    case 'Antika': return '🏺';
    case 'Kitap': return '📚';
    case 'Sanat': return '🎨';
    case 'Ahşap': return '🪵';
    case 'Metal': return '⚒️';
    case 'Kültür': return '🏛️';
    default: return '📍';
  }
};

const MapPage: React.FC = () => {
  const { language } = useApp();
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Hepsi');

  const createCustomIcon = (category: string, shopId: number) => {
    return L.divIcon({
      html: `<div class="custom-marker-inner ${selectedShop?.id === shopId ? 'active-pulse' : ''}">
               <span>${getCategoryEmoji(category)}</span>
               <div class="custom-marker-pin"></div>
             </div>`,
      className: `custom-marker-wrapper ${selectedShop?.id === shopId ? 'marker-active' : ''}`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(shops.map(s => s.category)));
    return language === 'TR' ? ['Hepsi', ...cats] : ['All', ...cats];
  }, [language]);

  const filteredShops = useMemo(() => {
    return shops.filter(shop => {
      const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            shop.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Hepsi' || activeCategory === 'All' || shop.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden bg-editorial-bg">
      {/* Sidebar for List and Search */}
      <aside className="w-full md:w-80 flex flex-col border-r border-editorial-border bg-editorial-bg/40 backdrop-blur-md overflow-hidden z-20">
        <div className="p-6 border-b border-editorial-border bg-editorial-bg/50">
          <h2 className="text-xs font-bold uppercase tracking-widest text-editorial-accent mb-6 flex items-center gap-2">
            <Filter size={14} />
            {language === 'TR' ? 'ESNAF REHBERİ' : 'ARTISAN GUIDE'}
          </h2>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder={language === 'TR' ? 'Ara...' : 'Search...'}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-editorial-surface/50 dark:bg-zinc-800 border-none outline-none text-sm transition-all focus:ring-1 focus:ring-editorial-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter transition-all ${
                  activeCategory === cat 
                  ? 'bg-editorial-accent text-white shadow-lg shadow-editorial-accent/20' 
                  : 'bg-editorial-card text-gray-500 border border-editorial-border/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {filteredShops.map((shop, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              key={shop.id}
              onClick={() => setSelectedShop(shop)}
              className={`p-4 cursor-pointer rounded-xl border transition-all ${
                selectedShop?.id === shop.id 
                ? 'bg-editorial-card border-editorial-accent shadow-md' 
                : 'bg-editorial-card/60 border-editorial-border hover:border-editorial-accent/50'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-[13px] text-editorial-text dark:text-editorial-accent-dark leading-tight uppercase">{shop.name}</h3>
                <span className="text-[9px] font-black text-editorial-accent bg-editorial-surface/50 px-2 py-0.5 rounded tracking-tighter shrink-0">
                  {shop.category}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide flex items-center gap-1">
                <MapPin size={10} /> {shop.district.toUpperCase()}
              </p>
            </motion.div>
          ))}
          {filteredShops.length === 0 && (
            <div className="p-10 text-center text-xs text-gray-400 italic">
              {language === 'TR' ? 'Sonuç bulunamadı.' : 'No results found.'}
            </div>
          )}
        </div>
      </aside>

      {/* Map Container */}
      <section className="flex-1 relative bg-editorial-surface">
        <MapContainer 
          center={[41.0125, 28.9734]} 
          zoom={12} 
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredShops.map(shop => (
            <Marker 
              key={shop.id} 
              position={shop.coordinates}
              icon={createCustomIcon(shop.category, shop.id)}
              eventHandlers={{
                click: () => setSelectedShop(shop),
              }}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                <div className="font-sans font-bold text-vintage-green">
                  {shop.name} <span className="text-gray-400 font-normal">({shop.district})</span>
                </div>
              </Tooltip>
              <Popup>
                <div className="font-sans p-1">
                  <h3 className="font-bold text-editorial-accent-dark text-sm uppercase">{shop.name}</h3>
                  <p className="text-[10px] text-gray-600 mb-2">{shop.address}</p>
                  <button 
                    onClick={() => setSelectedShop(shop)}
                    className="w-full bg-editorial-accent text-white text-xs py-1.5 rounded font-bold transition-colors hover:bg-editorial-accent-dark"
                  >
                    {language === 'TR' ? 'Detayları Gör' : 'View Details'}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          {selectedShop && <ChangeView center={selectedShop.coordinates} />}
        </MapContainer>

        {/* Selected Shop Detail Sidebar (Overlay) */}
        <AnimatePresence>
          {selectedShop && (
            <Sidebar 
              shop={selectedShop} 
              onClose={() => setSelectedShop(null)} 
            />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default MapPage;
