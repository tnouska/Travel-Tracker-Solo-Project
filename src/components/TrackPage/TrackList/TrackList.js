import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackListDelete from './TrackListDelete/TrackListDelete'



class TrackList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            name: '',
            date: '',
        }
    };//end constructor

    // componentDidMount(){
    //     this.props.dispatch({ type: 'GET_TRACK' })
    // };//end componentDidMount

    handleClick = () => {
        console.log('clicked ', this.state.track);
        this.props.dispatch({
            type: 'DELETE_TRACK',
            payload: this.props.track
        });//end dispatch to saga
    };//end handleClick function

    handleClickEdit = () => {
        this.setState({
            isEditing: true
        });//end setState
        console.log('editing? ', this.state.isEditing);
    };//end handleClickEdit

    handleChangeFor = (type) => {
        return (event) => {
            this.setState({
                ...this.state,
                [type]: event.target.value
            });//end setState
            console.log(this.state);
        };//end return
    };//end handleChangeFor

    handleSubmit = () => {
        this.props.dispatch({
            type: 'EDIT_TRACK',
            payload: { name: this.state.name, date: this.state.date, id: this.props.track.id, person_id: this.props.track.person_id }
        })
        this.setState({
            isEditing: false
        })
    }

    showListItem = () => {
        if (this.state.isEditing) {
            return (
                <tr>
                    <td><input type="text" placeholder={this.props.track.name} onChange={this.handleChangeFor("name")} /></td>
                    <td><input type="date"  placeholder={this.props.track.date} onChange={this.handleChangeFor("date")} /></td>
                    <td><button onClick={this.handleSubmit}>submit</button></td>
                </tr>
            );
        } else {
            return (
                <tr><td>{this.props.track.name}</td><td>{this.props.track.date}</td><td><TrackListDelete id={this.props.track.id}/></td></tr>
            )
        }
    }

    render(){
        console.log('this.props', this.props);
        

        return (
            <table>
                <tbody>
                    {this.showListItem()}
                </tbody>
            </table>
        );//end return
    };//end render
};//end classTrackList

const mapStateToProps = state => ({
    user: state.user,
    state

});

export default connect(mapStateToProps)(TrackList);

