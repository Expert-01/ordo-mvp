import React from 'react';
import { CheckCircle2, Minus, AlertCircle } from 'lucide-react';
import { Card } from '../common/Card';

interface MatchBadgeProps {
  percentage: number;
  showLabel?: boolean;
}

export const MatchBadge: React.FC<MatchBadgeProps> = ({ percentage, showLabel = true }) => {
  const getColor = (percent: number) => {
    if (percent >= 80) return 'bg-green-100 text-green-700';
    if (percent >= 60) return 'bg-yellow-100 text-yellow-700';
    return 'bg-orange-100 text-orange-700';
  };

  const getIcon = (percent: number) => {
    if (percent >= 80) return CheckCircle2;
    if (percent >= 60) return Minus;
    return AlertCircle;
  };

  const IconComponent = getIcon(percentage);

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getColor(percentage)}`}>
      <IconComponent size={16} />
      {showLabel && <span>{percentage}% match</span>}
    </div>
  );
};
