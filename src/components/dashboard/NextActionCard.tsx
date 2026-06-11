import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface NextActionCardProps {
  title: string;
  estimatedDays: number;
  onStart?: () => void;
}

export const NextActionCard: React.FC<NextActionCardProps> = ({
  title = 'Complete Python Basics',
  estimatedDays = 5,
  onStart,
}) => {
  return (
    <Card>
      <div>
        <p className="text-xs text-gray-600 mb-2 lg:mb-1.5">Next Action</p>
        <h3 className="text-sm font-semibold text-gray-900 mb-2 lg:mb-1.5 line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-600 mb-2 lg:mb-1.5">
          Estimated Time: {estimatedDays} day{estimatedDays !== 1 ? 's' : ''}
        </p>
        <Button fullWidth variant="primary" size="sm" onClick={onStart}>
          Get Started
        </Button>
      </div>
    </Card>
  );
};
