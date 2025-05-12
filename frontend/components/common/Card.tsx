import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  className = '',
  padding = 'md'
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <div className={`
      bg-white rounded-lg shadow-md
      ${paddingStyles[padding]}
      ${className}
    `}>
      {children}
    </div>
  );
} 