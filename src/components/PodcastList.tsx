import React from 'react';
import { PodcastItem } from './PodcastItem';

type Props = {
  podcastList: Podcast[];
};

const PodcastList = ({ podcastList }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {podcastList.map((podcast) => (
        <PodcastItem key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};

export { PodcastList };
