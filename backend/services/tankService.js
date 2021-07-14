const DBmanager = require("../manager/DBmanager");
const ClosedDBmanager = require("../manager/closedSaleDBmanager");
const ObjectId = require("mongodb").ObjectID;
module.exports.getTanks = async () => {
  const response = await DBmanager.getTanks();
  return response;
};
module.exports.checkTank = async (obj) => {
  const response = await DBmanager.findTank(obj);
  return response;
};
module.exports.addTank = async (obj) => {
  const newObj = {
    tankNo: obj.tankNo,
    mmyy: obj.mmyy,
    saleStatus: "active",
    totalKg: 0,
    totalPrice: 0,
  };
  const response = await DBmanager.insert(newObj);
  if (response === true) {
    const res = await DBmanager.getTanks();
    if (res.length) {
      return res;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports.addDate = async (obj) => {
  const id = ObjectId(obj.id);
  const response = await DBmanager.updateDate(id, obj.date);
  return response;
};
module.exports.deleteTank = async (ID) => {
  const id = ObjectId(ID);
  const response = await DBmanager.getById(id);
  if (response) {
    const res = await ClosedDBmanager.getTank(response.id);
    if (!res) {
      let obj = {
        tankID: response.id,
        tankNo: response.tankNo,
        mmyy: response.mmyy,
        sales: [...response.sales],
        saleStatus: "closed",
        totalKg: response.totalKg,
        totalPrice: response.totalPrice,
      };
      const respo = await ClosedDBmanager.insertTank(obj);
      if (respo === true) {
        const result = await DBmanager.deleteTank(response.id);
        if (result === true) {
          return true;
        } else {
          return null;
        }
      }
    } else {
      const result2 = await ClosedDBmanager.deleteTank(id);
      return null;
    }
  } else {
    return null;
  }
  return;
};
