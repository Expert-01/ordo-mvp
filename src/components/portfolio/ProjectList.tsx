import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProjectCard } from './ProjectCard';

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

interface ProjectListProps {
  projects: Project[];
  onAddProject?: () => void;
  onEditProject?: (id: string) => void;
  onDeleteProject?: (id: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onAddProject,
  onEditProject,
  onDeleteProject,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <Button variant="primary" onClick={onAddProject}>
          + New Project
        </Button>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => onEditProject?.(project.id)}
              onDelete={() => onDeleteProject?.(project.id)}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <p className="text-gray-600 mb-4">
            {projects.length === 0
              ? 'No projects yet. Add your first project to build your portfolio!'
              : 'No projects match your search.'}
          </p>
          {projects.length === 0 && (
            <Button variant="primary" onClick={onAddProject}>
              Add First Project
            </Button>
          )}
        </Card>
      )}

      {/* Stats */}
      <Card className="bg-green-50 border border-green-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">{projects.length}</p>
            <p className="text-sm text-gray-600">Total Projects</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {projects.reduce((sum, p) => sum + p.estimatedHours, 0)}
            </p>
            <p className="text-sm text-gray-600">Estimated Hours</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {new Set(projects.flatMap((p) => p.skills)).size}
            </p>
            <p className="text-sm text-gray-600">Unique Skills</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
