import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Parallax extends Component {
  constructor(props) {
    super(props)
    this.state = {
      distance: 0,
      currentScrollTop: document.body.scrollTop
    }
    this.update = this.update.bind(this)
  }
  componentWillMount() {
    document.addEventListener('scroll', this.update)
  }
  update() {
    this.setState((prevState, props) => {
      const newDistance = document.body.scrollTop
      const oldDistance = prevState.currentScrollTop
      if(oldDistance > newDistance) {
        return {
          distance: oldDistance + 1
        }
      } else if(oldDistance === newDistance) {
        return {
          distance: oldDistance
        }
      } else {
        return {
          distance: oldDistance - 1
        }
      }

    })
    this.setState({
      currentScrollTop: document.body.scrollTop
    })
  }
  render() {
    let src = this.props.src;

    let styles;
    if(src) {
      styles = {
            background: "url(" + src + ")",
            backgroundPosition: "50% " + this.props.yPosition + "%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            transform: "translate3d(0px, " + (0.2*this.state.distance) + "px, 0px)"
      };
    } else {
      styles = {
            background: "white"
      };
    }
    return (
      <div className="parallax" style={styles}>
      </div>
    );
  }
}

export default Parallax;
