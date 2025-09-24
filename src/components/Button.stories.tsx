import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: 'Primary' } };
export const Secondary: Story = { args: { variant:'secondary', children: 'Secondary' } };
export const Danger: Story = { args: { variant:'danger', children: 'Delete' } };
