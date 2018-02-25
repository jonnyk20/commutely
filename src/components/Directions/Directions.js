import React, { Component } from 'react';
import moment from 'moment';
import GoogleDirectionStore from 'Stores/GoogleDirectionStore';

class Directions extends Component {
  render() {
    const { directions } = this.props;
    const leg = directions.routes[0].legs[0];
    return (
      <div className="Directions">
        <div> Directions go Here </div>
        <div>{`start address: ${leg.start_address}`}</div>
        <div>{`end address: ${leg.end_address}`}</div>
        <div>{`departrue time: ${moment().format('LT')}`}</div>
        <div>{`arrival time: ${moment()
          .add(leg.duration.value, 's')
          .format('LT')}`}</div>
        <div>{`duration: ${leg.duration.text}`}</div>
        <div>{`distance: ${leg.distance.text}`}</div>
        {GoogleDirectionStore.mode !== 'DRIVING' &&
          <div>
            {leg.steps.map((step, i) => {
              console.log('step: ', step);
              const distance = step.distance.text;
              const duration = step.duration.text;
              const instruction = step.instructions;
              const mode = step.travel_mode;
              return (
                <div
                  key={
                    i
                  }>{`steps: ${mode} ${distance} (${duration}) - ${instruction} `}</div>
              );
            })}
          </div>}
      </div>
    );
  }
}

export default Directions;
