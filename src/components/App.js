/* global google, firebase */
import React, { Component } from 'react';

import ModoStore from '../Stores/ModoStore';
import GoogleDirectionStore from '../Stores/GoogleDirectionStore';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';
import Directions from './Directions/Directions';
import SelectedStep from './Directions/SelectedStep';

import NotificationResource from '../Resources/NotificationsResource';

class App extends Component {
  state = {
    currentLocation: {},
    directions: {},
    cars: {}
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
        this.handleLoadNearby();
      });
    }
    // experimental firebase stuff
    this.notifications = new NotificationResource(firebase.messaging(), firebase.database());
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

  replaceDirections = (oldStep, newSteps) => {
    newSteps.forEach(step => (step.new = true));
    const newStepsArray = [...this.state.steps];
    newStepsArray.splice(
      this.state.steps.findIndex(step => step.id === oldStep.id),
      1,
      ...newSteps
    );
    this.setState({
      steps: newStepsArray
    });
    console.log('step: ', this.state.steps);
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

  handleLoadNearby() {
    ModoStore.getNearby(
      this.state.currentLocation.lat,
      this.state.currentLocation.lng
    ).then(() => {
      ModoStore.findCarsFromLocation().then(res => {
        console.log('rest from cars')
        console.log(res)
        this.setState({ cars: res });
        console.log('Cars', this.state.cars);
      });
    });
  }

  searchNewDirections = (step, mode) => {
    const origin = step.start_location;
    const destination = step.end_location;
    GoogleDirectionStore.mode = mode;
    GoogleDirectionStore.getDirections(origin, destination).then(res => {
      this.replaceDirections(step, res.routes[0].legs[0].steps);
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
