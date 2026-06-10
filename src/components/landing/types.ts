/**
 * TypeScript interfaces for ORDO Landing Page sections
 * Ensures type safety and reusability across all landing components
 */

// ============================================================================
// SHARED/BASE TYPES
// ============================================================================

export interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  bgColor?: 'white' | 'light' | 'gradient';
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  titleSize?: 'lg' | 'xl' | '2xl';
}

// ============================================================================
// CARD COMPONENT TYPES
// ============================================================================

export interface CardProps {
  children: React.ReactNode;
  variant?: 'outline' | 'solid' | 'gradient';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// ============================================================================
// PROBLEM SECTION TYPES
// ============================================================================

export interface ProblemCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ProblemSectionProps {
  cards?: ProblemCard[];
}

// ============================================================================
// BENEFITS SECTION TYPES
// ============================================================================

export interface BenefitItem {
  id: string;
  text: string;
  icon?: React.ReactNode;
}

export interface BenefitsSectionProps {
  benefits?: BenefitItem[];
  title?: string;
  subtitle?: string;
}

// ============================================================================
// FEATURES SECTION TYPES
// ============================================================================

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bullets: string[];
  gradientFrom: string;
  gradientTo: string;
}

export interface FeaturesSectionProps {
  features?: FeatureCard[];
}

// ============================================================================
// HOW IT WORKS SECTION TYPES
// ============================================================================

export interface TimelineStep {
  id: string;
  number: number;
  title: string;
  description: string;
  details?: string[];
}

export interface HowItWorksSectionProps {
  steps?: TimelineStep[];
}

// ============================================================================
// COMMUNITY SECTION TYPES
// ============================================================================

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  avatar?: string;
}

export interface CommunitySectionProps {
  testimonials?: Testimonial[];
}

// ============================================================================
// LANDING PAGE TYPES
// ============================================================================

export interface LandingPageProps {
  showHero?: boolean;
  showProblem?: boolean;
  showBenefits?: boolean;
  showFeatures?: boolean;
  showHowItWorks?: boolean;
  showCommunity?: boolean;
}
