import React, { Component } from "react";
import cx from "classnames";
import classes from "./tanksHome.module.css";
import { useHistory } from "react-router-dom";
class TanksHome extends Component {
  state = {
    tankName: null,
    mmYY: null
  };
  render() {
    return (
      <div className={cx(classes.cardContainer, classes.gridContainer)}>
        <div
          className={classes.card}
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle="modal"
          data-bs-target="#tankModal"
          onClick={() => this.setState({ tankName: "1" , mmYY: "Jan 2021"})}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-1</h5>
            <h6 className="card-subtitle mb-2 text-muted">Jan 2021</h6>
          </div>
        </div>
        <div
          className={classes.card}
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle="modal"
          data-bs-target="#tankModal"
          onClick={() => this.setState({ tankName: "2", mmYY: "Feb 2021" })}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-2</h5>
            <h6 className="card-subtitle mb-2 text-muted">Feb 2021</h6>
          </div>
        </div>
        <div
          className={classes.card}
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle="modal"
          data-bs-target="#tankModal"
          onClick={() => this.setState({ tankName: "3", mmYY: "March 2021" })}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-3</h5>
            <h6 className="card-subtitle mb-2 text-muted">March 2021</h6>
          </div>
        </div>
        <div
          className={classes.card}
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle="modal"
          data-bs-target="#tankModal"
          onClick={() => this.setState({ tankName: "4", mmYY: "April 2021" })}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-4</h5>
            <h6 className="card-subtitle mb-2 text-muted">April 2021</h6>
          </div>
        </div>
        <div
          className={classes.card}
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle="modal"
          data-bs-target="#tankModal"
          onClick={() => this.setState({ tankName: "5", mmYY: "May 2021" })}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-5</h5>
            <h6 className="card-subtitle mb-2 text-muted">May 2021</h6>
          </div>
        </div>
        <div
          className={classes.card}
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle="modal"
          data-bs-target="#tankModal"
          onClick={() => this.setState({ tankName: "6", mmYY: "June 2021" })}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-6</h5>
            <h6 className="card-subtitle mb-2 text-muted">June 2021</h6>
          </div>
        </div>
        <div
          className={classes.card}
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle="modal"
          data-bs-target="#tankModal"
          onClick={() => this.setState({ tankName: 7, mmYY: "july 2021" })}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-7</h5>
            <h6 className="card-subtitle mb-2 text-muted">july 2021</h6>
          </div>
        </div>
        <TankModal tankID={this.state.tankName} mmyy={this.state.mmYY} />
      </div>
    );
  }
}

const TankModal = (props) => {
  let history = useHistory();
  const redirect = () => {
    history.push({
      pathname: `/Add-Sale/${props.tankID}/${props.mmyy}`
    });
  };

  return (
    <>
      <div className="modal fade" tabIndex="-1" id="tankModal">
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title" style={{ width: "100%" }}>
                Tank {props.tankID}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{props.mmyy}</p>
            </div>
            <div className="modal-footer d-flex justify-content-evenly">
              <a
                className="btn btn-warning shadow"
                href="/Current-Sales"
                role="button"
              >
                Current Sales
              </a>
              <a
                className="btn btn-success shadow"
                href="/Sales-istory"
                role="button"
              >
                Sales History
              </a>
              <button
                className="btn btn-primary shadow"
                onClick={redirect}
                data-bs-dismiss="modal"
              >
                Add Sale
              </button>
              {/* <a className="btn btn-primary shadow" href="/Add-Sale" role="button" >Add Sale</a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TanksHome;
