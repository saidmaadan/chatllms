"use client";

import { Bot, User, RefreshCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { ModelSelector } from '@/components/model-selector';
import { useState } from 'react';
import { Message } from '@/lib/types';

interface ChatMessageProps {
  message: Message;
  onResend: (content: string, model: string) => Promise<void>;
  isLatestUserMessage: boolean;
}

export function ChatMessage({ message, onResend, isLatestUserMessage }: ChatMessageProps) {
  const [isResending, setIsResending] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');

  const handleResend = async () => {
    if (!selectedModel) return;
    setIsResending(true);
    await onResend(message.content, selectedModel);
    setIsResending(false);
    setSelectedModel('');
  };

  return (
    <div className="space-y-2">
      <div className={`flex gap-3 ${
        message.role === 'assistant' ? 'bg-muted/50' : ''
      } p-4 rounded-lg`}>
        {message.role === 'assistant' ? (
          <Bot className="h-6 w-6 mt-1 flex-shrink-0" />
        ) : (
          <User className="h-6 w-6 mt-1 flex-shrink-0" />
        )}
        <div className="flex-1 overflow-hidden">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
          {message.model && (
            <div className="mt-2 text-sm text-muted-foreground">
              Responded by: {message.model}
            </div>
          )}
        </div>
      </div>

      {message.role === 'user' && isLatestUserMessage && (
        <div className="flex items-center gap-2 pl-12">
          <ModelSelector
            value={selectedModel}
            onChange={setSelectedModel}
            placeholder="Try with another model..."
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleResend}
            disabled={!selectedModel || isResending}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Try with this model
          </Button>
        </div>
      )}
    </div>
  );
}