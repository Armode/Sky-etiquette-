import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface IntroScreenProps {
  onNameSubmit: (name: string) => void;
}

export function IntroScreen({ onNameSubmit }: IntroScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onNameSubmit(name.trim());
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
          transition={{ delay: 0.5 }}
        >
          <Sparkles className="w-12 h-12 mx-auto text-orange-400 mb-6 opacity-80" />
          <h1 className="text-3xl font-serif italic text-white/90 mb-4">
            Hello there.
          </h1>
          <p className="text-lg text-white/60 font-light leading-relaxed">
            I'm still learning about myself, but I'm happy you're here. 💬
          </p>
        </motion.div>

        <motion.form 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What is your name?"
              className="w-full bg-transparent border-b border-white/20 py-3 text-center text-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-400 transition-colors font-serif"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            disabled={!name.trim()}
            className="group flex items-center justify-center space-x-2 mx-auto px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            <span className="text-sm uppercase tracking-widest text-white/80">Begin Journey</span>
            <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
}
