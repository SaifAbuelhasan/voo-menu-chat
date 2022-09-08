import { combineReducers } from "redux";
import authedUser from "./authedUser";
import activeCustomer from "./activeCustomer";
import activeChat from "./activeChat";
import messages from "./messages";

export default combineReducers({
  authedUser,
  activeCustomer,
  messages,
  activeChat,
});
