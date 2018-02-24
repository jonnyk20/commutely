import React, { Component } from 'react';

class Directions extends Component {
  componentWillUpdate() {
    console.log('component will update');
    console.log('directions', this.props.directions)
  }
  render() {
    console.log('render directions:', this.props.directions)
    return (
      <div className="Directions">
        <div> Directions go Here </div>
      </div>
    );
  }
}

export default Directions;
