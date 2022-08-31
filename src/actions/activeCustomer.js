// redux action creator for authedUser
export const SET_ACTIVE_CUSTOMER = "SET_ACTIVE_CUSTOMER";

// action creator
export function setActiveCustomer(customer) {
  return {
    type: SET_ACTIVE_CUSTOMER,
    payload: customer,
  };
}
