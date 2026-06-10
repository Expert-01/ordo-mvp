import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { OnboardingLayout } from './pages/Onboarding/OnboardingLayout'
import OnboardingStep1 from './pages/Onboarding/Step1Profile'
import OnboardingStep2 from './pages/Onboarding/Step2Interests'
import OnboardingStep3 from './pages/Onboarding/Step3Skills'
import OnboardingStep4 from './pages/Onboarding/Step4Complete'
import { DashboardLayout } from './pages/Dashboard/DashboardLayout'
import Overview from './pages/Dashboard/Overview'
import Roadmap from './pages/Dashboard/Roadmap'
import Opportunities from './pages/Dashboard/Opportunities'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Onboarding Routes */}
        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route path="step1" element={<OnboardingStep1 />} />
          <Route path="step2" element={<OnboardingStep2 />} />
          <Route path="step3" element={<OnboardingStep3 />} />
          <Route path="step4" element={<OnboardingStep4 />} />
        </Route>
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="overview" element={<Overview />} />
          <Route index element={<Overview />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="opportunities" element={<Opportunities />} />
          {/* Placeholder routes - to be implemented */}
          {/* <Route path="projects" element={<Projects />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} /> */}
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
