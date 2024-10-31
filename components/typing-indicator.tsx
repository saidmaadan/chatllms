"use client";

import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex gap-3 bg-muted/50 p-4 rounded-lg">
      <Bot className="h-6 w-6 mt-1 flex-shrink-0" />
      <div className="flex items-center">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}