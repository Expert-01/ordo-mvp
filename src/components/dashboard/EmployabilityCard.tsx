import React from 'react';
import { BarChart3, Info } from 'lucide-react';
import { Card } from '../common/Card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface EmployabilityCardProps {
  score: number; // 0-100
  level?: string;
}

export const EmployabilityCard: React.FC<EmployabilityCardProps> = ({
  score = 42,
  level = 'Explorer',
}) => {
  const levelSubtext =
    score < 30 ? 'Just Starting' :
    score < 50 ? 'Keep Building' :
    score < 70 ? 'Making Progress' :
    'Almost There';

  // Data for donut chart
  const chartData = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  return (
    <Card className="border border-[#212E25]/46 p-4 lg:p-3">
      {/* Header with title and info icon */}
      <div className="flex items-center justify-between mb-3 lg:mb-2">
        <h3 className="text-xs lg:text-sm font-medium text-gray-600">Employability Score</h3>
        <Info size={16} className="text-gray-400 cursor-help" />
      </div>

      {/* Main content: Left (stats) + Right (chart) */}
      <div className="flex items-center justify-between gap-3 lg:gap-4">
        {/* Left: Percentage and level */}
        <div className="flex-1 min-w-0">
          <div className="mb-2 lg:mb-3">
            <span className="text-3xl lg:text-4xl font-medium text-green-700">{score}</span>
            <span className="text-lg lg:text-xl font-semibold text-gray-600 ml-0.5">%</span>
          </div>
          <p className="text-xs lg:text-sm text-gray-600 leading-tight">
            <span className="font-medium text-gray-800">{level}</span>
            <span className="text-gray-500"> • </span>
            <span className="text-gray-600 hidden lg:inline">{levelSubtext}</span>
          </p>
        </div>

        {/* Right: Donut chart */}
        <div className="flex-shrink-0 w-20 h-20 lg:w-28 lg:h-28">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={27}
                outerRadius={40}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                <Cell fill="#16a34a" /> {/* green-600 */}
                <Cell fill="#e5e7eb" /> {/* gray-200 */}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
