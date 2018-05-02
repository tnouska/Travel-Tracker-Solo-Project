import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import postTrackSaga from './trackSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    postTrackSaga(),
  ]);
}
