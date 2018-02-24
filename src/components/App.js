/* global google */
import React, { Component } from 'react';

import ModoStore from '../Stores/ModoStore';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';
import Directions from './Directions/Directions';

class App extends Component {
  state = {
    currentLocation: {},
    directions: {},
    lat: 49.201,
    lng: -122.91,
    cars: {},
    nearby: {},
    available: {}
  };

  setDirections = (directions) => {
    console.log('settind directions in app');
    console.log(directions);
    this.setState({
      directions: directions
    });
    var points = [];
    var myRoute = directions.routes[0].legs[0];
    const steps = [];
    myRoute.steps.forEach(step => {
      steps.push(step);
    });
    this.setState({
      steps: steps
    });

    for (var i = 0; i < myRoute.steps.length; i++) {
      for (var j = 0; j < myRoute.steps[i].lat_lngs.length; j++) {
        points.push(myRoute.steps[i].lat_lngs[j]);
      }
    }

    this.setState({
      path: points
    })
    console.log('path', points)
    /// drawRoute
    // var routLine = new google.maps.Polyline(
    //   {
    //     path: points,
    //     strokeColor: "Red",
    //     strokeOpacity: 0.5,
    //     strokeWeight: 10
    //   }
    // );
    // routLine.setMap(map);

    // // Add a listener for the rightclick event on the routLine
    // google.maps.event.addListener(routLine, 'mouseover', function () {
    //   alert("moused over straight line!");
    // });
    /////////
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
    this.handleLoadNearby();
    // this.handleLoadCars();
    // this.handleLoadAvailability();
  }

  handleLoadNearby(lat = null, lng = null) {
    ModoStore.getNearby(this.state.lat, this.state.lng).then(() => {
      if (ModoStore.isLoading === false) {
        this.setState({ nearby: ModoStore.nearby });
        console.log(this.state.nearby);
      }
    });
  }

  handleLoadCars() {
    ModoStore.getCars().then(() => {
      if (ModoStore.isLoading === false) {
        this.setState({ nearby: ModoStore.cars });
        console.log(this.state.cars);
      }
    });
  }

  handleLoadAvailability() {
    ModoStore.getAvailability().then(() => {
      if (ModoStore.isLoading === false) {
        this.setState({ available: ModoStore.availability });
        console.log(this.state.availability);
      }
    });
  }

  render() {
    const { currentLocation } = this.state;
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
                />
                <Directions directions={this.state.directions} />
              </div>
            );
          }
          return <div>Loading...</div>;
        })()}
      </div >
    );
  }
}

export default App;
