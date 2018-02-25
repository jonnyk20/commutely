import React, { Component } from 'react';

import ModoStore from '../Stores/ModoStore';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';
import Directions from './Directions/Directions';

class App extends Component {
  state = {
    currentLocation: {},
    directions: {},
    cars: {},
    nearby: {},
    locations: {},
    available: {}
  };

  setDirections = directions => {
    console.log('settind directions in app');
    console.log(directions);
    this.setState({
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
  }

  handleLoadNearby() {
    ModoStore.getNearby(
      this.state.currentLocation.lat,
      this.state.currentLocation.lng
    ).then(() => {
      if (ModoStore.isLoading === false) {
        this.setState({ nearby: ModoStore.nearby });
        ModoStore.findCarsFromLocation();
        console.log('Cars:', ModoStore.nearbyCars);
      }
    });
  }

  // handleLoadLocations() {
  //   ModoStore.getLocations().then(() => {
  //     if (ModoStore.isLoading === false) {
  //       this.setState({ locations: ModoStore.locations });
  //       console.log('Locations:', ModoStore.locations);
  //     }
  //   });
  // }

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
                />
                <Directions directions={this.state.directions} />
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
