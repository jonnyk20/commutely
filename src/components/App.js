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

  setDirections = directions => {
    this.setState({
      directions: directions
    });
  };

  handleLoadNearby(lat = null, lng = null) {
    ModoStore.getNearby(this.state.lat, this.state.lng).then(() => {
      if (ModoStore.isLoading === false) {
        this.setState({ nearby: ModoStore.nearby });
        //console.log(this.state.nearby);
      }
    });
  }

  handleLoadCars() {
    ModoStore.getCars().then(() => {
      if (ModoStore.isLoading === false) {
        this.setState({ nearby: ModoStore.cars });
        //console.log(this.state.cars);
      }
    });
  }

  handleLoadAvailability() {
    ModoStore.getAvailability().then(() => {
      if (ModoStore.isLoading === false) {
        this.setState({ available: ModoStore.availability });
        //console.log(this.state.availability);
      }
    });
  }

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
                />
                {directions &&
                  directions.routes &&
                  <Directions directions={this.state.directions} />}
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
