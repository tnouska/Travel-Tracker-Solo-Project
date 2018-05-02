import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import track from './trackReducer'

const store = combineReducers({
  user,
  login,
  track,
});

export default store;
