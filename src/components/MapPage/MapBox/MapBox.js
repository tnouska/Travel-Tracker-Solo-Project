import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';




class MapBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            lng: 4,
            lat: 4,
            zoom: 1.5
        };
    }
    showMap = (coordinates) =>{
        mapboxgl.accessToken = 'pk.eyJ1IjoidG5vdXNrYSIsImEiOiJjamd0cnFpdmswbjloMnFtaGF2b2w0cm16In0.DkHibwG8ZvKxcMi4oo0c5A';
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v10'
        });        
        map.on('load', function () {

            map.addLayer({
                "id": "route",
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": coordinates
                        }
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "#888",
                    "line-width": 8
                }
            });
        });
    }
    componentWillMount(){
        console.log('test component will mount');
    }
    componentDidUpdate(){  
        console.log('test component will mount');
        console.log('this.props.state',this.props.state.currentMap.allTrackpoint);
      
        this.showMap(this.props.state.currentMap.allTrackpoint)

    }
    render() {
        console.log('inside mapbox render');
        
        const style = {
            position: 'absolute',
            top: 400,
            bottom: 0,
            width: '50%',
            height: '50%'
    };
        
        return (
            <div style={style} ref={el => this.mapContainer = el}>test</div>
        );
    }
}

const mapStateToProps = state => ({
    state
});
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MapBox);
