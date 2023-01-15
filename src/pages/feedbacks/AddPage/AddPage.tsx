import React from 'react';
import { FieldValues } from 'react-hook-form';

import DocumentTitle from '@/components/DocumentTitle';
import Button from '@/components/Button';
import FormPage, {
  Cancell,
  FeedbackForm,
} from '@/pages/feedbacks/components/FormPage';

import { useAddFeedback } from '@/hooks/queries/feedbacks/feedbacks';
import { TFeedbackCreatDto } from '@/services/feedbacks.service';

export const AddPage = () => {
  const mutation = useAddFeedback();

  const handleSubmit = (data: FieldValues) => {
    mutation.mutate(data as TFeedbackCreatDto);
  };

  return (
    <FormPage type="add">
      <DocumentTitle title='Add Feedback' />
      <FeedbackForm
        onSubmit={handleSubmit}
        type="add"
      >
        <React.Fragment>
          <Cancell />
          <Button
            mobileFullWidth
            type="submit"
          >Create Feedback</Button>
        </React.Fragment>
      </FeedbackForm>
    </FormPage>
  );
};

export default AddPage;
