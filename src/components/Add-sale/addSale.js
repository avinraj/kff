import React, { useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import "./addSale.css";
import fishData from "../../Data/fishData";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import API from "../../Utils/salesbaseUrl";
import Alert from "../../Utils/alerts";
import { useHistory } from "react-router-dom";
const AddSale = (props) => {
  let history = useHistory();
  let dropDownListObj;
  let editMode = false;
  if (Object.entries(props.location.state.data).length === 0) {
    editMode = false;
  } else {
    editMode = true;
  }
  const { id, mmyy } = useParams();
  console.log(props.location.state.data, "PROPS DATA");
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  const [alertData, setalertData] = useState({
    data: "",
    color: "",
  });
  const setAlert = (msg, color) => {
    setalertData({ ...alertData, data: msg, color: color });
  };

  const [saleData, setSaleData] = useState({
    kg: props.location.state.data.kg ? props.location.state.data.kg : "1",
    cleaning: props.location.state.data.cleaning
      ? props.location.state.data.cleaning
      : false,
    name: props.location.state.data.name ? props.location.state.data.name : "",
    date: props.location.state.data.date
      ? new Date(props.location.state.data.date)
      : new Date(),
    fishType: props.location.state.data.fishType
      ? props.location.state.data.fishType
      : "",
    price: props.location.state.data.price
      ? props.location.state.data.price
      : "",
    balance: props.location.state.data.balance
      ? props.location.state.data.balance
      : "",
    amountReciv: props.location.state.data.amountReciv
      ? props.location.state.data.amountReciv
      : "",
    payType: props.location.state.data.payType
      ? props.location.state.data.payType
      : "cash",
    payComp: props.location.state.data.payComp
      ? props.location.state.data.payComp
      : false,
    tankID: id,
    mmyy: mmyy,
    tank_id: props.location.state.data._id ? props.location.state.data._id : "",
    tank_ID: props.location.state.data.tankID ? props.location.state.data.tankID : ""
  });
  useEffect(() => {
    function setRadioButtons() {
      if(editMode){
        document.getElementById(props.location.state.data.payType).checked = true
        document.getElementById(props.location.state.data.payComp).checked = true
      }
      else{
       document.getElementById("cash").checked = true
       document.getElementById("false").checked = true
      }
    }
    setRadioButtons()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
  const [errors, setErrors] = useState({
    kgError: "",
    amountError: "",
  });
  const checkErrro = (name, value) => {
    switch (name) {
      case "kgError":
        errors.kgError = value.length === 0 ? "Enter No. of kg" : "";
        break;
      case "amountError":
        errors.amountError = value.length === 0 ? "Enter the amount" : "";
        break;
      default:
        break;
    }
  };

  const setKgValue = (kgValue, priceValue, balanceValue) => {
    setSaleData({
      ...saleData,
      kg: kgValue,
      price: priceValue,
      balance: balanceValue,
    });
  };
  const setNameValue = (value) => {
    setSaleData({ ...saleData, name: value });
  };
  const setFishtypePriceValue = (cleaningValue, fishTypeValue, priceValue) => {
    const data = priceValue.toString();
    setSaleData({
      ...saleData,
      cleaning: cleaningValue,
      fishType: fishTypeValue,
      price: data,
    });
  };
  const setAmountBalanceValue = (amountValue, balanceValue) => {
    setSaleData({
      ...saleData,
      amountReciv: amountValue,
      balance: balanceValue,
    });
  };
  const setNewAmountBalancePriceValue = (
    cleaningValue,
    fishTypeValue,
    priceValue,
    amountValue,
    balanceValue
  ) => {
    const data = priceValue.toString();
    setSaleData({
      ...saleData,
      cleaning: cleaningValue,
      fishType: fishTypeValue,
      price: data,
      amountReciv: amountValue,
      balance: balanceValue,
    });
  };
  const setPaytypeValue = (value) => {
    setSaleData({ ...saleData, payType: value });
  };
  const setPayCompValue = (value) => {
    if (value === "true") {
      setSaleData({ ...saleData, payComp: true });
    } else {
      setSaleData({ ...saleData, payComp: false });
    }
  };
  const clearSaleData = () => {
    dropDownListObj.value = null;
    setSaleData({
      ...saleData,
      kg: props.location.state.data.kg ? props.location.state.data.kg : "1",
      cleaning: props.location.state.data.cleaning
        ? props.location.state.data.cleaning
        : false,
      name: props.location.state.data.name
        ? props.location.state.data.name
        : "",
      date: props.location.state.data.date
        ? new Date(props.location.state.data.date)
        : new Date(),
      fishType: props.location.state.data.fishType
        ? props.location.state.data.fishType
        : "",
      price: props.location.state.data.price
        ? props.location.state.data.price
        : "",
      balance: props.location.state.data.balance
        ? props.location.state.data.balance
        : "",
      amountReciv: props.location.state.data.amountReciv
        ? props.location.state.data.amountReciv
        : "",
      payType: props.location.state.data.payType
        ? props.location.state.data.payType
        : saleData.payType,
      payComp: props.location.state.data.payComp
        ? props.location.state.data.payComp
        : saleData.payComp,
    });
    if (editMode) {
      document.getElementById(props.location.state.data.payType).checked = true;
      document.getElementById(props.location.state.data.payComp).checked = true;
      document.getElementById(props.location.state.data.fishType).selected = true;
    }
  };
  const handleChange = (e) => {
    console.log(e.target);
    if (e.target.id === "newSaleFormInput1") {
      checkErrro("kgError", e.target.value);
      if (saleData.fishType || saleData.amountReciv) {
        const obj = fishData.find((n) => n.fishType === saleData.fishType);
        if (saleData.fishType) {
          const Kg = Number(e.target.value);
          const KgPrice = Kg * obj.price;
          const KgCleaning = Kg * obj.cleaning;
          const price = KgPrice + KgCleaning;
          if (saleData.cleaning) {
            setKgValue(e.target.value, price, saleData.amountReciv - price);
          } else {
            setKgValue(e.target.value, KgPrice, saleData.amountReciv - KgPrice);
          }
        } else {
          setKgValue(e.target.value, "", "");
        }
      } else {
        setKgValue(e.target.value, "", "");
      }
    }
    if (e.target.id === "newSaleFormInput2") {
      setNameValue(e.target.value);
    }
    if (e.target.id === "flexCheckIndeterminate") {
      if (e.target.value === "true") {
        if (saleData.fishType) {
          const obj = fishData.find((n) => n.fishType === saleData.fishType);
          const Kg = Number(saleData.kg);
          const KgPrice = Kg * obj.price;
          setNewAmountBalancePriceValue(
            false,
            saleData.fishType,
            KgPrice,
            saleData.amountReciv,
            saleData.amountReciv - KgPrice
          );
        } else {
          setFishtypePriceValue(false, "", "");
        }
      }
      if (e.target.value === "false") {
        if (saleData.fishType) {
          const obj = fishData.find((n) => n.fishType === saleData.fishType);
          const Kg = Number(saleData.kg);
          const KgPrice = Kg * obj.price;
          const KgCleaning = Kg * obj.cleaning;
          const price = KgPrice + KgCleaning;
          setNewAmountBalancePriceValue(
            true,
            saleData.fishType,
            price,
            saleData.amountReciv,
            saleData.amountReciv - price
          );
        } else {
          setFishtypePriceValue(true, "", "");
        }
      }
    }
    if (e.target.id === "inputGroupSelect01") {
      if (e.target.value === "Choose..." || null) {
        setNewAmountBalancePriceValue(false, "", "", "", "");
      } else {
        const Kg = Number(saleData.kg);
        const obj = fishData.find((n) => n.fishType === e.target.value);
        const KgPrice = Kg * obj.price;
        const KgCleaning = Kg * obj.cleaning;
        if (saleData.cleaning === true) {
          const price = KgPrice + KgCleaning;
          if (saleData.amountReciv) {
            setNewAmountBalancePriceValue(
              true,
              e.target.value,
              price,
              saleData.amountReciv,
              saleData.amountReciv - price
            );
          } else {
            setFishtypePriceValue(true, e.target.value, price);
          }
        }
        if (saleData.cleaning === false) {
          if (saleData.amountReciv) {
            setNewAmountBalancePriceValue(
              false,
              e.target.value,
              KgPrice,
              saleData.amountReciv,
              saleData.amountReciv - KgPrice
            );
          } else {
            setFishtypePriceValue(false, e.target.value, KgPrice);
          }
        }
      }
    }
    if (e.target.id === "newSaleFormInput4") {
      checkErrro("amountError", e.target.value);
      setAmountBalanceValue(e.target.value, e.target.value - saleData.price);
    }
    if (e.target.name === "flexRadioDefault") {
      setPaytypeValue(e.target.value);
    }
    if (e.target.name === "flexRadioDefault2") {
      setPayCompValue(e.target.value);
    }
  };
  const saleSubmit = () => {
    console.log(saleData);
    if (
      validateForm(errors) &&
      saleData.fishType !== "" &&
      saleData.amountReciv !== ""
    ) {
      API.post("addSale", saleData).then((res) => {
        console.log(res);
        if (res.status === 200) {
          const alertMsg = {
            mesg: "Sales added successfully",
            color: "#0aab52",
          };
          clearSaleData();
          setAlert(alertMsg.mesg, alertMsg.color);
        } else {
          clearSaleData();
          const alertMsg = {
            mesg: "Sales adding failed. Try Again",
            color: "#e21935",
          };
          setAlert(alertMsg.mesg, alertMsg.color);
        }
      });
    } else {
      clearSaleData();
      const alertMsg = {
        mesg: "Sales adding failed. Try Again",
        color: "#e21935",
      };
      setAlert(alertMsg.mesg, alertMsg.color);
    }
  };
  const editedSaleSubmit = () =>{
    if (
      validateForm(errors) &&
      saleData.fishType !== "" &&
      saleData.amountReciv !== ""
    ) {
      API.put("addSale",saleData).then((res)=>{
        console.log(res)
       if(res.status === 200){
          history.push({
            pathname: `/Current-Sales/${saleData.tankID}/${saleData.mmyy}`
            
          })
       } else {
        clearSaleData();
        const alertMsg = {
          mesg: "No Changes Applied.",
          color: "#e21935",
        };
        setAlert(alertMsg.mesg, alertMsg.color);
      }
      })
    }
    else {
      clearSaleData();
      const alertMsg = {
        mesg: "Sales adding failed. Try Again",
        color: "#e21935",
      };
      setAlert(alertMsg.mesg, alertMsg.color);
    }
  }
  console.log(saleData, "SALEDATA");
  return (
    <div className="AddSaleContainer form shadow-lg">
      <div>
        <Alert
          data={alertData}
          onAlertClose={() => {
            setalertData({ ...alertData, data: "", color: "" });
            clearSaleData();
          }}
        />
      </div>
      <div
        className="d-flex align-items-center"
        style={{ marginBottom: "10px" }}
      >
        <label htmlFor="newSaleFormInput1" className="form-label kgLabel1">
          No. of kg :
        </label>
        <input
          type="number"
          className="form-control kgInput"
          id="newSaleFormInput1"
          value={saleData.kg}
          onChange={handleChange}
          formNoValidate
        ></input>
        <label htmlFor="newSaleFormInput1" className="form-label kgLabel2">
          kg
        </label>
        <label
          className="form-check-label cleaningLabel"
          htmlFor="flexCheckIndeterminate"
        >
          Cleaning
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          value={saleData.cleaning}
          id="flexCheckIndeterminate"
          checked={saleData.cleaning ? true : false}
          onChange={handleChange}
        ></input>
      </div>
      <div className="d-flex">
        <span className="errorKg">{errors.kgError}</span>
      </div>
      <div
        className="d-flex align-items-center nameFlex"
        style={{ marginBottom: "10px" }}
      >
        <label htmlFor="newSaleFormInput2" className="form-label nameLabel">
          Name :
        </label>
        <input
          type="text"
          className="form-control nameInput"
          id="newSaleFormInput2"
          value={saleData.name}
          onChange={handleChange}
        ></input>
      </div>
      <div className="d-flex dateFlex" style={{ marginBottom: "10px" }}>
        <label className="form-label dateLabel">Date :</label>
        <DatePicker
          selected={saleData.date}
          onChange={(newDate) => setSaleData({ ...saleData, date: newDate })}
        />
      </div>
      <div className="form-check d-flex justify-content-start selectOptions">
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Type of fish
          </label>
          <select
            ref={(scope) => {
              dropDownListObj = scope;
            }}
            className="form-select"
            id="inputGroupSelect01"
            onChange={handleChange}
          >
            <option>Choose...</option>
            {fishData.map(({ fishType }, index) => (
              <option
              id={fishType}
                key={index}
                value={fishType}
                selected={saleData.fishType === fishType ? true : false}
              >
                {fishType}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center priceFlex">
        <label htmlFor="newSaleFormInput3" className="form-label priceLabel1">
          price : {saleData.price} ₹
        </label>
        <label htmlFor="newSaleFormlabel1" className="form-label balanceLabel ">
          Balance : {saleData.balance}.₹
        </label>
      </div>
      <div
        className="d-flex flex-row align-items-center amountFlex"
        style={{ marginBottom: "10px" }}
      >
        <label htmlFor="newSaleFormInput4" className="form-label amountLabel1">
          Amount Recieved :
        </label>
        <input
          type="number"
          className="form-control amountInput"
          id="newSaleFormInput4"
          value={saleData.amountReciv}
          onChange={handleChange}
        ></input>
        <label htmlFor="newSaleFormInput4" className="form-label amountLabel2">
          Rs.
        </label>
      </div>
      <div className="d-flex">
        <span className="errorAmount">{errors.amountError}</span>
      </div>
      <div className="d-flex " style={{ marginBottom: "10px" }}>
        <label className="form-label typePayLabel">Type of payement :</label>
        <div className="form-check">
          <input
            className="form-check-input"
            style={{ marginLeft: "1px" }}
            type="radio"
            name="flexRadioDefault"
            id="cash"
            // defaultChecked={saleData.payType === "cash" ? true: false}
            value="cash"
            onClick={handleChange}
          />
          <label className="form-check-label" htmlFor="cash">
            Cash
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            style={{ marginLeft: "1px" }}
            type="radio"
            name="flexRadioDefault"
            id="Gpay"
            value="Gpay"
            // defaultChecked={saleData.payType === "Gpay" ? true : false}
            onClick={handleChange}
          />
          <label className="form-check-label" htmlFor="Gpay">
            G-pay
          </label>
        </div>
      </div>
      <div className="d-flex " style={{ marginBottom: "10px" }}>
        <label className="form-label payConfirmLabel">
          Payement Completed :
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            style={{ marginLeft: "1px" }}
            type="radio"
            name="flexRadioDefault2"
            id="true"
            value={true}
            // defaultChecked={saleData.payComp === true ? true : false}
            onClick={handleChange}
          />
          <label className="form-check-label" htmlFor="true">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            style={{ marginLeft: "1px" }}
            type="radio"
            name="flexRadioDefault2"
            id="false"
            // defaultChecked={saleData.payComp === false ? true : false}
            value={false}
            onClick={handleChange}
          />
          <label className="form-check-label" htmlFor="false">
            No
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <div style={{ display: editMode ? "none" : "contents" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={saleSubmit}
          >
            ADD
          </button>
        </div>
        <div style={{ display: editMode ? "none" : "contents" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearSaleData}
          >
            CLEAR
          </button>
        </div>
        <div style={{ display: editMode ? "contents" : "none" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={editedSaleSubmit}
          >
            SAVE
          </button>
        </div>
        <div style={{ display: editMode ? "contents" : "none" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearSaleData}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddSale;
