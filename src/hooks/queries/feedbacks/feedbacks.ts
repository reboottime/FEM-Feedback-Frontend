import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getFeedbackCommentsQueryKey,
  getFeedbackQueryKey,
  getFeedbackStatsQueryKey,
  getFeedbcksQueryKey,
} from './queryKey';

import { queryClient } from '@/components/AppProviders';

import feedbacksApi, { TAddComemntDto } from '@/services/feedbacks.service';

export const useAddFeedback = () => {
  const navigate = useNavigate();

  return useMutation(feedbacksApi.addFeedback, {
    onSuccess: (data: TFeedback) => {
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
    queryFn: () => feedbacksApi.getFeedback(id),
    queryKey: getFeedbackQueryKey(id),
    retry: 2,
    onError: () => {
      toast.error(`Failed to fetch feedback: ${id}`);
    },
  });
};

export const useGetFeedbackComments = (id: TFeedback['id']) => {
  return useQuery({
    enabled: !!id,
    queryFn: () => feedbacksApi.getFeedbackComments(id),
    queryKey: getFeedbackCommentsQueryKey(id),
  });
};

export const useGetFeedbacks = (query?: TQueryParams) => {
  return useQuery({
    keepPreviousData: true,
    queryFn: () => feedbacksApi.getFeedbacks(query),
    queryKey: getFeedbcksQueryKey(query),
  });
};

export const useGetFeedbacksStats = () => {
  return useQuery({
    queryFn: feedbacksApi.getFeedbacksStats,
    queryKey: getFeedbackStatsQueryKey(),
  });
};

export const useVoteFeedback = () => {
  const queryFn = (id: TFeedback['id']) => feedbacksApi.voteFeedback(id);

  return useMutation(queryFn, {
    onSuccess: (data: TFeedback) => {
      queryClient.invalidateQueries(getFeedbackQueryKey(data.id));
      queryClient.invalidateQueries(getFeedbcksQueryKey());
    },
    onError: () => {
      toast.error('vote is failed');
    },
  });
};

export const useUpdateFeedback = () => {
  const navigate = useNavigate();

  const queryFn = (args: { id: string; update: TFeedbackUpdate }) =>
    feedbacksApi.updateFeedback(args);

  return useMutation(queryFn, {
    onSuccess: (data: TFeedback) => {
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
  const queryFn = (args: TAddComemntDto) => feedbacksApi.addFeedbackComment(args);

  return useMutation(queryFn, {
    onSuccess: (data: TComment) => {
      const commentQueryKey = getFeedbackCommentsQueryKey(data.feedbackId);
      const feedbackQueryKey = getFeedbackQueryKey(data.feedbackId);

      queryClient.invalidateQueries(commentQueryKey);
      queryClient.invalidateQueries(feedbackQueryKey);

      toast.success('Comment added');
    },
    onError: () => {
      toast.error("We can't handle your request this time, please try later");
    },
  });
};
