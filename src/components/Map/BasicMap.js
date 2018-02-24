import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
console.log('api key', window.api_key)
const BasicMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${window.api_key}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap defaultCenter={{ lat: -34.397, lng: 150.644 }} defaultZoom={8}>
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
);

export default BasicMap;
