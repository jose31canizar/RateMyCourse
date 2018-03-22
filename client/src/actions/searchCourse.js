import {
  SEARCH_COURSE_FAIL,
  SEARCH_COURSE_SUCCESS,
  SEARCH_MULTIPLE_COURSES_FAIL,
  SEARCH_MULTIPLE_COURSES_SUCCESS,
  SEARCH_MULTIPLE_COURSES_LOADING
} from "../types/searchTypes.js";
import API from "../api";
import { templateGet, templateError, templateSuccess } from "./actionTemplate";

export const searchCourseError = templateError(SEARCH_COURSE_FAIL);

export function searchCourseSuccess(response) {
  return dispatch => {
    console.log("in success function");
    console.log(response);
    dispatch({
      ...response,
      type: SEARCH_COURSE_SUCCESS
    });
  };
}

export const searchCourse = ({ subject, number, year }) => {
  return dispatch =>
    fetch(
      `${API}/course?subject=` + subject + "&number=" + number + "&year=" + year
    )
      .then(data => {
        return data.json();
      })
      .then(
        data => {
          console.log("search was success");
          console.log(data);
          dispatch(searchCourseSuccess(data));
        },
        function(error) {
          console.log("there was an error with logging out.");
          dispatch(searchCourseError(error));
        }
      );
};

export const searchMultipleCoursesError = templateError(
  SEARCH_MULTIPLE_COURSES_FAIL
);

export function searchMultipleCoursesLoading() {
  return dispatch => {
    dispatch({
      type: SEARCH_MULTIPLE_COURSES_LOADING
    });
  };
}

export function searchMultipleCoursesSuccess(response) {
  return dispatch => {
    console.log("multiple course success");
    console.log(response);
    dispatch({
      results: response,
      type: SEARCH_MULTIPLE_COURSES_SUCCESS
    });
  };
}

export const searchCoursesBySubjectAndNumber = ({ subject, number }) => {
  return dispatch => {
    console.log("loading");
    dispatch(searchMultipleCoursesLoading());
    return fetch(
      "/api/coursenumbersubject?subject=" + subject + "&number=" + number
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log("success in action");
        dispatch(searchMultipleCoursesSuccess(json));
      })
      .catch(function(error) {
        console.log("there was an error");
        dispatch(searchMultipleCoursesError(error));
      });
  };
};

export const searchCoursesBySubjectAndYear = ({ subject, year }) => {
  return dispatch => {
    dispatch(searchMultipleCoursesLoading());
    return fetch("/api/coursesubjectyear?&year=" + year + "&subject=" + subject)
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch(searchMultipleCoursesSuccess(json));
      })
      .catch(function(error) {
        console.log(error);
        dispatch(searchMultipleCoursesError(error));
      });
  };
};

export const searchCoursesByYearAndNumber = ({ year, number }) => {
  return dispatch => {
    dispatch(searchMultipleCoursesLoading());
    return fetch("/api/courseyearnumber?&number=" + number + "&year=" + year)
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch(searchMultipleCoursesSuccess(json));
      })
      .catch(function(error) {
        console.log("there was an error");
        console.log(error);
        dispatch(searchMultipleCoursesError(error));
      });
  };
};
