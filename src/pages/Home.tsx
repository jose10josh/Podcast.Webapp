import { PodcastList } from '@src/components/PodcastList';
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
      <PodcastList podcastList={podcastList} />
    </div>
  );
};

export { Home };
