import * as actions from "../actions/types";
const initialState = {
  cart: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_CART:
      return {
        ...state,
        cart: action.cart,
      };
    default:
      return state;
  }
};
