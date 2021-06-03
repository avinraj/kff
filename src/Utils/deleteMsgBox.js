import "./deleteMsgBox.css";
import React, { useEffect, useRef, useState } from "react";
export default function DeleteMsgBox(props) {
  const [divView, setdivView] = useState(false);
  console.log(props.data.msg);
  const box = useRef(null);
  useEffect(() => {
    if (props.data.msg !== "") {
      setdivView(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      // Function for click event
      function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.onDeleteMsgBoxClose();
        }
      }
       // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
    }, [ref]);
  }
  useOutsideAlerter(box);
  console.log(divView, "DIV VIEW");

  return (
    <div ref={box}>
      <div
        className="top-50 start-50 translate-middle"
        style={{ zIndex: "5", position: "absolute" }}
      >
        <div
          id="liveToast"
          className="toast"
          data-keyboard="false"
          data-backdrop="static"
          style={{ display: divView ? "contents" : "none" }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div
            className="toast-header d-flex flex-row-reverse"
            style={{ backgroundClip: "initial", backgroundColor: "whitesmoke" }}
          >
            <button
              type="button"
              className="btn-close"
              onClick={props.onDeleteMsgBoxClose}
              aria-label="Close"
            ></button>
          </div>
          <div
            className="toast-body d-flex flex-column"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <h5 style={{ maxWidth: "400px" }}>{props.data.msg}</h5>
            <div className="d-flex justify-content-around">
              <button className="btn btn-primary">Yes</button>
              <button className="btn btn-secondary"  onClick={props.onDeleteMsgBoxClose}>No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
