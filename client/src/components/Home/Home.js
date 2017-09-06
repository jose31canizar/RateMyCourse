import React, { Component } from 'react';
import Question from '../Question/Question'
import Data from '../../data/questions.json'
import './Home.styl'

class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="Home">
      <h2>Hello.</h2>
      </div>
    )
  }
}

export default Home;
