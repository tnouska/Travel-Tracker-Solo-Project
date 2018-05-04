import { combineReducers } from 'redux';

const allTracks = (state=[],action) => {
    switch (action.type) {
        case 'SET_TRACK': 
            return action.payload;
        default:
            return state;
    }//end switch statement
};//end allTracks reducer

export default combineReducers({
    allTracks
})
