import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios'
// import { USER_ACTIONS } from '../actions/userActions';
// import { callUser } from '../requests/userRequests';

function* getTrack(action){
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    }
    try {
        const track = yield call(axios.get, '/api/track', config)        
        yield put({
            type: 'SET_TRACK',
            payload: track.data
        })
    }
    catch (error) {
        console.log('an error in viewShelfSaga ', error);
    }
}

function* postTrack(action){
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    }
    try {        
        yield call(axios.post, '/api/track', action.payload, config)
        yield put({
            type: 'GET_TRACK',
        })
    } catch (error) {
        console.log('error in postTrack', error)
    }
}

function* postTrackSaga(){
    yield takeEvery('POST_TRACK', postTrack)
    yield takeEvery('GET_TRACK', getTrack)
}
export default postTrackSaga;
