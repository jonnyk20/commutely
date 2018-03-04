import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';

class ModoButton extends Component {
  handleClick(e) {
    e.preventDefault();

    window.open(
      `https://bookit.modo.coop/booking?display=select&mobile=0&select_car=${
        this.props.selectedCar.id
      }&pickup_time={${moment().format('hh:mm')}}`,
      '_blank'
    );
  }

  render() {
    const { selectedCar } = this.props;
    return (
      <div>
        <div>
          <b>Type: </b>
          {selectedCar.category}
        </div>
        <div>
          <b>Car: </b>
          {`${selectedCar.make} ${selectedCar.model}`}
        </div>
        <div>
          <b>Seats: </b>
          {selectedCar.seats}
        </div>
        <FlatButton
          label="Book With Modo"
          onClick={this.handleClick.bind(this)}
          fullWidth={true}
          primary={true}
        />
      </div>
    );
  }
}

export default ModoButton;
