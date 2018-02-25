import React, { Component } from 'react';

class SelectedStep extends Component {
  handleClick(mode) {
    this.props.searchNewDirections(this.props.step, mode);
  }

  render() {
    return (
      <div>
        <div> Selected Selected </div>
        <div>
          <button onClick={this.handleClick.bind(this, 'BICYCLING')}>
            {' '}Bike{' '}
          </button>
          <button onClick={this.handleClick.bind(this, 'DRIVING')}>
            CarShare
          </button>
          <button onClick={this.handleClick.bind(this, 'TRANSIT')}>
            Transit
          </button>
        </div>
      </div>
    );
  }
}

export default SelectedStep;
