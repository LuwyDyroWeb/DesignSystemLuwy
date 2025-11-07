import React from 'react';
import { Button, type ButtonProps } from './Button';

export interface ButtonIconProps extends Omit<ButtonProps, 'children'> {
  children: React.ReactNode;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    iconAriaLabel?: string;
}


export const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  children,
  iconPosition = 'left',
  iconAriaLabel,
  isLoading = false,
  ...buttonProps
}) => {
  
  const DefaultInfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor" />
    </svg>
  );

  
  const iconNode = React.isValidElement(icon) ? icon : <DefaultInfoIcon />;

  const IconWrapper: React.FC<{ children: React.ReactNode; side: 'left' | 'right' }> = ({ children, side }) => (
    <span
      className={`btn_icon ${side === 'right' ? 'btn_icon--right' : 'btn_icon--left'}`}
      {...(iconAriaLabel
        ? { role: 'img', 'aria-label': iconAriaLabel }
        : { 'aria-hidden': true })}
    >
      {children}
    </span>
  );

  const content = (
    <>
      {iconPosition === 'left' && iconNode && <IconWrapper side="left">{iconNode}</IconWrapper>}
      <span className="btn_label">{children}</span>
      {iconPosition === 'right' && iconNode && <IconWrapper side="right">{iconNode}</IconWrapper>}
    </>
  );

  return (
    <Button isLoading={isLoading} {...buttonProps}>
      {content}
    </Button>
  );
};

export default ButtonIcon;
