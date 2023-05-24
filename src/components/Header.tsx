import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/">Logo</NavLink>
      </div>
      <nav>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          home
        </NavLink>
        <NavLink
          to="/detail"
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          detail
        </NavLink>
      </nav>
    </header>
  );
};

export { Header };
