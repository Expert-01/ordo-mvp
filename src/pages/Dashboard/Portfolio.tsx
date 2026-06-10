import React, { useState } from 'react';
import { ProjectList } from '../../components/portfolio/ProjectList';
import { ProjectInput } from '../../components/portfolio/ProjectInput';
import { CVPreview } from '../../components/portfolio/CVPreview';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
}

// Mock student data
const mockStudentData = {
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Passionate about building innovative tech solutions. Interested in full-stack development and AI.',
};

// Mock projects data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product listings, shopping cart, and payment integration with Stripe.',
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Authentication'],
    difficulty: 'intermediate',
    estimatedHours: 32,
    githubUrl: 'https://github.com/johndoe/ecommerce',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    startDate: '2025-09-01',
    endDate: '2026-01-15',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Developed a real-time task management application using React, Firebase, and Tailwind CSS. Includes drag-and-drop functionality, team collaboration, and push notifications.',
    skills: ['React', 'Firebase', 'CSS', 'Real-time DB'],
    difficulty: 'intermediate',
    estimatedHours: 20,
    githubUrl: 'https://github.com/johndoe/task-manager',
    liveUrl: 'https://task-manager.vercel.app',
    startDate: '2025-08-01',
    endDate: '2025-11-15',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Created a responsive weather dashboard that displays real-time weather data using the OpenWeatherMap API. Features include location search, detailed forecasts, and weather alerts.',
    skills: ['JavaScript', 'React', 'API Integration', 'CSS'],
    difficulty: 'beginner',
    estimatedHours: 8,
    githubUrl: 'https://github.com/johndoe/weather',
    liveUrl: 'https://weather-dashboard.vercel.app',
    startDate: '2025-06-01',
    endDate: '2025-07-15',
  },
];

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'preview'>('list');

  const handleAddProject = (newProject: Omit<Project, 'id'>) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
    };
    setProjects((prev) => [project, ...prev]);
    setShowProjectForm(false);
  };

  const handleEditProject = (projectId: string) => {
    setEditingProjectId(projectId);
    setShowProjectForm(true);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const allSkills = Array.from(
    new Set(projects.flatMap((p) => p.skills))
  ).sort();

  const handleDownloadCV = async () => {
    // Mock download - in real app, this would call backend API
    console.log('Downloading CV...');
    // API call: POST /api/portfolio/generate-cv
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Portfolio & CV Builder</h1>
        <p className="text-gray-600 mt-2">
          Showcase your projects and automatically generate a professional CV
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-3">
        <Button
          variant={viewMode === 'list' ? 'primary' : 'secondary'}
          onClick={() => setViewMode('list')}
        >
          📋 Project List
        </Button>
        <Button
          variant={viewMode === 'preview' ? 'primary' : 'secondary'}
          onClick={() => setViewMode('preview')}
        >
          📄 CV Preview
        </Button>
        <Button variant="secondary" onClick={handleDownloadCV}>
          ⬇️ Download CV
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Add Project or List */}
        <div className="lg:col-span-2">
          {viewMode === 'list' && (
            <>
              {showProjectForm ? (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {editingProjectId ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <ProjectInput
                    onSave={handleAddProject}
                    onCancel={() => {
                      setShowProjectForm(false);
                      setEditingProjectId(null);
                    }}
                  />
                </div>
              ) : (
                <ProjectList
                  projects={projects}
                  onAddProject={() => setShowProjectForm(true)}
                  onEditProject={handleEditProject}
                  onDeleteProject={handleDeleteProject}
                />
              )}
            </>
          )}

          {viewMode === 'preview' && (
            <CVPreview
              studentName={mockStudentData.name}
              studentEmail={mockStudentData.email}
              studentBio={mockStudentData.bio}
              projects={projects}
              skills={allSkills}
            />
          )}
        </div>

        {/* Right Section: Summary Cards */}
        <div className="lg:col-span-1">
          <div className="space-y-4 sticky top-24">
            {/* Portfolio Stats */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Portfolio Statistics</h3>

                <div className="border-t border-green-200 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">Total Projects</span>
                    <span className="text-2xl font-bold text-green-600">{projects.length}</span>
                  </div>
                </div>

                <div className="border-t border-green-200 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">Total Hours</span>
                    <span className="text-2xl font-bold text-green-600">
                      {projects.reduce((sum, p) => sum + p.estimatedHours, 0)}h
                    </span>
                  </div>
                </div>

                <div className="border-t border-green-200 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">Unique Skills</span>
                    <span className="text-2xl font-bold text-green-600">{allSkills.length}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Skills Cloud */}
            <Card>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Skills Used</h3>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Difficulty Breakdown */}
            <Card>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Difficulty Breakdown</h3>
                <div className="space-y-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((diff) => {
                    const count = projects.filter((p) => p.difficulty === diff).length;
                    const percentage = count > 0 ? Math.round((count / projects.length) * 100) : 0;
                    return (
                      <div key={diff}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700 capitalize">{diff}</span>
                          <span className="text-sm font-semibold text-gray-900">{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              diff === 'beginner'
                                ? 'bg-green-500'
                                : diff === 'intermediate'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* CV Info */}
            <Card className="bg-blue-50 border border-blue-200">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">💡 Pro Tips</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Add as many relevant projects as possible</li>
                  <li>✓ Include GitHub & live demo links</li>
                  <li>✓ Use specific technologies in descriptions</li>
                  <li>✓ Keep descriptions concise but informative</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
