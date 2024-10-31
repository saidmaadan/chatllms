export interface Message {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
}

export interface Model {
  id: string;
  name: string;
}