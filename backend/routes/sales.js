const express = require('express');
const salesRoute = express.Router();
salesRoute.get('/addSale',(req,res)=>{
console.log("SALES ROUTE")
})
module.exports = {salesRoute}