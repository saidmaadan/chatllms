"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModelSelector, models } from '@/components/model-selector';
import { toast } from 'sonner';
import { Message } from '@/lib/types';
import { ChatMessage } from '@/components/chat-message';
import { TypingIndicator } from '@/components/typing-indicator';
import { useRef, useEffect } from 'react';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (content: string, model: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.filter(m => m.role === 'user').concat({ role: 'user', content }),
          model: model,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
        model: model,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to get response');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    await sendMessage(input, selectedModel);
  };

  const handleResend = async (content: string, newModel: string) => {
    await sendMessage(content, newModel);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto w-full p-4 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Multi-LLM Chat</h1>
        <ModelSelector
          value={selectedModel}
          onChange={setSelectedModel}
        />
      </div>

      <Card className="flex-1 p-4">
        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="space-y-4">
            {messages.map((message, i) => (
              <ChatMessage
                key={i}
                message={message}
                onResend={handleResend}
                isLatestUserMessage={
                  message.role === 'user' &&
                  i === messages.filter(m => m.role === 'user').length - 1
                }
              />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}