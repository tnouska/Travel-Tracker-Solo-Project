import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios'

function* getTrackpoint(action) {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    };//end config
    try {
        let trackpoint = yield call(axios.get, `/api/map/${action.payload}`, config)
        yield put({
            type: 'SET_TRACKPOINT',
            payload: trackpoint.data
        });//end put to getTrackpoint reducer
        yield put({
            type: 'FINISH_TRACKPOINT'
        });//end put to getTrackpoint reducer
    } catch (error) {
        console.log('error in getTrackpoint: ', error);
    };//end try/catch
};//end getTrackpoint function

function* mapSaga(){
    yield takeEvery('GET_TRACKPOINT',getTrackpoint)
};//end mapSage
export default mapSaga