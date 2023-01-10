declare interface TSort {
  field: string;
  order: 'asc' | 'desc';
}

declare type TCategory = Entities.Feedback.TCategory | 'All';
