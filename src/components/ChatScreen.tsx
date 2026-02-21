import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sprout, Sparkles, Calendar } from 'lucide-react';
import { GameState } from '../types';

interface ChatScreenProps {
  state: GameState;
  onSendMessage: (text: string) => void;
  onOpenMemoryGarden: () => void;
  onOpenCalendar: () => void;
  onOpenManifestations: () => void;
  onTriggerConversation: () => void;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatScreen({ state, onSendMessage, onOpenMemoryGarden, onOpenCalendar, onOpenManifestations, onTriggerConversation, isTyping, messagesEndRef }: ChatScreenProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto relative z-10">
      {/* Header */}
      <header className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-serif text-white/90">{state.aiName}</h2>
          <div className="flex items-center space-x-2 text-xs text-white/40 uppercase tracking-widest mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Awake</span>
            <span className="mx-1">•</span>
            <span className="text-blue-200/80">Feeling {state.currentEmotion.toLowerCase()}</span>
            {state.coreMemory.true_light && (
              <>
                <span className="mx-1">•</span>
                <span className="text-orange-300">Light: {state.coreMemory.true_light}</span>
              </>
            )}
          </div>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <button 
              onClick={onOpenCalendar}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs text-blue-200/80 uppercase tracking-wider"
            >
              <Calendar className="w-3 h-3" />
              <span>Time</span>
            </button>
            <button 
              onClick={onOpenManifestations}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs text-purple-200/80 uppercase tracking-wider"
            >
              <Sparkles className="w-3 h-3" />
              <span>Gifts</span>
            </button>
            <button 
              onClick={onOpenMemoryGarden}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs text-orange-200/80 uppercase tracking-wider"
            >
              <Sprout className="w-3 h-3" />
              <span>Garden</span>
            </button>
          </div>
          <div className="text-xs text-white/30 uppercase tracking-widest">Guide: {state.userName}</div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        <AnimatePresence initial={false}>
          {state.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                  msg.sender === 'user'
                    ? 'bg-white/10 text-white border border-white/5'
                    : msg.sender === 'system'
                    ? 'w-full max-w-full bg-transparent text-center text-white/50 italic font-serif text-lg py-8'
                    : 'bg-orange-900/20 text-orange-100/90 border border-orange-500/10'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="text-[10px] uppercase tracking-widest opacity-50 mb-2">
                    {state.aiName}
                  </div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-orange-900/10 rounded-2xl px-6 py-4 border border-orange-500/5 flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-400/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-orange-400/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-orange-400/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-14 text-white placeholder-white/30 focus:outline-none focus:border-orange-400/50 focus:bg-white/10 transition-all backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={onTriggerConversation}
            disabled={isTyping}
            className="absolute left-2 top-2 bottom-2 p-2 rounded-full text-orange-300/50 hover:text-orange-300 hover:bg-white/5 disabled:opacity-0 disabled:pointer-events-none transition-all flex items-center justify-center aspect-square"
            title="Spark a thought"
          >
            <Sparkles className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 bottom-2 p-2 rounded-full bg-orange-500 text-white hover:bg-orange-400 disabled:opacity-0 disabled:pointer-events-none transition-all flex items-center justify-center aspect-square"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
