import { SET_ACTIVE_CUSTOMER } from "../actions/activeCustomer.js";

export default function activeCustomer(state = null, action) {
  switch (action.type) {
    case SET_ACTIVE_CUSTOMER:
      return action.payload;
    default:
      return state;
  }
}
