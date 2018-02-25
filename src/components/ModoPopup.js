import React, { Component } from 'react';

class ModoPopup extends Component {
  render() {
    const { selectedCar } = this.props;
    console.log(selectedCar);
    return (
      <div>
        <div>{`Category: ${selectedCar.category}`}</div>
        <div>{`Model: ${selectedCar.model}`}</div>
      </div>
    );
  }
}

export default ModoPopup;
