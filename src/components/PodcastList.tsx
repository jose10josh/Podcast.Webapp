import React from 'react';
import { PodcastItem } from './PodcastItem';

type Props = {
  podcastList: Podcast[];
};

const PodcastList = ({ podcastList }: Props) => {
  return (
    <div className="grid grid-cols-6 md:grid-cols-4 gap-6">
      {podcastList.map((podcast, index) => (
        <PodcastItem key={index} podcast={podcast} />
      ))}
    </div>
  );
};

export { PodcastList };
