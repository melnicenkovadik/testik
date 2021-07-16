/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */
import React from 'react';
import {GoogleMap, Marker, withGoogleMap} from 'react-google-maps';

const Maps = withGoogleMap((props) => (
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{lat: props.lat, lng: props.lng}}
    >
        <Marker position={{lat: props.lat, lng: props.lng}}/>
    </GoogleMap>
));

export default Maps;
