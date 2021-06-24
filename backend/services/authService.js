const authManager = require("../manager/authManager");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const ObjectId = require("mongodb").ObjectID;
module.exports.loginAPI = async (data) => {
  const response = await authManager.checkLogin(data);
  console.log(response, "RESPONSE");
  if (Array.isArray(response)) {
    if (response.length === 1) {
      const res = await comparePsswdFunc(data.password, response);
      console.log(res, "RES");
      return res;
    }
  } else {
    return null;
  }
};
async function comparePsswdFunc(psswd, data) {
  try {
    const result = await bcrypt.compare(psswd, data[0].password);
    console.log(result);
    if (result === false) {
      return null;
    }
    if (result === true) {
      return data;
    }
  } catch (err) {
    return null;
  }
}
// async function hashPsswdFunc(psswd, id){
//  const hashedPsswd = await bcrypt.hash(psswd, 12)
//  const idString = id
//                 const obj = {
//                    id: ObjectId(idString),
//                    password: hashedPsswd,
//                  };
//                 const result2 = await authManager.hashPsswd(obj)
//                    return result2;
// }
