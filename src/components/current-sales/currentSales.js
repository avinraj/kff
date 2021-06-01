import React, { useState, useEffect } from "react";
import "./currentSale.css";
import { useParams } from "react-router-dom";
import API from "../../Utils/salesbaseUrl";
import Alert from "../../Utils/alerts";
import fishData from "../../Data/fishData";
import ViewSale from "../view-Sale/viewSale";
const CurrentSale = () => {
  const { id, mmyy } = useParams();
  const [selectedSale, setSelectedSale] = useState({});
  const [filter, setFilter] = useState(false);
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
    setSaleData(data);
  };
  const setAlert = (msg, color) => {
    setalertData({ ...alertData, data: msg, color: color });
  };
  useEffect(() => {
    async function fetchData() {
      API.post("currentSales", { id, mmyy })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setData(res.data);
            setFilters({ ...filters, tankID: res.data._id });
          } else {
            setAlert("Something went wrong.Please try again later ", "#e21935");
          }
        })
        .catch((err) =>
          setAlert("Something went wrong.Please try again later ", "#e21935")
        );
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const fetchFilterData = () => {
      API.post("filter", filters)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.status) {
              setSaleData({ ...saleData, sales: res.data.response });
            } else {
              setSaleData({ ...saleData, sales: [] });
            }
          }
          if (res.status === 201) {
            setSaleData(res.data);
          }
        })
        .catch((err) =>
          setAlert("Something went wrong.Please try again later ", "#e21935")
        );
    };
    fetchFilterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  async function handleFilterChange(e) {
    console.log(e.target.value);
    if (e.target.id === "name") {
      await setFilters({ ...filters, name: e.target.value });
    }
    if (e.target.id === "fishType") {
      if (e.target.value === "Choose...") {
        await setFilters({ ...filters, fishType: "" });
      } else {
        await setFilters({ ...filters, fishType: e.target.value });
      }
    }
    if (e.target.id === "payComp") {
      if (e.target.value === "Choose...") {
        await setFilters({ ...filters, payComp: "" });
      } else {
        await setFilters({ ...filters, payComp: e.target.value });
      }
    }
    if (e.target.id === "payType") {
      if (e.target.value === "Choose...") {
        await setFilters({ ...filters, payType: "" });
      } else {
        await setFilters({ ...filters, payType: e.target.value });
      }
    }
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
   await setSelectedSale(obj);
  }
  console.log(filters);
  if (saleData.sales) {
    return (
      <div className="mainCurrentSaleDiv">
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
                          setFilter(false);
                          setFilters({
                            ...filters,
                            name: "",
                            fishType: "",
                            payComp: "",
                            payType: "",
                          });
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
                          setFilter(true);
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
                      onChange={handleFilterChange}
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
                      onChange={handleFilterChange}
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
                      onChange={handleFilterChange}
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
                      onChange={handleFilterChange}
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
                      onClickSelectedSale(saleData.sales[index]);
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
          <ViewSale data={selectedSale} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="alertDiv">
        <Alert
          data={alertData}
          onAlertClose={() => {
            setalertData({ ...alertData, data: "", color: "" });
          }}
        />
      </div>
    );
  }
};
export default CurrentSale;
