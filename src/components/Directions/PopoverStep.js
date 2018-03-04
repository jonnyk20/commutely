import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import GoogleDirectionStore from 'Stores/GoogleDirectionStore';
class PopoverStep extends Component {
  handleClick(mode) {
    this.props.searchNewDirections(this.props.step, mode);
  }

  render() {
    const { step, selectNewMode, showDetail } = this.props;
    return (
      <div>
        <Menu>
          <MenuItem
            primaryText="Bike"
            onClick={() => {
              selectNewMode('BICYCLING');
            }}
          />
          <MenuItem
            primaryText="Car Share"
            onClick={() => {
              selectNewMode('DRIVING');
            }}
          />
          <MenuItem
            primaryText="Transit"
            onClick={() => {
              selectNewMode('TRANSIT');
            }}
          />
          <Divider />
          <MenuItem
            primaryText="Details"
            onClick={() => {
              showDetail(step);
            }}
          />
        </Menu>
      </div>
    );
  }
}

export default PopoverStep;
