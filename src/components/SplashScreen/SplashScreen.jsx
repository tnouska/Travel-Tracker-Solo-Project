import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button'




class SplashScreen extends Component{

goToLoginPage = () => {
    this.props.history.push('login')
}


    render(){

        return(
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper>
                            test
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Button variant="raised" onClick={this.goToLoginPage}>Go To Login</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(SplashScreen)