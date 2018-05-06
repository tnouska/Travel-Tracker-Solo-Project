import React, { Component } from 'react';
import { connect } from 'react-redux';
import WaypointListDelete from './WaypointLIstDelete/WaypointListDelete'
import IconButton from 'material-ui/IconButton';
import { Edit } from '@material-ui/icons'
import { Check } from '@material-ui/icons'
import { Close } from '@material-ui/icons'
import moment from 'moment'
import TextField from 'material-ui/TextField';
import { withRouter } from "react-router-dom";




class WaypointList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            name: '',
            time: '',
            description: '',
            img_url: ''
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
        this.props.dispatch({
            type: 'EDIT_WAYPOINT',
            payload: { 
                waypointState: this.state, 
                id: this.props.waypoint.id, 
                person_id: this.props.waypoint.person_id
                 }
        });//end .dispatch to edit waypoint info
        this.setState({
            isEditing: false
        });//end setState
    };//end handleSubmit

    showListItem = () => {        
        let waypointStart = moment(this.props.waypoint.time).format("YYYY-MM-DD")
        let waypointId = this.props.waypoint.id
        if (this.state.isEditing) {
            return (
                <tr>
                    <td>{this.props.waypoint.id}</td>
                    <td><TextField type="text" defaultValue={waypointId} onChange={this.handleChangeFor("description")} /></td>
                    <td><TextField type="date" defaultValue={waypointStart} onChange={this.handleChangeFor("date")} /></td>
                    <td><IconButton onClick={this.handleSubmit}><Check /></IconButton></td>
                    <td><IconButton onClick={this.handleClickEdit}><Close /></IconButton></td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>{this.props.waypoint.id}</td>
                    <td>{this.props.waypoint.description}</td>
                    <td>{moment(waypointStart).format("MM/DD/YYYY")}</td>
                    <td></td>
                    <td><WaypointListDelete id={this.props.waypoint.id} /></td>
                    <td><IconButton onClick={this.handleClickEdit}><Edit /></IconButton></td>
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
};//end class waypointList

const mapStateToProps = state => ({
    user: state.user,
    state

});

const waypointListWithRouter = withRouter(WaypointList)

export default connect(mapStateToProps)(waypointListWithRouter);


