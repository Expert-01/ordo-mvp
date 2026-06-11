import React, { useState, useRef, useEffect } from 'react';
import {Paperclip, Mic, ArrowUp} from 'lucide-react';
interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false, placeholder = "What's the plan?" }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Auto-resize textarea to fit content
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = '0px';
    const scrollHeight = ta.scrollHeight;
    ta.style.height = Math.min(scrollHeight, 300) + 'px';
  }, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;
    onSendMessage(trimmed);
    setMessage('');
    // keep focus for quick follow-up
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="relative bg-white border border-green-200 rounded-xl p-12 shadow-inner">
        <textarea
          ref={textareaRef}
          className="w-full resize-none bg-transparent outline-none text-gray-700 text-lg placeholder-gray-500 pr-20"
          placeholder={placeholder}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          aria-label="Chat input"
        />

        {/* left small icon (placeholder) */}
        <button
          type="button"
          className="absolute left-4 bottom-4 w-8 h-8 rounded-full bg-green-900 text-green-100 flex items-center justify-center"
          aria-hidden
        >
          <Paperclip size={10}/>
        </button>

        {/* right controls */}
        <div className="absolute right-4 bottom-3 flex items-center gap-3">
          <button
            type="button"
            className="text-green-600 p-2 rounded-md"
            aria-hidden
            title="Voice (placeholder)"
          >
            <Mic/>
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={isLoading || !message.trim()}
            className={`ml-2 w-10 h-10 rounded-md flex items-center justify-center text-white ${isLoading || !message.trim() ? 'bg-green-300 cursor-not-allowed' : 'bg-green-900 hover:opacity-95'}`}
            aria-label="Send message"
          >
            {isLoading ? '…' : '↑'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
