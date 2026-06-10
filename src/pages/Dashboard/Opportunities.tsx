import React, { useState } from 'react';
import { OpportunitySidebar } from '../../components/opportunities/OpportunitySidebar';
import { OpportunityFeed } from '../../components/opportunities/OpportunityFeed';
import { SkillGapAnalysis } from '../../components/opportunities/SkillGapAnalysis';

const Opportunities: React.FC = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSort, setSelectedSort] = useState('relevance');

  // Mock opportunities data
  const allOpportunities = [
    {
      id: '1',
      title: 'Software Engineering Intern',
      type: 'internship' as const,
      description: 'Work on exciting projects building scalable systems at a fast-paced startup',
      matchPercent: 85,
      requiredSkills: ['Python', 'React', 'Git'],
      deadline: '2026-07-15',
    },
    {
      id: '2',
      title: 'Web Development Hackathon',
      type: 'hackathon' as const,
      description: '48-hour coding challenge to build innovative web solutions',
      matchPercent: 72,
      requiredSkills: ['JavaScript', 'React', 'CSS'],
      deadline: '2026-06-20',
    },
    {
      id: '3',
      title: 'Junior Full Stack Developer',
      type: 'job' as const,
      description: 'Join our team building amazing products for enterprises worldwide',
      matchPercent: 68,
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL'],
      deadline: '2026-08-01',
    },
    {
      id: '4',
      title: 'Tech Scholarship Program',
      type: 'scholarship' as const,
      description: 'Full tuition scholarship for rising tech talent',
      matchPercent: 79,
      requiredSkills: ['Problem Solving', 'Leadership'],
      deadline: '2026-07-01',
    },
    {
      id: '5',
      title: 'Data Science Internship',
      type: 'internship' as const,
      description: 'Build machine learning models to solve real-world problems',
      matchPercent: 62,
      requiredSkills: ['Python', 'SQL', 'Machine Learning'],
      deadline: '2026-07-30',
    },
    {
      id: '6',
      title: 'Frontend Developer - Remote',
      type: 'job' as const,
      description: 'Create beautiful and responsive user interfaces',
      matchPercent: 81,
      requiredSkills: ['React', 'CSS', 'JavaScript', 'Figma'],
      deadline: '2026-08-15',
    },
  ];

  // Filter opportunities based on selected type
  const filteredOpportunities =
    selectedType === 'all'
      ? allOpportunities
      : allOpportunities.filter((opp) => opp.type === selectedType);

  // Sort opportunities
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    switch (selectedSort) {
      case 'match':
        return b.matchPercent - a.matchPercent;
      case 'deadline':
        return new Date(a.deadline || '').getTime() - new Date(b.deadline || '').getTime();
      case 'recent':
        return 0; // Would sort by date posted (mock data)
      case 'relevance':
      default:
        return b.matchPercent - a.matchPercent;
    }
  });

  const studentSkills = ['Python', 'JavaScript', 'React', 'Git', 'CSS', 'Problem Solving'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Opportunities Marketplace</h1>
        <p className="text-gray-600">Find internships, jobs, scholarships, and hackathons tailored to you</p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <OpportunitySidebar
            selectedType={selectedType}
            selectedSort={selectedSort}
            onFilterChange={setSelectedType}
            onSortChange={setSelectedSort}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Opportunities Feed */}
          <OpportunityFeed
            opportunities={sortedOpportunities}
            onViewOpportunity={(id) => console.log('View opportunity:', id)}
            onSaveOpportunity={(id) => console.log('Save opportunity:', id)}
          />

          {/* Skill Gap Analysis for first opportunity */}
          {sortedOpportunities.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Skills vs Requirements</h2>
              <SkillGapAnalysis
                studentSkills={studentSkills}
                requiredSkills={sortedOpportunities[0].requiredSkills}
                title={`${sortedOpportunities[0].title} - Requirements`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
