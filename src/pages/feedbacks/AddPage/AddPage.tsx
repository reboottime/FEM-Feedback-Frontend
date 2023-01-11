import React from 'react';
import { FieldValues } from 'react-hook-form';

import Button from '@/components/Button';
import FormPage, {
  Cancell,
  FeedbackForm,
} from '@/pages/feedbacks/components/FormPage';

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
        <React.Fragment>
          <Cancell />
          <Button mobileFullWidth>Save Changes</Button>
        </React.Fragment>
      </FeedbackForm>
    </FormPage>
  );
};

export default AddPage;
