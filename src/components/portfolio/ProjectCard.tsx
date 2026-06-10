import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant="secondary" className={`text-xs ${getDifficultyColor(project.difficulty)}`}>
                {project.difficulty}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                ⏱️ {project.estimatedHours}h
              </Badge>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>

        {/* Date Range */}
        <div className="text-xs text-gray-500">
          {formatDate(project.startDate)} - {formatDate(project.endDate)}
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">Skills Used</p>
          <div className="flex flex-wrap gap-1">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 bg-gray-800 text-white rounded text-xs hover:bg-gray-900 transition-colors"
            >
              📌 GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
            >
              🔗 Live Demo
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-gray-200">
          <Button fullWidth variant="primary" size="sm" onClick={onEdit}>
            Edit
          </Button>
          <Button fullWidth variant="ghost" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
