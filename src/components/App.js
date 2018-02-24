import React, { Component } from 'react';
import FetchResource from '../Resources/FetchResource';
import BasicMap from './Map/BasicMap';
import MapWithSearch from './Map/MapWithSearch';
import MapWithDirectionsRenderer from './Map/MapWithDirectionsRenderer';

class App extends Component {
  loadModoLocation() {
    FetchResource.callModo('car_list')
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const modo = this.loadModoLocation();
    console.log(modo);
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
