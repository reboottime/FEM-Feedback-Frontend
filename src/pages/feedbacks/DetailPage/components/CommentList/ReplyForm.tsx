import React from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';

import Button from '@/components/Button';
import { Textarea } from '@/components/Form';

import { useAddFeedbackComment } from '@/hooks/queries/feedbacks';
import { useIsMobile } from '@/hooks/mediaQueries';

import './replyForm.style.scss';

const CommentReplyForm: React.FC<Props> = ({
  onAdded,
  toFeedback,
  toComment,
  toUser,
}) => {
  const isMobile = useIsMobile();

  const mutation = useAddFeedbackComment();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      detail: '',
    },
  });

  const onSubmit = async ({ detail }: FieldValues) => {
    const reuslt = await mutation.mutateAsync({
      detail,
      feedbackId: toFeedback,
      replyToComment: toComment,
      replyToUser: toUser,
    });

    if (reuslt.id) {
      methods.reset();
      onAdded();
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="reply-form"
        onSubmit={methods.handleSubmit(onSubmit)}>
        <Textarea
          className='reply-form__textarea'
          name="detail"
          placeholder="Type your comment here"
          required={{
            value: true,
            message: 'Comment content is required',
          }}
        />
        <div className="reply-form__btn-wrapper">
          <Button small={isMobile}
            type="submit"
            variant="purple">
            Post Reply
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

interface Props {
  onAdded: () => void;
  toComment: TComment['id'];
  toFeedback: TFeedback['id'];
  toUser: TComment['author']['id'];
}

export default CommentReplyForm;
