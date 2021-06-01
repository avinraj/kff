import "./viewSale.css";
import { useHistory } from "react-router-dom";
export default function ViewReact(props) {
  let history = useHistory();
  console.log(props, "Selected sale");
  if (props.data) {
    const onEditClick = () => {
      history.push({
        pathname: `/Add-Sale/${props.data.tankNo}/${props.data.mmyy}`,
        state: {data: props.data}
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
                data-bs-dismiss="offcanvas"
                onClick={onEditClick}
              >
                Edit
              </button>
            </div>
          </div>
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
