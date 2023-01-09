import React from 'react';
import { useParams } from 'react-router-dom';

import FormPage from '@/pages/feedbacks/components/FormPage';
import { useGetFeedback, useUpdateFeedback } from '@/hooks/queries/feedbacks/feedbacks';

import './style.scss';

export const EditPage = () => {
  const { feedbackId = '' } = useParams();

  const { data, isSuccess } = useGetFeedback(feedbackId);
  const mutation = useUpdateFeedback();

  const onSubmit = (data: TFeedbackUpdate) => {
    mutation.mutateAsync({
      id: feedbackId,
      update: data
    } as never);
  };

  if (isSuccess) {
    return (
      <FormPage
        defaultValues={data}
        onSubmit={onSubmit as never}
        type="edit"
      />);
  }

  return null;
};

export default EditPage;
