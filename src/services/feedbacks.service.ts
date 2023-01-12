import { AxiosRequestConfig } from 'axios';

import { Api } from '@/utils/api';

export type TFeedbackCreatDto = {
  category: TCategory;
  detail: string;
  title: string;
};

export type TAddComemntDto = {
  detail: string;
  feedbackId: TFeedback['id'];
  replyToComment?: TComment['id'];
  replyToUser?: TComment['author']['id'];
};

class FeedbacksApi extends Api {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }

  addFeedback: (data: TFeedbackCreatDto) => Promise<TFeedback> = (data) => {
    return this.post('/', data);
  };

  addFeedbackComment: (args: TAddComemntDto) => Promise<TComment> = (args) => {
    const { feedbackId, ...comment } = args;

    return this.post(`/${feedbackId}/comments`, comment);
  };

  getFeedback: (id: TFeedback['id']) => Promise<TFeedback> = (id) => {
    return this.get(`/${id}`);
  };

  getFeedbackComments: (id: TFeedback['id']) => Promise<TComment[]> = (id) => {
    return this.get(`/${id}/comments`);
  };

  getFeedbacks: (params?: TQueryParams) => Promise<TFeedback[]> = (params) => {
    const conf = params
      ? { params }
      : {};

    return this.get('/', conf);
  };

  getFeedbacksStats: () => Promise<Record<string, number>> = () => {
    return this.get('/stats');
  };

  updateFeedback: (args: {
    id: TFeedback['id'];
    update: TFeedbackUpdate;
  }) => Promise<TFeedback> = (args) => {
      const { id, update } = args;

      return this.patch(`/${id}`, update);
    };

  voteFeedback: (id: TFeedback['id']) => Promise<TFeedback> = (id) => {
    return this.post(`/${id}/vote`);
  };
}

const feedbacksApi = new FeedbacksApi({
  timeout: 1000,
  baseURL: import.meta.env.VITE_API_BASE_URL + '/feedbacks',
});

export default feedbacksApi;
