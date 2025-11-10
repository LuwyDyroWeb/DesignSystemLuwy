import React from 'react';

export type TokenFamily =
  | 'primary-blue'
  | 'primary-green'
  | 'alert-error'
  | 'alert-info'
  | 'alert-warning'
  | 'alert-success'
  | 'neutro-white'
  | 'neutro-black';

export type Tone = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  
  variant?:
    | 'primary'
    | 'primary-blue'
    | 'primary-green'
    | 'secondary'
    | 'error'
    | 'info'
    | 'warning'
    | 'success'
    | 'neutro-black'
    | 'neutro-white';
  size?: 'tiny' | 'small' | 'medium' | 'giant';
  children: React.ReactNode;
  bgToken?: TokenFamily;
  
  bgLevel?: Tone;
  
  hoverLevel?: Tone;
  
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';

  buttonStyle?: 'filled' | 'outline' | 'clear';
  className?: string;
  isLoading?: boolean;
}

const SpinnerPlaceholder = () => ( 
  <span className="btn-spinner-placeholder" style={{ width: '1em', height: '1em', display: 'inline-block' }}></span> 
);

export const Button = ({
  variant = 'primary',
  size = 'small',
  children,
 
  weight = 'regular',
  buttonStyle = 'filled',
  className,
  isLoading = false,
  disabled = false,
  ...props
}: ButtonProps) => {
 


  const weightClass = `btn--weight-${weight}`;


  const sizeClass = {
    tiny: 'btn--sm',
    small: 'btn--md',
    medium: 'btn--lg',
    giant: 'btn--xl',
  }[size];



  const variantClassMap: Record<string, string> = {
    'primary': 'btn--primary-blue',
    'primary-blue': 'btn--primary-blue',
    'primary-green': 'btn--primary-green',
    'secondary': 'btn--secondary', 
    'error': 'btn--error',
    'info': 'btn--info',
    'warning': 'btn--warning',
    'success': 'btn--success',
    'neutro-black': 'btn--neutro-black',
    'neutro-white': 'btn--neutro-white',
  };
  const effectiveVariantClass = variantClassMap[variant] || variantClassMap['primary'];

  
  const styleClass = buttonStyle === 'outline' ? 'btn--outline' : buttonStyle === 'clear' ? 'btn--clear' : '';


  const loadingClass = isLoading ? 'btn--loading' : '';

  
  const combinedClasses = `btn ${weightClass} ${sizeClass} ${effectiveVariantClass} ${styleClass} ${loadingClass} ${className || ''}`
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <button
      type="button"
      className={combinedClasses}
      disabled={disabled} 
      {...props}
    >
    
      {children}
     
    </button>
  );

};