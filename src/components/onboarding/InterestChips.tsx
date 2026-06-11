import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

interface InterestChipsProps {
  interests: string[];
  selectedInterests: string[];
  onSelect: (interests: string[]) => void;
  minSelection?: number;
  maxSelection?: number;
}

/**
 * InterestChips - Multi-select tag component for interests
 * Shows clickable interest chips with selection state
 */
export const InterestChips: React.FC<InterestChipsProps> = ({
  interests,
  selectedInterests,
  onSelect,
  minSelection = 3,
  maxSelection = 10,
}) => {
  const handleToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      // Deselect if already selected
      onSelect(selectedInterests.filter((i) => i !== interest));
    } else if (selectedInterests.length < maxSelection) {
      // Select if under max
      onSelect([...selectedInterests, interest]);
    }
  };

  return (
    <div className="space-y-3">
      {/* Selected Count */}
      <p className="flex items-center gap-1 text-sm text-gray-600">
        {selectedInterests.length}/{minSelection} minimum selected
        {selectedInterests.length >= minSelection && <CheckCircle2 size={14} className="text-green-600" />}
      </p>

      {/* Chips Grid */}
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => handleToggle(interest)}
            className={clsx(
              'px-4 py-2 rounded-full font-medium transition-all text-sm',
              selectedInterests.includes(interest)
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {interest}
          </button>
        ))}
      </div>

      {/* Help Text */}
      {selectedInterests.length < minSelection && (
        <p className="text-sm text-orange-600">
          Select at least {minSelection - selectedInterests.length} more interest
          {minSelection - selectedInterests.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default InterestChips;
