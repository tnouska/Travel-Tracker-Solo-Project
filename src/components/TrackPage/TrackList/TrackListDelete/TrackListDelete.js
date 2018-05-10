import React, { Component } from "react";
import IconButton from 'material-ui/IconButton';
import { Delete } from '@material-ui/icons'
import { connect } from 'react-redux';
import Tooltip from 'material-ui/Tooltip'


class TrackListDelete extends Component {

    deleteTrack = () => {        
        this.props.dispatch({
            type: 'DELETE_TRACK',
            payload: { 
                id: this.props.id
            }//end payload
        });//end dispatch to rootSaga
    };//end deleteTrack function

    render() {
        return (
            
            <Tooltip
                enterDelay={300}
                id="tooltip-controlled"
                leaveDelay={300}
                placement="bottom"
                title="Delete"
            >
            <IconButton aria-label="Delete" onClick={this.deleteTrack}><Delete /></IconButton>
            </Tooltip>
        );//end return
    };//end render 
};//end TrackListDelete Class

const mapStateToProps = state => ({
    state,
});
export default connect(mapStateToProps)(TrackListDelete);