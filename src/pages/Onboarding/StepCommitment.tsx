import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { Button } from '../../components/common/Button';

const OPTIONS = [
  '1-3 hours',
  '4-7 hours',
  '8-12 hours',
  '12+ hours'
];

const StepCommitment: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    localStorage.setItem('onboarding_commitment', selected);
    setIsLoading(false);
    navigate('/onboarding/stepLearning');
  };

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={7} totalSteps={10} labels={[
        'Welcome','Profile','Goal','Current Level','Interests','Skills','Commitment','Learning Style','Experience','Confirm'
      ]} />

      <div>
        <h2 className="text-2xl font-bold text-gray-900">How much time can you dedicate each week?</h2>
        <p className="text-gray-600 mt-1">This helps us tailor a realistic plan for your schedule.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelected(opt)}
              className={`w-full text-left p-4 rounded-lg border ${selected === opt ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white'}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/onboarding/step3')} className="flex-1">Back</Button>
          <Button type="submit" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white" disabled={!selected || isLoading}>{isLoading ? 'Saving...' : 'Continue'}</Button>
        </div>
      </form>
    </div>
  );
};

export default StepCommitment;
