import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import track from './trackReducer'
import waypoint from './waypointReducer'
import currentMap from './mapReducer'

const store = combineReducers({
  user,
  login,
  track,
  waypoint,
  currentMap,
});

export default store;
