import {
  SEARCH_COURSE_FAIL,
  SEARCH_COURSE_SUCCESS,
  SEARCH_MULTIPLE_COURSES_FAIL,
  SEARCH_MULTIPLE_COURSES_SUCCESS,
  SEARCH_MULTIPLE_COURSES_LOADING
} from "../types/searchTypes";

const defaultState = {
  gradesA: null,
  gradesB: null,
  gradesC: null,
  gradesDF: null,
  averageGrade: null,
  averageHours: null,
  courseRating: null,
  avgCourseRating: null,
  courseSearchResults: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SEARCH_COURSE_FAIL:
      return {};
    case SEARCH_COURSE_SUCCESS:
      console.log("search is in reducer");
      console.log(action);
      return {
        gradesA: action.gradesA,
        gradesB: action.gradesB,
        gradesC: action.gradesC,
        gradesDF: action.gradesDF,
        averageGrade: action.averageGrade,
        averageHours: action.averageHours,
        courseRating: action.courseRating,
        avgCourseRating: action.avgCourseRating,
        courseSearchResults: null
      };
    case SEARCH_MULTIPLE_COURSES_FAIL:
      return {};
    case SEARCH_MULTIPLE_COURSES_LOADING:
      console.log("loading in reducer");
      return {
        results: null,
        loading: true
      };
    case SEARCH_MULTIPLE_COURSES_SUCCESS:
      console.log("success is in reducer");
      return {
        results: action.results,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
