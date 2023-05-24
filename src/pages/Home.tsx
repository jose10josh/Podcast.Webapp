import { usePodcast } from '@src/context/podcastContext';
import React, { useEffect } from 'react';

const Home = () => {
  const { loading, podcastList, getPodcastList } = usePodcast();

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
      <p className="text-3xl font-bold underline">Home page</p>
      {podcastList.map((podcast, index) => (
        <p key={index}>{podcast['im:name'].label}</p>
      ))}
    </div>
  );
};

export { Home };
