import React, { useEffect, useState } from "react";
import "./login.css";
import { loginURL } from "../../Utils/baseUrl";
import Alert from "../../Utils/alerts";
import { useHistory } from "react-router-dom";
const Login = () => {
  let history = useHistory();
  let _isMounted = true;
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors] = useState({
    emailError: "",
    psswdError: "",
  });
  const [alertData, setalertData] = useState({
    data: "",
    color: "",
  });
  useEffect(() => {
    _isMounted = true;
    return () => {
      _isMounted = false;
      setLoginData(null);
      setalertData(null);
    };
  }, []);
  const setAlert = async (msg, color) => {
    (await _isMounted) &&
      setalertData({ ...alertData, data: msg, color: color });
  };
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
      _isMounted && setLoginData({ ...LoginData, email: e.target.value });
    }
    if (e.target.id === "password") {
      checkErrro("password", e.target.value);
      _isMounted && setLoginData({ ...LoginData, password: e.target.value });
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
  const onClickResetPsswd = async () =>{
    if(LoginData.email !== ""){
      let data = {
        email: LoginData.email
      };
     loginURL.post("forgotPsswd", data)
     .then((res) =>{
       console.log(res.data.email);
      if(res.status === 202){
        _isMounted &&
        setAlert(
          "A link to reset your password is send to your email - "+ res.data.email,
          "#0aab52"
        );
      }
     })
     .catch((err) =>{
      _isMounted &&
      setAlert(
        "Email does not exist.Check the email you have entered",
        "rgb(247 86 61)"
      );
     })
    }else{
      const e = document.getElementById("email");
      e.classList.add("error");
      const p = document.getElementById("password");
      p.classList.remove("error");
    }
  }
  const onClickSubmit = async () => {
    if (
      validateForm(errors) &&
      LoginData.email !== "" &&
      LoginData.password !== ""
    ) {
      let logData = {
        username: LoginData.email,
        password: LoginData.password,
      };
      loginURL
        .post("login", logData)
        .then((res) => {
          window.localStorage.setItem("jwt", res.data.jwt);
          window.localStorage.setItem("user", res.data.id);
        })
        .catch((err) => {
          _isMounted &&
            setAlert(
              "You have entered an invalid username or password",
              "rgb(247 86 61)"
            );
        });
    } else {
      const e = document.getElementById("email");
      e.classList.add("error");
      const p = document.getElementById("password");
      p.classList.add("error");
    }
  };
  if (window.localStorage.length === 2) {
    history.push({ pathname: `/` });
    return null;
  } else {
    return (
      <div className="mainContainer">
        <div className="container">
          <Alert
            data={alertData}
            onAlertClose={() => {
              _isMounted && setalertData({ ...alertData, data: "", color: "" });
            }}
          />
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
              <p className="link-primary" onClick={_isMounted && onClickResetPsswd} style={{ fontStyle: "italic" }}>
                Forgot password ?
              </p>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ paddingTop: "25px", paddingBottom: "25px" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={ _isMounted && onClickSubmit}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};
export default Login;
