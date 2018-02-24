import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';



const BasicMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAjf2ss-IiW0kVCh9tRKvF4QGmR_CXJwRA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    defaultZoom={8}
  >
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
));

export default BasicMap;
