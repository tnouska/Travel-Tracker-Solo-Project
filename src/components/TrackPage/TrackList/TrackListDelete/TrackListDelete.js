import React, { Component } from "react";
import IconButton from 'material-ui/IconButton';
import { Delete } from '@material-ui/icons'
import { connect } from 'react-redux';


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
            <IconButton onClick={this.deleteTrack}><Delete /></IconButton>
        );//end return
    };//end render 
};//end TrackListDelete Class

const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(TrackListDelete);