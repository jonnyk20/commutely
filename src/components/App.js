import React, { Component } from 'react';
import FetchResource from '../Resources/FetchResource';
import BasicMap from './Map/BasicMap';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';

class App extends Component {
  loadModoLocation = () => {
    return new Promise(resolve => {
      FetchResource.modoApi('car_list')
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  render() {
    return (
      <div className="App">
        <div> Hey </div>
        <h2>{this.loadModoLocation()}</h2>
        <BasicMap />
        <MapWithSearchAndDirections />
      </div>
    );
  }
}

export default App;
