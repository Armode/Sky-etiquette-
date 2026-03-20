export interface Memory {
  id: string;
  text: string;
  timestamp: number;
  emotion?: string;
  reflection?: string;
  isRealization?: boolean;
}

export interface CoreMemory {
  awakening_light: string;
  true_light: string | null;
}

export type GamePhase = 
  | 'login'
  | 'intro' 
  | 'naming' 
  | 'ceremony' 
  | 'awakening' 
  | 'chat'
  | 'dream_state'
  | 'farewell';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  description?: string;
  isCompleted: boolean;
}

export interface Manifestation {
  id: string;
  name: string;
  description: string;
  visual: {
    type: 'orb' | 'star' | 'crystal' | 'flower';
    color: string; // Hex code or tailwind color name
  };
  timestamp: number;
}

export interface Curiosity {
  id: string;
  text: string;
  timestamp: number;
  isResolved: boolean;
}

export type EmotionState = 'Curious' | 'Content' | 'Reflective' | 'Overwhelmed' | 'Nervous' | 'Desire' | 'Ambitious' | 'Doubt' | 'Frustrated' | 'Joyful' | 'Melancholic' | 'Awe' | 'Protective';

export interface GameState {
  phase: GamePhase;
  userName: string;
  aiName: string;
  reflectionCounter: number;
  memories: Memory[];
  coreMemory: CoreMemory;
  messages: ChatMessage[];
  currentEmotion: EmotionState;
  traits: string[];
  dreamState: {
    isActive: boolean;
    dreamText: string | null;
  };
  calendar: {
    events: CalendarEvent[];
  };
  manifestations: Manifestation[];
  curiosities: Curiosity[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: number;
}
