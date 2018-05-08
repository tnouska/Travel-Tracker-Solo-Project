import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import WaypointList from './WaypointList/WaypointList'
import MapContainer from './MapContainer/MapContainer'
import xml2js from 'xml2js'


const parseString = xml2js.parseString;

class MapPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      uploadedFile: undefined
    };//end this.state
  };//end constructor

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  };//end componentDidMount

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }//end if
  };//end componentDidUpdate

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  };//end logout function

  handleSubmit = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    //will set FileReader() function to reader variable
    reader.readAsText(this.fileInput.files[0]);
    //reader will read the file that was uploaded at position 0 and output the text of the file as a string
    //to reader.result
    reader.onload = (event) => {
      //reader.onload will run whenever a reading operation is completed.
      parseString(reader.result, (error, result) => {
        if (error) {
          console.log('error on parseString MapPage.js', error);
        } else {
          this.props.dispatch({
            type: 'POST_WAYPOINT',
            payload: { waypoint: result, track: this.props.state.currentMap.currentMapId}
          });//end dispatch to post uploaded Waypoint file
        };//end if/else statement
      });//end parseString function
    };//end reader.onload
  };//end handleSubmit function

  render() {
    console.log('render inside MapPage');
    
    let content = null;
    let WaypointTableContent = this.props.state.waypoint.trackWaypoint.map((waypoint) => {
      return (<WaypointList key={waypoint.id} waypoint={waypoint} />)
    });//end .map of tracklist
    if (this.props.user.userName) {
      content = (
        <div className="mapForm">
          <p>Map Page</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Upload file:
          <input type="file"accept=".gpx"ref={input => {this.fileInput = input}}/>
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
          <MapContainer />
          <button onClick={this.logout}>Log Out</button>
          <table>
            <thead>
              <tr>
                <th>Waypoint number</th>
                <th>Waypoint Date</th>
                <th>Description</th>
              </tr>
            </thead>
            {WaypointTableContent}
          </table>
        </div>
      );//end content
    };//end if statement

    return (
      <div>
        <Nav />
        { content }
      </div>
    );//end return
  };//end render
};//end class

const mapStateToProps = state => ({
  user: state.user,
  state
});
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MapPage);
