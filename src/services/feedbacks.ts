import axios from '@/utils/axios';

export const addFeedback = (args: {
  category: Entities.Feedback.TCategory;
  details: string;
  title: string;
}) => {
  return axios.post('/feedbacks', args);
};

export const addFeedbackComment = (args: {
  detail: string;
  feedbackId: Entities.Feedback.TFeedback['id'];
  replyTo?: Entities.TComment['id'];
}) => {
  const { feedbackId, ...comment } = args;

  return axios.post(`/feedbacks/${feedbackId}/comments`, comment);
};

export const getFeedback = (id: string) => {
  return axios.get(`/feedbacks/${id}`);
};

export const updateFeedback = (args: {
  id: string;
  update: TFeedbackUpdate;
}) => {
  const { id, update } = args;

  return axios.patch(`/feedbacks/${id}`, update);
};
