import React from 'react';
import { motion } from 'motion/react';
import { shops } from '../data/shops';
import { useApp } from '../context/AppContext';
import { BookOpen, MapPin, ArrowRight } from 'lucide-react';

const StoriesPage: React.FC = () => {
  const { language } = useApp();
  
  const stories = shops.filter(shop => shop.description);

  return (
    <div className="min-h-screen bg-editorial-bg py-20 px-6 sm:px-12 paper-texture">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-1 bg-editorial-accent" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-serif font-bold text-editorial-text mb-6"
          >
            {language === 'TR' ? 'İstanbul’un Hafıza Kayıtları' : 'Records of Istanbul\'s Memory'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-serif italic text-editorial-accent max-w-2xl mx-auto"
          >
            {language === 'TR' 
              ? 'Yüz yıla meydan okuyan dükkanlar, zanaatın son temsilcileri ve kentin ruhunu taşıyan hikayeler.' 
              : 'Shops that defy a century, the last representatives of craftsmanship, and stories that carry the soul of the city.'}
          </motion.p>
        </header>

        <div className="space-y-32">
          {stories.map((shop, index) => (
            <motion.article 
              key={shop.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative group lg:grid lg:grid-cols-12 lg:gap-12 items-start"
            >
              <div className="lg:col-span-1 hidden lg:flex flex-col items-center pt-2">
                <span className="text-editorial-accent/20 font-serif text-4xl font-bold">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <div className="w-px flex-1 bg-editorial-accent/10 my-4" />
              </div>

              <div className="lg:col-span-11">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black tracking-[0.2em] text-editorial-accent uppercase bg-editorial-surface px-3 py-1 rounded">
                    {shop.category}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <MapPin size={12} />
                    {shop.district}
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-editorial-text mb-8 group-hover:text-editorial-accent transition-colors">
                  {shop.name}
                </h2>

                <div className="relative pl-8 sm:pl-12 border-l-2 border-editorial-accent/10">
                  <span className="absolute -left-3 top-0 text-8xl text-editorial-accent/5 font-serif select-none">"</span>
                  <div className="text-xl sm:text-2xl font-serif italic text-editorial-text/80 leading-relaxed whitespace-pre-wrap">
                    {shop.description}
                  </div>
                </div>

                {shop.imageUrl && !shop.images && (
                  <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl border border-editorial-accent/5">
                    <img 
                      src={shop.imageUrl} 
                      alt={shop.name} 
                      className="w-full aspect-[16/9] object-cover hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                )}

                {shop.images && shop.images.length > 0 && (
                  <div className={`mt-12 grid gap-6 ${shop.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                    {shop.images.map((img, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden shadow-2xl border border-editorial-accent/5 aspect-[4/3]">
                        <img 
                          src={img} 
                          alt={`${shop.name} ${i + 1}`} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 pt-20 border-t border-editorial-accent/10 text-center"
        >
          <BookOpen className="mx-auto mb-6 text-editorial-accent/30" size={48} />
          <p className="font-serif italic text-editorial-accent/60">
            {language === 'TR' ? 'Hikayeler devam ediyor...' : 'Stories continue...'}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StoriesPage;
