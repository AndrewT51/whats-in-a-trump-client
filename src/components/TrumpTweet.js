import './TrumpTweet.css'
import React, { Component } from 'react'

export default class TrumpTweet extends Component {
  render() {
    return (
        this.props.currentQuote && this.props.currentQuote.quote
          ? <blockquote>{this.props.currentQuote.quote}</blockquote>
          // : <div className='non-quote'>An opinion on this is still being formed; careful contemplation takes time.</div>
          : <div className='non-quote'>Don't worry! Trump has received your input and is in the process of writing about it...</div>
    )
  }
}