import React from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid'


const Nav = () => (
  <div className="navbar">
    <div>
      <Grid container justify="flex-start" alignitems="flex-start">
        <Grid item>
          <ul>
            <li>
              <Link to="/track">
                Tracks
              </Link>
            </li>
            <li>
              <Link to="/map">
                Map
              </Link>
            </li>
            <li>
              <Link to="/login">
                Logout
              </Link>
            </li>
          </ul>
        </Grid>
      </Grid>
    </div>
  </div>
);

export default Nav;
