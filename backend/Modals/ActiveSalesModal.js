const mongoose = require('mongoose');
const ActiveSaleSchema = new mongoose.Schema({
tankNo: String,
mmyy: String,
sales: [{
kg: String,
cleaning: Boolean,
fishType: String,
date: String,
price: String,
amount: String,
balance: String,
payType: String,
payComp: Boolean,
name: String
}],
saleStatus: String
})
module.exports = mongoose.model("ActiveSale", ActiveSaleSchema)