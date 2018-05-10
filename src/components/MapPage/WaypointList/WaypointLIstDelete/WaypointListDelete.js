import React, { Component } from "react";
import IconButton from 'material-ui/IconButton';
import { Delete } from '@material-ui/icons'
import { connect } from 'react-redux';
import Tooltip from 'material-ui/Tooltip'


class WaypointListDelete extends Component {

    deleteWaypoint = () => {
        this.props.dispatch({
            type: 'DELETE_WAYPOINT',
            payload: {
                id: this.props.id
            }//end payload
        });//end dispatch to rootSaga
    };//end deleteWaypoint function

    render() {
        return (
            <Tooltip enterDelay={300} id="tooltip-controlled" leaveDelay={300} placement="bottom" title="Map of Track">
            <IconButton onClick={this.deleteWaypoint}><Delete /></IconButton>
            </Tooltip>
        );//end return
    };//end render 
};//end WaypointListDelete Class

const mapStateToProps = state => ({
    state,
});
export default connect(mapStateToProps)(WaypointListDelete);