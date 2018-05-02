import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios'
// import { USER_ACTIONS } from '../actions/userActions';
// import { callUser } from '../requests/userRequests';

function* postTrack(action){
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    }
    try {
        const newTrack = yield call(axios.post, '/api/track', action.payload, config)
        yield put({
            type: 'GET_TRACK',
        })
    } catch (error) {
        console.log('error in postTrack', error)
    }
}

function* postTrackSaga(){
    yield takeEvery('POST_TRACK', postTrack)
}
export default postTrackSaga;
