import "./_header.scss";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import logo from "../../images/cube-logo-line-icon-nostroke.png";
import { getUser, logout } from "../../state/actions/auth";
import Cart from "../Cart";

const Header = ({ logout, getUser, user, history }) => {
  let location = useLocation();
  useEffect(() => {
    getUser();
  }, [getUser]);
  const [search, setSearch] = useState("");
  return location.pathname === "/login" ? null : (
    <div className="header">
      <Link to="/">
        <img alt="logo" src={logo} />
      </Link>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (search !== "") history.push(`/search/${search}`);
        }}
      >
        <TextField
          onChange={(e, newVal) => setSearch(e.target.value)}
          label="search"
        ></TextField>
      </form>
      {user ? (
        <button
          className="authButton"
          onClick={() => {
            logout();
            history.push("/");
          }}
        >
          Logout
        </button>
      ) : (
        <Link className="authButton" to="/login">
          Login
        </Link>
      )}
      <Cart></Cart>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  getUser: () => dispatch(getUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
