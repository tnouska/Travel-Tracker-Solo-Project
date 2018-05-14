import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError, triggerLogout, } from '../../redux/actions/loginActions';
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'



const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});//end mapStateToProps

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };//end this.state
  };//end LoginPage constructor

  componentDidMount() {
    this.props.dispatch(clearError());
    this.props.dispatch(triggerLogout());
  };//end componentDidMount

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userName) {
      this.props.history.push('/track');
    }//end if 
  };//end componentWillReceiveProps

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    };//end if/else
  };//end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });//end this.setState
  };//end handleInputChangeFor

  goToRegisterPage = () => {
    this.props.history.push('Register')
  };//end goToRegisterPage

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <Grid item xs={12} zeroMinWidth>
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
        </Grid>
      );
    }
    return (<span />);
  };//end renderAlert

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="flex-start">
        { this.renderAlert() }
        <Grid item xs={12} zeroMinWidth>
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <Button type="submit"name="submit"value="Log In">Submit</Button>
            <Button onClick={this.goToRegisterPage}>Register</Button>
          </div>
        </form>
        </Grid>
      </Grid>
    );//end return
  };//end render
};//end class

export default connect(mapStateToProps)(LoginPage);
