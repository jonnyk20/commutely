import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
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
  <GoogleMap defaultCenter={{ lat: 49.201, lng: -122.91 }} defaultZoom={8}>
    <Marker position={{ lat: 49.201, lng: -122.91 }} />
  </GoogleMap>
);

export default BasicMap;
