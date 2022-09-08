import { SET_ACTIVE_CHAT } from "../actions/activeChat.js";

export default function activeChat(state = null, action) {
  switch (action.type) {
    case SET_ACTIVE_CHAT:
      return action.payload;
    default:
      return state;
  }
}
