import axios from "axios";
import { UPDATE_CART } from "./types";
const updateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
});

export const getCart = () => async (dispatch) => {
  const res = await axios.get("/cart");
  const cart = res.data;

  dispatch(updateCart(cart));
};
export const addItem = (id) => async (dispatch) => {
  const res = await axios.get(`/cart/add-item/${id}`);
  const cart = res.data;

  dispatch(updateCart(cart));
};
export const incrementItem = (id) => async (dispatch) => {
  const res = await axios.get(`/cart/increase-item/${id}`);
  if (res.status !== 404) {
    const cart = res.data;
    dispatch(updateCart(cart));
  } //handle error here
};
export const decrementItem = (id) => async (dispatch) => {
  const res = await axios.get(`/cart/reduce-item/${id}`);

  const cart = res.data;
  dispatch(updateCart(cart));
};
export const removeItem = (id) => async (dispatch) => {
  const res = await axios.get(`/cart/remove-item/${id}`);

  const cart = res.data;
  dispatch(updateCart(cart));
};
