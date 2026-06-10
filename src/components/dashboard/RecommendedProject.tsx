import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface RecommendedProjectProps {
  title?: string;
  description?: string;
  skills?: string[];
  onViewDetails?: () => void;
}

export const RecommendedProject: React.FC<RecommendedProjectProps> = ({
  title = 'AI Study Planner',
  description = "You're doing great! Finish SQL Basics to unlock new projects and opportunities.",
  skills = ['Python', 'AI', 'Data Science'],
  onViewDetails,
}) => {
  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Project</h2>

      {/* Project Preview Image */}
      <div className="bg-green-100 rounded-lg h-24 mb-4 flex items-center justify-center text-green-600 text-3xl">
        📋
      </div>

      {/* Project Info */}
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      )}

      {/* Action Button */}
      <Button fullWidth variant="primary" onClick={onViewDetails}>
        View Project Details
      </Button>
    </Card>
  );
};
