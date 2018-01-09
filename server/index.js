const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// require('dotenv').config();
const mysql = require('promise-mysql')

var connection

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

app.use(express.static(path.resolve(__dirname, '../client/', 'build')));
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

    // console.log(req);
    var data = {
      gradesA: null,
      gradesB: null,
      gradesC: null,
      gradesDF: null,
      averageGrade: null,
      averageHours: null,
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
      var r = connection.query(`select avg(PCT_A),avg(PCT_B),avg(PCT_C),avg(PCT_DF) from GradeDistribution where Course='${req.query.number}' and Subject='${req.query.subject}'`)
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
    data.courseRating = res[0]['avg(CourseRating)']
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
    var r = connection.query(`select YearTerm from CourseRating where Course='${req.query.number}' and Subject='${req.query.subject}'`)
    return r
  })
  .then((res) => {
    res.map((year, i) => {
      data.push({
        year: year['YearTerm']
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
        courseRating: res[0]['avg(CourseRating)']
      }
    })
  })
  .then((res) => {
    console.log('final for course list');
    console.log(data);
    finalResult.send(data)
  })
});


app.get('/api/coursesubjectyear', (req, finalResult) => {
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
    var r = connection.query(`select Course from CourseRating where YearTerm='${req.query.year}' and Subject='${req.query.subject}'`)
    return r
  })
  .then((res) => {
    console.log('subject and year result');
    console.log(res);
    console.log(req.query);
    res.map((course, i) => {
      data.push({
        year: course[0]['YearTerm']
      })
    })
  })
  .then((conn) => {
      var r = connection.query(`select avg(PCT_A),avg(PCT_B),avg(PCT_C),avg(PCT_DF) from GradeDistribution where YearTerm='${req.query.year}' and Subject='${req.query.subject}'`)
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
        courseRating: res[0]['avg(CourseRating)']
      }
    })
  })
  .then((res) => {
    console.log('final for course list');
    console.log(data);
    finalResult.send(data)
  })
});

app.get('/user', function(req, res) {
  var data = {
    "Data":"new data exists",
    course: ""
  };
  console.log(req.query.course);
  data.course = req.query.course
  console.log('getting id')
  res.send(data)
});

//catch all handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
});
const port = process.env.PORT || 9001;
app.listen(port);
console.log(`express app listening on port ${port}`);
