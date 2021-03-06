import React, { Component, useEffect, useRef, useState } from "react";
import "./tanksHome.css";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import ConfirmBox from "../../Utils/confirmBox";
import { tankURL } from "../../Utils/baseUrl";
import Alert from "../../Utils/alerts";
class TanksHome extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
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
    this._isMounted = true;
    tankURL
      .get("")
      .then((res) => {
        if (res.data.length) {
          this._isMounted && this.setState({ dataArr: res.data });
          console.log(this.state.dataArr);
        } else {
          this._isMounted &&
            this.setState({
              alertdata: {
                data: "Something went wrong.Please try again later",
                color: "rgb(247 86 61)",
              },
            });
        }
      })
      .catch((err) => {
        this._isMounted &&
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
    if (this.state.modalStatus === false) {
    }
  }
  componentWillUnmount() {
    this._isMounted &&
      this.setState({
        collapse: [false, false, false, false, false, false, false],
        dataArr: [],
        alertdata: { data: "", color: "" },
      });
    this._isMounted = false;
  }
  async onCardClick(tNumber) {
    var index = await this.state.dataArr.findIndex((o) =>
      o.tankNo === tNumber ? true : false
    );
    if (index >= 0) {
      tankURL
        .get("")
        .then((res) => {
          if (res.data.length) {
          this._isMounted && this.setState({ dataArr: res.data });
            this._isMounted &&
              this.setState({
                id: this.state.dataArr[index]._id,
                tankName: this.state.dataArr[index].tankNo,
                mmYY: this.state.dataArr[index].mmyy,
                saleStatus: this.state.dataArr[index].saleStatus,
              });
          } else {
            this._isMounted &&
              this.setState({
                alertdata: {
                  data: "Something went wrong.Please try again later",
                  color: "rgb(247 86 61)",
                },
              });
          }
        })
        .catch((err) => {
          this._isMounted &&
            this.setState({
              alertdata: {
                data: "Something went wrong.Please try again later",
                color: "rgb(247 86 61)",
              },
            });
        });
    }
  }
  async addNew() {
    (await this._isMounted) && this.setState({ confirmMsg: "" });
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
            this._isMounted &&
              this.setState({
                dataArr: res.data.data,
                collapse: arr,
              });
          } else {
            this._isMounted &&
              this.setState({
                alertdata: {
                  data: "Culturing already exists.Please try again later",
                  color: "rgb(247 86 61)",
                },
              });
          }
        } else {
          this._isMounted &&
            this.setState({
              alertdata: {
                data: "Something went wrong.Please try again later",
                color: "rgb(247 86 61)",
              },
            });
        }
      })
      .catch((err) => {
        this._isMounted &&
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
    (await this._isMounted) &&
      this.setState({
        id: "",
        tankName: tNumber,
        mmYY: concaStr,
        saleStatus: "",
      });
    const msg1 = "Click YES to start a new culturing in tank - ";
    const msg2 = " from ";
    this._isMounted &&
      this.setState({
        confirmMsg: msg1.concat(this.state.tankName, msg2, this.state.mmYY),
      });
  }
  render() {
    return (
      <div className="cardContainer gridContainer" id="main">
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
          onClick={() => this._isMounted && this.onCardClick("1")}
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
                    (await this._isMounted) && this.setState({ collapse: arr });
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
                        this._isMounted && this.dateFormatChange(newDate, "1")
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
          onClick={() => this._isMounted && this.onCardClick("2")}
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
                    (await this._isMounted) && this.setState({ collapse: arr });
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
                        this._isMounted && this.dateFormatChange(newDate, "2")
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
          onClick={() => this._isMounted && this.onCardClick("3")}
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
                    (await this._isMounted) && this.setState({ collapse: arr });
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
                        this._isMounted && this.dateFormatChange(newDate, "3")
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
          onClick={() => this._isMounted && this.onCardClick("4")}
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
                    (await this._isMounted) && this.setState({ collapse: arr });
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
                        this._isMounted && this.dateFormatChange(newDate, "4")
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
          onClick={() => this._isMounted && this.onCardClick("5")}
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
                    (await this._isMounted) && this.setState({ collapse: arr });
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
                        this._isMounted && this.dateFormatChange(newDate, "5")
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
          onClick={() => this._isMounted && this.onCardClick("6")}
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
                    (await this._isMounted) && this.setState({ collapse: arr });
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
                        this._isMounted && this.dateFormatChange(newDate, "6")
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
          onClick={() => this._isMounted && this.onCardClick("7")}
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
                    (await this._isMounted) && this.setState({ collapse: arr });
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
                        this._isMounted && this.dateFormatChange(newDate, "7")
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
              onClickYes={() => this._isMounted && this.addNew()}
              onCloseBox={() => this.setState({ confirmMsg: "" })}
            />
          </div>
        ) : null}
        <TankModal
          tankID={this.state.tankName}
          mmyy={this.state.mmYY}
          id={this.state.id}
        />
        <div className="alertsDiv">
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

//-----------------------MODAL------------------------------------------- //
const TankModal = (props) => {
  const box = useRef(null);
  let history = useHistory();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [tankData, setTankData] = useState({
    tid: "",
    tname: "",
    tdate: "",
  });
  const [newDate, setNewDate] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");
  useEffect(() => {
    setTankData({ tid: props.id, tname: props.tankID, tdate: props.mmyy });
    return () => {
      setTankData({ tname: "", tdate: "" });
      setNewDate("");
    };
  }, [props]);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setCollapseStatus(false);
        }
      }
      document.addEventListener("click", handleOutsideClick);
      return () => {
        setCollapseStatus(false);
      };
    }, [ref]);
  }
  useOutsideAlerter(box);
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
  const dateFormatChange = (newDate) => {
    var str = newDate;
    var splitString = str.toString().split(" ");
    var month = splitString[1];
    var year = splitString[3];
    var concaStr = month.concat(" ", year);
    setNewDate(concaStr);
    const msg1 = "click YES to change the culturing date in tank - ";
    const msg2 = " from ";
    const msg3 = " to ";
    setConfirmMsg(
      msg1.concat(tankData.tname, msg2, tankData.tdate, msg3, concaStr)
    );
  };
  const addNewDate = () => {
    const obj = { id: tankData.tid, date: newDate };
    tankURL
      .post("/addNewDate", obj)
      .then((res) => {
        if (res.status === 200) {
          setConfirmMsg("");
          setTankData({ ...tankData, tdate: newDate });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="modal fade" tabIndex="-1" id="tankModal">
        <div className="modal-dialog  modal-dialog-centered">
          <div
            className="modal-content"
            style={{ backgroundColor: "#dbe1e6" }}
            ref={box}
          >
            <div className="modal-header text-center">
              <h5 className="modal-title" style={{ width: "100%" }}>
                Tank {tankData.tname}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {confirmMsg !== "" ? (
                <div className="confirmBoxDiv2">
                  <ConfirmBox
                    data={confirmMsg}
                    onClickYes={addNewDate}
                    onCloseBox={() => setConfirmMsg("")}
                  />
                </div>
              ) : null}
              <div className="d-flex flex-row justify-content-center">
                <p style={{ marginRight: "18px", fontWeight: "bolder" }}>
                  {tankData.tdate}
                </p>
                <button
                  className="btn btn-primary shadow"
                  style={{ height: "35px" }}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={() => {
                    setCollapseStatus(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                    style={{ marginBottom: "5px" }}
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </button>
              </div>
              <div
                className={collapseStatus ? "collapse show" : "collapse"}
                id="collapseExample"
              >
                <div className="d-flex justify-content-center">
                  <div style={{ padding: "0px", width: "fit-content" }}>
                    <DatePicker
                      ref={box}
                      closeOnScroll
                      popperClassName="popperDiv2"
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      value={tankData.tdate}
                      popperPlacement="top-start"
                      placeholderText="click to select a date"
                      onChange={(newDate) => dateFormatChange(newDate)}
                    />
                  </div>
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TanksHome;
