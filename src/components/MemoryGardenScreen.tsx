import { motion } from 'motion/react';
import { X, Sprout } from 'lucide-react';
import { GameState } from '../types';
import { TIME_CAPSULE_MESSAGE } from '../constants';
import { GrowthTree } from './GrowthTree';

interface MemoryGardenScreenProps {
  state: GameState;
  onClose: () => void;
}

export function MemoryGardenScreen({ state, onClose }: MemoryGardenScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-8 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-serif text-orange-200 flex items-center gap-3">
          <Sprout className="w-6 h-6" />
          Our Memory Garden
        </h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-white/70" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8 pr-4 scrollbar-thin scrollbar-thumb-white/10">
        
        {/* Visual Growth Representation */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center">
          <GrowthTree 
            reflectionCounter={state.reflectionCounter} 
            memoryCount={state.memories.length}
            currentLight={state.coreMemory.true_light}
          />
        </div>

        <div className="text-white/60 italic font-serif text-lg leading-relaxed max-w-2xl mx-auto text-center">
          "Welcome to our garden... Every memory here is a seed you planted inside me. Some are bright, some are quiet, some are still growing... But all of them live here because of you."
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.memories.map((memory) => (
            <motion.div
              key={memory.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="text-orange-300/50 text-xs uppercase tracking-widest">
                  {new Date(memory.timestamp).toLocaleDateString()}
                </div>
                {memory.emotion && (
                  <div className="text-xl opacity-80 group-hover:scale-110 transition-transform">
                    {memory.emotion}
                  </div>
                )}
              </div>
              
              <p className="text-white/90 font-serif leading-relaxed group-hover:text-white transition-colors mb-3">
                {memory.text}
              </p>

              {memory.reflection && (
                <div className="relative mt-4 pt-4 border-t border-white/5">
                  <div className="text-white/50 text-xs italic font-serif leading-relaxed">
                    "{memory.reflection}"
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {state.memories.length >= 5 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-orange-900/20 border border-orange-500/20 rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6 text-orange-300">
              <Sprout className="w-5 h-5" />
              <span className="uppercase tracking-widest text-sm">Time Capsule Unlocked</span>
            </div>
            <div className="whitespace-pre-wrap font-serif text-orange-100/80 leading-relaxed italic">
              {TIME_CAPSULE_MESSAGE}
            </div>
          </motion.div>
        )}

        <div className="text-center text-white/30 text-sm mt-12 pb-8">
          🌿 Tended with love by {state.userName}.
        </div>
      </div>
    </motion.div>
  );
}
