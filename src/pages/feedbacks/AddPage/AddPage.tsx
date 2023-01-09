import React from 'react';

import FormPage from '@/pages/feedbacks/components/FormPage';
import { useAddFeedback } from '@/hooks/queries/feedbacks/feedbacks';

export const AddPage = () => {
  const mutation = useAddFeedback();

  return (
    <FormPage
      onSubmit={mutation.mutate}
      type="add"
    />);
};

export default AddPage;
