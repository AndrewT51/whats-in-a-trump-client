import './AppHeading.css'
import React, { PureComponent } from 'react'
import {Animated} from "react-animated-css"

export default class AppHeading extends PureComponent {
  render() {
    return (
      <Animated animationIn="bounceInLeft" isVisible={true}>
        <div className="heading-wrapper">
          <h1 className="heading">What's in a Trump?</h1>
        </div>
      </Animated>
    )
  }
}