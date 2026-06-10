import React from 'react';
import clsx from 'clsx';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

interface SkillRatingProps {
  skillId: string;
  skillName: string;
  selectedLevel?: SkillLevel;
  onChange: (level: SkillLevel) => void;
}

/**
 * SkillRating - Single skill level selector with radio buttons
 * Levels: Beginner, Intermediate, Advanced
 */
export const SkillRating: React.FC<SkillRatingProps> = ({
  skillId,
  skillName,
  selectedLevel,
  onChange,
}) => {
  const levels: { value: SkillLevel; label: string; description: string }[] = [
    {
      value: 'beginner',
      label: 'Beginner',
      description: 'Just starting out',
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
      description: 'Some experience',
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description: 'Proficient',
    },
  ];

  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      {/* Skill Name */}
      <h4 className="font-semibold text-gray-900">{skillName}</h4>

      {/* Radio Buttons */}
      <div className="space-y-2">
        {levels.map((level) => (
          <div key={level.value} className="flex items-center">
            <input
              type="radio"
              id={`${skillId}-${level.value}`}
              name={skillId}
              value={level.value}
              checked={selectedLevel === level.value}
              onChange={() => onChange(level.value)}
              className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
            />
            <label
              htmlFor={`${skillId}-${level.value}`}
              className="ml-3 flex flex-1 items-start cursor-pointer"
            >
              <div>
                <p className="font-medium text-gray-900">{level.label}</p>
                <p className="text-sm text-gray-600">{level.description}</p>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillRating;
