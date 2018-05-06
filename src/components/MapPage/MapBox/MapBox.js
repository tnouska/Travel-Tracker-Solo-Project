import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidG5vdXNrYSIsImEiOiJjamd0cnFpdmswbjloMnFtaGF2b2w0cm16In0.DkHibwG8ZvKxcMi4oo0c5A';



class MapBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            lng: 4,
            lat: 4,
            zoom: 1.5
        };
    }


    render() {

        
        return (
            <h1>test</h1>
        );
    }
}

const mapStateToProps = state => ({
    state
});
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MapBox);
