import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContainer } from '../../components/auth/AuthContainer';
import { AuthFormCard } from '../../components/auth/AuthFormCard';
import { AuthHeroSection } from '../../components/auth/AuthHeroSection';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import clsx from 'clsx';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

/**
 * Login Page
 * Path: /login
 * 
 * Allows existing students to log in with email/password
 * On success: Store student_id in localStorage → redirect to /dashboard/overview
 * On error: Show validation/server errors
 * 
 * API Integration: POST /api/auth/login
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error: authError, demoMode } = useAuth();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginErrors>({});

  // Validation
  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await login(formData.email, formData.password);

    if (success) {
      // Store remember me preference
      if (formData.rememberMe) {
        localStorage.setItem('rememberEmail', formData.email);
      } else {
        localStorage.removeItem('rememberEmail');
      }

      // Redirect to dashboard
      navigate('/dashboard/overview');
    } else if (authError) {
      setErrors({
        general: authError,
      });
    }
  };

  // Load remembered email
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail, rememberMe: true }));
    }
  }, []);

  const handleDemoMode = () => {
    demoMode();
    navigate('/dashboard/overview');
  };

  return (
    <AuthContainer>
      <AuthFormCard
        title="Login"
        subtitle="Enter your credentials to get in"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {(errors.general || authError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {errors.general || authError}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="john@example.com"
              className={clsx(
                'w-full px-4 py-2 border rounded-lg transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-green-500',
                errors.email
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 bg-gray-50 hover:bg-white'
              )}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              placeholder="••••••••"
              className={clsx(
                'w-full px-4 py-2 border rounded-lg transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-green-500',
                errors.password
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 bg-gray-50 hover:bg-white'
              )}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Demo Mode Button */}
          <Button
            type="button"
            onClick={handleDemoMode}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            🎯 Try Demo Mode
          </Button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              Create one
            </Link>
          </p>
        </form>
      </AuthFormCard>

      <AuthHeroSection />
    </AuthContainer>
  );
};

export default Login;