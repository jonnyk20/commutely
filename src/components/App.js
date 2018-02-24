import React, { Component } from 'react';
import MapWithSearchAndDirections from './Map/MapWithSearchAndDirections';
import MapWithDirectionsRenderer from './Map/MapWithDirectionsRenderer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div> Hey </div>
        <MapWithDirectionsRenderer />
      </div>
    );
  }
}

export default App;
