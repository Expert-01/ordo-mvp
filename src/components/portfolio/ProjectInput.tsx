import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface ProjectInputProps {
  onSave?: (project: any) => void;
  onCancel?: () => void;
  initialData?: {
    title?: string;
    description?: string;
    skills?: string[];
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    estimatedHours?: number;
    githubUrl?: string;
    liveUrl?: string;
    startDate?: string;
    endDate?: string;
  };
}

const skillOptions = [
  'Python',
  'JavaScript',
  'React',
  'Node.js',
  'SQL',
  'MongoDB',
  'TypeScript',
  'CSS',
  'HTML',
  'Git',
  'Docker',
  'AWS',
  'API Design',
  'Machine Learning',
  'Data Analysis',
  'Figma',
  'UI/UX Design',
];

export const ProjectInput: React.FC<ProjectInputProps> = ({
  onSave,
  onCancel,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    skills: initialData.skills || [],
    difficulty: initialData.difficulty || ('beginner' as const),
    estimatedHours: initialData.estimatedHours || 0,
    githubUrl: initialData.githubUrl || '',
    liveUrl: initialData.liveUrl || '',
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
  });

  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'estimatedHours' ? parseInt(value) || 0 : value,
    }));
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim() && formData.skills.length > 0) {
      onSave?.(formData);
      setFormData({
        title: '',
        description: '',
        skills: [],
        difficulty: 'beginner',
        estimatedHours: 0,
        githubUrl: '',
        liveUrl: '',
        startDate: '',
        endDate: '',
      });
    }
  };

  return (
    <Card className="bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., E-Commerce Platform"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {/* Skills Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills Used *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSkillDropdown(!showSkillDropdown)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              {formData.skills.length === 0
                ? 'Select skills...'
                : `${formData.skills.length} skill(s) selected`}
            </button>

            {showSkillDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="max-h-64 overflow-y-auto p-3 grid grid-cols-2 gap-2">
                  {skillOptions.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={formData.skills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-600"
                      />
                      <span className="text-sm text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Selected Skills Tags */}
          {formData.skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {skill}
                  <button
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className="hover:text-green-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Grid: Difficulty, Hours, Dates */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hours
            </label>
            <input
              type="number"
              name="estimatedHours"
              value={formData.estimatedHours}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>
        </div>

        {/* URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Live URL
            </label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button fullWidth variant="primary" type="submit">
            Save Project
          </Button>
          <Button fullWidth variant="ghost" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
