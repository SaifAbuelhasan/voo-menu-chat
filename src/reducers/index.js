import { combineReducers } from "redux";
import authedUser from "./authedUser.js";
import activeCustomer from "./activeCustomer.js";
import activeChat from "./activeChat.js";
import messages from "./messages.js";

export default combineReducers({
  authedUser,
  activeCustomer,
  messages,
  activeChat,
});
