import { combineReducers } from 'redux';

const allTracks = (state=[],action) => {
    switch (action.type) {
        case 'SET_TRACK': 
            return action.payload;
    
        default:
            return state;
    }
}

export default combineReducers({
    allTracks
})
