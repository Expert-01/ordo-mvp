import { useState } from 'react';
import axios from 'axios';

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
