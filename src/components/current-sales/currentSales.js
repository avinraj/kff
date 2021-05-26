import React, { useState, useEffect } from "react";
import "./currentSale.css";
import { useParams } from "react-router-dom";
import API from "../../Utils/salesbaseUrl";
import Alert from "../../Utils/alerts";
const CurrentSale = () => {
  const { id, mmyy } = useParams();
  const [alertData, setalertData] = useState({
    data: "",
    color: "",
  });
  const [saleData, setSaleData] = useState([]);
  const setData = (data) => {
    setSaleData(data);
  };
  const setAlert = (msg, color) => {
    setalertData({ ...alertData, data: msg, color: color });
  };
  // useEffect(() => {
  //   async function fetchData() {
  //     console.log(id, mmyy);
  //     const { data } = await API.post("currentSales", { id, mmyy });
  //     setSaleData(data);
  //   }
  //   fetchData();
  // }, []);
  useEffect(() => {
    async function fetchData() {
      API.post("currentSales", { id, mmyy }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setData(res.data);
        } else {
          setAlert("Something went wrong.Please try again later ", "#e21935");
        }
      });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(saleData);
  if (saleData.sales) {
    return (
      <div className="mainCurrentSaleDiv" >
        <div className="headingDiv d-flex justify-content-between" >
          <h4>
            Tank :<span class="badge bg-secondary">{saleData.tankNo}</span>
          </h4>
          <h4>
          From :<span class="badge bg-secondary">{saleData.mmyy}</span>
          </h4>
        </div>
        <div className="tableDiv table-responsive shadow-lg">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Kg</th>
                <th scope="col">Fish Name</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
                <th scope="col">Payement status</th>
                <th scope="col">Payement Type</th>
              </tr>
            </thead>
            <tbody>
              {saleData.sales.map(
                (
                  { name, kg, fishType, price, date, payComp, payType },
                  index
                ) => (
                  <tr
                    key={index}
                    onClick={() => {
                      console.log(index);
                    }}
                  >
                    <th>{name}</th>
                    <th>{kg}</th>
                    <th>{fishType}</th>
                    <th>{price}</th>
                    <th className="date">{date.slice(0, 10)}</th>
                    <th>{payComp ? "Yes" : "No"}</th>
                    <th>{payType}</th>
                  </tr>
                )
              )}
            </tbody>
          </table>
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
