const ClosedSale = require("../Modals/ClosedSalesModal");
module.exports.insertTank = async (data) => {
  try {
    const response = await ClosedSale.create(data);
    if (response._id) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return null;
  }
};
module.exports.getTank = async (id) => {
  try {
    let check = await ClosedSale.find({ tankID: id });
    if (check.length) {
      return check;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};
module.exports.deleteTank = async (id) => {
  try {
    let check = await ClosedSale.deleteMany({tankID: id });
    return check;
  } catch (err) {
    return null;
  }
};
