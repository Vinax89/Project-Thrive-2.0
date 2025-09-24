import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Modal from './Modal';
import Button from './Button';

const meta: Meta<typeof Modal> = {
  title: 'Core/Modal',
  component: Modal
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Open: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return <Modal open={open} onClose={()=>setOpen(false)} title="Example"><p>Modal content</p><Button onClick={()=>setOpen(false)}>Close</Button></Modal>;
  }
};
