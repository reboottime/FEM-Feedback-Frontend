export const getSelectOptions = (options: string[]) => {
  return options.map((name) => ({ value: name, label: name }));
};
