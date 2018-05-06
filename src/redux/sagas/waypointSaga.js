import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios'

function* getWaypoint(action){
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    };//end config
    try {
        let waypoint = yield call(axios.get, `/api/waypoint/${action.payload}`, config)
        yield put({
            type: 'SET_WAYPOINT',
            payload: waypoint.data
        });//end put to waypoint reducer
    } catch (error) {
        console.log('error in getWaypoint: ', error);
    };//end try/catch
};//end getWaypoint function

function* postWaypoint(action){
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    };//end config
    try {
        yield call(axios.post, '/api/waypoint', action.payload, config)
        yield put({
            type: 'GET_WAYPOINT',
            payload: action.payload.track
        });//end put to getTrack saga
    } catch (error) {
        console.log('error in postWaypoint', error)
    };//end try/catch
};//end postWaypoint function


function* waypointSaga() {
    yield takeEvery('POST_WAYPOINT', postWaypoint)
    yield takeEvery('GET_WAYPOINT', getWaypoint)
}

export default waypointSaga