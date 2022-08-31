import { combineReducers } from "redux";
import authedUser from "./authedUser";
import activeCustomer from "./activeCustomer";

export default combineReducers({
  authedUser,
  activeCustomer,
});
