import React, { useState } from 'react';
import { CheckCircle2, Cog, Lock, BookOpen, Link as LinkIcon, Clock, Lightbulb } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface MilestonePanelProps {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress?: number;
  requiredSkills?: string[];
  recommendedResources?: { label: string; url: string }[];
  onContinue?: () => void;
  estimatedHours?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export const MilestonePanel: React.FC<MilestonePanelProps> = ({
  title,
  description,
  status,
  progress,
  requiredSkills = [],
  recommendedResources = [],
  onContinue,
  estimatedHours,
  difficulty,
}) => {
  const [expanded, setExpanded] = useState(false);

  const getDifficultyColor = (diff?: string) => {
    switch (diff) {
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

  const getStatusBgColor = (s: string) => {
    switch (s) {
      case 'completed':
        return 'bg-green-50 border-green-300';
      case 'in-progress':
        return 'bg-blue-50 border-blue-300';
      case 'locked':
        return 'bg-gray-50 border-gray-300';
      default:
        return 'bg-gray-50 border-gray-300';
    }
  };

  return (
    <Card className={`border-2 ${getStatusBgColor(status)}`}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-3 gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                <Badge
                  variant={status === 'completed' ? 'primary' : 'secondary'}
                  className={`flex items-center gap-1 ${
                    status === 'completed'
                      ? 'bg-green-600 text-white'
                      : status === 'in-progress'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-400 text-white'
                  }`}
                >
                  {status === 'completed' && <CheckCircle2 size={16} />}
                  {status === 'in-progress' && <Cog size={16} />}
                  {status === 'locked' && <Lock size={16} />}
                  {status === 'completed' && 'Completed'}
                  {status === 'in-progress' && 'In Progress'}
                  {status === 'locked' && 'Locked'}
                </Badge>
              </div>
              <p className="text-gray-600 text-lg">{description}</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-2 mt-3">
            {estimatedHours && (
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                <Clock size={14} />
                {estimatedHours} hours
              </Badge>
            )}
            {difficulty && (
              <Badge variant="secondary" className={`text-xs ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </Badge>
            )}
          </div>
        </div>

        {/* Progress */}
        {status === 'in-progress' && progress !== undefined && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-700">Progress</p>
              <p className="text-sm font-bold text-blue-600">{progress}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {progress < 50
                ? 'You are making good progress!'
                : progress < 100
                ? 'Almost there, keep going!'
                : 'Great job!'}
            </p>
          </div>
        )}

        {/* Required Skills Section */}
        {requiredSkills.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3 text-lg">
              <BookOpen size={20} />
              Required Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {requiredSkills.map((skill) => (
                <div
                  key={skill}
                  className="p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-700">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Resources Section */}
        {recommendedResources.length > 0 && (
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                <LinkIcon size={18} />
                Recommended Resources ({recommendedResources.length})
              </h3>
              <span className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expanded && (
              <div className="mt-3 space-y-2">
                {recommendedResources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-green-600 group-hover:text-green-700">
                        {resource.label}
                      </p>
                      <span className="text-xs text-gray-500">↗️</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          {status === 'in-progress' && onContinue && (
            <>
              <Button fullWidth variant="primary" size="lg" onClick={onContinue}>
                Continue Learning →
              </Button>
              <Button fullWidth variant="secondary" size="lg">
                Save Progress
              </Button>
            </>
          )}
          {status === 'completed' && (
            <Button fullWidth variant="secondary" size="lg">
              Review Material
            </Button>
          )}
          {status === 'locked' && (
            <Button fullWidth variant="secondary" size="lg" disabled>
              Locked - Complete Prerequisites
            </Button>
          )}
        </div>

        {/* Info Box */}
        {status === 'locked' && (
          <div className="p-3 bg-gray-100 border border-gray-300 rounded-lg">
            <p className="flex items-center gap-2 text-sm text-gray-700">
              <Lock size={16} />
              <span className="font-semibold">Locked:</span> Complete the previous milestone to unlock this one.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
