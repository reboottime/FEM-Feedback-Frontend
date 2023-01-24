import classNames from 'classnames';
import React from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';

import Button from '@/components/Button';
import { Textarea } from '@/components/Form';
import RequireAuth from '@/components/RequireAuth';

import { useAddFeedbackComment } from '@/hooks/queries/feedbacks';
import { useIsMobile } from '@/hooks/mediaQueries';

import './style.scss';

const MAX_LENGTH = 250;

export const AddComment: React.FC<Props> = ({ toFeedback }) => {
  const isMobile = useIsMobile();

  const mutation = useAddFeedbackComment();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      detail: '',
    },
  });

  const onSubmit = async ({ detail }: FieldValues) => {
    const result = await mutation.mutateAsync({
      detail,
      feedbackId: toFeedback,
    });

    if (result.id) {
      methods.reset();
    }
  };

  const remainingLength = MAX_LENGTH - methods.watch('detail').length;

  return (
    <FormProvider {...methods}>
      <RequireAuth actionName="onSubmit">
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
          <div className="add-comment__action flex-center-between">
            <span
              aria-label="remaining comment character"
              className={classNames('add-comment__reminder', {
                'add-comment__reminder--error': remainingLength < 0,
              })}
            >
              {remainingLength > 0
                ? `${remainingLength} characters left`
                : 'Comment is too long'}
            </span>
            <Button
              disabled={remainingLength < 0}
              small={isMobile}
              type="submit"
            >
              Post Comment
            </Button>
          </div>
        </form>
      </RequireAuth>
    </FormProvider>
  );
};

interface Props {
  toFeedback: TFeedback['id'];
}
