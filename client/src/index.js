import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

document.addEventListener("touchmove", function(event) {
  event.preventDefault();
});

const store = createStore(reducer, { loggedIn: false });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

{
  /* registerServiceWorker(); */
}
