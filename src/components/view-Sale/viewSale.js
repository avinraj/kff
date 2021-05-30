import "./viewSale.css";
export default function ViewReact(props) {
  console.log(props, "Selected sale");
  if (props.data) {
    return (
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h1 style={{ marginLeft: "35%", fontWeight: "bolder" }}>Sale Info</h1>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body fw-bolder">
          <div>
            <div className="d-flex justify-content-between viewSaleFlex">
              <label>
                Customer Name:{" "}
                <span className="badge bg-dark text-wrap">
                  {props.data.name}
                </span>
              </label>
              <label>Date: </label>
            </div>
            <div className="d-flex justify-content-between viewSaleFlex">
              <label>
                Type of Fish :{" "}
                <span className="badge bg-dark text-wrap">
                  {props.data.fishType}
                </span>
              </label>
              <label>
                No. of Kg :{" "}
                <span className="badge bg-dark text-wrap">{props.data.kg}</span>
              </label>
            </div>
            <div className="d-flex justify-content-between align-items-center viewSaleFlex">
              <div className="d-flex flex-column">
                <label>
                  Price:{" "}
                  <span className="badge bg-dark text-wrap">
                    {props.data.price}
                  </span>
                </label>
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
              <label>
                Amount Recieved :{" "}
                <span className="badge bg-dark text-wrap">
                  {props.data.amount}
                </span>
              </label>
            </div>
            <div className="d-flex flex-column viewSaleFlex">
              <label>
                Payement Status :{" "}
                <span className="badge bg-dark text-wrap">
                  {props.data.payComp ? "Completed" : "Not completed"}
                </span>
              </label>
              <label>
                Payement Type :{" "}
                <span className="badge bg-dark text-wrap">
                  {props.data.payType}
                </span>
              </label>
            </div>
            <div className="d-flex justify-content-center viewSaleFlex">
              <button type="button" className="btn btn-primary">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
