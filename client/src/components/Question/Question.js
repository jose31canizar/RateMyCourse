import React, { Component } from 'react';
import SmoothScroll from '../SmoothScroll/SmoothScroll'
import './Question.styl'

class Question extends Component {
  render() {
    return (
      <div className="Question" id={this.props.id}>
        <h1>{this.props.question}</h1>
        <div className="options">
          {this.props.options.map((option, i) => {
            return <SmoothScroll section={'question' + (this.props.numKey+1)}>
                    <div className='option'>
                      {i + ' ' + option}
                    </div>
                  </SmoothScroll>
          })}
        </div>
      </div>
    );
  }
}

export default Question;
