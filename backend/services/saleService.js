const DBmanager = require("../manager/DBmanager");
const ObjectId = require("mongodb").ObjectID;
module.exports.addSaleAPI = async (saleData) => {
  let obj, totalObj = {};
  const idString = "60b35485ee39df20d7fa403f"; // _id should be passed here
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
      totalKg : checkIdRes.totalKg + parseInt(saleData.kg,10),
      totalPrice: checkIdRes.totalPrice + parseInt(saleData.price,10)
    }
    const response = await DBmanager.updateOne(id, obj, totalObj);
    return response;
  } else {
    obj = {
      tankNo: saleData.tankID,
      mmyy: saleData.mmyy,
      sales: [
        {
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
        },
      ],
      saleStatus: saleData.saleStatus,
      totalKg: parseInt(saleData.kg,10),
      totalPrice: parseInt(saleData.price,10)
    };
    const response = await DBmanager.insert(obj);
    return response;
  }
};
module.exports.getCurrentSales = async (data) => {
  const idString = "60b35485ee39df20d7fa403f";
  const id = ObjectId(idString);
  const response = await DBmanager.getById(id);
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
      console.log(newObj);
      return Object.keys(newObj).every((key) => f[key] === newObj[key]);
    });
    if (filteredSales.length) {
      return filteredSales;
    } else {
      return null;
    }
  } else return null;
};
