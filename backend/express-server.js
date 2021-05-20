const express = require("express");
const app = express();
const SalesRoute = require('./routes/sales');
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use('/sales', SalesRoute.salesRoute);
module.exports = app;
