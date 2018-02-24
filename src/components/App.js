import React, { Component } from 'react';
import FetchResource from '../Resources/FetchResource';
import BasicMap from './Map/BasicMap';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';

class App extends Component {
  loadModoLocation() {
    return new Promise(resolve => {
      FetchResource.callModo('car_list')
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  render() {
    const modo = this.loadModoLocation();
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
