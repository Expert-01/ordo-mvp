import React from 'react';
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

interface ProjectDetailPanelProps {
  project: ProjectDetail;
  onStart?: (projectId: string) => void;
  onContinue?: (projectId: string) => void;
  onClose?: () => void;
}

export const ProjectDetailPanel: React.FC<ProjectDetailPanelProps> = ({
  project,
  onStart,
  onContinue,
  onClose,
}) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'available':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Status & Difficulty */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className={getStatusColor(project.status)}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
          <Badge
            variant="secondary"
            className={`${getDifficultyColor(project.difficulty)}`}
          >
            {project.difficulty}
          </Badge>
          <Badge variant="secondary">⏱️ {project.estimatedHours} hours</Badge>
        </div>

        {/* Long Description */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">About this Project</h3>
          <p className="text-gray-700 leading-relaxed">{project.longDescription}</p>
        </div>

        {/* Progress */}
        {project.status === 'in-progress' && project.progress !== undefined && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Your Progress</h3>
              <span className="text-lg font-bold text-blue-600">{project.progress}%</span>
            </div>
            <ProgressBar progress={project.progress} />
            <p className="text-sm text-gray-600 mt-2">
              {project.progress < 25
                ? '🚀 Just getting started!'
                : project.progress < 50
                ? '💪 Making good progress!'
                : project.progress < 75
                ? '🎯 Almost there!'
                : '🏁 Nearly done!'}
            </p>
          </div>
        )}

        {/* Required Skills */}
        {project.requiredSkills.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Required Skills</h3>
            <div className="grid grid-cols-2 gap-2">
              {project.requiredSkills.map((skill) => (
                <div
                  key={skill}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <p className="text-sm font-medium text-gray-900">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Outcomes */}
        {project.learningOutcomes && project.learningOutcomes.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">What You'll Learn</h3>
            <ul className="space-y-2">
              {project.learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex gap-2 text-gray-700">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resources */}
        {project.resources && project.resources.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">📚 Resources</h3>
            <div className="space-y-2">
              {project.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-900">{resource.label}</span>
                    <span className="text-blue-600">↗️</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600">Difficulty Level</p>
              <p className="font-semibold text-gray-900 capitalize">
                {project.difficulty}
              </p>
            </div>
            {project.startedAt && (
              <div>
                <p className="text-xs text-gray-600">Started</p>
                <p className="font-semibold text-gray-900">
                  {new Date(project.startedAt).toLocaleDateString()}
                </p>
              </div>
            )}
            {project.completedAt && (
              <div>
                <p className="text-xs text-gray-600">Completed</p>
                <p className="font-semibold text-gray-900">
                  {new Date(project.completedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          {project.status === 'available' && (
            <Button fullWidth variant="primary" size="lg" onClick={() => onStart?.(project.id)}>
              🚀 Start Project
            </Button>
          )}
          {project.status === 'in-progress' && (
            <Button
              fullWidth
              variant="primary"
              size="lg"
              onClick={() => onContinue?.(project.id)}
            >
              ▶️ Continue Learning
            </Button>
          )}
          {project.status === 'completed' && (
            <Button fullWidth variant="secondary" size="lg" disabled>
              ✅ Completed
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
