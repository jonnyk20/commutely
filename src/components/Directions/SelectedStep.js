import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

class SelectedStep extends Component {
  handleClick(mode) {
    console.log('handling click');
    console.log('mode', mode);
    console.log('this.props.step', this.props.step);
    this.props.searchNewDirections(this.props.step, mode);
  }

  render() {
    return (
      <Paper style={styles.paperStyle}>
        <div> Select Method </div>
        <div>
          <FlatButton
            label="Bike"
            onClick={this.handleClick.bind(this, 'BICYCLING')}
            primary={true}
          />
          <FlatButton
            label="Car Share"
            onClick={this.handleClick.bind(this, 'DRIVING')}
            primary={true}
          />
          <FlatButton
            label="Transit"
            onClick={this.handleClick.bind(this, 'TRANSIT')}
            primary={true}
          />
        </div>
      </Paper>
    );
  }
}

const styles = {
  paperStyle: {
    margin: '0px 15%',
    marginTop: '15px',
    padding: '15px',
    textAlign: 'center'
  }
};

export default SelectedStep;
