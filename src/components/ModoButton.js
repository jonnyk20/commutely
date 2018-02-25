import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
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
