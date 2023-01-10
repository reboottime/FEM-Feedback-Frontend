import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Modal } from './Modal';

const user = userEvent.setup();
const onClose = jest.fn();
const modalContent = 'Hello, world';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Modal', () => {
  beforeEach(() => {
    render(
      <Modal
        onClose={onClose}
        title="Hey, there"
      >
        {modalContent}
      </Modal>);

  });

  it('expect modal has modal content', () => {
    expect(screen.getByText(modalContent)).toBeInTheDocument();
  });

  it('expect to call onClose if user clicks the close button', async () => {
    await user.click(screen.getByRole('button'));

    expect(onClose).toBeCalledTimes(1);
  });

  it('expect to call onClose if user clicks outside area of modal', async () => {
    await user.click(document.body);

    expect(onClose).toBeCalledTimes(1);
  });

  // "Exceeded timeout of 5000 ms for a test.
  // @todo: how to test it in new version of react testing lib
  it.todo('expect to call onClose if user presses ESC key');
});
