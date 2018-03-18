import React, { Component } from "react";
import { Link } from "react-router-dom";
import FILTERS from "../../data/filters.json";
import YEARS from "../../data/years.json";
import SUBJECTS from "../../data/subjects.json";
import SVG from "../svg.js";
import "./Home.styl";
import { withRouter } from "react-router-dom";
import BrowserDetection from "react-browser-detection";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.browserCourseHandler = this.browserCourseHandler.bind(this);
    this.browserYearHandler = this.browserYearHandler.bind(this);
  }
  componentDidMount() {
    const w = Math.max(document.body.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.body.clientHeight, window.innerHeight || 0);
    window.addEventListener("resize", () => {
      const w = Math.max(document.body.clientWidth, window.innerWidth || 0);
      const h = Math.max(document.body.clientHeight, window.innerHeight || 0);
      this.setState({
        width: w,
        height: h
      });
    });
    this.setState({
      width: w,
      height: h
    });
  }
  handleKeyPress = event => {
    if (event.key == "Enter") {
      event.preventDefault();
      this.props.handleQuery();
      this.props.history.push(this.props.navigateToCourse());
    }
  };
  browserCourseHandler = () => {
    return {
      chrome: () => (
        <datalist id="subjects">
          <select>
            {SUBJECTS.map((subject, i) => (
              <option value={subject.subject} key={i} />
            ))}
          </select>
        </datalist>
      ),
      default: browser => <div />
    };
  };
  browserYearHandler = () => {
    return {
      chrome: () => (
        <datalist id="years">
          <select>
            {YEARS.map((year, i) => <option value={year.year} key={i} />)}
          </select>
        </datalist>
      ),
      default: browser => <div />
    };
  };
  render() {
    var checkmark = <SVG name={"Checkmark"} />;
    const props = this.props;

    return (
      <div className="Home" style={{ height: this.state.height - 100 }}>
        <div className="search-box-container">
          <div className="search-fields-container">
            <form
              id="search-course-subject"
              className="search-box"
              onSubmit={this.props.handleQuery}
            >
              <BrowserDetection>{this.browserCourseHandler()}</BrowserDetection>
              <label>
                <input
                  autoFocus
                  type="search"
                  onChange={this.props.updateCourseSubject}
                  maxLength="4"
                  list="subjects"
                  onKeyPress={this.handleKeyPress}
                />
                course subject
              </label>
            </form>
            <form
              id="search-course-number"
              className="search-box"
              onSubmit={this.props.handleQuery}
            >
              <label>
                <input
                  type="search"
                  onChange={this.props.updateCourseNumber}
                  maxLength="4"
                  onKeyPress={this.handleKeyPress}
                />
                course number
              </label>
            </form>
            <form
              id="search-course-year"
              className="search-box"
              onSubmit={this.props.handleQuery}
            >
              <BrowserDetection>{this.browserYearHandler()}</BrowserDetection>
              <label>
                <input
                  type="search"
                  onChange={this.props.updateCourseYear}
                  list="years"
                  onKeyPress={this.handleKeyPress}
                />
                course semester & year
              </label>
            </form>
            <p>{this.props.warning}</p>
          </div>
          <div className="advanced-search" />
          <div onMouseDown={this.props.handleQuery}>
            <Link to={this.props.navigateToCourse()} className="search-button">
              Search Course
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

// {FILTERS.map((filter, i) => (
//   <div className="advanced-search-filter" onMouseDown={props.toggleCheckmark.bind(this, i)}>
//     <input type="checkbox"/>
//     {props.filters[i] ? checkmark : ""}
//     <label>{filter.label}</label>
//   </div>
// ))}
