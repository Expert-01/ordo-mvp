import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { HeroSection } from '../../components/dashboard/HeroSection';
import { EmployabilityCard } from '../../components/dashboard/EmployabilityCard';
import { MilestoneCard } from '../../components/dashboard/MilestoneCard';
import { NextActionCard } from '../../components/dashboard/NextActionCard';
import { ProfileCompletionCard } from '../../components/dashboard/ProfileCompletionCard';
import { RoadmapPreview } from '../../components/dashboard/RoadmapPreview';
import { RecommendedProject } from '../../components/dashboard/RecommendedProject';
import { TopOpportunitiesPreview } from '../../components/dashboard/TopOpportunitiesPreview';
import {} from 'lucide-react'
/**
 * Dashboard Overview Page
 * Path: /dashboard or /dashboard/overview
 * 
 * Main dashboard home page showing:
 * - User greeting & hero section
 * - 4 quick stat cards (employability, milestone, next action, profile completion)
 * - Roadmap preview (first 4 milestones)
 * - Recommended project
 * - Top 3 opportunities
 * 
 * API Integration Points:
 * - GET /api/auth/student/:id → Load student profile
 * - GET /api/career-path/:studentId → Load career roadmap
 * - GET /api/opportunities?studentId=X&limit=3 → Top opportunities
 * - GET /api/portfolio?studentId=X&limit=1 → Latest project
 */
