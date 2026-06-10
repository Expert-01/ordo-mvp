import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { Button } from '../../components/common/Button';

interface OnboardingSummary {
  profile?: {
    name: string;
    university: string;
    academicYear: string;
    gpa?: number;
  };
  interests?: string[];
  skills?: { [key: string]: string };
}

/**
 * Onboarding Step 4: Confirmation & Roadmap Generation
 * Path: /onboarding/step4
 * 
 * Displays: Summary of all entered data
 * Action: Trigger roadmap generation in background
 * Result: Redirect to /dashboard/overview
 */
const OnboardingStep4: React.FC = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<OnboardingSummary>({});
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load all onboarding data from localStorage
    const step1 = localStorage.getItem('onboarding_step1');
    const step2 = localStorage.getItem('onboarding_step2');
    const step3 = localStorage.getItem('onboarding_step3');

    const data: OnboardingSummary = {};

    if (step1) data.profile = JSON.parse(step1);
    if (step2) data.interests = JSON.parse(step2).interests;
    if (step3) data.skills = JSON.parse(step3).skillLevels;

    setSummary(data);

    // Simulate roadmap generation
    const generateRoadmap = async () => {
      try {
        // TODO: Replace with real API call
        // const response = await fetch('/api/onboarding/complete', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data),
        // });

        // Simulate progress updates
        for (let i = 0; i <= 100; i += 10) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          setProgress(i);
        }

        // Mark onboarding as complete
        localStorage.setItem('onboarding_complete', 'true');
        localStorage.setItem('onboarding_data', JSON.stringify(data));

        // Clean up onboarding steps
        localStorage.removeItem('onboarding_step1');
        localStorage.removeItem('onboarding_step2');
        localStorage.removeItem('onboarding_step3');

        setIsGenerating(false);

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/dashboard/overview');
        }, 2000);
      } catch (error) {
        console.error('Failed to complete onboarding:', error);
        setIsGenerating(false);
      }
    };

    generateRoadmap();
  }, [navigate]);

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <StepIndicator currentStep={4} />

      {isGenerating ? (
        // Loading State
        <div className="text-center space-y-8 py-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              You're all set!
            </h2>
            <p className="text-gray-600">
              Generating your personalized learning path...
            </p>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center">
            <div className="w-16 h-16">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-500"></div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-xs mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Generating roadmap
              </span>
              <span className="text-sm font-semibold text-green-600">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Tips */}
          <div className="text-left bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">✨ Pro tip:</span> Your learning
              path is completely personalized based on your interests and
              skills. You can update it anytime from your dashboard!
            </p>
          </div>
        </div>
      ) : (
        // Success State
        <div className="text-center space-y-6 py-12">
          <div className="text-5xl mb-4">✅</div>

          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Profile Complete!
            </h2>
            <p className="text-gray-600">
              Redirecting to your dashboard...
            </p>
          </div>

          {/* Summary Display */}
          {summary.profile && (
            <div className="bg-gray-50 rounded-lg p-6 text-left max-w-sm mx-auto space-y-3">
              <div>
                <p className="text-sm text-gray-600">Welcome</p>
                <p className="text-lg font-semibold text-gray-900">
                  {summary.profile.name}
                </p>
              </div>
              {summary.profile.university && (
                <div>
                  <p className="text-sm text-gray-600">University</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {summary.profile.university}
                  </p>
                </div>
              )}
              {summary.interests && summary.interests.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600">Interests</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {summary.interests.slice(0, 3).map((interest) => (
                      <span
                        key={interest}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                      >
                        {interest}
                      </span>
                    ))}
                    {summary.interests.length > 3 && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        +{summary.interests.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Navigation */}
          <Button
            onClick={() => navigate('/dashboard/overview')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6"
          >
            Go to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default OnboardingStep4;
