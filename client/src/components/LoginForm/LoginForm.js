import React, { useState } from "react";
import { connect } from "react-redux";
import { login, loginErrorAction } from "../../state/actions/auth";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import Arrow from "@material-ui/icons/ArrowRight";
const LoginFom = ({ login, error, style, toggle, clearError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div style={{ ...style }} className="card__form">
      <h1>Welcome!</h1>
      <p>Signin by intering the informations below</p>

      <form>
        <TextField
          placeholder={"username"}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="disabled" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          placeholder={"password"}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="disabled" />
              </InputAdornment>
            ),
          }}
        />

        <p
          onClick={() => {
            clearError();
            toggle();
          }}
          className="signup"
        >
          Or create an account
        </p>
        <button
          className="btn"
          onClick={async (e) => {
            e.preventDefault();
            login(username, password);
          }}
          type="submit"
        >
          Signin
          <Arrow></Arrow>
        </button>
        {error && <p className="login-error"> {error} </p>}
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  error: state.auth.error,
});
const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password)),
  clearError: () => dispatch(loginErrorAction("")),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginFom);
