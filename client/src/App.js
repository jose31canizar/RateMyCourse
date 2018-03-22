import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/Home/Home";
import Course from "./components/Course/Course";
import Results from "./components/Results/Results";
import About from "./components/About/About";
import Layout from "./layout/Layout";
import Data from "./data/filters.json";
import {
  searchCourse,
  searchCoursesBySubjectAndNumber,
  searchCoursesBySubjectAndYear,
  searchCoursesByYearAndNumber
} from "./actions/searchCourse";
import "./styl/main.styl";

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    searchCourse: queryObject => {
      dispatch(searchCourse(queryObject));
    },
    searchCoursesBySubjectAndNumber: queryObject => {
      dispatch(searchCoursesBySubjectAndNumber(queryObject));
    },
    searchCoursesBySubjectAndYear: queryObject => {
      dispatch(searchCoursesBySubjectAndYear(queryObject));
    },
    searchCoursesByYearAndNumber: queryObject => {
      dispatch(searchCoursesByYearAndNumber(queryObject));
    }
  };
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      courseNumber: null,
      courseSubject: null,
      courseYear: null,
      filters: Data.map((filter, i) => (i === 0 ? true : false)),
      numEnrolled: null,
      professorRating: null,
      gradesA: null,
      gradesB: null,
      gradesC: null,
      gradesDF: null,
      averageGrade: null,
      averageHours: null,
      courseRating: null,
      avgCourseRating: null,
      firstQuery: null,
      secondQuery: null,
      warning: ""
    };
    this.updateCourseSubject = this.updateCourseSubject.bind(this);
    this.updateCourseNumber = this.updateCourseNumber.bind(this);
    this.updateCourseYear = this.updateCourseYear.bind(this);
    this.toggleCheckmark = this.toggleCheckmark.bind(this);

    this.handleQuery = this.handleQuery.bind(this);
    this.navigateToCourse = this.navigateToCourse.bind(this);
    this.setCourseData = this.setCourseData.bind(this);
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
  updateCourseSubject(e) {
    var query = e.target.value;
    if (query === "") {
      this.setState({
        courseSubject: null
      });
    } else {
      this.setState({
        courseSubject: query.replace(/[0-9]/g, "")
      });
    }
  }
  updateCourseNumber(e) {
    var query = e.target.value;
    if (query === "") {
      this.setState({
        courseNumber: null
      });
    } else {
      this.setState({
        courseNumber: query.replace(/\D/g, "")
      });
    }
  }
  updateCourseYear(e) {
    var query = e.target.value;
    const year = query.replace(/\D/g, "");
    const semester = query.split(" ")[0];
    if (semester === "Fall") {
      query = year + "7";
    } else if (semester === "Spring") {
      query = year + "1";
    } else if (semester === "Summer") {
      query = year + "4";
    } else {
      query = null;
    }
    this.setState({
      courseYear: query
    });
  }
  toggleCheckmark(i) {
    this.setState((prevState, props) => {
      var prev = prevState.filters;
      var check = !prevState.filters[i];
      prev[i] = check;
      return {
        filters: prev
      };
    });
  }
  navigateToCourse() {
    if (
      this.state.courseSubject &&
      this.state.courseNumber &&
      this.state.courseYear
    ) {
      return "/course";
    } else if (this.state.courseSubject && this.state.courseNumber) {
      return "/results";
    } else if (this.state.courseSubject && this.state.courseYear) {
      return "/results";
    } else if (this.state.courseNumber && this.state.courseYear) {
      return "/results";
    } else {
      return "/";
    }
  }
  handleQuery(e) {
    this.setState({
      warning: ""
    });
    if (typeof e !== "undefined") {
      e.preventDefault();
    }
    //go to single course
    if (
      this.state.courseSubject &&
      this.state.courseNumber &&
      this.state.courseYear
    ) {
      this.props.searchCourse({
        subject: this.state.courseSubject,
        number: this.state.courseNumber,
        year: this.state.courseYear
      });
      //go to results page
    } else if (this.state.courseSubject && this.state.courseNumber) {
      this.setState(
        {
          firstQuery: this.state.courseSubject,
          secondQuery: this.state.courseNumber
        },
        () => {
          this.props.searchCoursesBySubjectAndNumber({
            subject: this.state.courseSubject,
            number: this.state.courseNumber
          });
        }
      );
    } else if (this.state.courseSubject && this.state.courseYear) {
      this.setState(
        {
          firstQuery: this.state.courseYear,
          secondQuery: this.state.courseSubject
        },
        () => {
          this.props.searchCoursesBySubjectAndYear({
            subject: this.state.courseSubject,
            year: this.state.courseYear
          });
        }
      );
    } else if (this.state.courseNumber && this.state.courseYear) {
      this.setState(
        {
          firstQuery: this.state.courseYear,
          secondQuery: this.state.courseNumber
        },
        () => {
          this.props.searchCoursesByYearAndNumber({
            year: this.state.courseYear,
            number: this.state.courseNumber
          });
        }
      );
    } else {
      this.setState({
        warning: "We'll need a bit more info for that query."
      });
    }
    return false;
  }
  setCourseData = data => {
    this.setState({
      ...data
    });
  };
  render() {
    const { courseSearchResults, ...rest } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Layout width={this.state.width} height={this.state.height}>
            <Switch>
              <Route
                exact
                path="/"
                render={({ history }) => (
                  <Home
                    {...this.state}
                    toggleCheckmark={this.toggleCheckmark}
                    updateCourseSubject={this.updateCourseSubject}
                    updateCourseNumber={this.updateCourseNumber}
                    updateCourseYear={this.updateCourseYear}
                    handleQuery={this.handleQuery}
                    navigateToCourse={this.navigateToCourse}
                    history={history}
                  />
                )}
              />
              <Route
                exact
                path="/course"
                render={({ history }) => <Course {...rest} history={history} />}
              />
              <Route
                exact
                path="/results"
                render={({ history }) => (
                  <Results
                    firstQuery={this.state.firstQuery}
                    secondQuery={this.state.secondQuery}
                    setCourseData={this.setCourseData}
                    history={history}
                    handleQuery={this.handleQuery}
                    width={this.state.width}
                    height={this.state.height}
                  />
                )}
              />
              <Route
                exact
                path="/about"
                render={({ history }) => (
                  <About width={this.state.width} height={this.state.height} />
                )}
              />
              <Route
                path="*"
                render={({ history }) => (
                  <Home
                    {...this.state}
                    toggleCheckmark={this.toggleCheckmark}
                    updateCourseSubject={this.updateCourseSubject}
                    updateCourseNumber={this.updateCourseNumber}
                    updateCourseYear={this.updateCourseYear}
                    handleQuery={this.handleQuery}
                    navigateToCourse={this.navigateToCourse}
                    history={history}
                  />
                )}
              />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
