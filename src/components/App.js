import React, { Component } from 'react';
import ModoStore from '../Stores/ModoStore';
import BasicMap from './Map/BasicMap';

class App extends Component {
  render() {
    ModoStore.getCarList().then(() => {
      console.log(ModoStore.car_list);
    });
    return (
      <div className="App">
        <div> Hey </div>
        <BasicMap />
      </div>
    );
  }
}

export default App;
