const router = require("express").Router();
const saleServie = require("../services/saleService");
router.post("/addSale", async (req, res) => {
  if (Object.keys(req.body).length) {
    const response = await saleServie.addSaleAPI(req.body);
    console.log(response)
    if (response === true) {
      res.json(201).send();
    } else {
      res.status(204).send();
    }
  } else {
    res.status(204).send();
  }
});
module.exports = router;
