import React, { useState } from "react";
import "./login.css";
const Login = () => {
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors] = useState({
    emailError: "",
    psswdError: "",
  });
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  const checkErrro = (name, value) => {
    switch (name) {
      case "email":
        errors.emailError = value.length === 0 ? "Enter the email" : "";
        if (errors.emailError !== "") {
          const e = document.getElementById("email");
          e.classList.add("error");
        }
        break;
      case "password":
        errors.psswdError = value.length === 0 ? "Enter the password" : "";
        if (errors.emailError !== "") {
          const e = document.getElementById("password");
          e.classList.add("error");
        }
        break;
      default:
        break;
    }
  };
  const handleChange = (e) => {
    if (e.target.id === "email") {
      checkErrro("email", e.target.value);
      setLoginData({ ...LoginData, email: e.target.value });
    }
    if (e.target.id === "password") {
      checkErrro("password", e.target.value);
      setLoginData({ ...LoginData, password: e.target.value });
    }
  };
  const showPsswdClick = () => {
    const e = document.getElementById("password");
    if (e.type === "password") {
      e.type = "text";
    } else {
      e.type = "password";
    }
  };
  const onClickSubmit = () => {
    if (
      validateForm(errors) &&
      LoginData.email !== "" &&
      LoginData.password !== ""
    ) {
      console.log(LoginData, "VALID DATA");
    } else {
      const e = document.getElementById("email");
      e.classList.add("error");
      const p = document.getElementById("password");
      p.classList.add("error");
    }
  };
  return (
    <div className="mainContainer">
      <div className="container">
        <form autoComplete="off">
          <h3
            className="d-flex justify-content-center"
            style={{ paddingTop: "20px" }}
          >
            SIGN IN
          </h3>
          <div
            className="d-flex justify-content-center"
            style={{
              position: "relative",
              paddingTop: "25px",
              marginLeft: "15%",
              marginRight: "15%",
            }}
          >
            <input
              className="effect-1 "
              type="text"
              id="email"
              placeholder="Enter your Email"
              value={LoginData.email}
              onChange={handleChange}
            />
            <span className="focus-border"></span>
          </div>
          <div
            className="d-flex justify-content-center"
            style={{
              position: "relative",
              paddingTop: "25px",
              marginLeft: "15%",
              marginRight: "15%",
            }}
          >
            <input
              className="effect-1 "
              type="password"
              id="password"
              placeholder="Enter your Password"
              value={LoginData.password}
              onChange={handleChange}
            />
            <span className="focus-border"></span>
          </div>
          <div
            className="d-flex justify-content-around"
            style={{ paddingTop: "15px" }}
          >
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onClick={showPsswdClick}
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ fontStyle: "italic", fontSize: "smaller" }}
              >
                Show password
              </label>
            </div>
            <p className="link-primary"  style={{ fontStyle: "italic"}}>Forgot password ?</p>
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ paddingTop: "25px", paddingBottom: "25px" }}
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClickSubmit}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;