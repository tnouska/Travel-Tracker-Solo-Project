import React, { Component } from "react";
import IconButton from 'material-ui/IconButton';
import { Delete } from '@material-ui/icons'
import { connect } from 'react-redux';


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
            <IconButton onClick={this.deleteWaypoint}><Delete /></IconButton>
        );//end return
    };//end render 
};//end WaypointListDelete Class

const mapStateToProps = state => ({
    state,
});
export default connect(mapStateToProps)(WaypointListDelete);