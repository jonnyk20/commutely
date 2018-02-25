import React, { Component } from 'react';

class ModoButton extends Component {
  handleClick(e, carId) {
    console.log('Car ID', carId);
    window.open(
      `https://bookit.modo.coop/booking?display=select&mobile=0&select_car=${carId}`,
      '_blank'
    );
  }

  render() {
    const { carId } = this.props;
    console.log(carId);
    return (
      <div>
        <button onClick={this.handleClick.bind(this, carId)}>
          Book with Modo
        </button>
      </div>
    );
  }
}

export default ModoButton;
