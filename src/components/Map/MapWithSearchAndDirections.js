/* global google */
import React from 'react';

import _ from 'lodash';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

let home;
const saveOn = { lat: 49.23124000000001, lng: -123.00459539999997 };
let destination;

const MapWithASearch = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${window.api_key}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `200px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      const { currentLocation } = this.props;
      console.log('here');
      if (currentLocation && currentLocation.lat) {
        this.setState({ marker: [{ position: currentLocation }] });
      }
      this.setState({
        bounds: null,
        center: saveOn,
        markers: [{ position: saveOn }],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = _.get(
            nextMarkers,
            '0.position',
            this.state.center
          );
          destination = nextMarkers[0];
          console.log('destination', destination);
          this.setState({
            center: nextCenter,
            markers: [this.state.markers[0], nextMarkers[0]]
          });
          // refs.map.fitBounds(bounds);
          // Render Directions
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route(
            {
              origin: home,
              destination: destination.position,
              travelMode: google.maps.TravelMode.TRANSIT
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                console.log('directions successfully searched');
                console.log('result:', result);
                this.setState({
                  directions: result
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <div>
    <GoogleMap
      center={props.currentLocation}
      defaultZoom={15}
      onBoundsChanged={props.onBoundsChanged}
      ref={props.onMapMounted}>
      <SearchBox
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
        ref={props.onSearchBoxMounted}>
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
            textOverflow: `ellipses`
          }}
          type="text"
        />
      </SearchBox>
      {props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} />
      )}
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  </div>
);

export default MapWithASearch;
