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
        <p className="text-sm text-gray-600 mb-3">Next Action</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Estimated Time: {estimatedDays} day{estimatedDays !== 1 ? 's' : ''}
        </p>
        <Button fullWidth variant="primary" size="sm" onClick={onStart}>
          Get Started
        </Button>
      </div>
    </Card>
  );
};
