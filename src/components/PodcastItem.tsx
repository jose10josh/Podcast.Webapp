import React from 'react';

const PodcastItem = ({ podcast }: { podcast: Podcast }) => {
  return (
    <div className="shadow-md rouded p-3 text-center">
      <p>{podcast['im:name'].label}</p>
    </div>
  );
};

export { PodcastItem };
