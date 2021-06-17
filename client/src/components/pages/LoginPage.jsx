import "./loginPage.scss";
import loginImg from "../../images/login-img.jpg";
import React, { useState } from "react";

import Logo from "../../images/cube-logo-line-icon-nostroke.png";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";

import { Link } from "react-router-dom";
import { Transition, SwitchTransition } from "react-transition-group";

const LoginPage = () => {
  const [show, setShow] = useState(true);
  const defaultStyle = {
    transition: `all 0.4s ease`,
    opacity: 1,
    transform: "translateX(0)",
  };
  const transitionStyles = {
    entering: { transform: "translateX(100%)", opacity: 0 },
    entered: { transform: "translateX(0)", opacity: 1 },
    exiting: { transform: "translateX(-100%)", opacity: 1 },
    exited: { transform: "translateX(-100%)", opacity: 0 },
  };
  const imageTransition = {
    entering: { transform: "translateX(-100%)", opacity: 0 },
    entered: { transform: "translateX(0)", opacity: 1 },
  };
  return (
    <div className="login-page">
      <Link to="/">
        <img className="logo" src={Logo} alt="logo" />
      </Link>
      <div className="card">
        <Transition
          in={true}
          timeout={{
            appear: 300,
            enter: 300,
          }}
          appear
        >
          {(state) => (
            <div
              className="card__image"
              style={{
                ...defaultStyle,
                ...imageTransition[state],
              }}
            >
              <img src={loginImg} alt="img" />
            </div>
          )}
        </Transition>

        <SwitchTransition>
          <Transition
            timeout={{
              appear: 400,
              enter: 400,
              exit: 400,
            }}
            appear
            unmountOnExit
            key={show}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
          >
            {show
              ? (state) => (
                  <LoginForm
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state],
                    }}
                    toggle={() => setShow(!show)}
                  ></LoginForm>
                )
              : (state) => (
                  <RegisterForm
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state],
                    }}
                    toggle={() => setShow(!show)}
                  ></RegisterForm>
                )}
          </Transition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default LoginPage;
