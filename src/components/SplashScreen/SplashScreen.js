import React, { Component } from 'react';
import { connect } from 'react-redux';

class SplashScreen extends Component{

goToMainPage = () => {
    this.props.history.push('login')


}
    render(){        

        return(
            <div className='splashPage'>
                <h1>test</h1>
                <button onClick={this.goToMainPage}>Go To Login</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(SplashScreen)