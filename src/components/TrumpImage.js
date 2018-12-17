import './TrumpImage.css'
import React, { Component } from 'react';
import trump2 from '../images/trump2.gif'
import GifPlayer from 'react-gif-player'


class TrumpImage extends Component {
  constructor (props) {
    super(props)
    this.imageRef = React.createRef()
    this.imageContainerRef = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    if( this.props.loading === this.imageRef.current.state.playing) {
      this.imageContainerRef.current.children[0].click()
    }
  }

  render(){
    return (
      <div ref={this.imageContainerRef} onClick={() => console.log('hello:')}>
        <GifPlayer gif={trump2} style={{width: '300px', height: '300px'}} ref={this.imageRef}/>
      </div>
    )
  }
}


export default TrumpImage