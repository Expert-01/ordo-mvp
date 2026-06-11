import React from 'react';
import { CheckCircle2, Clock, Lock } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface RoadmapMilestone {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress?: number;
}

interface RoadmapPreviewProps {
  milestones: RoadmapMilestone[];
  onViewFull?: () => void;
}

export const RoadmapPreview: React.FC<RoadmapPreviewProps> = ({
  milestones = [
    { id: '1', title: 'Python Foundations', status: 'completed' },
    { id: '2', title: 'SQL Basics', status: 'in-progress', progress: 40 },
    { id: '3', title: 'Data Structures', status: 'locked' },
    { id: '4', title: 'Machine Learning Basics', status: 'locked' },
  ],
  onViewFull,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle2, bg: 'bg-green-600', text: 'text-white' };
      case 'in-progress':
        return { icon: Clock, bg: 'bg-green-400', text: 'text-white' };
      case 'locked':
        return { icon: Lock, bg: 'bg-gray-300', text: 'text-gray-600' };
      default:
        return { icon: Clock, bg: 'bg-gray-300', text: 'text-gray-600' };
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900">Your Roadmap</h2>
        <button
          onClick={onViewFull}
          className="text-green-600 hover:text-green-700 font-medium text-xs"
        >
          View full roadmap →
        </button>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-3">
        {milestones.map((milestone) => {
          const { icon: IconComponent, bg, text } = getStatusIcon(milestone.status);
          return (
            <div key={milestone.id} className="flex items-start gap-3">
              <div
                className={`w-7 h-7 ${bg} ${text} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold text-xs`}
              >
                {milestone.status === 'in-progress' && milestone.progress
                  ? `${milestone.progress}%`
                  : <IconComponent size={16} />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{milestone.title}</p>
                <p className="text-xs text-gray-600">
                  {milestone.status === 'completed' && 'Completed'}
                  {milestone.status === 'in-progress' && `In Progress • ${milestone.progress}%`}
                  {milestone.status === 'locked' && 'Locked'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
