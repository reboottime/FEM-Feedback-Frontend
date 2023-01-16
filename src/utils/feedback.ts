import { DotProps } from '@/components/Dot';

const DOT_VARIANT_MAP: Record<TRoadmapStatus, DotProps['variant']> = {
  planned: 'orange',
  'in progress': 'purple',
  live: 'blue',
};

export const mapStatusToDotVariant = (status: TRoadmapStatus) => {
  return DOT_VARIANT_MAP[status];
};

export const isPublishedFeedback = (feedback?: TFeedback) => {
  if (!feedback) {
    return false;
  }

  return feedback.status === 'live';
};
