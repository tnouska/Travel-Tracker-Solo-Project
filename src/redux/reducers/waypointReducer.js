import { combineReducers } from 'redux';

const trackWaypoint = (state = [], action) => {
    switch (action.type) {
        case 'SET_WAYPOINT':
            return action.payload;
        default:
            return state;
    }//end switch statement
};//end trackWaypoint reducer

export default combineReducers({
    trackWaypoint
})