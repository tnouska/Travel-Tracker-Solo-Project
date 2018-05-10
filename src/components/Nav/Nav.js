import React from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid'


const Nav = () => (
  <div className="navbar">
    <div>
      <Grid container justify="space-around" alignitems="center" >
          <ul>
            <li id="navTrack">
              <Grid item xs="3">
                <Link to="/track">
                  Tracks
                </Link>
              </Grid>
            </li>
            <li id="navMap">
              <Grid item xs="3">
                <Link to="/map">
                  Map
                </Link>
              </Grid>
            </li>
            <li id="navLogin">
              <Grid item xs="3">
                <Link to="/login">
                  Logout
                </Link>
              </Grid>
            </li>
          </ul>
        </Grid>
    </div>
  </div>
);

export default Nav;
