import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Regresar a inicio</Link>
  </div>
);

export { NotFound };
