import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import WaypointList from './WaypointList/WaypointList'
import MapContainer from './MapContainer/MapContainer'
import xml2js from 'xml2js'
// import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';


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
        <Grid container direction="row">
          <Grid item xs="3" zeroMinWidth>
            <Grid container spacing={0} direction="column">
              <Grid item xs="3" zeroMinWidth>
                <p>Map Page</p>
              </Grid>
              <Grid item xs="3" zeroMinWidth>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Upload file:
                
                <input type="file"accept=".gpx"ref={input => {this.fileInput = input}}/>
                  </label>
                  <br />
                  <button type="submit">Submit</button>
                </form>
              </Grid>
              <Grid item xs="6" zeroMinWidth>
                <table id="track">
                  <thead>
                    <tr>
                      <th>Waypoint number</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  {WaypointTableContent}
                </table>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg="12">
            <MapContainer />
          </Grid>
        </Grid>
      );//end content
    };//end if statement

    return (
      <div>
        <Nav />
        <Grid container spacing={0}>
          <Grid item sm={12}>
            { content }
          </Grid>
        </Grid>
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
