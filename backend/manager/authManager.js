const LoginData = require("../Modals/LoginDataModal");
module.exports.checkLogin = async (data) => {
  try {
    let check = await LoginData.find({
      email: data.email
    });
    if (check.length) {
      return check;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};
module.exports.hashPsswd = async (obj) => {
  try {
    let response = await LoginData.updateOne(
      { _id: obj.id },
      { $set: { password: obj.password } }
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
