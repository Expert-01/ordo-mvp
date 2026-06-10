import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { SkillRating, SkillLevel } from '../../components/onboarding/SkillRating';
import { Button } from '../../components/common/Button';

interface SkillAssessment {
  id: string;
  name: string;
  category: string;
}

// Sample skills based on interests
const SKILLS_BY_INTEREST: { [key: string]: SkillAssessment[] } = {
  'AI/Machine Learning': [
    { id: 'python', name: 'Python', category: 'Programming' },
    { id: 'mathematics', name: 'Mathematics', category: 'Foundation' },
    { id: 'ml-algo', name: 'ML Algorithms', category: 'Specialized' },
  ],
  'Web Development': [
    { id: 'javascript', name: 'JavaScript', category: 'Programming' },
    { id: 'html-css', name: 'HTML/CSS', category: 'Foundation' },
    { id: 'react', name: 'React/Vue', category: 'Specialized' },
  ],
  'Data Science': [
    { id: 'python', name: 'Python', category: 'Programming' },
    { id: 'sql', name: 'SQL', category: 'Foundation' },
    { id: 'statistics', name: 'Statistics', category: 'Foundation' },
  ],
  'Mobile Apps': [
    { id: 'javascript', name: 'JavaScript', category: 'Programming' },
    { id: 'react-native', name: 'React Native', category: 'Specialized' },
    { id: 'swift', name: 'Swift/Kotlin', category: 'Specialized' },
  ],
  'Product Management': [
    { id: 'analytics', name: 'Data Analysis', category: 'Foundation' },
    { id: 'communication', name: 'Communication', category: 'Soft' },
    { id: 'business', name: 'Business Acumen', category: 'Foundation' },
  ],
};

/**
 * Onboarding Step 3: Skill Assessment
 * Path: /onboarding/step3
 * 
 * Collects: Current skill levels for 3-5 skills
 * Skills vary based on selected interests from Step 2
 */
const OnboardingStep3: React.FC = () => {
  const navigate = useNavigate();

  // Get interests from localStorage
  const step2Data = localStorage.getItem('onboarding_step2');
  const interests = step2Data ? JSON.parse(step2Data).interests : [];

  // Determine skills to assess (first 5 unique skills from selected interests)
  const skillsToAssess: SkillAssessment[] = [];
  const addedIds = new Set<string>();

  for (const interest of interests) {
    const matchingSkills = SKILLS_BY_INTEREST[interest] || [];
    for (const skill of matchingSkills) {
      if (!addedIds.has(skill.id)) {
        skillsToAssess.push(skill);
        addedIds.add(skill.id);
        if (skillsToAssess.length >= 5) break;
      }
    }
    if (skillsToAssess.length >= 5) break;
  }

  // Default to sample skills if no interests
  if (skillsToAssess.length === 0) {
    skillsToAssess.push(
      { id: 'python', name: 'Python', category: 'Programming' },
      { id: 'mathematics', name: 'Mathematics', category: 'Foundation' },
      { id: 'ml-algo', name: 'ML Algorithms', category: 'Specialized' }
    );
  }

  const [skillLevels, setSkillLevels] = useState<{ [key: string]: SkillLevel }>(
    Object.fromEntries(skillsToAssess.map((s) => [s.id, 'beginner']))
  );
  const [isLoading, setIsLoading] = useState(false);

  // Check if all skills have been rated
  const allRated = skillsToAssess.every((skill) => skillLevels[skill.id]);

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!allRated) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with real API call
      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save to localStorage (mock storage)
      localStorage.setItem(
        'onboarding_step3',
        JSON.stringify({ skillLevels })
      );

      // Navigate to step 4
      navigate('/onboarding/step4');
    } catch (error) {
      console.error('Failed to save skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <StepIndicator currentStep={3} />

      {/* Step Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What's your current skill level?
        </h2>
        <p className="text-gray-600">
          Rate your proficiency in these key areas
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Skill Ratings */}
        <div className="space-y-3">
          {skillsToAssess.map((skill) => (
            <SkillRating
              key={skill.id}
              skillId={skill.id}
              skillName={skill.name}
              selectedLevel={skillLevels[skill.id] as SkillLevel}
              onChange={(level) =>
                setSkillLevels({ ...skillLevels, [skill.id]: level })
              }
            />
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-900">
            <span className="font-semibold">
              {Object.keys(skillLevels).filter((k) => skillLevels[k]).length}
            </span>
            /{skillsToAssess.length} skills rated
            {allRated && ' ✓'}
          </p>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-600">
          These assessments help us recommend the best learning path for you.
          Don't worry about being perfectly accurate — you can update these anytime!
        </p>

        {/* Navigation Buttons */}
        <div className="pt-4 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/onboarding/step2')}
            disabled={isLoading}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !allRated}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingStep3;
