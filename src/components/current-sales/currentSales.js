import React, { useState, useEffect } from "react";
import "./currentSale.css";
import { useParams,useHistory } from "react-router-dom";
import { saleURL,tankURL } from "../../Utils/baseUrl";
import Alert from "../../Utils/alerts";
import ConfirmBox from "../../Utils/confirmBox";
import fishData from "../../Data/fishData";
import ViewSale from "../view-Sale/viewSale";
const CurrentSale = () => {
  const { ID } = useParams();
  let history = useHistory();
  let _isMounted = true;
  const [selectedSale, setSelectedSale] = useState({});
  const [filter, setFilter] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [alertData, setalertData] = useState({
    data: "",
    color: "",
  });
  const [saleData, setSaleData] = useState([]);
  const [filters, setFilters] = useState({
    tankID: "",
    name: "",
    fishType: "",
    payComp: "",
    payType: "",
  });
  const setData = (data) => {
    _isMounted && setSaleData(data);
  };
  const setAlert = (msg, color) => {
    _isMounted && setalertData({ ...alertData, data: msg, color: color });
  };
  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 800 ? true : false,
  });
  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 800px)");
    mediaQuery.addEventListener(setMQuery, null);
    return () => {
      mediaQuery.removeEventListener(setMQuery, null);
    };
  }, [mQuery.matches]);
  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      saleURL
        .post("currentSales", { ID })
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
            console.log(res.data);
            _isMounted && setFilters({ ...filters, tankID: res.data._id });
          } else {
            setAlert(
              "Something went wrong.Please try again later ",
              "rgb(247 86 61)"
            );
          }
        })
        .catch((err) =>
          setAlert(
            "Something went wrong.Please try again later ",
            "rgb(247 86 61)"
          )
        );
      return () => {
        _isMounted = false;
        setSelectedSale(null);
        setFilter(null);
        setalertData(null);
        setSaleData(null);
        setFilters(null);
        setConfirmMsg("");
      };
    }
    _isMounted && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSale]);
  useEffect(() => {
    const fetchFilterData = () => {
      saleURL
        .post("filter", filters)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status) {
              _isMounted &&
                setSaleData({ ...saleData, sales: res.data.response });
            } else {
              _isMounted && setSaleData({ ...saleData, sales: [] });
            }
          }
          if (res.status === 201) {
            _isMounted && setSaleData(res.data);
          }
        })
        .catch((err) =>
          setAlert(
            "Something went wrong.Please try again later ",
            "rgb(247 86 61)"
          )
        );
    };
    fetchFilterData();
    return () => {
      _isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
  async function handleFilterChange(e) {
    if (e.target.id === "name") {
      await setFilters({ ...filters, name: e.target.value });
    }
    if (e.target.id === "fishType") {
      if (e.target.value === "Choose...") {
        (await _isMounted) && setFilters({ ...filters, fishType: "" });
      } else {
        (await _isMounted) &&
          setFilters({ ...filters, fishType: e.target.value });
      }
    }
    if (e.target.id === "payComp") {
      if (e.target.value === "Choose...") {
        (await _isMounted) && setFilters({ ...filters, payComp: "" });
      } else {
        (await _isMounted) &&
          setFilters({ ...filters, payComp: e.target.value });
      }
    }
    if (e.target.id === "payType") {
      if (e.target.value === "Choose...") {
        (await _isMounted) && setFilters({ ...filters, payType: "" });
      } else {
        (await _isMounted) &&
          setFilters({ ...filters, payType: e.target.value });
      }
    }
  }
  async function onCloseSale() {
    const msg = "click Yes to close the sales in tank - ";
    setConfirmMsg(msg.concat(saleData.tankNo));
  }
  async function removeSale() {
tankURL.delete(`/${saleData._id}`)
.then((res) =>{
  console.log(res);
  if(res.status === 200){
history.push({pathname: `/`});
  }else{
    setConfirmMsg("");
  }
})
.catch((err)=>{
  setAlert(
    "Something went wrong.Please try again later ",
    "rgb(247 86 61)"
  )
})
  }
  async function onClickSelectedSale(data) {
    let obj = {
      amountReciv: data.amount,
      balance: data.balance,
      cleaning: data.cleaning,
      date: data.date,
      fishType: data.fishType,
      kg: data.kg,
      name: data.name,
      payComp: data.payComp,
      payType: data.payType,
      price: data.price,
      _id: data._id,
      tankID: saleData._id,
      tankNo: saleData.tankNo,
      mmyy: saleData.mmyy,
    };
    (await _isMounted) && setSelectedSale(obj);
  }
  if (saleData.sales) {
    return (
      <div className="mainCurrentSaleDiv">
        {confirmMsg !== "" ? (
          <div className="confirmBoxDiv3">
            <ConfirmBox
              data={confirmMsg}
              onClickYes={() =>  removeSale()}
              onCloseBox={() => setConfirmMsg("")}
            />
          </div>
        ) : null}
        <div
          className="saleCloseDiv"
          style={{
            position: "fixed",
            right: "0%",
            bottom: "50%",
            display: confirmMsg !=="" ? "none" : "block",
          }}
        >
          <button
            className="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            {mQuery.matches ? (
              "close sale"
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
            )}
          </button>
          <div
            className="offcanvas offcanvas-end deleteCanvas"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
            style={{ backgroundColor: "#212529" }}
          >
            <div className="offcanvas-body">
              <p style={{ color: "whitesmoke" }}>
                Do you want to close this sale?
              </p>
              <div className="d-flex justify-content-evenly">
                <button
                  className="btn btn-primary"
                  data-bs-dismiss="offcanvas"
                  onClick={_isMounted && onCloseSale}
                >
                  Yes
                </button>
                <button
                  className="btn btn-secondary"
                  data-bs-dismiss="offcanvas"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="totalDiv d-flex flex-row-reverse">
          <h5>
            Total:{" "}
            <span className="badge bg-success" style={{ marginRight: "11px" }}>
              {saleData.totalKg} Kg
            </span>
            <span className="badge bg-success">{saleData.totalPrice} ₹</span>
          </h5>
        </div>
        <div className="headingDiv d-flex justify-content-between">
          <h4>
            Tank :<span className="badge bg-secondary">{saleData.tankNo}</span>
          </h4>
          <h4>
            From :<span className="badge bg-secondary">{saleData.mmyy}</span>
          </h4>
        </div>
        <div className="tableDiv table-responsive shadow-lg">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th style={{ minWidth: "40px" }}>
                  <div style={{ display: filter ? "contents" : "none" }}>
                    <span
                      className="badge bg-secondary"
                      style={{
                        marginTop: "-50px",
                        position: "absolute",
                        marginLeft: "-14px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                        onClick={() => {
                          _isMounted && setFilter(false);
                          _isMounted &&
                            setFilters({
                              ...filters,
                              name: "",
                              fishType: "",
                              payComp: "",
                              payType: "",
                            });
                          document.getElementById("fishType", "payComp").value =
                            "Choose...";
                          document.getElementById("payComp").value =
                            "Choose...";
                          document.getElementById("payType").value =
                            "Choose...";
                        }}
                      >
                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                      </svg>
                    </span>
                  </div>
                  <div style={{ display: filter ? "none" : "contents" }}>
                    <span
                      className="badge bg-secondary"
                      style={{
                        marginTop: "-50px",
                        position: "absolute",
                        marginLeft: "-14px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-funnel-fill"
                        viewBox="0 0 16 16"
                        onClick={() => {
                          _isMounted && setFilter(true);
                        }}
                      >
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                      </svg>
                    </span>
                  </div>
                </th>
                <th scope="col" style={{ minWidth: "140px" }}>
                  <div style={{ display: filter ? "contents" : "none" }}>
                    <input
                      type="text"
                      placeholder="Name"
                      id="name"
                      value={filters.name}
                      onChange={_isMounted && handleFilterChange}
                      style={{
                        maxWidth: "110px",
                        borderRadius: "5px",
                        textAlign: "center",
                      }}
                    />
                  </div>
                  <br />
                  Name
                </th>
                <th scope="col" style={{ minWidth: "50px" }}>
                  Kg
                </th>
                <th scope="col" style={{ minWidth: "140px" }}>
                  <div style={{ display: filter ? "contents" : "none" }}>
                    <select
                      id="fishType"
                      onChange={_isMounted && handleFilterChange}
                      className="selectFilter"
                    >
                      <option>Choose...</option>
                      {fishData.map(({ fishType }, index) => (
                        <option key={index} value={fishType}>
                          {fishType}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                  Fish Name
                </th>
                <th scope="col" style={{ minWidth: "140px" }}>
                  Price
                </th>
                <th scope="col" style={{ minWidth: "140px" }}>
                  Date
                </th>
                <th scope="col" style={{ minWidth: "145px" }}>
                  <div style={{ display: filter ? "contents" : "none" }}>
                    <select
                      id="payComp"
                      onChange={_isMounted && handleFilterChange}
                      className="selectFilter"
                    >
                      <option>Choose...</option>
                      <option value="true">Completed</option>
                      <option value="false">Not completed</option>
                    </select>
                  </div>
                  <br />
                  Payement status
                </th>
                <th scope="col" style={{ minWidth: "140px" }}>
                  <div style={{ display: filter ? "contents" : "none" }}>
                    <select
                      id="payType"
                      onChange={_isMounted && handleFilterChange}
                      className="selectFilter"
                    >
                      <option>Choose...</option>
                      <option value="cash">Cash</option>
                      <option value="Gpay">G-pay</option>
                    </select>
                  </div>
                  <br />
                  Payement Type
                </th>
              </tr>
            </thead>
            <tbody
              style={{ display: saleData.sales.length ? "none" : "contents" }}
            >
              <tr>
                <th colSpan="8" style={{ borderBottom: "none" }}>
                  No Contents to show{" "}
                </th>
              </tr>
            </tbody>
            <tbody
              style={{ display: saleData.sales.length ? "contents" : "none" }}
            >
              {saleData.sales.map(
                (
                  { name, kg, fishType, price, date, payComp, payType },
                  index
                ) => (
                  <tr
                    key={index}
                    onClick={() => {
                      _isMounted && onClickSelectedSale(saleData.sales[index]);
                    }}
                  >
                    <th
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    ></th>
                    <th
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    >
                      {name}
                    </th>
                    <th
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    >
                      {kg}
                    </th>
                    <th
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    >
                      {fishType}
                    </th>
                    <th
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    >
                      {price}
                    </th>
                    <th
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                      className="date"
                    >
                      {date.slice(0, 10)}
                    </th>
                    <th
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    >
                      {payComp ? "Completed" : "Not Completed"}
                    </th>
                    <th
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    >
                      {payType}
                    </th>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <ViewSale
            data={selectedSale}
            onoffCanvasClose={() => {
              _isMounted && setSelectedSale({});
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="alertDiv">
        <Alert
          data={alertData}
          onAlertClose={() => {
            _isMounted && setalertData({ ...alertData, data: "", color: "" });
          }}
        />
      </div>
    );
  }
};
export default CurrentSale;
