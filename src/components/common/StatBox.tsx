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
    <div className={clsx('flex items-center', className)}>
      {icon && <div className="mr-4 text-green-600">{icon}</div>}
      <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-lg text-gray-500 ml-1">{unit}</span>}
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
