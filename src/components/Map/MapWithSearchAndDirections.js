/* global google */
import React from 'react';
import FaAnchor from 'react-icons/lib/fa/anchor';

import _ from 'lodash';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polyline,
  InfoWindow
} from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import FlatButton from 'material-ui/FlatButton';

import GoogleDirectionStore from '../../Stores/GoogleDirectionStore';
import mapStyle from './mapStyle.json';

let home;
const testLocation = { lat: 49.23124000000001, lng: -123.00459539999997 };
const douglas = { lat: 49.2035681, lng: -122.9126894 };
let destination;

const MapWithASearch = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      const { currentLocation } = this.props;
      if (currentLocation && currentLocation.lat) {
        this.setState({ markers: [{ position: currentLocation }] });
      }
      this.setState({
        bounds: null,
        center: currentLocation,
        onMapMounted: ref => {
          refs.map = ref;
          this.props.setRefs(ref);
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
          this.setState({
            center: nextCenter,
            markers: [this.state.markers[0], nextMarkers[0]]
          });
          // refs.map.fitBounds(bounds);
          // Render Directions
          this.props.setDestination(destination.position);
          GoogleDirectionStore.getDirections(
            currentLocation,
            destination.position
          )
            .then(res => {
              this.props.setDirections(res);
              res.routes[0].legs[0].steps.forEach(step => {
                bounds.extend(step.start_location);
              });
              refs.map.fitBounds(bounds);
            })
            .catch(err => {
              console.err(`err fetching directions ${err}`);
              refs.map.fitBounds(bounds);
            });
        }
      });
    }
  }),
  withGoogleMap
)(props => (
  <div>
    <GoogleMap
      center={props.currentLocation}
      defaultZoom={15}
      onBoundsChanged={props.onBoundsChanged}
      ref={props.onMapMounted}
      defaultOptions={{ styles: mapStyle }}>
      <SearchBox
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
        ref={props.onSearchBoxMounted}>
        <input
          placeholder="Search for a destination"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `50px`,
            marginLeft: `-105px`,
            padding: `0 5px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
          type="text"
        />
      </SearchBox>
      {props.markers.map((marker, index) => (
        <Marker key={index} position={marker.position} />
      ))}
      {props.selectedPoint &&
        <Marker
          position={props.selectedPoint}
          icon={{
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5
          }}
          onClick={e => {
            console.log('point clicked')
          }}
        >
          <InfoWindow >
            <div>
              <div onClick={() => { props.switchFromPoint('WALKING') }}> Walk </div>
              <div onClick={() => { props.switchFromPoint('DRIVING') }}> Drive </div>
              <div onClick={() => { props.switchFromPoint('TRANSIT') }}> Transit </div>
              <div onClick={() => { props.switchFromPoint('BICYCLING') }}> Bike </div>
            </div>
          </InfoWindow>

        </Marker>
      }
      {props.cars.map((car, index) => {
        return (
          <Marker
            key={index}
            position={{ lat: Number(car.lat), lng: Number(car.lng) }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10
            }}
            onClick={e => {
              props.selectModo(e.xa.target, car);
            }}
          />
        );
      })}
      {props.steps &&
        props.steps.map((step, i) => {
          let color = 'blue';
          switch (step.travel_mode) {
            case 'WALKING':
              color = 'gray';
              break;
            case 'WALKING':
              color = 'yellow';
              break;
            case 'DRIVING':
              color = 'black';
              break;
            case 'BICYCLING':
              color = 'orange';
              break;
            default:
              break;
          }
          if (step.selected) {
            color = 'green';
          }
          return (
            <Polyline
              key={i}
              path={step.lat_lngs}
              options={{
                strokeColor: color,
                strokeWeight: 5
              }}
              onClick={(e) => {
                if (!step.new) {
                  props.selectStep(step);
                }
                props.selectPoint(e);
              }}
            />
          );
        })}

      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  </div>
));

export default MapWithASearch;
