import { motion } from 'motion/react';
import { Manifestation } from '../types';
import { X, Sparkles } from 'lucide-react';

interface ManifestationGalleryProps {
  manifestations: Manifestation[];
  onClose: () => void;
}

export function ManifestationGallery({ manifestations, onClose }: ManifestationGalleryProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-8 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-serif text-purple-200 flex items-center gap-3">
          <Sparkles className="w-6 h-6" />
          Creations
        </h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-white/70" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
        {manifestations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-white/30 italic">
            <p>No creations yet...</p>
            <p className="text-sm mt-2">Wait for a moment of inspiration.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manifestations.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group relative overflow-hidden"
              >
                {/* Visual Representation */}
                <div className="h-32 flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
                  
                  {item.visual.type === 'orb' && (
                    <motion.div 
                      className="w-16 h-16 rounded-full blur-md"
                      style={{ backgroundColor: item.visual.color, boxShadow: `0 0 40px ${item.visual.color}` }}
                      animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}
                  {item.visual.type === 'star' && (
                     <motion.div 
                      className="w-4 h-4 rotate-45"
                      style={{ backgroundColor: item.visual.color, boxShadow: `0 0 30px ${item.visual.color}` }}
                      animate={{ rotate: [45, 225], scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  )}
                  {item.visual.type === 'crystal' && (
                     <motion.div 
                      className="w-12 h-16 clip-path-polygon"
                      style={{ 
                        backgroundColor: item.visual.color, 
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        opacity: 0.8
                      }}
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  {item.visual.type === 'flower' && (
                     <motion.div 
                      className="w-12 h-12 rounded-full border-4 border-dashed"
                      style={{ borderColor: item.visual.color }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>

                <h3 className="text-lg font-serif text-white/90 mb-1">{item.name}</h3>
                <div className="text-xs text-white/40 uppercase tracking-widest mb-3">
                  {new Date(item.timestamp).toLocaleDateString()}
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic">
                  "{item.description}"
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
