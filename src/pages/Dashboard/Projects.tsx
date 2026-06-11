import React, { useState, useMemo } from 'react';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProjectDetailPanel } from '../../components/projects/ProjectDetailPanel';
import { ProjectsSidebar } from '../../components/projects/ProjectsSidebar';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  status: 'available' | 'in-progress' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  requiredSkills: string[];
  progress?: number;
  estimatedHours: number;
  completedAt?: string;
  startedAt?: string;
  resources?: { label: string; url: string }[];
  learningOutcomes?: string[];
}

// Mock projects data
const mockProjects: ProjectDetail[] = [
  {
    id: '1',
    title: 'Calculator App',
    description: 'Build a simple calculator using Python',
    longDescription:
      'Learn Python fundamentals by building a working calculator. This beginner-friendly project teaches you about functions, user input, and basic arithmetic operations. You\'ll practice writing clean code and handling errors.',
    status: 'completed',
    difficulty: 'beginner',
    requiredSkills: ['Python', 'Basic Logic'],
    estimatedHours: 4,
    completedAt: '2026-05-20',
    startedAt: '2026-05-18',
    resources: [
      { label: 'Python Documentation', url: 'https://docs.python.org' },
      { label: 'Interactive Tutorial', url: 'https://codecademy.com' },
    ],
    learningOutcomes: [
      'Understand Python syntax and operators',
      'Write functions and handle user input',
      'Debug and test your code',
    ],
  },
  {
    id: '2',
    title: 'Student Database System',
    description: 'Create a student management system using Python and SQL',
    longDescription:
      'Build a database application that demonstrates your understanding of relational databases and Python. Create tables, insert data, and write queries to retrieve and analyze student information. This project bridges the gap between Python programming and database management.',
    status: 'in-progress',
    difficulty: 'intermediate',
    requiredSkills: ['Python', 'SQL', 'Database Design'],
    progress: 65,
    estimatedHours: 12,
    startedAt: '2026-05-25',
    resources: [
      { label: 'SQL Tutorial', url: 'https://w3schools.com/sql' },
      { label: 'SQLite Guide', url: 'https://sqlite.org' },
      { label: 'Python Database', url: 'https://python.org/sql' },
    ],
    learningOutcomes: [
      'Design and create relational databases',
      'Write SQL queries (SELECT, INSERT, UPDATE, DELETE)',
      'Integrate databases with Python applications',
      'Understand data normalization',
    ],
  },
  {
    id: '3',
    title: 'Data Analysis Dashboard',
    description: 'Build a dashboard to visualize student performance data',
    longDescription:
      'Create an interactive dashboard using Python and data visualization libraries. Analyze datasets, generate insights, and present data visually. This project is essential for data science roles and demonstrates your ability to work with real-world data.',
    status: 'available',
    difficulty: 'intermediate',
    requiredSkills: ['Python', 'SQL', 'Data Visualization', 'Pandas'],
    estimatedHours: 16,
    resources: [
      { label: 'Matplotlib Guide', url: 'https://matplotlib.org' },
      { label: 'Pandas Tutorial', url: 'https://pandas.pydata.org' },
      { label: 'Plotly Documentation', url: 'https://plotly.com' },
    ],
    learningOutcomes: [
      'Load and analyze data with Pandas',
      'Create visualizations with Matplotlib/Plotly',
      'Generate meaningful insights from data',
      'Present data effectively',
    ],
  },
  {
    id: '4',
    title: 'Web Scraper',
    description: 'Build a web scraper to extract and analyze data',
    longDescription:
      'Learn web scraping by building a tool to extract data from websites. Use BeautifulSoup to parse HTML and store data in a database. This project teaches you about HTTP requests, HTML parsing, and data storage.',
    status: 'available',
    difficulty: 'intermediate',
    requiredSkills: ['Python', 'BeautifulSoup', 'HTTP', 'Data Storage'],
    estimatedHours: 10,
    resources: [
      { label: 'BeautifulSoup Docs', url: 'https://www.crummy.com/software/BeautifulSoup' },
      { label: 'Web Scraping Guide', url: 'https://docs.python-requests.org' },
    ],
    learningOutcomes: [
      'Understand HTTP requests and responses',
      'Parse HTML with BeautifulSoup',
      'Extract and clean data',
      'Handle web scraping responsibly',
    ],
  },
  {
    id: '5',
    title: 'ML Recommendation Engine',
    description: 'Build a machine learning model to recommend courses',
    longDescription:
      'Apply machine learning to create a recommendation system. Learn about feature engineering, model training, and evaluation. This advanced project demonstrates your understanding of ML algorithms and their real-world applications in personalization.',
    status: 'available',
    difficulty: 'advanced',
    requiredSkills: ['Python', 'Machine Learning', 'Scikit-learn', 'Data Preprocessing'],
    estimatedHours: 20,
    resources: [
      { label: 'Scikit-learn Guide', url: 'https://scikit-learn.org' },
      { label: 'ML Algorithms', url: 'https://machine-learning.org' },
    ],
    learningOutcomes: [
      'Preprocess and prepare data for ML',
      'Train and evaluate machine learning models',
      'Implement recommendation algorithms',
      'Optimize model performance',
    ],
  },
  {
    id: '6',
    title: 'API Design & Development',
    description: 'Create a RESTful API with authentication',
    longDescription:
      'Design and build a production-ready RESTful API. Implement authentication, error handling, and documentation. This project is crucial for backend development roles and demonstrates your ability to create scalable web services.',
    status: 'available',
    difficulty: 'advanced',
    requiredSkills: ['Python', 'Flask/Django', 'REST', 'Authentication', 'Database Design'],
    estimatedHours: 18,
    resources: [
      { label: 'Flask Documentation', url: 'https://flask.palletsprojects.com' },
      { label: 'REST Best Practices', url: 'https://restfulapi.net' },
      { label: 'JWT Auth', url: 'https://jwt.io' },
    ],
    learningOutcomes: [
      'Design RESTful API endpoints',
      'Implement authentication and authorization',
      'Handle errors and validation',
      'Write API documentation',
      'Deploy and secure APIs',
    ],
  },
];

