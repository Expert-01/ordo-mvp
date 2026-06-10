import React from 'react';
import { Card } from '../common/Card';
import { StatBox } from '../common/StatBox';

interface ProfileCompletionCardProps {
  completionPercent: number; // 0-100
}

export const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({
  completionPercent = 70,
}) => {
  const status =
    completionPercent >= 90 ? 'Almost Complete!' :
    completionPercent >= 70 ? 'Almost There!' :
    completionPercent >= 50 ? 'Halfway Done' :
    'Just Started';

  return (
    <Card>
      <StatBox
        label="Profile Completion"
        value={completionPercent}
        unit="%"
        icon={<span className="text-3xl">✨</span>}
      />
      <p className="text-xs text-gray-500 mt-4">{status}</p>
    </Card>
  );
};
