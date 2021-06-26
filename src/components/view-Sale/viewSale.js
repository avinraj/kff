import "./viewSale.css";
import { useHistory } from "react-router-dom";
import DeleteMsgBox from "../../Utils/deleteMsgBox";
import React, { useState } from "react";
export default function ViewReact(props) {
  let history = useHistory();
  const [deleteMsg, setdeleteMsg] = useState({
    msg: "",
    _id: "",
    tankID: "",
    tankNo: "",
    mmyy: ""
  });
  if (Object.keys(props.data).length) {
    const onEditClick = () => {
      history.push({
        pathname: `/Add-Sale/${props.data.tankID}`,
        state: { data: props.data },
      });
    };
    return (
      <div
        className="offcanvas offcanvas-start"
        style={{
          backgroundColor: "#3eb6ca",
          color: "black",
          borderRadius: "65px",
        }}
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h1 style={{ marginLeft: "30%", fontWeight: "bolder" }}>Sale Info</h1>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body fw-bolder">
          <div className="d-flex flex-column">
            <label className="viewSaleFlex">
              Customer Name : {props.data.name}
            </label>
            {/* <label  className="viewSaleFlex">Date: {props.data.date.substr(0,10)}</label> */}
            <label className="viewSaleFlex">
              Type of Fish : {props.data.fishType}
            </label>
            <label className="viewSaleFlex">No. of Kg : {props.data.kg}</label>
            <div className="d-flex flex-column">
              <label className="viewSaleFlex">Price : {props.data.price}</label>
              <label
                style={{
                  display: props.data.cleaning ? "contents" : "none",
                  fontStyle: "italic",
                  fontWeight: "lighter",
                }}
              >
                * Cleaning included
              </label>
            </div>
            <label className="viewSaleFlex">
              Amount Recieved : {props.data.amountReciv}
            </label>
            <label className="viewSaleFlex">
              Payement Status :{" "}
              {props.data.payComp ? "Completed" : "Not completed"}
            </label>
            <label className="viewSaleFlex">
              Payement Type : {props.data.payType}
            </label>
            <div>
              <button
                type="button"
                className="btn btn-primary viewSaleFlex"
                style={{ marginRight: "100px" }}
                data-bs-dismiss="offcanvas"
                onClick={onEditClick}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-secondary viewSaleFlex"
                // data-bs-dismiss="offcanvas"
                onClick={() => {
                  setdeleteMsg({
                    msg: "This data will be removed permanently,Do you want to continue",
                    _id: props.data._id,
                    tankID: props.data.tankID,
                    tankNo: props.data.tankNo,
                    mmyy: props.data.mmyy
                  });
                }}
              >
                DELETE
              </button>
            </div>
          </div>
          {deleteMsg.msg !== "" &&
          deleteMsg._id !== "" &&
          deleteMsg.tankID !== "" &&
          deleteMsg.tankNo !== "" &&
          deleteMsg.mmyy !== "" ? (
            <DeleteMsgBox
              data={deleteMsg}
              onDeleteMsgBoxClose={() => {
                setdeleteMsg({ msg: "", _id: "", tankID: "" });
              }}
              onCanvasClose={() => props.onoffCanvasClose()}
            />
          ) : null}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="offcanvas offcanvas-start"
        style={{
          backgroundColor: "#3eb6ca",
          color: "black",
          borderRadius: "65px",
        }}
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h1 style={{ marginLeft: "30%", fontWeight: "bolder" }}>Sale Info</h1>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body fw-bolder">
          <div className="d-flex flex-column">
            <h3>Data not available.Please try again later..</h3>
          </div>
        </div>
      </div>
    );
  }
}
