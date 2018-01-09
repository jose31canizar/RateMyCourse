import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FILTERS from '../../data/filters.json'
import YEARS from '../../data/years.json'
import SUBJECTS from '../../data/subjects.json'
import SVG from '../svg.js'
import './Home.styl'
import { withRouter } from 'react-router-dom'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
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
  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      event.preventDefault()
      this.props.history.push(this.props.navigateToCourse());
    }
  }
  render() {
    var checkmark = <SVG name={'Checkmark'}/>
    const props = this.props
    console.log(props);

    return (
      <div className="Home">
        <video width={this.state.width} height={this.state.height} autoPlay loop>
          <source src={require("../../media/ratemycourse.mp4")} type="video/mp4"/>
        </video>
        <div className="search-box-container">
          <div className="search-fields-container">
            <form id="search-course-subject" className="search-box" onSubmit={this.props.handleQuery}>
              <datalist id="subjects">
                <select>
                {SUBJECTS.map((subject, i) => (
                  <option value={subject.subject} />
                ))}
                </select>
              </datalist>
              <label>
                <input autoFocus type="search" onChange={this.props.updateCourseSubject} maxLength="4" list="subjects" onKeyPress={this.handleKeyPress}/>
                course subject
              </label>
            </form>
            <form id="search-course-number" className="search-box" onSubmit={this.props.handleQuery}>
              <label>
              <input type="search" onChange={this.props.updateCourseNumber} maxLength="4" onKeyPress={this.handleKeyPress}/>
              course number
              </label>
            </form>
            <form id="search-course-year" className="search-box" onSubmit={this.props.handleQuery}>
              <datalist id="years">
                <select>
                {YEARS.map((year, i) => (
                  <option value={year.year} />
                ))}
                </select>
              </datalist>
              <label>
              <input type="search" onChange={this.props.updateCourseYear} list="years" onKeyPress={this.handleKeyPress}/>
              course year
              </label>
            </form>
          </div>
          <div className="advanced-search">
          </div>
          <div onMouseDown={this.props.handleQuery}>
          <Link to={this.props.navigateToCourse()} className='search-button'>Search Course</Link>
          </div>
        </div>
      </div>
    )
  }
}



// {FILTERS.map((filter, i) => (
//   <div className="advanced-search-filter" onMouseDown={props.toggleCheckmark.bind(this, i)}>
//     <input type="checkbox"/>
//     {props.filters[i] ? checkmark : ""}
//     <label>{filter.label}</label>
//   </div>
// ))}

export default Home