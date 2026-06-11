import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { Button } from '../../components/common/Button';

const OnboardingWelcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={1} totalSteps={10} labels={[
        'Welcome','Profile','Goal','Current Level','Interests','Skills','Commitment','Learning Style','Experience','Confirm'
      ]} />

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome to ORDO 👋</h1>
        <p className="text-gray-600 mt-2">Your career companion. Let's build your future, one step at a time.</p>
      </div>

      <div className="pt-6">
        <Button onClick={() => navigate('/onboarding/step1')} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          Get Started
        </Button>
        <div className="mt-3 text-center">
          <button className="text-sm text-gray-600" onClick={() => navigate('/')}>I already have an account</button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;
