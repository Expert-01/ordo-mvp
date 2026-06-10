import React from 'react';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

/**
 * OnboardingLayout - Container for multi-step onboarding flow
 * Left (60%): Form content
 * Right (40%): Progress visual + tips (hidden on mobile)
 */
export const OnboardingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex">
      {/* Left: Form Content */}
      <div
        className={clsx(
          'w-full md:w-3/5 flex flex-col justify-center',
          'px-6 md:px-12 py-12 md:py-0',
          'bg-white'
        )}
      >
        <div className="max-w-md mx-auto md:mx-0 w-full">
          <Outlet />
        </div>
      </div>

      {/* Right: Progress Visual (Hidden on mobile) */}
      <div
        className={clsx(
          'hidden md:flex w-2/5 flex-col justify-center items-center',
          'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600',
          'relative overflow-hidden p-12'
        )}
      >
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-white opacity-5 rounded-full blur-3xl"></div>

        {/* Onboarding Tips */}
        <div className="relative z-10 text-white max-w-sm">
          <h2 className="text-3xl font-bold mb-6">Your Learning Path</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="text-2xl">🎯</div>
              <div>
                <h3 className="font-semibold">Personalized Roadmap</h3>
                <p className="text-sm opacity-80">
                  We'll create a learning path based on your goals
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">📚</div>
              <div>
                <h3 className="font-semibold">Skill Building</h3>
                <p className="text-sm opacity-80">
                  Progress through curated projects and resources
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">💼</div>
              <div>
                <h3 className="font-semibold">Career Opportunities</h3>
                <p className="text-sm opacity-80">
                  Get matched with internships and jobs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
