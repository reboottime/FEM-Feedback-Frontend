export const getFeedbcksQueryKey = (query?: Record<string, string>) => {
  if (query) {
    return ['feedbacks', JSON.stringify(query)];
  }

  return ['feedbacks'];
};

export const getFeedbackQueryKey = (id: string) => {
  return ['feedback', id, 'detail'];
};

export const getFeedbackCommentsQueryKey = (id: string) => {

  return ['feedback', id, 'comments'];
};

export const getFeedbackStatsQueryKey = () => {
  const prefix = getFeedbcksQueryKey();

  return [...prefix, 'stats'];
};
