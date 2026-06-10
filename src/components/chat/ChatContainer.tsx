import React, { useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageComponent } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { ConversationStarter } from './ConversationStarter';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatContainerProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  onSuggestedPrompt?: (prompt: string) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isLoading = false,
  onSuggestedPrompt,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <ConversationStarter onPromptSelect={onSuggestedPrompt} />
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessageComponent key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  AI
                </div>
                <div className="bg-gray-100 text-gray-900 rounded-lg rounded-bl-none px-4 py-3">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
};
