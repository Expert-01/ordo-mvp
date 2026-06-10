import React from 'react';
import { Card } from '../common/Card';
import { StatBox } from '../common/StatBox';

interface EmployabilityCardProps {
  score: number; // 0-100
  level?: string;
}

export const EmployabilityCard: React.FC<EmployabilityCardProps> = ({
  score = 42,
  level = 'Explorer',
}) => {
  const levelSubtext =
    score < 30 ? 'Just Starting' :
    score < 50 ? 'Keep Building' :
    score < 70 ? 'Making Progress' :
    'Almost There';

  return (
    <Card>
      <StatBox
        label="Employability Score"
        value={score}
        unit="%"
        icon={<span className="text-3xl">📊</span>}
      />
      <p className="text-xs text-gray-500 mt-4">{level} • {levelSubtext}</p>
    </Card>
  );
};
