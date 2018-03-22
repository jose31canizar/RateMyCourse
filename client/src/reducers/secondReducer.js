import {
  SEARCH_COURSE_FAIL,
  SEARCH_COURSE_SUCCESS
} from "../types/searchTypes";

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SEARCH_COURSE_SUCCESS:
      console.log("search is in reducer");
      console.log(action);
      return {};
    default:
      return state;
  }
}
