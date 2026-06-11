import React from 'react';
import { CheckCircle2, Lightbulb } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface SkillGapAnalysisProps {
  studentSkills: string[];
  requiredSkills: string[];
  title?: string;
}

export const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({
  studentSkills,
  requiredSkills,
  title = 'Skill Requirements',
}) => {
  const hasSkill = (skill: string) => studentSkills.includes(skill);
  const missingSkills = requiredSkills.filter((skill) => !hasSkill(skill));
  const matchPercent = Math.round(((requiredSkills.length - missingSkills.length) / requiredSkills.length) * 100);

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <div className="inline-flex items-center gap-2">
            <div className="text-sm text-gray-600">
              You have <span className="font-semibold">{requiredSkills.length - missingSkills.length}</span> of{' '}
              <span className="font-semibold">{requiredSkills.length}</span> required skills
            </div>
            <div className={`text-sm font-semibold ${matchPercent >= 75 ? 'text-green-600' : 'text-orange-600'}`}>
              ({matchPercent}%)
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              matchPercent >= 75 ? 'bg-green-600' : matchPercent >= 50 ? 'bg-yellow-600' : 'bg-orange-600'
            }`}
            style={{ width: `${matchPercent}%` }}
          />
        </div>

        {/* Skills Grid */}
        <div className="space-y-3">
          {/* Mastered Skills */}
          {requiredSkills.some((s) => hasSkill(s)) && (
            <div>
              <p className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-2">
                <CheckCircle2 size={14} />
                Mastered Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {requiredSkills
                  .filter((s) => hasSkill(s))
                  .map((skill) => (
                    <Badge key={skill} variant="success">
                      {skill}
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {missingSkills.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Missing Skills - Recommended to Learn</p>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <Badge key={skill} variant="warning">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Learning Suggestion */}
        {missingSkills.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="flex items-center gap-2 text-sm text-blue-900">
              <Lightbulb size={16} />
              Focus on learning <span className="font-semibold">{missingSkills[0]}</span> to improve your match for this opportunity.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
