import React from 'react';
import { cn } from '../../utils/cn';

type BadgeProps = {
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'subtle';
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'default',
  size = 'md',
  variant = 'solid',
  className,
}) => {
  const colorStyles = {
    default: {
      solid: 'bg-gray-100 text-gray-800',
      outline: 'border border-gray-200 text-gray-800',
      subtle: 'bg-gray-50 text-gray-800',
    },
    primary: {
      solid: 'bg-purple-100 text-purple-800',
      outline: 'border border-purple-200 text-purple-800',
      subtle: 'bg-purple-50 text-purple-800',
    },
    secondary: {
      solid: 'bg-blue-100 text-blue-800',
      outline: 'border border-blue-200 text-blue-800',
      subtle: 'bg-blue-50 text-blue-800',
    },
    success: {
      solid: 'bg-green-100 text-green-800',
      outline: 'border border-green-200 text-green-800',
      subtle: 'bg-green-50 text-green-800',
    },
    warning: {
      solid: 'bg-yellow-100 text-yellow-800',
      outline: 'border border-yellow-200 text-yellow-800',
      subtle: 'bg-yellow-50 text-yellow-800',
    },
    error: {
      solid: 'bg-red-100 text-red-800',
      outline: 'border border-red-200 text-red-800',
      subtle: 'bg-red-50 text-red-800',
    },
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded',
    md: 'text-xs px-2.5 py-0.5 rounded',
    lg: 'text-sm px-3 py-0.5 rounded',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        colorStyles[color][variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;