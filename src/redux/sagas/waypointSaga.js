import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios'

function* deleteWaypoint(action){
    const config = {
        headers: { 'Content-Type': 'application/json'},
        withCredentials: true,
    };//end config
    try {
        yield call(axios.delete, `/api/waypoint/${action.payload.id}`, config)
        yield put({
            type: 'GET_WAYPOINT',
            payload: action.payload.track_id
        })
    } catch (error) {
        console.log('error in deleteWaypoint: ', error);
    };//end try/catch
};//end deleteWaypoint

function* editWaypoint(action){
    const config = {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    };//end config
    try {
        yield call(axios.put, `/api/waypoint/${action.payload.waypoint.id}`, action.payload, config)
        yield put({
            type: 'GET_WAYPOINT',
            payload: action.payload.waypoint.track_id
        })
    } catch (error) {
        console.log('error in editWaypoint: ', error);
    };//end try/catch
};//end editWaypoint

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
    yield takeEvery('DELETE_WAYPOINT', deleteWaypoint)
    yield takeEvery('EDIT_WAYPOINT', editWaypoint)
};//end waypointSaga

export default waypointSaga