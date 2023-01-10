import { useMediaQuery } from 'react-responsive';

export const useIsMobile = () => useMediaQuery({
  maxWidth: '767px'
});

export const useIsSmallMobile = () => useMediaQuery({
  maxWidth: '576px',
});
