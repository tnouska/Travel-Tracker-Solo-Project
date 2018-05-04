import { combineReducers } from 'redux';

const currentMap = (state = [],action) => {
    switch (action.type) {
        case 'SET_CURRENT_MAP':
            return action.payload;
        default:
            return state;
    }//end switch for looking for 'SET_CURRENT_MAP'
};// end currentMap reducer

export default combineReducers({
    currentMap
})
