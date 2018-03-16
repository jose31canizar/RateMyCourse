import React, { Component } from "react";
import "./Course.styl";
import SVG from "../svg.js";
import Graph from "../Graph/Graph";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
    this.findAverageHours = this.findAverageHours.bind(this);
    this.findAverageGrade = this.findAverageGrade.bind(this);
    this.ratingBar = this.ratingBar.bind(this);
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
  componentDidUpdate(props) {
    window.dispatchEvent(new Event("resize"));
  }
  findAverageHours() {
    var num = this.props.averageHours;
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
  findAverageGrade() {
    var num = this.props.averageGrade;
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
  ratingBar(rating) {
    var num = rating;
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
  render() {
    var props = this.props;
    return (
      <div className="Course">
        <div className="results-container">
          <h1>
            {props.courseSubject.toUpperCase() + " " + props.courseNumber}
          </h1>
          <div className="course-rating">
            <h2>Course Rating</h2>
            {this.ratingBar(this.props.courseRating)}
          </div>
          <div className="course-rating">
            <h2>Average Course Rating</h2>
            {this.ratingBar(this.props.avgCourseRating)}
          </div>
          <h2>A's: {parseFloat(props.gradesA).toFixed(2)}%</h2>
          <h2>B's: {parseFloat(props.gradesB).toFixed(2)}%</h2>
          <h2>C's: {parseFloat(props.gradesC).toFixed(2)}%</h2>
          <h2>D's or worse: {parseFloat(props.gradesDF).toFixed(2)}%</h2>
          <h2>Average Grade: {this.findAverageGrade()}</h2>
          <h2>Average Hours: {this.findAverageHours()}</h2>
        </div>
        <Graph
          labels={["0", "1-3", "4-6", "7-9", "10-12", "13-15", "16+"]}
          amount={2}
        />
      </div>
    );
  }
}

export default Course;
