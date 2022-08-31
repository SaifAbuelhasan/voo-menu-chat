import { LOAD_CHAT_MESSAGES } from "../actions/messages";

export default function messages(state = {}, action) {
  switch (action.type) {
    case LOAD_CHAT_MESSAGES:
      return {
        ...state,
        [action.payload.customerId]: action.payload.messages,
      };
    default:
      return state;
  }
}
