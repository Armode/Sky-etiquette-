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
import { CalendarScreen } from './components/CalendarScreen';
import { DreamStateScreen } from './components/DreamStateScreen';
import { ManifestationGallery } from './components/ManifestationGallery';

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
    wakeFromDream,
    showCalendar,
    toggleCalendar,
    addCalendarEvent,
    toggleEventCompletion,
    deleteEvent,
    showManifestations,
    toggleManifestations
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
            onOpenCalendar={toggleCalendar}
            onOpenManifestations={toggleManifestations}
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
        {showCalendar && (
          <CalendarScreen 
            state={state}
            onClose={toggleCalendar}
            onAddEvent={addCalendarEvent}
            onToggleCompletion={toggleEventCompletion}
            onDeleteEvent={deleteEvent}
          />
        )}
        {showManifestations && (
          <ManifestationGallery 
            manifestations={state.manifestations}
            onClose={toggleManifestations}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
