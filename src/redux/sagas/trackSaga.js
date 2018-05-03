import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios'
// import { USER_ACTIONS } from '../actions/userActions';
// import { callUser } from '../requests/userRequests';

function* deleteTrack(action){    
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    };//end config
    try {        
        yield call(axios.delete, `/api/track/${action.payload.id}`,config)
        yield put({
            type: 'GET_TRACK'
        });//end put to getTrack saga
    } catch (error) {
        console.log('error in deleteTrackSaga', error);
    };//end try/catch
};//end deleteTrack function

function* editTrack(action){
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    };//end config
    try {
        yield call(axios.put, `/api/track/${action.payload.id}`,action.payload,config)
        yield put({
            type: 'GET_TRACK'
        });//end put to getTrack saga
    } catch (error) {
        console.log('error in editTrackSaga', error);
    };//end try/catch
};//end editTrack function

function* getTrack(action){
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    };//end config
    try {
        const track = yield call(axios.get, '/api/track', config)        
        yield put({
            type: 'SET_TRACK',
            payload: track.data
        });//end put to trackReducer
    } catch (error) {
        console.log('an error in viewShelfSaga ', error);
    };//end try/catch
};//end getTrack function

function* postTrack(action){
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    };//end config
    try {        
        yield call(axios.post, '/api/track', action.payload, config)
        yield put({
            type: 'GET_TRACK',
        });//end put to getTrack saga
    } catch (error) {
        console.log('error in postTrack', error)
    };//end try/catch
};//end postTrack function

function* trackSaga(){
    yield takeEvery('POST_TRACK', postTrack)
    yield takeEvery('GET_TRACK', getTrack)
    yield takeEvery('EDIT_TRACK', editTrack)
    yield takeEvery('DELETE_TRACK', deleteTrack)
}
export default trackSaga;
