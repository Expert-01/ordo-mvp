import React from 'react';
import clsx from 'clsx';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  labels?: string[];
}

/**
 * StepIndicator - Shows progress through onboarding steps
 * Displays: 1/4, 2/4, 3/4, 4/4 with visual dots
 */
export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps = 4,
  labels = ['Profile', 'Interests', 'Skills', 'Confirm'],
}) => {
  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={clsx(
              'flex-1 h-2 rounded-full transition-all',
              index < currentStep
                ? 'bg-green-500'
                : index === currentStep - 1
                ? 'bg-green-400'
                : 'bg-gray-200'
            )}
          />
        ))}
      </div>

      {/* Step Text & Label */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {labels[currentStep - 1]}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
