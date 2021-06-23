const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3030;
const tanksRoute = require("./routes/tanksRoute");
const saleRoute = require("./routes/salesRoute");
const authRoute = require("./routes/authRoute");
const connectionOptions = {useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false}
app.use(express.json())
app.use(cors())
mongoose
  .connect("mongodb://localhost/KFF",connectionOptions)
  .then(() => {
    console.log("DB connected succefully");
  })
  .catch((err) => {
    console.log(err);
  });
  app.use("/tanks", tanksRoute);
app.use("/sale", saleRoute);
app.use("/auth",authRoute);
app.listen(PORT, () => {
  console.log("The servre is listening in " + PORT);
});