const Projects: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get selected project for detail panel
  const selectedProject = mockProjects.find((p) => p.id === selectedProjectId);

  // Filter projects based on all criteria
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      // Status filter
      if (selectedStatus !== 'all' && project.status !== selectedStatus) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && project.difficulty !== selectedDifficulty) {
        return false;
      }

      // Skill filter
      if (selectedSkill && !project.requiredSkills.includes(selectedSkill)) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          project.title.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search) ||
          project.requiredSkills.some((skill) => skill.toLowerCase().includes(search))
        );
      }

      return true;
    });
  }, [selectedStatus, selectedDifficulty, selectedSkill, searchTerm]);

  // Calculate statistics
  const stats = {
    total: mockProjects.length,
    completed: mockProjects.filter((p) => p.status === 'completed').length,
    inProgress: mockProjects.filter((p) => p.status === 'in-progress').length,
    available: mockProjects.filter((p) => p.status === 'available').length,
    totalHours: mockProjects.reduce((sum, p) => sum + p.estimatedHours, 0),
    completedHours: mockProjects
      .filter((p) => p.status === 'completed')
      .reduce((sum, p) => sum + p.estimatedHours, 0),
  };

  return (
    <div className="space-y-8 mt-18">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Learning Projects</h1>
        <p className="text-gray-600 mt-2">
          Master technical skills through hands-on, project-based learning
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-xs text-gray-600 mt-1">Total Projects</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-xs text-gray-600 mt-1">Completed</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
            <p className="text-xs text-gray-600 mt-1">In Progress</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.available}</p>
            <p className="text-xs text-gray-600 mt-1">Available</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{stats.completedHours}</p>
            <p className="text-xs text-gray-600 mt-1">Hours Completed</p>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ProjectsSidebar
            selectedStatus={selectedStatus}
            selectedDifficulty={selectedDifficulty}
            selectedSkill={selectedSkill}
            onStatusChange={setSelectedStatus}
            onDifficultyChange={setSelectedDifficulty}
            onSkillChange={setSelectedSkill}
            skillOptions={[
              'All Skills',
              'Python',
              'SQL',
              'Data Visualization',
              'Machine Learning',
              'Flask',
              'BeautifulSoup',
            ]}
          />
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {selectedProject ? (
            // Detail View
            <ProjectDetailPanel
              project={selectedProject}
              onStart={(id) => console.log('Start project:', id)}
              onContinue={(id) => console.log('Continue project:', id)}
              onClose={() => setSelectedProjectId(null)}
            />
          ) : (
            // List View
            <div className="space-y-4">
              {/* Search Bar */}
              <div>
                <input
                  type="text"
                  placeholder="Search projects by name or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredProjects.length} of {mockProjects.length} projects
                </p>
                {(selectedStatus !== 'all' ||
                  selectedDifficulty !== 'all' ||
                  selectedSkill ||
                  searchTerm) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedStatus('all');
                      setSelectedDifficulty('all');
                      setSelectedSkill('');
                      setSearchTerm('');
                    }}
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Projects Grid */}
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onStart={(id) => console.log('Start:', id)}
                      onContinue={(id) => console.log('Continue:', id)}
                      onView={(id) => setSelectedProjectId(id)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <p className="text-gray-600 mb-4">
                    No projects match your filters. Try adjusting your search criteria.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedStatus('all');
                      setSelectedDifficulty('all');
                      setSelectedSkill('');
                      setSearchTerm('');
                    }}
                  >
                    View All Projects
                  </Button>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
