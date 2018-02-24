import React, { Component } from 'react';
import FetchResource from '../Resources/FetchResource';

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
      </div>
    );
  }
}

export default App;
