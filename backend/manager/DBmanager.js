const ActiveSale = require("../Modals/ActiveSalesModal");
module.exports.getTanks = async () => {
  try {
    let check = await ActiveSale.find(
      {},
      { sales: 0, totalKg: 0, totalPrice: 0 }
    );
    if (check.length) {
      return check;
    } else return null;
  } catch (err) {
    return null;
  }
};
module.exports.findTank = async (obj) => {
  try {
    let check = await ActiveSale.find({ tankNo: obj.tankNo, mmyy: obj.mmyy });
    if (check.length) {
      return true;
    } else return false;
  } catch (err) {
    return null;
  }
};
module.exports.getById = async (id) => {
  try {
    let check = await ActiveSale.findById(id);
    if (check._id) {
      return check;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};
module.exports.insert = async (data) => {
  try {
    const response = await ActiveSale.create(data);
    if (response._id) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return null;
  }
};
module.exports.updateDate = async (id, date) => {
  try {
    const response = await ActiveSale.updateOne(
      { _id: id },
      { $set: { mmyy: date } }
    );
    if (response.nModified) {
      return true;
    } else return null;
  } catch (err) {
    return null;
  }
};
module.exports.updateOne = async (id, data, totalObj) => {
  try {
    const response = await ActiveSale.updateOne(
      {
        _id: id,
      },
      {
        $push: { sales: [data] },
        $set: { totalKg: totalObj.totalKg, totalPrice: totalObj.totalPrice },
      }
    );
    if (response.nModified) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return null;
  }
};
module.exports.updateEditedOne = async (id, innerID, data) => {
  try {
    const response = await ActiveSale.updateOne(
      { _id: id, "sales._id": innerID },
      {
        $set: {
          "sales.$.name": data.name,
          "sales.$.kg": data.kg,
          "sales.$.cleaning": data.cleaning,
          "sales.$.date": data.date,
          "sales.$.fishType": data.fishType,
          "sales.$.price": data.price,
          "sales.$.balance": data.balance,
          "sales.$.amount": data.amountReciv,
          "sales.$.payType": data.payType,
          "sales.$.payComp": data.payComp,
        },
      }
    );
    if (response.nModified) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return null;
  }
};
module.exports.deleteSale = async (data) => {
  try {
    const response = await ActiveSale.updateOne(
      { _id: data.tankID },
      { $pull: { sales: { _id: data.id } } }
    );
    if (response.nModified) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return null;
  }
};
module.exports.updateTotalValues = async (id, obj) => {
  try {
    const response = await ActiveSale.updateOne(
      { _id: id },
      { $set: { totalKg: obj.totalKg, totalPrice: obj.totalPrice } }
    );
    if (response.nModified) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return null;
  }
};
