import React, { Component } from 'react';
import { connect } from 'react-redux';
import WaypointListDelete from './WaypointLIstDelete/WaypointListDelete'
import IconButton from 'material-ui/IconButton';
import { Edit } from '@material-ui/icons'
import { Check } from '@material-ui/icons'
import { Close } from '@material-ui/icons'
import { Map } from "@material-ui/icons";
import moment from 'moment'
import TextField from 'material-ui/TextField';
import { withRouter } from "react-router-dom";




class WaypointList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            name: '',
            date: '',
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

    showListItem = () => {
        let trackStart = moment(this.props.track.date).format("YYYY-MM-DD")
        let trackName = this.props.track.name
        if (this.state.isEditing) {
            return (
                <tr>
                    <td><TextField type="text" defaultValue={trackName} onChange={this.handleChangeFor("name")} /></td>
                    <td><TextField type="date" defaultValue={trackStart} onChange={this.handleChangeFor("date")} /></td>
                    <td><IconButton onClick={this.handleSubmit}><Check /></IconButton></td>
                    <td><IconButton onClick={this.handleClickEdit}><Close /></IconButton></td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>{this.props.track.name}</td>
                    <td>{trackStart}</td>
                    <td><TrackListDelete id={this.props.track.id} /></td>
                    <td><IconButton onClick={this.handleClickEdit}><Edit /></IconButton></td>
                    <td><IconButton onClick={this.handleMapPageChange}><Map /></IconButton></td>
                </tr>
            );//end return
        }//end if/else
    };// end showListItem function

    render() {
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

const waypointListWithRouter = withRouter(Waypoint)

export default connect(mapStateToProps)(waypointListWithRouter);


