import React, { Component } from 'react';
import moment from 'moment';
import GoogleDirectionStore from 'Stores/GoogleDirectionStore';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import Step from './Step';

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
      <DirectionContainer className="Directions">
        <Paper>
          <div>
            {durationTime}
          </div>
          <div>
            {`(${(distance / 1000).toFixed(2)} km)`}
          </div>
        </Paper>
      </DirectionContainer>
    );
  }
}

const DirectionContainer = styled.div`
  text-align: center;
  margin-top: 30px;
`;

export default Directions;
