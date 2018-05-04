import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import trackSaga from './trackSaga';
import waypointSaga from  './waypointSaga'


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    trackSaga(),
    waypointSaga(),
  ]);
}
