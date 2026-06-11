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
        <p className="text-xs text-gray-600 mb-2 lg:mb-1.5">Current Milestone</p>
        <h3 className="text-sm font-semibold text-gray-900 mb-2 lg:mb-1.5 line-clamp-2 lg:mb-9">{title}</h3>
        <ProgressBar progress={progress} showPercentage label="" height="md" />

      </div>
    </Card>
  );
};
