import React from 'react';
import { Briefcase, Shirt, GraduationCap, Trophy } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface Opportunity {
  id: string;
  title: string;
  type: 'internship' | 'job' | 'scholarship' | 'hackathon';
  matchPercent: number;
  icon?: React.ReactNode;
}

interface TopOpportunitiesPreviewProps {
  opportunities?: Opportunity[];
  onViewAll?: () => void;
}

const typeConfig = {
  internship: { badge: 'primary', icon: Briefcase, label: 'Internship' },
  job: { badge: 'success', icon: Shirt, label: 'Job' },
  scholarship: { badge: 'secondary', icon: GraduationCap, label: 'Scholarship' },
  hackathon: { badge: 'warning', icon: Trophy, label: 'Hackathon' },
};

export const TopOpportunitiesPreview: React.FC<TopOpportunitiesPreviewProps> = ({
  opportunities = [
    { id: '1', title: 'Software Intern', type: 'internship', matchPercent: 85 },
    { id: '2', title: 'Tech Hackathon 2026', type: 'hackathon', matchPercent: 72 },
    { id: '3', title: 'Full Stack Developer', type: 'job', matchPercent: 68 },
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
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900">Top Opportunities For You</h2>
        <button
          onClick={onViewAll}
          className="text-green-600 hover:text-green-700 font-medium text-xs"
        >
          View all →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {opportunities.map((opp) => {
          const config = typeConfig[opp.type];
          const IconComponent = config.icon;
          return (
            <div key={opp.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
              {/* Icon/Placeholder */}
              <div className="bg-gray-100 rounded h-16 mb-3 flex items-center justify-center text-green-600">
                {opp.icon || <IconComponent size={28} />}
              </div>

              {/* Title */}
              <p className="font-semibold text-gray-900 mb-2 text-sm">{opp.title}</p>

              {/* Type Badge */}
              <Badge variant={config.badge as any} className="mb-2">
                {config.label}
              </Badge>

              {/* Match Percentage */}
              <p className={`text-xs font-medium ${getMatchColor(opp.matchPercent)}`}>
                {opp.matchPercent}% match
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
