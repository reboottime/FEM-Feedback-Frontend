// Button.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Modal } from './Modal';
import Button from '../Button';

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const onClose = () => {
  // eslint-disable-next-line no-console
  console.info('modal closed');
};

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal
    {...args}
    maxHeight="120px"
  >
    <div style={{ height: '550px' }}>Nothing else matters</div>
  </Modal>
);

export const Demo = Template.bind({});
Demo.args = {
  footer: (
    <React.Fragment>
      <Button
        onClick={onClose}
        small
      >Confirm</Button>
    </React.Fragment>
  ),
  title: 'Message',
  onClose,
};
