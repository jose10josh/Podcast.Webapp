import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  id: number;
  image: string;
  title: string;
  author: string;
  description: string;
};

const PodcastInfoCard = ({ id, image, title, author, description }: Props) => {
  return (
    <aside className="shadow-xl p-5 w-3/12 h-fit">
      <NavLink to={`/podcast/${id}`}>
        <img src={image} alt="Podcast cover image" className="m-auto" />
      </NavLink>
      <hr className="my-5" />
      <NavLink to={`/podcast/${id}`}>
        <h5 className="mt-2 font-semibold"> {title}</h5>
      </NavLink>
      <NavLink to={`/podcast/${id}`}>
        <i className="text-xs">{author}</i>
      </NavLink>
      <hr className="my-5" />
      <p className="font-semibold text-sm">Description:</p>
      <p className="text-xs">{description?.slice(0, 150)}...</p>
    </aside>
  );
};

export { PodcastInfoCard };
