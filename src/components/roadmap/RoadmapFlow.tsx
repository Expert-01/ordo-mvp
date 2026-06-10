import React, { useState } from 'react';
import { Card } from '../common/Card';
import { RoadmapNode } from './RoadmapNode';
import { MilestonePanel } from './MilestonePanel';
import { Badge } from '../common/Badge';

interface RoadmapNodeType {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress?: number;
  requiredSkills?: string[];
  recommendedResources?: { label: string; url: string }[];
  level?: 'beginner' | 'intermediate' | 'advanced';
}

interface RoadmapFlowProps {
  nodes: RoadmapNodeType[];
  onNodeClick?: (nodeId: string) => void;
}

export const RoadmapFlow: React.FC<RoadmapFlowProps> = ({
  nodes = [
    {
      id: '1',
      title: 'Python Foundations',
      description: 'Master the fundamentals of Python programming',
      status: 'completed',
      level: 'beginner',
      requiredSkills: ['Variables', 'Functions', 'Loops', 'Data Types'],
      recommendedResources: [
        { label: 'Python Official Docs', url: 'https://docs.python.org' },
        { label: 'CodeAcademy Python Course', url: 'https://codecademy.com' },
      ],
    },
    {
      id: '2',
      title: 'SQL Basics',
      description: 'Learn database querying and management',
      status: 'in-progress',
      level: 'intermediate',
      progress: 40,
      requiredSkills: ['SELECT', 'WHERE', 'JOIN', 'Aggregations'],
      recommendedResources: [
        { label: 'SQL Tutorial', url: 'https://w3schools.com/sql' },
        { label: 'LeetCode SQL Problems', url: 'https://leetcode.com' },
      ],
    },
    {
      id: '3',
      title: 'Data Structures',
      description: 'Understand and implement core data structures',
      status: 'locked',
      level: 'intermediate',
      requiredSkills: ['Arrays', 'Linked Lists', 'Trees', 'Graphs'],
    },
    {
      id: '4',
      title: 'Machine Learning Basics',
      description: 'Introduction to ML algorithms and implementations',
      status: 'locked',
      level: 'advanced',
      requiredSkills: ['Python', 'Statistics', 'Linear Algebra'],
    },
  ],
  onNodeClick,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // Calculate completion percentage
  const completedCount = nodes.filter((n) => n.status === 'completed').length;
  const completionPercentage = Math.round((completedCount / nodes.length) * 100);

  return (
    <div className="space-y-8">
      {/* Main Timeline */}
      <Card>
        <div className="space-y-6">
          {/* Header with progress */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Skills Timeline</h2>
              <Badge variant="secondary">{completionPercentage}% Complete</Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Timeline with visual connectors */}
          <div className="relative pt-4">
            {nodes.map((node, index) => (
              <div key={node.id} className="flex gap-6">
                {/* Left side: Timeline indicator */}
                <div className="flex flex-col items-center">
                  {/* Dot */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                      node.status === 'completed'
                        ? 'bg-green-600 text-white'
                        : node.status === 'in-progress'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {node.status === 'completed' && '✓'}
                    {node.status === 'in-progress' && '⚙️'}
                    {node.status === 'locked' && '🔒'}
                  </div>

                  {/* Connector line to next item */}
                  {index < nodes.length - 1 && (
                    <div
                      className={`w-1 h-12 ${
                        node.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>

                {/* Right side: Content */}
                <div
                  className="flex-1 pb-6 cursor-pointer"
                  onClick={() => {
                    setSelectedNodeId(node.id);
                    onNodeClick?.(node.id);
                  }}
                >
                  <RoadmapNode
                    node={{
                      ...node,
                      title: node.title,
                      description: node.description,
                      status: node.status,
                      progress: node.progress,
                      requiredSkills: node.requiredSkills,
                    }}
                    onClick={() => {
                      setSelectedNodeId(node.id);
                      onNodeClick?.(node.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Detail Panel */}
      {selectedNode && (
        <MilestonePanel
          title={selectedNode.title}
          description={selectedNode.description}
          status={selectedNode.status}
          progress={selectedNode.progress}
          requiredSkills={selectedNode.requiredSkills}
          recommendedResources={selectedNode.recommendedResources}
          onContinue={() => console.log('Continue learning:', selectedNode.id)}
        />
      )}
    </div>
  );
};
