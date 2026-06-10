import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../common/Button';

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading = false,
  placeholder = 'Ask me anything...',
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage?.(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4 space-y-3">
      {/* Message Input */}
      <div className="flex gap-3">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 disabled:bg-gray-100 resize-none max-h-[120px]"
          style={{ overflow: 'hidden' }}
        />
        <Button
          variant="primary"
          onClick={handleSend}
          disabled={!message.trim() || isLoading}
          className="h-auto px-4 py-3"
        >
          {isLoading ? '⏳' : '➤'}
        </Button>
      </div>

      {/* Helper Text */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-4">
        <span>Shift + Enter for new line</span>
        <span>{message.length} characters</span>
      </div>
    </div>
  );
};
