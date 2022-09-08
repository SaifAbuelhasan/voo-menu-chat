// redux action creator for authedUser
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

// action creator
export function setActiveChat(chat) {
  return {
    type: SET_ACTIVE_CHAT,
    payload: chat,
  };
}
