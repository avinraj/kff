const mongoose = require("mongoose");
const ClosedSaleSchema = new mongoose.Schema({
  tankID: String,
  tankNo: String,
  mmyy: String,
  sales: [
    {
      id: String,
      kg: String,
      cleaning: Boolean,
      fishType: String,
      date: String,
      price: String,
      amount: String,
      balance: String,
      payType: String,
      payComp: Boolean,
      name: String,
    },
  ],
  saleStatus: String,
  totalKg: Number,
  totalPrice: Number,
});
module.exports = mongoose.model("ClosedSale", ClosedSaleSchema);
