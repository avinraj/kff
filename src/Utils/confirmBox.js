import React, { useState, useEffect } from "react";
export default function ConfirmBox(props) {
  console.log(props.data);
  const [divView, setdivView] = useState(false);
  useEffect(() => {
    if (props.data !== "") {
      setdivView(true);
    }
  }, [props.data]);
  return (
    <div>
      <div
        id="liveToast"
        style={{ display: divView ? "contents" : "none" }}
        className="toast"
        data-keyboard="false"
        data-backdrop="static"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div
          className="toast-header d-flex flex-row-reverse"
          style={{ backgroundClip: "initial", backgroundColor: "rgb(60 246 255)" }}
        >
          <button
            type="button"
            className="btn-close"
            onClick={props.onCloseBox}
            aria-label="Close"
          ></button>
        </div>
        <div
          className="toast-body d-flex flex-column"
          style={{ backgroundColor: "rgb(60 246 255)" }}
        >
          <h5 style={{ maxWidth: "365px" }}>{props.data}</h5>
          <div className="d-flex justify-content-around">
            <button
              className="btn btn-primary"
              onClick={props.onClickYes}
            >
              Yes
            </button>
            <button
              className="btn btn-secondary"
              onClick={props.onCloseBox}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
