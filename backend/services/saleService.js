const DBmanager = require("../manager/DBmanager");
const ObjectId = require("mongodb").ObjectID;

module.exports.addSaleAPI = async (saleData) => {
  let obj = {};
  const idString = "60aa744e6a29ec1f1bd8c907"; // _id should be passed here
  const id = ObjectId(idString);
  saleData.saleStatus = "active";
  const checkIdRes = await DBmanager.findByID(id);
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
    const response = await DBmanager.updateOne(id, obj);
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
    };

    const response = await DBmanager.insert(obj);
    return response;
  }

  // return DBmanager.saleInsert(saleData);
};
