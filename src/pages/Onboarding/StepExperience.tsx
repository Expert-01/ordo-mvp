import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { Button } from '../../components/common/Button';

const OPTIONS = [
  'No experience',
  'Beginner projects',
  'Some academic projects',
  'Work experience'
];

const StepExperience: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    if (selected) localStorage.setItem('onboarding_experience', selected);
    setIsLoading(false);
    navigate('/onboarding/step4');
  };

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={9} totalSteps={10} labels={[
        'Welcome','Profile','Goal','Current Level','Interests','Skills','Commitment','Learning Style','Experience','Confirm'
      ]} />

      <div>
        <h2 className="text-2xl font-bold text-gray-900">Do you have any prior experience?</h2>
        <p className="text-gray-600 mt-1">Select the option that best describes you (optional).</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelected(opt)}
              className={`w-full text-left p-4 rounded-lg border ${selected === opt ? 'bg-green-50 border-green-600' : 'bg-white border-gray-200'}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/onboarding/stepLearning')} className="flex-1">Back</Button>
          <Button type="submit" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white">Finish</Button>
        </div>
      </form>
    </div>
  );
};

export default StepExperience;
