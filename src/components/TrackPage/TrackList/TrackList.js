import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackListDelete from './TrackListDelete/TrackListDelete'
import IconButton from 'material-ui/IconButton';
import { Edit } from '@material-ui/icons'
import { Check } from '@material-ui/icons'
import { Close } from '@material-ui/icons'
import { Map } from "@material-ui/icons";
import moment from 'moment'
import TextField from 'material-ui/TextField';
import { withRouter } from "react-router-dom";
import Tooltip from 'material-ui/Tooltip'




class TrackList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            name: this.props.track.name,
            date: this.props.track.date,
        };//end this.state
    };//end constructor

    handleClickEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });//end setState
    };//end handleClickEdit

    handleChangeFor = (type) => {
        return (event) => {
            this.setState({
                ...this.state,
                [type]: event.target.value
            });//end setState
        };//end return
    };//end handleChangeFor

    handleSubmit = () => {
        if (!this.state.name) {
            this.setState({
                name: this.props.track.name
            });//end setState
        } else {
            console.log('0');
        }
        if (!this.state.date) {
            this.setState({
                date: this.props.track.date
            });//end setState
        } else {
            console.log('1');
        }
        this.props.dispatch({
            type: 'EDIT_TRACK',
            payload: { name: this.state.name, date: this.state.date, id: this.props.track.id, person_id: this.props.track.person_id }
        });//end .dispatch to edit track info
        this.setState({
            isEditing: false
        });//end setState
    };//end handleSubmit

    handleMapPageChange = () => {
        this.props.dispatch({
            type: 'SET_CURRENT_MAP_ID',
            payload: this.props.track.id
        });//end dispatch to send selected map into redux
        this.props.dispatch({ 
            type: 'GET_TRACKPOINT', 
            payload: this.props.track.id
        });
        this.props.dispatch({ 
            type: 'GET_WAYPOINT', 
            payload: this.props.track.id
        });
        this.props.history.push('/map')
    };//end handleMapPageChange

    showListItem = () => {
        let trackStart = moment(this.props.track.date).format("YYYY-MM-DD")
        let trackName = this.props.track.name
        if (this.state.isEditing) {
            return (
                <tr>
                    <td><TextField type="text" defaultValue={trackName} onChange={this.handleChangeFor("name")} /></td>
                    <td><TextField type="date" defaultValue={trackStart} onChange={this.handleChangeFor("date")} /></td>
                    <td>
                        <Tooltip enterDelay={300}id="confirm"leaveDelay={300}placement="bottom"title="Confirm">
                            <IconButton onClick={this.handleSubmit}><Check/></IconButton>
                        </Tooltip>
                    </td>
                    <td>
                        <Tooltip enterDelay={300}id="tooltip-controlled"leaveDelay={300}placement="bottom"title="Cancel">
                            <IconButton onClick={this.handleClickEdit}><Close/></IconButton>
                        </Tooltip>
                        </td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>{this.props.track.name}</td>
                    <td>{moment(trackStart).format("MM/DD/YYYY")}</td>
                    <td><TrackListDelete id={this.props.track.id}/></td>
                    <td>
                        <Tooltip enterDelay={300} id="tooltip-controlled" leaveDelay={300} placement="bottom" title="Edit">
                            <IconButton onClick={this.handleClickEdit}><Edit/></IconButton>
                        </Tooltip>
                    </td>
                    <td>
                        <Tooltip enterDelay={300} id="tooltip-controlled" leaveDelay={300} placement="bottom" title="Map of Track">
                            <IconButton onClick={this.handleMapPageChange}><Map /></IconButton>
                        </Tooltip>
                    </td>
                    </tr>
            );//end return
        }//end if/else
    };// end showListItem function

    render(){      
        return (
            <tbody>
                {this.showListItem()}
            </tbody>
        );//end return
    };//end render
};//end classTrackList

const mapStateToProps = state => ({
    user: state.user,
    state

});

const trackListWithRouter = withRouter(TrackList)

export default connect(mapStateToProps)(trackListWithRouter);

