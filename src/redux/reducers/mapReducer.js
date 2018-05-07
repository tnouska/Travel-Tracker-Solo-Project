import { combineReducers } from 'redux';

const currentMapId = (state = [],action) => {
    switch (action.type) {
        case 'SET_CURRENT_MAP_ID':
            return action.payload;
        default:
            return state;
    }//end switch for looking for 'SET_CURRENT_MAP_ID'
};// end currentMap reducer

const allTrackpoint = (state = [0,0], action) => {
    switch (action.type) {
        case 'SET_TRACKPOINT':
            let allCoordinates = [];
            let eachPoint = action.payload.map((point)=>{                
                allCoordinates.push([Number(point.longitude), Number(point.latitude)])                
            })
            return allCoordinates;
        default:
            return state;
    }//end switch looking for 'SET_TRACKPOINT'
};//end allTrackpoint

export default combineReducers({
    currentMapId,
    allTrackpoint
})
