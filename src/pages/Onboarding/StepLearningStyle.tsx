import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { Button } from '../../components/common/Button';

const STYLES = [
  'Video Lessons',
  'Read Articles',
  'Hands-on Projects',
  'Practice Quizzes',
  'Live Sessions'
];

const StepLearningStyle: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = (s: string) => {
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    localStorage.setItem('onboarding_learning_style', JSON.stringify(selected));
    setIsLoading(false);
    navigate('/onboarding/stepExperience');
  };

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={8} totalSteps={10} labels={[
        'Welcome','Profile','Goal','Current Level','Interests','Skills','Commitment','Learning Style','Experience','Confirm'
      ]} />

      <div>
        <h2 className="text-2xl font-bold text-gray-900">What's your preferred learning style?</h2>
        <p className="text-gray-600 mt-1">Choose one or two that suit you best.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {STYLES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(s)}
              className={`p-3 rounded-lg border text-left ${selected.includes(s) ? 'bg-green-50 border-green-600' : 'bg-white border-gray-200'}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/onboarding/stepCommitment')} className="flex-1">Back</Button>
          <Button type="submit" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white">Continue</Button>
        </div>
      </form>
    </div>
  );
};

export default StepLearningStyle;
