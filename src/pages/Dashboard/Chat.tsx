import React, { useState } from 'react';
import { ChatContainer } from '../../components/chat/ChatContainer';
import { ChatInput } from '../../components/chat/ChatInput';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Mock chat history data
const mockChatHistory: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hello! I'm your ORDO AI Tutor. I'm here to help you with:\n\n• Learning new technical concepts\n• Debugging your code\n• Building your portfolio\n• Career advice and guidance\n• Study planning\n\nWhat would you like to learn today?",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  },
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const handleSendMessage = async (userMessage: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock AI response based on user input
      let aiResponse = '';

      if (userMessage.toLowerCase().includes('react')) {
        aiResponse =
          'React is a JavaScript library for building user interfaces with reusable components. Key concepts include:\n\n1. Components: Reusable UI building blocks\n2. JSX: HTML-like syntax in JavaScript\n3. State: Dynamic data that changes over time\n4. Props: Pass data between components\n5. Hooks: Functions to use state and other React features\n\nWould you like me to explain any of these concepts in detail?';
      } else if (userMessage.toLowerCase().includes('python')) {
        aiResponse =
          'Python is a versatile, beginner-friendly programming language. Key features:\n\n1. Simple syntax: Easy to read and write\n2. Versatile: Web, AI, data science, automation\n3. Large ecosystem: Thousands of libraries\n4. Community: Huge support and resources\n\nAre you interested in a specific area of Python?';
      } else if (userMessage.toLowerCase().includes('career')) {
        aiResponse =
          "Great question! Here's a roadmap for your tech career:\n\nPhase 1 (Months 1-3): Build fundamentals\n- Choose your path: Frontend, Backend, Full-stack, Data\n- Complete core courses and projects\n- Start building portfolio\n\nPhase 2 (Months 4-6): Deepen expertise\n- Build 3-5 substantial projects\n- Contribute to open source\n- Network with professionals\n\nPhase 3 (Months 7+): Land your role\n- Apply to internships\n- Negotiate offers\n- Excel in your role\n\nWhich path interests you most?";
      } else if (userMessage.toLowerCase().includes('project')) {
        aiResponse =
          "Exciting! Here are some project ideas for your portfolio:\n\nBeginner:\n- Todo App with React\n- Weather Dashboard\n- Calculator\n\nIntermediate:\n- Full-stack CRUD application\n- E-commerce Platform\n- Chat Application\n\nAdvanced:\n- Machine Learning Model\n- Real-time Collaboration Tool\n- Mobile App with React Native\n\nWhich one appeals to you? I can help you get started!";
      } else {
        aiResponse =
          "That's an interesting question! Here are some thoughts:\n\n1. Break down the problem into smaller parts\n2. Research and learn the fundamentals\n3. Practice with hands-on projects\n4. Join communities and collaborate\n5. Never stop learning\n\nIs there a specific area you'd like to dive deeper into?";
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 800);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Calculate stats
  const userMessageCount = messages.filter((m) => m.role === 'user').length;
  const assistantMessageCount = messages.filter((m) => m.role === 'assistant').length;

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">ORDO AI Tutor</h1>
              <p className="text-sm text-gray-600">Your personal AI learning companion</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setMessages(mockChatHistory);
                }}
              >
                🔄 Clear Chat
              </Button>
              <Button variant="secondary" size="sm">
                ⚙️ Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          onSuggestedPrompt={handleSuggestedPrompt}
        />

        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          placeholder="Ask me about React, Python, careers, or anything else..."
        />
      </div>

      {/* Right Sidebar: Chat Info & History */}
      <div className="hidden lg:flex lg:w-72 flex-col gap-4">
        {/* Current Chat Stats */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Current Conversation</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-600">{userMessageCount}</p>
                <p className="text-xs text-gray-600">Your Questions</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">{assistantMessageCount}</p>
                <p className="text-xs text-gray-600">AI Responses</p>
              </div>
            </div>

            <div className="pt-2 border-t border-green-200">
              <p className="text-xs text-gray-700">
                Session started {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Topics */}
        <Card>
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">📚 Quick Topics</h3>
            <div className="space-y-2">
              {[
                { icon: '🎓', label: 'Learning Tips' },
                { icon: '💼', label: 'Career Path' },
                { icon: '📝', label: 'Portfolio Help' },
                { icon: '🐛', label: 'Code Debugging' },
                { icon: '🚀', label: 'Project Ideas' },
                { icon: '💡', label: 'Interview Prep' },
              ].map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(`Tell me about ${topic.label.toLowerCase()}`)}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-green-50 transition-colors text-gray-700 hover:text-green-700"
                >
                  {topic.icon} {topic.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Features */}
        <Card className="bg-blue-50 border border-blue-200">
          <div className="space-y-2">
            <p className="text-sm font-medium text-blue-900">✨ AI Tutor Features</p>
            <ul className="space-y-1 text-xs text-blue-800">
              <li>✓ Personalized explanations</li>
              <li>✓ Code review & debugging</li>
              <li>✓ Learning recommendations</li>
              <li>✓ Career guidance</li>
              <li>✓ 24/7 availability</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
