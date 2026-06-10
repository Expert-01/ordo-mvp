import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress?: number;
  requiredSkills?: string[];
  recommendedProjects?: string[];
  level?: 'beginner' | 'intermediate' | 'advanced';
}

interface RoadmapNodeProps {
  node: RoadmapNode;
  onClick?: () => void;
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({ node, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-green-600', text: 'text-white', border: 'border-green-300', bgLight: 'bg-green-50' };
      case 'in-progress':
        return { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-300', bgLight: 'bg-blue-50' };
      case 'locked':
        return { bg: 'bg-gray-400', text: 'text-white', border: 'border-gray-300', bgLight: 'bg-gray-50' };
      default:
        return { bg: 'bg-gray-400', text: 'text-white', border: 'border-gray-300', bgLight: 'bg-gray-50' };
    }
  };

  const getLevelColor = (level?: string) => {
    switch (level) {
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

  const colors = getStatusColor(node.status);

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${colors.border} ${colors.bgLight}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-lg">{node.title}</h3>
            {node.level && (
              <Badge variant="secondary" className={`text-xs ${getLevelColor(node.level)}`}>
                {node.level}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">{node.description}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {/* Progress Bar */}
      {node.status === 'in-progress' && node.progress !== undefined && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-gray-700">Progress</p>
            <p className="text-xs text-gray-600">{node.progress}%</p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${node.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="mb-3">
        <Badge
          variant={node.status === 'completed' ? 'primary' : node.status === 'in-progress' ? 'secondary' : 'secondary'}
          className={colors.bg}
        >
          {node.status === 'completed' && '✓ Completed'}
          {node.status === 'in-progress' && '⚙️ In Progress'}
          {node.status === 'locked' && '🔒 Locked'}
        </Badge>
      </div>

      {/* Expandable Section */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          {node.requiredSkills && node.requiredSkills.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Required Skills:</p>
              <div className="flex flex-wrap gap-2">
                {node.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-2 py-1 bg-white border border-gray-300 text-gray-700 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {node.recommendedProjects && node.recommendedProjects.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Recommended Projects:</p>
              <ul className="space-y-1">
                {node.recommendedProjects.map((project, idx) => (
                  <li key={idx} className="text-xs text-gray-600">
                    • {project}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
