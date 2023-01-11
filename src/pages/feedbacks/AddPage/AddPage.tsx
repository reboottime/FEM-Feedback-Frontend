import React from 'react';
import { FieldValues } from 'react-hook-form';

import Button from '@/components/Button';
import FormPage, { Cancell, FeedbackForm } from '@/pages/feedbacks/components/FormPage';

import { useAddFeedback } from '@/hooks/queries/feedbacks/feedbacks';

export const AddPage = () => {
  const mutation = useAddFeedback();

  const handleSubmit = (data: FieldValues) => {
    mutation.mutate(data as never);
  };

  return (
    <FormPage type="add">
      <FeedbackForm
        onSubmit={handleSubmit}
        type="add"
      >
        <div className='add-page__buttons'>
          <Cancell />
          <Button mobileFullWidth>Save Changes</Button>
        </div>
      </FeedbackForm>
    </FormPage>
  );
};

export default AddPage;
