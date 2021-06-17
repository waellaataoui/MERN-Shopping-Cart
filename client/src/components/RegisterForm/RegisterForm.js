import React, { useState } from "react";
import { connect } from "react-redux";
import { register, loginErrorAction } from "../../state/actions/auth";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Person from "@material-ui/icons/Person";
import Mail from "@material-ui/icons/Mail";
import Lock from "@material-ui/icons/Lock";
import Arrow from "@material-ui/icons/ArrowRight";
const RegisterForm = ({ register, toggle, error, style, clearError }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div style={{ ...style }} className="card__form">
      <h1>Welcome!</h1>
      <p>Create your account</p>

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
          placeholder={"email"}
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail color="disabled" />
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
          Already have an account? Login
        </p>
        <button
          className="btn"
          onClick={async (e) => {
            e.preventDefault();
            clearError();
            register(username, email, password);
          }}
          type="submit"
        >
          Signup
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
  register: (username, email, password) =>
    dispatch(register(username, email, password)),
  clearError: () => dispatch(loginErrorAction("")),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
