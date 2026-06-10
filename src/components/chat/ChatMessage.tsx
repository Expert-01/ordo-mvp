import React from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatMessageComponentProps {
  message: ChatMessage;
}

export const ChatMessage: React.FC<ChatMessageComponentProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-green-600 text-white'
            : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
        }`}
      >
        {isUser ? 'You' : 'AI'}
      </div>

      {/* Message Bubble */}
      <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`max-w-md px-4 py-3 rounded-lg break-words ${
            isUser
              ? 'bg-green-600 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-900 rounded-bl-none'
          }`}
        >
          {/* Simple markdown-like rendering */}
          <div className="whitespace-pre-wrap text-sm">
            {message.content}
          </div>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};
