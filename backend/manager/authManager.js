const LoginData = require("../Modals/LoginDataModal");
module.exports.checkLogin = async (data) =>{
    try{
        let check = await LoginData.find({email: data.email,password: data.password})
        if(check.length){return check}else{return null}
    }
    catch (err){
        return null
    }
}