import React, { Component } from 'react'
import './About.styl'

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  }
  componentDidMount() {
    const w = Math.max(document.body.clientWidth, window.innerWidth || 0)
    const h = Math.max(document.body.clientHeight, window.innerHeight || 0)
    window.addEventListener('resize', () => {
      const w = Math.max(document.body.clientWidth, window.innerWidth || 0)
      const h = Math.max(document.body.clientHeight, window.innerHeight || 0)
      this.setState({
        width: w,
        height: h
      })
    })
    this.setState({
      width: w,
      height: h
    })
  }
  render() {
    return (
      <div className='About'>
        <video width={this.state.width} height={this.state.height} autoPlay loop>
          <source src={require("../../media/ratemycourse.mp4")} type="video/mp4"/>
        </video>
        <h2>About Us</h2>
        <p>RateMyCourse is a collaborative project based in Boulder, CO.</p>
      </div>
    )
  }
}
