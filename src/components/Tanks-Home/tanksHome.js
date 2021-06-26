import React, { Component } from "react";
import "./tanksHome.css";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import ConfirmBox from "../../Utils/confirmBox";
import { tankURL } from "../../Utils/baseUrl";
import Alert from "../../Utils/alerts";
class TanksHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tankName: "",
      mmYY: "",
      saleStatus: "",
      collapse: [false, false, false, false, false, false, false],
      confirmMsg: "",
      alertdata: {
        data: "",
        color: "",
      },
      dataArr: [],
    };
  }
  componentDidMount() {
    tankURL
      .get("")
      .then((res) => {
        if (res.data.length) {
          this.setState({ dataArr: res.data });
        } else {
          this.setState({
            alertdata: {
              data: "Something went wrong.Please try again later",
              color: "rgb(247 86 61)",
            },
          });
        }
      })
      .catch((err) => {
        this.setState({
          alertdata: {
            data: "Something went wrong.Please try again later",
            color: "rgb(247 86 61)",
          },
        });
      });
  }
  componentDidUpdate() {
    if (this.state.collapse.includes(true)) {
      document.getElementById("main").style.overflowX = "hidden";
    } else {
      document.getElementById("main").style.overflowX = "auto";
    }
  }
  componentWillUnmount() {
    this.setState({
      collapse: [false, false, false, false, false, false, false],
      dataArr: [],
    });
  }
  async onCardClick(tNumber) {
    var index = await this.state.dataArr.findIndex((o) =>
      o.tankNo === tNumber ? true : false
    );
    if (index >= 0) {
      this.setState({
        id: this.state.dataArr[index]._id,
        tankName: this.state.dataArr[index].tankNo,
        mmYY: this.state.dataArr[index].mmyy,
        saleStatus: this.state.dataArr[index].saleStatus,
      });
    }
  }
  async addNew() {
    await this.setState({ confirmMsg: "" });
    var body = {
      tankNo: this.state.tankName,
      mmyy: this.state.mmYY,
    };
    tankURL
      .post("", body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data !== false) {
            var text = this.state.tankName;
            var pos = parseInt(text, 10) - 1;
            var arr = this.state.collapse;
            arr[pos] = false;
            this.setState({
              dataArr: res.data.data,
              collapse: arr,
            });
          } else {
            this.setState({
              alertdata: {
                data: "Culturing already exists.Please try again later",
                color: "rgb(247 86 61)",
              },
            });
          }
        } else {
          this.setState({
            alertdata: {
              data: "Something went wrong.Please try again later",
              color: "rgb(247 86 61)",
            },
          });
        }
      })
      .catch((err) => {
        this.setState({
          alertdata: {
            data: "Something went wrong.Please try again later",
            color: "rgb(247 86 61)",
          },
        });
      });
  }
  async dateFormatChange(newDate, tNumber) {
    var str = newDate;
    var splitString = str.toString().split(" ");
    var month = splitString[1];
    var year = splitString[3];
    var concaStr = month.concat(" ", year);
    await this.setState({
      id: "",
      tankName: tNumber,
      mmYY: concaStr,
      saleStatus: "",
    });
    const msg1 = "Click YES to start a new culturing in tank - ";
    const msg2 = " from ";
    this.setState({
      confirmMsg: msg1.concat(this.state.tankName, msg2, this.state.mmYY),
    });
  }
  render() {
    return (
      <div
        className="cardContainer gridContainer"
        id="main"
      >
        <div
          className="card"
          style={{
            width: "18rem",
            height: "10rem",
          }}
          data-bs-toggle={
            this.state.dataArr.find((item) => item.tankNo === "1")
              ? "modal"
              : null
          }
          data-bs-target={
            this.state.dataArr.find((item) => item.tankNo === "1")
              ? "#tankModal"
              : null
          }
          onClick={() => this.onCardClick("1")}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-1</h5>
            {this.state.dataArr.find((item) => item.tankNo === "1") ? (
              <h6 className="card-subtitle mb-2 text-muted">Click for more</h6>
            ) : (
              <div>
                <button
                  id="btnCollapse1"
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample1"
                  aria-expanded="false"
                  aria-controls="collapseExample1"
                  onClick={async () => {
                    var arr = [...this.state.collapse];
                    arr[0] = !this.state.collapse[0];
                    await this.setState({ collapse: arr });
                    if (this.state.collapse[0] === true) {
                      document.getElementById("btnCollapse1").innerText =
                        "Cancel";
                    }
                    if (this.state.collapse[0] === false) {
                      document.getElementById("btnCollapse1").innerText =
                        "Start";
                    }
                  }}
                >
                  Start
                </button>
                <div className="collapse" id="collapseExample1">
                  <div className="card card-body" style={{ padding: "0px" }}>
                    <DatePicker
                      closeOnScroll
                      popperClassName="popperDiv"
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      value={this.state.mmYY}
                      popperPlacement="top-start"
                      placeholderText="clik to select a date"
                      onChange={(newDate) =>
                        this.dateFormatChange(newDate, "1")
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="card"
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle={
            this.state.dataArr.find((item) => item.tankNo === "2")
              ? "modal"
              : null
          }
          data-bs-target={
            this.state.dataArr.find((item) => item.tankNo === "2")
              ? "#tankModal"
              : null
          }
          onClick={() => this.onCardClick("2")}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-2</h5>
            {this.state.dataArr.find((item) => item.tankNo === "2") ? (
              <h6 className="card-subtitle mb-2 text-muted">Click for more</h6>
            ) : (
              <div>
                <button
                  id="btnCollapse2"
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample2"
                  aria-expanded="false"
                  aria-controls="collapseExample2"
                  onClick={async () => {
                    var arr = [...this.state.collapse];
                    arr[1] = !this.state.collapse[1];
                    await this.setState({ collapse: arr });
                    if (this.state.collapse[1] === true) {
                      document.getElementById("btnCollapse2").innerText =
                        "Cancel";
                    }
                    if (this.state.collapse[1] === false) {
                      document.getElementById("btnCollapse2").innerText =
                        "Start";
                    }
                  }}
                >
                  Start
                </button>
                <div className="collapse" id="collapseExample2">
                  <div className="card card-body" style={{ padding: "0px" }}>
                    <DatePicker
                      closeOnScroll
                      popperClassName="popperDiv"
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      value={this.state.mmYY}
                      popperPlacement="top-start"
                      placeholderText="clik to select a date"
                      onChange={(newDate) =>
                        this.dateFormatChange(newDate, "2")
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="card"
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle={
            this.state.dataArr.find((item) => item.tankNo === "3")
              ? "modal"
              : null
          }
          data-bs-target={
            this.state.dataArr.find((item) => item.tankNo === "3")
              ? "#tankModal"
              : null
          }
          onClick={() => this.onCardClick("3")}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-3</h5>
            {this.state.dataArr.find((item) => item.tankNo === "3") ? (
              <h6 className="card-subtitle mb-2 text-muted">Click for more</h6>
            ) : (
              <div>
                <button
                  id="btnCollapse3"
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample3"
                  aria-expanded="false"
                  aria-controls="collapseExample3"
                  onClick={async () => {
                    var arr = [...this.state.collapse];
                    arr[2] = !this.state.collapse[2];
                    await this.setState({ collapse: arr });
                    if (this.state.collapse[2] === true) {
                      document.getElementById("btnCollapse3").innerText =
                        "Cancel";
                    }
                    if (this.state.collapse[2] === false) {
                      document.getElementById("btnCollapse3").innerText =
                        "Start";
                    }
                  }}
                >
                  Start
                </button>
                <div className="collapse" id="collapseExample3">
                  <div className="card card-body" style={{ padding: "0px" }}>
                    <DatePicker
                      closeOnScroll
                      popperClassName="popperDiv"
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      value={this.state.mmYY}
                      popperPlacement="top-start"
                      placeholderText="clik to select a date"
                      onChange={(newDate) =>
                        this.dateFormatChange(newDate, "3")
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="card"
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle={
            this.state.dataArr.find((item) => item.tankNo === "4")
              ? "modal"
              : null
          }
          data-bs-target={
            this.state.dataArr.find((item) => item.tankNo === "4")
              ? "#tankModal"
              : null
          }
          onClick={() => this.onCardClick("4")}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-4</h5>
            {this.state.dataArr.find((item) => item.tankNo === "4") ? (
              <h6 className="card-subtitle mb-2 text-muted">Click for more</h6>
            ) : (
              <div>
                <button
                  id="btnCollapse4"
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample4"
                  aria-expanded="false"
                  aria-controls="collapseExample4"
                  onClick={async () => {
                    var arr = [...this.state.collapse];
                    arr[3] = !this.state.collapse[3];
                    await this.setState({ collapse: arr });
                    if (this.state.collapse[3] === true) {
                      document.getElementById("btnCollapse4").innerText =
                        "Cancel";
                    }
                    if (this.state.collapse[3] === false) {
                      document.getElementById("btnCollapse4").innerText =
                        "Start";
                    }
                  }}
                >
                  Start
                </button>
                <div className="collapse" id="collapseExample4">
                  <div className="card card-body" style={{ padding: "0px" }}>
                    <DatePicker
                      closeOnScroll
                      popperClassName="popperDiv"
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      value={this.state.mmYY}
                      popperPlacement="top-start"
                      placeholderText="clik to select a date"
                      onChange={(newDate) =>
                        this.dateFormatChange(newDate, "4")
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="card"
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle={
            this.state.dataArr.find((item) => item.tankNo === "5")
              ? "modal"
              : null
          }
          data-bs-target={
            this.state.dataArr.find((item) => item.tankNo === "5")
              ? "#tankModal"
              : null
          }
          onClick={() => this.onCardClick("5")}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-5</h5>
            {this.state.dataArr.find((item) => item.tankNo === "5") ? (
              <h6 className="card-subtitle mb-2 text-muted">Click for more</h6>
            ) : (
              <div>
                <button
                  id="btnCollapse5"
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample5"
                  aria-expanded="false"
                  aria-controls="collapseExample5"
                  onClick={async () => {
                    var arr = [...this.state.collapse];
                    arr[4] = !this.state.collapse[4];
                    await this.setState({ collapse: arr });
                    if (this.state.collapse[4] === true) {
                      document.getElementById("btnCollapse5").innerText =
                        "Cancel";
                    }
                    if (this.state.collapse[4] === false) {
                      document.getElementById("btnCollapse5").innerText =
                        "Start";
                    }
                  }}
                >
                  Start
                </button>
                <div className="collapse" id="collapseExample5">
                  <div className="card card-body" style={{ padding: "0px" }}>
                    <DatePicker
                      closeOnScroll
                      popperClassName="popperDiv"
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      value={this.state.mmYY}
                      popperPlacement="top-start"
                      placeholderText="clik to select a date"
                      onChange={(newDate) =>
                        this.dateFormatChange(newDate, "5")
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="card"
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle={
            this.state.dataArr.find((item) => item.tankNo === "6")
              ? "modal"
              : null
          }
          data-bs-target={
            this.state.dataArr.find((item) => item.tankNo === "6")
              ? "#tankModal"
              : null
          }
          onClick={() => this.onCardClick("6")}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-6</h5>
            {this.state.dataArr.find((item) => item.tankNo === "6") ? (
              <h6 className="card-subtitle mb-2 text-muted">Click for more</h6>
            ) : (
              <div>
                <button
                  id="btnCollapse6"
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample6"
                  aria-expanded="false"
                  aria-controls="collapseExample6"
                  onClick={async () => {
                    var arr = [...this.state.collapse];
                    arr[5] = !this.state.collapse[5];
                    await this.setState({ collapse: arr });
                    if (this.state.collapse[5] === true) {
                      document.getElementById("btnCollapse6").innerText =
                        "Cancel";
                    }
                    if (this.state.collapse[5] === false) {
                      document.getElementById("btnCollapse6").innerText =
                        "Start";
                    }
                  }}
                >
                  Start
                </button>
                <div className="collapse" id="collapseExample6">
                  <div className="card card-body" style={{ padding: "0px" }}>
                    <DatePicker
                      closeOnScroll
                      popperClassName="popperDiv"
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      value={this.state.mmYY}
                      popperPlacement="top-start"
                      placeholderText="clik to select a date"
                      onChange={(newDate) =>
                        this.dateFormatChange(newDate, "6")
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="card"
          style={{ width: "18rem", height: "10rem" }}
          data-bs-toggle={
            this.state.dataArr.find((item) => item.tankNo === "7")
              ? "modal"
              : null
          }
          data-bs-target={
            this.state.dataArr.find((item) => item.tankNo === "7")
              ? "#tankModal"
              : null
          }
          onClick={() => this.onCardClick("7")}
        >
          <div className="card-body">
            <h5 className="card-title">Tank-7</h5>
            {this.state.dataArr.find((item) => item.tankNo === "7") ? (
              <h6 className="card-subtitle mb-2 text-muted">Click for more</h6>
            ) : (
              <div>
                <button
                  id="btnCollapse7"
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample7"
                  aria-expanded="false"
                  aria-controls="collapseExample7"
                  onClick={async () => {
                    var arr = [...this.state.collapse];
                    arr[6] = !this.state.collapse[6];
                    await this.setState({ collapse: arr });
                    if (this.state.collapse[6] === true) {
                      document.getElementById("btnCollapse7").innerText =
                        "Cancel";
                    }
                    if (this.state.collapse[6] === false) {
                      document.getElementById("btnCollapse7").innerText =
                        "Start";
                    }
                  }}
                >
                  Start
                </button>
                <div className="collapse" id="collapseExample7">
                  <div className="card card-body" style={{ padding: "0px" }}>
                    <DatePicker
                      closeOnScroll
                      popperClassName="popperDiv"
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      value={this.state.mmYY}
                      popperPlacement="top-start"
                      placeholderText="clik to select a date"
                      onChange={(newDate) =>
                        this.dateFormatChange(newDate, "7")
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {this.state.confirmMsg !== "" ? (
          <div className="confirmBoxDiv">
            <ConfirmBox
              data={this.state.confirmMsg}
              onClickYes={() => this.addNew()}
              onCloseBox={() => this.setState({ confirmMsg: "" })}
            />
          </div>
        ) : null}
        <TankModal tankID={this.state.tankName} mmyy={this.state.mmYY} id={this.state.id} />
        <div className="alertDiv">
          <Alert
            data={this.state.alertdata}
            onAlertClose={() => {
              this.setState({ alertdata: { data: "", color: "" } });
            }}
          />
        </div>
      </div>
    );
  }
}
const TankModal = (props) => {
  let history = useHistory();
  const redirect = () => {
    history.push({
      pathname: `/Add-Sale/${props.id}`,
      state: { data: {} },
    });
  };
  const redirectCurrentSale = () => {
    history.push({
      pathname: `/Current-Sales/${props.id}`,
    });
  };
  return (
    <div>
      <div className="modal fade" tabIndex="-1" id="tankModal">
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content" style={{backgroundColor:"#dbe1e6"}}>
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
              <button
                className="btn btn-warning shadow"
                onClick={redirectCurrentSale}
                data-bs-dismiss="modal"
              >
                Current Sales
              </button>
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
    </div>
  );
};
export default TanksHome;
