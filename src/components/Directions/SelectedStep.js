import React, { Component } from 'react';

class SelectedStep extends Component {
  handleClick = () => {
    this.props.searchNewDirections(this.props.step);
  };

  render() {
    return (
      <div>
        <div> Selected Selected </div>
        <div>
          <button onClick={this.handleClick}> Bike </button>
        </div>
      </div>
    )
  }
}

export default SelectedStep;