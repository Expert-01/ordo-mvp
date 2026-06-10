import React from 'react';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

interface MilestoneCardProps {
  title: string;
  progress: number; // 0-100
  onContinue?: () => void;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  title = 'Python Foundations',
  progress = 40,
  onContinue,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onContinue?.();
    navigate('/dashboard/roadmap');
  };

  return (
    <Card>
      <div>
        <p className="text-sm text-gray-600 mb-3">Current Milestone</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <ProgressBar progress={progress} showPercentage label="" height="md" />
        <Button
          fullWidth
          variant="primary"
          size="sm"
          onClick={handleClick}
          className="mt-4"
        >
          Continue Learning
        </Button>
      </div>
    </Card>
  );
};
