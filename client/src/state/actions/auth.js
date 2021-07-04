import axios from "axios";
import { getCart } from "./cart";
import { GET_USER, LOGIN, LOGIN_ERROR, LOGOUT } from "./types";
import { history } from "../../routers/AppRouter";
const getUserAction = (user) => ({
  type: GET_USER,
  user,
});
const loginAction = (user) => ({
  type: LOGIN,
  user,
});
export const loginErrorAction = (error) => ({
  type: LOGIN_ERROR,
  error,
});
const logoutAction = () => ({
  type: LOGOUT,
});
export const login = (username, password) => async (dispatch) => {
  const res = await axios.get("/api/auth/local", {
    params: {
      username,
      password,
    },
  });
  const user = await res.data;
  if (user.message) dispatch(loginErrorAction(user.message));
  else {
    dispatch(loginAction(user));
    history.push("/");
  }
};
export const logout = () => async (dispatch) => {
  const res = await axios.get("/api/auth/logout");
  if (res.status === 200) {
    dispatch(logoutAction());
    dispatch(getCart());
    history.push("/login");
  }
};
export const register = (username, email, password) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/register", {
      username,
      email,
      password,
    });

    history.go(0);
  } catch (error) {
    if (error.response.data.code === 11000) {
      console.log(error.response.data);
      if (Object.keys(error.response.data.keyValue).includes("email"))
        dispatch(loginErrorAction("email already in use"));
      else {
        dispatch(loginErrorAction("username already taken"));
      }
    }
  }
};

export const getUser = () => async (dispatch) => {
  const res = await axios.get("/api/users");
  dispatch(getUserAction(res.data));
};
