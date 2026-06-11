// API endpoint constants
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/api/auth/register`,
  
  // Other endpoints
  CHAT: `${API_BASE_URL}/api/chat`,
  PORTFOLIO_GENERATE: `${API_BASE_URL}/api/portfolio/generate`,
  CAREER_PATH: `${API_BASE_URL}/api/career-path`,
  OPPORTUNITIES: `${API_BASE_URL}/api/opportunities`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

// Demo mode mock data
export const DEMO_DATA = {
  profile: {
    profileCompletion: 65,
    name: 'Demo User',
    email: 'demo@ordo.ai',
    major: 'Computer Science',
    gpa: 3.85,
    skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'SQL'],
  },
  dashboard: {
    milestones: [
      { id: 1, title: 'Complete React Basics', completed: true, date: '2026-05-15' },
      { id: 2, title: 'Build Portfolio Project', completed: true, date: '2026-05-28' },
      { id: 3, title: 'Apply to 5 Internships', completed: false, date: '2026-06-30' },
      { id: 4, title: 'Complete Interview Prep', completed: false, date: '2026-07-15' },
    ],
    employabilityScore: 78,
    nextAction: 'Complete your first portfolio project to boost your employability score',
    onboardingStep: 4,
  },
  opportunities: [
    {
      id: 1,
      title: 'Frontend Intern - Tech Corp',
      type: 'internship',
      company: 'Tech Corp',
      description: 'Exciting frontend internship opportunity',
      salary: '$20/hour',
      deadline: '2026-06-30',
    },
    {
      id: 2,
      title: 'Full Stack Developer Scholarship',
      type: 'scholarship',
      company: 'Code Academy',
      description: '$5000 scholarship for promising developers',
      deadline: '2026-07-15',
    },
  ],
  careerPath: {
    currentLevel: 'Junior Developer',
    nextLevel: 'Mid-level Developer',
    skills: ['Advanced React', 'System Design', 'DevOps Basics'],
    projectIdeas: ['Build a full-stack app', 'Contribute to open source'],
    estimatedMonths: 6,
  },
  portfolio: {
    projects: [
      {
        id: 1,
        title: 'ORDO Platform',
        description: 'AI-powered student success ecosystem',
        skills: ['React', 'TypeScript', 'Node.js'],
        link: 'https://github.com/demo/ordo',
      },
      {
        id: 2,
        title: 'Chat Application',
        description: 'Real-time messaging app with WebSockets',
        skills: ['Socket.io', 'Express', 'React'],
        link: 'https://github.com/demo/chat-app',
      },
    ],
    cv: {
      name: 'Demo User',
      email: 'demo@ordo.ai',
      phone: '(555) 123-4567',
      summary: 'Aspiring software developer with passion for building great products',
      skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'SQL'],
      experience: [],
    },
  },
};

export const isDemoMode = (): boolean => {
  return localStorage.getItem('demo_mode') === 'true';
};

// Helper to intercept fetch calls in demo mode
export const fetchWithDemoMode = async (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  if (!isDemoMode()) {
    return fetch(url, options);
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let mockData: any = null;
  if (url.includes('/chat')) {
    mockData = { statusCode: 200, data: { message: 'Demo response' } };
  } else if (url.includes('/portfolio')) {
    mockData = { statusCode: 200, data: DEMO_DATA.portfolio };
  } else if (url.includes('/career-path')) {
    mockData = { statusCode: 200, data: DEMO_DATA.careerPath };
  } else if (url.includes('/opportunities')) {
    mockData = { statusCode: 200, data: DEMO_DATA.opportunities };
  } else {
    mockData = { statusCode: 200, data: DEMO_DATA.dashboard };
  }

  return new Response(JSON.stringify(mockData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
