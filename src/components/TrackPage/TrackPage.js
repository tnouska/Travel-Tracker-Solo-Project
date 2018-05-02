import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import xml2js from 'xml2js'



const parseString = xml2js.parseString;
const mapStateToProps = state => ({
  user: state.user,
});


class TrackPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      textFile: undefined,
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
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
          console.log(result);
          // this.props.dispatch({
          //   type: 'POST_FILE',
          //   payload: result
          // });//end dispatch to post uploaded track file
        };//end if/else statement
      });//end parseString function
    };//end reader.onload
  };//end handleSubmit function

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    let content = null;
    // let fileContent = null;
    // if(this.state.textFile) {
    //   fileContent = this.state.textFile.gpx.wpt.map((waypoint)=>{
    //     return (<tr key={waypoint.name}><td>{waypoint.name}</td><td>{waypoint._lat}</td><td>{waypoint._lon}</td></tr>) 
    //   })

    // }

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Upload file:
          <input
                type="file"
                ref={input => {
                  this.fileInput = input;
                }}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
        {/* <table>
          <thead>
            <tr><th>name</th><th>lat</th><th>lon</th></tr>
            </thead>
          <tbody>
          {fileContent}
          </tbody>
        </table> */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TrackPage);

