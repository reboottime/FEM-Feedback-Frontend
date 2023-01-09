import axios from '@/utils/axios';

export const addFeedback = (args: {
  category: Entities.Feedback.TCategory;
  details: string;
  title: string;
}) => {
  return axios.post('/feedbacks', args);
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
