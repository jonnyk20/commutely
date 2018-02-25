import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class PopoverStep extends Component {
  handleClick(mode) {
    console.log('handling click');
    console.log('mode', mode);
    console.log('this.props.step', this.props.step);
    this.props.searchNewDirections(this.props.step, mode);
  }

  render() {
    const { step } = this.props;

    return (
      <div>
        <Menu>
          <MenuItem
            primaryText="Bike"
            onClick={this.handleClick.bind(this, 'BICYCLING')}
          />
          <MenuItem
            primaryText="Car Share"
            onClick={this.handleClick.bind(this, 'DRIVING')}
          />
          <MenuItem
            primaryText="Transit"
            onClick={this.handleClick.bind(this, 'TRANSIT')}
          />
        </Menu>
      </div>
    );
  }
}

export default PopoverStep;
