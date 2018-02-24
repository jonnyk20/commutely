import React, { Component } from 'react';
import ModoStore from '../Stores/ModoStore';
import BasicMap from './Map/BasicMap';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';

class App extends Component {
  state = {
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
    return (
      <div className="App">
        <div> Hey </div>
        <MapWithSearchAndDirections
          currentLocation={this.state.currentLocation}
        />
      </div>
    );
  }
}

export default App;
