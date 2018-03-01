import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { string } from 'prop-types'
import Walkway from 'walkway.js'
import './styles/LoadingScreen.scss'

/*
 * Description: Loading screen 
 */
@observer
export default class LoadingScreen extends Component {
  componentDidMount() {
    const selector = this.props.className
      ? `#loading-logo.${this.props.className}`
      : '#loading-logo'
    const options = {
      selector,
      duration: '2000'
    }

    let svg = new Walkway(options)
    svg.draw()
    setInterval(() => {
      svg = new Walkway(options)
      svg.draw()
    }, 2000)
  }

  render() {
    return (
      <div id="loading-screen">
        <div id="logo-wrapper">
          <svg
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            id="loading-logo"
            className={this.props.className}>
            <path
              d="M855.4,0L499.7,391.8L144.6,0.6V0H0v1000h144.6V651.4L461.5,1000H658L144.6,434.4V217.6l710.7,781.8v0.6H1000V0  H855.4z M854.8,783L598,500.1l0,0L855.4,217Z"
              stroke="#222222"
              fillOpacity="0"
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h4>Loading...</h4>
        </div>
      </div>
    )
  }
}

LoadingScreen.propTypes = {
  className: string
}
