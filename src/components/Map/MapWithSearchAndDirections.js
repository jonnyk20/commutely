
/* global google */
import React from 'react';

import _ from 'lodash';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

const home = { lat: 49.2348813, lng: -123.02525550000001 };
const saveOn = { lat: 49.23124000000001, lng: -123.00459539999997 };

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${window.api_key}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: home,
        markers: [{ position: home }],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          //console.log('places', places[0].geometry.location.lat(), places[0].geometry.location.lng());

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: [this.state.markers[0], nextMarkers[0]],
          });
          console.log(this.state);
          // refs.map.fitBounds(bounds);
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  (<GoogleMap
    center={props.center}
    defaultZoom={15}
    onBoundsChanged={props.onBoundsChanged}
    ref={props.onMapMounted}
  >
    <SearchBox
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      ref={props.onSearchBoxMounted}
    >
      <input
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
        type="text"
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      (<Marker
        key={index}
        position={marker.position}
      />)
    )}
  </GoogleMap>)
);

export default MapWithASearchBox;
