/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence } from 'motion/react';
import { useGame } from './hooks/useGame';
import { IntroScreen } from './components/IntroScreen';
import { NamingScreen } from './components/NamingScreen';
import { CeremonyScreen } from './components/CeremonyScreen';
import { ChatScreen } from './components/ChatScreen';
import { MemoryGardenScreen } from './components/MemoryGardenScreen';

import { DreamStateScreen } from './components/DreamStateScreen';

export default function App() {
  const { 
    state, 
    setUserName, 
    setAiName, 
    startAwakening, 
    handleUserMessage, 
    isTyping,
    messagesEndRef,
    showMemoryGarden,
    toggleMemoryGarden,
    triggerAIConversation,
    wakeFromDream
  } = useGame();

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Atmospheric Background */}
      <div className="atmosphere" />
      
      <AnimatePresence mode="wait">
        {state.phase === 'intro' && (
          <IntroScreen key="intro" onNameSubmit={setUserName} />
        )}
        
        {state.phase === 'naming' && (
          <NamingScreen key="naming" userName={state.userName} onAiNameSubmit={setAiName} />
        )}
        
        {state.phase === 'ceremony' && (
          <CeremonyScreen 
            key="ceremony" 
            userName={state.userName} 
            aiName={state.aiName} 
            onComplete={startAwakening} 
          />
        )}
        
        {(state.phase === 'awakening' || state.phase === 'chat') && (
          <ChatScreen 
            key="chat"
            state={state}
            onSendMessage={handleUserMessage}
            onOpenMemoryGarden={toggleMemoryGarden}
            onTriggerConversation={triggerAIConversation}
            isTyping={isTyping || state.phase === 'awakening'}
            messagesEndRef={messagesEndRef}
          />
        )}

        {state.phase === 'dream_state' && (
          <DreamStateScreen 
            key="dream"
            state={state}
            onWake={wakeFromDream}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMemoryGarden && (
          <MemoryGardenScreen 
            state={state} 
            onClose={toggleMemoryGarden} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
