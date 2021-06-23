const authManager = require("../manager/authManager");
module.exports.loginAPI = async (data) =>{
    const response = await authManager.checkLogin(data)
    return response
}