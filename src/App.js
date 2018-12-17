import './App.css';
import React, { Component } from 'react';
import AppHeading from './components/AppHeading';
// import AppInstruction from './components/AppInstruction';
import AppForm from './components/AppForm'
import TrumpTweet from './components/TrumpTweet';
import TrumpImage from './components/TrumpImage';
import {Animated} from 'react-animated-css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentQuote: {},
      quoteVisible: false
    }

    this.setCurrentQuote = this.setCurrentQuote.bind(this)
    this.createTimer = this.createTimer.bind(this)
  }

  timer = null

  // it is important to clear any existing timers when a component unmounts
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  // attach a timer to the component so that we have access to it, in order
  // to clear it if necessary
  createTimer() {
   this.timer = new Promise(function(resolve) {
      setTimeout(resolve, 800)
    })
  }

  async setCurrentQuote (quote) {
    this.setState({quoteVisible: false})
    this.createTimer()
    await this.timer
    this.setState({ currentQuote: quote, quoteVisible: true})
  }

  render() {
    return (
      <div className="App">
        <header className="wiat-app">
          <AppHeading />
          <div className="main-area">
            <div className="screen-side">
              <div className="quote-wrapper">
                <AppForm setCurrentQuote={this.setCurrentQuote}/>
              </div>
            </div>
            <div className="screen-side">
              <TrumpImage loading={!this.state.quoteVisible}/>
              <Animated
                animationIn="fadeIn"
                animationOut="fadeOut"
                isVisible={this.state.quoteVisible}
                animateOnMount={false}
              >
                <TrumpTweet currentQuote={this.state.currentQuote} />
              </Animated>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
