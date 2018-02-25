import React, { Component } from 'react';
import moment from 'moment';

class ModoButton extends Component {
  handleClick(e) {
    e.preventDefault();

    window.open(
      `https://bookit.modo.coop/booking?display=select&mobile=0&select_car=${325}&pickup_time={${moment().format(
        'hh:mm'
      )}}`,
      '_blank'
    );
  }

  render() {
    const { car } = this.props;
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>Book with Modo</button>
      </div>
    );
  }
}

export default ModoButton;
