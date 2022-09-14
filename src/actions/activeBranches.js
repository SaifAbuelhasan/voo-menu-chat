// redux action creator for authedUser
export const SET_ACTIVE_BRANCHES = "SET_ACTIVE_BRANCHES";

// action creator
export function setActiveBranches(branches) {
  return {
    type: SET_ACTIVE_BRANCHES,
    payload: branches,
  };
}
