import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-8 md:px-12 md:py-6 shadow-lg">
      <div>
        <NavLink to="/" className="font-bold color-main text-xl">
          Podcaster
        </NavLink>
      </div>
      <p>Loading</p>
    </header>
  );
};

export { Header };
