import { usePodcast } from '@src/context/podcastContext';
import React, { useEffect } from 'react';

const Home = () => {
  const { loading, error, podcastList, getPodcastList } = usePodcast();

  useEffect(() => {
    if (podcastList.length == 0) {
      getPodcastList();
    }
  }, [podcastList]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Home page2</p>
      {podcastList.map((podcast, index) => (
        <p key={index}>{podcast['im:image'][0].label}</p>
      ))}
    </div>
  );
};

export { Home };
