import React, { Component } from 'react'
import data from '../../data/navbar.json'
import { Link } from 'react-router-dom'
import SmoothScroll from '../SmoothScroll/SmoothScroll'
import './NavBar.styl'

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: "Home",
      distance: 0,
      flip: false,
      currentScrollTop: document.body.scrollTop
    }
    this.setSelected = this.setSelected.bind(this)
    this.flip = this.flip.bind(this)
  }
  componentWillMount() {
    document.addEventListener('scroll', this.flip)
  }
  setSelected(title) {
    this.setState({
      selected: title
    })
  }
  flip() {
    this.setState((prevState, props) => {
      const newDistance = document.body.scrollTop
      const oldDistance = prevState.currentScrollTop
      if(oldDistance > newDistance) {
        return {
          distance: oldDistance + 1,
          flip: false
        }
      } else if(oldDistance === newDistance) {
        return {
          distance: oldDistance
        }
      } else {
        return {
          distance: oldDistance - 1,
          flip: true
        }
      }

    })
    this.setState({
      currentScrollTop: document.body.scrollTop
    })
  }
  render() {
    return (
      <div className='nav-bar-wrapper'>
        <div className={'nav-bar' + (this.state.flip ? ' flip' : '')}>
          <h1>RateMyCourse</h1>
          <ul>
            {data.map((item, i) => (
              <Link className="nav-link" to={`/${item.route}`} onMouseDown={this.setSelected.bind(this, item.title)}>
                <li className={"nav-item-above "  + (item.title === this.state.selected ? "selected-page" : "")}>
                  {item.title}
                </li>
                <SmoothScroll section={'q' + (i+1)}>
                  <li className={"nav-item " + (item.title === this.state.selected ? "selected-page" : "")} onMouseDown={this.setSelected.bind(this, item.title)}>
                    {item.title}
                  </li>
                </SmoothScroll>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default NavBar;
