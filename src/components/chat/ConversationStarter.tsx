import React from 'react';
import { GraduationCap, BookOpen, Briefcase, Compass, Lightbulb, Bug } from 'lucide-react';
import { Card } from '../common/Card';

interface ConversationStarterProps {
  onPromptSelect?: (prompt: string) => void;
}

const suggestedPrompts = [
  {
    icon: GraduationCap,
    title: 'Explain React Hooks',
    description: 'Break down how React Hooks work',
  },
  {
    icon: BookOpen,
    title: 'Study Plan for ML',
    description: 'Create a study roadmap for machine learning',
  },
  {
    icon: Briefcase,
    title: 'Portfolio Tips',
    description: 'Get advice on building your portfolio',
  },
  {
    icon: Compass,
    title: 'Career Guidance',
    description: 'Explore career paths in tech',
  },
  {
    icon: Lightbulb,
    title: 'Project Ideas',
    description: 'Get inspired with project ideas',
  },
  {
    icon: Bug,
    title: 'Debug My Code',
    description: 'Help me fix code issues',
  },
];

export const ConversationStarter: React.FC<ConversationStarterProps> = ({
  onPromptSelect,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to ORDO AI Tutor 🤖
          </h2>
          <p className="text-gray-600">
            Ask me anything about your studies, career, or projects
          </p>
        </div>

        {/* Suggested Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {suggestedPrompts.map((prompt, index) => {
            const IconComponent = prompt.icon;
            return (
              <button
                type="button"
                key={index}
                onClick={() => onPromptSelect?.(prompt.title)}
                className="text-left p-4 border border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <IconComponent size={24} className="text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 group-hover:text-green-700">
                      {prompt.title}
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600">
                      {prompt.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tips */}
        <Card className="bg-blue-50 border border-blue-200">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-medium text-blue-900">
              <Lightbulb size={16} />
              Tips for better responses:
            </p>
            <ul className="space-y-1 text-xs text-blue-800">
              <li>• Be specific about what you want to learn</li>
              <li>• Ask follow-up questions if you need clarification</li>
              <li>• Share code snippets for debugging help</li>
              <li>• Tell me your current level to get tailored advice</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};
