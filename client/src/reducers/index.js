const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SEARCH_COURSE":
      return {};
    default:
      return defaultState;
  }
};

export default reducer;