const Overview: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Replace with real API calls using useApi hook
  // const { data: studentData, loading: studentLoading } = useApi('/api/auth/student/:id');
  // const { data: progress, loading: progressLoading } = useApi('/api/roadmap/progress/:id');
  // const { data: roadmap, loading: roadmapLoading } = useApi('/api/career-path/:id');
  // const { data: opportunities, loading: opportunitiesLoading } = useApi('/api/opportunities?limit=3');

  // Get user info from localStorage (from registration/onboarding)
  const userName = localStorage.getItem('student_name') || 'Student';

  useEffect(() => {
    // Simulate data loading
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingSpinner fullPage message="Loading your dashboard..." />
      </div>
    );
  }

  // ============================================================================
  // MOCK DATA - Replace these with real API responses
  // ============================================================================

  // Stats & Progress
  const studentStats = {
    employabilityScore: 42,
    level: 'Explorer',
    nextLevel: 'Adventurer',
    pointsToNextLevel: 158,
    profileCompletion: 70,
  };

  // Current Milestone Progress
  const currentMilestone = {
    id: 'sql-basics',
    title: 'SQL Basics',
    progress: 65,
    estimatedDaysLeft: 3,
    tasksCompleted: 13,
    tasksTotal: 20,
    unlockedAt: '2026-05-28',
  };

  // Next Action (recommended)
  const nextAction = {
    id: 'action-1',
    title: 'Complete SQL Query Advanced Exercise',
    description: 'Practice complex JOIN operations',
    estimatedMinutes: 30,
    priority: 'high' as const,
    type: 'exercise' as const,
  };

  // Career Roadmap Milestones (first 4)
  const milestones = [
    {
      id: '1',
      title: 'Python Foundations',
      status: 'completed' as const,
      completedAt: '2026-05-20',
      daysSpent: 7,
    },
    {
      id: '2',
      title: 'SQL Basics',
      status: 'in-progress' as const,
      progress: 65,
      daysLeft: 3,
      startedAt: '2026-05-28',
    },
    {
      id: '3',
      title: 'Data Structures & Algorithms',
      status: 'locked' as const,
      unlocksAt: '2026-06-25',
      estimatedDays: 10,
    },
    {
      id: '4',
      title: 'Machine Learning Basics',
      status: 'locked' as const,
      unlocksAt: '2026-07-20',
      estimatedDays: 14,
    },
  ];

  // Recommended Project
  const recommendedProject = {
    id: 'project-1',
    title: 'Student Database Management System',
    description:
      'Build a full-stack application to manage student records using Python, SQL, and Flask',
    skills: ['Python', 'SQL', 'Flask', 'Database Design'],
    difficulty: 'intermediate' as const,
    estimatedHours: 12,
    matchPercentage: 92,
    icon: '🗄️',
    unlocksAfterMilestone: 'sql-basics',
  };

  // Top Opportunities
  const topOpportunities = [
    {
      id: 'opp-1',
      title: 'Summer Internship - Data Analytics',
      company: 'Google',
      type: 'internship' as const,
      matchPercent: 88,
      deadline: '2026-07-15',
      icon: '💼',
      description: 'Join our Data Analytics team for summer 2026',
    },
    {
      id: 'opp-2',
      title: 'AI/ML Hackathon 2026',
      company: 'TechCrunch',
      type: 'hackathon' as const,
      matchPercent: 76,
      deadline: '2026-06-30',
      icon: '🏆',
      description: '48-hour hackathon focused on AI/ML applications',
    },
    {
      id: 'opp-3',
      title: 'Full Stack Developer Role',
      company: 'StartupXYZ',
      type: 'job' as const,
      matchPercent: 72,
      deadline: 'Open',
      icon: '👔',
      description: 'Entry-level full stack developer position',
    },
  ];

  // ============================================================================
  // COMPONENT RENDERING
  // ============================================================================

  return (
    <div className="space-y-6 bg-[#F4FFF3]">
      {/* Section 1: Hero Greeting */}
      <HeroSection userName={userName} />

      {/* Section 2: Quick Stats Grid (wider 3-column layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card A: Employability Score */}
        <EmployabilityCard
          score={studentStats.employabilityScore}
          level={studentStats.level}
          nextLevel={studentStats.nextLevel}
          pointsToNext={studentStats.pointsToNextLevel}
        />

        {/* Card B: Current Milestone Progress */}
        <MilestoneCard
          title={currentMilestone.title}
          progress={currentMilestone.progress}
          tasksCompleted={currentMilestone.tasksCompleted}
          tasksTotal={currentMilestone.tasksTotal}
          daysLeft={currentMilestone.estimatedDaysLeft}
        />

        {/* Card C: Next Action */}
        <NextActionCard
          title={nextAction.title}
          estimatedMinutes={nextAction.estimatedMinutes}
          priority={nextAction.priority}  
        />

        {/* Card D: Profile Completion */}
      
      </div>

      {/* Section 3: Career Roadmap Preview + Recommended Project (side-by-side) */}
      <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <div className="lg:col-span-2">
          <RoadmapPreview
            milestones={milestones}
            onViewFull={() => navigate('/dashboard/roadmap')}
            totalMilestones={8}
          />
        </div>

        <RecommendedProject
          title={recommendedProject.title}
          description={recommendedProject.description}
          skills={recommendedProject.skills}
          difficulty={recommendedProject.difficulty}
          estimatedHours={recommendedProject.estimatedHours}
          matchPercentage={recommendedProject.matchPercentage}
          icon={recommendedProject.icon}
          onViewDetails={() => {
            // TODO: Navigate to project detail page when built
            console.log('View project details');
          }}
          onStartProject={() => {
            // TODO: Start project
            console.log('Start project');
          }}
        />
      </div>

      {/* Section 4: Top Opportunities (full-width below roadmap/project) */}
      <div className="mt-4">
        <TopOpportunitiesPreview
          opportunities={topOpportunities.map((opp) => ({
            id: opp.id,
            title: opp.title,
            company: opp.company,
            type: opp.type,
            matchPercent: opp.matchPercent,
            deadline: opp.deadline,
            icon: opp.icon,
          }))}
          onViewAll={() => navigate('/dashboard/opportunities')}
          onApply={(opportunityId) => {
            // TODO: Handle opportunity application
            console.log('Apply to opportunity:', opportunityId);
          }}
        />
      </div>

      {/* Section 5: Quick Tips */}
      <div className="mt-2">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <div className="flex gap-3">
            <div className="text-2xl flex-shrink-0">💡</div>
            <div>
              <h3 className="font-semibold text-blue-900 text-sm">Quick Tip</h3>
              <p className="text-sm text-blue-800 mt-1">
                Complete your current milestone to unlock new projects and opportunities.
                You're {currentMilestone.progress}% done with SQL Basics!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
