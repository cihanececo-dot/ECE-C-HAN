import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Survey: React.FC = () => {
  const { language } = useApp();
  const [voted, setVoted] = useState(false);

  const texts = {
    TR: {
      question: "Bu rehber sizin için faydalı mı?",
      yes: "Evet, çok faydalı",
      no: "Daha iyi olabilir",
      thanks: "Geri bildiriminiz için teşekkürler!"
    },
    EN: {
      question: "Is this guide helpful for you?",
      yes: "Yes, very helpful",
      no: "Could be better",
      thanks: "Thank you for your feedback!"
    }
  };

  const t = language === 'TR' ? texts.TR : texts.EN;

  return (
    <div className="bg-editorial-accent-dark text-white p-6 rounded-3xl shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
      <AnimatePresence mode="wait">
        {!voted ? (
          <motion.div 
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">DENEYİM ANKETİ</h3>
            <p className="text-sm font-serif italic mb-6 leading-relaxed">{t.question}</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setVoted(true)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
              >
                {t.yes}
              </button>
              <button 
                onClick={() => setVoted(true)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
              >
                {t.no}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="thanks"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-3 text-white py-4"
          >
            <CheckCircle size={32} strokeWidth={1} />
            <p className="font-serif italic text-center">{t.thanks}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Survey;
