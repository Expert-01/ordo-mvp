import React from 'react';
import { Card } from '../common/Card';
import { OpportunityCard } from './OpportunityCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { EmptyState } from '../common/EmptyState';

interface Opportunity {
  id: string;
  title: string;
  type: 'internship' | 'job' | 'scholarship' | 'hackathon';
  description: string;
  matchPercent: number;
  requiredSkills: string[];
  deadline?: string;
  link?: string;
}

interface OpportunityFeedProps {
  opportunities: Opportunity[];
  isLoading?: boolean;
  isEmpty?: boolean;
  onViewOpportunity?: (id: string) => void;
  onSaveOpportunity?: (id: string) => void;
}

export const OpportunityFeed: React.FC<OpportunityFeedProps> = ({
  opportunities,
  isLoading = false,
  isEmpty = false,
  onViewOpportunity,
  onSaveOpportunity,
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isEmpty || opportunities.length === 0) {
    return (
      <EmptyState
        title="No Opportunities Found"
        description="Try adjusting your filters or check back later for new opportunities"
        icon="🔍"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {opportunities.map((opp) => (
        <OpportunityCard
          key={opp.id}
          opportunity={opp}
          onView={() => onViewOpportunity?.(opp.id)}
          onSave={() => onSaveOpportunity?.(opp.id)}
        />
      ))}
    </div>
  );
};
