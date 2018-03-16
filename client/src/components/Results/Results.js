import React, { Component } from "react";
import "./Results.styl";
import SVG from "../svg.js";
import { RingLoader } from "react-spinners";

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.courseSearchResults
    };
    this.goToCourse = this.goToCourse.bind(this);
    this.getYear = this.getYear.bind(this);
    this.findAverageHours = this.findAverageHours.bind(this);
    this.findAverageGrade = this.findAverageGrade.bind(this);
    this.displayQuery = this.displayQuery.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({ results: props.courseSearchResults });
  }
  goToCourse(i) {
    const data = this.state.results[i];
    this.props.setCourseData(data);
    this.props.history.push("course");
  }
  componentDidMount() {
    this.props.handleQuery();
  }
  getYear(courseYear) {
    var year = courseYear.toString().slice(0, -1);
    var s = courseYear.toString()[4];
    var semester;
    if (s === "7") {
      semester = "Fall";
    } else if (s === "1") {
      semester = "Spring";
    } else if (s === "4") {
      semester = "Summer";
    } else {
      semester = "unknown";
    }
    return semester + " " + year;
  }
  findAverageHours(num) {
    switch (true) {
      case num <= 0:
        return "unknown";
      case num < 1.5:
        return "0 - 3 hours";
      case num < 2.5:
        return "4-6 hours";
      case num < 3.5:
        return "7-9 hours";
      case num < 4.5:
        return "10-12 hours";
      case num < 5.5:
        return "13-15 hours";
      case num < 6:
        return "16+ hours";
      default:
        return "unknown";
    }
  }
  findAverageGrade(num) {
    switch (true) {
      case num <= 0:
        return "unknown";
      case num < 1:
        return "D/F";
      case num < 2:
        return "C";
      case num < 3:
        return "B";
      case num < 4:
        return "A";
      default:
        return "unknown";
    }
  }
  ratingBar(num) {
    var arr = [];
    if (!num) {
      arr.push(
        Array(6).fill(<SVG name={"EmptyStar"} width={50} height={50} />)
      );
    } else {
      var rating = parseInt(num);

      var decimal = (num - Math.floor(num)).toFixed(1);
      arr = Array(rating).fill(
        <SVG name={"FilledStar"} width={50} height={50} />
      );
      if (decimal >= 0.5) {
        arr.push(<SVG name={"HalfStar"} width={50} height={50} />);
        arr.push(
          Array(6 - Math.ceil(num)).fill(
            <SVG name={"EmptyStar"} width={50} height={50} />
          )
        );
      } else {
        arr.push(
          Array(6 - Math.floor(num)).fill(
            <SVG name={"EmptyStar"} width={50} height={50} />
          )
        );
      }
    }
    return arr;
  }
  displayQuery() {
    var first;
    if (this.props.firstQuery.toString()[0] === "2") {
      first = this.getYear(this.props.firstQuery);
    } else {
      first = this.props.firstQuery;
    }
    return first + " " + this.props.secondQuery;
  }
  render() {
    return (
      <div className="Results" style={{ height: this.props.height - 100 }}>
        <h1>
          Results for {this.props.firstQuery ? this.displayQuery() : "..."}
        </h1>
        {this.state.results ? (
          this.state.results.map((course, i) => (
            <div
              className="course-cell"
              onMouseDown={this.goToCourse.bind(this, i)}
            >
              <h2>
                {course.courseSubject.toString().toUpperCase() +
                  " " +
                  course.courseNumber +
                  " " +
                  this.getYear(course.year)}
              </h2>
              <label>Rating for this course:</label>
              {course.courseRating !== -1 ? (
                this.ratingBar(course.courseRating)
              ) : (
                <p>unknown</p>
              )}
              <label>Average rating for this course:</label>
              {course.avgCourseRating !== -1 ? (
                this.ratingBar(course.avgCourseRating)
              ) : (
                <p>unknown</p>
              )}
              <p>average grade: {this.findAverageGrade(course.averageGrade)}</p>
              <p>average hours: {this.findAverageHours(course.averageHours)}</p>
            </div>
          ))
        ) : (
          <RingLoader color={"#123abc"} loading={this.state.loading} />
        )}
      </div>
    );
  }
}
