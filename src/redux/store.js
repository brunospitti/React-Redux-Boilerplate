import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers";

// create an object for the default data
const defaultState = {
  num: 0,
  color: [100,240,7]
};

const store = createStore(
  reducer,
  defaultState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
