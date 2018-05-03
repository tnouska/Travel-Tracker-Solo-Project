import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { triggerLogout } from '../../redux/actions/loginActions';


class MapPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }
  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }
  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            Map Page
          </p>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MapPage);
