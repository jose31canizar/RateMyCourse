import API from "../api";

export const templateGet = (
  endpoint,
  query,
  errorCallback,
  successCallback
) => param => {
  return dispatch => {
    fetch(`${API}/${endpoint}?${query}=${param}`)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          const error = new Error(res.statusText);
          error.response = res;
          console.log(`There was clearly an error with ${endpoint}`);
          dispatch(errorCallback(error));
          throw error;
        }
      })
      .then(res => {
        console.log(res);
        dispatch(successCallback(res));
      })
      .catch(error => {
        dispatch(errorCallback(error));
        console.log(`request failed for ${endpoint}`, error);
      });
  };
};

export const templateError = type => error => {
  return { type: type, error: error };
};

export const templateSuccess = (type, field) => data => {
  var obj = { type: type };
  obj[field] = data;
  return obj;
};
