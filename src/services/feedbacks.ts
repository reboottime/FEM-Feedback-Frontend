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

export const getFeedbackComments = (id: Entities.Feedback.TFeedback['id']) => {
  return axios.get(`/feedbacks/${id}/comments`);
};

export const getFeedbacks = (params?: TQueryParams) => {
  const data = params
    ? { params }
    : {};

  return axios.get('/feedbacks', data);
};

export const updateFeedback = (args: {
  id: Entities.Feedback.TFeedback['id'];
  update: TFeedbackUpdate;
}) => {
  const { id, update } = args;

  return axios.patch(`/feedbacks/${id}`, update);
};

export const voteFeedback = (id: Entities.Feedback.TFeedback['id']) => {
  return axios.post(`/feedbacks/${id}/vote`);
};

export const getFeedbacksStats = () => {
  return axios.get('/feedbacks/stats');
};
