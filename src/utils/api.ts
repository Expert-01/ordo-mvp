// API endpoint constants
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
