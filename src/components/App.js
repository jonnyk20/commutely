/* global google, firebase */
import React, { Component } from 'react';
import moment from 'moment';
import ModoStore from '../Stores/ModoStore';
import GoogleDirectionStore from '../Stores/GoogleDirectionStore';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';
import Directions from './Directions/Directions';
import SelectedStep from './Directions/SelectedStep';
import ModoButton from './ModoButton';

import NotificationResource from '../Resources/NotificationsResource';

class App extends Component {
  state = {
    currentLocation: {},
    directions: {},
    cars: []
  };

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        const position = {
          lat: coords.latitude,
          lng: coords.longitude
        };
        this.setState({ currentLocation: position });

        ModoStore.getNearby(
          this.state.currentLocation.lat,
          this.state.currentLocation.lng
        ).then(() => {
          ModoStore.findCarsFromLocation().then(() => {
            this.setState({ cars: ModoStore.blankArray });
            console.log(this.state.cars);
          });
        });
      });
    }
    // experimental firebase stuff
    this.notifications = new NotificationResource(
      firebase.messaging(),
      firebase.database()
    );
    //this.notifications.notify('hey');
  }

  selectStep = stepId => {
    console.log('selected: ', stepId);
    const newSteps = this.state.steps.map(step => {
      step.selected = step.id === stepId ? true : false;
      return step;
    });

    this.setState({
      steps: newSteps
    });
  };

  calculateNewStep = (steps, routes) => {
    console.log(routes);
    let duration = 0;
    let distance = 0;
    const lat_lngs = [];
    for (let i = 0; i < steps.length; i++) {
      duration += steps[i].duration.value;
      distance += steps[i].distance.value;
      // path = [...path, ...steps[i].lat_lngs];
      steps[i].lat_lngs.forEach(segment => {
        lat_lngs.push(new google.maps.LatLng(segment.lat(), segment.lng()));
      });
    }
    const lastStep = steps[steps.length - 1];
    const mode = steps[0].travel_mode.toLowerCase();
    const humanizeMode = mode.slice(0, 1).toUpperCase() + mode.slice(1);
    let newDirection = {
      duration: {
        text: moment.duration(duration, 'seconds').humanize()
      },
      distance: {
        text: `${(distance / 1000).toFixed(2)} km`
      },
      travel_mode: steps[0].travel_mode,
      instructions: `${humanizeMode} to ${routes.legs[0].end_address}`,
      lat_lngs: lat_lngs
    };
    return newDirection;
  };

  replaceDirections = (oldStep, newSteps, newRoutes) => {
    newSteps.forEach(step => (step.new = true));
    const calculatedNewSteps = this.calculateNewStep(newSteps, newRoutes);
    const newStepsArray = [...this.state.steps];
    newStepsArray.splice(
      this.state.steps.findIndex(step => step.id === oldStep.id),
      1,
      calculatedNewSteps
    );
    this.setState({
      steps: newStepsArray
    });
    GoogleDirectionStore.mode = 'TRANSIT';
  };

  setDirections = directions => {
    let stepId = 1;
    var points = [];
    var myRoute = directions.routes[0].legs[0];
    const steps = [];
    myRoute.steps.forEach(step => {
      step.id = stepId;
      step.selected = false;
      steps.push(step);
      stepId = stepId + 1;
    });
    this.setState({
      steps: steps,
      directions: directions
    });
  };

  searchNewDirections = (step, mode) => {
    const origin = step.start_location;
    const destination = step.end_location;
    GoogleDirectionStore.mode = mode;
    GoogleDirectionStore.getDirections(origin, destination).then(res => {
      this.replaceDirections(step, res.routes[0].legs[0].steps, res.routes[0]);
    });
  };

  render() {
    const { currentLocation, directions } = this.state;
    return (
      <div className="App">
        <div> Hey </div>
        {(() => {
          if (currentLocation && currentLocation.lat) {
            return (
              <div>
                <MapWithSearchAndDirections
                  currentLocation={this.state.currentLocation}
                  setDirections={this.setDirections}
                  path={this.state.path}
                  steps={this.state.steps}
                  selectStep={this.selectStep}
                />
                {directions &&
                  directions.routes &&
                  <Directions
                    selectStep={this.selectStep}
                    directions={this.state.directions}
                    steps={this.state.steps}
                  />}
                {this.state.steps &&
                  <SelectedStep
                    step={this.state.steps.find(step => step.selected)}
                    searchNewDirections={this.searchNewDirections}
                  />}
                {/* {this.state.cars && <ModoButton carId={this.state.cars[0]} />} */}
              </div>
            );
          }
          return <div>Loading...</div>;
        })()}
      </div>
    );
  }
}

export default App;
