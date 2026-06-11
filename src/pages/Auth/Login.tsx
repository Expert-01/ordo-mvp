import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
 * Two-column layout: Form on left, Hero section on right
 * Allows existing students to log in with email/password
 * On success: Store student_id in localStorage → redirect to /dashboard/overview
 * On error: Show validation/server errors
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await login(formData.email, formData.password);

    if (success) {
      if (formData.rememberMe) {
        localStorage.setItem('rememberEmail', formData.email);
      } else {
        localStorage.removeItem('rememberEmail');
      }
      navigate('/dashboard/overview');
    } else if (authError) {
      setErrors({
        general: authError,
      });
    }
  };

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
    <div className="min-h-screen bg-white flex">
      {/* LEFT SIDE - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col px-6 md:px-12 py-8 md:py-16">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-ordo-green-900 orbitron">
            ORDO
          </h1>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center max-w-md">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {(errors.general || authError) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.general || authError}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                  'w-full px-4 py-3 border rounded-lg transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-ordo-green-500',
                  errors.email
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 bg-gray-100 hover:bg-white'
                )}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
                  'w-full px-4 py-3 border rounded-lg transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-ordo-green-500',
                  errors.password
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 bg-gray-100 hover:bg-white'
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
                className="h-4 w-4 text-ordo-green-600 focus:ring-ordo-green-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-ordo-green-700 hover:bg-ordo-green-800 text-white font-semibold"
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
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              🎯 Try Demo Mode
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 pt-4">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-ordo-green-600 hover:text-ordo-green-700 transition-colors"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - Hero Section (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 bg-ordo-green-700 relative rounded-3xl overflow-hidden p-12 h-[130vh] mt-8 mr-8 flex-col items-center justify-center">
        {/* Background Image/Gradient */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url("./public/formpic.jpg")',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-md">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 orbitron leading-tight">
            Welcome to ORDO
          </h2>
          <p className="text-lg md:text-xl leading-relaxed font-light">
            Let's build your journey from classroom to career.
          </p>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white rounded-full opacity-10"></div>
        <div className="absolute bottom-32 left-10 w-24 h-24 bg-white rounded-full opacity-10"></div>
        <div className="absolute top-1/2 right-32 w-16 h-16 bg-white rounded-full opacity-5"></div>
      </div>
    </div>
  );
};

export default Login;