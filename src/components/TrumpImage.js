import './TrumpImage.css'
import React, { Component } from 'react';
import trump1 from '../images/trump1.gif'
import trump2 from '../images/trump2.gif'

class TrumpImage extends Component {
  componentWillMount() {
    console.log('hello:')
    // window.onload = function() {
    //   Gifffer();
    // }
  }

  render(){
    return (
      <div>
        <img src={trump2} alt="loading" style={{borderRadius: '50%', overflow: 'hidden'}}/>
      </div>
    )
  }
}
        // <img data-giffer={trump1} width="100px" height="100px" alt="trump"/>
        // <div style={{backgroundImage: `url('${trump2}')`, width: '300px', height: '300px'}} />

export default TrumpImage