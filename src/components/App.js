import React, { Component } from 'react';

import ModoStore from '../Stores/ModoStore';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';
import Directions from './Directions/Directions';

class App extends Component {
  state = {
    // currentLocation: { lat: 49.2035681, lng: -122.9126894 },
    currentLocation: { lat: '', lng: '' }
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
  }

  render() {
    ModoStore.getCarList().then(() => {
      console.log(ModoStore.car_list);
    });
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
                />
                <Directions />
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
