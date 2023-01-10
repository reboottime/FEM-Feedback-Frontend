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

