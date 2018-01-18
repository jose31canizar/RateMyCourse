const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// require('dotenv').config();
const mysql = require('promise-mysql')
var Promise = require("bluebird");

var connection;

// var con = mysql.createConnection({
//   host: "104.198.161.89",
//   user: "prototypeuser",
//   password: "flatiron",
//   database: "RateMyCourse"
// })

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("select AverageGrade from CourseDifficulty where Course='1300' and Subject='CSCI'", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

const app = express();

app.use(express.static(path.resolve(__dirname, '../', 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());
app.options('*', function (req, res) {
    'use strict';
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
});

//routes

app.get('/api/course', (req, finalResult) => {

    var data = {
      gradesA: null,
      gradesB: null,
      gradesC: null,
      gradesDF: null,
      averageGrade: null,
      averageHours: null,
      avgCourseRating: null,
      courseRating: null
    };


  return mysql.createConnection({
    host: "104.198.161.89",
    user: "prototypeuser",
    password: "flatiron",
    database: "RateMyCourse"
  }).then(function(conn){
    connection = conn;
    return conn
  }).then((conn) => {
      var r = connection.query(`select avg(PCT_A),avg(PCT_B),avg(PCT_C),avg(PCT_DF) from GradeDistribution where Course='${req.query.number}' and Subject='${req.query.subject}' and YearTerm='${req.query.year}'`)
      return r
  })
  .then((res) => {
      data.gradesA = res[0]['avg(PCT_A)']
      data.gradesB = res[0]['avg(PCT_B)']
      data.gradesC = res[0]['avg(PCT_C)']
      data.gradesDF = res[0]['avg(PCT_DF)']
  })
  .then((data) => {
    var r = connection.query(`select AverageGrade from CourseDifficulty where Course='${req.query.number}' and Subject='${req.query.subject}'`)
    return r
  }).then((res) => {
    data.averageGrade = res[0].AverageGrade
  }).then((res) => {
    var r = connection.query(`select WorkloadRaw from CourseDifficulty where Course='${req.query.number}' and Subject='${req.query.subject}'`)
    return r
  }).then((res) => {
    data.averageHours = res[0].WorkloadRaw
  }).then((res) => {
    var r = connection.query(`select avg(CourseRating) from CourseRating where Course='${req.query.number}' and Subject='${req.query.subject}'`)
    return r
  })
  .then((res) => {
    data.avgCourseRating = res[0]['avg(CourseRating)']
  })
  .then((res) => {
    var r = connection.query(`select CourseRating from CourseRating where Course='${req.query.number}' and Subject='${req.query.subject}' and YearTerm='${req.query.year}'`)
    return r
  })
  .then((res) => {
    data.courseRating = res[0]['CourseRating']
  })
  .then((res) => {
    finalResult.send(data)
  })
});

app.get('/api/coursenumbersubject', (req, finalResult) => {
  var data = []
  return mysql.createConnection({
    host: "104.198.161.89",
    user: "prototypeuser",
    password: "flatiron",
    database: "RateMyCourse"
  }).then(function(conn){
    connection = conn;
    return conn
  })
  .then((res) => {
    var r = connection.query(`select Course,Subject,YearTerm from CourseRating where Course='${req.query.number}' and Subject='${req.query.subject}' ORDER BY YearTerm DESC`)
    return r
  })
  .then((res) => {
    res.map((course, i) => {
      data.push({
        year: course['YearTerm'],
        courseSubject: course['Subject'],
        courseNumber: course['Course']
      })
    })
  })
  .then((conn) => {
      var r = connection.query(`select avg(PCT_A),avg(PCT_B),avg(PCT_C),avg(PCT_DF) from GradeDistribution where Course='${req.query.number}' and Subject='${req.query.subject}'`)
      return r
  })
  .then((res) => {
    data = data.map((course, i) => {
        return {
          ...course,
          gradesA: res[0]['avg(PCT_A)'],
          gradesB: res[0]['avg(PCT_B)'],
          gradesC: res[0]['avg(PCT_C)'],
          gradesDF: res[0]['avg(PCT_DF)']
        }
    });
  })
  .then((data) => {
    var r = connection.query(`select AverageGrade from CourseDifficulty where Course='${req.query.number}' and Subject='${req.query.subject}'`)
    return r
  }).then((res) => {
    data = data.map((course, i) => {
      return {
        ...course,
        averageGrade: res[0].AverageGrade
      }
    })
  }).then((res) => {
    var r = connection.query(`select WorkloadRaw from CourseDifficulty where Course='${req.query.number}' and Subject='${req.query.subject}'`)
    return r
  }).then((res) => {
    data = data.map((course, i) => {
      return {
        ...course,
        averageHours: res[0].WorkloadRaw
      }
    })
  }).then((res) => {
    var r = connection.query(`select avg(CourseRating) from CourseRating where Course='${req.query.number}' and Subject='${req.query.subject}'`)
    return r
  })
  .then((res) => {
    data = data.map((course, i) => {
      return {
        ...course,
        avgCourseRating: res[0]['avg(CourseRating)']
      }
    })
  }).then((res) => {    
    const getDataAsync = (course) => {
      const r = connection.query(`select CourseRating from CourseRating where Course='${req.query.number}' and Subject='${req.query.subject}' and YearTerm='${course.year}'`)
      .then((res1) => {
          console.log(res1)
          return {
            ...course,
            courseRating: res1[0]['CourseRating']
          }
      })
      return r
    };

    return new Promise(function(resolve, reject) {
      Promise.map(data, function(course) {
        return getDataAsync(course);
      }).then(function(res) {
        resolve(res)
      });
    });
  })
  .then((res) => {
    console.log('final for course list');
    console.log(res)
    // console.log(data);
    // finalResult.send(data)
    finalResult.send(res)
  })
});


app.get('/api/coursesubjectyear', (req, finalResult) => {
  var data = []
  console.log('subject & year')
  return mysql.createConnection({
    host: "104.198.161.89",
    user: "prototypeuser",
    password: "flatiron",
    database: "RateMyCourse"
  }).then(function(conn){
    connection = conn;
    return conn
  })
  .then((res) => {
    var r = connection.query(`select Course,Subject,YearTerm from CourseRating where YearTerm='${req.query.year}' and Subject='${req.query.subject}' ORDER BY YearTerm DESC`)
    return r
  })
  .then((res) => {
    console.log('course numbers');
    console.log(res);
    res.map((course) => {
      data.push({
        year: course['YearTerm'],
        courseSubject: course['Subject'],
        courseNumber: course['Course']
      })
    })
  })
  .then((res0) => {
    const getDataAsync = (course) => {
      var r1 = connection.query(`select avg(PCT_A),avg(PCT_B),avg(PCT_C),avg(PCT_DF) from GradeDistribution where Course='${course.courseNumber}' and Subject='${course.courseSubject}' and YearTerm='${req.query.year}'`)
      .then((res) => {
        return {
          gradesA: res[0]['avg(PCT_A)'],
          gradesB: res[0]['avg(PCT_B)'],
          gradesC: res[0]['avg(PCT_C)'],
          gradesDF: res[0]['avg(PCT_DF)']
        }
      });
      var r2 = connection.query(`select AverageGrade from CourseDifficulty where Course='${course.courseNumber}' and Subject='${course.courseSubject}'`)
      .then((res) => {
        return {
          averageGrade: res[0].AverageGrade
        }
      })
      var r3 = connection.query(`select WorkloadRaw from CourseDifficulty where Course='${course.courseNumber}' and Subject='${course.courseSubject}'`)
      .then((res) => {
        return {
          averageHours: res[0].WorkloadRaw
        }
      })
      var r4 = connection.query(`select avg(CourseRating) from CourseRating where Course='${course.courseNumber}' and Subject='${course.courseSubject}'`)
      .then((res) => {
        return {
          avgCourseRating: res[0]['avg(CourseRating)']
        }
      })
      var r5 = connection.query(`select CourseRating from CourseRating where Course='${course.courseNumber}' and Subject='${course.courseSubject}' and YearTerm='${req.query.year}'`)
      .then((res) => {
        return {
          courseRating: res[0]['CourseRating']
        }
      })

        return Promise.join(r1, r2, r3, r4, function(res1, res2, res3, res4) {
          console.log("done");
          const result = {...course,...res1, ...res2, ...res3, ...res4}
          console.log(result);
          return result
        })
    };

    return new Promise(function(resolve, reject) {
      Promise.map(data, function(course) {
        return getDataAsync(course);
      }).then(function(res) {
        resolve(res)
      });
    });
  })
  .then((res) => {
    finalResult.send(res)
  })
});







app.get('/api/courseyearnumber', (req, finalResult) => {
  var data = []
  return mysql.createConnection({
    host: "104.198.161.89",
    user: "prototypeuser",
    password: "flatiron",
    database: "RateMyCourse"
  }).then(function(conn){
    connection = conn;
    return conn
  })
  .then((res) => {
    var r = connection.query(`select Course,Subject,YearTerm from CourseRating where YearTerm='${req.query.year}' and Course='${req.query.number}' ORDER BY YearTerm DESC`)
    return r
  })
  .then((res) => {
    console.log('new data');
    console.log(req.query);
    console.log(res);
    res.map((course) => {
      data.push({
        year: course['YearTerm'],
        courseSubject: course['Subject'],
        courseNumber: course['Course']
      })
    })
  })
  .then((res0) => {
    const getDataAsync = (course) => {
      var r1 = connection.query(`select avg(PCT_A),avg(PCT_B),avg(PCT_C),avg(PCT_DF) from GradeDistribution where Course='${course.courseNumber}' and Subject='${course.courseSubject}' and YearTerm='${req.query.year}'`)
      .then((res) => {
        return {
          gradesA: res[0]['avg(PCT_A)'],
          gradesB: res[0]['avg(PCT_B)'],
          gradesC: res[0]['avg(PCT_C)'],
          gradesDF: res[0]['avg(PCT_DF)']
        }
      });
      var r2 = connection.query(`select AverageGrade from CourseDifficulty where Course='${course.courseNumber}' and Subject='${course.courseSubject}'`)
      .then((res) => {
        return {
          averageGrade: res[0].AverageGrade
        }
      })
      var r3 = connection.query(`select WorkloadRaw from CourseDifficulty where Course='${course.courseNumber}' and Subject='${course.courseSubject}'`)
      .then((res) => {
        return {
          averageHours: res[0].WorkloadRaw
        }
      })
      var r4 = connection.query(`select avg(CourseRating) from CourseRating where Course='${course.courseNumber}' and Subject='${course.courseSubject}'`)
      .then((res) => {
        return {
          avgCourseRating: res[0]['avg(CourseRating)']
        }
      })
      var r5 = connection.query(`select CourseRating from CourseRating where Course='${course.courseNumber}' and Subject='${course.courseSubject}' and YearTerm='${req.query.year}'`)
      .then((res) => {
        return {
          avgCourseRating: res[0]['CourseRating']
        }
      })

      return Promise.join(r1, r2, r3, r4, function(res1, res2, res3, res4) {
        console.log("done with year & number");
        const result = {...course,...res1, ...res2, ...res3, ...res4}
        console.log(result);
        return result
      })
    };

    return new Promise(function(resolve, reject) {
      Promise.map(data, function(course) {
        return getDataAsync(course);
      }).then(function(res) {
        resolve(res)
      });
    });
  })
  .then((res) => {
    finalResult.send(res)
  })
});


// app.get('/user', function(req, res) {
//   var data = {
//     "Data":"new data exists",
//     course: ""
//   };
//   console.log(req.query.course);
//   data.course = req.query.course
//   console.log('getting id')
//   res.send(data)
// });

//catch all handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
});
const port = process.env.PORT || 9001;
app.listen(port);
console.log(`express app listening on port ${port}`);
