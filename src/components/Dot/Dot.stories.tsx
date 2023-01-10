// Dot.stories.ts|tsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Dot } from './Dot';

export default {
  title: 'Dot',
  component: Dot,
} as ComponentMeta<typeof Dot>;

const Template: ComponentStory<typeof Dot> = (args) => <Dot {...args} />;

export const Demo = Template.bind({});
Demo.args = {
  variant: 'blue',
};
