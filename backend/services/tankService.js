const DBmanager = require("../manager/DBmanager");
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
    totalPrice: 0
  };
  const response = await DBmanager.insert(newObj);
  if(response === true){
      const res = await DBmanager.getTanks();
      if(res.length){return res}else {return null}
  }else {return null}
};
