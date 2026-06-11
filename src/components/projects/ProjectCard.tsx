import React, { useState } from 'react';
import { CheckCircle2, Clock, Package } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  status: 'available' | 'in-progress' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  requiredSkills: string[];
  progress?: number;
  estimatedHours: number;
  completedAt?: string;
  startedAt?: string;
  resources?: { label: string; url: string }[];
  learningOutcomes?: string[];
}

interface ProjectCardProps {
  project: ProjectDetail;
  onStart?: (projectId: string) => void;
  onContinue?: (projectId: string) => void;
  onView?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onStart,
  onContinue,
  onView,
}) => {
  const statusIcons = {
    'completed': CheckCircle2,
    'in-progress': Clock,
    'available': Package,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    return statusIcons[status as keyof typeof statusIcons] || Package;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {React.createElement(getStatusIcon(project.status), { size: 24, className: 'text-green-600' })}
              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
          <Badge
            variant="secondary"
            className={`text-xs flex-shrink-0 ${getDifficultyColor(project.difficulty)}`}
          >
            {project.difficulty}
          </Badge>
        </div>

        {/* Progress Bar (if in-progress) */}
        {project.status === 'in-progress' && project.progress !== undefined && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700">Progress</span>
              <span className="text-xs font-bold text-gray-900">{project.progress}%</span>
            </div>
            <ProgressBar progress={project.progress} />
          </div>
        )}

        {/* Stats */}
        <div className="flex gap-3 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            ⏱️ {project.estimatedHours}h
          </Badge>
          {project.requiredSkills.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              🛠️ {project.requiredSkills.length} skills
            </Badge>
          )}
          {project.status === 'completed' && project.completedAt && (
            <Badge variant="secondary" className="text-xs">
              ✓ {new Date(project.completedAt).toLocaleDateString()}
            </Badge>
          )}
        </div>

        {/* Required Skills */}
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">Required Skills</p>
          <div className="flex flex-wrap gap-1">
            {project.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-gray-200">
          {project.status === 'available' && (
            <>
              <Button
                fullWidth
                variant="primary"
                size="sm"
                onClick={() => onStart?.(project.id)}
              >
                Start Project
              </Button>
              <Button
                fullWidth
                variant="secondary"
                size="sm"
                onClick={() => onView?.(project.id)}
              >
                Details
              </Button>
            </>
          )}
          {project.status === 'in-progress' && (
            <>
              <Button
                fullWidth
                variant="primary"
                size="sm"
                onClick={() => onContinue?.(project.id)}
              >
                Continue
              </Button>
              <Button
                fullWidth
                variant="secondary"
                size="sm"
                onClick={() => onView?.(project.id)}
              >
                View
              </Button>
            </>
          )}
          {project.status === 'completed' && (
            <Button
              fullWidth
              variant="secondary"
              size="sm"
              onClick={() => onView?.(project.id)}
            >
              View Project
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
