import React, { useEffect } from 'react';

const DocumentTitle: React.FC<Props> = ({ title }) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = 'Loading...';
    };
  }, [title]);

  return null;
};

export default DocumentTitle;

interface Props {
  title: string;
}
