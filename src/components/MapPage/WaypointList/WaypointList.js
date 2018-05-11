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
import Tooltip from 'material-ui/Tooltip'
import ReactFilestack from 'filestack-react';





class WaypointList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            description: this.props.waypoint.description,
            img_url: this.props.waypoint.img_url
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

    handleImageUpload = (result) => {
        this.setState({
            img_url: result.filesUploaded[0].url
        })
    }

    handleSubmit = () => {
        this.props.dispatch({
            type: 'EDIT_WAYPOINT',
            payload: { 
                waypointState: this.state, 
                waypoint: this.props.waypoint, 
                 }
        });//end .dispatch to edit waypoint info
        this.setState({
            isEditing: false
        });//end setState
    };//end handleSubmit

    showListItem = () => {
        let waypointStart = moment(this.props.waypoint.time).format("YYYY-MM-DD, h:mm a")    
        const options = {
            accept: 'image/*',
            maxFiles: 1,
            storeTo: {
                location: 's3',
            },
        };    
        if (this.state.isEditing) {
            return (
                <tr>
                    <td>{this.props.waypoint.id}</td>
                    <td><TextField type="text" defaultValue={""} onChange={this.handleChangeFor("description")} /></td>
                    <td>{waypointStart}</td>
                    <td><ReactFilestack
                        apikey={"Ahublo2juRQm8zH7O1rh2z"}
                        buttonText="Click me"
                        buttonClass="classname"
                        options={options}
                        onSuccess={this.handleImageUpload}
                    /></td>
                    <td>
                        <Tooltip enterDelay={300} id="tooltip-controlled" leaveDelay={300} placement="bottom" title="Confirm">
                            <IconButton onClick={this.handleSubmit}><Check /></IconButton>
                        </Tooltip>
                    </td>
                    <td>
                        <Tooltip enterDelay={300} id="tooltip-controlled" leaveDelay={300} placement="bottom" title="Cancel">
                            <IconButton onClick={this.handleClickEdit}><Close /></IconButton>
                        </Tooltip>
                    </td>
                </tr>
            );
        } else {
            let image = null
            if (this.props.waypoint.img_url) {
                image = (<a href={this.props.waypoint.img_url}>Image</a>)
            } 
            return (
                <tr>
                    <td>{this.props.waypoint.id}</td>
                    <td>{this.props.waypoint.description}</td>
                    <td>{image}</td>
                    <td>{waypointStart}</td>
                    <td><WaypointListDelete id={this.props.waypoint.id} track_id={this.props.waypoint.track_id} /></td>
                    <td>
                        <Tooltip enterDelay={300} id="tooltip-controlled" leaveDelay={300} placement="bottom" title="Edit">
                            <IconButton onClick={this.handleClickEdit}><Edit /></IconButton>
                        </Tooltip>
                    </td>
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


