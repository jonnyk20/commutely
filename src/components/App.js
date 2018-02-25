/* global google */
import React, { Component } from 'react';

import ModoStore from '../Stores/ModoStore';
import GoogleDirectionStore from '../Stores/GoogleDirectionStore';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';
import Directions from './Directions/Directions';
import SelectedStep from './Directions/SelectedStep';

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
  }

  selectStep = stepId => {
    const newSteps = this.state.steps.map(step => {
      step.selected = step.id === stepId ? true : false;
      return step;
    });

    this.setState({
      steps: newSteps
    });
  };

  replaceDirections = (oldStep, newSteps) => {
    newSteps.forEach(step => step.new = true);
    console.log('new steps being replaced')
    console.log('step to be Replaces', oldStep);
    console.log('old Steps', this.state.steps);
    console.log('index of old step');
    console.log(this.state.steps.findIndex(step => step.id === oldStep.id));
    console.log('newSteps', newSteps);
    const newStepsArray = [...this.state.steps];
    newStepsArray.splice(this.state.steps.findIndex(step => step.id === oldStep.id), 1, ...newSteps)
    console.log('REPLACED STEPS');
    console.log(newStepsArray);
    this.setState({
      steps: newStepsArray
    })
  }

  setDirections = directions => {
    console.log('Settign directions in app');
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
    console.log('setting State with steps');
    this.setState({
      steps: steps,
      directions: directions
    });
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
    // this.handleLoadCars();
    // this.handleLoadAvailability();
  }

  handleLoadNearby() {
    ModoStore.getNearby(
      this.state.currentLocation.lat,
      this.state.currentLocation.lng
    ).then(() => {
      ModoStore.findCarsFromLocation().then(res => {
        this.setState({ cars: res });
        console.log(this.state.cars);
      });
    });
  }

  searchNewDirections = step => {
    console.log('searchingfornewdirections');
    console.log(step);
    const origin = step.start_location;
    const destination = step.end_location;
    // GoogleDirectionStore.
    GoogleDirectionStore.mode = 'BICYCLING';
    GoogleDirectionStore.getDirections(origin, destination).then(res => {
      console.log('change to bike', res);
      this.replaceDirections(step, res.routes[0].legs[0].steps);
      // res.routes[0].legs[0].steps.forEach(step => {
      //   bounds.extend(step.start_location);
      // });
    });
  };

  render() {
    console.log('rendering app');
    const { currentLocation, directions } = this.state;
    return (
      <div className="App">
        <div> Hey </div>
        {(() => {
          console.log('here');
          console.log(currentLocation);
          if (currentLocation && currentLocation.lat) {
            console.log('here again');
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
                  <Directions directions={this.state.directions} />}
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
