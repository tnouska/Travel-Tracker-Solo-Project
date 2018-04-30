import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/map">
            Map Page
          </Link>
        </li>
        <li>
          <Link to="/track">
            Track Page
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
