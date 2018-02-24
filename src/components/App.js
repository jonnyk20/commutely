import React, { Component } from 'react';
import ModoStore from '../Stores/ModoStore';
import BasicMap from './Map/BasicMap';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';
import MapWithDirectionsRenderer from './Map/MapWithDirectionsRenderer';

class App extends Component {
  render() {
    ModoStore.getCarList().then(() => {
      console.log(ModoStore.car_list);
    });
    return (
      <div className="App">
        <div> Hey </div>
        <BasicMap />
        <MapWithSearchAndDirections />
      </div>
    );
  }
}

export default App;
