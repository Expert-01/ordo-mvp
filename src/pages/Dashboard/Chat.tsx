
import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import ChatInput from '../../components/chat/ChatInput';

const suggestions = [
  'Explain Data Structures',
  'Explain Data Structures',
  'Explain Data Structures',
  'Explain Data Structures',
  'Explain Data Structures',
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading] = useState(false);

  const handleSendMessage = (msg: string) => {
    // simple local handling for now — append to messages and log
    setMessages((prev) => [...prev, msg]);
    console.log('User sent:', msg);
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-4">
      {/* Main ORDO AI Area */}
      <div className="flex-1 bg-green-50 rounded-lg p-8 relative overflow-hidden">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-extrabold text-green-900">ORDO AI</h1>
          <h2 className="text-xl font-semibold text-gray-800 mt-1">AI Engineer</h2>
          <p className="text-sm text-gray-700 mt-4 max-w-2xl">
            This is your personalized path to becoming an AI Engineer. Complete milestones,
            build projects and unlock opportunities.
          </p>
        </div>

        {/* Chat input — placed above the suggestion chips (Figma) */}
        <div className="w-full flex justify-center mt-8">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} placeholder={"What's the plan?"} />
        </div>

        {/* Centered suggestion chips area */}
        <div className="absolute left-0 right-0 bottom-0 top-28 mt-[50vh] flex justify-center">
          <div className="flex flex-wrap gap-6 justify-center items-center max-w-4xl">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="px-6 py-3 bg-green-900 text-green-100 rounded-md shadow-sm hover:opacity-95 transition"
                onClick={() => {
                  // placeholder: wire to chat action later
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar: preserved info cards */}
      <div className="hidden lg:flex lg:w-72 flex-col gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Upgrade Your Journey</h3>
            <p className="text-sm text-gray-700">Unlock advanced AI insights and exclusive opportunities</p>
            <div>
              <button className="w-full bg-green-700 text-white py-2 rounded-md">Go Premium</button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-400 rounded-full" />
            <div>
              <div className="font-semibold text-gray-900">Gideon Johnson</div>
              <div className="text-xs text-gray-600">Student</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
