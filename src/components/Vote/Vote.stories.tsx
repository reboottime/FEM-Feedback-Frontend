// Vote.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Vote } from './Vote';

export default {
  title: 'Vote',
  component: Vote,
} as ComponentMeta<typeof Vote>;

const Template: ComponentStory<typeof Vote> = (args) => <Vote {...args} />;

export const Demo = Template.bind({});
Demo.args = {
  votes: 100,
};
