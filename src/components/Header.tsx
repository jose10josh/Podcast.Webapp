import { usePodcast } from '@src/context/podcastContext';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { loading } = usePodcast();

  return (
    <header className="flex justify-between items-center p-8 md:px-12 md:py-6 shadow-lg">
      <div>
        <NavLink to="/" className="font-bold color-main text-xl">
          Podcaster
        </NavLink>
      </div>
      {loading && (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      )}
    </header>
  );
};

export { Header };
