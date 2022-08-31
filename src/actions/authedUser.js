// redux action creator for authedUser
export const SET_AUTHED_USER = "SET_AUTHED_USER";

// action creator
export function setAuthedUser(payload) {
  return {
    type: SET_AUTHED_USER,
    payload,
  };
}
