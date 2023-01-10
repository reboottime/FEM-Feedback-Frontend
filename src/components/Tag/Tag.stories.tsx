// Tag.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Tag } from './Tag';

export default {
  title: 'Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Demo = Template.bind({});

Demo.args = {
  active: true,
  clickable: true,
  children: 'UX',
  // eslint-disable-next-line no-console
  onClick: (e) => console.info(e),
};
