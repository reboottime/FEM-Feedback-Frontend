// Button.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Demo = Template.bind({});
Demo.args = {
  children: 'Call Me',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: 'Call Me',
  fullWidth: true,
};

export const FullWidthOnMobile = Template.bind({});
FullWidthOnMobile.args = {
  children: 'Call Me',
  mobileFullWidth: true,
};
