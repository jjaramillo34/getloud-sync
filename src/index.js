// Libs & utils
import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import { thunk as ReduxThunk } from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./core/routes";
import io from "socket.io-client";
import createSocketIoMiddleware from "redux-socket.io";

// Constants
import { WEBSOCKET_URL } from "./core/constants";

// CSS
import "./index.css";

// Reducers
import combineReducers from "./core/reducers";
import App from "./components/app/App";

// Initialize constants
const socket = io(WEBSOCKET_URL);

// Initialize redux-socket-io middleware
// NOTE: All redux actions prefixed with 'WS_TO_SERVER_' will automatically ALSO be emitted
// over websockets to the backend
const socketIoMiddleware = createSocketIoMiddleware(socket, "WS_TO_SERVER_");

// Apply middlewares and initialize store
const createStoreWithMiddlewares = applyMiddleware(
  ReduxThunk,
  socketIoMiddleware
)(createStore);
const store = createStoreWithMiddlewares(combineReducers);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
