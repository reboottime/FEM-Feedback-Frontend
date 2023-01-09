import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {  getFeedbackQueryKey } from './queryKey';

import {
  addFeedback,
  getFeedback,
  updateFeedback,
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