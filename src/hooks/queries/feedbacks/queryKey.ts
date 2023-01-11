export const getFeedbcksQueryKey = (query?: Record<string, string>) => {
  if (query) {
    return ['feedbacks', JSON.stringify(query)];
  }

  return ['feedbacks'];
};

export const getFeedbackQueryKey = (id: string) => {
  const prefix = getFeedbcksQueryKey();

  return [prefix, id];
};

export const getFeedbackCommentsQueryKey = (id: string) => {
  const prefix = getFeedbackQueryKey(id);

  return [...prefix, 'comments'];
};

export const getFeedbackStatsQueryKey = () => {
  const prefix = getFeedbcksQueryKey();

  return [...prefix, 'stats'];
};
