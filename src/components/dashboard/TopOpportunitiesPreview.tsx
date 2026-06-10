import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface Opportunity {
  id: string;
  title: string;
  type: 'internship' | 'job' | 'scholarship' | 'hackathon';
  matchPercent: number;
  icon?: string;
}

interface TopOpportunitiesPreviewProps {
  opportunities?: Opportunity[];
  onViewAll?: () => void;
}

const typeConfig = {
  internship: { badge: 'primary', icon: '💼', label: 'Internship' },
  job: { badge: 'success', icon: '👔', label: 'Job' },
  scholarship: { badge: 'secondary', icon: '🎓', label: 'Scholarship' },
  hackathon: { badge: 'warning', icon: '🏆', label: 'Hackathon' },
};

export const TopOpportunitiesPreview: React.FC<TopOpportunitiesPreviewProps> = ({
  opportunities = [
    { id: '1', title: 'Software Intern', type: 'internship', matchPercent: 85, icon: '💼' },
    { id: '2', title: 'Tech Hackathon 2026', type: 'hackathon', matchPercent: 72, icon: '🏆' },
    { id: '3', title: 'Full Stack Developer', type: 'job', matchPercent: 68, icon: '👔' },
  ],
  onViewAll,
}) => {
  const getMatchColor = (percent: number) => {
    if (percent >= 80) return 'text-green-600';
    if (percent >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Top Opportunities For You</h2>
        <button
          onClick={onViewAll}
          className="text-green-600 hover:text-green-700 font-medium text-sm"
        >
          View all →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opportunities.map((opp) => {
          const config = typeConfig[opp.type];
          return (
            <div key={opp.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Icon/Placeholder */}
              <div className="bg-gray-100 rounded h-24 mb-3 flex items-center justify-center text-3xl">
                {opp.icon || config.icon}
              </div>

              {/* Title */}
              <p className="font-semibold text-gray-900 mb-2">{opp.title}</p>

              {/* Type Badge */}
              <Badge variant={config.badge as any} className="mb-2">
                {config.label}
              </Badge>

              {/* Match Percentage */}
              <p className={`text-sm font-medium ${getMatchColor(opp.matchPercent)}`}>
                {opp.matchPercent}% match
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
