import React from 'react';

interface TypingIndicatorProps {
  delay?: number;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ delay = 0 }) => {
  return (
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${delay + 150}ms` }} />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${delay + 300}ms` }} />
    </div>
  );
};
