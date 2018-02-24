import React, { Component } from 'react';

class Directions extends Component {
  render() {
    const { directions } = this.props;
    const leg = directions.routes[0].legs[0];
    console.log('render: ', leg);
    return (
      <div className="Directions">
        <div> Directions go Here </div>
        <div>{`start address: ${leg.start_address}`}</div>
        <div>{`end address: ${leg.end_address}`}</div>
        <div>{`departrue time: ${leg.departure_time.text}`}</div>
        <div>{`arrival time: ${leg.arrival_time.text}`}</div>
        <div>{`duration: ${leg.duration.text}`}</div>
        <div>{`distance: ${leg.distance.text}`}</div>
        {leg.steps.map(step => {
          console.log(step);
          const distance = step.distance.text;
          const duration = step.duration.text;
          const instruction = step.instructions;
          const mode = step.travel_mode;
          return (
            <div>{`steps: ${mode} ${distance} (${duration}) - ${instruction} `}</div>
          );
        })}
      </div>
    );
  }
}

export default Directions;
