// Shared types used in both frontend and backend
export interface Student {
  id: string;
  name: string;
  email?: string;
  major?: string;
  career_goal?: string;
  created_at: string;
}

export interface Project {
  id: string;
  student_id: string;
  title: string;
  description: string;
  skills: string[];
  completed_at: string;
  created_at: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GeneratedCV {
  html: string;
  summary: string;
  skills_extracted: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  recommended_projects: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  type: "internship" | "job" | "scholarship" | "hackathon";
  description: string;
  required_skills: string[];
  link: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T | null;
  error: string | null;
}
