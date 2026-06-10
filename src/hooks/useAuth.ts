import { useState, useCallback } from 'react';
import { API_ENDPOINTS } from '../utils/api';

export interface User {
  id: number;
  uuid?: string;
  email: string;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UseAuthReturn {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string, firstName?: string, lastName?: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

/**
 * useAuth - Hook for managing authentication state and API calls
 * 
 * Handles:
 * - Login/Register API calls
 * - Token storage in localStorage
 * - User state management
 * - Error handling
 */
export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.statusCode !== 200 || !data.data) {
        throw new Error(data.error || 'Login failed');
      }

      const { user: userData, token: authToken } = data.data as AuthResponse;

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', authToken);

      // Update state
      setUser(userData);
      setToken(authToken);

      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (
      email: string,
      username: string,
      password: string,
      firstName?: string,
      lastName?: string
    ): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(API_ENDPOINTS.AUTH_REGISTER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            username,
            password,
            first_name: firstName || null,
            last_name: lastName || null,
          }),
        });

        const data = await response.json();

        if (data.statusCode !== 201 || !data.data) {
          throw new Error(data.error || 'Registration failed');
        }

        const { user: userData, token: authToken } = data.data as AuthResponse;

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);

        // Update state
        setUser(userData);
        setToken(authToken);

        return true;
      } catch (err: any) {
        const errorMessage = err.message || 'Registration failed. Please try again.';
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };
};
