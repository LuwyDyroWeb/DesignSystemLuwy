import type { Meta, StoryObj } from '@storybook/react';
import { Button2 } from './Button2';

const meta: Meta<typeof Button2> = {
  title: 'Components/Button2',
  component: Button2,
};

export default meta;
type Story = StoryObj<typeof Button2>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};