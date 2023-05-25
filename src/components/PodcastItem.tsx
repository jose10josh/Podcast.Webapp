import React from 'react';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const PodcastItem = ({ podcast }: { podcast: Podcast }) => {
  return (
    <article className="text-center relative mb-10">
      <NavLink to={`/podcast/${podcast.id}`}>
        <LazyLoadImage src={podcast.image} className="m-auto rounded-full w-2/5" alt="podcast cover image" />
        {/* <img src={podcast.image} className="m-auto rounded-full w-2/5" /> */}
        <div className="shadow-xl p-5 rounded-lg pt-12 -mt-8">
          <p className="font-medium text-sm">{podcast.title}</p>
          <p className="text-gray-700 text-sm">Author: {podcast.author}</p>
        </div>
      </NavLink>
    </article>
  );
};

export { PodcastItem };
