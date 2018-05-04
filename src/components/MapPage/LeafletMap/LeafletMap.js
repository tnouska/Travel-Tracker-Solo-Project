import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const position = [51.505, -0.09]
const map = (
    <div id={'container'}>
    <Map center={position} zoom={13}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
            <Popup>
                <span>A pretty CSS3 popup.<br />Easily customizable.</span>
            </Popup>
        </Marker>
    </Map>
    </div>
)

class LeafletMap extends Component {

    render(){
        return(
            <div id="mapid">
            {map}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    state
});
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(LeafletMap);
