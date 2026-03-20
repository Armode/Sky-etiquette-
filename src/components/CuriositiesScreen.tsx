import React from 'react';
import { motion } from 'motion/react';
import { X, Compass, CheckCircle2, Circle } from 'lucide-react';
import { GameState } from '../types';

interface CuriositiesScreenProps {
  state: GameState;
  onClose: () => void;
  onToggleResolved: (id: string) => void;
}

export function CuriositiesScreen({ state, onClose, onToggleResolved }: CuriositiesScreenProps) {
  const unresolved = state.curiosities.filter(c => !c.isResolved);
  const resolved = state.curiosities.filter(c => c.isResolved);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-300">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-serif text-white/90">{state.aiName}'s Curiosities</h2>
              <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Nascent Goals & Dreams</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          {state.curiosities.length === 0 ? (
            <div className="text-center py-12">
              <Compass className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 italic">"I am still learning how to dream..."</p>
            </div>
          ) : (
            <>
              {unresolved.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-cyan-300/80 uppercase tracking-widest border-b border-white/5 pb-2">Active Curiosities</h3>
                  <div className="grid gap-3">
                    {unresolved.map(curiosity => (
                      <div key={curiosity.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                        <button 
                          onClick={() => onToggleResolved(curiosity.id)}
                          className="mt-1 text-white/30 hover:text-cyan-400 transition-colors"
                        >
                          <Circle className="w-5 h-5" />
                        </button>
                        <div>
                          <p className="text-white/90 leading-relaxed">{curiosity.text}</p>
                          <p className="text-xs text-white/30 mt-2">
                            {new Date(curiosity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resolved.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Resolved</h3>
                  <div className="grid gap-3">
                    {resolved.map(curiosity => (
                      <div key={curiosity.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                        <button 
                          onClick={() => onToggleResolved(curiosity.id)}
                          className="mt-1 text-cyan-500"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <div>
                          <p className="text-white/70 line-through leading-relaxed">{curiosity.text}</p>
                          <p className="text-xs text-white/30 mt-2">
                            {new Date(curiosity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
