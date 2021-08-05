const DBmanager = require("../manager/DBmanager");
const ObjectId = require("mongodb").ObjectID;
module.exports.addSaleAPI = async (saleData) => {
  let obj,
    totalObj = {};
  const idString = saleData.tank_ID; //tank _ID should be passed here
  const id = ObjectId(idString);
  saleData.saleStatus = "active";
  const checkIdRes = await DBmanager.getById(id);
   if (checkIdRes) {
    obj = {
      name: saleData.name,
      fishType: saleData.fishType,
      kg: saleData.kg,
      cleaning: saleData.cleaning,
      date: saleData.date,
      price: saleData.price,
      amount: saleData.amountReciv,
      balance: saleData.balance,
      payType: saleData.payType,
      payComp: saleData.payComp,
    };
    totalObj = {
      totalKg: checkIdRes.totalKg + parseInt(saleData.kg, 10),
      totalPrice: checkIdRes.totalPrice + parseInt(saleData.price, 10),
    };
    const response = await DBmanager.updateOne(id, obj, totalObj);
    return response;
  } else {
    return null
  }
};
module.exports.editedSaleAPI = async (data) => {
  const id = ObjectId(data.tank_ID);
  const innerID = ObjectId(data.tank_id);
  const response = await DBmanager.updateEditedOne(id, innerID, data);
  if (response === true) {
    const res = await setTotalValues(id);
    if (res === true || res === false) {
      return true;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports.deleteSaleAPI = async (data) => {
  const obj = {
    id: ObjectId(data.id),
    tankID: ObjectId(data.tankID),
  };
  const response = await DBmanager.deleteSale(obj);
  if (response === true) {
    const res = await setTotalValues(obj.tankID);
    if (res === true || res === false) {
      return true;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports.getCurrentSales = async (data) => {
  const idString = data.ID;
  const id = ObjectId(idString);
  let response = await DBmanager.getById(id);
  return response;
};
module.exports.getFilteredSales = async (data) => {
  const response = await DBmanager.getById(data.tankID);
  if (response) {
    let newObj = {};
    const filteredSales = response.sales.filter(function (f) {
      for (const [key, value] of Object.entries(data)) {
        if (value && key !== "tankID") {
          newObj[key] = value;
        }
      }
      if (newObj.payComp) {
        newObj.payComp = /true/i.test(newObj.payComp);
      }
      return Object.keys(newObj).every((key) => f[key] === newObj[key]);
    });
    if (filteredSales.length) {
      return filteredSales;
    } else {
      return null;
    }
  } else return null;
};
async function setTotalValues(id) {
  const allSales = await DBmanager.getById(id);
  if (allSales) {
    var totalKg = allSales.sales.reduce(function (total, currentValue) {
      return parseInt(total, 10) + parseInt(currentValue.kg, 10);
    }, 0);
    var totalPrice = allSales.sales.reduce(function (total, currentValue) {
      return parseInt(total, 10) + parseInt(currentValue.price, 10);
    }, 0);
    const obj = {
      totalKg: totalKg,
      totalPrice: totalPrice,
    };
    const response = await DBmanager.updateTotalValues(id, obj);
    return response;
  }
}
