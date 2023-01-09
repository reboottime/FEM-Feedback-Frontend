import React from 'react';

import { ReactComponent as EditIcon } from '@/assets/shared/icon-edit-feedback.svg';
import { ReactComponent as AddIcon } from '@/assets/shared/icon-new-feedback.svg';

export const PAGE_INFO = {
  add: {
    title: 'Create New Feedback',
    icon: <AddIcon />,
  },
  edit: {
    title: 'Edit',
    icon: <EditIcon />,
  },
};
