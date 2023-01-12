declare interface TFeedbackUpdate
  extends Pick<Entities.Feedback, 'title' | 'detail' | 'category'> {
  status?: Entities.Feedback.TRoadmapStatus;
}

declare type TFeedback = Entities.Feedback.TFeedback;

declare type TCategory = Entities.Feedback.TCategory | 'All';

declare type TComment = Entities.TComment;

declare interface TUserPass {
  password: string;
  username: string;
}

declare interface TSort {
  field: string;
  order: 'asc' | 'desc';
}

declare interface TQueryParams extends Record<string, string> {
  sort: Record<string, TSort[order]>;
}
