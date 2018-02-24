import React, { Component } from 'react';
import ModoStore from '../Stores/ModoStore';
import BasicMap from './Map/BasicMap';

class App extends Component {
  state = {
    lat: 49.201,
    lng: -122.91,
    cars: {},
    nearby: {},
    available: {}
  };

  componentDidMount() {
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
    ModoStore.getCarList().then(() => {
      if (ModoStore.isLoading === false) {
        this.setState({ cars: ModoStore.car_list });
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
    return (
      <div className="App">
        <div> Hey </div>
        <BasicMap />
      </div>
    );
  }
}

export default App;
