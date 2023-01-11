import { DotProps } from '@/components/Dot';

const DOT_VARIANT_MAP: Record<Entities.Feedback.TRoadmapStatus, DotProps['variant']> = {
  planned: 'orange',
  'in progress': 'purple',
  live: 'blue',
};

export const mapStatusToDotVariant = (status: Entities.Feedback.TRoadmapStatus) => {
  return DOT_VARIANT_MAP[status];
};

export const isPublishedFeedback = (feedback: Entities.Feedback.TFeedback) => {
  return feedback.status === 'live';
};
