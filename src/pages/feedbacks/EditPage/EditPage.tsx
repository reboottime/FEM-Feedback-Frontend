import React from 'react';
import { useParams } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';

import { useAuthContext } from '@/components/AppProviders';
import Button from '@/components/Button';
import YouAreLost from '@/components/YouAreLost';

import {
  useGetFeedback,
  useUpdateFeedback,
} from '@/hooks/queries/feedbacks/feedbacks';

import { isAdminUser } from '@/utils/user';
import { isPublishedFeedback } from '@/utils/feedback';

import FormPage, {
  Cancell,
  FeedbackForm,
} from '@/pages/feedbacks/components/FormPage';

import './style.scss';

export const EditPage = () => {
  const { feedbackId = '' } = useParams();

  const {
    data: feedback,
    isLoading,
    isFetched: feedbackIsFeched,
  } = useGetFeedback(feedbackId);

  const { user } = useAuthContext();

  const canEdit =
    !isPublishedFeedback(feedback) &&
    (isAdminUser(user) || feedback?.author.id === user?.id);

  const mutation = useUpdateFeedback();

  const handleSubmit = (data: FieldValues) => {
    mutation.mutateAsync({
      id: feedbackId,
      update: data as TFeedbackUpdate,
    });
  };

  if (feedbackIsFeched) {
    return feedback
      ? (
        <FormPage type="edit">
          {isLoading && <p>loading...</p>}
          <FeedbackForm
            defaultValues={feedback}
            disabled={!canEdit}
            onSubmit={handleSubmit}
            type="edit"
          >
            <React.Fragment>
              <Cancell />
              <Button disabled={!canEdit}>Save Changes</Button>
            </React.Fragment>
          </FeedbackForm>
        </FormPage>
      )
      : (
        <FormPage type="edit">
          <YouAreLost />
        </FormPage>
      );
  }

  return null;
};

export default EditPage;
