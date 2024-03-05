import React from 'react';
import UrlProvider from './UrlProvider';

const url = () => {
  const url = 'https://localhost:7266';

  return (
    <div>
      <UrlProvider url={url} />
    </div>
  );
};

export default url;