import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import { ActionSwapVert } from 'material-ui';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingMarkerInfoWindow: false,
            showingNewWaypointWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
        this.bounds = {};
    }

    componentWillReceiveProps(nextProps) {
        this.bounds = new this.props.google.maps.LatLngBounds();
        for (let i = 0; i < nextProps.state.currentMap.allTrackpoint.length; i++) {
            this.bounds.extend(nextProps.state.currentMap.allTrackpoint[i]);
        }
        return true;
    }

    onMarkerClick = (props, marker, e) =>{        
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    }

    onMapClicked = (props, e) => {   
        if (this.state.showingMarkerInfoWindow) {
            this.setState({
                showingMarkerInfoWindow: false,
                activeMarker: null
            })
        // } else if (!this.state.showingNewWaypointWindow){
            // this.setState({
            //     selectedPlace: props,
            //     showingMarkerInfoWindow: true
            // })
            // console.log('this.state.selectedPlace: ',this.state.selectedPlace);
            
        }

        
    };

    render() {        
        if (!this.props.loaded) {
            return (
                <div>Loading...</div>
            )
        } else { 
            let coordinates = this.props.state.currentMap.allTrackpoint
            let waypoints = this.props.state.waypoint.trackWaypoint.map((item)=>{
                return (<Marker
                    key={item.id}
                    onClick={this.onMarkerClick}
                    title={item.description}
                    name={item.id}
                    position={{ lat: Number(item.latitude), lng: Number(item.longitude) }} />)
            })

            
        return (
        
            <Map 
            onClick={this.onMapClicked}
            google={this.props.google} 
            zoom={14} 
            className={'map'}
                style={{ width: '90vw', height: '75vh', position: 'relative'}}
            initialCenter={{ lat: this.props.state.currentMap.allTrackpoint[0].lat, lng: this.props.state.currentMap.allTrackpoint[0].lng }}
            bounds={this.bounds}
            >
                {waypoints}
                <InfoWindow marker={this.state.activeMarker}visible={this.state.showingMarkerInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
                {/* <InfoWindow visible={this.state.showingNewWaypointWindow}>

                </InfoWindow> */}
                <Polyline 
                    path= { coordinates }
                    strokeColor="#FF0000"
                    strokeOpacity={1}
                    strokeWeight={5}
                />
            </Map>
        )}
    }
}
const mapStateToProps = state => ({
    user: state.user,
    state

});


const googleConnectedMapComponent = GoogleApiWrapper({apiKey: ("AIzaSyB1IumIjb9ISfpcy24EQ142I_DP_ExI4LA")})(MapContainer)

export default connect(mapStateToProps)(googleConnectedMapComponent)
