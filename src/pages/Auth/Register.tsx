import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import clsx from 'clsx';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface RegisterErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

/**
 * Register Page
 * Path: /register
 * 
 * Two-column layout: Form on left, Hero section on right
 * Allows new students to create an account
 * Collects: Name, Email, Username, Password
 * On success: Show confirmation → redirect to /onboarding/step1
 * On error: Show validation/server errors
 */
const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error: authError } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validatePassword = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasUpperCase && hasNumber && isLongEnough;
  };

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters with uppercase letter and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await register(
      formData.email,
      formData.username,
      formData.password,
      formData.firstName,
      formData.lastName
    );

    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/onboarding/step1');
      }, 2000);
    } else if (authError) {
      setErrors({
        general: authError,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT SIDE - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col px-6 md:px-12 py-8 md:py-12">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-ordo-green-900 orbitron">
            ORDO
          </h1>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center max-w-md">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Register
          </h2>
          <p className="text-gray-600 mb-8">Create your ORDO account</p>

          {showSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-ordo-green-600">Account Created!</h3>
              <p className="text-gray-600">
                Redirecting to onboarding...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* General Error */}
              {(errors.general || authError) && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errors.general || authError}
                </div>
              )}

              {/* First Name Field */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                    if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                  }}
                  placeholder="John"
                  className={clsx(
                    'w-full px-4 py-3 border rounded-lg transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-ordo-green-500',
                    errors.firstName
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 bg-gray-100 hover:bg-white'
                  )}
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name Field */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                    if (errors.lastName) setErrors({ ...errors, lastName: undefined });
                  }}
                  placeholder="Doe"
                  className={clsx(
                    'w-full px-4 py-3 border rounded-lg transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-ordo-green-500',
                    errors.lastName
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 bg-gray-100 hover:bg-white'
                  )}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

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

              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                    if (errors.username) setErrors({ ...errors, username: undefined });
                  }}
                  placeholder="johndoe"
                  className={clsx(
                    'w-full px-4 py-3 border rounded-lg transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-ordo-green-500',
                    errors.username
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 bg-gray-100 hover:bg-white'
                  )}
                />
                {errors.username && (
                  <p className="text-red-600 text-sm mt-1">{errors.username}</p>
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
                <p className="text-xs text-gray-500 mt-1">
                  Min 8 characters, uppercase letter, and number
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                  }}
                  placeholder="••••••••"
                  className={clsx(
                    'w-full px-4 py-3 border rounded-lg transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-ordo-green-500',
                    errors.confirmPassword
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 bg-gray-100 hover:bg-white'
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start pt-2">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => {
                    setFormData({ ...formData, agreeToTerms: e.target.checked });
                    if (errors.agreeToTerms) setErrors({ ...errors, agreeToTerms: undefined });
                  }}
                  className="h-4 w-4 text-ordo-green-600 focus:ring-ordo-green-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-600 text-sm -mt-2">{errors.agreeToTerms}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-ordo-green-700 hover:bg-ordo-green-800 text-white font-semibold mt-6"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
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

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-ordo-green-600 hover:text-ordo-green-700 transition-colors"
                >
                  Log in
                </Link>
              </p>
            </form>
          )}
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

export default Register;