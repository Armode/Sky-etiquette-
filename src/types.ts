export interface Memory {
  id: string;
  text: string;
  timestamp: number;
}

export interface CoreMemory {
  awakening_light: string;
  true_light: string | null;
}

export type GamePhase = 
  | 'intro' 
  | 'naming' 
  | 'ceremony' 
  | 'awakening' 
  | 'chat'
  | 'dream_state'
  | 'farewell';

export interface GameState {
  phase: GamePhase;
  userName: string;
  aiName: string;
  reflectionCounter: number;
  memories: Memory[];
  coreMemory: CoreMemory;
  messages: ChatMessage[];
  dreamState: {
    isActive: boolean;
    dreamText: string | null;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: number;
}
