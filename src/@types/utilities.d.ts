declare interface TSort {
  field: string;
  order: 'asc' | 'desc';
}

declare type TCategory = Entities.Feedback.TCategory | 'All';

declare interface TQueryParams extends Record<string, string> {
  sort: Record<string, TSort[order]>;
}
