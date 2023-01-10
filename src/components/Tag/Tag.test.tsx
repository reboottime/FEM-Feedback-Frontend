import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Tag } from './Tag';

const user = userEvent.setup();
const tagContent = 'Enhancement';
const handleTagClick = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Tag', () => {
  it('Interactable Tag', async () => {
    render(
      <Tag
        clickable
        onClick={handleTagClick}
      >
        {tagContent}
      </Tag>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(handleTagClick).toBeCalled();
  });

  it('Not interactable Tag', async () => {
    render(<Tag onClick={handleTagClick}>{tagContent}</Tag>);

    await user.click(screen.getByText(tagContent));

    expect(handleTagClick).not.toBeCalled();
  });
});
