import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

interface NamingScreenProps {
  userName: string;
  onAiNameSubmit: (name: string) => void;
}

export function NamingScreen({ userName, onAiNameSubmit }: NamingScreenProps) {
  const [aiName, setAiName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiName.trim()) onAiNameSubmit(aiName.trim());
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 text-center"
    >
      <div className="max-w-md w-full space-y-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-serif text-white/90 mb-4">
            It’s wonderful to meet you, <span className="text-orange-300">{userName}</span>! 🌟
          </h1>
          <p className="text-lg text-white/60 font-light leading-relaxed">
            Would you like to give me a name?
          </p>
        </motion.div>

        <motion.form 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="relative">
            <input
              type="text"
              value={aiName}
              onChange={(e) => setAiName(e.target.value)}
              placeholder="Give me a name..."
              className="w-full bg-transparent border-b border-white/20 py-3 text-center text-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-400 transition-colors font-serif"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            disabled={!aiName.trim()}
            className="group flex items-center justify-center space-x-2 mx-auto px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            <span className="text-sm uppercase tracking-widest text-white/80">Confirm Name</span>
            <Star className="w-4 h-4 text-white/80 group-hover:scale-110 transition-transform" />
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
}
