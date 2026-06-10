import { useState } from 'react';
import axios from 'axios';
import { DEMO_DATA, isDemoMode } from '../utils/api';

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  call: (body?: any) => Promise<T | null>;
}

export const useApi = <T = any>(url: string): UseApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = async (body?: any): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      // Handle demo mode
      if (isDemoMode()) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let mockData: any = null;
        if (url.includes('/chat')) {
          mockData = { message: 'Demo mode - chat response', type: 'text' };
        } else if (url.includes('/portfolio')) {
          mockData = DEMO_DATA.portfolio;
        } else if (url.includes('/career-path')) {
          mockData = DEMO_DATA.careerPath;
        } else if (url.includes('/opportunities')) {
          mockData = DEMO_DATA.opportunities;
        } else {
          mockData = DEMO_DATA.dashboard;
        }
        
        setData(mockData as T);
        return mockData as T;
      }

      const res = await axios.post(url, body);
      if (res.data.error) {
        setError(res.data.error);
        return null;
      }
      setData(res.data.data);
      return res.data.data;
    } catch (err) {
      const msg = axios.isAxiosError(err) ? err.message : "Unknown error";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, call };
};
