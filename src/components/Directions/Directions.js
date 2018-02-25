import React, { Component } from 'react';
import moment from 'moment';
import GoogleDirectionStore from 'Stores/GoogleDirectionStore';

class Directions extends Component {
  render() {
    const { directions, steps } = this.props;
    const leg = directions.routes[0].legs[0];
    let duration = 0;
    let distance = 0;
    for (let i = 0; i < steps.length; i++) {
      duration += steps[i].duration.value;
      distance += steps[i].distance.value;
    }
    const departureTime = moment().format('LT');
    const arrivalTime = moment().add(duration, 's').format('LT');
    const durationTime = moment.duration(duration, 'seconds').humanize();
    return (
      <div className="Directions">
        <div> Directions go Here </div>
        <div>{`start address: ${leg.start_address}`}</div>
        <div>{`end address: ${leg.end_address}`}</div>
        <div>{`departrue time: ${moment().format('LT')}`}</div>
        <div>{`arrival time: ${moment().add(duration, 's').format('LT')}`}</div>
        <div>{`duration: ${durationTime}`}</div>
        <div>{`distance: ${(distance / 1000).toFixed(2)} km`}</div>

        <div>
          {steps.map((step, i) => {
            console.log(step);
            const distance = step.distance.text;
            const duration = step.duration.text;
            const instruction = step.instructions.replace(
              /<\/?[^>]+(>|$)/g,
              ''
            );
            const mode = step.travel_mode;
            return (
              <div
                key={i}
                onClick={() => {
                  this.props.selectStep(step.id);
                }}>{`steps: ${mode} ${distance} (${duration}) - ${instruction} `}</div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Directions;
