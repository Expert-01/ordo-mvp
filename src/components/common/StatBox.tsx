import React from 'react';
import clsx from 'clsx';

interface StatBoxProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
  className?: string;
}

export const StatBox: React.FC<StatBoxProps> = ({
  label,
  value,
  unit,
  icon,
  trend,
  trendValue,
  className,
}) => {
  return (
    <div className={clsx('flex items-start gap-2 lg:gap-3', className)}>
      {icon && <div className="mt-0.5 text-green-600 flex-shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-xs lg:text-sm text-gray-600 mb-1">{label}</p>
        <div className="flex items-baseline flex-wrap gap-1">
          <span className="text-2xl lg:text-3xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-sm lg:text-lg text-gray-500">{unit}</span>}
        </div>
        {trend && trendValue && (
          <p className={clsx('text-xs mt-1', trend === 'up' ? 'text-green-600' : 'text-red-600')}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </p>
        )}
      </div>
    </div>
  );
};
