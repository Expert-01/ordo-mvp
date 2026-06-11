import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { Button } from '../../components/common/Button';

const GOAL_OPTIONS = [
  { value: 'get-a-job', label: 'Get a job' },
  { value: 'learn-new-skills', label: 'Learn new skills' },
  { value: 'build-projects', label: 'Build projects' },
  { value: 'explore-options', label: 'Explore my options' },
];

const StepGoal: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setIsLoading(true);
    // mock save
    await new Promise((r) => setTimeout(r, 500));
    localStorage.setItem('onboarding_goal', selected);
    setIsLoading(false);
    navigate('/onboarding/stepCurrent');
  };

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={3} totalSteps={10} labels={[
        'Welcome','Profile','Goal','Current Level','Interests','Skills','Commitment','Learning Style','Experience','Confirm'
      ]} />

      <div>
        <h2 className="text-2xl font-bold text-gray-900">What's your main goal?</h2>
        <p className="text-gray-600 mt-1">Select the one that matters most to you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {GOAL_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => setSelected(o.value)}
              className={`w-full text-left p-4 rounded-lg border ${selected === o.value ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white'}`}
            >
              <div className="font-medium">{o.label}</div>
            </button>
          ))}
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/onboarding/step1')} className="flex-1">Back</Button>
          <Button type="submit" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white" disabled={!selected || isLoading}>{isLoading ? 'Saving...' : 'Continue'}</Button>
        </div>
      </form>
    </div>
  );
};

export default StepGoal;
