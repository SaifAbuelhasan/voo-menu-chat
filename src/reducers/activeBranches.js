import { SET_ACTIVE_BRANCHES } from "../actions/activeBranches.js";

export default function activeBranches(state = null, action) {
  switch (action.type) {
    case SET_ACTIVE_BRANCHES:
      return action.payload;
    default:
      return state;
  }
}
