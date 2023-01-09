declare interface TFeedbackUpdate
  extends Pick<Entities.Feedback, 'title' | 'detail' | 'category'> {
  status?: Entities.Feedback.TRoadmapStatus;
}
