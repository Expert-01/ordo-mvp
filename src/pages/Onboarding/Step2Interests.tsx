import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { InterestChips } from '../../components/onboarding/InterestChips';
import { Button } from '../../components/common/Button';

interface InterestCategory {
  [category: string]: string[];
}

const INTERESTS: InterestCategory = {
  Technology: [
    'AI/Machine Learning',
    'Web Development',
    'Mobile Apps',
    'Cybersecurity',
    'Cloud Computing',
    'Data Science',
  ],
  Design: ['UI/UX Design', 'Graphic Design', 'Product Design', 'Animation'],
  Business: [
    'Product Management',
    'Entrepreneurship',
    'Business Analysis',
    'Marketing',
  ],
  Other: ['Robotics', 'Blockchain', 'AR/VR', 'Gaming', 'IoT', 'DevOps'],
};

/**
 * Onboarding Step 2: Interests Selection
 * Path: /onboarding/step2
 * 
 * Collects: Selected interests (minimum 3)
 * Uses: InterestChips component for multi-select
 */
const OnboardingStep2: React.FC = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Flatten all interests into one array
  const allInterests = Object.values(INTERESTS).flat();

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedInterests.length < 3) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with real API call
      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save to localStorage (mock storage)
      localStorage.setItem(
        'onboarding_step2',
        JSON.stringify({ interests: selectedInterests })
      );

      // Navigate to step 3
      navigate('/onboarding/step3');
    } catch (error) {
      console.error('Failed to save interests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <StepIndicator currentStep={5} totalSteps={10} labels={[
        'Welcome','Profile','Goal','Current Level','Interests','Skills','Commitment','Learning Style','Experience','Confirm'
      ]} />

      {/* Step Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What interests you?
        </h2>
        <p className="text-gray-600">
          Select at least 3 areas to personalize your learning path
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Categories with Interests */}
        {Object.entries(INTERESTS).map(([category, interests]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {category}
            </h3>
            <InterestChips
              interests={interests}
              selectedInterests={selectedInterests}
              onSelect={setSelectedInterests}
              minSelection={3}
            />
          </div>
        ))}

        {/* Progress Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">{selectedInterests.length}</span>{' '}
            interest
            {selectedInterests.length !== 1 ? 's' : ''} selected
            {selectedInterests.length >= 3 && ' — Ready to continue!'}
          </p>
        </div>

        {/* Selected Interests Display */}
        {selectedInterests.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Your selected interests:
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => (
                <span
                  key={interest}
                  className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-4 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/onboarding/step1')}
            disabled={isLoading}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isLoading || selectedInterests.length < 3}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingStep2;
