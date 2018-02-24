import React, { Component } from 'react';
import FetchResource from '../Resources/FetchResource';
import BasicMap from './Map/BasicMap';
import MapWithSearch from './Map/MapWithSearch';
import MapWithDirections from './Map/MapWithDirections';

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
    return (
      <div className="App">
        <div> Hey </div>
        <BasicMap />
      </div>
    );
  }
}

export default App;
