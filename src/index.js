import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import logger from "./middleware/logger";

const initialState = {
  authedUser: null,
  activeChat: {
    id: null,
    userInfo: null,
    lastMessageText: null,
    date: null,
  },
};
// redux configure store with reducer and middleware
const store = configureStore({
  reducer,
  middleware: [logger],
  preloadedState: initialState,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
