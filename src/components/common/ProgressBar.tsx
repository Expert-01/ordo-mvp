import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'blue' | 'yellow' | 'red';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  height = 'md',
  color = 'green',
  className,
}) => {
  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colorClasses = {
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600',
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm font-medium text-gray-600">{clampedProgress}%</span>}
        </div>
      )}
      <div className={clsx('bg-gray-200 rounded-full overflow-hidden', heightClasses[height])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-300 ease-out', colorClasses[color])}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
