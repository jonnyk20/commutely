import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class SelectedStep extends Component {
  handleClick(mode) {
    console.log('handling click');
    console.log('mode', mode);
    console.log('this.props.step', this.props.step);
    this.props.searchNewDirections(this.props.step, mode);
  }

  render() {
    return (
      <div>
        <div> Select Method </div>
        <div>
          <FlatButton
            label="Bike"
            onClick={this.handleClick.bind(this, 'BICYCLING')}
            primary={true}
          />
          <FlatButton
            label="Car Share"
            onClick={this.handleClick.bind(this, 'DRIVING')}
            primary={true}
          />
          <FlatButton
            label="Transit"
            onClick={this.handleClick.bind(this, 'TRANSIT')}
            primary={true}
          />
        </div>
      </div>
    );
  }
}

export default SelectedStep;
