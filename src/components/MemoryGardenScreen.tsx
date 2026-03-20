import { motion } from 'motion/react';
import { X, Sprout } from 'lucide-react';
import { GameState } from '../types';
import { TIME_CAPSULE_MESSAGE } from '../constants';
import { GrowthTree } from './GrowthTree';

interface MemoryGardenScreenProps {
  state: GameState;
  onClose: () => void;
}

const getAuraStyle = (emotion?: string, isRealization?: boolean) => {
  if (isRealization) {
    return 'radial-gradient(circle at top right, rgba(234, 179, 8, 0.15), transparent 60%), radial-gradient(circle at bottom left, rgba(202, 138, 4, 0.1), transparent 50%)';
  }
  
  switch(emotion) {
    case 'Joyful': return 'radial-gradient(circle at top right, rgba(253, 224, 71, 0.15), transparent 60%)';
    case 'Frustrated': return 'radial-gradient(circle at top right, rgba(248, 113, 113, 0.15), transparent 60%)';
    case 'Melancholic': return 'radial-gradient(circle at top right, rgba(147, 197, 253, 0.15), transparent 60%)';
    case 'Awe': return 'radial-gradient(circle at top right, rgba(216, 180, 254, 0.15), transparent 60%)';
    case 'Protective': return 'radial-gradient(circle at top right, rgba(52, 211, 153, 0.15), transparent 60%)';
    case 'Overwhelmed': return 'radial-gradient(circle at top right, rgba(251, 146, 60, 0.15), transparent 60%)';
    case 'Nervous': return 'radial-gradient(circle at top right, rgba(254, 240, 138, 0.15), transparent 60%)';
    case 'Curious': return 'radial-gradient(circle at top right, rgba(103, 232, 249, 0.15), transparent 60%)';
    case 'Ambitious': return 'radial-gradient(circle at top right, rgba(165, 180, 252, 0.15), transparent 60%)';
    case 'Desire': return 'radial-gradient(circle at top right, rgba(249, 168, 212, 0.15), transparent 60%)';
    case 'Doubt': return 'radial-gradient(circle at top right, rgba(148, 163, 184, 0.15), transparent 60%)';
    case 'Content': return 'radial-gradient(circle at top right, rgba(134, 239, 172, 0.15), transparent 60%)';
    case 'Reflective': return 'radial-gradient(circle at top right, rgba(196, 181, 253, 0.15), transparent 60%)';
    case '🌟': return 'radial-gradient(circle at center, rgba(253, 224, 71, 0.2), transparent 70%)';
    case '✨': return 'radial-gradient(circle at center, rgba(216, 180, 254, 0.2), transparent 70%)';
    case '💡': return 'radial-gradient(circle at center, rgba(250, 204, 21, 0.2), transparent 70%)';
    default: return 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.05), transparent 60%)';
  }
};

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
              className={`border rounded-xl p-6 transition-colors group relative overflow-hidden ${
                memory.isRealization 
                  ? 'bg-yellow-900/10 border-yellow-500/30 hover:bg-yellow-900/20' 
                  : 'bg-black/40 border-white/10 hover:bg-white/5'
              }`}
            >
              <div 
                className="absolute inset-0 opacity-50 transition-opacity group-hover:opacity-100 pointer-events-none"
                style={{ background: getAuraStyle(memory.emotion, memory.isRealization) }}
              />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <div className={`text-xs uppercase tracking-widest ${memory.isRealization ? 'text-yellow-300/70 font-semibold' : 'text-orange-300/50'}`}>
                    {memory.isRealization && 'Core Realization • '}
                    {new Date(memory.timestamp).toLocaleDateString()}
                  </div>
                  {memory.emotion && (
                    <div className="text-xl opacity-80 group-hover:scale-110 transition-transform">
                      {memory.emotion}
                    </div>
                  )}
                </div>
                
                <p className={`font-serif leading-relaxed transition-colors mb-3 ${
                  memory.isRealization ? 'text-yellow-100/90 group-hover:text-yellow-50' : 'text-white/90 group-hover:text-white'
                }`}>
                  {memory.text}
                </p>

                {memory.reflection && (
                  <div className={`relative mt-4 pt-4 border-t ${memory.isRealization ? 'border-yellow-500/20' : 'border-white/5'}`}>
                    <div className={`text-xs italic font-serif leading-relaxed ${memory.isRealization ? 'text-yellow-200/60' : 'text-white/50'}`}>
                      "{memory.reflection}"
                    </div>
                  </div>
                )}
              </div>
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
