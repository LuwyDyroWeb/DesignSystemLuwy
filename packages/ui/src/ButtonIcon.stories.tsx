import type { Meta, StoryObj } from '@storybook/react';
import { ButtonIcon } from './ButtonIcon';
import React from 'react';

const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor" />
  </svg>
);

const meta: Meta<typeof ButtonIcon> = {
  title: 'Example/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'primary-blue', 'primary-green', 'secondary', 'error', 'info', 'warning', 'success', 'neutro-black', 'neutro-white'],
    },
    size: {
      control: { type: 'select' },
      options: ['tiny', 'small', 'medium', 'giant'],
    },
    buttonStyle: {
      control: { type: 'select' },
      options: ['filled', 'outline', 'clear'],
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const PrimaryLeft: Story = {
  args: {
    children: 'Button',
    iconPosition: 'left',
    variant: 'primary',
    size: 'small',
    buttonStyle: 'filled',
  },
};

export const PrimaryRight: Story = {
  args: {
    children: 'Button',
    icon: <InfoIcon />,
    iconPosition: 'right',
    variant: 'primary-blue',
    size: 'medium',
    buttonStyle: 'filled',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    iconPosition: 'left',
    variant: 'primary-blue',
    size: 'medium',
    buttonStyle: 'outline',
  },
};

export const Clear: Story = {
  args: {
    children: 'Button',
    iconPosition: 'left',
    variant: 'info',
    size: 'small',
    buttonStyle: 'clear',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <ButtonIcon {...args} size="tiny" />
      <ButtonIcon {...args} size="small" />
      <ButtonIcon {...args} size="medium" />
      <ButtonIcon {...args} size="giant" />
    </div>
  ),
  args: {
    children: 'Button',
    iconPosition: 'left',
    variant: 'primary-green',
    buttonStyle: 'filled',
  },
};
