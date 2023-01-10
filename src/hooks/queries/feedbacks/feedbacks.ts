import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getFeedbackQueryKey,
} from './queryKey';

import {
  addFeedback,
  addFeedbackComment,
  getFeedback,
  updateFeedback,
  voteFeedback,
} from '@/services/feedbacks';
import { queryClient } from '@/components/AppProviders';

export const useAddFeedback = () => {
  const navigate = useNavigate();

  return useMutation(addFeedback as never, {
    onSuccess: (data: Entities.Feedback.TFeedback) => {
      toast.success('Updated feedback successfully');

      queryClient.invalidateQueries(getFeedbackQueryKey(data.id));

      navigate(`/feedbacks/${data.id}`);
    },
    onError: () => {
      toast.error('Adding feedback is failed');
    },
  });
};

export const useGetFeedback = (id: string) => {
  return useQuery({
    queryFn: () => getFeedback(id),
    queryKey: getFeedbackQueryKey(id),
    retry: 2,
    onError: () => {
      toast.error(`Failed to fetch feedback: ${id}`);
    },
  });
};

export const useVoteFeedback = () => {
  return useMutation(voteFeedback as never, {
    onSuccess: (data: Entities.Feedback.TFeedback) => {
      queryClient.invalidateQueries(getFeedbackQueryKey(data.id));
    },
    onError: () => {
      toast.error('vote is failed');
    }
  });
};

export const useUpdateFeedback = () => {
  const navigate = useNavigate();

  const queryFn = (args: {
    id: string;
    update: TFeedbackUpdate;
  }) => updateFeedback(args);

  return useMutation(queryFn as never, {
    onSuccess: (data: Entities.Feedback.TFeedback) => {
      toast.success('Feedback updated');

      queryClient.invalidateQueries(getFeedbackQueryKey(data.id));

      navigate(`/feedbacks/${data.id}`);
    },
    onError: () => {
      toast.error('Update is failed');
    },
  });
};

export const useAddFeedbackComment = () => {
  const queryFn = (args: {
    detail: string;
    feedbackId: Entities.Feedback.TFeedback['id'];
    replyTo?: Entities.TComment['id'];
  }) => addFeedbackComment(args);

  return useMutation(queryFn as never, {
    onSuccess: () => {
      toast.success('Comment added');
    },
    onError: () => {
      toast.error("We can't handle your request this time, please try later");
    },
  });
};
