import React, { useState } from 'react';
import { RoadmapFlow } from '../../components/roadmap/RoadmapFlow';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

interface Skill {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'locked';
  level?: 'beginner' | 'intermediate' | 'advanced';
  progress?: number;
  description: string;
  requiredSkills?: string[];
  recommendedResources?: { label: string; url: string }[];
}

interface Project {
  id: string;
  name: string;
  requiredSkills: string[];
  status: 'available' | 'in-progress' | 'completed';
  description: string;
  estimatedHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Opportunity {
  id: string;
  title: string;
  type: 'internship' | 'job' | 'scholarship' | 'hackathon';
  requiredSkills: string[];
  status: 'available' | 'locked';
  deadline: string;
  company?: string;
}

interface RoadmapData {
  skills: Skill[];
  projects: Project[];
  opportunities: Opportunity[];
}

// Mock data matching the plan
const mockRoadmapData: RoadmapData = {
  skills: [
    {
      id: 'python',
      name: 'Python',
      status: 'completed',
      level: 'intermediate',
      progress: 100,
      description: 'Master Python fundamentals and advanced concepts',
      requiredSkills: ['Variables', 'Functions', 'Loops', 'Data Types'],
      recommendedResources: [
        { label: 'Python Official Docs', url: 'https://docs.python.org' },
        { label: 'CodeAcademy Python Course', url: 'https://codecademy.com' },
      ],
    },
    {
      id: 'sql',
      name: 'SQL',
      status: 'in-progress',
      level: 'intermediate',
      progress: 65,
      description: 'Learn database querying and management',
      requiredSkills: ['SELECT', 'WHERE', 'JOIN', 'Aggregations'],
      recommendedResources: [
        { label: 'SQL Tutorial', url: 'https://w3schools.com/sql' },
        { label: 'LeetCode SQL Problems', url: 'https://leetcode.com' },
      ],
    },
    {
      id: 'dsa',
      name: 'Data Structures',
      status: 'locked',
      description: 'Understand and implement core data structures',
      requiredSkills: ['Arrays', 'Linked Lists', 'Trees', 'Graphs'],
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      status: 'locked',
      description: 'Introduction to ML algorithms and implementations',
    },
  ],
  projects: [
    {
      id: 'p1',
      name: 'Calculator App',
      description: 'Build a simple calculator using Python',
      requiredSkills: ['Python'],
      status: 'completed',
      estimatedHours: 4,
      difficulty: 'beginner',
    },
    {
      id: 'p2',
      name: 'Student Database',
      description: 'Create a student management system using Python and SQL',
      requiredSkills: ['Python', 'SQL'],
      status: 'available',
      estimatedHours: 12,
      difficulty: 'intermediate',
    },
    {
      id: 'p3',
      name: 'Data Analysis Dashboard',
      description: 'Build a dashboard to visualize student performance data',
      requiredSkills: ['Python', 'SQL', 'Data Visualization'],
      status: 'locked',
      estimatedHours: 16,
      difficulty: 'intermediate',
    },
    {
      id: 'p4',
      name: 'ML Recommendation Engine',
      description: 'Build a simple ML model to recommend courses',
      requiredSkills: ['Python', 'Machine Learning'],
      status: 'locked',
      estimatedHours: 20,
      difficulty: 'advanced',
    },
  ],
  opportunities: [
    {
      id: 'o1',
      title: 'Software Engineer Intern - TechCorp',
      type: 'internship',
      company: 'TechCorp',
      requiredSkills: ['Python', 'SQL'],
      status: 'available',
      deadline: '2026-07-15',
    },
    {
      id: 'o2',
      title: 'AI Hackathon 2026',
      type: 'hackathon',
      requiredSkills: ['Python', 'Machine Learning'],
      status: 'locked',
      deadline: '2026-06-30',
    },
    {
      id: 'o3',
      title: 'Full Stack Developer - Startup',
      type: 'job',
      company: 'StartupXYZ',
      requiredSkills: ['Python', 'SQL', 'Web Development'],
      status: 'locked',
      deadline: 'Open',
    },
    {
      id: 'o4',
      title: 'Tech Scholar Program',
      type: 'scholarship',
      requiredSkills: ['Python', 'Leadership'],
      status: 'available',
      deadline: '2026-07-01',
    },
  ],
};

const Roadmap: React.FC = () => {
  const [expandedLane, setExpandedLane] = useState<string | null>(null);
  const data = mockRoadmapData;

  const getStatusColor = (
    status: 'completed' | 'in-progress' | 'locked' | 'available'
  ) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'available':
        return 'bg-purple-100 text-purple-800';
      case 'locked':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Career Roadmap</h1>
        <p className="text-gray-600 mt-2">
          Follow your personalized path to success with curated skills, projects, and opportunities
        </p>
      </div>

      {/* Skills Lane */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">📚 Skills Progression</h2>
            <Badge variant="secondary">
              {data.skills.filter((s) => s.status === 'completed').length} of{' '}
              {data.skills.length} Completed
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Master these core competencies to unlock projects and opportunities
          </p>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {data.skills.map((skill) => (
              <div
                key={skill.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  skill.status === 'completed'
                    ? 'border-green-200 bg-green-50'
                    : skill.status === 'in-progress'
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
                onClick={() => setExpandedLane(expandedLane === skill.id ? null : skill.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                  <span
                    className={`text-2xl ${
                      skill.status === 'completed'
                        ? '✓'
                        : skill.status === 'in-progress'
                        ? '⚙️'
                        : '🔒'
                    }`}
                  />
                </div>

                {skill.status === 'in-progress' && skill.progress !== undefined && (
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{skill.progress}% Complete</p>
                  </div>
                )}

                {skill.level && (
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getStatusColor(skill.status)}`}
                  >
                    {skill.level}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Projects Lane */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">🚀 Recommended Projects</h2>
            <Badge variant="secondary">
              {data.projects.filter((p) => p.status === 'completed').length} of{' '}
              {data.projects.length} Completed
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Apply your skills through hands-on projects that build your portfolio
          </p>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  project.status === 'completed'
                    ? 'border-green-200 bg-green-50'
                    : project.status === 'available'
                    ? 'border-purple-200 bg-purple-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  </div>
                  <span
                    className={`text-2xl flex-shrink-0 ${
                      project.status === 'completed'
                        ? '✓'
                        : project.status === 'available'
                        ? '▶️'
                        : '🔒'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      project.difficulty === 'beginner'
                        ? 'bg-green-100 text-green-800'
                        : project.difficulty === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {project.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {project.estimatedHours}h
                  </Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {project.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Opportunities Lane */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">💼 Opportunities</h2>
            <Badge variant="secondary">
              {data.opportunities.filter((o) => o.status === 'available').length} Available
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Internships, jobs, hackathons, and scholarships tailored to your journey
          </p>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {data.opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  opportunity.status === 'available'
                    ? 'border-purple-200 bg-purple-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{opportunity.title}</h3>
                    {opportunity.company && (
                      <p className="text-sm text-gray-600">{opportunity.company}</p>
                    )}
                  </div>
                  <span
                    className={`text-2xl flex-shrink-0 ${
                      opportunity.status === 'available' ? '✓' : '🔒'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      opportunity.type === 'internship'
                        ? 'bg-blue-100 text-blue-800'
                        : opportunity.type === 'job'
                        ? 'bg-green-100 text-green-800'
                        : opportunity.type === 'hackathon'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-pink-100 text-pink-800'
                    }`}
                  >
                    {opportunity.type}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Deadline: {opportunity.deadline}
                  </Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {opportunity.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Full Roadmap View */}
      <RoadmapFlow nodes={data.skills} />
    </div>
  );
};

export default Roadmap;
