import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Podcast = () => {
  const location = useLocation();
  const params = useParams();
  const id = Number(params.id);

  return (
    <div>
      <p>Podcast Page {id}</p>
    </div>
  );
};

export { Podcast };
