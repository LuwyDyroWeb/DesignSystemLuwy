

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  variant?: 'primary' | 'secondary';

  size?: 'small' | 'medium' | 'large';

  children: React.ReactNode;
}

export const Button2 = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}: ButtonProps) => {
 
  const baseClasses = 'font-bold rounded-lg transition-colors duration-200';

 
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-700', 
    secondary: 'bg-gray-500 text-white hover:bg-gray-700',
  };

 
  const sizeClasses = {
    small: 'text-sm py-1 px-2',
    medium: 'text-base py-2 px-4',
    large: 'text-lg py-3 px-6',
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} `}
      {...props}
    >
      {children}
    </button>
  );
};