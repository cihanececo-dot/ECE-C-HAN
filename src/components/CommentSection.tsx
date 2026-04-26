import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, User, Star } from 'lucide-react';
import { motion } from 'motion/react';

const CommentSection: React.FC<{ shopId: string }> = ({ shopId }) => {
  const { language, comments, addComment } = useApp();
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const shopComments = comments.filter(c => c.shopId === shopId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !text) return;

    addComment({
      id: Math.random().toString(36).substr(2, 9),
      shopId,
      userName,
      text,
      date: new Date().toLocaleDateString(),
      rating
    });

    setUserName('');
    setText('');
  };

  return (
    <div className="mt-12 border-t border-editorial-border pt-12">
      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-editorial-accent mb-8">
        {language === 'TR' ? 'TOPLULUK HAFIZASI' : 'COMMUNITY MEMORY'}
      </h4>

      <form onSubmit={handleSubmit} className="mb-12 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input 
            type="text"
            placeholder={language === 'TR' ? 'Adınız ve Soyadınız' : 'Full Name'}
            className="w-full px-5 py-3 rounded-xl bg-editorial-surface/30 border-none outline-none focus:ring-1 focus:ring-editorial-accent text-sm font-serif italic transition-all"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-editorial-surface/30">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Puan:</span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(star => (
                <button key={star} type="button" onClick={() => setRating(star)}>
                  <Star size={14} className={star <= rating ? "text-editorial-accent fill-current" : "text-gray-300"} />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <textarea 
          placeholder={language === 'TR' ? 'Bu mekanın hikayenizdeki yeri nedir?' : 'Share your story of this place...'}
          className="w-full px-5 py-4 rounded-2xl bg-editorial-surface/30 border-none outline-none focus:ring-1 focus:ring-editorial-accent text-sm h-32 resize-none font-serif italic transition-all"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <button 
          type="submit"
          className="w-full py-4 border-2 border-editorial-accent text-editorial-accent hover:bg-editorial-accent hover:text-white rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all duration-300"
        >
          {language === 'TR' ? 'Yorumu Kaydet' : 'Record Comment'}
        </button>
      </form>

      <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide">
        {shopComments.length === 0 ? (
          <p className="text-gray-400 text-sm italic font-serif text-center py-10 opacity-60">
            {language === 'TR' ? 'Henüz bir anı paylaşılmamış.' : 'No memories shared yet.'}
          </p>
        ) : (
          shopComments.map(comment => (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={comment.id} 
              className="bg-editorial-surface/20 p-6 rounded-3xl border border-editorial-border/30 relative"
            >
              <p className="text-lg font-serif italic text-gray-700 dark:text-gray-300 leading-relaxed indent-4">
                "{comment.text}"
              </p>
              <div className="mt-4 pt-4 border-t border-editorial-border/20 flex justify-between items-center">
                <span className="font-black text-[10px] uppercase tracking-widest text-editorial-accent-dark dark:text-vintage-gold">
                  — {comment.userName.toUpperCase()}, {comment.date}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: comment.rating }).map((_, i) => (
                    <Star key={i} size={10} className="text-editorial-accent fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
