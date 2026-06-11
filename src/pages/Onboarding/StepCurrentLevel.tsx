import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { Button } from '../../components/common/Button';

const LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const StepCurrentLevel: React.FC = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!level) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    localStorage.setItem('onboarding_level', level);
    setIsLoading(false);
    navigate('/onboarding/step2');
  };

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={4} totalSteps={10} labels={[
        'Welcome','Profile','Goal','Current Level','Interests','Skills','Commitment','Learning Style','Experience','Confirm'
      ]} />

      <div>
        <h2 className="text-2xl font-bold text-gray-900">What's your current level?</h2>
        <p className="text-gray-600 mt-1">This helps us recommend the right content.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {LEVELS.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => setLevel(l.value)}
              className={`w-full text-left p-4 rounded-lg border ${level === l.value ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white'}`}
            >
              <div className="font-medium">{l.label}</div>
            </button>
          ))}
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/onboarding/stepGoal')} className="flex-1">Back</Button>
          <Button type="submit" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white" disabled={!level || isLoading}>{isLoading ? 'Saving...' : 'Continue'}</Button>
        </div>
      </form>
    </div>
  );
};

export default StepCurrentLevel;
