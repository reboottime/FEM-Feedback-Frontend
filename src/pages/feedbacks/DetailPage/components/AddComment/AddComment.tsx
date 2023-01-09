import classNames from 'classnames';
import React from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';

import Button from '@/components/Button';
import { Textarea } from '@/components/Form';

import { useAddFeedbackComment } from '@/hooks/queries/feedbacks';

import './style.scss';

const MAX_LENGTH = 250;

export const AddComment: React.FC<Props> = ({ toFeedback }) => {
  const mutation = useAddFeedbackComment();

  const onSubmit = ({ detail }: FieldValues) => {
    mutation.mutate({
      detail,
      feedbackId: toFeedback,
    } as never);
  };

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      detail: '',
    },
  });

  const remainingLength = MAX_LENGTH - methods.watch('detail').length;

  return (
    <FormProvider {...methods}>
      <form
        className="add-comment__form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Textarea
          aria-label="comment content"
          fullWidth
          name="detail"
          placeholder="Type your comment here"
          required={{
            value: true,
            message: '',
          }}
        />
        <div className="add-comment__action">
          <span
            aria-label="remaining comment character"
            className={classNames('add-comment__reminder', {
              'add-comment__reminder--error': (remainingLength < 0)
            })}
          >
            {(remainingLength > 0)
              ? `${remainingLength} characters left`
              : 'Comment is too long'}
          </span>
          <Button
            disabled={remainingLength < 0}
            type="submit"
          >
            Post Comment
          </Button>
        </div>
      </form>
    </FormProvider >
  );
};

interface Props {
  toFeedback: Entities.Feedback.TFeedback['id'];
}
