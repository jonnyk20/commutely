/* global google, firebase */
import React, { Component } from 'react';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Popover from 'material-ui/Popover';
import Paper from 'material-ui/Paper';

import { styles, palette } from '../styles/Theme';
import ModoStore from '../Stores/ModoStore';
import GoogleDirectionStore from '../Stores/GoogleDirectionStore';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';
import Directions from './Directions/Directions';
import SelectedStep from './Directions/SelectedStep';
import ModoButton from './ModoButton';
import NotificationResource from '../Resources/NotificationsResource';

const muiTheme = getMuiTheme({
  fontFamily: 'Proxima Nova Light, sans-serif',
  chip: styles.chip,
  floatingActionButton: styles.floatingActionButton,
  paper: styles.paper,
  card: styles.card
});

class App extends Component {
  state = {
    currentLocation: {},
    directions: {},
    cars: [],
    modoPopup: false,
    selectedCar: {},
    target: {},
    waypoints: []
  };
  setRefs = ref => {
    this.setState({
      refs: { map: ref }
    });
  };

  setDestination = destination => {
    this.setState({
      destination: destination
    });
  };

  selectPoint = (e) => {
    console.log('point selected', e);
    this.setState({
      selectedPoint: e.latLng
    });
  }

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        const position = {
          lat: coords.latitude,
          lng: coords.longitude
        };
        this.setState({ currentLocation: position });
      });
    }
    // experimental firebase stuff
    // this.notifications = new NotificationResource(
    //   firebase.messaging(),
    //   firebase.database()
    // );
    //this.notifications.notify('hey');
  }

  selectStep = step => {
    console.log('selected: ', step);
    const newSteps = this.state.steps.map(item => {
      item.selected = item.id === step.id ? true : false;
      return item;
    });

    this.setState({
      steps: newSteps,
      selectedStep: step
    });
  };

  calculateNewStep = (steps, routes) => {
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
      id: lat_lngs,
      duration: {
        text: moment.duration(duration, 'seconds').humanize(),
        value: duration
      },
      distance: {
        text: `${(distance / 1000).toFixed(2)} km`,
        value: distance
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

  replaceDirectionsFromPoint = (oldStep, firstHalfSteps, firstHalfRoutes, secondHalfSteps, secondHalfRoutes) => {
    const wayPointExists = !!this.state.waypoints[0];

    firstHalfSteps.forEach(step => (step.new = true));
    const calculatedfirstHalfSteps = this.calculateNewStep(firstHalfSteps, firstHalfRoutes);
    const calculatedsecondHalfSteps = this.calculateNewStep(secondHalfSteps, secondHalfRoutes);
    calculatedfirstHalfSteps.travel_mode = this.state.selectedStep.travel_mode;
    const newStepsArray = [calculatedfirstHalfSteps, calculatedsecondHalfSteps];
    this.setState({
      steps: wayPointExists ? [this.state.steps[0], ...newStepsArray] : newStepsArray
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

  switchFromPoint = (mode) => {
    if (this.state.waypoints.length >= 2) {
      console.log('only 2 switches can be made');
      return;
    }
    let firstHalf;
    let secondHalf;
    console.log('switching from this point by', this.state.selectedStep.travel_mode);
    GoogleDirectionStore.mode = this.state.selectedStep.travel_mode;
    GoogleDirectionStore.getDirections(
      //Get directions from start of step to point
      this.state.waypoints[0] || this.state.currentLocation,
      this.state.selectedPoint
    ).then((res) => {
      firstHalf = res;
      GoogleDirectionStore.mode = mode;
      return GoogleDirectionStore.getDirections(
        //Get directions from start of step to point
        this.state.selectedPoint,
        this.state.destination
      ).then((res) => {
        secondHalf = res;
        this.replaceDirectionsFromPoint(this.state.selectedStep, firstHalf.routes[0].legs[0].steps, firstHalf.routes[0], secondHalf.routes[0].legs[0].steps, secondHalf.routes[0]);
        if (mode === 'DRIVING') {
          this.setState({ cars: [] });
          this.findCarLocation(this.state.selectedPoint.lat(), this.state.selectedPoint.lng());
        }
        this.setState({
          waypoints: [...this.state.waypoints, this.state.selectedPoint]
        })
      });
    })

  }

  searchNewDirections = (step, mode) => {
    // tryign to use point instead of step
    GoogleDirectionStore.mode = mode;
    const bounds = new google.maps.LatLngBounds();
    if (!step) {
      GoogleDirectionStore.getDirections(
        this.state.currentLocation,
        this.state.destination
      )
        .then(res => {
          this.setDirections(res);

          res.routes[0].legs[0].steps.forEach(step => {
            bounds.extend(step.start_location);
          });
          this.state.refs.map.fitBounds(bounds);

          if (mode === 'DRIVING') {
            this.setState({ cars: [] });
            if (this.state.currentLocation) {
              this.findCarLocation(
                this.state.currentLocation.lat,
                this.state.currentLocation.lng
              );
            }
          }
        })
        .catch(err => {
          console.err(`err fetching directions ${err}`);
          this.state.refs.map.fitBounds(bounds);
        });
      return;
    }

    const origin = step.start_location;
    const destination = step.end_location;
    GoogleDirectionStore.getDirections(origin, destination).then(res => {
      this.replaceDirections(step, res.routes[0].legs[0].steps, res.routes[0]);
    });
    if (mode === 'DRIVING') {
      this.setState({ cars: [] });
      if (origin) {
        this.findCarLocation(origin.lat(), origin.lng());
      }
    }
  };

  findCarLocation = (lat, lng) => {
    ModoStore.getNearby(lat, lng).then(() => {
      ModoStore.findCarsFromLocation().then(() => {
        this.setState({ cars: ModoStore.blankArray });
      });
    });
  };

  selectModo = (e, car) => {
    this.setState({ modoPopup: true, selectedCar: car, target: e });
  };

  render() {
    const { currentLocation, directions } = this.state;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
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
                    cars={this.state.cars}
                    selectModo={this.selectModo}
                    setDestination={this.setDestination}
                    setRefs={this.setRefs}
                    selectPoint={this.selectPoint}
                    selectedPoint={this.state.selectedPoint}
                    switchFromPoint={this.switchFromPoint}
                  />
                  {this.state.steps && (
                    <SelectedStep
                      step={this.state.steps.find(step => step.selected)}
                      searchNewDirections={this.searchNewDirections}
                    />
                  )}
                  {directions && directions.routes ? (
                    <Directions
                      selectStep={this.selectStep}
                      directions={this.state.directions}
                      steps={this.state.steps}
                      searchNewDirections={this.searchNewDirections}
                    />
                  ) : (
                      <Paper style={paperStyle}>
                        <span>Search for a destination to start</span>
                      </Paper>
                    )}

                  {this.state.modoPopup && (
                    <Popover
                      open={this.state.modoPopup}
                      anchorEl={this.state.target}
                      style={{ padding: '10px 8px 8px 8px' }}
                      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                      onRequestClose={() => {
                        this.setState({
                          modoPopup: false,
                          selecedCar: {},
                          target: {}
                        });
                      }}>
                      <div>
                        <b>Type: </b>
                        {this.state.selectedCar.category}
                      </div>
                      <div>
                        <b>Model: </b>
                        {this.state.selectedCar.model}
                      </div>
                      <div>
                        <b>Seats: </b>
                        {this.state.selectedCar.seats}
                      </div>
                      <ModoButton selectedCar={this.state.selecedCar} />
                    </Popover>
                  )}
                </div>
              );
            }
            return (
              <CircularProgress
                size={150}
                thickness={5}
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            );
          })()}
        </div>
      </MuiThemeProvider>
    );
  }
}

const paperStyle = {
  margin: '20px 15%',
  height: '100px',
  padding: '15px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
export default App;
