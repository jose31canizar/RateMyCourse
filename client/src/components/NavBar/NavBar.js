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
      currentScrollTop: document.body.scrollTop,
      width: document.body.clientWidth
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
          flip: false
        }
      }

    })
    this.setState({
      currentScrollTop: document.body.scrollTop
    })
  }
  componentDidMount() {
    const w = Math.max(document.body.clientWidth, window.innerWidth || 0)
    window.addEventListener('resize', () => {
      const w = Math.max(document.body.clientWidth, window.innerWidth || 0)
      this.setState({
        width: w
      })
    })
    this.setState({
      width: w
    })
  }
  render() {
    return (
      <div className='nav-bar-wrapper'>
        <div className={'nav-bar' + (this.state.flip ? ' flip' : '')}>
          <Link to="/">
            <img src={require('../../media/RateMyCourseBlack.png')} alt='RateMyCourse'/>
          </Link>
          {this.state.width > 800 ?
            <ul>
            {data.map((item, i) => (
              <Link className="nav-link" to={`/${item.route}`} onMouseDown={this.setSelected.bind(this, item.title)}>
                <li className={"nav-item-above "  + (item.title === this.state.selected ? "selected-page" : "")}>
                  {item.title}
                </li>
                  <li className={"nav-item " + (item.title === this.state.selected ? "selected-page" : "")} onMouseDown={this.setSelected.bind(this, item.title)}>
                    {item.title}
                  </li>
              </Link>
            ))}
            </ul> : ''}

        </div>
      </div>
    );
  }
}

export default NavBar;
