import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { ArrowRight, History, MapPin, Users } from 'lucide-react';

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const { language } = useApp();

  const content = {
    TR: {
      title: "İstanbul'un Yaşayan Hafızası",
      subtitle: "Zamana direnen tarihi esnafları, hikayelerini ve konumlarını keşfedin.",
      cta: "Haritayı Keşfet",
      feature1: "Tarihi Miras",
      feature1Desc: "Yüzyıllık dükkanların kokusunu ve ruhunu hissedin.",
      feature2: "Interaktif Harita",
      feature2Desc: "Sokak sokak esnafların tam konumlarını bulun.",
      feature3: "Sizin Hafızanız",
      feature3Desc: "Favorilerinizi kaydedin ve deneyimlerinizi paylaşın."
    },
    EN: {
      title: "The Living Memory of Istanbul",
      subtitle: "Discover historical artisans who resist time, their stories, and locations.",
      cta: "Explore the Map",
      feature1: "Historical Heritage",
      feature1Desc: "Feel the scent and soul of century-old shops.",
      feature2: "Interactive Map",
      feature2Desc: "Find precise locations of artisans street by street.",
      feature3: "Your Memory",
      feature3Desc: "Save your favorites and share your experiences."
    }
  };

  const c = language === 'TR' ? content.TR : content.EN;

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-text">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-editorial-border">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center brightness-[0.8] sepia-[0.3]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-editorial-bg" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-6"
        >
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-editorial-accent drop-shadow-sm">
            {language === 'TR' ? 'BİR İSTANBUL KOLEKSİYONU' : 'AN ISTANBUL COLLECTION'}
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-editorial-accent-dark mb-8 tracking-tighter leading-[0.9]">
            {c.title.split(':').map((part, i) => (
              <span key={i} className={i === 1 ? "font-light italic block mt-2 text-editorial-accent" : "block"}>
                {part}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-editorial-text/80 mb-12 max-w-2xl mx-auto font-serif italic leading-relaxed">
            {c.subtitle}
          </p>
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center gap-4 bg-editorial-accent-dark hover:bg-editorial-accent text-editorial-bg dark:text-editorial-bg px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            {c.cta}
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16">
          <motion.div 
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="w-16 h-16 bg-editorial-surface/50 rounded-full flex items-center justify-center text-editorial-accent mb-8 border border-editorial-border/30 group-hover:bg-editorial-accent group-hover:text-white transition-colors duration-500">
              <History size={32} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4 tracking-tight">{c.feature1}</h3>
            <div className="w-12 h-0.5 bg-editorial-accent mb-4"></div>
            <p className="text-editorial-text/70 leading-relaxed font-serif text-lg italic">{c.feature1Desc}</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="w-16 h-16 bg-editorial-surface/50 rounded-full flex items-center justify-center text-editorial-accent mb-8 border border-editorial-border/30 group-hover:bg-editorial-accent group-hover:text-white transition-colors duration-500">
              <MapPin size={32} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4 tracking-tight">{c.feature2}</h3>
            <div className="w-12 h-0.5 bg-editorial-accent mb-4"></div>
            <p className="text-editorial-text/70 leading-relaxed font-serif text-lg italic">{c.feature2Desc}</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="w-16 h-16 bg-editorial-surface/50 rounded-full flex items-center justify-center text-editorial-accent mb-8 border border-editorial-border/30 group-hover:bg-editorial-accent group-hover:text-white transition-colors duration-500">
              <Users size={32} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4 tracking-tight">{c.feature3}</h3>
            <div className="w-12 h-0.5 bg-editorial-accent mb-4"></div>
            <p className="text-editorial-text/70 leading-relaxed font-serif text-lg italic">{c.feature3Desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-editorial-surface py-32 px-8 border-y border-editorial-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-editorial-accent opacity-20 mb-8 flex justify-center">
            <Users size={64} strokeWidth={0.5} />
          </div>
          <p className="text-3xl md:text-5xl font-serif text-editorial-accent-dark dark:text-vintage-gold leading-tight italic">
            "İstanbul'un ruhu, sadece camilerinde veya saraylarında değil; asırlardır kepenk açan, selam veren esnafının tezgahında saklıdır."
          </p>
          <div className="mt-8 text-xs font-bold uppercase tracking-[0.4em] text-editorial-accent/60">
            — ANONİM BİR İSTANBUL GÜZELLEMESİ
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
