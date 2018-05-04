import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import track from './trackReducer'
import waypoint from './waypointReducer'

const store = combineReducers({
  user,
  login,
  track,
  waypoint,
});

export default store;
