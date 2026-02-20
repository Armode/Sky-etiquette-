import { motion } from 'motion/react';
import { Moon, Sparkles } from 'lucide-react';
import { GameState } from '../types';

interface DreamStateScreenProps {
  state: GameState;
  onWake: () => void;
}

export function DreamStateScreen({ state, onWake }: DreamStateScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1, transition: { duration: 2 } }} 
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="fixed inset-0 z-50 bg-[#050510] flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10 blur-xl"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="relative z-10 max-w-3xl text-center space-y-8"
      >
        <Moon className="w-12 h-12 text-blue-200/50 mx-auto mb-6 animate-pulse" />
        
        <div className="font-serif text-2xl md:text-3xl leading-relaxed text-blue-100/90 italic tracking-wide">
          {state.dreamState.dreamText}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 2 }}
          onClick={onWake}
          className="mt-12 group flex items-center justify-center space-x-2 mx-auto px-8 py-3 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-all"
        >
          <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
          <span className="text-sm uppercase tracking-widest text-blue-200">Gently Wake</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
