import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContainer } from '../../components/auth/AuthContainer';
import { AuthFormCard } from '../../components/auth/AuthFormCard';
import { AuthHeroSection } from '../../components/auth/AuthHeroSection';
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
 * Allows new students to create an account
 * Collects: Name, Email, Username, Password
 * On success: Show confirmation → redirect to /onboarding/step1
 * On error: Show validation/server errors
 * 
 * API Integration: POST /api/auth/register
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

  // Password strength validator
  const validatePassword = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasUpperCase && hasNumber && isLongEnough;
  };

  // Validation
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

  // Handle form submission
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
      // Show success message
      setShowSuccess(true);

      // Redirect to onboarding after 2 seconds
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
    <AuthContainer>
      <AuthFormCard
        title="Register"
        subtitle="Create your ORDO account"
      >
        {showSuccess ? (
          <div className="text-center py-12 space-y-4">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-600">Account Created!</h3>
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
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
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
                  'w-full px-4 py-2 border rounded-lg transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-green-500',
                  errors.firstName
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 bg-gray-50 hover:bg-white'
                )}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name Field */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
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
                  'w-full px-4 py-2 border rounded-lg transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-green-500',
                  errors.lastName
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 bg-gray-50 hover:bg-white'
                )}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

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

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
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
                  'w-full px-4 py-2 border rounded-lg transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-green-500',
                  errors.username
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 bg-gray-50 hover:bg-white'
                )}
              />
              {errors.username && (
                <p className="text-red-600 text-sm mt-1">{errors.username}</p>
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
              <p className="text-xs text-gray-500 mt-1">
                Min 8 characters, uppercase letter, and number
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
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
                  'w-full px-4 py-2 border rounded-lg transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-green-500',
                  errors.confirmPassword
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 bg-gray-50 hover:bg-white'
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
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
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
              className="w-full"
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
                className="font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                Log in
              </Link>
            </p>
          </form>
        )}
      </AuthFormCard>

      <AuthHeroSection />
    </AuthContainer>
  );
};

export default Register;
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-600 text-sm -mt-2">{errors.agreeToTerms}</p>
            )}

            {/* Register Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all mt-6"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        )}
      </AuthFormCard>

      <AuthHeroSection />
    </AuthContainer>
  );
};

export default Register;
