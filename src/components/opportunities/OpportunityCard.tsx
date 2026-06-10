import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { MatchBadge } from './MatchBadge';

interface Opportunity {
  id: string;
  title: string;
  type: 'internship' | 'job' | 'scholarship' | 'hackathon';
  description: string;
  matchPercent: number;
  requiredSkills: string[];
  deadline?: string;
  link?: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onView?: () => void;
  onSave?: () => void;
}

const typeConfig = {
  internship: { badge: 'primary', icon: '💼', label: 'Internship' },
  job: { badge: 'success', icon: '👔', label: 'Job' },
  scholarship: { badge: 'secondary', icon: '🎓', label: 'Scholarship' },
  hackathon: { badge: 'warning', icon: '🏆', label: 'Hackathon' },
};

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onView,
  onSave,
}) => {
  const config = typeConfig[opportunity.type];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{config.icon}</span>
              <Badge variant={config.badge as any}>{config.label}</Badge>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{opportunity.title}</h3>
          </div>
          <MatchBadge percentage={opportunity.matchPercent} showLabel={false} />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{opportunity.description}</p>

        {/* Required Skills */}
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">Required Skills</p>
          <div className="flex flex-wrap gap-1">
            {opportunity.requiredSkills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {opportunity.requiredSkills.length > 3 && (
              <span className="text-xs text-gray-500">+{opportunity.requiredSkills.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Match Percentage */}
        <div className="pt-2 border-t border-gray-200">
          <MatchBadge percentage={opportunity.matchPercent} />
        </div>

        {/* Deadline if available */}
        {opportunity.deadline && (
          <p className="text-xs text-gray-500">Deadline: {opportunity.deadline}</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button fullWidth variant="primary" size="sm" onClick={onView}>
            View Details
          </Button>
          <Button fullWidth variant="ghost" size="sm" onClick={onSave}>
            💾
          </Button>
        </div>
      </div>
    </Card>
  );
};
