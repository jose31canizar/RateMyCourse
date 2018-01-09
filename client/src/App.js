import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import Course from './components/Course/Course'
import Results from './components/Results/Results'
import About from './components/About/About'
import Layout from './layout/Layout'
import Data from './data/filters.json'
import './styl/main.styl'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseNumber: null,
      courseSubject: null,
      courseYear: null,
      filters: Data.map((filter, i) => (i == 0 ? true : false)),
      numEnrolled: null,
      professorRating: null,
      gradesA: null,
      gradesB: null,
      gradesC: null,
      gradesDF: null,
      averageGrade: null,
      averageHours: null,
      courseRating: null,
      firstQuery: null,
      secondQuery: null
    }
    this.updateCourseSubject = this.updateCourseSubject.bind(this)
    this.updateCourseNumber = this.updateCourseNumber.bind(this)
    this.updateCourseYear = this.updateCourseYear.bind(this)
    this.toggleCheckmark = this.toggleCheckmark.bind(this)

    this.handleQuery = this.handleQuery.bind(this)
    this.searchCourse = this.searchCourse.bind(this)
    this.searchForCoursesWithSubjectAndNumber = this.searchForCoursesWithSubjectAndNumber.bind(this)
    this.searchForCoursesWithSubjectAndYear = this.searchForCoursesWithSubjectAndYear.bind(this)
    this.searchForCoursesWithYearAndNumber = this.searchForCoursesWithYearAndNumber.bind(this)
    this.navigateToCourse = this.navigateToCourse.bind(this)
    this.setCourseData = this.setCourseData.bind(this)

  }
  updateCourseSubject(e) {
    var query = e.target.value
    console.log('updating course subject');
    console.log(query);
    this.setState({
      courseSubject: query.replace(/[0-9]/g, '')
    })
  }
  updateCourseNumber(e) {
    var query = e.target.value
    this.setState({
      courseNumber: query.replace(/\D/g,'')
    })
  }
  updateCourseYear(e) {
    var query = e.target.value
    console.log(query);
    console.log(query);
    const year = query.replace(/\D/g,'');
    const semester = query.split(" ")[0];
    if(semester === "Fall") {
      query = year + "7"
    } else if (semester === "Spring") {
      query = year + "1"
    } else if (semester === "Summer"){
      query = year + "4"
    } else {
      query = null
    }
    this.setState({
      courseYear: query
    })
  }
  toggleCheckmark(i) {
    console.log('toggling');
    this.setState((prevState, props) => {
      var prev = prevState.filters
      var check = !prevState.filters[i]
      prev[i] = check
      return {
        filters: prev
      }
    })
  }
  navigateToCourse() {
    if (this.state.courseSubject && this.state.courseNumber && this.state.courseYear) {
      return '/course'
    } else if (!this.state.courseSubject || !this.state.courseNumber || !this.state.courseYear) {
      return '/results'
    }
  }
  handleQuery(e) {
    if(typeof e != 'undefined') {
        e.preventDefault()
    }
    //go to single course
    if (this.state.courseSubject && this.state.courseNumber && this.state.courseYear) {
      this.searchCourse()
      //go to results page
    } else if (this.state.courseSubject && this.state.courseNumber) {
      console.log(this.state.courseSubject);
      console.log(this.state.courseNumber);
      
      this.setState({
        firstQuery: this.state.courseSubject,
        secondQuery: this.state.courseNumber
      })
      this.searchForCoursesWithSubjectAndNumber()
    } else if (this.state.courseSubject && this.state.courseYear) {
      this.setState({
        firstQuery: this.state.courseYear,
        secondQuery: this.state.courseSubject
      })
      this.searchForCoursesWithSubjectAndYear()
    } else if (!this.state.courseNumber && !this.state.courseYear) {
      this.setState({
        firstQuery: this.state.courseNumber,
        secondQuery: this.state.courseYear
      })
      this.searchForCoursesWithYearAndNumber()
    }
    return false
  }
  setCourseData = (data) => {
    console.log('new data set');
    console.log(data);
    this.setState({
      ...data
    })
  }
  searchCourse = () => {
    console.log('searching course');
    fetch('/api/course?subject=' + this.state.courseSubject + '&number=' + this.state.courseNumber + '&year=' + this.state.courseYear)
    .then((res) => {
        return res.json()
      })
    .then((json) => {
       console.log(json);
       this.setState({
         gradesA: json.gradesA,
         gradesB: json.gradesB,
         gradesC: json.gradesC,
         gradesDF: json.gradesDF,
         averageGrade: json.averageGrade,
         averageHours: json.averageHours,
         courseRating: json.courseRating,
         courseSearchResults: null
       });
     })
    .catch(function(res){
      console.log('there was an error')
      console.log(res)
    })
  }
  searchForCoursesWithSubjectAndNumber = () => {
    console.log('searching with subject and number');
    fetch('/api/coursenumbersubject?subject=' + this.state.courseSubject + '&number=' + this.state.courseNumber)
    .then((res) => {
        return res.json()
      })
    .then((json) => {
      console.log('searching for course list');
      console.log(json);
      json = json.map((course, i) => {
        return {
          ...course,
          courseNumber: this.state.courseNumber,
          courseSubject: this.state.courseSubject
        }
      })
       this.setState({
         courseSearchResults: json
       });
     })
    .catch(function(res){
      console.log('there was an error')
      console.log(res)
    })
  }
  searchForCoursesWithSubjectAndYear = () => {
    console.log('searching with subject and year');
    fetch('/api/coursesubjectyear?&year=' + this.state.courseYear + '&subject=' + this.state.courseSubject)
    .then((res) => {
        return res.json()
      })
    .then((json) => {
      console.log('searching for course list');
      console.log(json);
       this.setState({
         courseSearchResults: json
       });
     })
    .catch(function(res){
      console.log('there was an error')
      console.log(res)
    })
  }
  searchForCoursesWithYearAndNumber = () => {
    console.log('searching with year and number');
    fetch('/api/courseyearnumber?&number=' + this.state.courseNumber + '&year=' + this.state.courseYear)
    .then((res) => {
        return res.json()
      })
    .then((json) => {
      console.log('searching for course list');
      console.log(json);
       this.setState({
         courseSearchResults: json
       });
     })
    .catch(function(res){
      console.log('there was an error')
      console.log(res)
    })
  }
  render() {
    const {courseSearchResults, ...rest} = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path='/' render={
                ({history}) => <Home {...this.state}
                            toggleCheckmark={this.toggleCheckmark}
                            updateCourseSubject={this.updateCourseSubject}
                            updateCourseNumber={this.updateCourseNumber}
                            updateCourseYear={this.updateCourseYear}
                            handleQuery={this.handleQuery}
                            navigateToCourse={this.navigateToCourse}
                            history={history}
                            />
              }/>
              <Route exact path='/course' render={({history}) => <Course {...rest} history={history}/>}/>
              <Route exact path='/results' render={({history}) =>
                <Results
                  firstQuery={this.state.firstQuery}
                  secondQuery={this.state.secondQuery}
                  courseSearchResults={this.state.courseSearchResults}
                  setCourseData={this.setCourseData}
                  history={history}
                  handleQuery={this.handleQuery}
                />
              }/>
              <Route exact path='/about' render={({history}) => <About/>}/>
              <Route path='*' render={
                ({history}) => <Home {...this.state}
                            toggleCheckmark={this.toggleCheckmark}
                            updateCourseSubject={this.updateCourseSubject}
                            updateCourseNumber={this.updateCourseNumber}
                            updateCourseYear={this.updateCourseYear}
                            handleQuery={this.handleQuery}
                            navigateToCourse={this.navigateToCourse}
                            history={history}
                            />
              }/>
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
