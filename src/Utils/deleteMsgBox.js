import "./deleteMsgBox.css";
import API from "./salesbaseUrl";
import React, { useEffect, useRef, useState } from "react";
import Alert from "./alerts";
export default function DeleteMsgBox(props) {
  const [alertData, setalertData] = useState({
    data: "",
    color: "",
  });
  const [divView, setdivView] = useState(false);
  console.log(props.data);
  const box = useRef(null);
  useEffect(() => {
    if (props.data.msg !== "") {
      setdivView(true);
    }
  }, [props.data.msg]);
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
  const onClickDelete = () => {
    API.delete(`addSale/${props.data._id}/${props.data.tankID}`)
      .then((res) => {
        if (res.status === 200) {
          props.onDeleteMsgBoxClose()
          props.onCanvasClose()
        } else {
          setalertData({
            ...alertData,
            data: "Sales deleting failed. Try Again",
            color: "#e21935",
          });
        }
      })
      .catch((err) => {
        setalertData({
          ...alertData,
          data: "Sales deleting failed. Try Again",
          color: "#e21935",
        });
      });
  };
  return (
    <div ref={box}>
      <div className="alertDiv">
        <Alert
          data={alertData}
          onAlertClose={() => {
            setalertData({ ...alertData, data: "", color: "" });
            props.onDeleteMsgBoxClose()
          }}
        />
      </div>
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
              <button className="btn btn-primary" onClick={onClickDelete}>
                Yes
              </button>
              <button
                className="btn btn-secondary"
                onClick={props.onDeleteMsgBoxClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
