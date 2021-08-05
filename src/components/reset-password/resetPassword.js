import React from "react";
import "./resetPassword.css";
const resetPassword = () => {
  return (
    <div className="mainContainer">
      <div className="container">
        <form autoComplete="off">
          <h3
            className="d-flex justify-content-center"
            style={{ paddingTop: "20px" }}
          >
            Reset Password
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
              id="newPsswd"
              placeholder="Enter your new Password"
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
              type="text"
              id="confirmPsswd"
              placeholder="Comfirm your new Password "
            />
            <span className="focus-border"></span>
          </div>

          <div
            className="d-flex justify-content-center"
            style={{ paddingTop: "25px", paddingBottom: "25px" }}
          >
            <button type="button" className="btn btn-primary">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default resetPassword;
