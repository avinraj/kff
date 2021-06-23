const mongoose = require('mongoose');
const LoginDataSchema = new mongoose.Schema({ 
    email: String,
    password: String
})
module.exports = mongoose.model("LoginData", LoginDataSchema)