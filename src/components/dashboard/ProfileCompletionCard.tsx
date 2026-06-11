import React from 'react';
import { CheckCircle2 } from 'lucide-react';
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
        icon={<CheckCircle2 size={20} className="text-green-600" />}
      />
      <p className="text-xs text-gray-500 mt-2 lg:mt-1.5">{status}</p>
    </Card>
  );
};
