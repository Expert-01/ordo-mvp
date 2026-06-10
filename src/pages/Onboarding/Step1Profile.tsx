import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { Button } from '../../components/common/Button';
import clsx from 'clsx';

interface ProfileFormData {
  name: string;
  email: string;
  academicYear: string;
  university: string;
  gpa?: number;
  bio: string;
  profilePicture?: File;
}

interface ProfileErrors {
  [key: string]: string;
}

const ACADEMIC_YEARS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

/**
 * Onboarding Step 1: Profile Setup
 * Path: /onboarding/step1
 * 
 * Collects: Name, Email, Academic Year, University, GPA, Bio, Profile Picture
 * Pre-fills: Name and Email from registration
 */
const OnboardingStep1: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileFormData>({
    name: localStorage.getItem('student_name') || '',
    email: localStorage.getItem('student_email') || '',
    academicYear: '',
    university: '',
    gpa: undefined,
    bio: '',
  });

  const [errors, setErrors] = useState<ProfileErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: ProfileErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.academicYear) {
      newErrors.academicYear = 'Academic year is required';
    }

    if (!formData.university.trim()) {
      newErrors.university = 'University is required';
    }

    if (formData.gpa !== undefined) {
      const gpaNum = parseFloat(formData.gpa.toString());
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
        newErrors.gpa = 'GPA must be between 0.0 and 4.0';
      }
    }

    if (formData.bio.trim().length > 150) {
      newErrors.bio = 'Bio must be 150 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      setFormData({
        ...formData,
        profilePicture: file,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with real API call to POST /api/onboarding/step1
      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save to localStorage (mock storage)
      localStorage.setItem(
        'onboarding_step1',
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          academicYear: formData.academicYear,
          university: formData.university,
          gpa: formData.gpa,
          bio: formData.bio,
        })
      );

      // Navigate to step 2
      navigate('/onboarding/step2');
    } catch (error) {
      setErrors({ general: 'Failed to save profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <StepIndicator currentStep={1} />

      {/* Step Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell us about yourself
        </h2>
        <p className="text-gray-600">
          Let's start by getting to know you better
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field (pre-filled, editable) */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            className={clsx(
              'w-full px-3 py-2 border rounded-lg text-sm',
              'focus:outline-none focus:ring-2 focus:ring-green-500',
              errors.name ? 'border-red-300' : 'border-gray-300'
            )}
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email Field (pre-filled, disabled) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-600"
          />
          <p className="text-xs text-gray-500 mt-1">From your registration</p>
        </div>

        {/* Academic Year Dropdown */}
        <div>
          <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
            Academic Year
          </label>
          <select
            id="academicYear"
            value={formData.academicYear}
            onChange={(e) => {
              setFormData({ ...formData, academicYear: e.target.value });
              if (errors.academicYear) setErrors({ ...errors, academicYear: '' });
            }}
            className={clsx(
              'w-full px-3 py-2 border rounded-lg text-sm',
              'focus:outline-none focus:ring-2 focus:ring-green-500',
              errors.academicYear ? 'border-red-300' : 'border-gray-300'
            )}
          >
            <option value="">Select your academic year</option>
            {ACADEMIC_YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.academicYear && (
            <p className="text-red-600 text-xs mt-1">{errors.academicYear}</p>
          )}
        </div>

        {/* University */}
        <div>
          <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
            University
          </label>
          <input
            id="university"
            type="text"
            value={formData.university}
            onChange={(e) => {
              setFormData({ ...formData, university: e.target.value });
              if (errors.university) setErrors({ ...errors, university: '' });
            }}
            placeholder="e.g., MIT, Stanford"
            className={clsx(
              'w-full px-3 py-2 border rounded-lg text-sm',
              'focus:outline-none focus:ring-2 focus:ring-green-500',
              errors.university ? 'border-red-300' : 'border-gray-300'
            )}
          />
          {errors.university && (
            <p className="text-red-600 text-xs mt-1">{errors.university}</p>
          )}
        </div>

        {/* GPA */}
        <div>
          <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-1">
            GPA (optional)
          </label>
          <input
            id="gpa"
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={formData.gpa || ''}
            onChange={(e) => {
              setFormData({
                ...formData,
                gpa: e.target.value ? parseFloat(e.target.value) : undefined,
              });
              if (errors.gpa) setErrors({ ...errors, gpa: '' });
            }}
            placeholder="3.8"
            className={clsx(
              'w-full px-3 py-2 border rounded-lg text-sm',
              'focus:outline-none focus:ring-2 focus:ring-green-500',
              errors.gpa ? 'border-red-300' : 'border-gray-300'
            )}
          />
          {errors.gpa && <p className="text-red-600 text-xs mt-1">{errors.gpa}</p>}
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            About You (optional)
          </label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => {
              setFormData({ ...formData, bio: e.target.value });
              if (errors.bio) setErrors({ ...errors, bio: '' });
            }}
            placeholder="Tell us about your interests and goals..."
            maxLength={150}
            rows={3}
            className={clsx(
              'w-full px-3 py-2 border rounded-lg text-sm resize-none',
              'focus:outline-none focus:ring-2 focus:ring-green-500',
              errors.bio ? 'border-red-300' : 'border-gray-300'
            )}
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.bio.length}/150 characters
          </p>
          {errors.bio && <p className="text-red-600 text-xs mt-1">{errors.bio}</p>}
        </div>

        {/* Profile Picture */}
        <div>
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture (optional)
          </label>
          <div className="flex items-center gap-4">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-600"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
            disabled={isLoading}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            {isLoading ? 'Saving...' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingStep1;
