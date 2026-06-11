import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Preloader from './components/common/Preloader'

const Landing = lazy(() => import('./pages/Landing'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Register = lazy(() => import('./pages/Auth/Register'))
import { OnboardingLayout } from './pages/Onboarding/OnboardingLayout'
import OnboardingStep1 from './pages/Onboarding/Step1Profile'
import OnboardingStep2 from './pages/Onboarding/Step2Interests'
import OnboardingStep3 from './pages/Onboarding/Step3Skills'
import OnboardingStep4 from './pages/Onboarding/Step4Complete'
import OnboardingWelcome from './pages/Onboarding/Step0Welcome'
import OnboardingGoal from './pages/Onboarding/StepGoal'
import OnboardingCurrent from './pages/Onboarding/StepCurrentLevel'
import OnboardingCommitment from './pages/Onboarding/StepCommitment'
import OnboardingLearning from './pages/Onboarding/StepLearningStyle'
import OnboardingExperience from './pages/Onboarding/StepExperience'
import { DashboardLayout } from './pages/Dashboard/DashboardLayout'
import Overview from './pages/Dashboard/Overview'
import Roadmap from './pages/Dashboard/Roadmap'
import Opportunities from './pages/Dashboard/Opportunities'
import Projects from './pages/Dashboard/Projects'
import Portfolio from './pages/Dashboard/Portfolio'
import Chat from './pages/Dashboard/Chat'

function App() {
  return (
    <Router>
      <Suspense fallback={<Preloader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        
          {/* Onboarding Routes */}
          <Route path="/onboarding" element={<OnboardingLayout />}>
            <Route index element={<OnboardingWelcome />} />
            <Route path="welcome" element={<OnboardingWelcome />} />
            <Route path="step1" element={<OnboardingStep1 />} />
            <Route path="stepGoal" element={<OnboardingGoal />} />
            <Route path="stepCurrent" element={<OnboardingCurrent />} />
            <Route path="step2" element={<OnboardingStep2 />} />
            <Route path="step3" element={<OnboardingStep3 />} />
            <Route path="stepCommitment" element={<OnboardingCommitment />} />
            <Route path="stepLearning" element={<OnboardingLearning />} />
            <Route path="stepExperience" element={<OnboardingExperience />} />
            <Route path="step4" element={<OnboardingStep4 />} />
          </Route>
        
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="overview" element={<Overview />} />
            <Route index element={<Overview />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="projects" element={<Projects />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App