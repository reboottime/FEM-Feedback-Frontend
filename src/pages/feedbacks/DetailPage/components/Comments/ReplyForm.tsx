import React from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';

import Button from '@/components/Button';
import { Textarea } from '@/components/Form';

import { useAddFeedbackComment } from '@/hooks/queries/feedbacks';

const CommentReplyForm: React.FC<Props> = ({
  toFeedback,
  toComment,
}) => {
  const mutation = useAddFeedbackComment();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      detail: '',
    },
  });

  const onSubmit = ({ detail }: FieldValues) => {
    mutation.mutate({
      detail,
      feedbackId: toFeedback,
      replyTo: toComment,
    } as never);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Textarea
          name="detail"
          placeholder="Type your comment here"
          required={{
            value: true,
            message: 'Comment content is required',
          }}
        />
        <Button
          type="submit"
          variant="purple"
        >
          Post Reply
        </Button>
      </form>
    </FormProvider>
  );
};

interface Props {
  toComment: Entities.TComment['id'];
  toFeedback: Entities.Feedback.TFeedback['id'];
}

export default CommentReplyForm;
