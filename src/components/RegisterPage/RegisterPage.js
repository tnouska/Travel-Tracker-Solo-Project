import React, { Component } from 'react';
import Button from 'material-ui/Button'

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    };//end this.state
  };//end constructor

  registerUser = (event) => {
    event.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });//end this.setState
    } else {
      const request = new Request('api/user/register', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });
      // making the request to the server to post the country
      fetch(request)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/login');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })//end .then
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });//end this.setState
        });//end .catch
    };//end if/else
  };//end register user

  goToLogInPage = () => {
    this.props.history.push('/login')
  };//end goToLogInPage

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });//end this.setState
  };//end handleInputChangeFor

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  };//end renderAlert

  render() {
    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
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
            <Button type="submit"value="Register">Register</Button>
            <Button onClick={this.goToLogInPage}>Cancel</Button>
          </div>
        </form>
      </div>
    );//end return
  }//end render
}//end class

export default RegisterPage;

