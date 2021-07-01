import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import shiftApp from "./store/reducer";

const store = createStore(shiftApp, applyMiddleware(thunk));

store.subscribe(() => console.log("Store Subscribed"));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
