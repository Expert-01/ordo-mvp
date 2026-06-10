import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface ProjectsSidebarProps {
  selectedStatus: string;
  selectedDifficulty: string;
  selectedSkill: string;
  onStatusChange?: (status: string) => void;
  onDifficultyChange?: (difficulty: string) => void;
  onSkillChange?: (skill: string) => void;
  skillOptions?: string[];
}

export const ProjectsSidebar: React.FC<ProjectsSidebarProps> = ({
  selectedStatus,
  selectedDifficulty,
  selectedSkill,
  onStatusChange,
  onDifficultyChange,
  onSkillChange,
  skillOptions = [
    'Python',
    'JavaScript',
    'React',
    'SQL',
    'API Design',
    'Git',
    'Web Development',
    'Data Structures',
    'All Skills',
  ],
}) => {
  const statuses = [
    { value: 'all', label: 'All Projects', icon: '📦' },
    { value: 'available', label: 'Available', icon: '🚀' },
    { value: 'in-progress', label: 'In Progress', icon: '⚙️' },
    { value: 'completed', label: 'Completed', icon: '✅' },
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'advanced', label: 'Advanced', color: 'bg-red-100 text-red-800' },
  ];

  return (
    <Card className="sticky top-20 h-fit">
      <div className="space-y-6">
        {/* Status Filter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
          <div className="space-y-2">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => onStatusChange?.(status.value)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  selectedStatus === status.value
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{status.icon}</span>
                <span>{status.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-gray-900 mb-3">Difficulty</h3>
          <div className="space-y-2">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => onDifficultyChange?.(diff.value)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                  selectedDifficulty === diff.value
                    ? diff.value === 'all'
                      ? 'bg-green-100 text-green-700 font-medium'
                      : `${diff.color} font-medium`
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Filter */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
          <div className="space-y-2">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => onSkillChange?.(skill === 'All Skills' ? '' : skill)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                  (selectedSkill === '' && skill === 'All Skills') ||
                  selectedSkill === skill
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="border-t border-gray-200 pt-4">
          <Button
            fullWidth
            variant="ghost"
            size="sm"
            onClick={() => {
              onStatusChange?.('all');
              onDifficultyChange?.('all');
              onSkillChange?.('');
            }}
          >
            Clear All Filters
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="border-t border-gray-200 pt-4 bg-blue-50 p-3 rounded-lg">
          <p className="text-xs font-medium text-blue-900 mb-2">💡 Tip</p>
          <p className="text-xs text-blue-800">
            Start with beginner projects to build confidence, then progress to more complex ones.
          </p>
        </div>
      </div>
    </Card>
  );
};
