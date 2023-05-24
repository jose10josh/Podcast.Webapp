import React from 'react';
import { NavLink } from 'react-router-dom';

const PodcastItem = ({ podcast }: { podcast: Podcast }) => {
  return (
    <article className="text-center relative mb-10">
      <NavLink to={`/podcast/${podcast.id}`}>
        <img src={podcast.image} className="m-auto rounded-full w-2/5" />
        <div className="shadow-xl p-5 rouded pt-12 -mt-8">
          <p className="font-medium text-sm">{podcast.title}</p>
          <p className="text-gray-700 text-sm">{podcast.author}</p>
        </div>
      </NavLink>
    </article>
  );
};

export { PodcastItem };
