import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface OpportunitySidebarProps {
  onFilterChange?: (type: string) => void;
  onSortChange?: (sort: string) => void;
  selectedType?: string;
  selectedSort?: string;
}

export const OpportunitySidebar: React.FC<OpportunitySidebarProps> = ({
  onFilterChange,
  onSortChange,
  selectedType = 'all',
  selectedSort = 'relevance',
}) => {
  const types = [
    { value: 'all', label: 'All Opportunities', count: 24 },
    { value: 'internship', label: 'Internships', count: 8 },
    { value: 'job', label: 'Jobs', count: 12 },
    { value: 'scholarship', label: 'Scholarships', count: 3 },
    { value: 'hackathon', label: 'Hackathons', count: 1 },
  ];

  const sorts = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'deadline', label: 'Nearest Deadline' },
    { value: 'match', label: 'Best Match' },
    { value: 'recent', label: 'Recently Posted' },
  ];

  return (
    <Card className="sticky top-20 h-fit">
      <div className="space-y-6">
        {/* Type Filter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Type</h3>
          <div className="space-y-2">
            {types.map((type) => (
              <button
                key={type.value}
                onClick={() => onFilterChange?.(type.value)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedType === type.value
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{type.label}</span>
                  <span className="text-xs text-gray-500">{type.count}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
          <div className="space-y-2">
            {sorts.map((sort) => (
              <button
                key={sort.value}
                onClick={() => onSortChange?.(sort.value)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                  selectedSort === sort.value
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          fullWidth
          variant="ghost"
          size="sm"
          onClick={() => {
            onFilterChange?.('all');
            onSortChange?.('relevance');
          }}
        >
          Clear All
        </Button>
      </div>
    </Card>
  );
};
