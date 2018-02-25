import React, { Component } from 'react';

class Step extends Component {
  render() {
    const { steps } = this.props;
    console.log('first step:', steps[0]);
    console.log('last step: ', steps[steps.length - 1]);
    return (
      <div>
        <p>this is direction group</p>
      </div>
    );
  }
}

export default Step;
