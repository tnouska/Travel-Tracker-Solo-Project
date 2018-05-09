import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import xml2js from 'xml2js'
import TrackList from './TrackList/TrackList'
import Button from 'material-ui/Button'
// import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
// import {FileUpload} from '@material-ui/icons'
// import IconButton from 'material-ui/IconButton';
// import Tooltip from 'material-ui/Tooltip'




const parseString = xml2js.parseString;


class TrackPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      textFile: undefined,
      selectedTrack: 0,
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'GET_TRACK' })
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }

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
          console.log('error on parseString TrackPage.js', error);
        } else {
          this.props.dispatch({
            type: 'POST_TRACK',
            payload: result
          });//end dispatch to post uploaded track file
        };//end if/else statement
      });//end parseString function
    };//end reader.onload
  };//end handleSubmit function



  render() {
    let content = null;
    let trackTableContent = this.props.state.track.allTracks.map((track)=>{
      return (<TrackList key={track.id} track={track}/>)
    });//end .map of tracklist

    if (this.props.user.userName) {
      content = (
      <Grid container>
        <Grid item md={12}>
          <h1 id="welcome">
            Welcome, { this.props.user.userName }!
          </h1>
        <Grid/>
        <Grid item md={12}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Upload .gpx file to get access to:
              <input type="file"accept=".gpx"ref={input => {this.fileInput = input;}}/>
            </label>
            <br />
            <Button type="submit">Submit</Button>
          </form>
        </Grid>
        <Grid item md={12}>
          <table>
            <thead>
              <tr>
                <th>Track Name</th>
                <th>Track Start Date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
              {trackTableContent}
          </table>
        </Grid>
        </Grid>
      </Grid>
      );
    } else {
      content = null
    };//end if/else

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
export default connect(mapStateToProps)(TrackPage);

