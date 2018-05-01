import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import TrackPage from './components/TrackPage/TrackPage';
import MapPage from './components/MapPage/MapPage';
import SplashScreen from './components/SplashScreen/SplashScreen'

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Travel Tracker" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/login"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/track"
          component={TrackPage}
        />
        <Route
          path="/map"
          component={MapPage}
        />
        <Route
          path="/home"
          component={SplashScreen}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
