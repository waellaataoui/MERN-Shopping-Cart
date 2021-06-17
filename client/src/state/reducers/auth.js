import * as actions from "../actions/types";
const initialState = {
  user: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        user: action.user,
        error: null,
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.LOGOUT:
      return { ...state, user: null };
    case actions.GET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
